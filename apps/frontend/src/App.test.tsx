import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and displays the store name in the app bar", async () => {
    globalThis.fetch = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);

      if (url.endsWith("/store-name")) {
        return Promise.resolve({
          json: () => Promise.resolve({ name: "The Tech Library" }),
        } as Response);
      }

      return Promise.reject(new Error(`Unexpected fetch URL: ${url}`));
    }) as unknown as typeof fetch;

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("The Tech Library")).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/store-name",
    );
  });
});
