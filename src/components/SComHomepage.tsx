
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Sparkles, Code, Zap } from 'lucide-react';

interface SComHomepageProps {
  onClaimDomain: (domain: string) => void;
  ownedDomains: string[];
  onNavigate: (url: string) => void;
}

const SComHomepage = ({ onClaimDomain, ownedDomains, onNavigate }: SComHomepageProps) => {
  const [domainInput, setDomainInput] = useState('');

  const handleClaimDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (domainInput.trim()) {
      onClaimDomain(domainInput.trim());
      setDomainInput('');
    }
  };

  const popularDomains = [
    'mysite.com', 'coolstuff.net', 'awesome.org', 'portfolio.io', 
    'blog.me', 'store.shop', 'news.today', 'gallery.art'
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">s.com</h1>
              <p className="text-sm text-gray-600">Claim your space on the web</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Build Your Dream Website
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Claim any domain and create beautiful websites with our easy-to-use builder
          </p>

          {/* Domain Claiming Form */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Claim Your Domain</span>
              </CardTitle>
              <CardDescription>
                Enter any domain name to claim and start building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleClaimDomain} className="space-y-4">
                <Input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="Enter domain name..."
                  className="text-center"
                />
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                  Claim Domain
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Code className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <CardTitle>Easy Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create websites with text, links, buttons, and custom HTML
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <CardTitle>Instant Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your changes go live immediately - no waiting, no deployment
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <CardTitle>Any Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Claim any domain name you want - they're all available here
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Popular Domains */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6">Popular Domains</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularDomains.map((domain) => (
              <Button
                key={domain}
                variant="outline"
                onClick={() => onClaimDomain(domain)}
                disabled={ownedDomains.includes(domain)}
                className="h-auto py-3 px-4 text-sm hover:bg-blue-50"
              >
                {ownedDomains.includes(domain) ? (
                  <span className="text-green-600">✓ Owned</span>
                ) : (
                  domain
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Owned Domains */}
        {ownedDomains.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Domains</CardTitle>
              <CardDescription>
                Click on any domain to visit or edit your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ownedDomains.map((domain) => (
                  <Button
                    key={domain}
                    variant="ghost"
                    onClick={() => onNavigate(domain)}
                    className="justify-start h-auto py-3 px-4 border border-gray-200 hover:border-blue-300"
                  >
                    <Globe className="w-4 h-4 mr-2 text-blue-500" />
                    {domain}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SComHomepage;
