"use client";

import { FormEvent, useEffect, useState } from "react";

type Summary = {
  generatedAt: string;
  overview: { visitors: number; views: number; averageDurationMs: number; clicks: number; leads: number; completeLeads: number };
  pages: Array<{ pathname: string; visitors: number; views: number; averageDurationMs: number }>;
  sources: Array<{ source: string; visitors: number; views: number }>;
  clicks: Array<{ label: string; target: string; count: number }>;
  leads: Array<Record<string, string>>;
  recent: Array<{ createdAt: string; eventType: string; pathname: string; label?: string; visitorId: string }>;
};

function duration(value: number) {
  if (!value) return "—";
  const seconds = Math.round(value / 1000);
  return seconds < 60 ? `${seconds}秒` : `${Math.floor(seconds / 60)}分${seconds % 60}秒`;
}

export default function DataCenterPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");

  const load = async () => {
    const response = await fetch("/api/admin/summary", { credentials: "include", cache: "no-store" });
    if (response.ok) {
      setSummary(await response.json());
      setError("");
    } else if (response.status !== 401) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "暂时无法读取数据。");
    }
    setChecking(false);
  };

  useEffect(() => { void load(); }, []);

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

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar"><div><img src="/brand/jianglin-mark.png" alt="" /><span><strong>降临科技</strong><small>投放数据中心</small></span></div><button onClick={logout}>退出登录</button></header>
      <div className="admin-shell">
        <section className="admin-heading"><div><span>最近30天</span><h1>网站与留资数据</h1></div><p>更新于 {new Date(summary.generatedAt).toLocaleString("zh-CN")}</p></section>
        <section className="admin-metrics">
          <article><span>访问人数</span><strong>{summary.overview.visitors}</strong><small>去重访客</small></article>
          <article><span>页面浏览</span><strong>{summary.overview.views}</strong><small>总浏览次数</small></article>
          <article><span>平均停留</span><strong>{duration(summary.overview.averageDurationMs)}</strong><small>完成停留统计的访问</small></article>
          <article><span>关键点击</span><strong>{summary.overview.clicks}</strong><small>链接与按钮</small></article>
          <article className="metric-lead"><span>客户留资</span><strong>{summary.overview.leads}</strong><small>{summary.overview.completeLeads} 人完成深度诊断</small></article>
        </section>

        <section className="admin-panel"><div className="admin-panel-head"><h2>页面表现</h2><span>人数、浏览和停留</span></div><div className="admin-table"><table><thead><tr><th>页面</th><th>人数</th><th>浏览</th><th>平均停留</th></tr></thead><tbody>{summary.pages.map((row) => <tr key={row.pathname}><td>{row.pathname}</td><td>{row.visitors}</td><td>{row.views}</td><td>{duration(row.averageDurationMs)}</td></tr>)}</tbody></table></div></section>

        <div className="admin-grid">
          <section className="admin-panel"><div className="admin-panel-head"><h2>流量来源</h2><span>UTM或直接访问</span></div><div className="admin-table"><table><thead><tr><th>来源</th><th>人数</th><th>浏览</th></tr></thead><tbody>{summary.sources.map((row) => <tr key={row.source}><td>{row.source || "直接访问"}</td><td>{row.visitors}</td><td>{row.views}</td></tr>)}</tbody></table></div></section>
          <section className="admin-panel"><div className="admin-panel-head"><h2>热门点击</h2><span>用户最关心什么</span></div><div className="admin-table"><table><thead><tr><th>按钮/链接</th><th>次数</th></tr></thead><tbody>{summary.clicks.map((row, index) => <tr key={`${row.label}-${index}`}><td><strong>{row.label || "未命名操作"}</strong><small>{row.target}</small></td><td>{row.count}</td></tr>)}</tbody></table></div></section>
        </div>

        <section className="admin-panel leads-panel"><div className="admin-panel-head"><h2>客户留资</h2><span>快速诊断提交后立即出现</span></div><div className="admin-table"><table><thead><tr><th>时间</th><th>客户</th><th>联系方式</th><th>身份/入口</th><th>主要目标</th><th>诊断状态</th></tr></thead><tbody>{summary.leads.length ? summary.leads.map((lead) => <tr key={lead.id}><td>{lead.createdAt ? new Date(lead.createdAt).toLocaleString("zh-CN") : "—"}</td><td>{lead.name || "未填写姓名"}</td><td><strong>{lead.contact}</strong></td><td>{lead.identity}<small>{lead.audience === "expert" ? "专家版" : "创始人版"}</small></td><td>{lead.primaryGoal}</td><td><span className={`lead-status ${lead.status === "complete" ? "complete" : ""}`}>{lead.status === "complete" ? "深度诊断完成" : "快速诊断"}</span></td></tr>) : <tr><td colSpan={6} className="admin-empty">还没有客户留资</td></tr>}</tbody></table></div></section>
      </div>
    </main>
  );
}
