import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {

  // Test 1: A very simple test that depends on nothing but the component's static text.
  it('should render the main headline', () => {
    // 1. Render the component into a virtual DOM
    render(<App />);

    // 2. Find an element by its text content
    // The `i` flag makes the text match case-insensitive
    const headline = screen.getByText(/vite \+ react/i);

    // 3. Assert that the element is actually in the document
    expect(headline).toBeInTheDocument();
  });

  // Test 2: A slightly more interactive test for the counter button.
  it('should increment the count when the button is clicked', () => {
    // 1. Render the component
    render(<App />);

    // 2. Find the button by its role and initial text
    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument(); // Make sure it's there to begin with

    // 3. Simulate a user clicking the button
    fireEvent.click(button);

    // 4. Assert that the button's text has now updated to "count is 1"
    const updatedButton = screen.getByRole('button', { name: /count is 1/i });
    expect(updatedButton).toBeInTheDocument();
  });

});