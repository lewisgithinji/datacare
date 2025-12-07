/**
 * Intelligent Query Engine for Datacare Chatbot
 * Handles natural language understanding, search, and response generation
 */

import {
  products,
  solutions,
  industries,
  faqs,
  companyInfo,
  type Product,
  type Solution,
  type Industry,
  type FAQ
} from './chatbot-knowledge-base';

export interface SearchResult {
  type: 'product' | 'solution' | 'industry' | 'faq' | 'company';
  id: string;
  title: string;
  description: string;
  url?: string;
  relevanceScore: number;
  matchedKeywords: string[];
  additionalInfo?: Record<string, any>;
}

export interface QueryResponse {
  answer: string;
  results: SearchResult[];
  suggestions: string[];
  quickActions: QuickAction[];
}

export interface QuickAction {
  label: string;
  type: 'navigate' | 'ask' | 'contact';
  url?: string;
  query?: string;
  icon?: string;
}

/**
 * Normalize text for matching (lowercase, remove special chars)
 */
function normalizeText(text: string): string {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity score between query and text using keyword matching
 */
function calculateSimilarity(query: string, text: string, keywords: string[] = []): number {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  const queryWords = normalizedQuery.split(' ');

  let score = 0;
  let matchedKeywords: string[] = [];

  // Exact phrase match
  if (normalizedText.includes(normalizedQuery)) {
    score += 100;
  }

  // Individual word matches
  queryWords.forEach(word => {
    if (word.length < 3) return; // Skip very short words

    if (normalizedText.includes(word)) {
      score += 10;
    }
  });

  // Keyword matches (weighted higher)
  keywords.forEach(keyword => {
    const normalizedKeyword = normalizeText(keyword);

    if (normalizedQuery.includes(normalizedKeyword)) {
      score += 30;
      matchedKeywords.push(keyword);
    }

    queryWords.forEach(word => {
      if (normalizedKeyword.includes(word) && word.length >= 3) {
        score += 15;
      }
    });
  });

  return score;
}

/**
 * Extract pricing information from query
 */
function extractPricingIntent(query: string): boolean {
  const pricingKeywords = ['price', 'cost', 'pricing', 'how much', 'expensive', 'cheap', 'affordable', 'budget', 'rate', 'fee'];
  const normalizedQuery = normalizeText(query);
  return pricingKeywords.some(kw => normalizedQuery.includes(kw));
}

/**
 * Extract comparison intent from query
 */
function extractComparisonIntent(query: string): { comparing: boolean; items: string[] } {
  const normalizedQuery = normalizeText(query);
  const vsPattern = /(\w+)\s+(vs|versus|or|compared to|compare)\s+(\w+)/;
  const match = normalizedQuery.match(vsPattern);

  if (match) {
    return { comparing: true, items: [match[1], match[3]] };
  }

  if (normalizedQuery.includes('vs') || normalizedQuery.includes('versus') || normalizedQuery.includes('compare')) {
    return { comparing: true, items: [] };
  }

  return { comparing: false, items: [] };
}

/**
 * Search products by query
 */
function searchProducts(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const isPricingQuery = extractPricingIntent(query);

  products.forEach(product => {
    const titleScore = calculateSimilarity(query, product.name, product.keywords);
    const descScore = calculateSimilarity(query, product.description, product.keywords);
    const featureScore = product.features.reduce((acc, feature) =>
      acc + calculateSimilarity(query, feature, []), 0) / product.features.length;

    const totalScore = titleScore + (descScore * 0.5) + (featureScore * 0.3);

    if (totalScore > 10) {
      let description = product.tagline;

      // Add pricing info if query is about pricing
      if (isPricingQuery && product.plans.length > 0) {
        const popularPlan = product.plans.find(p => p.popular) || product.plans[0];
        description += ` Starting at ${popularPlan.price}/${popularPlan.period}.`;
      }

      results.push({
        type: 'product',
        id: product.id,
        title: product.name,
        description,
        url: product.url,
        relevanceScore: totalScore,
        matchedKeywords: product.keywords.filter(kw =>
          normalizeText(query).includes(normalizeText(kw))
        ),
        additionalInfo: {
          plans: product.plans,
          features: product.features,
          stats: product.stats
        }
      });
    }
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Search solutions by query
 */
function searchSolutions(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const isPricingQuery = extractPricingIntent(query);

  solutions.forEach(solution => {
    const titleScore = calculateSimilarity(query, solution.name, solution.keywords);
    const descScore = calculateSimilarity(query, solution.description, solution.keywords);
    const benefitScore = solution.benefits.reduce((acc, benefit) =>
      acc + calculateSimilarity(query, benefit, []), 0) / solution.benefits.length;

    const totalScore = titleScore + (descScore * 0.5) + (benefitScore * 0.3);

    if (totalScore > 10) {
      let description = solution.tagline;

      // Add pricing info if available and query is about pricing
      if (isPricingQuery && solution.pricing.starter) {
        description += ` Starting at ${solution.pricing.starter}.`;
      }

      results.push({
        type: 'solution',
        id: solution.id,
        title: solution.name,
        description,
        url: solution.url,
        relevanceScore: totalScore,
        matchedKeywords: solution.keywords.filter(kw =>
          normalizeText(query).includes(normalizeText(kw))
        ),
        additionalInfo: {
          benefits: solution.benefits,
          pricing: solution.pricing,
          timeline: solution.timeline
        }
      });
    }
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Search industries by query
 */
function searchIndustries(query: string): SearchResult[] {
  const results: SearchResult[] = [];

  industries.forEach(industry => {
    const titleScore = calculateSimilarity(query, industry.name, industry.keywords);
    const descScore = calculateSimilarity(query, industry.description, industry.keywords);

    const totalScore = titleScore + (descScore * 0.5);

    if (totalScore > 10) {
      results.push({
        type: 'industry',
        id: industry.id,
        title: industry.name,
        description: industry.description,
        url: industry.url,
        relevanceScore: totalScore,
        matchedKeywords: industry.keywords.filter(kw =>
          normalizeText(query).includes(normalizeText(kw))
        ),
        additionalInfo: {
          challenges: industry.challenges,
          solutions: industry.solutions
        }
      });
    }
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Search FAQs by query
 */
function searchFAQs(query: string): SearchResult[] {
  const results: SearchResult[] = [];

  faqs.forEach(faq => {
    const questionScore = calculateSimilarity(query, faq.question, faq.keywords);
    const answerScore = calculateSimilarity(query, faq.answer, faq.keywords);

    const totalScore = questionScore + (answerScore * 0.3);

    if (totalScore > 10) {
      results.push({
        type: 'faq',
        id: faq.id,
        title: faq.question,
        description: faq.answer,
        relevanceScore: totalScore,
        matchedKeywords: faq.keywords.filter(kw =>
          normalizeText(query).includes(normalizeText(kw))
        ),
        additionalInfo: {
          category: faq.category,
          relatedLinks: faq.relatedLinks
        }
      });
    }
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Search company information
 */
function searchCompanyInfo(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const normalizedQuery = normalizeText(query);

  // Contact queries
  if (normalizedQuery.includes('contact') || normalizedQuery.includes('phone') ||
      normalizedQuery.includes('email') || normalizedQuery.includes('reach') ||
      normalizedQuery.includes('call') || normalizedQuery.includes('talk')) {
    results.push({
      type: 'company',
      id: 'contact',
      title: 'Contact Information',
      description: `Call us at ${companyInfo.contact.primaryPhone} or email ${companyInfo.contact.email}. We respond within ${companyInfo.contact.responseTime}.`,
      url: '/contact',
      relevanceScore: 100,
      matchedKeywords: ['contact'],
      additionalInfo: {
        offices: companyInfo.offices,
        contact: companyInfo.contact
      }
    });
  }

  // Office location queries
  if (normalizedQuery.includes('office') || normalizedQuery.includes('location') ||
      normalizedQuery.includes('address') || normalizedQuery.includes('where')) {
    results.push({
      type: 'company',
      id: 'offices',
      title: 'Office Locations',
      description: `We have offices in ${companyInfo.offices.map(o => o.location.split(',')[0]).join(', ')}. Headquarters in Nairobi, Kenya.`,
      url: '/contact',
      relevanceScore: 90,
      matchedKeywords: ['location', 'office'],
      additionalInfo: {
        offices: companyInfo.offices
      }
    });
  }

  // Company info queries
  if (normalizedQuery.includes('about') || normalizedQuery.includes('company') ||
      normalizedQuery.includes('who are') || normalizedQuery.includes('datacare')) {
    results.push({
      type: 'company',
      id: 'about',
      title: 'About Datacare Limited',
      description: `${companyInfo.mission}. Founded in ${companyInfo.founded}, serving ${companyInfo.stats['Organizations Served']} organizations.`,
      url: '/about',
      relevanceScore: 85,
      matchedKeywords: ['about', 'company'],
      additionalInfo: {
        stats: companyInfo.stats,
        certifications: companyInfo.certifications
      }
    });
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Generate quick action suggestions based on query
 */
function generateQuickActions(query: string, results: SearchResult[]): QuickAction[] {
  const actions: QuickAction[] = [];
  const normalizedQuery = normalizeText(query);

  // If top result is a product or solution, offer to view details
  if (results[0] && (results[0].type === 'product' || results[0].type === 'solution')) {
    actions.push({
      label: `View ${results[0].title}`,
      type: 'navigate',
      url: results[0].url || '#',
      icon: '👁️'
    });
  }

  // If pricing query, offer contact
  if (extractPricingIntent(query)) {
    actions.push({
      label: 'Get Custom Quote',
      type: 'ask',
      query: 'I would like to get a custom quote. Can you help me?',
      icon: '💰'
    });
  }

  // Always offer to talk to human via WhatsApp
  actions.push({
    label: 'WhatsApp Us',
    type: 'contact',
    url: 'https://wa.me/254784155752?text=Hi%20Datacare%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20services',
    icon: '💬'
  });

  // Offer to schedule consultation
  if (results.length > 0 && results[0].relevanceScore > 50) {
    actions.push({
      label: 'Book Consultation',
      type: 'ask',
      query: 'I would like to book a consultation. What are the next steps?',
      icon: '📅'
    });
  }

  return actions;
}

/**
 * Generate follow-up question suggestions
 */
function generateSuggestions(query: string, results: SearchResult[]): string[] {
  const suggestions: string[] = [];
  const normalizedQuery = normalizeText(query);

  if (results.length === 0) {
    return [
      'What products do you offer?',
      'How can I contact you?',
      'Tell me about Employee Amplification',
      'What industries do you serve?'
    ];
  }

  const topResult = results[0];

  // Product-specific suggestions
  if (topResult.type === 'product') {
    if (!extractPricingIntent(query)) {
      suggestions.push(`How much does ${topResult.title} cost?`);
    }
    suggestions.push(`What features does ${topResult.title} include?`);
    suggestions.push('How long does migration take?');
  }

  // Solution-specific suggestions
  if (topResult.type === 'solution') {
    if (!extractPricingIntent(query)) {
      suggestions.push(`What are the pricing options for ${topResult.title}?`);
    }
    suggestions.push(`What results can I expect from ${topResult.title}?`);
    suggestions.push('Can I get a free assessment?');
  }

  // Add comparison suggestion if multiple similar results
  if (results.length > 1 && results[0].type === results[1].type && results[0].type === 'product') {
    suggestions.push(`Compare ${results[0].title} vs ${results[1].title}`);
  }

  // Generic helpful suggestions
  suggestions.push('How can I get started?');

  return suggestions.slice(0, 4); // Limit to 4 suggestions
}

/**
 * Generate natural language response
 */
function generateResponse(query: string, results: SearchResult[]): string {
  const isPricingQuery = extractPricingIntent(query);
  const comparison = extractComparisonIntent(query);

  if (results.length === 0) {
    return "I couldn't find a direct answer to that question. Let me connect you with our team who can help you better. Would you like to chat on WhatsApp or schedule a call?";
  }

  const topResult = results[0];
  let response = '';

  // Handle comparison queries
  if (comparison.comparing && results.length >= 2) {
    const item1 = results[0];
    const item2 = results[1];

    response = `Great question! Here's a comparison:\n\n`;
    response += `**${item1.title}**: ${item1.description}\n\n`;
    response += `**${item2.title}**: ${item2.description}\n\n`;

    if (isPricingQuery && item1.additionalInfo?.plans && item2.additionalInfo?.plans) {
      const plan1 = item1.additionalInfo.plans.find((p: any) => p.popular) || item1.additionalInfo.plans[0];
      const plan2 = item2.additionalInfo.plans.find((p: any) => p.popular) || item2.additionalInfo.plans[0];
      response += `**Pricing**: ${item1.title} starts at ${plan1.price}/${plan1.period}, while ${item2.title} starts at ${plan2.price}/${plan2.period}.\n\n`;
    }

    response += `Would you like more details on either option?`;
    return response;
  }

  // Handle single result
  if (topResult.type === 'faq') {
    response = topResult.description;
  } else if (topResult.type === 'product') {
    response = `${topResult.title} - ${topResult.description}\n\n`;

    if (isPricingQuery && topResult.additionalInfo?.plans) {
      response += `**Pricing Options:**\n`;
      topResult.additionalInfo.plans.slice(0, 3).forEach((plan: any) => {
        response += `• ${plan.name}: ${plan.price}/${plan.period}${plan.popular ? ' (Most Popular)' : ''}\n`;
      });
    } else if (topResult.additionalInfo?.features) {
      response += `**Key Features:**\n`;
      topResult.additionalInfo.features.slice(0, 4).forEach((feature: string) => {
        response += `• ${feature}\n`;
      });
    }
  } else if (topResult.type === 'solution') {
    response = `${topResult.title} - ${topResult.description}\n\n`;

    if (isPricingQuery && topResult.additionalInfo?.pricing) {
      const pricing = topResult.additionalInfo.pricing;
      response += `**Pricing:**\n`;
      if (pricing.starter) response += `• Starter: ${pricing.starter}\n`;
      if (pricing.growth) response += `• Growth: ${pricing.growth}\n`;
      if (pricing.enterprise) response += `• Enterprise: ${pricing.enterprise}\n`;
      if (pricing.note) response += `\n*${pricing.note}*\n`;
    } else if (topResult.additionalInfo?.benefits) {
      response += `**Benefits:**\n`;
      topResult.additionalInfo.benefits.slice(0, 4).forEach((benefit: string) => {
        response += `• ${benefit}\n`;
      });
    }
  } else if (topResult.type === 'industry') {
    response = `${topResult.description}\n\n`;
    if (topResult.additionalInfo?.solutions) {
      response += `**Solutions we offer:** ${topResult.additionalInfo.solutions.slice(0, 3).join(', ')}\n`;
    }
  } else if (topResult.type === 'company') {
    response = topResult.description;
  }

  return response;
}

/**
 * Main query function - searches all sources and generates response
 */
export function queryKnowledgeBase(query: string): QueryResponse {
  if (!query || query.trim().length < 2) {
    return {
      answer: 'Please ask me a question! I can help you with products, pricing, solutions, or anything about Datacare.',
      results: [],
      suggestions: [
        'What products do you offer?',
        'How much does Microsoft 365 cost?',
        'Tell me about Employee Amplification',
        'Where are your offices?'
      ],
      quickActions: [
        { label: 'View Products', type: 'navigate', url: '/products', icon: '📦' },
        { label: 'View Solutions', type: 'navigate', url: '/solutions', icon: '🎯' },
        { label: 'Contact Us', type: 'navigate', url: '/contact', icon: '📞' }
      ]
    };
  }

  // Search all sources
  const productResults = searchProducts(query);
  const solutionResults = searchSolutions(query);
  const industryResults = searchIndustries(query);
  const faqResults = searchFAQs(query);
  const companyResults = searchCompanyInfo(query);

  // Combine and sort by relevance
  const allResults = [
    ...faqResults,        // Prioritize FAQs (they're exact Q&A)
    ...productResults,
    ...solutionResults,
    ...companyResults,
    ...industryResults
  ].sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Take top 5 results
  const topResults = allResults.slice(0, 5);

  // Generate response
  const answer = generateResponse(query, topResults);
  const suggestions = generateSuggestions(query, topResults);
  const quickActions = generateQuickActions(query, topResults);

  return {
    answer,
    results: topResults,
    suggestions,
    quickActions
  };
}

/**
 * Get popular questions by category
 */
export function getPopularQuestions(category?: string): FAQ[] {
  if (category) {
    return faqs.filter(faq => faq.category === category).slice(0, 5);
  }

  // Return mix of popular questions
  return [
    faqs.find(f => f.id === 'pricing-m365'),
    faqs.find(f => f.id === 'compare-m365-google'),
    faqs.find(f => f.id === 'employee-amp-what'),
    faqs.find(f => f.id === 'migration-time'),
    faqs.find(f => f.id === 'support-hours')
  ].filter(Boolean) as FAQ[];
}

/**
 * Get product by ID
 */
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

/**
 * Get solution by ID
 */
export function getSolutionById(id: string): Solution | undefined {
  return solutions.find(s => s.id === id);
}
