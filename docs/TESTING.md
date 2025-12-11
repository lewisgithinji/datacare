# Testing Guide

This document outlines the testing strategy, tools, and procedures for the Datacare corporate website project. A robust testing process is crucial for maintaining code quality, preventing regressions, and ensuring a reliable user experience.

## 🎯 Testing Philosophy

We follow a pragmatic testing pyramid approach, focusing on:

1.  **Unit Tests**: To verify individual components, hooks, and utility functions in isolation. These form the base of our testing strategy.
2.  **Integration Tests**: To ensure that multiple components work together as expected (e.g., a form with its input fields and submission logic).
3.  **End-to-End (E2E) Tests**: To simulate real user workflows from start to finish. These are used sparingly for critical user paths like authentication and contact form submission.

## 🛠️ Tooling

- **Framework**: [**Vitest**](https://vitest.dev/) - A Vite-native testing framework that is fast, simple to configure, and works seamlessly with our existing stack.
- **Library**: [**React Testing Library**](https://testing-library.com/docs/react-testing-library/intro/) - For testing React components by interacting with them as a user would.
- **Assertions**: [**Chai**](https://www.chaijs.com/) (via Vitest) - For readable and expressive assertions.

## 🚀 Setup

First, install the required development dependencies:

```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom
```

Next, update `vite.config.ts` to configure Vitest:

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts', // Path to setup file
    css: true,
  },
})
```

Create a setup file at `src/test/setup.ts` to import necessary matchers:

```typescript
import '@testing-library/jest-dom';
```

Finally, add the test scripts to your `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
},
```

## 🏃 Running Tests

- **Run all tests in watch mode**:
  ```bash
  npm test
  ```
- **Run tests with a UI**:
  ```bash
  npm run test:ui
  ```
- **Generate a coverage report**:
  ```bash
  npm run coverage
  ```

## ✍️ Writing Tests

Test files should be co-located with the components they are testing, using the `.test.tsx` extension (e.g., `Button.test.tsx`). This makes them easy to find and maintain.