
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Education } from '@/types/resume';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    };
    onUpdate([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Education</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-700">Step 2</Badge>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No education entries yet. Click "Add Education" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        data.map((education) => (
          <Card key={education.id} className="bg-white/80 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Education Entry</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                <Input
                  id={`institution-${education.id}`}
                  placeholder="University of California, Berkeley"
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  className="bg-white/80"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                  <Input
                    id={`degree-${education.id}`}
                    placeholder="Bachelor of Science"
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
                  <Input
                    id={`field-${education.id}`}
                    placeholder="Computer Science"
                    value={education.fieldOfStudy}
                    onChange={(e) => updateEducation(education.id, 'fieldOfStudy', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`start-${education.id}`}>Start Date</Label>
                  <Input
                    id={`start-${education.id}`}
                    type="date"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor={`end-${education.id}`}>End Date</Label>
                  <Input
                    id={`end-${education.id}`}
                    type="date"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                  <Input
                    id={`gpa-${education.id}`}
                    placeholder="3.8"
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default EducationForm;
