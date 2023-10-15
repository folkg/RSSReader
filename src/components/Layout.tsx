import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Outlet />
    </>
  );
}
