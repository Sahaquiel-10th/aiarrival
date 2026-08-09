"use client";

import { useEffect, useState } from "react";

export default function FounderNavCta() {
  const [hasPassedHero, setHasPassedHero] = useState(false);

  useEffect(() => {
    const update = () => {
      const nextSection = document.getElementById("why");
      setHasPassedHero(Boolean(nextSection && nextSection.getBoundingClientRect().top <= window.innerHeight * 0.65));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a className="nav-cta founder-nav-cta" data-passed-hero={hasPassedHero} href="/diagnosis?audience=founder">
      {hasPassedHero ? "点此立即加入AI第二大脑启动计划" : "免费AI资产诊断"}
    </a>
  );
}
