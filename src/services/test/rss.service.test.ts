/* eslint-disable @typescript-eslint/no-var-requires */
import { afterEach, describe, expect, it, vi } from "vitest";
import { createRSSFeed } from "../rss.service";
import { readFileSync } from "fs";
import { itIntegration } from "../../test/common";

describe("createRSSFeed", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
  });
  itIntegration(
    "should return a valid RSSFeed Object (integration test)",
    async () => {
      const result = await createRSSFeed(
        "https://feeds.feedburner.com/mrmoneymustache"
      );
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

    const result = await createRSSFeed("https://www.greaterfool.ca/feed/");
    expect(result).toMatchSnapshot();
  });
});
