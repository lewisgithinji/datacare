# Knowledge Base Article Creation Template

## Quick Reference Checklist

Use this template every time you create a new knowledge base article to ensure consistency and SEO optimization.

---

## 📋 Article Metadata Template

```typescript
{
  id: "article-url-slug",  // lowercase, hyphens only
  title: "Complete Descriptive Title (60-70 characters)",
  excerpt: "Compelling 1-2 sentence summary (150-160 characters for SEO)",
  category: "Category Name",  // Must match existing categories
  tags: ["Primary Tag", "Secondary Tag", "Keyword 1", "Keyword 2", "Keyword 3"],
  readTime: "X min",  // Calculate: word count ÷ 200 words/min
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  popular: true | false,  // Set to true for featured articles
  views: 0,  // Start at 0, update from analytics
  helpful: 0,  // Start at 0, update from voting
  lastUpdated: "YYYY-MM-DD",  // ISO format
  author: "Author Name",
  relatedArticles: ["article-id-1", "article-id-2", "article-id-3"]  // Max 3
}
```

---

## ✅ Pre-Writing Checklist

Before you start writing, ensure you have:

- [ ] **Target keyword identified** (what will people search for?)
- [ ] **Audience defined** (who is this for? SMEs, IT managers, business owners?)
- [ ] **Pain point identified** (what problem does this solve?)
- [ ] **CTA defined** (what action should readers take?)
- [ ] **Related articles identified** (3 existing articles to cross-link)
- [ ] **Competitor research done** (what are others writing about this?)

---

## 🎯 SEO Optimization Checklist

### Title Optimization
- [ ] **60-70 characters** (optimal for Google)
- [ ] **Includes primary keyword** naturally
- [ ] **Compelling & clickable** (promises value)
- [ ] **Format**: Primary Keyword + Benefit/How-to + Context
  - Example: "Microsoft 365 Migration Guide: Step-by-Step for Kenyan SMEs"

### Excerpt Optimization
- [ ] **150-160 characters** (meta description length)
- [ ] **Includes primary keyword**
- [ ] **Clear value proposition**
- [ ] **Call to action** implied

### Tag Strategy
- [ ] **5-7 tags** total
- [ ] **Primary keyword** as first tag
- [ ] **2-3 service tags** (Employee Amplification, Microsoft 365, etc.)
- [ ] **2-3 topic tags** (Productivity, Security, ROI, etc.)
- [ ] **1-2 location tags** if relevant (Kenya, Nairobi, East Africa)

---

## 📝 Content Structure Template

Every article should follow this proven structure:

### 1. **Introduction (150-200 words)**
```
- Hook: Start with a pain point, statistic, or compelling question
- Context: Why this topic matters for Kenyan businesses
- Promise: What the reader will learn/gain
- Credibility: Brief mention of Datacare's expertise
```

**Example**:
> "Are you paying for Microsoft 365 licenses your team isn't using? 67% of Kenyan SMEs waste an average of KES 180,000 annually on underutilized software. This guide shows you how to conduct a comprehensive license audit and reclaim wasted budget..."

### 2. **Problem Statement (200-300 words)**
```
- Describe the current pain point in detail
- Include specific examples relevant to Kenya
- Use statistics or case studies
- Create emotional resonance
```

### 3. **Solution Overview (200-300 words)**
```
- High-level explanation of the solution
- Why this approach works
- Key benefits (3-5 bullet points)
- Who this is for
```

### 4. **Step-by-Step Guide / Detailed Content (1,500-2,500 words)**

Use **H2 headings** for major sections (these appear in TOC):
```html
<h2>Step 1: Title of First Major Step</h2>
<p>Explanation...</p>
<h3>Sub-step or Detail</h3>
<p>Additional information...</p>
```

**Include These Elements**:
- [ ] **Numbered steps** for processes
- [ ] **Visual hierarchy** with H2/H3 headings
- [ ] **Real examples** with Kenyan companies/scenarios
- [ ] **Tables** for comparisons
- [ ] **Callout boxes** for tips, warnings, examples
- [ ] **Metrics/ROI** where applicable
- [ ] **Cost breakdowns** in KES

### 5. **Case Study / Real Example (200-400 words)**
```html
<div class="roi-example">
  <h4>Case Study: [Company Name]</h4>
  <p><strong>[Company Type] ([X] employees)</strong> implemented [solution].</p>
  <p><strong>Results after [timeframe]:</strong></p>
  <ul>
    <li>Metric 1: Before → After (% improvement)</li>
    <li>Metric 2: KES value</li>
    <li><strong>Revenue impact:</strong> KES X million</li>
  </ul>
</div>
```

### 6. **How Datacare Can Help (150-200 words)**
```html
<div class="metrics-grid">
  <div class="metric">
    <div class="metric-value">30 Days</div>
    <div class="metric-label">Implementation time</div>
  </div>
  <!-- More metrics -->
</div>

<h3>Our [Service Name] Package Includes:</h3>
<ul>
  <li><strong>Feature 1:</strong> Description</li>
  <li><strong>Feature 2:</strong> Description</li>
</ul>
```

### 7. **CTA Box (100-150 words)**
```html
<div class="cta-box">
  <h3>Clear Action-Oriented Headline</h3>
  <p>Compelling value proposition sentence.</p>
  <a href="/employee-amplification#get-started" class="cta-button">Primary CTA Text</a>
  <p class="cta-subtext">Trust element • Benefit • No risk statement</p>
</div>
```

### 8. **FAQ Section (300-500 words)**
```html
<h2>Frequently Asked Questions</h2>

<h3>Q: Specific question in user's language?</h3>
<p><strong>A:</strong> Direct, comprehensive answer with examples.</p>
```

**FAQ Guidelines**:
- [ ] **5-8 questions** that users actually ask
- [ ] **Answer comprehensively** (100-150 words each)
- [ ] **Include keywords** naturally
- [ ] **Link to related content** where relevant

### 9. **Key Takeaways Box (100-150 words)**
```html
<div class="recommendation-box">
  <h4>Remember These Essentials</h4>
  <ul>
    <li>Takeaway 1 with <strong>key number or stat</strong></li>
    <li>Takeaway 2 with <strong>action item</strong></li>
    <li>Takeaway 3 with <strong>warning or tip</strong></li>
  </ul>
</div>
```

### 10. **Related Articles (Automatic)**
```html
<p><strong>Related Articles:</strong></p>
<ul>
  <li><a href="/resources/knowledge-base/article-id-1">Article Title 1</a></li>
  <li><a href="/resources/knowledge-base/article-id-2">Article Title 2</a></li>
  <li><a href="#placeholder-article">Article Title 3</a></li>
</ul>
```

---

## 🎨 Content Enhancement Elements

### Tables
```html
<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr class="price-row">
      <td><strong>Total</strong></td>
      <td colspan="2"><strong>KES X million</strong></td>
    </tr>
  </tbody>
</table>
```

### Callout Boxes
```html
<!-- Tip Box -->
<div class="callout callout-tip">
  <h4>Pro Tip</h4>
  <p>Actionable advice or insight...</p>
</div>

<!-- Example Box -->
<div class="callout callout-example">
  <h4>Real-World Example</h4>
  <p>Specific scenario...</p>
</div>
```

### Metrics Grid
```html
<div class="metrics-grid">
  <div class="metric">
    <div class="metric-value">67%</div>
    <div class="metric-label">Improvement in efficiency</div>
  </div>
  <div class="metric">
    <div class="metric-value">KES 2.4M</div>
    <div class="metric-label">Annual savings</div>
  </div>
  <div class="metric">
    <div class="metric-value">3 Weeks</div>
    <div class="metric-label">Implementation time</div>
  </div>
</div>
```

### Feature Grid
```html
<div class="feature-grid">
  <div class="feature-item highlight">
    <h4>Feature Name</h4>
    <p>Description...</p>
  </div>
  <div class="feature-item premium">
    <h4>Premium Feature</h4>
    <p>Description...</p>
  </div>
</div>
```

### Blockquote (Testimonial/Quote)
```html
<blockquote>
  "Compelling quote from customer or industry expert that reinforces the article's main point."
  <br><br>
  <strong>— Person Name, Title, Company Name</strong>
</blockquote>
```

---

## 🔍 SEO Technical Checklist

These are automatically handled by the article component, but verify:

### Structured Data (Automatic)
- [x] Article schema with headline, description, author
- [x] Publisher information
- [x] DatePublished and dateModified
- [x] Article section (category)
- [x] Keywords array
- [x] WordCount and timeRequired

### Open Graph Tags (Automatic)
- [x] og:type = "article"
- [x] og:title, og:description, og:url
- [x] og:image (site-wide default)
- [x] article:published_time
- [x] article:author, article:section
- [x] article:tag for each tag

### Twitter Card (Automatic)
- [x] twitter:card = "summary_large_image"
- [x] twitter:title, description, image

### BreadcrumbList Schema (Automatic)
- [x] Home → Knowledge Base → Article

---

## 🎯 Interactive Features Checklist

These are built into every article automatically:

- [x] **Reading progress bar** (orange gradient at top)
- [x] **Table of Contents** (auto-generated from H2/H3)
- [x] **Social sharing** (Twitter, LinkedIn, Facebook, Copy Link)
- [x] **Helpful voting** (thumbs up/down with toast notifications)
- [x] **Related articles** (3 cards at bottom)
- [x] **Jump links** (smooth scroll from TOC)

---

## 📊 Post-Publishing Checklist

After publishing an article:

- [ ] **Test on mobile** (TOC toggle, reading progress)
- [ ] **Test all links** (related articles, CTAs, external links)
- [ ] **Share on social** (verify Open Graph preview)
- [ ] **Submit to Google Search Console** (for faster indexing)
- [ ] **Add to internal links** (link from related articles)
- [ ] **Track in analytics** (set up goals for voting, shares)
- [ ] **Monitor performance** (views, time on page, bounce rate)
- [ ] **Update related articles** (add this article to their relatedArticles array)

---

## 🎨 Writing Style Guide

### Voice & Tone
- **Professional but approachable** (like a knowledgeable consultant, not a salesperson)
- **Action-oriented** (tell them what to do, not just what could be done)
- **Confident** (we know this works)
- **Local** (Kenya-focused examples, KES currency, local companies)

### Formatting Rules
- **Short paragraphs** (3-5 sentences max)
- **Bullet points** for lists (easier scanning)
- **Bold for emphasis** on key terms and numbers
- **Numbers over words** (KES 2.5M not "two and a half million")
- **Active voice** ("Reduce costs by 40%" not "Costs can be reduced...")
- **Second person** ("You can achieve..." not "One can achieve...")

### Kenya-Specific Best Practices
- **Use KES currency** (not USD)
- **Reference local companies** (anonymized case studies)
- **Mention Kenya laws** (KDPA, KRA, Law Society of Kenya, etc.)
- **Include Nairobi/Mombasa** examples where relevant
- **Address local pain points** (unreliable internet, MPESA integration, etc.)
- **Use realistic numbers** for Kenyan SME budgets

---

## 📏 Quality Standards

Before marking an article complete:

### Length
- [ ] **Minimum 2,000 words** (SEO baseline)
- [ ] **Target 2,500-3,500 words** (optimal for long-form)
- [ ] **Maximum 5,000 words** (beyond this, split into parts)

### Readability
- [ ] **Grade level**: 8-10 (Hemingway Editor)
- [ ] **Sentence length**: 15-20 words average
- [ ] **Paragraph length**: 3-5 sentences
- [ ] **Subheadings**: Every 200-300 words

### SEO
- [ ] **Primary keyword**: 3-5 mentions naturally
- [ ] **Related keywords**: 10-15 variations
- [ ] **Internal links**: 5-8 to other articles/pages
- [ ] **External links**: 2-3 to authoritative sources
- [ ] **Images**: At least 1 (in future updates)

### Value
- [ ] **Actionable**: Can the reader do something with this?
- [ ] **Complete**: Does it answer all likely questions?
- [ ] **Credible**: Are claims backed by data/examples?
- [ ] **Current**: Is information up to date?

---

## 🚀 Quick Start Example

**Topic**: "How to Choose Cloud Backup for Your Kenyan Business"

### Metadata
```typescript
{
  id: "cloud-backup-selection-guide-kenya",
  title: "Cloud Backup Selection Guide: 7 Criteria for Kenyan Businesses",
  excerpt: "Learn how to choose the right cloud backup solution for your Kenyan business with our comprehensive 7-criteria framework. Includes pricing, security, and compliance considerations.",
  category: "Security & Compliance",
  tags: ["Cloud Backup", "Data Protection", "Security", "KDPA", "Business Continuity", "Kenya"],
  readTime: "9 min",
  difficulty: "Intermediate",
  popular: true,
  views: 0,
  helpful: 0,
  lastUpdated: "2024-12-06",
  author: "Michael Omondi",
  relatedArticles: ["kenya-data-protection-act-2019", "cloud-and-licensing-guide", "security-best-practices"]
}
```

### Outline
1. **Introduction**: "67% of Kenyan businesses lose critical data..."
2. **Problem**: Data loss scenarios in Kenya
3. **7 Selection Criteria**:
   - H2: Criterion 1: Data Location & Sovereignty
   - H2: Criterion 2: Security & Encryption
   - H2: Criterion 3: KDPA Compliance
   - H2: Criterion 4: Internet Reliability
   - H2: Criterion 5: Pricing Transparency
   - H2: Criterion 6: Recovery Speed
   - H2: Criterion 7: Support Quality
4. **Decision Matrix Table**
5. **Case Study**: Law firm recovers from ransomware
6. **How Datacare Helps**
7. **CTA**: Free backup assessment
8. **FAQ**: 6 common questions
9. **Key Takeaways**
10. **Related Articles**

---

## 📚 Additional Resources

- **Keyword Research**: Use Google Search Console to find what users search
- **Analytics**: Track which articles perform best
- **User Feedback**: Monitor "helpful" votes to identify needed improvements
- **Competitor Analysis**: Review what HubSpot, Salesforce Knowledge Base do well

---

## ✨ Final Reminder

**Every article should**:
1. Solve a specific problem
2. Include real Kenyan examples
3. Provide actionable next steps
4. Link to Datacare services naturally
5. Be comprehensive enough to rank #1 on Google

**Success metric**: If a reader finishes your article, they should have everything they need to make a decision or take action.

---

*Template Version 1.0 | Last Updated: December 6, 2024*
