
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Clock, Star, MoreVertical, ArrowRight, Image, Sparkles, Mic, Camera } from 'lucide-react';

interface PunstaSearchProps {
  query: string;
  onNavigate: (url: string) => void;
}

const PunstaSearch = ({ query, onNavigate }: PunstaSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState('all');

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
      isAd: false,
      isClaimed: true
    },
    {
      title: `${query}.com - Available Domain`,
      url: `${query}.com`,
      description: `The domain ${query}.com is available for claiming on the S.com network. Claim it now to build your website.`,
      isAd: false,
      isClaimed: false
    },
    {
      title: 'How to Build a Website - Complete Guide 2024',
      url: 'webguide.com',
      description: 'Learn how to build a website from scratch. Step-by-step tutorials for beginners and advanced users.',
      isAd: false,
      isClaimed: true
    },
    {
      title: 'Free Website Builder - Create Your Site Today',
      url: 'sitebuilder.com',
      description: 'Build professional websites with our drag-and-drop builder. No coding required. Start for free.',
      isAd: true,
      isClaimed: true
    }
  ];

  const imageResults = [
    { url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop', title: 'Orange flowers' },
    { url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=200&fit=crop', title: 'Blue starry night' },
    { url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop', title: 'Yellow lights' },
    { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop', title: 'Water and trees' },
    { url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop', title: 'Orange cat' }
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
        <div className="max-w-6xl mx-auto flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-light">
              <span className="text-orange-500">P</span>
              <span className="text-gray-600">u</span>
              <span className="text-orange-500">n</span>
              <span className="text-gray-600">s</span>
              <span className="text-orange-500">t</span>
              <span className="text-gray-600">a</span>
            </h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative bg-white rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-16 py-2 border-0 rounded-full bg-transparent focus:ring-0 focus:outline-none"
                placeholder="Search Punsta"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
                  <Mic className="w-4 h-4 text-gray-600" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  type="submit"
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Search options */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={() => setActiveTab('all')}
              className={`pb-2 ${activeTab === 'all' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('images')}
              className={`pb-2 flex items-center space-x-1 ${activeTab === 'images' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
            >
              <Image className="w-4 h-4" />
              <span>Images</span>
            </button>
            <button className="text-gray-600 hover:text-orange-600 pb-2">Videos</button>
            <button className="text-gray-600 hover:text-orange-600 pb-2">News</button>
            <button className="text-gray-600 hover:text-orange-600 pb-2">Shopping</button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`pb-2 flex items-center space-x-1 ${activeTab === 'ai' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Search stats */}
        <p className="text-sm text-gray-600 mb-6">
          About 847,000 results (0.32 seconds)
        </p>

        {activeTab === 'all' && (
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
                      {result.isClaimed && <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Claimed</span>}
                      {!result.isClaimed && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Available</span>}
                      <MoreVertical className="w-3 h-3 text-gray-400" />
                    </div>
                    
                    <h3 
                      className="text-xl text-orange-700 hover:underline cursor-pointer mb-1"
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
        )}

        {activeTab === 'images' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {imageResults.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 truncate">{image.title}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-medium text-gray-800">AI Generated Response</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Based on your search for "{query}", here's what I found: This appears to be related to web development and domain management. 
                You can claim domains through S.com and build websites with various features including text, links, buttons, and custom HTML.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Generated by Punsta AI</span>
                <button className="text-orange-600 hover:underline">Learn more</button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Related AI suggestions:</h4>
              <div className="space-y-2">
                <div className="text-orange-600 hover:underline cursor-pointer">How to build a website like {query}</div>
                <div className="text-orange-600 hover:underline cursor-pointer">Best practices for {query} development</div>
                <div className="text-orange-600 hover:underline cursor-pointer">Generate content for {query} website</div>
              </div>
            </div>
          </div>
        )}

        {/* Related searches - only show for 'all' tab */}
        {activeTab === 'all' && (
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
                  <span className="text-orange-700">{search}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center space-x-2">
          <span className="text-4xl font-light">
            <span className="text-orange-500">P</span>
            <span className="text-gray-600">u</span>
            <span className="text-orange-500">n</span>
            <span className="text-gray-600">s</span>
            <span className="text-orange-500">t</span>
            <span className="text-gray-600">a</span>
          </span>
        </div>
        
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded">Previous</button>
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-orange-500 text-white rounded">1</button>
            <button className="w-10 h-10 text-orange-600 hover:bg-orange-50 rounded">2</button>
            <button className="w-10 h-10 text-orange-600 hover:bg-orange-50 rounded">3</button>
            <button className="w-10 h-10 text-orange-600 hover:bg-orange-50 rounded">4</button>
          </div>
          <button className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PunstaSearch;
