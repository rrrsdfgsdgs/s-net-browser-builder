
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Globe } from 'lucide-react';
import { Website } from './Browser';

interface UserWebsiteProps {
  website: Website;
  isOwner: boolean;
  onEdit: () => void;
  onNavigate: (url: string) => void;
}

const UserWebsite = ({ website, isOwner, onEdit, onNavigate }: UserWebsiteProps) => {
  return (
    <div 
      className="min-h-full"
      style={{ 
        backgroundColor: website.backgroundColor, 
        color: website.textColor 
      }}
    >
      {/* Owner controls */}
      {isOwner && (
        <div className="bg-black bg-opacity-75 text-white px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span className="text-sm">You own this domain</span>
          </div>
          <Button onClick={onEdit} size="sm" variant="secondary">
            <Edit className="w-4 h-4 mr-2" />
            Edit Website
          </Button>
        </div>
      )}

      {/* Website content */}
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">{website.title}</h1>
        
        <div className="space-y-6 max-w-4xl">
          {website.content.map((item, index) => (
            <div key={index}>
              {item.type === 'text' && (
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{item.content}</p>
              )}
              
              {item.type === 'link' && (
                <div>
                  <a 
                    href={item.href}
                    className="text-blue-500 hover:text-blue-700 underline text-lg font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      // Check if it's an internal domain
                      const url = item.href || '';
                      if (url && !url.startsWith('http') && !url.includes('.')) {
                        e.preventDefault();
                        onNavigate(url);
                      }
                    }}
                  >
                    {item.content}
                  </a>
                </div>
              )}
              
              {item.type === 'button' && (
                <div>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => {
                      try {
                        if (item.onClick) {
                          eval(item.onClick);
                        }
                      } catch (e) {
                        console.error('Button click error:', e);
                        alert('Error executing button action');
                      }
                    }}
                  >
                    {item.content}
                  </button>
                </div>
              )}
              
              {item.type === 'html' && (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }} 
                />
              )}
            </div>
          ))}
        </div>

        {website.content.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-500 mb-4">This website is empty</h2>
            {isOwner && (
              <Button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600">
                <Edit className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWebsite;
