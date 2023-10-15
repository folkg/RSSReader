import { IonContent } from "@ionic/react";
import Feed from "../components/Feed";
import { useRSSFeeds } from "../hooks/useRSSFeeds";

export default function Dashboard() {
  const { feeds } = useRSSFeeds();
  return (
    <IonContent className="ion-padding">
      {feeds.map((feed) => (
        <Feed key={feed.title} feed={feed} />
      ))}
    </IonContent>
  );
}
