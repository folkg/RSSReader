import { useEffect, useRef } from "react";
import { RSSFeed } from "../models/RSSFeed";
import { refreshRSSFeed } from "../services/rss.service";
import { useLocalStorage } from "./useLocalSotrage";

const defaultFeeds = [new RSSFeed("https://www.greaterfool.ca/feed/")];

export function useRSSFeeds() {
  const [feeds, setFeeds] = useLocalStorage("feeds", defaultFeeds);
  const feedsCountRef = useRef(0);

  const addFeed = async (link: string) => {
    let newFeed = new RSSFeed(link);
    newFeed = await refreshRSSFeed(newFeed);
    setFeeds([...feeds, newFeed]);
  };

  const removeFeed = (link: string) => {
    const newFeeds = feeds.filter((feed) => feed.link !== link);
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
    console.log("Feeds refreshed!");
  };

  useEffect(() => {
    // Refresh all feeds when the number of feeds changes
    // This will happen initially, and when a feed is added or removed
    if (feedsCountRef.current !== feeds.length) {
      refreshFeeds(feeds);
    }
    feedsCountRef.current = feeds.length;
  }, [feeds]);

  return { feeds, addFeed, removeFeed, refreshFeeds };
}
