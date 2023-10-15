import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
} from "@ionic/react";
import Feed from "../components/Feed";
import { useRSSFeeds } from "../hooks/useRSSFeeds";
import { add, chevronUpCircle, refreshOutline } from "ionicons/icons";

export default function Dashboard() {
  const { feeds } = useRSSFeeds();
  const addHandler = () => {};
  const refreshHandler = () => {};
  return (
    <IonContent className="ion-padding">
      <div className="content">
        {feeds.map((feed) => (
          <Feed key={feed.title} feed={feed} />
        ))}
      </div>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={add} onClick={addHandler}></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={refreshOutline} onClick={refreshHandler}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  );
}
