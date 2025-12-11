import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardOverview from './Overview';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook from the AuthProvider module
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
const mockedUseAuth = vi.mocked(useAuth); // Corrected to use vi.mocked

describe('DashboardOverview Page', () => {
  it('should render a personalized welcome message using the user\'s full name', () => {
    // Arrange: Mock the return value of useAuth for this specific test
    const mockUser = {
      email: 'test@example.com',
      user_metadata: { full_name: 'John Doe' },
    };
    mockedUseAuth.mockReturnValue({ user: mockUser } as any);

    render(<DashboardOverview />);

    // Assert: Check for the personalized greeting
    const heading = screen.getByRole('heading', {
      name: /Welcome back, John Doe!/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render all four summary statistic cards', () => {
    // Arrange: Provide a basic user object for the hook
    mockedUseAuth.mockReturnValue({
      user: { email: 'test@example.com' },
    } as any);

    render(<DashboardOverview />);

    // Assert: Check that all card titles are present
    expect(screen.getByText('Total Conversations')).toBeInTheDocument();
    expect(screen.getByText('Active Contacts')).toBeInTheDocument();
    expect(screen.getByText('Campaigns Sent')).toBeInTheDocument();
    expect(screen.getByText('Avg. Response Time')).toBeInTheDocument();
  });
});