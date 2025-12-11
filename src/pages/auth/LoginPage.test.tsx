import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuth } from '@/hooks/useAuth';

// Mock the useAuth hook and react-router-dom's useNavigate/useLocation
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
    useLocation: () => ({
      state: { from: { pathname: '/dashboard' } },
    }),
  };
});

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the login form correctly', () => {
    // Arrange
    mockedUseAuth.mockReturnValue({} as any);
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('should call signIn and navigate on successful login', async () => {
    // Arrange
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    mockedUseAuth.mockReturnValue({ signIn: mockSignIn } as any);

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Act
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Assert
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('should display an error message if signIn fails', async () => {
    // Arrange
    const errorMessage = 'Invalid login credentials';
    const mockSignIn = vi.fn().mockResolvedValue({ error: { message: errorMessage } });
    mockedUseAuth.mockReturnValue({ signIn: mockSignIn } as any);

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Act
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Sign In/i })).not.toBeDisabled();
  });
});