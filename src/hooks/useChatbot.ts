import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { queryKnowledgeBase, getPopularQuestions, type QueryResponse, type QuickAction } from '@/lib/chatbot-query-engine';

// ==================== TYPES ====================

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
  suggestions?: string[];
}

export interface ConversationData {
  intent: Intent | '';
  orgType: OrgType | '';
  size: CompanySize | '';
  need: PrimaryNeed | '';
  stack: CurrentStack | '';
  urgency: Urgency | '';
  budget: Budget | '';
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
}

export interface Recommendation {
  id: string;
  name: string;
  url: string;
  reason: string;
}

export type Intent = 'sales' | 'support' | 'general' | 'faq' | 'chat';
export type OrgType = 'SMEs' | 'Legal' | 'Banking & Finance' | 'Healthcare' | 'Education' | 'Manufacturing' | 'NGOs' | 'Government';
export type CompanySize = '1–10' | '11–50' | '51–300' | '300+';
export type PrimaryNeed = 'Email/Collaboration' | 'Device Management' | 'Security/Compliance' | 'Messaging Automation' | 'Website' | 'Backup/Recovery' | 'Data & Analytics';
export type CurrentStack = 'Microsoft 365' | 'Google Workspace' | 'On-prem' | 'None';
export type Urgency = 'Now' | '30 days' | '90 days';
export type Budget = 'Entry' | 'Standard' | 'Enterprise';

// ==================== CUSTOM HOOK ====================

export const useChatbot = () => {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [mode, setMode] = useState<'wizard' | 'chat'>('wizard'); // Support both modes
  const [currentStep, setCurrentStep] = useState('intent');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationData, setConversationData] = useState<ConversationData>({
    intent: '',
    orgType: '',
    size: '',
    need: '',
    stack: '',
    urgency: '',
    budget: '',
    contact: {
      name: '',
      email: '',
      company: '',
      phone: ''
    }
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [faqResponse, setFaqResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQueryResponse, setLastQueryResponse] = useState<QueryResponse | null>(null);

  // Track session start
  useEffect(() => {
    trackEvent('session_start', { timestamp: new Date().toISOString() });

    // Add welcome message
    addMessage('assistant', "Hi! I'm your Datacare AI assistant. I can help you find the perfect IT solution for your business. What can I help you with today?", [], getPopularQuestions().map(q => q.question).slice(0, 4));
  }, []);

  // ==================== UTILITY FUNCTIONS ====================

  const addMessage = (role: 'user' | 'assistant', content: string, quickActions: QuickAction[] = [], suggestions: string[] = []) => {
    const message: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
      quickActions: quickActions.length > 0 ? quickActions : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };

    setMessages(prev => [...prev, message]);
    return message;
  };

  const trackEvent = async (eventType: string, data?: any) => {
    try {
      await supabase.functions.invoke('chatbot-analytics', {
        body: { eventType, sessionId, data }
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  // ==================== CONVERSATIONAL AI FUNCTIONS ====================

  /**
   * Handle natural language query using AI query engine
   */
  const handleQuery = async (query: string) => {
    setIsLoading(true);
    addMessage('user', query);

    try {
      // Use our intelligent query engine
      const response = queryKnowledgeBase(query);

      setLastQueryResponse(response);
      trackEvent('query_processed', { query, resultsCount: response.results.length });

      // Add assistant response with quick actions
      addMessage('assistant', response.answer, response.quickActions, response.suggestions);

      return response;
    } catch (error) {
      console.error('Query processing failed:', error);
      addMessage('assistant', "I apologize, but I encountered an issue. Let me connect you with our team. Would you like to chat on WhatsApp or call us at +254 784 155 752?", [
        { label: 'WhatsApp Us', type: 'contact', url: 'https://wa.me/254784155752', icon: '💬' },
        { label: 'Call Us', type: 'contact', url: 'tel:+254784155752', icon: '📞' }
      ]);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle quick question from suggestions
   */
  const handleQuickQuestion = async (question: string) => {
    return await handleQuery(question);
  };

  // ==================== WIZARD MODE FUNCTIONS ====================

  const generateRecommendations = (data: ConversationData) => {
    const recs: Recommendation[] = [];

    // Enhanced recommendation logic with personalized messaging
    const industryFocus = data.orgType ? getIndustryFocus(data.orgType) : getIndustryFocus('SMEs');

    // Microsoft 365 Rules
    if (data.need === 'Email/Collaboration') {
      if (data.orgType && ['SMEs', 'Education'].includes(data.orgType)) {
        recs.push({
          id: 'm365-basic',
          name: 'Microsoft 365 Business Basic',
          url: '/products/microsoft-365',
          reason: `Perfect email and collaboration solution for ${data.orgType.toLowerCase()}. ${industryFocus.emailReason}`
        });
      } else if (data.orgType) {
        recs.push({
          id: 'm365-standard',
          name: 'Microsoft 365 Business Standard',
          url: '/products/microsoft-365',
          reason: `Enhanced collaboration with desktop apps for professional ${data.orgType.toLowerCase()} operations`
        });
      }
    }

    if (data.need === 'Device Management' || data.need === 'Security/Compliance') {
      recs.push({
        id: 'm365-premium',
        name: 'Microsoft 365 Business Premium',
        url: '/products/microsoft-365',
        reason: `${industryFocus.securityReason} Advanced security and device management for ${data.orgType ? data.orgType.toLowerCase() : 'organizations'}`
      });
    }

    // Google Workspace Rules
    if (data.stack === 'Google Workspace' ||
        (data.need === 'Email/Collaboration' && data.orgType && ['Education', 'NGOs'].includes(data.orgType))) {
      recs.push({
        id: 'google-workspace',
        name: 'Google Workspace',
        url: '/products/google-workspace',
        reason: `Google-native collaboration solution ideal for ${data.orgType ? data.orgType.toLowerCase() : 'organization'} environments`
      });
    }

    // Messaging Automation Rules
    if (data.need === 'Messaging Automation' ||
        (data.orgType && ['SMEs', 'Legal', 'Healthcare'].includes(data.orgType))) {
      recs.push({
        id: 'messaging-platform',
        name: 'Datacare Messaging Platform',
        url: '/products/datacare-messaging-platform',
        reason: `WhatsApp automation perfect for ${data.orgType ? data.orgType.toLowerCase() : 'organization'} customer engagement and ${industryFocus.messagingReason}`
      });
    }

    // Cloud Backup Rules - Industry specific
    if ((data.orgType && ['Banking & Finance', 'Healthcare', 'Legal'].includes(data.orgType)) ||
        data.need === 'Backup/Recovery' ||
        (data.size && ['51–300', '300+'].includes(data.size))) {
      recs.push({
        id: 'cloud-backup',
        name: 'Cloud Backup & Recovery',
        url: '/products/cloud-backup-and-recovery',
        reason: `${industryFocus.backupReason} Essential for ${data.orgType ? data.orgType.toLowerCase() : 'organization'} compliance and data protection`
      });
    }

    // Website Rules
    if (data.need === 'Website' || data.stack === 'None') {
      const websiteTier = data.size === '1–10' ? 'Starter' : data.size === '11–50' ? 'Growth' : 'Enterprise';
      recs.push({
        id: 'web-design',
        name: `Web Design as a Service (${websiteTier})`,
        url: '/solutions/web-design-as-a-service',
        reason: `Professional website solution for ${data.orgType ? data.orgType.toLowerCase() : 'organizations'} with ongoing maintenance and ${industryFocus.webReason}`
      });
    }

    // Data & Analytics Rules
    if (data.need === 'Data & Analytics' ||
        (data.orgType && ['Banking & Finance', 'Manufacturing', 'Government'].includes(data.orgType))) {
      recs.push({
        id: 'data-analytics',
        name: 'Data & Analytics Solutions',
        url: '/solutions/data-and-analytics',
        reason: `Business intelligence and reporting dashboards for ${data.orgType ? data.orgType.toLowerCase() : 'organization'} decision-making`
      });
    }

    setRecommendations(recs);
    setCurrentStep('recommendations');
    trackEvent('recommendations_generated', {
      count: recs.length,
      recommendations: recs.map(r => r.id)
    });
  };

  const getIndustryFocus = (orgType: OrgType) => {
    const focuses = {
      'Legal': {
        emailReason: 'Secure document collaboration for legal practices.',
        securityReason: 'Legal compliance and client confidentiality requirements.',
        messagingReason: 'client communication and case updates',
        backupReason: 'Legal document retention and regulatory compliance.',
        webReason: 'professional legal practice presence'
      },
      'Healthcare': {
        emailReason: 'HIPAA-compliant communication for healthcare providers.',
        securityReason: 'Patient data protection and healthcare compliance.',
        messagingReason: 'patient appointment reminders and health updates',
        backupReason: 'Patient record protection and healthcare compliance.',
        webReason: 'patient portal and healthcare services'
      },
      'Banking & Finance': {
        emailReason: 'Financial-grade security for banking communications.',
        securityReason: 'Financial data protection and regulatory compliance.',
        messagingReason: 'customer notifications and account updates',
        backupReason: 'Financial record security and regulatory compliance.',
        webReason: 'secure financial services portal'
      },
      'Government': {
        emailReason: 'Secure government communications and document sharing.',
        securityReason: 'Government-grade security and compliance requirements.',
        messagingReason: 'citizen services and public notifications',
        backupReason: 'Government data protection and archival requirements.',
        webReason: 'citizen services and government transparency'
      },
      'Education': {
        emailReason: 'Educational collaboration for students and faculty.',
        securityReason: 'Student data protection and educational compliance.',
        messagingReason: 'student and parent communication',
        backupReason: 'Educational record protection and compliance.',
        webReason: 'educational resources and student portals'
      },
      'Manufacturing': {
        emailReason: 'Industrial collaboration and supply chain communication.',
        securityReason: 'Industrial data protection and operational security.',
        messagingReason: 'supply chain updates and customer orders',
        backupReason: 'Production data backup and business continuity.',
        webReason: 'product showcase and customer portals'
      },
      'NGOs': {
        emailReason: 'Cost-effective collaboration for non-profit organizations.',
        securityReason: 'Donor data protection and operational security.',
        messagingReason: 'donor updates and community engagement',
        backupReason: 'Program data protection and donor transparency.',
        webReason: 'donor engagement and program visibility'
      },
      'SMEs': {
        emailReason: 'Professional communication for growing businesses.',
        securityReason: 'Business data protection and growth enablement.',
        messagingReason: 'customer support and business communications',
        backupReason: 'Business continuity and data protection.',
        webReason: 'business growth and online presence'
      }
    };

    return focuses[orgType] || focuses['SMEs'];
  };

  // ==================== LEGACY FAQ (keeping for backward compatibility) ====================

  const handleFAQQuery = async (query: string) => {
    return await handleQuery(query);
  };

  // ==================== LEAD SUBMISSION ====================

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase.functions.invoke('chatbot-submit', {
        body: {
          sessionId,
          intent: conversationData.intent,
          orgType: conversationData.orgType,
          companySize: conversationData.size,
          primaryNeed: conversationData.need,
          currentStack: conversationData.stack,
          urgency: conversationData.urgency,
          budget: conversationData.budget,
          contact: conversationData.contact,
          recommendations,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }
      });

      trackEvent('form_submitted', { leadScore: data?.leadScore || 0, isHighValue: data?.isHighValue || false });
      setCurrentStep('success');
      return data || { leadScore: 0, isHighValue: false };
    } catch (error) {
      console.error('Submission failed:', error);
      // Return default values if submission fails
      return { leadScore: 0, isHighValue: false };
    } finally {
      setIsLoading(false);
    }
  };

  const trackRecommendationClick = (recommendationId: string) => {
    trackEvent('recommendation_clicked', { recommendationId });
  };

  // ==================== MODE SWITCHING ====================

  const switchToWizard = () => {
    setMode('wizard');
    setCurrentStep('intent');
    trackEvent('mode_switched', { newMode: 'wizard' });
  };

  const switchToChat = () => {
    setMode('chat');
    trackEvent('mode_switched', { newMode: 'chat' });
  };

  // ==================== RESET ====================

  const resetConversation = () => {
    setMessages([]);
    setCurrentStep('intent');
    setConversationData({
      intent: '',
      orgType: '',
      size: '',
      need: '',
      stack: '',
      urgency: '',
      budget: '',
      contact: { name: '', email: '', company: '', phone: '' }
    });
    setRecommendations([]);
    setFaqResponse(null);
    setLastQueryResponse(null);

    // Add welcome message
    addMessage('assistant', "Hi! I'm your Datacare AI assistant. I can help you find the perfect IT solution for your business. What can I help you with today?", [], getPopularQuestions().map(q => q.question).slice(0, 4));

    trackEvent('conversation_reset');
  };

  // ==================== RETURN ====================

  return {
    // Session
    sessionId,
    mode,

    // Wizard mode
    currentStep,
    setCurrentStep,
    conversationData,
    setConversationData,
    recommendations,
    generateRecommendations,

    // Conversational AI mode
    messages,
    handleQuery,
    handleQuickQuestion,
    lastQueryResponse,

    // Legacy FAQ (for backward compatibility)
    faqResponse,
    setFaqResponse,
    handleFAQQuery,

    // Submission
    handleSubmit,

    // State
    isLoading,

    // Actions
    trackEvent,
    trackRecommendationClick,
    switchToWizard,
    switchToChat,
    resetConversation,
    addMessage
  };
};
