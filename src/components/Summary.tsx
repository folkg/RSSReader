import { IonContent } from "@ionic/react";
import { RSSFeedItem } from "../models/RSSFeedItem";
import { formatDate } from "../utils/utils";

type Props = {
  article: RSSFeedItem;
};
export default function Summary({ article }: Props) {
  return (
    <IonContent className="ion-padding">
      <div className="content">
        <h1>{article.title}</h1>
        <h3>{article.author}</h3>
        {article.pubDate && <h4>{formatDate(article.pubDate)}</h4>}
        <p>{article.summary ? article.summary : "Loading summary..."}</p>
      </div>
    </IonContent>
  );
}
