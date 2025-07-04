
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, GraduationCap, Briefcase, Star, FileText, Download, Settings, Target } from 'lucide-react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import EducationForm from '@/components/EducationForm';
import ExperienceForm from '@/components/ExperienceForm';
import SkillsForm from '@/components/SkillsForm';
import ResumePreview from '@/components/ResumePreview';
import ExportOptions from '@/components/ExportOptions';
import JobDescriptionAnalyzer from '@/components/JobDescriptionAnalyzer';
import ATSChecker from '@/components/ATSChecker';
import TemplateSelector from '@/components/TemplateSelector';
import { ResumeData, ResumeTemplate } from '@/types/resume';

const Index = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { fullName: '', email: '', phone: '', location: '', summary: '' },
    education: [],
    experience: [],
    skills: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern');
  const [atsScore, setAtsScore] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 4;
    
    if (resumeData.personalInfo.fullName) completed++;
    if (resumeData.education.length > 0) completed++;
    if (resumeData.experience.length > 0) completed++;
    if (resumeData.skills.length > 0) completed++;
    
    return (completed / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PS Resume Maker
              </h1>
              <p className="text-gray-600 mt-1">Build an ATS-Ready Resume in Minutes</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                ATS Score: {atsScore}%
              </Badge>
              <div className="flex items-center gap-2">
                <Progress value={getCompletionPercentage()} className="w-20" />
                <span className="text-sm text-gray-600">{Math.round(getCompletionPercentage())}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="col-span-7">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experience
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Skills
                </TabsTrigger>
                <TabsTrigger value="match" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Job Match
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm 
                  data={resumeData.personalInfo} 
                  onUpdate={(data) => updateResumeData('personalInfo', data)} 
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm 
                  data={resumeData.education} 
                  onUpdate={(data) => updateResumeData('education', data)} 
                />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm 
                  data={resumeData.experience} 
                  onUpdate={(data) => updateResumeData('experience', data)} 
                />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm 
                  data={resumeData.skills} 
                  onUpdate={(data) => updateResumeData('skills', data)} 
                />
              </TabsContent>

              <TabsContent value="match">
                <JobDescriptionAnalyzer 
                  resumeData={resumeData}
                  onScoreUpdate={setAtsScore}
                />
              </TabsContent>

              <TabsContent value="export">
                <div className="space-y-6">
                  <TemplateSelector 
                    selectedTemplate={selectedTemplate}
                    onTemplateChange={setSelectedTemplate}
                  />
                  <ExportOptions 
                    resumeData={resumeData}
                    template={selectedTemplate}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="col-span-5">
            <div className="sticky top-24">
              {/* Quick Actions */}
              <Card className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200/50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      DOCX
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Settings className="w-3 h-3" />
                      Template
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      ATS: {atsScore}%
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Resume Preview */}
              <Card className="bg-white shadow-xl border-gray-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <ResumePreview 
                      data={resumeData} 
                      template={selectedTemplate}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* ATS Checker */}
              <div className="mt-6">
                <ATSChecker 
                  resumeData={resumeData}
                  onScoreUpdate={setAtsScore}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
