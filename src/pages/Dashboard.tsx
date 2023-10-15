import { useRSSFeeds } from "../hooks/useRSSFeeds";

export default function Dashboard() {
  const { feeds } = useRSSFeeds();
  return (
    <>
      <div>Dashboard</div>
      {feeds.map((feed) => (
        <div key={feed.title}>{feed.title}</div>
      ))}
    </>
  );
}
