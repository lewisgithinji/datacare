# Chatbot Knowledge Base Sync Guide

## Overview
This guide explains how to keep your AI chatbot's knowledge base synchronized with your website content.

---

## Quick Start

### Check for Updates
```bash
npm run sync-chatbot
```

This will:
- ✅ Check if any website pages were modified
- ✅ Show which pages need updating
- ✅ Verify knowledge base content
- ✅ Display statistics

---

## When to Sync

Run the sync check **after updating**:
- Product pricing or features
- Solution descriptions or pricing
- Company information (contact, offices, certifications)
- FAQ content
- Any page that contains information users might ask about

---

## How It Works

### 1. Automatic Detection
The sync script compares modification dates:
```
Website Page Modified: Dec 6, 2025 10:30 AM
Knowledge Base Updated: Dec 6, 2025 9:00 AM
                        ↓
Result: UPDATE NEEDED ⚠️
```

### 2. Update Notification
You'll see exactly which files changed:
```
📝 Found updated pages:

   • Microsoft365.tsx (modified: Dec 6, 2025, 10:30:15 AM)
   → Update Microsoft 365 pricing and features

   • Contact.tsx (modified: Dec 6, 2025, 11:15:22 AM)
   → Update contact details
```

### 3. Content Verification
The script verifies essential content:
```
🔍 Verifying Knowledge Base Content...

✅ All key content verified!
   ✓ Microsoft 365 Products
   ✓ Google Workspace
   ✓ Messaging Platform
   ✓ Cloud Backup
   ✓ Employee Amplification
   ✓ Contact Information
   ✓ Email Address
   ✓ Office Locations
```

---

## How to Update Knowledge Base

### Option 1: Ask Claude Code (Recommended)
Simply say:
```
"Update chatbot knowledge base from the latest Microsoft365.tsx page"
```

Or for full sync:
```
"Update entire chatbot knowledge base from all website pages"
```

### Option 2: Manual Update
1. Open `src/lib/chatbot-knowledge-base.ts`
2. Find the relevant section
3. Update the content

**Example - Update Microsoft 365 Pricing:**
```typescript
// Find this section in chatbot-knowledge-base.ts
{
  name: 'Business Basic',
  price: '$6',  // ← Change this
  period: 'per user/month',
  // ...
}
```

---

## What Gets Synced

### Products
- **File**: `src/pages/products/*.tsx`
- **Content**: Pricing, features, plans, statistics
- **Location in KB**: `products` array

### Solutions
- **Files**: `src/pages/solutions/*.tsx` + `src/pages/EmployeeAmplification.tsx`
- **Content**: Benefits, pricing, timelines, ROI
- **Location in KB**: `solutions` array

### Industries
- **Files**: `src/pages/industries/*.tsx`
- **Content**: Challenges, solutions, specific info
- **Location in KB**: `industries` array

### Company Info
- **Files**: `src/pages/About.tsx`, `src/pages/Contact.tsx`
- **Content**: Contact details, offices, certifications
- **Location in KB**: `companyInfo` object

### FAQs
- **Manual Update**: Based on common customer questions
- **Location in KB**: `faqs` array

---

## Sync Workflow

### After Updating Website Content:

```mermaid
Update Website Page
        ↓
Run: npm run sync-chatbot
        ↓
Review Update Report
        ↓
Update Knowledge Base
        ↓
Test Chatbot Responses
        ↓
Commit Changes
```

---

## Examples

### Scenario 1: Price Change
**You do:**
1. Update `src/pages/products/Microsoft365.tsx`
2. Change "Business Basic" from $6 to $7

**Sync process:**
```bash
$ npm run sync-chatbot

📝 Found updated pages:
   • Microsoft365.tsx
   → Update Microsoft 365 pricing and features
```

**You update:**
```typescript
// In src/lib/chatbot-knowledge-base.ts
{
  name: 'Business Basic',
  price: '$7',  // Updated from $6
  period: 'per user/month',
  // ...
}
```

---

### Scenario 2: New Product Feature
**You do:**
1. Add "Advanced Analytics" to Google Workspace page
2. Update feature list in `GoogleWorkspace.tsx`

**Sync process:**
```bash
$ npm run sync-chatbot

📝 Found updated pages:
   • GoogleWorkspace.tsx
```

**You update:**
```typescript
// In chatbot-knowledge-base.ts
features: [
  'Google Meet - HD video conferencing...',
  'Gmail & Calendar - professional email...',
  'Google Drive - secure cloud storage...',
  'Advanced Analytics - Business intelligence...'  // NEW
]
```

---

### Scenario 3: Contact Info Change
**You do:**
1. Add new office in Mombasa
2. Update `Contact.tsx` with new office details

**Sync process:**
```bash
$ npm run sync-chatbot

📝 Found updated pages:
   • Contact.tsx
   → Update contact details
```

**You update:**
```typescript
// In chatbot-knowledge-base.ts
offices: [
  // ... existing offices
  {
    location: 'Mombasa, Kenya',
    address: 'Moi Avenue, CBD',
    phone: ['+254 XXX XXX XXX'],
    email: 'mombasa@datacare.co.ke',
    hours: 'Mon-Fri: 8AM-5PM'
  }
]
```

---

## Best Practices

### 1. Regular Checks
Run sync check weekly or after any content updates:
```bash
npm run sync-chatbot
```

### 2. Test After Updates
After updating knowledge base, test chatbot:
```
"How much does Microsoft 365 cost?"
"Where are your offices?"
"What's new in Google Workspace?"
```

### 3. Keep FAQs Current
Review customer questions monthly and add new FAQs:
```typescript
{
  id: 'new-feature-2025',
  question: 'Do you offer AI training?',
  answer: 'Yes! We now offer...',
  category: 'products',
  keywords: ['ai', 'training', 'learning']
}
```

### 4. Verify After Major Updates
After updating multiple pages, verify all content:
```bash
$ npm run sync-chatbot

📊 Knowledge Base Statistics:
   📦 Products: 4
   🎯 Solutions: 7
   ❓ FAQs: 30
   💰 Pricing Items: 45
```

---

## Troubleshooting

### "No updates needed" but content is wrong
**Solution**: The script only detects file modification dates. If you need to force update:
1. Ask Claude Code to re-extract content
2. Or manually update the knowledge base file

### Chatbot gives outdated information
**Check**:
1. Run `npm run sync-chatbot`
2. Look for modified files
3. Update knowledge base
4. Refresh browser to load new code

### Can't find what to update
**Location guide**:
- **Pricing**: Search for `price:` or `$` in knowledge base
- **Features**: Search for product name + `features`
- **Contact**: Search for `companyInfo` or `contact`
- **FAQs**: Search for `question:` in `faqs` array

---

## Automation Options

### Option 1: Git Hook (Recommended)
Add a pre-commit hook to remind you:
```bash
# .git/hooks/pre-commit
npm run sync-chatbot
```

### Option 2: Scheduled Check
Add to your calendar: "Run chatbot sync" - Weekly

### Option 3: CI/CD Integration
Add to your deployment pipeline:
```yaml
# .github/workflows/deploy.yml
- name: Check chatbot sync
  run: npm run sync-chatbot
```

---

## File Locations

### Knowledge Base
```
src/lib/chatbot-knowledge-base.ts
```

### Sync Script
```
scripts/sync-chatbot-knowledge.js
```

### Website Pages
```
src/pages/products/*.tsx
src/pages/solutions/*.tsx
src/pages/industries/*.tsx
src/pages/EmployeeAmplification.tsx
src/pages/About.tsx
src/pages/Contact.tsx
```

---

## Quick Reference

### Run Sync Check
```bash
npm run sync-chatbot
```

### Update Knowledge Base
```bash
# Ask Claude Code
"Update chatbot knowledge base from [page-name]"

# Or edit manually
code src/lib/chatbot-knowledge-base.ts
```

### Test Chatbot
```
Open website → Click chatbot → Ask questions
```

---

## Summary

✅ **Run sync check** after updating website content
✅ **Review update report** to see what changed
✅ **Update knowledge base** manually or with Claude Code
✅ **Test chatbot** to verify responses
✅ **Commit changes** to keep everything in sync

**Your chatbot will always have current, accurate information! 🎉**
