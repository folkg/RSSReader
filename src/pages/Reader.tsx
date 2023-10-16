import {
  IonFooter,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Article from "../components/Article";
import Summary from "../components/Summary";
import { RSSFeedsContext } from "../context/useRSSFeeds";
import useSummarizer from "../hooks/useSummarizer";

type Tabs = "article" | "summary";

export default function Reader() {
  const { state } = useLocation();
  const [artcile, setArticle] = useState(state);
  const [tab, setTab] = useState<Tabs>("article");
  const { summary, generateSummary } = useSummarizer();
  const { replaceFeedItem } = useContext(RSSFeedsContext);

  useEffect(() => {
    if (tab === "summary" && state.summary === undefined) {
      generateSummary(state);
    }
  }, [tab, state]);

  useEffect(() => {
    if (summary) {
      const newItem = { ...state, summary };
      setArticle(newItem);
      replaceFeedItem(newItem);
    }
  }, [summary]);

  function handleTabChange(event: CustomEvent) {
    setTab(event.detail.value as Tabs);
  }

  return (
    <>
      {state ? (
        <>
          {tab === "article" ? (
            <Article article={artcile} />
          ) : (
            <Summary article={artcile} />
          )}
          <IonFooter>
            <IonToolbar>
              <IonSegment value={tab} onIonChange={handleTabChange}>
                <IonSegmentButton value="article">
                  <IonLabel>Article</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="summary">
                  <IonLabel>Summary</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonFooter>
        </>
      ) : (
        <h1>Article not found</h1>
      )}
    </>
  );
}
