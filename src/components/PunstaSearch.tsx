
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Clock, Star, MoreVertical, ArrowRight } from 'lucide-react';

interface PunstaSearchProps {
  query: string;
  onNavigate: (url: string) => void;
}

const PunstaSearch = ({ query, onNavigate }: PunstaSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`punsta://search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const searchResults = [
    {
      title: 'S.com - Claim Your Domain and Build Websites',
      url: 's.com',
      description: 'Create and claim any domain on the S.com network. Build beautiful websites with our easy-to-use builder featuring text, links, buttons, and custom HTML.',
      isAd: false
    },
    {
      title: 'How to Build a Website - Complete Guide 2024',
      url: 'webguide.com',
      description: 'Learn how to build a website from scratch. Step-by-step tutorials for beginners and advanced users.',
      isAd: false
    },
    {
      title: 'Free Website Builder - Create Your Site Today',
      url: 'sitebuilder.com',
      description: 'Build professional websites with our drag-and-drop builder. No coding required. Start for free.',
      isAd: true
    },
    {
      title: 'Domain Registration - Get Your Perfect Domain',
      url: 'domains.net',
      description: 'Register your domain name today. Over 300 domain extensions available. Competitive prices and 24/7 support.',
      isAd: false
    },
    {
      title: 'Web Development Tutorials and Resources',
      url: 'devresources.org',
      description: 'Comprehensive tutorials on HTML, CSS, JavaScript, and modern web development frameworks.',
      isAd: false
    }
  ];

  const relatedSearches = [
    'website builder',
    'domain registration',
    'web development',
    'HTML CSS tutorial',
    'responsive design',
    'web hosting services'
  ];

  return (
    <div className="min-h-full bg-white">
      {/* Search header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-blue-600">Punsta</h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-gray-300 rounded-full"
                placeholder="Search Punsta"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </form>
        </div>

        {/* Search options */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex space-x-6 text-sm">
            <button className="text-blue-600 border-b-2 border-blue-600 pb-2">All</button>
            <button className="text-gray-600 hover:text-blue-600 pb-2">Images</button>
            <button className="text-gray-600 hover:text-blue-600 pb-2">Videos</button>
            <button className="text-gray-600 hover:text-blue-600 pb-2">News</button>
            <button className="text-gray-600 hover:text-blue-600 pb-2">Shopping</button>
            <button className="text-gray-600 hover:text-blue-600 pb-2">More</button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Search stats */}
        <p className="text-sm text-gray-600 mb-6">
          About 847,000 results (0.32 seconds)
        </p>

        {/* Search results */}
        <div className="space-y-6">
          {searchResults.map((result, index) => (
            <div key={index} className="max-w-2xl">
              {result.isAd && (
                <div className="text-xs text-gray-500 mb-1">Ad</div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{result.url}</span>
                    <MoreVertical className="w-3 h-3 text-gray-400" />
                  </div>
                  
                  <h3 
                    className="text-xl text-blue-700 hover:underline cursor-pointer mb-1"
                    onClick={() => onNavigate(result.url)}
                  >
                    {result.title}
                  </h3>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related searches */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Related searches</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(search);
                  onNavigate(`punsta://search?q=${encodeURIComponent(search)}`);
                }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <span className="text-blue-700">{search}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center space-x-2">
          <span className="text-4xl text-blue-600 font-light">Punsta</span>
        </div>
        
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">Previous</button>
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-blue-600 text-white rounded">1</button>
            <button className="w-10 h-10 text-blue-600 hover:bg-blue-50 rounded">2</button>
            <button className="w-10 h-10 text-blue-600 hover:bg-blue-50 rounded">3</button>
            <button className="w-10 h-10 text-blue-600 hover:bg-blue-50 rounded">4</button>
          </div>
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PunstaSearch;
