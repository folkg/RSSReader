export class RSSFeedItem {
  // https://w3schools.sinsixx.com/rss/rss_item.asp.htm
  private description: string;
  private link: string;
  private title: string;
  private author?: string;
  private categories?: string[];
  private comments?: string;
  private enclosure?: any;
  private guid?: string;
  private pubDate?: string;
  private source?: string;
  private thumbnail?: string;
  private content?: string;
  private isoDate?: string;
  public isRead: boolean = false;

  constructor(item: any) {
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
  }
}
