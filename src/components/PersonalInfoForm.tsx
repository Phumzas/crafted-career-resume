
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { PersonalInfo } from '@/types/resume';
import { getPersonalInfoSuggestions } from '@/utils/contentSuggestions';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onUpdate }) => {
  const suggestions = getPersonalInfoSuggestions();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Personal Information
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Step 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={data.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="bg-white/80"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-white/80"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="New York, NY"
                value={data.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="bg-white/80"
              />
            </div>
            <div>
              <Label htmlFor="website">Portfolio/Website</Label>
              <Input
                id="website"
                placeholder="johndoe.com"
                value={data.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="bg-white/80"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
              id="summary"
              placeholder="Write a compelling professional summary..."
              value={data.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              className="bg-white/80 min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <Lightbulb className="w-5 h-5" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-white/80 rounded-lg border border-amber-200">
                <p className="text-sm text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;
