import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkCircleOutline, ellipseOutline } from "ionicons/icons";
import { RSSFeedItem } from "../models/RSSFeedItem";
import { formatDate } from "../utils/utils";

type Props = {
  item: RSSFeedItem;
};
export default function FeedItem({ item }: Props) {
  return (
    <IonItem>
      {item.isRead ? (
        <IonIcon icon={checkmarkCircleOutline} />
      ) : (
        <IonIcon icon={ellipseOutline} />
      )}
      <IonLabel style={{ paddingLeft: "0.5rem" }}>
        <h3>{item.title}</h3>
        <p>
          {item.author && <span>{item.author} - </span>}
          {item.pubDate && <span>{formatDate(item.pubDate)}</span>}
        </p>
      </IonLabel>
    </IonItem>
  );
}
