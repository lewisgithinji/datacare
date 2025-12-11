#!/usr/bin/env node

/**
 * Create Demo User Script
 *
 * This script creates the demo user account in Supabase.
 *
 * PREREQUISITE: You need the Supabase SERVICE ROLE KEY (admin key)
 * Get it from: Supabase Dashboard → Settings → API → service_role key (secret)
 *
 * Usage:
 *   node scripts/create-demo-user.js
 *
 * Or with environment variable:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/create-demo-user.js
 */

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🔧 Demo User Creation Script\n');
  console.log('This will create: demo@datacare.co.ke / Demo2025!Preview\n');

  // Get Supabase URL
  let supabaseUrl = process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    supabaseUrl = await question('Enter your Supabase URL: ');
    supabaseUrl = supabaseUrl.trim();
  }

  // Get Service Role Key (admin key)
  let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.log('\n⚠️  You need the SERVICE ROLE KEY (not the anon key!)');
    console.log('Get it from: Supabase Dashboard → Settings → API → service_role');
    serviceRoleKey = await question('\nEnter your Supabase SERVICE ROLE KEY: ');
    serviceRoleKey = serviceRoleKey.trim();
  }

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing Supabase URL or Service Role Key');
    rl.close();
    process.exit(1);
  }

  console.log('\n🔗 Connecting to Supabase...');

  // Create admin client
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // Check if demo user already exists
    console.log('🔍 Checking if demo user exists...');
    const { data: existingUsers, error: checkError } = await supabaseAdmin.auth.admin.listUsers();

    if (checkError) {
      throw new Error(`Failed to check users: ${checkError.message}`);
    }

    const demoUser = existingUsers.users?.find(u => u.email === 'demo@datacare.co.ke');

    if (demoUser) {
      console.log('\n✅ Demo user already exists!');
      console.log(`   User ID: ${demoUser.id}`);
      console.log(`   Email: ${demoUser.email}`);
      console.log(`   Email Confirmed: ${demoUser.email_confirmed_at ? 'Yes' : 'No'}`);

      const answer = await question('\nDo you want to delete and recreate it? (y/N): ');

      if (answer.toLowerCase() === 'y') {
        console.log('🗑️  Deleting existing demo user...');
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(demoUser.id);

        if (deleteError) {
          throw new Error(`Failed to delete user: ${deleteError.message}`);
        }

        console.log('✅ Demo user deleted');
      } else {
        console.log('\n✅ Keeping existing demo user');
        console.log('\n📋 Next steps:');
        console.log('   1. Run: npx supabase db reset');
        console.log('   2. This will apply migration 005 which seeds sample data');
        console.log('   3. Try logging in at http://localhost:8081/login');
        rl.close();
        return;
      }
    }

    // Create demo user
    console.log('\n👤 Creating demo user...');
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: 'demo@datacare.co.ke',
      password: 'Demo2025!Preview',
      email_confirm: true,
      user_metadata: {
        full_name: 'Demo Admin',
        is_demo: true
      }
    });

    if (createError) {
      throw new Error(`Failed to create user: ${createError.message}`);
    }

    console.log('\n✅ Demo user created successfully!');
    console.log(`   User ID: ${newUser.user.id}`);
    console.log(`   Email: ${newUser.user.email}`);
    console.log(`   Email Confirmed: Yes`);

    // Now run the migration to link user to organization and seed data
    console.log('\n📋 Next steps:');
    console.log('   1. Run: npx supabase db reset');
    console.log('      This will:');
    console.log('      - Apply all migrations (including 005_demo_user_and_sample_data.sql)');
    console.log('      - Create demo team member');
    console.log('      - Seed 10 sample contacts');
    console.log('      - Seed 5 sample conversations with messages');
    console.log('      - Seed 8 templates and 3 campaigns');
    console.log('');
    console.log('   2. Start your app: npm run dev');
    console.log('');
    console.log('   3. Go to: http://localhost:8081/login');
    console.log('');
    console.log('   4. Click "Login with Demo Account"');
    console.log('');
    console.log('   5. Credentials:');
    console.log('      Email: demo@datacare.co.ke');
    console.log('      Password: Demo2025!Preview');
    console.log('');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Common issues:');
    console.error('   - Using anon key instead of service_role key');
    console.error('   - Wrong Supabase URL');
    console.error('   - Network/firewall blocking connection');
    console.error('   - Service role key revoked/expired');
    rl.close();
    process.exit(1);
  }

  rl.close();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
