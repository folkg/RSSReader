import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RSSFeedItem } from "../../models/RSSFeedItem";
import { formatDate } from "../../utils/utils";
import Article from "../Article";

describe("Article Present", () => {
  const article = {
    title: "Test Article",
    author: "Test Author",
    pubDate: "Thu, 13 Oct 2023 14:30:36 +0000",
    link: "https://example.com/test-article",
    content: "<p>This is the content of the test article</p>",
  } as RSSFeedItem;

  it("renders the article title", () => {
    render(<Article article={article} />);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  it("renders the article author", () => {
    render(<Article article={article} />);
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  it("renders the article publication date", () => {
    render(<Article article={article} />);
    expect(
      screen.getByText(formatDate("Thu, 13 Oct 2023 14:30:36 +0000"))
    ).toBeInTheDocument();
  });

  it("renders the article content", () => {
    render(<Article article={article} />);
    expect(
      screen.getByText("This is the content of the test article")
    ).toBeInTheDocument();
  });

  it("renders the 'View Original in New Tab' button", () => {
    render(<Article article={article} />);
    expect(screen.getByText("View Original in New Tab")).toBeInTheDocument();
  });
});
