
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
  const [websites, setWebsites] = useState<Record<string, Website>>({});
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
          backgroundColor: '#ffffff',
          textColor: '#000000',
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
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-4">The domain "{currentUrl}" doesn't exist or hasn't been claimed yet.</p>
          <Button onClick={() => navigate('s.com')} className="bg-orange-500 hover:bg-orange-600">
            Go to s.com to claim domains
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto bg-white shadow-2xl overflow-hidden h-screen flex flex-col">
      {/* Chrome-style tabs with modern styling */}
      <div className="bg-gray-200 flex items-end border-b border-gray-300">
        <div className="flex items-end flex-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`group relative flex items-center px-4 py-3 min-w-0 max-w-64 cursor-pointer ${
                activeTabId === tab.id 
                  ? 'bg-white rounded-t-lg border-t-2 border-orange-500 shadow-sm' 
                  : 'bg-gray-100 hover:bg-gray-50 rounded-t-lg mx-1'
              }`}
              onClick={() => {
                setActiveTabId(tab.id);
                setAddressBarUrl(tab.url);
              }}
            >
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-4 h-4 mr-2 bg-orange-200 rounded-sm flex-shrink-0 flex items-center justify-center">
                  {currentUrl.startsWith('https://') ? (
                    <Shield className="w-2 h-2 text-green-600" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <span className="text-sm truncate text-gray-700">{tab.title}</span>
              </div>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="ml-2 p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={createNewTab}
            className="p-3 hover:bg-gray-100 rounded-full mx-2"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center p-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modern Chrome-style toolbar */}
      <div className="bg-white px-3 py-3 flex items-center space-x-3 border-b border-gray-200">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('chrome://newtab')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-full opacity-50"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleAddressBarSubmit} className="flex-1 flex mx-4">
          <div className="flex-1 relative">
            <Input
              value={addressBarUrl}
              onChange={(e) => setAddressBarUrl(e.target.value)}
              className="w-full pl-10 pr-12 py-2 text-sm border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
              placeholder="Search Punsta or type a URL"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {currentUrl.startsWith('https://') ? (
                <Shield className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              )}
            </div>
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 rounded-full p-1">
              <Star className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Browser;
