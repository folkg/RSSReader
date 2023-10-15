import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
} from "@ionic/react";
import { RSSFeed } from "../models/RSSFeed";
import FeedItem from "./FeedItem";

type Props = {
  feed: RSSFeed;
};
export default function Feed({ feed }: Props) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{feed.title}</IonCardTitle>
        <IonCardSubtitle>{feed.description}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          {feed.items.map((item) => (
            <FeedItem key={item.title} item={item} />
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
