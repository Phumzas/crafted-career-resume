
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { Experience } from '@/types/resume';

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: []
    };
    onUpdate([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onUpdate(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'achievements', [...experience.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, achievementIndex: number, value: string) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[achievementIndex] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, achievementIndex: number) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = experience.achievements.filter((_, index) => index !== achievementIndex);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">Step 3</Badge>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No work experience entries yet. Click "Add Experience" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        data.map((experience) => (
          <Card key={experience.id} className="bg-white/80 backdrop-blur-sm border-gray-200/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Work Experience</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                  <Input
                    id={`company-${experience.id}`}
                    placeholder="Google Inc."
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${experience.id}`}>Position *</Label>
                  <Input
                    id={`position-${experience.id}`}
                    placeholder="Software Engineer"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`start-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`start-${experience.id}`}
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor={`end-${experience.id}`}>End Date</Label>
                  <div className="space-y-2">
                    <Input
                      id={`end-${experience.id}`}
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="bg-white/80"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">
                        Currently working here
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                <Textarea
                  id={`description-${experience.id}`}
                  placeholder="Describe your role and responsibilities..."
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  className="bg-white/80"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Key Achievements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(experience.id)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Achievement
                  </Button>
                </div>
                <div className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="• Increased team productivity by 30%..."
                        value={achievement}
                        onChange={(e) => updateAchievement(experience.id, index, e.target.value)}
                        className="bg-white/80"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;
