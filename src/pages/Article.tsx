import { IonButton, IonContent } from "@ionic/react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { formatDate } from "../utils/utils";
import "./Article.css";

export default function Article() {
  const { state } = useLocation();
  const onOpenNewTabClick = () => {
    window.open(state.link, "_blank");
  };
  return (
    <IonContent className="ion-padding">
      {state ? (
        <div className="content">
          <h1>{state.title}</h1>
          <h3>{state.author}</h3>
          <h4>{formatDate(state.pubDate)}</h4>
          <IonButton onClick={onOpenNewTabClick}>
            View Original in New Tab
          </IonButton>
          <p>{parse(state.content)}</p>
        </div>
      ) : (
        <h1>Article not found</h1>
      )}
    </IonContent>
  );
}
