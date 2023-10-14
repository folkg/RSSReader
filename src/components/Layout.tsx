import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Outlet />
    </div>
  );
}
