import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button'; // Assuming button is exported from here

describe('Button Component', () => {
  it('should render the button with its children', () => {
    // Arrange
    const buttonText = 'Click Me';
    render(<Button>{buttonText}</Button>);

    // Act
    const buttonElement = screen.getByRole('button', { name: buttonText });

    // Assert
    expect(buttonElement).toBeInTheDocument();
  });
});