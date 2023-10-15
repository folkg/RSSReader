import { IonIcon, IonItem, IonLabel, IonButton } from "@ionic/react";
import { checkmarkCircleOutline, readerOutline } from "ionicons/icons";
import { RSSFeedItem } from "../models/RSSFeedItem";
import { formatDate } from "../utils/utils";
import { useNavigate } from "react-router-dom";

type Props = {
  item: RSSFeedItem;
};
export default function FeedItem({ item }: Props) {
  const navigate = useNavigate();
  const readClickHandler = () => navigate("/read", { state: item });

  return (
    <IonItem>
      {item.isRead ? (
        <IonIcon icon={checkmarkCircleOutline} />
      ) : (
        <IonIcon icon={readerOutline} />
      )}
      <IonLabel style={{ paddingLeft: "0.5rem" }}>
        <h3>{item.title}</h3>
        <p>
          {item.author && <span>{item.author} - </span>}
          {item.pubDate && <span>{formatDate(item.pubDate)}</span>}
        </p>
      </IonLabel>
      <IonButton onClick={readClickHandler}>Read</IonButton>
    </IonItem>
  );
}
