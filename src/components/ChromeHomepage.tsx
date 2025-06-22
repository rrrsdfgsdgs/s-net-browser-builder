
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Clock, Bookmark } from 'lucide-react';

interface ChromeHomepageProps {
  onNavigate: (url: string) => void;
  onSearch: (query: string) => void;
}

const ChromeHomepage = ({ onNavigate, onSearch }: ChromeHomepageProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const shortcuts = [
    { name: 'S.com', url: 's.com', icon: '🌐' },
    { name: 'Punsta', url: 'punsta://search?q=', icon: '🔍' },
    { name: 'YouTube', url: 'youtube.com', icon: '📺' },
    { name: 'Gmail', url: 'gmail.com', icon: '📧' },
    { name: 'News', url: 'news.com', icon: '📰' },
    { name: 'Shopping', url: 'shop.com', icon: '🛒' },
    { name: 'Maps', url: 'maps.com', icon: '🗺️' },
    { name: 'Drive', url: 'drive.com', icon: '💾' },
  ];

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Google logo placeholder */}
        <div className="mb-8">
          <h1 className="text-6xl font-light text-gray-700 mb-2">Punsta</h1>
          <p className="text-sm text-gray-500 text-center">Your gateway to the web</p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 text-lg border-gray-300 rounded-full shadow-lg focus:shadow-xl transition-shadow"
              placeholder="Search Punsta or type a URL"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </form>

        {/* Quick access buttons */}
        <div className="flex space-x-4 mb-12">
          <Button
            variant="outline"
            onClick={() => onSearch('latest news')}
            className="px-6 py-3 rounded-full hover:shadow-md transition-shadow"
          >
            Punsta Search
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('s.com')}
            className="px-6 py-3 rounded-full hover:shadow-md transition-shadow"
          >
            Claim Domains
          </Button>
        </div>

        {/* Most visited shortcuts */}
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Shortcuts</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {shortcuts.map((shortcut, index) => (
              <button
                key={index}
                onClick={() => onNavigate(shortcut.url)}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:bg-gray-300 transition-colors">
                  {shortcut.icon}
                </div>
                <span className="text-xs text-gray-700 text-center truncate w-full">
                  {shortcut.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section with recent activity */}
      <div className="px-8 pb-8">
        <div className="flex justify-between items-start space-x-8">
          {/* Recently closed */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recently closed
            </h3>
            <div className="space-y-2">
              <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                Welcome to s.com - S.com
              </div>
              <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                New Tab - Chrome
              </div>
            </div>
          </div>

          {/* Bookmarks */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
              <Bookmark className="w-4 h-4 mr-2" />
              Bookmarks
            </h3>
            <div className="space-y-2">
              <div
                className="text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => onNavigate('s.com')}
              >
                S.com - Claim Your Domain
              </div>
              <div
                className="text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={() => onSearch('web development')}
              >
                Punsta - Web Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChromeHomepage;
