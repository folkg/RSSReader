import { useLocation } from "react-router-dom";
import Article from "../components/Article";

export default function Reader() {
  const { state } = useLocation();

  return (
    <>{state ? <Article article={state} /> : <h1>Article not found</h1>}</>
  );
}
