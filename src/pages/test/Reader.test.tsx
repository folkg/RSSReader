import { render, screen } from "@testing-library/react";
import * as ReactRouter from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Reader from "../Reader";

// Prevent react router errors
vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
}));
const useLocationSpy = vi.spyOn(ReactRouter, "useLocation");

describe("Article Present", () => {
  beforeEach(() => {
    useLocationSpy.mockReturnValue({
      state: {
        title: "Test Article",
        author: "Test Author",
        pubDate: "Thu, 13 Oct 2023 14:30:36 +0000",
        link: "https://example.com/test-article",
        content: "<p>This is the content of the test article</p>",
      },
    } as unknown as ReactRouter.Location);
  });

  it("renders the article title", () => {
    render(<Reader />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  // it("renders the summary tab if tab is set to 'summary'", () => {
  //   render(<Reader />, { initialState: { tab: "summary" } });
  //   expect(screen.getByText("SummaryComponent")).toBeInTheDocument();
  // });
});

describe("Article Not Present", () => {
  beforeEach(() => {
    useLocationSpy.mockReturnValue({
      state: undefined,
    } as unknown as ReactRouter.Location);
  });

  it("renders the 'Article not found' message", () => {
    render(<Reader />);
    expect(screen.getByText("Article not found")).toBeInTheDocument();
  });
});
