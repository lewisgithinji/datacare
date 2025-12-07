# DataCare WhatsApp Platform - Technical Implementation Guide

## Quick Start Guide

This guide provides detailed technical instructions for implementing the WhatsApp messaging platform for datacare.co.ke.

---

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [WhatsApp API Setup](#whatsapp-api-setup)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Database Setup](#database-setup)
6. [Deployment](#deployment)
7. [Code Examples](#code-examples)

---

## Environment Setup

### Prerequisites

```bash
# Required Software
- Node.js 18+ (LTS recommended)
- PostgreSQL 14+
- Redis 7+
- Git
- Docker (optional but recommended)
- VS Code or preferred IDE
```

### Initial Project Setup

```bash
# Create project directory
mkdir datacare-whatsapp-platform
cd datacare-whatsapp-platform

# Initialize Git repository
git init
git remote add origin <your-git-repo-url>

# Create project structure
mkdir -p backend frontend docs scripts database

# Initialize backend
cd backend
npm init -y
npm install express typescript @types/node @types/express dotenv
npm install -D ts-node nodemon @types/dotenv

# Initialize frontend
cd ../frontend
npx create-react-app . --template typescript
npm install @reduxjs/toolkit react-redux axios socket.io-client

# Create environment files
cd ../backend
touch .env .env.example
```

### Environment Variables (.env)

```bash
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/datacare_whatsapp
REDIS_URL=redis://localhost:6379

# WhatsApp Business API
WHATSAPP_API_URL=https://graph.facebook.com/v21.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_random_secure_token
WHATSAPP_WEBHOOK_SECRET=your_webhook_secret

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Monitoring
SENTRY_DSN=your_sentry_dsn_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## WhatsApp API Setup

### Step 1: Create Meta Business Account

1. Go to [business.facebook.com](https://business.facebook.com)
2. Click "Create Account"
3. Enter business details
4. Verify your business

### Step 2: Create WhatsApp Business App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "My Apps" → "Create App"
3. Select "Business" as app type
4. Add WhatsApp product to your app
5. Note down your credentials:
   - Phone Number ID
   - Business Account ID
   - Access Token

### Step 3: Configure Webhook

```javascript
// Your webhook URL should be:
// https://yourdomain.com/webhook/whatsapp

// Webhook verification endpoint
app.get('/webhook/whatsapp', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    console.log('Webhook verified successfully!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});
```

### Step 4: Subscribe to Webhook Events

In Meta App Dashboard:
1. Go to WhatsApp → Configuration
2. Click "Edit" next to webhook
3. Enter your webhook URL
4. Enter your verify token
5. Subscribe to: messages, message_status

---

## Backend Implementation

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── whatsapp.ts
│   ├── controllers/
│   │   ├── webhook.controller.ts
│   │   ├── message.controller.ts
│   │   ├── conversation.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── campaign.controller.ts
│   │   └── auth.controller.ts
│   ├── services/
│   │   ├── whatsapp.service.ts
│   │   ├── chatbot.service.ts
│   │   ├── message.service.ts
│   │   ├── queue.service.ts
│   │   └── analytics.service.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Contact.ts
│   │   ├── Conversation.ts
│   │   ├── Message.ts
│   │   └── Campaign.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimit.middleware.ts
│   ├── routes/
│   │   ├── webhook.routes.ts
│   │   ├── message.routes.ts
│   │   ├── conversation.routes.ts
│   │   ├── contact.routes.ts
│   │   └── campaign.routes.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validator.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── tests/
├── package.json
├── tsconfig.json
└── .env
```

### Core Implementation Files

#### 1. WhatsApp Service (src/services/whatsapp.service.ts)

```typescript
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

interface MessagePayload {
  to: string;
  type: 'text' | 'image' | 'document' | 'video' | 'template';
  text?: { body: string };
  image?: { link: string; caption?: string };
  document?: { link: string; filename: string };
  template?: {
    name: string;
    language: { code: string };
    components?: any[];
  };
}

class WhatsAppService {
  private apiUrl: string;
  private phoneNumberId: string;
  private accessToken: string;

  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL || '';
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
  }

  /**
   * Send a text message
   */
  async sendTextMessage(to: string, text: string): Promise<any> {
    const payload: MessagePayload = {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text }
    };

    return this.sendMessage(payload);
  }

  /**
   * Send a template message
   */
  async sendTemplateMessage(
    to: string,
    templateName: string,
    language: string = 'en',
    components?: any[]
  ): Promise<any> {
    const payload: MessagePayload = {
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: language },
        components
      }
    };

    return this.sendMessage(payload);
  }

  /**
   * Send an image message
   */
  async sendImageMessage(
    to: string,
    imageUrl: string,
    caption?: string
  ): Promise<any> {
    const payload: MessagePayload = {
      messaging_product: 'whatsapp',
      to,
      type: 'image',
      image: {
        link: imageUrl,
        caption
      }
    };

    return this.sendMessage(payload);
  }

  /**
   * Send a document message
   */
  async sendDocumentMessage(
    to: string,
    documentUrl: string,
    filename: string
  ): Promise<any> {
    const payload: MessagePayload = {
      messaging_product: 'whatsapp',
      to,
      type: 'document',
      document: {
        link: documentUrl,
        filename
      }
    };

    return this.sendMessage(payload);
  }

  /**
   * Upload media to WhatsApp
   */
  async uploadMedia(filePath: string, mimeType: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('messaging_product', 'whatsapp');
    formData.append('type', mimeType);

    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/media`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            ...formData.getHeaders()
          }
        }
      );

      return response.data.id;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }

  /**
   * Mark message as read
   */
  async markAsRead(messageId: string): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }

  /**
   * Core method to send messages
   */
  private async sendMessage(payload: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${this.phoneNumberId}/messages`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Message sent successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error sending message:', error.response?.data || error);
      throw error;
    }
  }

  /**
   * Create message template
   */
  async createTemplate(template: {
    name: string;
    category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
    language: string;
    components: any[];
  }): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`,
        template,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  }

  /**
   * Get template status
   */
  async getTemplateStatus(templateName: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${process.env.WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates`,
        {
          params: { name: templateName },
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error getting template status:', error);
      throw error;
    }
  }
}

export default new WhatsAppService();
```

#### 2. Webhook Controller (src/controllers/webhook.controller.ts)

```typescript
import { Request, Response } from 'express';
import crypto from 'crypto';
import whatsappService from '../services/whatsapp.service';
import messageService from '../services/message.service';
import chatbotService from '../services/chatbot.service';

class WebhookController {
  /**
   * Verify webhook
   */
  verifyWebhook(req: Request, res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed');
      res.sendStatus(403);
    }
  }

  /**
   * Handle incoming webhook events
   */
  async handleWebhook(req: Request, res: Response) {
    try {
      // Verify webhook signature
      const signature = req.headers['x-hub-signature-256'] as string;
      if (!this.verifySignature(req.body, signature)) {
        console.log('❌ Invalid webhook signature');
        return res.sendStatus(403);
      }

      const body = req.body;

      // Process webhook data
      if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            if (change.field === 'messages') {
              await this.processMessage(change.value);
            }
          }
        }
      }

      // Always return 200 to acknowledge receipt
      res.sendStatus(200);
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.sendStatus(500);
    }
  }

  /**
   * Process incoming message
   */
  private async processMessage(value: any) {
    try {
      const messages = value.messages;
      const contacts = value.contacts;
      const statuses = value.statuses;

      // Handle incoming messages
      if (messages && messages.length > 0) {
        for (const message of messages) {
          await this.handleIncomingMessage(message, contacts);
        }
      }

      // Handle message status updates
      if (statuses && statuses.length > 0) {
        for (const status of statuses) {
          await this.handleStatusUpdate(status);
        }
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }

  /**
   * Handle incoming message from customer
   */
  private async handleIncomingMessage(message: any, contacts: any[]) {
    const from = message.from;
    const messageId = message.id;
    const timestamp = message.timestamp;
    const type = message.type;

    // Get contact info
    const contact = contacts.find((c: any) => c.wa_id === from);
    const contactName = contact?.profile?.name || 'Unknown';

    console.log(`📨 Message from ${contactName} (${from}): ${type}`);

    // Extract message content based on type
    let content = '';
    let mediaUrl = null;

    switch (type) {
      case 'text':
        content = message.text.body;
        break;
      case 'image':
        content = message.image.caption || '';
        mediaUrl = message.image.id;
        break;
      case 'document':
        content = message.document.filename || '';
        mediaUrl = message.document.id;
        break;
      case 'audio':
        mediaUrl = message.audio.id;
        break;
      case 'video':
        content = message.video.caption || '';
        mediaUrl = message.video.id;
        break;
      case 'button':
        content = message.button.text;
        break;
      case 'interactive':
        if (message.interactive.type === 'button_reply') {
          content = message.interactive.button_reply.title;
        } else if (message.interactive.type === 'list_reply') {
          content = message.interactive.list_reply.title;
        }
        break;
    }

    // Save message to database
    await messageService.saveIncomingMessage({
      whatsappMessageId: messageId,
      from,
      contactName,
      type,
      content,
      mediaUrl,
      timestamp: new Date(parseInt(timestamp) * 1000)
    });

    // Mark message as read
    await whatsappService.markAsRead(messageId);

    // Process with chatbot
    const botResponse = await chatbotService.processMessage(from, content);

    if (botResponse.shouldRespond) {
      // Send automated response
      await whatsappService.sendTextMessage(from, botResponse.message);
    }

    if (botResponse.needsHumanAgent) {
      // Assign to human agent
      await messageService.assignToAgent(from);
    }
  }

  /**
   * Handle message status updates
   */
  private async handleStatusUpdate(status: any) {
    const messageId = status.id;
    const newStatus = status.status; // sent, delivered, read, failed

    console.log(`📊 Message ${messageId} status: ${newStatus}`);

    // Update message status in database
    await messageService.updateMessageStatus(messageId, newStatus);

    // Handle failures
    if (newStatus === 'failed') {
      const errors = status.errors || [];
      console.error(`❌ Message failed:`, errors);
      // Implement retry logic or notify admin
    }
  }

  /**
   * Verify webhook signature
   */
  private verifySignature(body: any, signature: string): boolean {
    if (!signature) return false;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.WHATSAPP_WEBHOOK_SECRET || '')
      .update(JSON.stringify(body))
      .digest('hex');

    return signature === `sha256=${expectedSignature}`;
  }
}

export default new WebhookController();
```

#### 3. Chatbot Service (src/services/chatbot.service.ts)

```typescript
import { redisClient } from '../config/redis';

interface BotResponse {
  shouldRespond: boolean;
  message: string;
  needsHumanAgent: boolean;
}

class ChatbotService {
  private faqs: Map<string, string>;

  constructor() {
    this.faqs = new Map([
      ['hello', 'Hello! Welcome to DataCare. How can I assist you today?'],
      ['hi', 'Hi there! How can I help you?'],
      ['help', 'I can help you with:\n1. Product information\n2. Order status\n3. Technical support\n4. Pricing\n\nWhat would you like to know?'],
      ['hours', 'We are available Monday-Friday 8AM-6PM EAT. For urgent matters, you can always leave a message and we will respond shortly.'],
      ['pricing', 'Our pricing varies by product. Would you like to speak with a sales representative?'],
    ]);
  }

  /**
   * Process incoming message and generate response
   */
  async processMessage(from: string, message: string): Promise<BotResponse> {
    const lowerMessage = message.toLowerCase().trim();

    // Check for exact FAQ match
    if (this.faqs.has(lowerMessage)) {
      return {
        shouldRespond: true,
        message: this.faqs.get(lowerMessage)!,
        needsHumanAgent: false
      };
    }

    // Check for partial matches (keywords)
    for (const [key, response] of this.faqs.entries()) {
      if (lowerMessage.includes(key)) {
        return {
          shouldRespond: true,
          message: response,
          needsHumanAgent: false
        };
      }
    }

    // Check business hours
    const isBusinessHours = this.isBusinessHours();

    if (!isBusinessHours) {
      return {
        shouldRespond: true,
        message: 'Thank you for contacting DataCare! Our team is currently offline. We will respond to your message during business hours (Mon-Fri 8AM-6PM EAT).',
        needsHumanAgent: true
      };
    }

    // Get conversation context
    const context = await this.getContext(from);

    // Check if already talking to human
    if (context?.assignedToAgent) {
      return {
        shouldRespond: false,
        message: '',
        needsHumanAgent: false
      };
    }

    // Advanced intent detection (simplified - in production use NLP service)
    const intent = this.detectIntent(lowerMessage);

    switch (intent) {
      case 'order_status':
        return {
          shouldRespond: true,
          message: 'I can help you check your order status. Please provide your order number.',
          needsHumanAgent: false
        };

      case 'complaint':
        return {
          shouldRespond: true,
          message: 'I\'m sorry to hear you\'re having issues. Let me connect you with a support agent who can help.',
          needsHumanAgent: true
        };

      case 'sales_inquiry':
        return {
          shouldRespond: true,
          message: 'Great! I\'ll connect you with our sales team to discuss your requirements.',
          needsHumanAgent: true
        };

      default:
        return {
          shouldRespond: true,
          message: 'I\'m not sure I understand. Let me connect you with a team member who can help.',
          needsHumanAgent: true
        };
    }
  }

  /**
   * Detect user intent from message
   */
  private detectIntent(message: string): string {
    const orderKeywords = ['order', 'tracking', 'delivery', 'shipped', 'track'];
    const complaintKeywords = ['problem', 'issue', 'not working', 'broken', 'complaint', 'disappointed'];
    const salesKeywords = ['buy', 'purchase', 'price', 'cost', 'interested', 'quote'];

    if (orderKeywords.some(keyword => message.includes(keyword))) {
      return 'order_status';
    }

    if (complaintKeywords.some(keyword => message.includes(keyword))) {
      return 'complaint';
    }

    if (salesKeywords.some(keyword => message.includes(keyword))) {
      return 'sales_inquiry';
    }

    return 'unknown';
  }

  /**
   * Check if current time is within business hours
   */
  private isBusinessHours(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getHours();

    // Monday-Friday, 8AM-6PM
    return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
  }

  /**
   * Get conversation context from Redis
   */
  private async getContext(phoneNumber: string): Promise<any> {
    try {
      const key = `chatbot:context:${phoneNumber}`;
      const context = await redisClient.get(key);
      return context ? JSON.parse(context) : null;
    } catch (error) {
      console.error('Error getting context:', error);
      return null;
    }
  }

  /**
   * Save conversation context to Redis
   */
  async saveContext(phoneNumber: string, context: any): Promise<void> {
    try {
      const key = `chatbot:context:${phoneNumber}`;
      await redisClient.setEx(key, 3600, JSON.stringify(context)); // 1 hour expiry
    } catch (error) {
      console.error('Error saving context:', error);
    }
  }
}

export default new ChatbotService();
```

#### 4. Main App Setup (src/app.ts)

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import webhookRoutes from './routes/webhook.routes';
import messageRoutes from './routes/message.routes';
import conversationRoutes from './routes/conversation.routes';
import contactRoutes from './routes/contact.routes';
import campaignRoutes from './routes/campaign.routes';
import authRoutes from './routes/auth.routes';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { notFound } from './middleware/notFound.middleware';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/webhook', webhookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/campaigns', campaignRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_conversation', (conversationId) => {
    socket.join(`conversation:${conversationId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io available throughout the app
app.set('io', io);

// Start server
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 WhatsApp webhook ready at /webhook/whatsapp`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
});

export { app, io };
```

#### 5. Database Configuration (src/config/database.ts)

```typescript
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
});

// Initialize database connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    process.exit(1);
  }
};
```

---

## Frontend Implementation

### Key Components

#### 1. Conversation List Component

```typescript
// src/components/ConversationList.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import axios from 'axios';

interface Conversation {
  id: string;
  contact: {
    name: string;
    phoneNumber: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
  };
  unreadCount: number;
  status: string;
}

export const ConversationList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    fetchConversations();

    // Listen for new messages
    socket?.on('new_message', (message: any) => {
      updateConversationList(message);
    });

    return () => {
      socket?.off('new_message');
    };
  }, [socket]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateConversationList = (message: any) => {
    setConversations(prev => {
      const updated = [...prev];
      const index = updated.findIndex(c => c.id === message.conversationId);
      
      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          lastMessage: {
            content: message.content,
            timestamp: message.timestamp
          },
          unreadCount: updated[index].unreadCount + 1
        };
        // Move to top
        const conversation = updated.splice(index, 1)[0];
        updated.unshift(conversation);
      }
      
      return updated;
    });
  };

  if (loading) {
    return <div>Loading conversations...</div>;
  }

  return (
    <div className="conversation-list">
      {conversations.map(conversation => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </div>
  );
};
```

#### 2. Message Input Component

```typescript
// src/components/MessageInput.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface MessageInputProps {
  conversationId: string;
  onMessageSent: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  conversationId,
  onMessageSent
}) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setSending(true);
    try {
      await axios.post(`/api/messages/send`, {
        conversationId,
        content: message,
        type: 'text'
      });

      setMessage('');
      onMessageSent();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        disabled={sending}
      />
      <button onClick={handleSend} disabled={sending || !message.trim()}>
        {sending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};
```

---

## Deployment

### Docker Setup

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/app.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: datacare
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: datacare_whatsapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    depends_on:
      - postgres
      - redis
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://datacare:secure_password@postgres:5432/datacare_whatsapp
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

### Deployment Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

---

## Testing

### Unit Tests Example

```typescript
// tests/services/whatsapp.service.test.ts
import whatsappService from '../../src/services/whatsapp.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WhatsApp Service', () => {
  it('should send a text message', async () => {
    const mockResponse = {
      data: {
        messaging_product: 'whatsapp',
        messages: [{ id: 'msg123' }]
      }
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await whatsappService.sendTextMessage(
      '254712345678',
      'Hello, World!'
    );

    expect(result.messages[0].id).toBe('msg123');
  });
});
```

---

## Monitoring & Logging

### Winston Logger Setup

```typescript
// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
```

---

## Next Steps

1. **Set up your Meta Business account**
2. **Clone and configure the project**
3. **Set up databases (PostgreSQL, Redis)**
4. **Configure environment variables**
5. **Test webhook connectivity**
6. **Deploy to staging environment**
7. **Begin Phase 1 development**

For support or questions, refer to the main roadmap document or contact the development team.
