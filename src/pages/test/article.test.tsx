import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Article from "../Article";
import { formatDate } from "../../utils/utils";
import * as ReactRouter from "react-router-dom";

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
    render(<Article />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  it("renders the article author", () => {
    render(<Article />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders the article publication date", () => {
    render(<Article />);
    expect(
      screen.getByText(formatDate("Thu, 13 Oct 2023 14:30:36 +0000"))
    ).toBeInTheDocument();
  });

  it("renders the article content", () => {
    render(<Article />);
    expect(
      screen.getByText("This is the content of the test article")
    ).toBeInTheDocument();
  });

  it("renders the 'View Original in New Tab' button", () => {
    render(<Article />);
    expect(screen.getByText("View Original in New Tab")).toBeInTheDocument();
  });
});

describe("Article Not Present", () => {
  beforeEach(() => {
    useLocationSpy.mockReturnValue({
      state: undefined,
    } as unknown as ReactRouter.Location);
  });

  it("renders the 'Article not found' message", () => {
    render(<Article />);
    expect(screen.getByText("Article not found")).toBeInTheDocument();
  });
});
