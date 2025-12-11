import '@testing-library/jest-dom';

// Polyfill ResizeObserver
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}

window.ResizeObserver = ResizeObserver;

import { vi } from 'vitest';

// Polyfill scrollIntoView
Element.prototype.scrollIntoView = vi.fn();
