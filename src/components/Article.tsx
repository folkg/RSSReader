import { IonButton, IonContent } from "@ionic/react";
import parse from "html-react-parser";
import { RSSFeedItem } from "../models/RSSFeedItem";
import { formatDate } from "../utils/utils";
import "./Article.css";

type Props = {
  article: RSSFeedItem;
};

export default function Article({ article }: Props) {
  const onOpenNewTabClick = () => {
    window.open(article.link, "_blank");
  };
  return (
    <IonContent className="ion-padding">
      <div className="content">
        <h1>{article.title}</h1>
        <h3>{article.author}</h3>
        {article.pubDate && <h4>{formatDate(article.pubDate)}</h4>}
        <IonButton onClick={onOpenNewTabClick}>
          View Original in New Tab
        </IonButton>
        {article.content && <p>{parse(article.content)}</p>}
      </div>
    </IonContent>
  );
}
