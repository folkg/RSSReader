import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RSSFeed } from "../../models/RSSFeed";
import Feed from "../Feed";

// Prevent react router errors
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Feed", () => {
  const feed = {
    title: "Test Feed",
    description: "This is a test feed",
    items: [
      {
        title: "Test Item 1",
        link: "https://example.com/test-item-1",
        pubDate: "Thu, 13 Oct 2023 14:30:36 +0000",
        content: "This is the content of test item 1",
      },
      {
        title: "Test Item 2",
        link: "https://example.com/test-item-2",
        pubDate: "Thu, 12 Oct 2023 00:00:00 +0000",
        content: "This is the content of test item 2",
      },
    ],
  } as unknown as RSSFeed;

  it("renders the feed title", () => {
    const { getByText } = render(<Feed feed={feed} />);
    expect(getByText("Test Feed")).toBeInTheDocument();
  });

  it("renders the feed description", () => {
    const { getByText } = render(<Feed feed={feed} />);
    expect(getByText("This is a test feed")).toBeInTheDocument();
  });

  it("renders the feed items", () => {
    const { getByText } = render(<Feed feed={feed} />);
    expect(getByText("Test Item 1")).toBeInTheDocument();
    expect(getByText("Test Item 2")).toBeInTheDocument();
  });
});
