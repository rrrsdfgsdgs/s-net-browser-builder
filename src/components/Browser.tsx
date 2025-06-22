
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Plus } from 'lucide-react';
import SComHomepage from './SComHomepage';
import WebsiteBuilder from './WebsiteBuilder';
import UserWebsite from './UserWebsite';

export interface Website {
  domain: string;
  title: string;
  content: {
    type: 'text' | 'link' | 'button' | 'html';
    content: string;
    href?: string;
    onClick?: string;
  }[];
  backgroundColor: string;
  textColor: string;
}

const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState('s.com');
  const [addressBarUrl, setAddressBarUrl] = useState('s.com');
  const [history, setHistory] = useState(['s.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [ownedDomains, setOwnedDomains] = useState<string[]>([]);
  const [websites, setWebsites] = useState<Record<string, Website>>({});
  const [editingDomain, setEditingDomain] = useState<string | null>(null);

  const navigate = (url: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentUrl(url);
    setAddressBarUrl(url);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setAddressBarUrl(url);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const url = history[newIndex];
      setCurrentUrl(url);
      setAddressBarUrl(url);
    }
  };

  const refresh = () => {
    // Force re-render by updating state
    setCurrentUrl(currentUrl + '?refresh=' + Date.now());
    setTimeout(() => setCurrentUrl(currentUrl), 100);
  };

  const handleAddressBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(addressBarUrl);
  };

  const claimDomain = (domain: string) => {
    if (!ownedDomains.includes(domain)) {
      setOwnedDomains([...ownedDomains, domain]);
      // Initialize with a basic website
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
          textColor: '#000000'
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

    if (currentUrl === 's.com') {
      return (
        <SComHomepage
          onClaimDomain={claimDomain}
          ownedDomains={ownedDomains}
          onNavigate={navigate}
        />
      );
    }

    // Check if it's a built website
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

    // 404 page
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-4">The domain "{currentUrl}" doesn't exist or hasn't been claimed yet.</p>
          <Button onClick={() => navigate('s.com')} className="bg-blue-500 hover:bg-blue-600">
            Go to s.com to claim domains
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Browser Chrome */}
      <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2 border-b">
        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-2"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={refresh} className="p-2">
          <RotateCcw className="w-4 h-4" />
        </Button>

        {/* Address bar */}
        <form onSubmit={handleAddressBarSubmit} className="flex-1 flex">
          <Input
            value={addressBarUrl}
            onChange={(e) => setAddressBarUrl(e.target.value)}
            className="flex-1 rounded-r-none border-r-0"
            placeholder="Enter a domain..."
          />
          <Button type="submit" variant="outline" className="rounded-l-none px-3">
            Go
          </Button>
        </form>

        {/* Home button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('s.com')}
          className="p-2"
        >
          <Home className="w-4 h-4" />
        </Button>
      </div>

      {/* Browser content */}
      <div className="h-[600px] overflow-auto">
        {renderContent()}
      </div>

      {/* Status bar */}
      <div className="bg-gray-100 px-4 py-1 text-xs text-gray-600 border-t">
        {ownedDomains.length > 0 && (
          <span>Owned domains: {ownedDomains.join(', ')}</span>
        )}
      </div>
    </div>
  );
};

export default Browser;
