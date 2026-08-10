"use client";

import { FormEvent, useEffect, useState } from "react";

type Summary = {
  generatedAt: string;
  range: { from: string; to: string; label: string };
  blockedCount: number;
  overview: { visitors: number; views: number; averageDurationMs: number; clicks: number; leads: number; completeLeads: number };
  pages: Array<{ pathname: string; visitors: number; views: number; averageDurationMs: number }>;
  sources: Array<{ source: string; visitors: number; views: number }>;
  clicks: Array<{ label: string; target: string; count: number }>;
  leads: Array<Record<string, string>>;
  visitors: Visitor[];
  recent: Array<{ createdAt: string; eventType: string; pathname: string; label?: string; visitorId: string }>;
};

type Visitor = {
  id: string; firstSeen: string; lastSeen: string; source: string; device: string; audience: string;
  views: number; clicks: number; totalDurationMs: number; blocked: boolean;
  pages: Array<{ pathname: string; views: number; durationMs: number; clicks: number; firstSeen: string; lastSeen: string }>;
  actions: Array<{ createdAt: string; eventType: string; pathname: string; label: string; target: string; durationMs: number }>;
};

function duration(value: number) {
  if (!value) return "—";
  const seconds = Math.round(value / 1000);
  return seconds < 60 ? `${seconds}秒` : `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
}

function dateTime(value: string) {
  return value ? new Date(value).toLocaleString("zh-CN", { hour12: false }) : "—";
}

function visitorName(visitor: Visitor, index: number) {
  return `访客 ${String(index + 1).padStart(3, "0")} · ${visitor.id.slice(0, 6)}`;
}

function pageName(pathname: string) {
  const names: Record<string, string> = {
    "/": "降临科技官网",
    "/knowledge-assets": "创始人AI第二大脑",
    "/expert-ai-twin": "专家AI分身计划",
    "/diagnosis": "AI资产诊断（问卷与结果页）",
    "/cases": "案例",
    "/services": "服务",
    "/about": "关于降临",
  };
  return names[pathname] || pathname;
}

export default function DataCenterPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [range, setRange] = useState("30d");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [includeBlocked, setIncludeBlocked] = useState(false);
  const [selectedVisitorId, setSelectedVisitorId] = useState("");
  const [savingVisitor, setSavingVisitor] = useState(false);

  const load = async (options?: { range?: string; from?: string; to?: string; includeBlocked?: boolean }) => {
    const nextRange = options?.range ?? range;
    const nextFrom = options?.from ?? from;
    const nextTo = options?.to ?? to;
    const nextIncludeBlocked = options?.includeBlocked ?? includeBlocked;
    const params = new URLSearchParams({ range: nextRange });
    if (nextRange === "custom" && nextFrom) params.set("from", nextFrom);
    if (nextRange === "custom" && nextTo) params.set("to", nextTo);
    if (nextIncludeBlocked) params.set("includeBlocked", "1");
    const response = await fetch(`/api/admin/summary?${params}`, { credentials: "include", cache: "no-store" });
    if (response.ok) {
      const data = await response.json() as Summary;
      setSummary(data);
      setSelectedVisitorId((current) => data.visitors.some((visitor) => visitor.id === current) ? current : data.visitors[0]?.id || "");
      setError("");
    } else if (response.status !== 401) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "暂时无法读取数据。");
    }
    setChecking(false);
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/summary?range=30d", { credentials: "include", cache: "no-store" }).then(async (response) => {
      if (!active) return;
      if (response.ok) {
        const data = await response.json() as Summary;
        setSummary(data);
        setSelectedVisitorId(data.visitors[0]?.id || "");
        setError("");
      } else if (response.status !== 401) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "暂时无法读取数据。");
      }
      setChecking(false);
    }).catch(() => {
      if (!active) return;
      setError("暂时无法读取数据。");
      setChecking(false);
    });
    return () => { active = false; };
  }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "账号或密码不正确。");
      return;
    }
    setPassword("");
    await load();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setSummary(null);
  };

  const applyRange = async () => {
    setChecking(true);
    await load();
  };

  const toggleBlockedVisitors = async () => {
    const next = !includeBlocked;
    setIncludeBlocked(next);
    setChecking(true);
    await load({ includeBlocked: next });
  };

  const setVisitorBlocked = async (visitor: Visitor) => {
    setSavingVisitor(true);
    const response = await fetch(`/api/admin/visitors/${encodeURIComponent(visitor.id)}/block`, {
      method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocked: !visitor.blocked }),
    });
    if (!response.ok) setError("访客筛选状态保存失败，请稍后再试。");
    await load();
    setSavingVisitor(false);
  };

  if (checking) return <main className="admin-login"><div className="admin-login-card"><span className="admin-loader" />正在确认登录状态…</div></main>;

  if (!summary) {
    return (
      <main className="admin-login">
        <form className="admin-login-card" onSubmit={login}>
          <img src="/brand/jianglin-mark.png" alt="降临科技" />
          <small>降临科技 · 投放数据中心</small>
          <h1>登录查看数据</h1>
          <p>访问统计和客户留资仅对管理员开放。</p>
          <label>账号<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label>
          <label>密码<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
          {error && <div className="admin-error">{error}</div>}
          <button type="submit">登录数据中心</button>
        </form>
      </main>
    );
  }

  const selectedVisitor = summary.visitors.find((visitor) => visitor.id === selectedVisitorId) || summary.visitors[0];

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar"><div><img src="/brand/jianglin-mark.png" alt="" /><span><strong>降临科技</strong><small>投放数据中心</small></span></div><button onClick={logout}>退出登录</button></header>
      <div className="admin-shell">
        <section className="admin-heading"><div><span>{summary.range.label}</span><h1>网站与留资数据</h1></div><p>更新于 {dateTime(summary.generatedAt)}</p></section>
        <section className="admin-filterbar">
          <div className="admin-range-presets">
            {[['7d','近7天'],['30d','近30天'],['90d','近90天'],['all','全部'],['custom','自定义']].map(([value, label]) => <button className={range === value ? "active" : ""} key={value} onClick={() => setRange(value)}>{label}</button>)}
          </div>
          {range === "custom" && <div className="admin-date-fields"><label>开始<input type="date" value={from} onChange={(event) => setFrom(event.target.value)} /></label><span>至</span><label>结束<input type="date" value={to} onChange={(event) => setTo(event.target.value)} /></label></div>}
          <button className="admin-apply-filter" onClick={applyRange}>应用筛选</button>
          <button className={`admin-blocked-toggle ${includeBlocked ? "active" : ""}`} onClick={toggleBlockedVisitors}>{includeBlocked ? "隐藏已屏蔽" : `查看已屏蔽（${summary.blockedCount}）`}</button>
        </section>
        <section className="admin-metrics">
          <article><span>访问人数</span><strong>{summary.overview.visitors}</strong><small>去重访客</small></article>
          <article><span>页面浏览</span><strong>{summary.overview.views}</strong><small>总浏览次数</small></article>
          <article><span>平均停留</span><strong>{duration(summary.overview.averageDurationMs)}</strong><small>完成停留统计的访问</small></article>
          <article><span>关键点击</span><strong>{summary.overview.clicks}</strong><small>链接与按钮</small></article>
          <article className="metric-lead"><span>客户留资</span><strong>{summary.overview.leads}</strong><small>{summary.overview.completeLeads} 人完成深度诊断</small></article>
        </section>

        <section className="admin-panel"><div className="admin-panel-head"><h2>页面表现</h2><span>人数、浏览和停留</span></div><div className="admin-table"><table><thead><tr><th>页面</th><th>人数</th><th>浏览</th><th>平均停留</th></tr></thead><tbody>{summary.pages.map((row) => <tr key={row.pathname}><td><strong>{pageName(row.pathname)}</strong><small>{row.pathname}</small></td><td>{row.visitors}</td><td>{row.views}</td><td>{duration(row.averageDurationMs)}</td></tr>)}</tbody></table></div></section>

        <div className="admin-grid">
          <section className="admin-panel"><div className="admin-panel-head"><h2>流量来源</h2><span>UTM或直接访问</span></div><div className="admin-table"><table><thead><tr><th>来源</th><th>人数</th><th>浏览</th></tr></thead><tbody>{summary.sources.map((row) => <tr key={row.source}><td>{row.source || "直接访问"}</td><td>{row.visitors}</td><td>{row.views}</td></tr>)}</tbody></table></div></section>
          <section className="admin-panel"><div className="admin-panel-head"><h2>热门点击</h2><span>用户最关心什么</span></div><div className="admin-table"><table><thead><tr><th>按钮/链接</th><th>次数</th></tr></thead><tbody>{summary.clicks.map((row, index) => <tr key={`${row.label}-${index}`}><td><strong>{row.label || "未命名操作"}</strong><small>{row.target}</small></td><td>{row.count}</td></tr>)}</tbody></table></div></section>
        </div>

        <section className="admin-panel visitor-panel">
          <div className="admin-panel-head"><h2>访客行为明细</h2><span>选择一个访客，查看他在哪些页面停留、点了什么；可将自己人排除出统计</span></div>
          <div className="visitor-workspace">
            <div className="visitor-list">
              {summary.visitors.length ? summary.visitors.map((visitor, index) => <button className={`${selectedVisitor?.id === visitor.id ? "active" : ""} ${visitor.blocked ? "blocked" : ""}`} key={visitor.id} onClick={() => setSelectedVisitorId(visitor.id)}>
                <span><strong>{visitorName(visitor, index)}</strong>{visitor.blocked && <em>已屏蔽</em>}</span>
                <small>{dateTime(visitor.lastSeen)}</small>
                <small>{visitor.source || "直接访问"} · {visitor.device || "未知设备"}</small>
                <b>{visitor.views} 次浏览 · {duration(visitor.totalDurationMs)} · {visitor.clicks} 次点击</b>
              </button>) : <p className="visitor-empty">这个时间段还没有访客</p>}
            </div>
            <div className="visitor-detail">
              {selectedVisitor ? <>
                <div className="visitor-detail-head"><div><small>访客ID</small><strong>{selectedVisitor.id}</strong><span>首次 {dateTime(selectedVisitor.firstSeen)} · 最近 {dateTime(selectedVisitor.lastSeen)}</span></div><button disabled={savingVisitor} className={selectedVisitor.blocked ? "restore" : ""} onClick={() => setVisitorBlocked(selectedVisitor)}>{selectedVisitor.blocked ? "取消屏蔽" : "屏蔽该访客（排除自己人）"}</button></div>
                <h3>页面停留与点击</h3>
                <div className="admin-table visitor-pages"><table><thead><tr><th>页面</th><th>浏览</th><th>累计停留</th><th>点击</th><th>最后访问</th></tr></thead><tbody>{selectedVisitor.pages.map((page) => <tr key={page.pathname}><td><strong>{pageName(page.pathname)}</strong><small>{page.pathname}</small></td><td>{page.views}</td><td>{duration(page.durationMs)}</td><td>{page.clicks}</td><td>{dateTime(page.lastSeen)}</td></tr>)}</tbody></table></div>
                <h3>最近行为（精确时间）</h3>
                <div className="visitor-timeline">{selectedVisitor.actions.map((action, index) => <article key={`${action.createdAt}-${index}`}><time>{dateTime(action.createdAt)}</time><span>{action.eventType === "click" ? "点击" : action.eventType === "page_view" ? "进入" : "离开"}</span><strong>{action.label || action.pathname}</strong>{action.eventType === "page_exit" && <em>停留 {duration(action.durationMs)}</em>}</article>)}</div>
              </> : <div className="visitor-empty">请从左侧选择访客</div>}
            </div>
          </div>
        </section>

        <section className="admin-panel leads-panel"><div className="admin-panel-head"><h2>客户留资</h2><span>快速诊断提交后立即出现</span></div><div className="admin-table"><table><thead><tr><th>时间</th><th>客户</th><th>联系方式</th><th>身份/入口</th><th>主要目标</th><th>诊断状态</th></tr></thead><tbody>{summary.leads.length ? summary.leads.map((lead) => <tr key={lead.id}><td>{lead.createdAt ? new Date(lead.createdAt).toLocaleString("zh-CN") : "—"}</td><td>{lead.name || "未填写姓名"}</td><td><strong>{lead.contact}</strong></td><td>{lead.identity}<small>{lead.audience === "expert" ? "专家版" : "创始人版"}</small></td><td>{lead.primaryGoal}</td><td><span className={`lead-status ${lead.status === "complete" ? "complete" : ""}`}>{lead.status === "complete" ? "深度诊断完成" : "快速诊断"}</span></td></tr>) : <tr><td colSpan={6} className="admin-empty">还没有客户留资</td></tr>}</tbody></table></div></section>
      </div>
    </main>
  );
}
