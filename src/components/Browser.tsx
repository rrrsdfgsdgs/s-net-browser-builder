
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Plus, X, MoreVertical, Star, Settings, Shield } from 'lucide-react';
import SComHomepage from './SComHomepage';
import WebsiteBuilder from './WebsiteBuilder';
import UserWebsite from './UserWebsite';
import ChromeHomepage from './ChromeHomepage';
import PunstaSearch from './PunstaSearch';

export interface Website {
  domain: string;
  title: string;
  content: {
    type: 'text' | 'link' | 'button' | 'html' | 'image';
    content: string;
    href?: string;
    onClick?: string;
    src?: string;
    alt?: string;
  }[];
  backgroundColor: string;
  textColor: string;
  images?: string[];
}

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

const Browser = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'New Tab', url: 'chrome://newtab' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [addressBarUrl, setAddressBarUrl] = useState('');
  const [ownedDomains, setOwnedDomains] = useState<string[]>([]);
  const [websites, setWebsites] = useState<Record<string, Website>>({
    // Pre-populate with some example claimed websites
    'example.com': {
      domain: 'example.com',
      title: 'Example Website',
      content: [
        { type: 'text', content: 'Welcome to Example.com! This is a sample website.' },
        { type: 'text', content: 'This domain has been claimed and customized by another user.' },
        { type: 'link', content: 'Visit S.com to claim your own domain', href: 's.com' }
      ],
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      images: []
    },
    'myblog.com': {
      domain: 'myblog.com',
      title: 'My Personal Blog',
      content: [
        { type: 'text', content: 'Welcome to my personal blog!' },
        { type: 'text', content: 'Here I share my thoughts and experiences.' },
        { type: 'button', content: 'Read Latest Post', onClick: 'alert("This would open the latest blog post!")' }
      ],
      backgroundColor: '#2d2d2d',
      textColor: '#f0f0f0',
      images: []
    }
  });
  const [editingDomain, setEditingDomain] = useState<string | null>(null);

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const currentUrl = activeTab?.url || 'chrome://newtab';

  const navigate = (url: string) => {
    if (activeTab) {
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url, title: getPageTitle(url) }
          : tab
      );
      setTabs(updatedTabs);
      setAddressBarUrl(url);
    }
  };

  const getPageTitle = (url: string) => {
    if (url === 'chrome://newtab') return 'New Tab';
    if (url === 's.com') return 'S.com - Claim Your Domain';
    if (url.startsWith('punsta://')) return 'Punsta Search';
    if (websites[url]) return websites[url].title;
    return url;
  };

  const createNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'chrome://newtab'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setAddressBarUrl('');
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
      setAddressBarUrl(newTabs[0].url);
    }
  };

  const goBack = () => {
    // Simplified back functionality
    if (currentUrl !== 'chrome://newtab') {
      navigate('chrome://newtab');
    }
  };

  const goForward = () => {
    // Simplified forward functionality
  };

  const refresh = () => {
    // Force re-render
    const temp = currentUrl;
    navigate(temp + '?refresh=' + Date.now());
    setTimeout(() => navigate(temp), 100);
  };

  const handleAddressBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = addressBarUrl;
    
    if (url.includes(' ') || (!url.includes('.') && !url.startsWith('chrome://') && !url.startsWith('punsta://'))) {
      url = `punsta://search?q=${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http') && !url.startsWith('chrome://') && !url.startsWith('punsta://')) {
      url = url;
    }
    
    navigate(url);
  };

  const claimDomain = (domain: string) => {
    if (!ownedDomains.includes(domain)) {
      setOwnedDomains([...ownedDomains, domain]);
      setWebsites({
        ...websites,
        [domain]: {
          domain,
          title: `Welcome to ${domain}`,
          content: [
            { type: 'text', content: `Welcome to ${domain}! This is your new website.` },
            { type: 'text', content: 'Click Edit to customize this page.' }
          ],
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff',
          images: []
        }
      });
      navigate(domain);
    }
  };

  const saveWebsite = (domain: string, website: Website) => {
    setWebsites({
      ...websites,
      [domain]: website
    });
    setEditingDomain(null);
    navigate(domain);
  };

  const renderContent = () => {
    if (editingDomain) {
      return (
        <WebsiteBuilder
          domain={editingDomain}
          initialWebsite={websites[editingDomain]}
          onSave={(website) => saveWebsite(editingDomain, website)}
          onCancel={() => setEditingDomain(null)}
        />
      );
    }

    if (currentUrl === 'chrome://newtab') {
      return <ChromeHomepage onNavigate={navigate} onSearch={(query) => navigate(`punsta://search?q=${encodeURIComponent(query)}`)} />;
    }

    if (currentUrl === 's.com') {
      return (
        <SComHomepage
          onClaimDomain={claimDomain}
          ownedDomains={ownedDomains}
          onNavigate={navigate}
        />
      );
    }

    if (currentUrl.startsWith('punsta://search')) {
      const query = new URLSearchParams(currentUrl.split('?')[1]).get('q') || '';
      return <PunstaSearch query={query} onNavigate={navigate} />;
    }

    if (websites[currentUrl]) {
      return (
        <UserWebsite
          website={websites[currentUrl]}
          isOwner={ownedDomains.includes(currentUrl)}
          onEdit={() => setEditingDomain(currentUrl)}
          onNavigate={navigate}
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2 text-gray-300">Page Not Found</h2>
          <p className="text-gray-400 mb-4">The domain "{currentUrl}" doesn't exist or hasn't been claimed yet.</p>
          <Button onClick={() => navigate('s.com')} className="bg-orange-500 hover:bg-orange-600 text-white">
            Go to s.com to claim domains
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto bg-gray-900 shadow-2xl overflow-hidden h-screen flex flex-col">
      {/* Chrome-style tabs with dark theme */}
      <div className="bg-gray-800 flex items-end border-b border-gray-700">
        <div className="flex items-end flex-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`group relative flex items-center px-4 py-3 min-w-0 max-w-64 cursor-pointer ${
                activeTabId === tab.id 
                  ? 'bg-gray-900 rounded-t-lg border-t-2 border-orange-500 shadow-sm' 
                  : 'bg-gray-700 hover:bg-gray-650 rounded-t-lg mx-1'
              }`}
              onClick={() => {
                setActiveTabId(tab.id);
                setAddressBarUrl(tab.url);
              }}
            >
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-4 h-4 mr-2 bg-orange-300 rounded-sm flex-shrink-0 flex items-center justify-center">
                  {currentUrl.startsWith('https://') ? (
                    <Shield className="w-2 h-2 text-green-400" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm truncate text-gray-300">{tab.title}</span>
              </div>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="ml-2 p-1 rounded hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-gray-300" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={createNewTab}
            className="p-3 hover:bg-gray-700 rounded-full mx-2 text-gray-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center p-2">
          <button className="p-2 hover:bg-gray-700 rounded-full text-gray-300">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modern Chrome-style toolbar with dark theme */}
      <div className="bg-gray-900 px-3 py-3 flex items-center space-x-3 border-b border-gray-700">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('chrome://newtab')}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-800 rounded-full opacity-50 text-gray-300"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleAddressBarSubmit} className="flex-1 flex mx-4">
          <div className="flex-1 relative">
            <Input
              value={addressBarUrl}
              onChange={(e) => setAddressBarUrl(e.target.value)}
              className="w-full pl-10 pr-12 py-2 text-sm border-gray-600 rounded-full bg-gray-800 text-gray-300 focus:bg-gray-750 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Search Punsta or type a URL"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {currentUrl.startsWith('https://') ? (
                <Shield className="w-4 h-4 text-green-400" />
              ) : (
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
              )}
            </div>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 rounded-full p-1">
              <Star className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto bg-gray-900">
        {renderContent()}
      </div>
    </div>
  );
};

export default Browser;
