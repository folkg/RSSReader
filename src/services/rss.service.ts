import { RSSFeed } from "../models/RSSFeed";
import { RSSFeedItem } from "../models/RSSFeedItem";
import xml2js from "xml2js";

export async function refreshRSSFeed(staleFeed: RSSFeed): Promise<RSSFeed> {
  try {
    return await parseRSSFeed(staleFeed.link);
  } catch (error) {
    console.error(error);
    return staleFeed;
  }
}

async function parseRSSFeed(link: string): Promise<RSSFeed> {
  const parser = new xml2js.Parser({ trim: true, explicitArray: false });

  // TODO: Set up simple bun forwarder to avoid CORS issues in future. Or Next.js relay.
  const url = "https://cors-anywhere.herokuapp.com/" + link;

  const response = await fetch(url);
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
