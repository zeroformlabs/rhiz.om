import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { useAuth0 } from "@auth0/auth0-react";

// Mock the useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn(),
}));

describe("App component", () => {
  it("should redirect to /login if not authenticated", () => {
    // Mock useAuth0 to return not authenticated and not loading
    (useAuth0 as vi.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/space"]}> {/* Start at /space to test redirection */}
        <App />
      </MemoryRouter>
    );

    // Expect to be redirected to the login page and find its content
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log In/i })).toBeInTheDocument();
  });

  it("should show loading state when auth0 is loading", () => {
    // Mock useAuth0 to return loading state
    (useAuth0 as vi.Mock).mockReturnValue({
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});