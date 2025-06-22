
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Save, X, Eye } from 'lucide-react';
import { Website } from './Browser';

interface WebsiteBuilderProps {
  domain: string;
  initialWebsite?: Website;
  onSave: (website: Website) => void;
  onCancel: () => void;
}

const WebsiteBuilder = ({ domain, initialWebsite, onSave, onCancel }: WebsiteBuilderProps) => {
  const [website, setWebsite] = useState<Website>(
    initialWebsite || {
      domain,
      title: `My ${domain} Website`,
      content: [
        { type: 'text', content: 'Welcome to my website!' }
      ],
      backgroundColor: '#ffffff',
      textColor: '#000000'
    }
  );

  const [preview, setPreview] = useState(false);

  const addContent = (type: 'text' | 'link' | 'button' | 'html') => {
    const newContent = {
      type,
      content: type === 'text' ? 'New text content' :
               type === 'link' ? 'New Link' :
               type === 'button' ? 'Click Me' :
               '<p>Custom HTML content</p>',
      ...(type === 'link' && { href: 'https://example.com' }),
      ...(type === 'button' && { onClick: 'alert("Button clicked!")' })
    };

    setWebsite({
      ...website,
      content: [...website.content, newContent]
    });
  };

  const updateContent = (index: number, field: string, value: string) => {
    const newContent = [...website.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setWebsite({ ...website, content: newContent });
  };

  const deleteContent = (index: number) => {
    setWebsite({
      ...website,
      content: website.content.filter((_, i) => i !== index)
    });
  };

  const renderPreview = () => (
    <div 
      className="min-h-full p-8"
      style={{ 
        backgroundColor: website.backgroundColor, 
        color: website.textColor 
      }}
    >
      <title className="text-3xl font-bold mb-6">{website.title}</title>
      <div className="space-y-4 max-w-4xl">
        {website.content.map((item, index) => (
          <div key={index}>
            {item.type === 'text' && (
              <p className="text-lg">{item.content}</p>
            )}
            {item.type === 'link' && (
              <a 
                href={item.href} 
                className="text-blue-500 hover:text-blue-700 underline text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.content}
              </a>
            )}
            {item.type === 'button' && (
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
                onClick={() => {
                  try {
                    eval(item.onClick || '');
                  } catch (e) {
                    console.error('Button click error:', e);
                  }
                }}
              >
                {item.content}
              </button>
            )}
            {item.type === 'html' && (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (preview) {
    return (
      <div className="min-h-full">
        <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
          <h2 className="font-semibold">Preview: {domain}</h2>
          <Button onClick={() => setPreview(false)} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>
        {renderPreview()}
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Website Builder</h1>
            <p className="text-gray-600">Editing: {domain}</p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => setPreview(true)} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={() => onSave(website)} className="bg-green-500 hover:bg-green-600">
              <Save className="w-4 h-4 mr-2" />
              Save & Publish
            </Button>
            <Button onClick={onCancel} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Website Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Website Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Website Title</label>
              <Input
                value={website.title}
                onChange={(e) => setWebsite({ ...website, title: e.target.value })}
                placeholder="Enter website title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Background Color</label>
                <Input
                  type="color"
                  value={website.backgroundColor}
                  onChange={(e) => setWebsite({ ...website, backgroundColor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Text Color</label>
                <Input
                  type="color"
                  value={website.textColor}
                  onChange={(e) => setWebsite({ ...website, textColor: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Content */}
        <Card>
          <CardHeader>
            <CardTitle>Add Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button onClick={() => addContent('text')} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Text
              </Button>
              <Button onClick={() => addContent('link')} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Link
              </Button>
              <Button onClick={() => addContent('button')} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Button
              </Button>
              <Button onClick={() => addContent('html')} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                HTML
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Editor */}
        <div className="space-y-4">
          {website.content.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg capitalize">{item.type} Content</CardTitle>
                  <Button 
                    onClick={() => deleteContent(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.type === 'text' && (
                  <Textarea
                    value={item.content}
                    onChange={(e) => updateContent(index, 'content', e.target.value)}
                    placeholder="Enter text content"
                    rows={3}
                  />
                )}
                
                {item.type === 'link' && (
                  <div className="space-y-2">
                    <Input
                      value={item.content}
                      onChange={(e) => updateContent(index, 'content', e.target.value)}
                      placeholder="Link text"
                    />
                    <Input
                      value={item.href || ''}
                      onChange={(e) => updateContent(index, 'href', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                )}
                
                {item.type === 'button' && (
                  <div className="space-y-2">
                    <Input
                      value={item.content}
                      onChange={(e) => updateContent(index, 'content', e.target.value)}
                      placeholder="Button text"
                    />
                    <Input
                      value={item.onClick || ''}
                      onChange={(e) => updateContent(index, 'onClick', e.target.value)}
                      placeholder="JavaScript code (e.g., alert('Hello!'))"
                    />
                  </div>
                )}
                
                {item.type === 'html' && (
                  <Textarea
                    value={item.content}
                    onChange={(e) => updateContent(index, 'content', e.target.value)}
                    placeholder="Enter HTML content"
                    rows={4}
                    className="font-mono text-sm"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {website.content.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No content added yet</p>
              <p className="text-sm text-gray-400">Use the "Add Content" buttons above to start building your website</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WebsiteBuilder;
