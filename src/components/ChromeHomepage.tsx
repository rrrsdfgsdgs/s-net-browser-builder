
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Clock, Bookmark, Mic, Camera, Grid3X3, User } from 'lucide-react';

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
    { name: 'S.com', url: 's.com', icon: '🌐', color: 'bg-gray-800' },
    { name: 'Punsta', url: 'punsta://search?q=', icon: '🔍', color: 'bg-orange-900' },
    { name: 'Example', url: 'example.com', icon: '📄', color: 'bg-gray-800' },
    { name: 'MyBlog', url: 'myblog.com', icon: '📝', color: 'bg-gray-800' },
    { name: 'News', url: 'news.com', icon: '📰', color: 'bg-gray-800' },
    { name: 'Shopping', url: 'shop.com', icon: '🛒', color: 'bg-gray-800' },
    { name: 'Maps', url: 'maps.com', icon: '🗺️', color: 'bg-gray-800' },
    { name: 'Drive', url: 'drive.com', icon: '💾', color: 'bg-gray-800' },
  ];

  return (
    <div className="min-h-full bg-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-end items-center p-4 space-x-4">
        <button className="text-gray-400 hover:text-orange-400 text-sm">Gmail</button>
        <button className="text-gray-400 hover:text-orange-400 text-sm">Images</button>
        <button className="p-2 hover:bg-gray-800 rounded-full">
          <Grid3X3 className="w-5 h-5 text-gray-400" />
        </button>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          <User className="w-4 h-4" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-16">
        {/* PUNSTA logo */}
        <div className="mb-8">
          <h1 className="text-7xl font-light mb-2">
            <span className="text-orange-500">P</span>
            <span className="text-gray-400">u</span>
            <span className="text-orange-500">n</span>
            <span className="text-gray-400">s</span>
            <span className="text-orange-500">t</span>
            <span className="text-gray-400">a</span>
          </h1>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
          <div className="relative bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 text-lg border-0 rounded-full bg-transparent focus:ring-0 focus:outline-none text-gray-300 placeholder-gray-500"
              placeholder="Search Punsta or type a URL"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button type="button" className="p-2 hover:bg-gray-700 rounded-full">
                <Mic className="w-4 h-4 text-gray-400" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-700 rounded-full">
                <Camera className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick access buttons */}
        <div className="flex space-x-4 mb-12">
          <Button
            variant="outline"
            onClick={() => onSearch('latest news')}
            className="px-6 py-3 rounded-md bg-gray-800 hover:shadow-md transition-all border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-white"
          >
            Punsta Search
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('s.com')}
            className="px-6 py-3 rounded-md bg-gray-800 hover:shadow-md transition-all border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-white"
          >
            I'm Feeling Lucky
          </Button>
        </div>

        {/* Offered by section */}
        <p className="text-sm text-gray-500 mb-8">
          Punsta offered in: <span className="text-orange-400 hover:underline cursor-pointer">English</span>
        </p>

        {/* Most visited shortcuts */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {shortcuts.map((shortcut, index) => (
              <button
                key={index}
                onClick={() => onNavigate(shortcut.url)}
                className="flex flex-col items-center group"
              >
                <div className={`w-12 h-12 ${shortcut.color} rounded-xl flex items-center justify-center text-2xl mb-2 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105 border border-gray-700`}>
                  {shortcut.icon}
                </div>
                <span className="text-xs text-gray-400 text-center truncate w-full group-hover:text-orange-400 transition-colors">
                  {shortcut.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-8 pb-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <div className="flex justify-between items-start space-x-8">
            {/* Recently closed */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                Recently closed
              </h3>
              <div className="space-y-2">
                <div 
                  className="text-sm text-orange-400 hover:underline cursor-pointer"
                  onClick={() => onNavigate('s.com')}
                >
                  Welcome to s.com - S.com
                </div>
                <div className="text-sm text-orange-400 hover:underline cursor-pointer">
                  New Tab - Punsta
                </div>
              </div>
            </div>

            {/* Bookmarks */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                <Bookmark className="w-4 h-4 mr-2 text-orange-500" />
                Bookmarks
              </h3>
              <div className="space-y-2">
                <div
                  className="text-sm text-orange-400 hover:underline cursor-pointer"
                  onClick={() => onNavigate('s.com')}
                >
                  S.com - Claim Your Domain
                </div>
                <div
                  className="text-sm text-orange-400 hover:underline cursor-pointer"
                  onClick={() => onNavigate('example.com')}
                >
                  Example.com - Sample Website
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChromeHomepage;
