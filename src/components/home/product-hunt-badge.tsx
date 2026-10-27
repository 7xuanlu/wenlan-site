"use client";

import { useEffect, useState } from "react";

// The Product Hunt launch goes public at 00:01 PT on Oct 29, 2026. The page is
// static, so the check runs in the browser; `?ph-badge=1` shows it early for review.
const launchAt = Date.parse("2026-10-29T07:01:00Z");
const postUrl = "https://www.producthunt.com/posts/wenlan?embed=true&utm_source=badge-featured&utm_medium=badge";
const badgeUrl = (theme: "dark" | "light") =>
  `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1284511&theme=${theme}`;

export function ProductHuntBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("ph-badge") === "1";
    setVisible(forced || Date.now() >= launchAt);
  }, []);

  if (!visible) return null;

  return (
    <a className="home-ph-badge" href={postUrl} target="_blank" rel="noopener">
      <img className="home-ph-badge--dark" src={badgeUrl("dark")} alt="Wenlan on Product Hunt" width={200} height={43} />
      <img className="home-ph-badge--light" src={badgeUrl("light")} alt="Wenlan on Product Hunt" width={200} height={43} />
    </a>
  );
}
