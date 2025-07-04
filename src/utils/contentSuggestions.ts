
export const getPersonalInfoSuggestions = () => {
  return [
    "Keep your professional summary concise (2-3 sentences) and highlight your key value proposition.",
    "Include relevant keywords from your target industry to improve ATS compatibility.",
    "Use action verbs like 'accomplished,' 'initiated,' or 'optimized' to demonstrate impact.",
    "Mention specific years of experience and key technical skills in your summary."
  ];
};

export const getExperienceSuggestions = (jobTitle: string) => {
  const suggestions: { [key: string]: string[] } = {
    'software engineer': [
      "Developed and maintained web applications using React, Node.js, and MongoDB",
      "Collaborated with cross-functional teams to deliver features ahead of schedule",
      "Implemented automated testing that reduced bug reports by 40%",
      "Optimized database queries resulting in 25% faster load times"
    ],
    'project manager': [
      "Led cross-functional teams of 8+ members to deliver projects on time and under budget",
      "Implemented Agile methodologies that improved team productivity by 30%",
      "Managed project budgets ranging from $50K to $500K",
      "Reduced project delivery time by 20% through process optimization"
    ],
    'marketing manager': [
      "Developed and executed marketing campaigns that increased brand awareness by 45%",
      "Managed social media presence across 5 platforms with 50K+ followers",
      "Increased lead generation by 60% through targeted digital marketing strategies",
      "Collaborated with sales team to improve conversion rates by 25%"
    ]
  };

  const defaultSuggestions = [
    "Start each bullet point with a strong action verb",
    "Quantify your achievements with specific numbers and percentages",
    "Focus on results and impact rather than just responsibilities",
    "Use the STAR method: Situation, Task, Action, Result"
  ];

  const jobTitleLower = jobTitle.toLowerCase();
  const matchingKey = Object.keys(suggestions).find(key => 
    jobTitleLower.includes(key) || key.includes(jobTitleLower)
  );

  return matchingKey ? suggestions[matchingKey] : defaultSuggestions;
};

export const getSkillSuggestions = (industry: string) => {
  const skillsByIndustry: { [key: string]: string[] } = {
    'technology': [
      'Programming Languages: JavaScript, Python, Java, C++',
      'Frameworks: React, Angular, Node.js, Django',
      'Cloud Platforms: AWS, Azure, Google Cloud',
      'DevOps: Docker, Kubernetes, Jenkins, Git'
    ],
    'marketing': [
      'Digital Marketing: SEO, SEM, Social Media Marketing',
      'Analytics: Google Analytics, HubSpot, Salesforce',
      'Content Creation: Adobe Creative Suite, Canva',
      'Project Management: Asana, Trello, Monday.com'
    ],
    'finance': [
      'Financial Analysis: Excel, R, Python, SQL',
      'Software: Bloomberg Terminal, SAP, Oracle',
      'Compliance: SOX, GAAP, IFRS knowledge',
      'Risk Management: VaR, Monte Carlo modeling'
    ]
  };

  return skillsByIndustry[industry.toLowerCase()] || [
    'Focus on skills that are relevant to your target job',
    'Include both technical and soft skills',
    'Group similar skills together for better organization',
    'Use industry-standard terminology and acronyms'
  ];
};
