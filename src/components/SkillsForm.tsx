
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Star } from 'lucide-react';
import { Skill } from '@/types/resume';

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'technical',
      level: 'intermediate'
    };
    onUpdate([...data, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate(data.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id: string) => {
    onUpdate(data.filter(skill => skill.id !== id));
  };

  const getSkillsByCategory = (category: string) => {
    return data.filter(skill => skill.category === category);
  };

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills', color: 'bg-blue-100 text-blue-700' },
    { value: 'soft', label: 'Soft Skills', color: 'bg-green-100 text-green-700' },
    { value: 'language', label: 'Languages', color: 'bg-purple-100 text-purple-700' },
    { value: 'tool', label: 'Tools & Software', color: 'bg-orange-100 text-orange-700' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Skills</h2>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">Step 4</Badge>
        </div>
        <Button onClick={addSkill} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
          <CardContent className="p-8 text-center">
            <Star className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">No skills added yet. Click "Add Skill" to showcase your expertise.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Skills by Category */}
          <div className="grid grid-cols-2 gap-4">
            {skillCategories.map(category => {
              const categorySkills = getSkillsByCategory(category.value);
              return (
                <Card key={category.value} className="bg-white/80 backdrop-blur-sm border-gray-200/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Badge className={category.color}>{category.label}</Badge>
                      <span className="text-sm text-gray-500">({categorySkills.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map(skill => (
                        <Badge key={skill.id} variant="outline" className="bg-white">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Individual Skill Forms */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Manage Skills</h3>
            {data.map((skill) => (
              <Card key={skill.id} className="bg-white/80 backdrop-blur-sm border-gray-200/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-4 items-end">
                    <div>
                      <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                      <Input
                        id={`skill-name-${skill.id}`}
                        placeholder="JavaScript"
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="bg-white/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`skill-category-${skill.id}`}>Category</Label>
                      <Select value={skill.category} onValueChange={(value) => updateSkill(skill.id, 'category', value)}>
                        <SelectTrigger className="bg-white/80">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="soft">Soft Skills</SelectItem>
                          <SelectItem value="language">Language</SelectItem>
                          <SelectItem value="tool">Tools</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`skill-level-${skill.id}`}>Proficiency</Label>
                      <Select value={skill.level} onValueChange={(value) => updateSkill(skill.id, 'level', value)}>
                        <SelectTrigger className="bg-white/80">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsForm;
