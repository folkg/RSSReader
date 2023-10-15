import { RSSFeedItem } from "./RSSFeedItem";

export class RSSFeed {
  public link: string;
  public title: string | null;
  public description: string | null;
  public category?: string;
  public image?: string;
  public items: RSSFeedItem[];

  constructor(link: string) {
    this.link = link;
    this.title = null;
    this.description = null;
    this.items = [];
  }
}
