import { RSSFeed } from "../models/RSSFeed";
import { RSSFeedItem } from "../models/RSSFeedItem";
import xml2js from "xml2js";

export async function createRSSFeed(link: string): Promise<RSSFeed> {
  return await parseRssFeed(link);
}

export async function refreshRssFeed(staleFeed: RSSFeed): Promise<RSSFeed> {
  return await createRSSFeed(staleFeed.link);
}

async function parseRssFeed(link: string): Promise<RSSFeed> {
  const parser = new xml2js.Parser({ trim: true, explicitArray: false });

  const response = await fetch(link);
  const xmlData = await response.text();
  const parsedFeed = await parser.parseStringPromise(xmlData);
  const rssChannel = parsedFeed.rss.channel;

  const result = new RSSFeed(link);

  result.title = rssChannel.title;
  result.description = rssChannel.description;

  const items = rssChannel.item;
  for (const item of items) {
    const feedItem = new RSSFeedItem(item);
    result.items.push(feedItem);
  }

  return result;
}
