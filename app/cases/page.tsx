import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "客户案例｜降临科技",
  description: "来自电商、采购、客户接待、文旅、零售与教育场景的企业AI落地案例。",
};

const cases = [
  {
    no: "01", client: "小象优选", type: "电商运营智能体",
    title: "把日常工作交给 AI，减少多平台、多品牌、多 SKU 带来的重复劳动。",
    text: "围绕选品、竞品分析、内容生成和运营检查等日常工作，已搭建至少 9 类业务智能体。每个岗位都有自己的工作入口。",
    metric: "9 类", label: "业务智能体已搭建", image: "/cases/xiaoxiang-agents.png",
  },
  {
    no: "02", client: "阳采集团", type: "高精度订单核查",
    title: "采购订单核查，业务需要的不是“大致正确”，而是可以直接使用。",
    text: "针对型号匹配、规则判断等高精度任务，试点准确率从约 70% 提升至 99.99%。同时考虑异常识别、依据追溯和人工兜底。",
    metric: "70% → 99.99%", label: "试点准确率", image: "",
  },
  {
    no: "03", client: "王润宇团队", type: "AI 前置接待",
    title: "AI 先了解需求、筛选线索，团队只跟进更有价值的客户。",
    text: "让 AI 承担重复的前置沟通，收集基本情况并判断需求方向，再把清晰、有价值的线索转交人工，提高团队接待效率。",
    metric: "AI → 人", label: "前置接待与人工跟进协同", image: "",
  },
  {
    no: "04", client: "杭州城投资产集团", type: "线下数字触点",
    title: "让约 400 件实体载体，不止被带走，还能持续连接游客。",
    text: "把手环、冰箱贴等一次性纪念品变成数字入口，承载互动内容与后续访问。项目累计产生 30 万+ 网站请求。",
    metric: "约 400 件", label: "实体互动载体", image: "",
    note: "30 万+ 为网站请求，不代表独立用户或曝光人数。",
  },
  {
    no: "05", client: "铁狗咖啡", type: "线下互动营销",
    title: "10 多个小时完成上线，让现场互动不只好玩，也能追踪结果。",
    text: "完成 200 份实体载体与在线测试的联动。后台记录 46 次页面浏览事件、17 次完成测试事件与 4 次海报行为。",
    metric: "10+ 小时", label: "从策划到上线", image: "/cases/tiegou-data.png",
    note: "以上为后台事件数，不等同于独立访客。",
  },
  {
    no: "06", client: "得到 App", type: "企业 AI 课程",
    title: "把企业 AI 落地方法讲给更多人，也证明复杂技术可以被讲明白。",
    text: "《企业 AI 落地课》正式上架得到 App，并在上架当天进入首页推荐。课程页面显示超过 1.9 万人学过。",
    metric: "19,053", label: "课程页面显示“学过”人数", image: "/cases/dedao-course.png",
  },
];

export default function CasesPage() {
  return (
    <main className="corporate-site">
      <section className="page-hero page-hero--dark">
        <SiteHeader theme="dark" />
        <div className="page-hero__index">03 / CASES</div>
        <div className="page-hero__copy">
          <p className="site-kicker site-kicker--light">PROOF IN REAL WORK</p>
          <h1>少核错一单，<br />多连接一个客户，<br /><em>就是价值。</em></h1>
          <p>我们用真实系统、业务结果和清楚的数据口径说明工作，不用概念代替交付。</p>
        </div>
        <div className="page-circle page-circle--red" aria-hidden="true" />
      </section>

      <section className="case-list site-shell">
        {cases.map((item) => (
          <article key={item.no}>
            <div className="case-list__meta">
              <span>{item.no}</span>
              <div><strong>{item.client}</strong><small>{item.type}</small></div>
            </div>
            <div className="case-list__story">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <div className="case-list__metric"><strong>{item.metric}</strong><span>{item.label}</span></div>
              {item.note && <small className="data-note">数据口径：{item.note}</small>}
            </div>
            <div className={`case-list__visual ${item.image ? "" : "case-list__visual--type"}`}>
              {item.image ? <img src={item.image} alt={`${item.client}项目真实资料`} /> : <span>{item.client}</span>}
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
