import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "企业AI服务｜降临科技",
  description: "企业AI咨询与场景诊断、AI培训、智能体与企业大脑、AI与线下触点设计。",
};

const services = [
  {
    no: "01",
    en: "AI STRATEGY & DIAGNOSIS",
    title: "企业 AI 咨询与场景诊断",
    thesis: "当企业不知道做什么时，先把问题找对。",
    text: "我们通过访谈、业务梳理和场景共创，找到可以降本、提效或形成新收入的机会，并按价值、成本、周期和风险排序。",
    deliver: ["AI 场景机会清单", "优先级与投入建议", "第一个试点项目", "知识、数据与系统路线图"],
  },
  {
    no: "02",
    en: "AI ENABLEMENT",
    title: "企业 AI 培训",
    thesis: "让团队在真实工作里，当场学会怎么用。",
    text: "从管理层认知到岗位实战，课程围绕企业自己的问题展开。员工不仅学工具，也会理解哪些任务适合交给 AI、怎样验证输出。",
    deliver: ["管理层 AI 共识", "岗位场景工作坊", "真实任务实战", "下一步行动建议"],
  },
  {
    no: "03",
    en: "AGENTS & ENTERPRISE BRAIN",
    title: "智能体与企业大脑",
    thesis: "让 AI 从“会聊天”，走向真正参与业务。",
    text: "把产品资料、制度、历史案例、数据库和优秀员工经验连接起来，建设能查依据、能做任务、能记录结果的岗位智能体与企业工作台。",
    deliver: ["企业知识库", "岗位智能体", "业务系统与数据接入", "权限、安全与追溯机制"],
  },
  {
    no: "04",
    en: "AI × OFFLINE TOUCHPOINTS",
    title: "AI 与线下触点设计",
    thesis: "把一次性物料，变成持续连接客户的入口。",
    text: "将 AI 服务、内容和 NFC 等硬件触点结合，应用于展会、园区、门店、产品和文旅场景，让每一次互动可延续、可运营、可追踪。",
    deliver: ["互动场景策划", "AI 服务与内容设计", "NFC 等实体载体", "行为数据与后续运营"],
  },
];

export default function ServicesPage() {
  return (
    <main className="corporate-site">
      <section className="page-hero page-hero--paper">
        <SiteHeader />
        <div className="page-hero__index">02 / SERVICES</div>
        <div className="page-hero__copy">
          <p className="site-kicker">WHAT WE DO</p>
          <h1>找到最值钱的问题，<br />把 AI <em>真正用进业务。</em></h1>
          <p>从咨询、培训到定制落地。企业不需要一次做完所有场景，只需要先找到最值得开始的那一个。</p>
        </div>
        <div className="page-circle" aria-hidden="true" />
      </section>

      <section className="service-detail site-shell">
        {services.map((service) => (
          <article key={service.no}>
            <div className="service-detail__title">
              <span>{service.no}</span>
              <small>{service.en}</small>
              <h2>{service.title}</h2>
            </div>
            <div className="service-detail__body">
              <h3>{service.thesis}</h3>
              <p>{service.text}</p>
              <div className="deliverables">
                <small>你会得到</small>
                <ul>{service.deliver.map((item) => <li key={item}>{item}<span>↗</span></li>)}</ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="decision-path">
        <div className="site-shell">
          <p className="site-kicker site-kicker--light">A PATH, NOT A PURCHASE</p>
          <h2>AI 落地不是一次采购，<br />而是一条逐步验证的路径。</h2>
          <div className="decision-steps">
            {[
              ["01", "看清业务问题"],
              ["02", "选择高价值场景"],
              ["03", "完成小范围试点"],
              ["04", "连接知识与数据"],
              ["05", "复制到更多岗位"],
            ].map(([no, text]) => <div key={no}><span>{no}</span><strong>{text}</strong></div>)}
          </div>
          <p className="decision-note">优先寻找：价值明确、数据可得、两至四周可以验证的场景。</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
