
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { ResumeData, JobAnalysis } from '@/types/resume';

interface JobDescriptionAnalyzerProps {
  resumeData: ResumeData;
  onScoreUpdate: (score: number) => void;
}

const JobDescriptionAnalyzer: React.FC<JobDescriptionAnalyzerProps> = ({ resumeData, onScoreUpdate }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeJobMatch = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Extract skills from job description (simplified keyword matching)
      const jobKeywords = jobDescription.toLowerCase()
        .split(/[\s,\.;:\-\(\)\[\]]+/)
        .filter(word => word.length > 2)
        .filter(word => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'had', 'have', 'what', 'were', 'said', 'each', 'which', 'she', 'how', 'other', 'many', 'some', 'very', 'would', 'there', 'make', 'than', 'him', 'into', 'time', 'has', 'two', 'more', 'could', 'like', 'been', 'find'].includes(word));

      // Get resume skills
      const resumeSkills = resumeData.skills.map(skill => skill.name.toLowerCase());
      const resumeText = [
        resumeData.personalInfo.summary,
        ...resumeData.experience.map(exp => exp.description + ' ' + exp.achievements.join(' ')),
      ].join(' ').toLowerCase();

      // Find matching skills
      const matchingSkills = jobKeywords.filter(keyword => 
        resumeSkills.some(skill => skill.includes(keyword) || keyword.includes(skill)) ||
        resumeText.includes(keyword)
      );

      // Find missing skills (high-value keywords not in resume)
      const techSkills = ['javascript', 'python', 'react', 'node', 'aws', 'docker', 'kubernetes', 'sql', 'mongodb', 'git'];
      const missingSkills = jobKeywords.filter(keyword => 
        techSkills.includes(keyword) && 
        !resumeSkills.some(skill => skill.includes(keyword)) &&
        !resumeText.includes(keyword)
      );

      const matchPercentage = Math.min(95, Math.max(45, (matchingSkills.length / Math.max(jobKeywords.length * 0.3, 5)) * 100));

      const analysisResult: JobAnalysis = {
        matchingSkills: [...new Set(matchingSkills)].slice(0, 10),
        missingSkills: [...new Set(missingSkills)].slice(0, 8),
        matchPercentage: Math.round(matchPercentage),
        recommendations: [
          matchPercentage < 60 ? 'Consider adding more relevant technical skills to your resume' : 'Strong skill match with the job requirements',
          missingSkills.length > 0 ? `Focus on highlighting experience with: ${missingSkills.slice(0, 3).join(', ')}` : 'Your skills align well with this position',
          'Tailor your professional summary to match the job\'s key requirements',
          'Use quantifiable achievements that demonstrate impact'
        ]
      };

      setAnalysis(analysisResult);
      onScoreUpdate(analysisResult.matchPercentage);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Paste Job Description
            </label>
            <Textarea
              placeholder="Paste the job description here to analyze how well your resume matches..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-32 bg-white/80"
            />
          </div>
          <Button 
            onClick={analyzeJobMatch} 
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing Match...' : 'Analyze Job Match'}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          {/* Match Score */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Match Score
                </h3>
                <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                  {analysis.matchPercentage}%
                </Badge>
              </div>
              <Progress value={analysis.matchPercentage} className="h-3" />
              <p className="text-sm text-gray-600 mt-2">
                {analysis.matchPercentage >= 80 ? 'Excellent match! Your resume aligns very well with this job.' :
                 analysis.matchPercentage >= 60 ? 'Good match! Consider making a few adjustments.' :
                 'Room for improvement. Focus on highlighting relevant skills and experience.'}
              </p>
            </CardContent>
          </Card>

          {/* Matching Skills */}
          {analysis.matchingSkills.length > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  Matching Skills Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchingSkills.map((skill, index) => (
                    <Badge key={index} className="bg-green-600 text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Missing Skills */}
          {analysis.missingSkills.length > 0 && (
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <AlertCircle className="w-5 h-5" />
                  Skills to Consider Adding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-700">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionAnalyzer;
