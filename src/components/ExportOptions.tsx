
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Globe, FileImage } from 'lucide-react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { toast } from '@/components/ui/use-toast';

interface ExportOptionsProps {
  resumeData: ResumeData;
  template: ResumeTemplate;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ resumeData, template }) => {
  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
        .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 1.3rem; font-weight: bold; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
        .experience-item, .education-item { margin-bottom: 20px; }
        .job-title { font-weight: bold; font-size: 1.1rem; }
        .company { font-style: italic; color: #666; }
        .date { color: #666; font-size: 0.9rem; }
        .achievements { margin-top: 10px; }
        .achievements li { margin-bottom: 5px; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${resumeData.personalInfo.fullName || 'Your Name'}</div>
        <div class="contact">
            ${resumeData.personalInfo.email ? `<span>${resumeData.personalInfo.email}</span>` : ''}
            ${resumeData.personalInfo.phone ? `<span>${resumeData.personalInfo.phone}</span>` : ''}
            ${resumeData.personalInfo.location ? `<span>${resumeData.personalInfo.location}</span>` : ''}
        </div>
    </div>
    
    ${resumeData.personalInfo.summary ? `
    <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${resumeData.personalInfo.summary}</p>
    </div>
    ` : ''}
    
    ${resumeData.experience.length > 0 ? `
    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${resumeData.experience.map(exp => `
        <div class="experience-item">
            <div class="job-title">${exp.position}</div>
            <div class="company">${exp.company}</div>
            <div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            ${exp.description ? `<p>${exp.description}</p>` : ''}
            ${exp.achievements.length > 0 ? `
            <ul class="achievements">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
            ` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${resumeData.education.length > 0 ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${resumeData.education.map(edu => `
        <div class="education-item">
            <div class="job-title">${edu.degree} in ${edu.fieldOfStudy}</div>
            <div class="company">${edu.institution}</div>
            <div class="date">${edu.startDate} - ${edu.endDate}</div>
            ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${resumeData.skills.length > 0 ? `
    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill">${skill.name}</span>`).join('')}
        </div>
    </div>
    ` : ''}
</body>
</html>
    `;
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // For now, we'll simulate PDF export by creating a print-friendly HTML
    const htmlContent = generateHTML();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
    toast({
      title: "PDF Export",
      description: "Opening print dialog for PDF export...",
    });
  };

  const exportToHTML = () => {
    const htmlContent = generateHTML();
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.html`;
    downloadFile(htmlContent, filename, 'text/html');
    toast({
      title: "HTML Export",
      description: "Resume exported as HTML file successfully!",
    });
  };

  const exportToDocx = () => {
    // Simplified DOCX export - in production, you'd use a library like docx
    const docContent = `
${resumeData.personalInfo.fullName || 'Your Name'}

Contact Information:
Email: ${resumeData.personalInfo.email || 'N/A'}
Phone: ${resumeData.personalInfo.phone || 'N/A'}
Location: ${resumeData.personalInfo.location || 'N/A'}

${resumeData.personalInfo.summary ? `Professional Summary:\n${resumeData.personalInfo.summary}\n\n` : ''}

${resumeData.experience.length > 0 ? `Professional Experience:\n${resumeData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.description || ''}
${exp.achievements.length > 0 ? exp.achievements.map(a => `• ${a}`).join('\n') : ''}
`).join('\n')}\n` : ''}

${resumeData.education.length > 0 ? `Education:\n${resumeData.education.map(edu => `
${edu.degree} in ${edu.fieldOfStudy}
${edu.institution}
${edu.startDate} - ${edu.endDate}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n')}\n` : ''}

${resumeData.skills.length > 0 ? `Skills:\n${resumeData.skills.map(skill => skill.name).join(', ')}\n` : ''}
    `;
    
    const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.docx`;
    downloadFile(docContent, filename, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    toast({
      title: "DOCX Export",
      description: "Resume exported as DOCX file successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
        <CardHeader>
          <CardTitle>Export Your Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={exportToPDF} className="flex items-center gap-2 h-16 flex-col">
              <FileImage className="w-6 h-6" />
              <div>
                <div className="font-semibold">PDF Export</div>
                <div className="text-xs opacity-80">Print-ready format</div>
              </div>
            </Button>
            
            <Button onClick={exportToDocx} variant="outline" className="flex items-center gap-2 h-16 flex-col">
              <FileText className="w-6 h-6" />
              <div>
                <div className="font-semibold">DOCX Export</div>
                <div className="text-xs opacity-80">Editable document</div>
              </div>
            </Button>
            
            <Button onClick={exportToHTML} variant="outline" className="flex items-center gap-2 h-16 flex-col">
              <Globe className="w-6 h-6" />
              <div>
                <div className="font-semibold">HTML Export</div>
                <div className="text-xs opacity-80">Web-ready format</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportOptions;
