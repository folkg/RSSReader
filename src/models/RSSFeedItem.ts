export class RSSFeedItem {
  // https://w3schools.sinsixx.com/rss/rss_item.asp.htm
  public description: string;
  public link: string;
  public title: string;
  public author?: string;
  public categories?: string[];
  public comments?: string;
  public enclosure?: any;
  public guid?: string;
  public pubDate?: string;
  public source?: string;
  public thumbnail?: string;
  public content?: string;
  public isoDate?: string;
  public isRead: boolean = false;
  public summary?: string;
  public feedLink: string;

  constructor(item: any, feedLink: string) {
    this.description = item.description;
    this.link = item.link;
    this.title = item.title;
    this.author = item.author;
    this.categories = item.categories;
    this.comments = item.comments;
    this.enclosure = item.enclosure;
    this.guid = item.guid["_"] ?? item.guid;
    this.pubDate = item.pubDate;
    this.source = item.source;
    this.thumbnail = item.thumbnail;
    this.content = item.content ?? item["content:encoded"];
    this.isoDate = item.isoDate;
    this.feedLink = feedLink;
  }
}
