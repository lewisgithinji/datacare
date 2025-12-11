import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Use MemoryRouter for isolated tests
import SignupPage from './SignupPage';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook and react-router-dom's useNavigate
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
const mockedUseAuth = vi.mocked(useAuth);

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignupPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  it('should render the signup form', () => {
    // Arrange
    mockedUseAuth.mockReturnValue({} as any); // Provide a basic mock
    render( // Use MemoryRouter
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('should display an error message if passwords do not match', async () => {
    // Arrange
    const user = userEvent.setup();
    mockedUseAuth.mockReturnValue({} as any);
    render( // Use MemoryRouter
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    // Fill in the form with mismatched passwords
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'differentPassword');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Wait for the error message to appear
    const errorMessage = await screen.findByText('Passwords do not match.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should call the signUp function and navigate on successful signup', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockSignUp = vi.fn().mockResolvedValue({ error: null });
    mockedUseAuth.mockReturnValue({ signUp: mockSignUp } as any);

    render( // Use MemoryRouter
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    // Act
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Assert
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('should display an error message if signUp fails', async () => {
    // Arrange
    const user = userEvent.setup();
    const errorMessage = 'User already registered';
    const mockSignUp = vi.fn().mockResolvedValue({ error: { message: errorMessage } });
    mockedUseAuth.mockReturnValue({ signUp: mockSignUp } as any);

    render( // Use MemoryRouter
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    // Act
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Check that the button is no longer in a loading state
    expect(screen.getByRole('button', { name: /Sign Up/i })).not.toBeDisabled();
  });
});