import { createContext, useEffect, useRef } from "react";
import { RSSFeed } from "../models/RSSFeed";
import { refreshRSSFeed } from "../services/rss.service";
import { useLocalStorage } from "../hooks/useLocalSotrage";
import { RSSFeedItem } from "../models/RSSFeedItem";

const defaultFeeds = [new RSSFeed("https://www.greaterfool.ca/feed/")];

type RSSFeedsContextType = {
  feeds: RSSFeed[];
  addFeed: (link: string) => Promise<void>;
  removeFeed: (feed: RSSFeed) => void;
  refreshFeeds: (feeds: RSSFeed[]) => Promise<void>;
  replaceFeedItem: (feedItem: RSSFeedItem) => void;
};

export const RSSFeedsContext = createContext<RSSFeedsContextType>({
  feeds: defaultFeeds,
  addFeed: async () => {},
  removeFeed: () => {},
  refreshFeeds: async () => {},
  replaceFeedItem: () => {},
});

export function useRSSFeeds() {
  const [feeds, setFeeds] = useLocalStorage("feeds", defaultFeeds);
  const feedsCountRef = useRef(0);

  const addFeed = async (link: string) => {
    let newFeed = new RSSFeed(link);
    newFeed = await refreshRSSFeed(newFeed);
    setFeeds([...feeds, newFeed]);
  };

  const removeFeed = (feed: RSSFeed) => {
    const newFeeds = feeds.filter((f) => f.link !== feed.link);
    setFeeds(newFeeds);
  };

  const refreshFeeds = async (feeds: RSSFeed[]) => {
    const feedPromises = feeds.map((feed) => refreshRSSFeed(feed));
    const feedsSettled = await Promise.allSettled(feedPromises);

    const freshFeeds = feedsSettled
      .map((feed) => {
        if (feed.status === "fulfilled") {
          return feed.value;
        }
        console.error(feed.reason);
        return null;
      })
      .filter((feed): feed is RSSFeed => feed !== null);

    setFeeds(freshFeeds);
  };

  const replaceFeedItem = (feedItem: RSSFeedItem) => {
    const updatedFeeds = feeds.map((f) => {
      const updatedItems = f.items.map((i) => {
        if (i.link === feedItem.link) {
          return feedItem;
        }
        return i;
      });
      return { ...f, items: updatedItems };
    });
    setFeeds(updatedFeeds);
  };

  useEffect(() => {
    // Refresh all feeds when the number of feeds changes
    // This will happen initially, and when a feed is added or removed
    if (feedsCountRef.current !== feeds.length) {
      refreshFeeds(feeds);
    }
    feedsCountRef.current = feeds.length;
  }, [feeds]);

  return { feeds, addFeed, removeFeed, replaceFeedItem, refreshFeeds };
}
