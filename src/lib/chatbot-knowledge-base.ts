/**
 * Comprehensive Knowledge Base for Datacare Limited AI Chatbot
 * Contains all website content for intelligent query responses
 * Last Updated: December 2025
 */

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: 'productivity' | 'automation' | 'backup' | 'analytics';
  plans: ProductPlan[];
  features: string[];
  stats: Record<string, string>;
  keywords: string[];
}

export interface ProductPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  benefits: string[];
  pricing: PricingInfo;
  timeline: string;
  stats?: Record<string, string>;
  keywords: string[];
}

export interface PricingInfo {
  starter?: string;
  growth?: string;
  enterprise?: string;
  note?: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  url: string;
  challenges: string[];
  solutions: string[];
  keywords: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'products' | 'solutions' | 'pricing' | 'support' | 'company' | 'technical';
  keywords: string[];
  relatedLinks?: Array<{ text: string; url: string }>;
}

export interface CompanyInfo {
  name: string;
  founded: string;
  mission: string;
  vision: string;
  values: string[];
  stats: Record<string, string>;
  offices: Office[];
  certifications: string[];
  contact: ContactInfo;
}

export interface Office {
  location: string;
  address: string;
  phone: string[];
  email: string;
  hours: string;
  isHeadquarters?: boolean;
}

export interface ContactInfo {
  primaryPhone: string;
  alternativePhone: string;
  email: string;
  emergencyEmail: string;
  whatsapp: string;
  responseTime: string;
}

// ==================== PRODUCTS ====================

export const products: Product[] = [
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    tagline: 'Complete productivity suite with enterprise-grade security',
    description: 'Enterprise-grade productivity platform with Office apps, Teams collaboration, OneDrive storage, and advanced security features.',
    url: '/products/microsoft-365',
    category: 'productivity',
    plans: [
      {
        name: 'Business Basic',
        price: '$6',
        period: 'per user/month',
        description: 'Essential cloud productivity and collaboration tools',
        features: [
          'Web versions of Office apps (Word, Excel, PowerPoint)',
          '1TB OneDrive cloud storage per user',
          'Microsoft Teams for collaboration',
          'Business-class email with Outlook',
          'Microsoft support included'
        ]
      },
      {
        name: 'Business Standard',
        price: '$12.50',
        period: 'per user/month',
        description: 'Full Office apps plus enhanced collaboration',
        features: [
          'Desktop Office apps (Word, Excel, PowerPoint, Outlook)',
          '1TB OneDrive cloud storage',
          'Microsoft Teams with advanced features',
          'SharePoint for document management',
          'Exchange email hosting',
          'Webinar capabilities for up to 300 attendees'
        ],
        popular: true
      },
      {
        name: 'Business Premium',
        price: '$22',
        period: 'per user/month',
        description: 'Everything in Standard plus advanced security',
        features: [
          'Everything in Business Standard',
          'Advanced threat protection',
          'Device management and app protection',
          'Azure Information Protection',
          'Intune mobile device management',
          'Windows 10/11 Enterprise deployment'
        ]
      }
    ],
    features: [
      'Teams Collaboration - video conferencing, chat, file sharing',
      'Office Apps - Word, Excel, PowerPoint, Outlook',
      'Cloud Storage - OneDrive and SharePoint integration',
      'Advanced Security - enterprise-grade protection',
      'Mobile Apps - iOS and Android support',
      '24/7 Support - Microsoft technical support included'
    ],
    stats: {
      'Users Migrated': '1000+',
      'Uptime': '99.9%',
      'Migration Time': '24 hours'
    },
    keywords: ['microsoft', 'office', '365', 'm365', 'teams', 'outlook', 'onedrive', 'word', 'excel', 'powerpoint', 'email', 'collaboration', 'productivity']
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    tagline: 'Collaborative productivity platform with AI features',
    description: 'Collaborative productivity platform with Gmail, Drive, Meet, and advanced AI-powered features for modern teams.',
    url: '/products/google-workspace',
    category: 'productivity',
    plans: [
      {
        name: 'Business Starter',
        price: '$6',
        period: 'per user/month',
        description: 'Professional email and essential collaboration tools',
        features: [
          'Professional Gmail and Calendar',
          '30GB cloud storage per user',
          'Google Meet (100 participants)',
          'Google Drive file sharing',
          'Google Docs, Sheets, Slides',
          'Standard security controls'
        ]
      },
      {
        name: 'Business Standard',
        price: '$12',
        period: 'per user/month',
        description: 'Enhanced storage and advanced collaboration',
        features: [
          'Everything in Business Starter',
          '2TB cloud storage per user',
          'Google Meet (150 participants with recording)',
          'Security and admin controls',
          'Shared drives for team collaboration',
          'eDiscovery and data retention'
        ],
        popular: true
      },
      {
        name: 'Business Plus',
        price: '$18',
        period: 'per user/month',
        description: 'Advanced security and compliance features',
        features: [
          'Everything in Business Standard',
          '5TB cloud storage per user',
          'Google Meet (500 participants, attendance tracking)',
          'Advanced security features',
          'Vault for eDiscovery',
          'Enhanced admin controls'
        ]
      }
    ],
    features: [
      'Google Meet - HD video conferencing up to 500 participants',
      'Gmail & Calendar - professional email with smart scheduling',
      'Google Drive - secure cloud storage with real-time collaboration',
      'AI-Powered Tools - Smart Compose, Voice typing, grammar suggestions'
    ],
    stats: {
      'Users Migrated': '800+',
      'Uptime': '99.8%',
      'Migration Time': '12 hours'
    },
    keywords: ['google', 'workspace', 'gmail', 'drive', 'meet', 'docs', 'sheets', 'slides', 'calendar', 'email', 'g suite', 'gsuite']
  },
  {
    id: 'datacare-messaging',
    name: 'Datacare Messaging Platform',
    tagline: 'AI-powered WhatsApp automation for customer engagement',
    description: 'AI-powered WhatsApp automation platform for customer engagement, support, and marketing automation.',
    url: '/products/datacare-messaging-platform',
    category: 'automation',
    plans: [
      {
        name: 'Starter',
        price: '$99',
        period: 'per month',
        description: 'Essential WhatsApp automation for small businesses',
        features: [
          '1,000 messages per month',
          'Basic AI chatbot',
          'WhatsApp Business API integration',
          'Message templates',
          'Basic analytics',
          'Email support'
        ]
      },
      {
        name: 'Professional',
        price: '$299',
        period: 'per month',
        description: 'Advanced automation with analytics',
        features: [
          '10,000 messages per month',
          'Advanced AI workflows',
          'Analytics dashboard',
          'Multi-agent support',
          'Custom chatbot training',
          'Priority support',
          'Broadcast messaging'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'pricing',
        description: 'Unlimited automation with custom integrations',
        features: [
          'Unlimited messages',
          'Custom AI training',
          'API integrations',
          'White-label options',
          'Dedicated account manager',
          '24/7 support',
          'Custom workflows'
        ]
      }
    ],
    features: [
      'AI Chatbots - intelligent responses for common queries',
      'WhatsApp Integration - Official WhatsApp Business API',
      'Workflow Automation - custom workflows for your business',
      'Analytics Dashboard - track performance and engagement'
    ],
    stats: {
      'Support Call Reduction': '65%',
      'Instant Resolution': '90%',
      'Availability': '24/7'
    },
    keywords: ['whatsapp', 'messaging', 'automation', 'chatbot', 'ai', 'customer service', 'support', 'chat', 'sms']
  },
  {
    id: 'cloud-backup',
    name: 'Cloud Backup & Recovery',
    tagline: 'Enterprise backup with instant recovery',
    description: 'Enterprise-grade backup solutions with instant recovery, continuous data protection, and 99.99% uptime guarantee.',
    url: '/products/cloud-backup-and-recovery',
    category: 'backup',
    plans: [
      {
        name: 'Essential',
        price: '$49',
        period: 'per TB/month',
        description: 'Basic backup protection',
        features: [
          'Daily automated backups',
          '30-day retention',
          'Basic recovery tools',
          'Email notifications',
          'Email support'
        ]
      },
      {
        name: 'Professional',
        price: '$99',
        period: 'per TB/month',
        description: 'Continuous protection with instant recovery',
        features: [
          'Continuous data protection',
          '90-day retention',
          'Instant recovery',
          '24/7 monitoring',
          'Priority support',
          'Ransomware detection'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'pricing',
        description: 'Complete disaster recovery solution',
        features: [
          'Everything in Professional',
          'Unlimited retention',
          'Disaster recovery',
          'Dedicated support',
          'SLA guarantees',
          'Compliance reporting'
        ]
      }
    ],
    features: [
      'Automated Backup - continuous data protection with zero intervention',
      'Multi-Cloud Storage - redundant storage across multiple data centers',
      'Instant Recovery - restore files, databases, or entire systems quickly',
      'Compliance Ready - meet regulatory requirements and audit standards'
    ],
    stats: {
      'Uptime': '99.99%',
      'Recovery Time': '15 minutes',
      'Data Loss Incidents': '0'
    },
    keywords: ['backup', 'recovery', 'disaster recovery', 'cloud backup', 'data protection', 'ransomware', 'restore']
  }
];

// ==================== SOLUTIONS ====================

export const solutions: Solution[] = [
  {
    id: 'employee-amplification',
    name: 'Employee Amplification',
    tagline: 'Transform hidden capacity into competitive advantage',
    description: 'Premium AI-powered workforce optimization service that reclaims 20+ hours per week per senior employee with 60-90 day ROI guarantee.',
    url: '/employee-amplification',
    benefits: [
      'Reclaim 20+ hours/week per senior employee',
      '60-90 day ROI guaranteed',
      '3-5x capacity increase',
      '90%+ adoption rate',
      'ISO 27001 aligned security'
    ],
    pricing: {
      starter: 'Contact for pricing (30-day implementation)',
      growth: 'Contact for pricing (60-day implementation)',
      enterprise: 'Contact for pricing (90-120 day phased rollout)',
      note: 'Free 90-minute capacity assessment included'
    },
    timeline: '30-120 days depending on package',
    stats: {
      'Hours Reclaimed': '20+/week per employee',
      'ROI Timeline': '60-90 days',
      'Adoption Rate': '90%+',
      'Capacity Increase': '3-5x'
    },
    keywords: ['employee amplification', 'productivity', 'automation', 'workflow', 'efficiency', 'capacity', 'roi']
  },
  {
    id: 'cloud-licensing',
    name: 'Cloud & Licensing',
    tagline: 'Streamline software management and cloud infrastructure',
    description: 'Enterprise-grade cloud infrastructure and software licensing optimization with 30% average cost savings.',
    url: '/solutions/cloud-and-licensing',
    benefits: [
      '30% average cost savings',
      '99.9% uptime guarantee',
      '24-48 hour rapid deployment',
      '24/7 expert support',
      'License audit and optimization'
    ],
    pricing: {
      starter: '$99/month (up to 25 users)',
      growth: '$299/month (up to 100 users)',
      enterprise: 'Custom pricing (unlimited users)'
    },
    timeline: '24-48 hours deployment',
    stats: {
      'Businesses Served': '500+',
      'Cost Savings': '30%',
      'Uptime': '99.9%'
    },
    keywords: ['cloud', 'licensing', 'microsoft', 'google', 'software', 'saas', 'optimization', 'migration']
  },
  {
    id: 'ai-messaging',
    name: 'AI & Messaging Automation',
    tagline: 'Intelligent WhatsApp automation and messaging',
    description: 'Transform customer engagement with AI-powered WhatsApp automation reducing call volume by 65%.',
    url: '/solutions/ai-and-messaging-automation',
    benefits: [
      '65% reduction in call volume',
      '24/7 automated customer support',
      '3x faster response times',
      'Multi-channel messaging support',
      'Advanced analytics and insights'
    ],
    pricing: {
      starter: '$199/month (1,000 conversations)',
      growth: '$499/month (5,000 conversations)',
      enterprise: 'Custom pricing (unlimited)'
    },
    timeline: '24 hours deployment',
    keywords: ['whatsapp', 'automation', 'ai', 'chatbot', 'messaging', 'customer service']
  },
  {
    id: 'web-design',
    name: 'Web Design as a Service',
    tagline: 'Professional website design with unlimited revisions',
    description: 'Monthly retainer website design and maintenance with 12-month commitment and unlimited revisions.',
    url: '/solutions/web-design-as-a-service',
    benefits: [
      'Unlimited revisions included',
      '72-hour average turnaround',
      '99.9% uptime guarantee',
      '24/7 support and monitoring',
      'Dedicated design team'
    ],
    pricing: {
      starter: '$1,500/month ($18,000 for 12 months - up to 5 pages)',
      growth: '$3,500/month ($42,000 for 12 months - up to 15 pages)',
      enterprise: '$7,500/month ($90,000 for 12 months - unlimited pages)',
      note: '12-month minimum commitment required'
    },
    timeline: '4 weeks from concept to launch',
    stats: {
      'Websites Delivered': '200+',
      'Turnaround Time': '72 hours',
      'Uptime': '99.9%'
    },
    keywords: ['website', 'web design', 'development', 'responsive', 'seo', 'e-commerce']
  },
  {
    id: 'sme-transformation',
    name: 'SME Digital Transformation',
    tagline: 'Complete digital modernization for SMEs',
    description: 'Comprehensive digital transformation for Small and Medium Enterprises with 60% productivity increase.',
    url: '/solutions/sme-digital-transformation',
    benefits: [
      '60% productivity increase',
      '40% cost reduction',
      'Complete digital audit included',
      'Comprehensive staff training',
      '90-day implementation'
    ],
    pricing: {
      starter: '$5,000 (micro enterprises 1-10 employees)',
      growth: '$15,000 (small businesses 11-50 employees)',
      enterprise: '$35,000 (medium enterprises 51+ employees)'
    },
    timeline: '90 days',
    stats: {
      'SMEs Transformed': '300+',
      'Productivity Increase': '60%',
      'Cost Reduction': '40%'
    },
    keywords: ['digital transformation', 'sme', 'modernization', 'cloud', 'automation']
  },
  {
    id: 'security-compliance',
    name: 'Security & Compliance',
    tagline: 'Comprehensive cybersecurity and compliance',
    description: 'Enterprise cybersecurity and regulatory compliance with 99.8% threat detection rate and 24/7 monitoring.',
    url: '/solutions/security-and-compliance',
    benefits: [
      '99.8% threat detection rate',
      '24/7 security monitoring',
      'Zero successful breaches',
      'Compliance framework support',
      'Incident response under 15 minutes'
    ],
    pricing: {
      starter: '$500/month (essential protection)',
      growth: '$1,500/month (24/7 monitoring)',
      enterprise: 'Custom pricing (dedicated SOC)'
    },
    timeline: 'Immediate deployment',
    stats: {
      'Threat Detection': '99.8%',
      'Response Time': '< 15 minutes',
      'Breaches': '0'
    },
    keywords: ['security', 'cybersecurity', 'compliance', 'iso 27001', 'gdpr', 'firewall', 'monitoring']
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    tagline: 'Turn data into actionable insights',
    description: 'Business intelligence and analytics platform with AI-powered insights and real-time dashboards.',
    url: '/solutions/data-and-analytics',
    benefits: [
      '85% decision speed improvement',
      'Real-time dashboards',
      'Predictive analytics with AI',
      'Unlimited data sources',
      '24/7 monitoring'
    ],
    pricing: {
      starter: '$500/month (basic dashboards)',
      growth: '$1,500/month (advanced analytics)',
      enterprise: 'Custom pricing (AI insights)'
    },
    timeline: '2-4 weeks',
    stats: {
      'Reports Generated': '500+',
      'Decision Speed': '85% faster',
      'Monitoring': '24/7'
    },
    keywords: ['analytics', 'data', 'business intelligence', 'bi', 'dashboards', 'reporting', 'insights']
  }
];

// ==================== INDUSTRIES ====================

export const industries: Industry[] = [
  {
    id: 'smes',
    name: 'Small & Medium Enterprises',
    description: 'Affordable technology solutions designed specifically for SMEs with limited IT budgets',
    url: '/industries/smes',
    challenges: ['Limited IT budget', 'No dedicated IT staff', 'Scaling issues', 'Security concerns'],
    solutions: ['SME Digital Transformation', 'Cloud & Licensing', 'Professional Website', 'WhatsApp Automation'],
    keywords: ['sme', 'small business', 'startup', 'affordable']
  },
  {
    id: 'legal',
    name: 'Legal & Law Firms',
    description: 'Secure, compliant IT solutions for law firms with client-attorney privilege protection',
    url: '/industries/legal',
    challenges: ['Client data security', 'Compliance requirements', 'Document management', 'Time tracking'],
    solutions: ['Secure Document Management', 'Case Management Systems', 'Time & Billing', 'Security & Compliance'],
    keywords: ['legal', 'law firm', 'attorney', 'lawyer', 'case management']
  },
  {
    id: 'banking',
    name: 'Banking & Finance',
    description: 'Secure IT infrastructure for banks, SACCOs, and financial institutions',
    url: '/industries/banking',
    challenges: ['Regulatory compliance', 'Fraud detection', 'Customer security', 'System uptime'],
    solutions: ['Core Banking Systems', 'Cybersecurity', 'Customer Portals', 'Financial Analytics'],
    keywords: ['banking', 'finance', 'sacco', 'financial', 'fintech']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'HIPAA-compliant technology for hospitals, clinics, and healthcare providers',
    url: '/industries/healthcare',
    challenges: ['Patient data security', 'HIPAA compliance', 'Medical records', 'Telemedicine'],
    solutions: ['Electronic Health Records', 'Patient Portals', 'Telemedicine', 'Medical Analytics'],
    keywords: ['healthcare', 'hospital', 'clinic', 'medical', 'hipaa']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Modern IT infrastructure and digital learning solutions for educational institutions',
    url: '/industries/education',
    challenges: ['Digital learning', 'Student data management', 'Remote learning', 'Campus security'],
    solutions: ['Learning Management Systems', 'Student Information Systems', 'Digital Libraries', 'Campus Security'],
    keywords: ['education', 'school', 'university', 'college', 'learning']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Industry 4.0 solutions for modern manufacturing and production facilities',
    url: '/industries/manufacturing',
    challenges: ['Production optimization', 'Supply chain', 'Quality control', 'Industrial security'],
    solutions: ['ERP Systems', 'IoT & Automation', 'Production Analytics', 'Supply Chain Management'],
    keywords: ['manufacturing', 'production', 'factory', 'industry 4.0']
  },
  {
    id: 'ngos',
    name: 'Non-Profit Organizations',
    description: 'Cost-effective IT solutions that maximize impact for NGOs and non-profits',
    url: '/industries/ngos',
    challenges: ['Limited budget', 'Donor management', 'Remote teams', 'Data security'],
    solutions: ['Donor Management', 'Program Management', 'Remote Collaboration', 'Volunteer Management'],
    keywords: ['ngo', 'non-profit', 'nonprofit', 'charity', 'donor']
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Secure, compliant technology for government agencies and public sector',
    url: '/industries/government',
    challenges: ['Data sovereignty', 'Compliance', 'Security', 'Budget constraints'],
    solutions: ['Government Cloud', 'Security Package', 'Compliance Management', 'Citizen Services'],
    keywords: ['government', 'public sector', 'state', 'parastatal']
  }
];

// ==================== COMPANY INFO ====================

export const companyInfo: CompanyInfo = {
  name: 'Datacare Limited',
  founded: '2012',
  mission: 'Democratize access to world-class IT solutions across Africa by leveraging AI, innovative technologies, and deep local expertise',
  vision: 'To be Africa\'s leading AI-integrated IT solutions provider, setting global standards for innovation and service excellence',
  values: [
    'Innovation First - embrace emerging technologies',
    'Security by Design - prioritize security in every solution',
    'Client-Centric - build lasting partnerships',
    'Transparency - open communication and clear reporting',
    'Continuous Growth - invest in team and technology',
    'Local Impact - advance Africa\'s digital transformation'
  ],
  stats: {
    'Years in Business': '12+',
    'Organizations Served': '500+',
    'Team Members': '150+',
    'Countries': '3 (Kenya, Uganda, Tanzania)',
    'AI Models Deployed': '50+',
    'Uptime SLA': '99.9%'
  },
  offices: [
    {
      location: 'Nairobi, Kenya (Headquarters)',
      address: 'Myfair Maissonettes, Block C2, Mpaka Road, Westlands',
      phone: ['+254 784 155 752', '+254 722 155 752'],
      email: 'info@datacare.co.ke',
      hours: 'Mon-Fri: 9AM-5PM, Sat: 9AM-2PM, Sun: Closed (EAT/UTC+3)',
      isHeadquarters: true
    },
    {
      location: 'Kampala, Uganda',
      address: 'Parliament Avenue, Nakasero Business District',
      phone: ['+256 (0) 41 123 456'],
      email: 'kampala@datacare.co.ke',
      hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-1PM, Sun: Closed'
    },
    {
      location: 'Dar es Salaam, Tanzania',
      address: 'Haile Selassie Road, Masaki Business District',
      phone: ['+255 (0) 22 123 456'],
      email: 'dar@datacare.co.ke',
      hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-1PM, Sun: Closed'
    }
  ],
  certifications: [
    'ISO 27001 Certified',
    'AWS Advanced Partner',
    'Microsoft Gold Partner',
    'Cisco Premier Partner',
    'VMware Enterprise Partner',
    'PCI DSS Compliant'
  ],
  contact: {
    primaryPhone: '+254 784 155 752',
    alternativePhone: '+254 722 155 752',
    email: 'info@datacare.co.ke',
    emergencyEmail: 'emergency@datacare.co.ke',
    whatsapp: 'https://wa.me/254784155752',
    responseTime: '4 hours during business hours'
  }
};

// ==================== FAQs ====================

export const faqs: FAQ[] = [
  // Pricing FAQs
  {
    id: 'pricing-m365',
    question: 'How much does Microsoft 365 cost?',
    answer: 'Microsoft 365 starts at $6/user/month for Business Basic, $12.50/user/month for Business Standard (most popular), and $22/user/month for Business Premium with advanced security.',
    category: 'pricing',
    keywords: ['microsoft 365', 'pricing', 'cost', 'm365', 'price'],
    relatedLinks: [{ text: 'View all Microsoft 365 plans', url: '/products/microsoft-365' }]
  },
  {
    id: 'pricing-google',
    question: 'What are Google Workspace pricing options?',
    answer: 'Google Workspace starts at $6/user/month for Business Starter, $12/user/month for Business Standard (most popular with 2TB storage), and $18/user/month for Business Plus.',
    category: 'pricing',
    keywords: ['google workspace', 'pricing', 'cost', 'gmail', 'price'],
    relatedLinks: [{ text: 'View Google Workspace plans', url: '/products/google-workspace' }]
  },
  {
    id: 'pricing-whatsapp',
    question: 'How much is WhatsApp automation?',
    answer: 'Our Datacare Messaging Platform starts at $99/month for 1,000 messages, $299/month for 10,000 messages (most popular), or custom enterprise pricing for unlimited messages.',
    category: 'pricing',
    keywords: ['whatsapp', 'automation', 'pricing', 'messaging', 'cost'],
    relatedLinks: [{ text: 'View messaging platform details', url: '/products/datacare-messaging-platform' }]
  },
  {
    id: 'pricing-website',
    question: 'What does web design cost?',
    answer: 'Web Design as a Service starts at $1,500/month (12-month commitment) for up to 5 pages, $3,500/month for up to 15 pages, or $7,500/month for unlimited pages with dedicated team.',
    category: 'pricing',
    keywords: ['website', 'web design', 'pricing', 'cost', 'development'],
    relatedLinks: [{ text: 'View web design packages', url: '/solutions/web-design-as-a-service' }]
  },

  // Product Comparison FAQs
  {
    id: 'compare-m365-google',
    question: 'Microsoft 365 vs Google Workspace - which is better?',
    answer: 'Microsoft 365 is best for businesses needing desktop Office apps and Windows integration. Google Workspace excels at real-time collaboration and is more cost-effective for education/NGOs. Both start at $6/user/month. We can help you choose based on your needs.',
    category: 'products',
    keywords: ['microsoft', 'google', 'comparison', 'vs', 'compare', 'difference'],
    relatedLinks: [
      { text: 'Microsoft 365 details', url: '/products/microsoft-365' },
      { text: 'Google Workspace details', url: '/products/google-workspace' }
    ]
  },

  // Migration FAQs
  {
    id: 'migration-time',
    question: 'How long does cloud migration take?',
    answer: 'Microsoft 365 migration typically takes 24 hours, Google Workspace takes 12 hours. We handle everything with minimal disruption to your business operations.',
    category: 'technical',
    keywords: ['migration', 'time', 'duration', 'how long', 'switch'],
    relatedLinks: [{ text: 'Cloud & Licensing services', url: '/solutions/cloud-and-licensing' }]
  },
  {
    id: 'migration-support',
    question: 'Do you help with migration from our current system?',
    answer: 'Yes! We provide complete migration services including data transfer, account setup, user training, and 24/7 support. Our team has migrated 1,800+ users with zero data loss.',
    category: 'support',
    keywords: ['migration', 'help', 'support', 'switch', 'transfer', 'move'],
    relatedLinks: [{ text: 'Contact us', url: '/contact' }]
  },

  // Feature FAQs
  {
    id: 'features-m365',
    question: 'What does Microsoft 365 include?',
    answer: 'Microsoft 365 includes Office apps (Word, Excel, PowerPoint, Outlook), Microsoft Teams, 1TB OneDrive storage, SharePoint, Exchange email, and enterprise security. Desktop apps included in Standard and Premium plans.',
    category: 'products',
    keywords: ['microsoft 365', 'features', 'includes', 'what is', 'apps'],
    relatedLinks: [{ text: 'Full Microsoft 365 features', url: '/products/microsoft-365' }]
  },
  {
    id: 'features-whatsapp',
    question: 'What can the WhatsApp automation do?',
    answer: 'Our platform provides AI chatbots for instant responses, automated workflows, broadcast messaging, analytics, multi-agent support, and integrations with your systems. Reduces support calls by 65%.',
    category: 'products',
    keywords: ['whatsapp', 'features', 'automation', 'chatbot', 'capabilities'],
    relatedLinks: [{ text: 'Messaging platform features', url: '/products/datacare-messaging-platform' }]
  },

  // Support FAQs
  {
    id: 'support-hours',
    question: 'What are your support hours?',
    answer: 'We offer email support during business hours (Mon-Fri 9AM-5PM, Sat 9AM-2PM EAT) with 4-hour response time. Premium customers get 24/7 monitoring and emergency support.',
    category: 'support',
    keywords: ['support', 'hours', 'availability', 'when', 'time'],
    relatedLinks: [{ text: 'Contact us', url: '/contact' }]
  },
  {
    id: 'support-emergency',
    question: 'Do you offer 24/7 support?',
    answer: 'Yes! 24/7 monitoring and emergency support are included with Professional and Enterprise plans. For critical issues, contact emergency@datacare.co.ke or call +254 784 155 752.',
    category: 'support',
    keywords: ['24/7', 'emergency', 'support', 'urgent', 'critical'],
    relatedLinks: [{ text: 'Contact support', url: '/contact' }]
  },

  // Company FAQs
  {
    id: 'company-location',
    question: 'Where are you located?',
    answer: 'Our headquarters is in Nairobi, Kenya (Westlands, Mpaka Road). We also have offices in Kampala, Uganda and Dar es Salaam, Tanzania. We serve clients across East Africa.',
    category: 'company',
    keywords: ['location', 'office', 'address', 'where', 'based'],
    relatedLinks: [{ text: 'Office locations', url: '/contact' }]
  },
  {
    id: 'company-experience',
    question: 'How long have you been in business?',
    answer: 'Datacare Limited was founded in 2012, giving us 12+ years of experience. We\'ve served 500+ organizations with a team of 150+ professionals across 3 countries.',
    category: 'company',
    keywords: ['experience', 'years', 'history', 'established', 'founded'],
    relatedLinks: [{ text: 'About us', url: '/about' }]
  },
  {
    id: 'company-certifications',
    question: 'What certifications do you have?',
    answer: 'We are ISO 27001 certified for information security. We\'re also an AWS Advanced Partner, Microsoft Gold Partner, Cisco Premier Partner, and PCI DSS compliant.',
    category: 'company',
    keywords: ['certifications', 'certified', 'iso', 'compliance', 'accreditation'],
    relatedLinks: [{ text: 'About us', url: '/about' }]
  },

  // Employee Amplification FAQs
  {
    id: 'employee-amp-what',
    question: 'What is Employee Amplification?',
    answer: 'Employee Amplification is our premium service that uses AI and automation to reclaim 20+ hours/week per senior employee. We identify buried capacity and implement custom workflows with 60-90 day ROI guarantee.',
    category: 'solutions',
    keywords: ['employee amplification', 'what is', 'productivity', 'automation'],
    relatedLinks: [{ text: 'Employee Amplification details', url: '/employee-amplification' }]
  },
  {
    id: 'employee-amp-roi',
    question: 'What is the ROI of Employee Amplification?',
    answer: 'We guarantee positive ROI within 60-90 days. Typical results: 20+ hours/week reclaimed per employee, 3-5x capacity increase, and 90%+ adoption rate. Includes free 90-minute assessment.',
    category: 'solutions',
    keywords: ['employee amplification', 'roi', 'return', 'results', 'savings'],
    relatedLinks: [{ text: 'View case studies', url: '/employee-amplification' }]
  },

  // Technical FAQs
  {
    id: 'tech-security',
    question: 'How secure is your cloud infrastructure?',
    answer: 'We use enterprise-grade security with 256-bit encryption, ISO 27001 certification, SOC 2 Type II compliance, and 24/7 monitoring. Data is stored in secure data centers with 99.9% uptime SLA.',
    category: 'technical',
    keywords: ['security', 'secure', 'encryption', 'safe', 'protection'],
    relatedLinks: [{ text: 'Security & Compliance', url: '/solutions/security-and-compliance' }]
  },
  {
    id: 'tech-backup',
    question: 'Do you provide backup services?',
    answer: 'Yes! Our Cloud Backup & Recovery service starts at $49/TB/month with daily backups, or $99/TB/month for continuous protection with 15-minute recovery time and 99.99% uptime.',
    category: 'technical',
    keywords: ['backup', 'recovery', 'disaster recovery', 'data protection'],
    relatedLinks: [{ text: 'Backup solutions', url: '/products/cloud-backup-and-recovery' }]
  },

  // Contact & Sales FAQs
  {
    id: 'get-quote',
    question: 'How can I get a custom quote?',
    answer: 'Great! I can help you get a personalized quote. Please share: 1) What solution(s) interest you? 2) How many users/employees? 3) Any specific requirements?\n\nOr contact our sales team directly:\n• WhatsApp: +254 784 155 752\n• Email: sales@datacare.co.ke\n• Office: +254 709 980 000',
    category: 'sales',
    keywords: ['quote', 'pricing', 'custom quote', 'proposal', 'estimate', 'cost'],
    relatedLinks: [{ text: 'Contact us', url: '/contact' }]
  },
  {
    id: 'book-consultation',
    question: 'How do I book a consultation?',
    answer: 'I\'d be happy to help you schedule a consultation! Here are your options:\n\n1. **WhatsApp**: Message us at +254 784 155 752 and we\'ll schedule a time that works for you\n2. **Call**: Ring us at +254 709 980 000 (Mon-Fri, 8AM-5PM EAT)\n3. **Email**: Send your preferred dates/times to sales@datacare.co.ke\n4. **Visit**: Walk into any of our offices in Nairobi, Kampala, or Dar es Salaam\n\nOur consultations are FREE and typically last 30-60 minutes. We\'ll discuss your needs and recommend the best solutions.',
    category: 'sales',
    keywords: ['consultation', 'book', 'schedule', 'appointment', 'meeting', 'demo'],
    relatedLinks: [{ text: 'Contact details', url: '/contact' }]
  },
  {
    id: 'talk-to-expert',
    question: 'Can I speak to a technical expert?',
    answer: 'Absolutely! Our technical experts are ready to help you:\n\n**Immediate Help:**\n• WhatsApp: +254 784 155 752 (fastest response)\n• Phone: +254 709 980 000 (Mon-Fri, 8AM-5PM EAT)\n\n**For Complex Queries:**\n• Email: support@datacare.co.ke (we\'ll assign a specialist)\n• Schedule a call: sales@datacare.co.ke\n\nWhat would you like to discuss? I can also answer many technical questions right here!',
    category: 'support',
    keywords: ['expert', 'talk', 'speak', 'specialist', 'technical support', 'help'],
    relatedLinks: [{ text: 'Contact support', url: '/contact' }]
  }
];
