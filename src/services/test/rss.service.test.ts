/* eslint-disable @typescript-eslint/no-var-requires */
import { readFileSync } from "fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RSSFeed } from "../../models/RSSFeed";
import { itIntegration } from "../../test/common";
import { refreshRSSFeed } from "../rss.service";

describe("createRSSFeed", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });
  itIntegration(
    "should return a valid RSSFeed Object (integration test)",
    async () => {
      const feed = new RSSFeed("https://feeds.feedburner.com/mrmoneymustache");
      const result = await refreshRSSFeed(feed);

      expect(result).toBeDefined();
      expect(result.link).toBeDefined();
      expect(result.title).not.toBeNull();
      expect(result.description).not.toBeNull();
      expect(result.items.length).toBeGreaterThan(0);
    }
  );

  it("should return a valid RSSFeed Object", async () => {
    const xmlData = readFileSync(
      "src/services/test/mock/greaterfool.xml",
      "utf-8"
    );
    const response = { text: vi.fn().mockResolvedValue(xmlData) };
    global.fetch = vi.fn().mockResolvedValue(response);

    const feed = new RSSFeed("https://www.greaterfool.ca/feed/");
    const result = await refreshRSSFeed(feed);

    expect(result).toMatchSnapshot();
  });
});
