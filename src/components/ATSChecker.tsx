
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface ATSCheckerProps {
  resumeData: ResumeData;
  onScoreUpdate: (score: number) => void;
}

interface ATSCheck {
  name: string;
  passed: boolean;
  weight: number;
  description: string;
}

const ATSChecker: React.FC<ATSCheckerProps> = ({ resumeData, onScoreUpdate }) => {
  const [atsScore, setAtsScore] = useState(0);
  const [checks, setChecks] = useState<ATSCheck[]>([]);

  useEffect(() => {
    const performATSChecks = () => {
      const atsChecks: ATSCheck[] = [
        {
          name: 'Contact Information',
          passed: !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone),
          weight: 15,
          description: 'Name, email, and phone number are present'
        },
        {
          name: 'Professional Summary',
          passed: !!(resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50),
          weight: 10,
          description: 'Has a substantial professional summary'
        },
        {
          name: 'Work Experience',
          passed: resumeData.experience.length > 0,
          weight: 25,
          description: 'Contains professional work experience'
        },
        {
          name: 'Education Information',
          passed: resumeData.education.length > 0,
          weight: 15,
          description: 'Includes educational background'
        },
        {
          name: 'Skills Section',
          passed: resumeData.skills.length >= 5,
          weight: 15,
          description: 'Lists relevant skills (at least 5)'
        },
        {
          name: 'Quantifiable Achievements',
          passed: resumeData.experience.some(exp => 
            exp.achievements.some(achievement => 
              /\d+/.test(achievement) || /\$/.test(achievement) || /%/.test(achievement)
            )
          ),
          weight: 10,
          description: 'Contains measurable achievements with numbers'
        },
        {
          name: 'Standard Date Format',
          passed: resumeData.experience.every(exp => exp.startDate && (exp.endDate || exp.current)),
          weight: 5,
          description: 'Uses consistent date formatting'
        },
        {
          name: 'Technical Skills',
          passed: resumeData.skills.some(skill => skill.category === 'technical'),
          weight: 5,
          description: 'Includes relevant technical skills'
        }
      ];

      setChecks(atsChecks);

      const totalPossibleScore = atsChecks.reduce((sum, check) => sum + check.weight, 0);
      const earnedScore = atsChecks
        .filter(check => check.passed)
        .reduce((sum, check) => sum + check.weight, 0);

      const calculatedScore = Math.round((earnedScore / totalPossibleScore) * 100);
      setAtsScore(calculatedScore);
      onScoreUpdate(calculatedScore);
    };

    performATSChecks();
  }, [resumeData, onScoreUpdate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent! Your resume is highly ATS-friendly.';
    if (score >= 60) return 'Good! A few improvements will make it even better.';
    return 'Needs improvement to pass ATS screening effectively.';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          ATS Compatibility Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Overview */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className={`text-3xl font-bold ${getScoreColor(atsScore)}`}>
            {atsScore}%
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {getScoreDescription(atsScore)}
          </p>
          <Progress value={atsScore} className="mt-3 h-2" />
        </div>

        {/* Individual Checks */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Detailed Checks:</h4>
          {checks.map((check, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className="mt-0.5">
                {check.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{check.name}</span>
                  <Badge variant={check.passed ? 'default' : 'destructive'} className="text-xs">
                    {check.weight} pts
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{check.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">ATS Tips:</h4>
              <ul className="text-sm text-amber-700 mt-2 space-y-1">
                <li>• Use standard section headings (Experience, Education, Skills)</li>
                <li>• Include keywords from job descriptions naturally</li>
                <li>• Use simple, clean formatting without tables or graphics</li>
                <li>• Save as .docx or .pdf when submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSChecker;
