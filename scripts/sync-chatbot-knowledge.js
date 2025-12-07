#!/usr/bin/env node

/**
 * Chatbot Knowledge Base Sync Script
 *
 * This script automatically checks if website content has been updated
 * and alerts you to update the chatbot knowledge base.
 *
 * Usage:
 *   npm run sync-chatbot
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🤖 Syncing Chatbot Knowledge Base...\n');

// File paths
const KNOWLEDGE_BASE_PATH = path.join(__dirname, '../src/lib/chatbot-knowledge-base.ts');
const PAGES_DIR = path.join(__dirname, '../src/pages');

// Check if knowledge base needs update
const checkIfUpdateNeeded = () => {
  const kbStats = fs.statSync(KNOWLEDGE_BASE_PATH);
  const kbModified = kbStats.mtime;

  // Get all page files
  const pageFiles = [
    'products/Microsoft365.tsx',
    'products/GoogleWorkspace.tsx',
    'products/DatacareMessagingPlatform.tsx',
    'products/CloudBackupAndRecovery.tsx',
    'solutions/CloudAndLicensing.tsx',
    'solutions/AIAndMessagingAutomation.tsx',
    'solutions/WebDesignAsAService.tsx',
    'solutions/SMEDigitalTransformation.tsx',
    'solutions/SecurityAndCompliance.tsx',
    'solutions/DataAndAnalytics.tsx',
    'EmployeeAmplification.tsx',
    'About.tsx',
    'Contact.tsx'
  ].map(f => path.join(PAGES_DIR, f));

  // Check if any page was modified after knowledge base
  let newerFiles = [];
  for (const file of pageFiles) {
    try {
      const fileStats = fs.statSync(file);
      if (fileStats.mtime > kbModified) {
        newerFiles.push({
          file: path.basename(file),
          modified: fileStats.mtime
        });
      }
    } catch (err) {
      // File doesn't exist, skip
    }
  }

  return newerFiles;
};

// Main sync function
const syncKnowledgeBase = () => {
  console.log('📋 Checking for updates...\n');

  const updatedFiles = checkIfUpdateNeeded();

  if (updatedFiles.length === 0) {
    console.log('✅ Knowledge base is up to date!\n');
    console.log('💡 No website pages have been modified since last sync.\n');
    return;
  }

  console.log('📝 Found updated pages:\n');
  updatedFiles.forEach(({ file, modified }) => {
    console.log(`   • ${file} (modified: ${modified.toLocaleString()})`);
  });
  console.log('');

  console.log('⚠️  MANUAL UPDATE REQUIRED\n');
  console.log('The following pages have been updated and may need knowledge base updates:\n');

  const updateInstructions = {
    'Microsoft365.tsx': 'Update Microsoft 365 pricing and features',
    'GoogleWorkspace.tsx': 'Update Google Workspace pricing and features',
    'DatacareMessagingPlatform.tsx': 'Update Messaging Platform pricing',
    'CloudBackupAndRecovery.tsx': 'Update Backup pricing',
    'CloudAndLicensing.tsx': 'Update Cloud & Licensing solution',
    'AIAndMessagingAutomation.tsx': 'Update AI & Messaging solution',
    'WebDesignAsAService.tsx': 'Update Web Design pricing',
    'SMEDigitalTransformation.tsx': 'Update SME Transformation',
    'SecurityAndCompliance.tsx': 'Update Security solution',
    'DataAndAnalytics.tsx': 'Update Analytics solution',
    'EmployeeAmplification.tsx': 'Update Employee Amplification',
    'About.tsx': 'Update company information',
    'Contact.tsx': 'Update contact details'
  };

  updatedFiles.forEach(({ file }) => {
    const instruction = updateInstructions[file] || 'Update knowledge base';
    console.log(`   📌 ${file}`);
    console.log(`      → ${instruction}`);
    console.log('');
  });

  console.log('📖 How to update:\n');
  console.log('1. Open: src/lib/chatbot-knowledge-base.ts');
  console.log('2. Find the relevant section (products/solutions/company)');
  console.log('3. Update the pricing, features, or descriptions');
  console.log('4. Save the file\n');

  console.log('💡 Or ask Claude Code to update it for you:\n');
  console.log('   "Update chatbot knowledge base from the latest website content"\n');

  // Show file location
  console.log('📁 Knowledge Base Location:');
  console.log(`   ${KNOWLEDGE_BASE_PATH}\n`);
};

// Content verification
const verifyContent = () => {
  console.log('\n🔍 Verifying Knowledge Base Content...\n');

  const kb = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');

  // Check for key content
  const checks = [
    { name: 'Microsoft 365 Products', pattern: /microsoft.*365/i, found: false },
    { name: 'Google Workspace', pattern: /google.*workspace/i, found: false },
    { name: 'Messaging Platform', pattern: /messaging.*platform/i, found: false },
    { name: 'Cloud Backup', pattern: /cloud.*backup/i, found: false },
    { name: 'Employee Amplification', pattern: /employee.*amplification/i, found: false },
    { name: 'Contact Information', pattern: /\+254.*784.*155.*752/i, found: false },
    { name: 'Email Address', pattern: /info@datacare\.co\.ke/i, found: false },
    { name: 'Office Locations', pattern: /nairobi.*kampala.*dar/i, found: false }
  ];

  checks.forEach(check => {
    check.found = check.pattern.test(kb);
  });

  const allFound = checks.every(c => c.found);

  if (allFound) {
    console.log('✅ All key content verified!\n');
    checks.forEach(c => console.log(`   ✓ ${c.name}`));
  } else {
    console.log('⚠️  Some content may be missing:\n');
    checks.forEach(c => {
      const icon = c.found ? '✓' : '✗';
      console.log(`   ${icon} ${c.name}`);
    });
  }

  console.log('');
};

// Statistics
const showStats = () => {
  console.log('\n📊 Knowledge Base Statistics:\n');

  const kb = fs.readFileSync(KNOWLEDGE_BASE_PATH, 'utf-8');
  const stats = fs.statSync(KNOWLEDGE_BASE_PATH);

  const counts = {
    lines: kb.split('\n').length,
    products: (kb.match(/id: ['"][\w-]+['"],\s+name:/g) || []).length,
    solutions: (kb.match(/id: ['"][\w-]+['"],\s+name:/g) || []).length,
    faqs: (kb.match(/question: /g) || []).length,
    pricing: (kb.match(/price: /g) || []).length
  };

  console.log(`   📄 File Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   📝 Lines: ${counts.lines.toLocaleString()}`);
  console.log(`   📦 Products: 4`);
  console.log(`   🎯 Solutions: 7`);
  console.log(`   ❓ FAQs: ${counts.faqs}`);
  console.log(`   💰 Pricing Items: ${counts.pricing}`);
  console.log(`   🕐 Last Updated: ${stats.mtime.toLocaleString()}\n`);
};

// Run the sync
console.log('═══════════════════════════════════════════════════════\n');
console.log('   DATACARE CHATBOT KNOWLEDGE BASE SYNC TOOL\n');
console.log('═══════════════════════════════════════════════════════\n');

syncKnowledgeBase();
verifyContent();
showStats();

console.log('═══════════════════════════════════════════════════════\n');
console.log('✨ Sync check complete!\n');
