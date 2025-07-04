
import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const renderModernTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-blue-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        {(data.personalInfo.linkedin || data.personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-blue-600">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-blue-600">Professional Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={exp.id} className={`${index > 0 ? 'mt-4' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                </div>
                <div className="text-gray-600 text-right">
                  <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.description && <p className="text-gray-700 mb-2">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-blue-600">Education</h2>
          {data.education.map((edu, index) => (
            <div key={edu.id} className={`${index > 0 ? 'mt-3' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-gray-600">
                  <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-blue-600">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {['technical', 'soft', 'language', 'tool'].map(category => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              const categoryLabels = {
                technical: 'Technical Skills',
                soft: 'Soft Skills',
                language: 'Languages',
                tool: 'Tools & Software'
              };

              return (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 mb-2">{categoryLabels[category as keyof typeof categoryLabels]}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map(skill => (
                      <span key={skill.id} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderProfessionalTemplate = () => (
    <div className="max-w-2xl mx-auto bg-white p-8 text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif text-gray-900 mb-3">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="border-t border-b border-gray-300 py-3">
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-serif text-gray-900 mb-3 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-serif text-gray-900 mb-4 border-b border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
              {data.experience.map((exp, index) => (
                <div key={exp.id} className={`${index > 0 ? 'mt-6' : ''}`}>
                  <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                  <p className="text-gray-700 font-semibold italic">{exp.company}</p>
                  <p className="text-gray-600 text-sm mb-2">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  {exp.description && <p className="text-gray-700 mb-2">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-base font-serif text-gray-900 mb-3 border-b border-gray-300 pb-1">EDUCATION</h2>
              {data.education.map((edu, index) => (
                <div key={edu.id} className={`${index > 0 ? 'mt-4' : ''} text-sm`}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.fieldOfStudy}</p>
                  <p className="text-gray-600 italic">{edu.institution}</p>
                  <p className="text-gray-600">{formatDate(edu.endDate)}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-base font-serif text-gray-900 mb-3 border-b border-gray-300 pb-1">SKILLS</h2>
              {['technical', 'soft', 'language', 'tool'].map(category => {
                const categorySkills = data.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {category === 'technical' ? 'Technical' : 
                       category === 'soft' ? 'Soft Skills' :
                       category === 'language' ? 'Languages' : 'Tools'}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {categorySkills.map(skill => skill.name).join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  switch (template) {
    case 'professional':
      return renderProfessionalTemplate();
    case 'modern':
    default:
      return renderModernTemplate();
  }
};

export default ResumePreview;
