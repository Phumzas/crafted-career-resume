
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResumeTemplate } from '@/types/resume';

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    {
      id: 'modern' as ResumeTemplate,
      name: 'Modern Clean',
      description: 'Clean design with blue accents, perfect for tech and corporate roles',
      features: ['Single column', 'Blue color scheme', 'Modern typography'],
      preview: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      id: 'professional' as ResumeTemplate,
      name: 'Classic Professional',
      description: 'Traditional format with serif fonts, ideal for formal industries',
      features: ['Two column layout', 'Serif typography', 'Formal structure'],
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200'
    },
    {
      id: 'creative' as ResumeTemplate,
      name: 'Creative Flair',
      description: 'Eye-catching design for creative professionals and designers',
      features: ['Colorful accents', 'Creative layout', 'Visual elements'],
      preview: 'bg-gradient-to-br from-purple-100 to-pink-200'
    },
    {
      id: 'minimal' as ResumeTemplate,
      name: 'Minimalist',
      description: 'Clean and simple, perfect for ATS systems and conservative fields',
      features: ['Ultra-clean', 'ATS-friendly', 'High readability'],
      preview: 'bg-gradient-to-br from-white to-gray-100'
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
      <CardHeader>
        <CardTitle>Choose Your Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              {selectedTemplate === template.id && (
                <Badge className="absolute -top-2 -right-2 bg-blue-600">
                  Selected
                </Badge>
              )}
              
              {/* Template Preview */}
              <div className={`w-full h-24 rounded-md mb-3 ${template.preview} border border-gray-200`}>
                <div className="p-2 space-y-1">
                  <div className="bg-white/70 h-2 w-3/4 rounded"></div>
                  <div className="bg-white/50 h-1 w-1/2 rounded"></div>
                  <div className="bg-white/50 h-1 w-2/3 rounded"></div>
                  <div className="bg-white/30 h-1 w-1/3 rounded"></div>
                </div>
              </div>

              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
