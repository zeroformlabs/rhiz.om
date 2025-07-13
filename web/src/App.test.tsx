import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {

  // Test 1: A very simple test that depends on nothing but the component"s static text.
  it("should render the main headline", () => {
    // 1. Render the component into a virtual DOM
    render(<App />);

    // 2. Find an element by its text content
    // The `i` flag makes the text match case-insensitive
    const headline = screen.getByText(/Welcome to Rhiz.om/i);

    // 3. Assert that the element is actually in the document
    expect(headline).toBeInTheDocument();
  });

});