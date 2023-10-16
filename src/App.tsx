import { IonApp, setupIonicReact } from "@ionic/react";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Reader from "./pages/Reader";
import { RSSFeedsContext, useRSSFeeds } from "./context/useRSSFeeds";

setupIonicReact();

export default function App() {
  const rssFeeds = useRSSFeeds();

  return (
    <IonApp>
      <RSSFeedsContext.Provider value={rssFeeds}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="read" element={<Reader />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </RSSFeedsContext.Provider>
    </IonApp>
  );
}
