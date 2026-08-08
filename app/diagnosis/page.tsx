"use client";

import { useEffect, useMemo, useState } from "react";

type Answers = {
  name: string;
  identity: string;
  industry: string;
  intro: string;
  workModes: string[];
  assets: string[];
  storage: string[];
  findability: string;
  sources: string[];
  recordHabit: string;
  desiredRecords: string[];
  goals: string[];
  futureAssistant: string;
  tools: string[];
  familiarity: string;
  approach: string;
  teamNeed: string;
  useCases: string[];
  help: string;
};

type QuickLead = {
  name: string;
  contact: string;
  identity: string;
  primaryGoal: string;
  currentStorage: string;
  teamNeed: string;
};

const initialAnswers: Answers = {
  name: "",
  identity: "",
  industry: "",
  intro: "",
  workModes: [],
  assets: [],
  storage: [],
  findability: "",
  sources: [],
  recordHabit: "",
  desiredRecords: [],
  goals: [],
  futureAssistant: "",
  tools: [],
  familiarity: "",
  approach: "",
  teamNeed: "",
  useCases: [],
  help: "",
};

const initialQuickLead: QuickLead = {
  name: "",
  contact: "",
  identity: "",
  primaryGoal: "",
  currentStorage: "",
  teamNeed: "",
};

const leadApiOrigin = "https://ai-knowledge-assets-2026.sahaquile.chatgpt.site";

function leadApiUrl(path = "") {
  if (typeof window === "undefined") return `/api/leads${path}`;
  const host = window.location.hostname;
  const useCurrentOrigin =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".chatgpt.site");
  return `${useCurrentOrigin ? "" : leadApiOrigin}/api/leads${path}`;
}

const identities = [
  "企业创始人 / 管理者",
  "企业核心管理人员",
  "咨询顾问 / 教练",
  "培训讲师 / 内容创作者",
  "销售人员 / 客户服务人员",
  "专业人士（律师、医生、财税、设计等）",
  "其他",
];

const workModes = [
  "主要依靠个人经验工作",
  "需要大量输出内容",
  "经常与客户沟通",
  "需要管理团队、复制经验",
  "需要整理大量资料",
  "经常学习新的知识",
];

const assetOptions = [
  "专业经验",
  "客户案例",
  "项目经验",
  "课程内容",
  "文章 / 公众号内容",
  "销售话术",
  "产品资料",
  "企业制度流程",
  "行业研究资料",
];

const storageOptions = [
  "大脑里",
  "微信聊天记录",
  "手机备忘录",
  "电脑文件夹",
  "网盘",
  "Notion",
  "飞书",
  "钉钉",
  "得到",
  "其他笔记工具",
];

const sourceOptions = [
  "开会讨论",
  "客户交流",
  "授课培训",
  "阅读学习",
  "写文章",
  "思考灵感",
  "团队沟通",
  "项目复盘",
];

const desiredRecordOptions = [
  "我的想法和灵感",
  "我的客户沟通",
  "我的课程内容",
  "我的行业判断",
  "我的工作方法",
  "我的会议内容",
  "我的学习内容",
];

const goalOptions = [
  "帮我整理知识",
  "帮我快速搜索过去经验",
  "帮我写文章 / 内容",
  "帮我制作课程",
  "帮我分析客户问题",
  "帮我生成方案",
  "帮我总结会议",
  "帮团队快速学习我的经验",
  "帮企业沉淀知识",
];

const toolOptions = [
  "ChatGPT",
  "Claude",
  "豆包",
  "DeepSeek",
  "得到",
  "Notion",
  "飞书",
  "钉钉",
  "企业微信",
  "基本没有使用",
];

const useCaseOptions = [
  "内容创作",
  "客户咨询",
  "销售支持",
  "员工培训",
  "企业内部问答",
  "产品知识管理",
  "管理决策支持",
];

const quickGoalOptions = [
  "帮我整理知识",
  "帮我写文章 / 内容",
  "帮我制作课程",
  "帮我分析客户问题",
  "帮团队快速学习我的经验",
  "帮企业沉淀知识",
];

const stepNames = ["基本情况", "资料现状", "记录习惯", "希望AI帮什么", "使用方式"];

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="diagnosis-options">
      {options.map((option) => (
        <label className={`diagnosis-option ${value === option ? "selected" : ""}`} key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span className="choice-dot" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({
  options,
  value,
  onChange,
  max,
}: {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
}) {
  const toggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }
    if (max && value.length >= max) return;
    onChange([...value, option]);
  };

  return (
    <div className="diagnosis-options checkbox-options">
      {options.map((option) => {
        const checked = value.includes(option);
        const disabled = Boolean(max && value.length >= max && !checked);
        return (
          <label
            className={`diagnosis-option ${checked ? "selected" : ""} ${disabled ? "disabled" : ""}`}
            key={option}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => toggle(option)}
            />
            <span className="choice-box">{checked ? "✓" : ""}</span>
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function Question({
  number,
  title,
  hint,
  children,
}: {
  number: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="diagnosis-question">
      <div className="question-heading">
        <span>{number}</span>
        <div>
          <h2>{title}</h2>
          {hint && <p>{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function calculateResult(answers: Answers) {
  let enterpriseScore = 0;
  let expertScore = 0;

  if (["企业创始人 / 管理者", "企业核心管理人员"].includes(answers.identity)) {
    enterpriseScore += 2;
  }
  if (answers.workModes.includes("需要管理团队、复制经验")) enterpriseScore += 2;
  if (answers.assets.some((item) => ["销售话术", "产品资料", "企业制度流程"].includes(item))) {
    enterpriseScore += 1;
  }
  if (answers.goals.some((item) => ["帮团队快速学习我的经验", "帮企业沉淀知识"].includes(item))) {
    enterpriseScore += 2;
  }
  if (answers.approach === "我要解决企业团队使用问题") enterpriseScore += 3;
  if (answers.teamNeed === "目前已经有团队需求") enterpriseScore += 3;
  if (answers.teamNeed === "希望未来团队使用") enterpriseScore += 1;
  if (answers.help === "希望企业团队使用AI") enterpriseScore += 4;

  if (
    [
      "咨询顾问 / 教练",
      "培训讲师 / 内容创作者",
      "销售人员 / 客户服务人员",
      "专业人士（律师、医生、财税、设计等）",
    ].includes(answers.identity)
  ) {
    expertScore += 2;
  }
  if (answers.workModes.includes("需要大量输出内容")) expertScore += 2;
  if (answers.workModes.includes("经常与客户沟通")) expertScore += 1;
  if (
    answers.assets.some((item) =>
      ["专业经验", "客户案例", "课程内容", "文章 / 公众号内容"].includes(item),
    )
  ) {
    expertScore += 2;
  }
  if (
    answers.goals.some((item) =>
      ["帮我写文章 / 内容", "帮我制作课程", "帮我分析客户问题", "帮我生成方案"].includes(item),
    )
  ) {
    expertScore += 2;
  }
  if (answers.approach === "我希望建立一个完整的个人AI系统") expertScore += 2;
  if (answers.help === "希望建立自己的AI助手") expertScore += 3;

  let type: "starter" | "expert" | "enterprise" = "starter";
  if (enterpriseScore >= 5) type = "enterprise";
  else if (expertScore >= 5) type = "expert";

  let maturity = "L0 · 刚开始了解AI";
  if (
    answers.teamNeed === "目前已经有团队需求" ||
    answers.approach === "我要解决企业团队使用问题"
  ) {
    maturity = "L3 · 准备让团队使用AI";
  } else if (
    answers.approach === "我希望建立一个完整的个人AI系统" ||
    answers.help === "希望建立自己的AI助手" ||
    answers.familiarity === "经常使用AI解决工作问题"
  ) {
    maturity = "L2 · 准备建立个人AI助手";
  } else if (
    answers.familiarity === "会使用一些AI工具" ||
    answers.tools.some((tool) => !["基本没有使用", "得到", "Notion", "飞书", "钉钉", "企业微信"].includes(tool))
  ) {
    maturity = "L1 · 已经开始使用AI工具";
  }

  const usesWorkPlatform = answers.tools.some((tool) =>
    ["飞书", "钉钉", "企业微信"].includes(tool),
  );
  const usesNotion = answers.tools.includes("Notion") || answers.storage.includes("Notion");
  const usesDedao = answers.tools.includes("得到") || answers.storage.includes("得到");

  let toolPlan = "适合你的采集设备 + 自动同步 + 个人知识库";
  if (type === "enterprise" && usesWorkPlatform) {
    toolPlan = "沿用你们已有的办公平台，再增加企业资料库";
  } else if (type === "enterprise") {
    toolPlan = "企业资料库 + 员工账号和查看范围设置";
  } else if (usesNotion) {
    toolPlan = "保留Notion，再接入适合你的AI工具";
  } else if (usesDedao || answers.approach === "推荐一个简单方案，我直接使用") {
    toolPlan = "适合你的便携采集设备 + 低门槛知识库，从最顺手的方式开始";
  } else if (type === "expert") {
    toolPlan = "多种内容采集 + 个人知识库 + 可分享知识分身";
  }

  const poorFindability = ["比较困难，经常找不到", "基本靠回忆"].includes(answers.findability);
  const weakHabit = ["想记录但经常忘", "基本没有记录"].includes(answers.recordHabit);

  const resultMap = {
    starter: {
      label: "知识整理起步型",
      color: "green",
      headline: "你现在最需要的，是先把重要经验稳定地记录和保存下来",
      description:
        "现阶段不用急着学习复杂AI。先把记录方式、资料位置和分类方法确定下来，AI以后才有可靠的内容可以使用。",
      service: "创始人AI第二大脑启动服务",
      price: "¥3,999 起",
      serviceText: "适合把软硬件选型、购买注册、自动同步、知识库配置和15天轻陪跑一次完成。",
    },
    expert: {
      label: "个人AI助手准备型",
      color: "blue",
      headline: "你的专业经验已经很有价值，下一步是让AI学会使用这些内容",
      description:
        "你的工作中有较多内容输出、客户沟通或专业判断。把这些资料整理好后，AI可以更贴近你的表达方式，帮助写作、研究和分析。",
      service: poorFindability ? "创始人AI第二大脑启动服务" : "个人AI知识分身升级服务",
      price: poorFindability ? "¥3,999 起" : "¥9,999",
      serviceText: poorFindability
        ? "你的资料目前还不容易调用，建议先完成软硬件配置、自动同步和15天启动。"
        : "适合在完整启动服务之上，进一步构建能创作、答疑和对外分享的个人AI知识分身。",
    },
    enterprise: {
      label: "团队知识整理型",
      color: "orange",
      headline: "你需要解决的已经不只是个人记录，而是团队怎样共享经验",
      description:
        "你有明确的团队使用需求。建议先统一公司资料、账号和查看范围，让员工能快速找到制度、产品和优秀案例，再逐步增加具体AI用途。",
      service: "企业知识资产与智能体系统",
      price: "¥30,000 起",
      serviceText: "适合建设企业知识资产、岗位使用范围，并验证首个业务智能体。",
    },
  };

  return {
    ...resultMap[type],
    maturity,
    toolPlan,
    observations: [
      poorFindability ? "过去的资料查找比较困难，整理优先级较高" : "你已有一定资料基础，可以从现有内容开始",
      weakHabit ? "目前记录习惯不稳定，需要更省事的记录方式" : "你已有记录习惯，适合进一步统一和整理",
      answers.teamNeed === "暂时只服务个人"
        ? "当前先服务个人即可，不必一开始做得太复杂"
        : "未来有团队使用机会，建议从一开始保留升级空间",
    ],
  };
}

export default function DiagnosisPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [quickLead, setQuickLead] = useState<QuickLead>(initialQuickLead);
  const [audience, setAudience] = useState<"founder" | "expert">("founder");
  const [leadId, setLeadId] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deepSaveWarning, setDeepSaveWarning] = useState("");
  const [error, setError] = useState("");
  const result = useMemo(() => calculateResult(answers), [answers]);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("audience");
    setAudience(value === "expert" ? "expert" : "founder");
  }, []);

  const setValue = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const setQuickValue = <K extends keyof QuickLead>(key: K, value: QuickLead[K]) => {
    setQuickLead((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const submitQuickDiagnosis = async () => {
    if (
      !quickLead.contact.trim() ||
      !quickLead.identity ||
      !quickLead.primaryGoal ||
      !quickLead.currentStorage ||
      !quickLead.teamNeed ||
      !consent
    ) {
      setError("请完成5项快速诊断，并勾选同意我们根据本次信息与你联系。");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch(leadApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quickLead,
          audience,
          sourceUrl: window.location.href,
          consent: true,
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) throw new Error(payload.error || "提交失败");

      setLeadId(payload.id);
      setAnswers((current) => ({
        ...current,
        name: quickLead.name,
        identity: quickLead.identity,
        storage: [quickLead.currentStorage],
        goals: [quickLead.primaryGoal],
        teamNeed: quickLead.teamNeed,
      }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "暂时无法保存，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  };

  const validate = () => {
    const validByStep = [
      Boolean(answers.identity && answers.workModes.length),
      Boolean(answers.assets.length && answers.storage.length && answers.findability),
      Boolean(answers.sources.length && answers.recordHabit && answers.desiredRecords.length),
      Boolean(answers.goals.length && answers.useCases.length),
      Boolean(answers.familiarity && answers.approach && answers.teamNeed && answers.help),
    ];
    if (!validByStep[step]) {
      setError("请先完成本页带选项的问题，再进入下一步。");
      return false;
    }
    return true;
  };

  const next = async () => {
    if (!validate()) return;

    if (step === stepNames.length - 1 && leadId) {
      setSubmitting(true);
      setDeepSaveWarning("");
      try {
        const response = await fetch(leadApiUrl(`/${leadId}`), {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers,
            result: {
              label: result.label,
              maturity: result.maturity,
              service: result.service,
            },
          }),
        });
        if (!response.ok) setDeepSaveWarning("深度结果暂时未同步，但你的快速诊断和联系方式已经保存。");
      } catch {
        setDeepSaveWarning("深度结果暂时未同步，但你的快速诊断和联系方式已经保存。");
      } finally {
        setSubmitting(false);
      }
    }
    setStep((current) => Math.min(current + 1, stepNames.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((current) => Math.max(current - 1, 0));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setQuickLead(initialQuickLead);
    setLeadId("");
    setConsent(false);
    setDeepSaveWarning("");
    setStep(0);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!leadId) {
    return (
      <main className="diagnosis-page quick-diagnosis-page">
        <nav className="diagnosis-nav diagnosis-shell">
          <a className="brand" href={audience === "expert" ? "/expert-ai-twin" : "/knowledge-assets"}>
            <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
            <span>{audience === "expert" ? "专家AI分身诊断" : "创始人AI第二大脑诊断"}</span>
          </a>
          <a href={audience === "expert" ? "/expert-ai-twin" : "/knowledge-assets"}>返回介绍页</a>
        </nav>

        <header className="diagnosis-header diagnosis-shell quick-header">
          <div>
            <p className="diagnosis-eyebrow">2分钟快速诊断 · 提交后可继续深度评估</p>
            <h1>{audience === "expert" ? "你的专业经验，最适合变成哪一种AI助手？" : "你的经验，最适合从哪里开始自动积累？"}</h1>
            <p>先回答5个关键问题。我们会保存你的基本需求，并据此准备更贴近实际情况的沟通建议。</p>
          </div>
          <div className="quick-assurance">
            <span>01</span><strong>先获得初步方向</strong><p>提交后可立即继续完整诊断</p>
            <span>02</span><strong>不需要懂AI</strong><p>只需要按照真实情况选择</p>
          </div>
        </header>

        <div className="diagnosis-form diagnosis-shell quick-form">
          <Question number="01" title="你目前的身份是？">
            <RadioGroup name="quick-identity" options={identities} value={quickLead.identity} onChange={(value) => setQuickValue("identity", value)} />
          </Question>
          <Question number="02" title="你最希望AI先帮你解决什么？">
            <RadioGroup name="quick-goal" options={quickGoalOptions} value={quickLead.primaryGoal} onChange={(value) => setQuickValue("primaryGoal", value)} />
          </Question>
          <Question number="03" title="你的经验和资料现在主要在哪里？">
            <RadioGroup name="quick-storage" options={storageOptions} value={quickLead.currentStorage} onChange={(value) => setQuickValue("currentStorage", value)} />
          </Question>
          <Question number="04" title="你希望以后让团队或客户一起使用吗？">
            <RadioGroup name="quick-team" options={["暂时只服务个人", "希望未来团队使用", "目前已经有团队需求"]} value={quickLead.teamNeed} onChange={(value) => setQuickValue("teamNeed", value)} />
          </Question>
          <Question number="05" title="怎样联系你？" hint="用于发送建议和确认需求，不会用于无关营销">
            <div className="diagnosis-fields quick-contact-fields">
              <input value={quickLead.name} onChange={(event) => setQuickValue("name", event.target.value)} placeholder="你的称呼（选填）" autoComplete="name" />
              <input value={quickLead.contact} onChange={(event) => setQuickValue("contact", event.target.value)} placeholder="手机号或微信号（必填）" autoComplete="tel" />
            </div>
          </Question>

          <label className={`privacy-consent ${consent ? "selected" : ""}`}>
            <input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setError(""); }} />
            <span>{consent ? "✓" : ""}</span>
            <p>我同意降临科技保存本次填写内容，并根据本次诊断通过我留下的联系方式提供方案沟通。信息仅用于本次服务咨询。</p>
          </label>
          {error && <p className="diagnosis-error">{error}</p>}
          <div className="diagnosis-controls quick-controls">
            <a className="secondary-control" href={audience === "expert" ? "/expert-ai-twin" : "/knowledge-assets"}>返回介绍页</a>
            <button className="primary-control" type="button" onClick={submitQuickDiagnosis} disabled={submitting}>
              {submitting ? "正在保存…" : "提交并继续深度诊断"}<span>→</span>
            </button>
          </div>
        </div>
        <footer className="diagnosis-footer diagnosis-shell">你的快速诊断会安全保存，用于提供本次评估与后续方案沟通。</footer>
      </main>
    );
  }

  if (step === stepNames.length) {
    return (
      <main className="diagnosis-page result-page">
        <nav className="diagnosis-nav diagnosis-shell">
          <a className="brand" href="/">
            <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
            <span>AI第二大脑评估</span>
          </a>
          <a href="/">返回介绍页</a>
        </nav>

        <section className="result-hero diagnosis-shell">
          <p className="diagnosis-eyebrow">你的诊断结果</p>
          <div className={`result-badge result-${result.color}`}>{result.label}</div>
          <h1>
            {answers.name ? `${answers.name}，` : ""}
            {result.headline}
          </h1>
          <p>{result.description}</p>
        </section>

        <section className="result-grid diagnosis-shell">
          <article className="result-card">
            <span>01</span>
            <h2>你目前的情况</h2>
            <strong>{result.maturity}</strong>
            <ul>
              {result.observations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="result-card featured">
            <span>02</span>
            <h2>建议优先考虑</h2>
            <strong>{result.service}</strong>
            <b>{result.price}</b>
            <p>{result.serviceText}</p>
          </article>
          <article className="result-card">
            <span>03</span>
            <h2>适合你的工具方向</h2>
            <strong>{result.toolPlan}</strong>
            <p>具体工具会在详细沟通后确定，不需要你提前购买或学习。</p>
          </article>
        </section>

        <section className="result-next diagnosis-shell">
          <div className="result-next-copy">
            <p className="diagnosis-eyebrow">下一步</p>
            <h2>想知道你的AI第二大脑该如何启动？</h2>
            <p>
              扫描二维码，告诉我们你的诊断类型和实际情况。我们会进一步确认资料数量、使用习惯和希望解决的问题，再给出详细方案。
            </p>
            <div className="result-actions">
              <button type="button" onClick={restart}>重新填写</button>
              <a href="/">返回服务介绍</a>
            </div>
          </div>
          <div className="result-qr">
            <img src="/inquiry-qr.png" alt="详细咨询微信二维码" />
            <strong>微信扫码，详细咨询</strong>
            <span>添加时可备注：知识资产诊断</span>
          </div>
        </section>

        <footer className="diagnosis-footer diagnosis-shell">
          {deepSaveWarning || "诊断结果已与快速诊断一并保存，仅作为方案方向参考。"}
        </footer>
      </main>
    );
  }

  return (
    <main className="diagnosis-page">
      <nav className="diagnosis-nav diagnosis-shell">
        <a className="brand" href="/">
          <img className="brand-mark" src="/brand/jianglin-mark.png" alt="" />
          <span>AI第二大脑评估</span>
        </a>
        <a href="/">返回介绍页</a>
      </nav>

      <header className="diagnosis-header diagnosis-shell">
        <div>
          <p className="diagnosis-eyebrow">快速诊断已保存 · 继续完成深度评估</p>
          <h1>看看你的经验，最适合怎样变成AI第二大脑</h1>
          <p>
            不需要懂AI，也没有标准答案。请按照现在的真实情况填写，完成后立即看到建议。
          </p>
        </div>
        <div className="diagnosis-progress">
          <div className="progress-meta">
            <span>第 {step + 1} / {stepNames.length} 步</span>
            <strong>{stepNames[step]}</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${((step + 1) / stepNames.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="diagnosis-form diagnosis-shell">
        {step === 0 && (
          <>
            <Question number="01" title="你目前的身份是？">
              <RadioGroup
                name="identity"
                options={identities}
                value={answers.identity}
                onChange={(value) => setValue("identity", value)}
              />
            </Question>
            <Question number="02" title="简单介绍一下你自己或公司" hint="选填，用于让结果更贴近你的实际工作">
              <div className="diagnosis-fields">
                <input
                  value={answers.name}
                  onChange={(event) => setValue("name", event.target.value)}
                  placeholder="你的称呼（选填）"
                />
                <input
                  value={answers.industry}
                  onChange={(event) => setValue("industry", event.target.value)}
                  placeholder="所在行业（选填）"
                />
                <textarea
                  value={answers.intro}
                  onChange={(event) => setValue("intro", event.target.value)}
                  placeholder="你主要提供什么产品或服务？（选填）"
                />
              </div>
            </Question>
            <Question number="03" title="你的工作更接近哪些情况？" hint="可多选">
              <CheckboxGroup
                options={workModes}
                value={answers.workModes}
                onChange={(value) => setValue("workModes", value)}
              />
            </Question>
          </>
        )}

        {step === 1 && (
          <>
            <Question number="04" title="你有哪些值得长期保存的内容？" hint="可多选">
              <CheckboxGroup
                options={assetOptions}
                value={answers.assets}
                onChange={(value) => setValue("assets", value)}
              />
            </Question>
            <Question number="05" title="这些内容现在主要放在哪里？" hint="可多选">
              <CheckboxGroup
                options={storageOptions}
                value={answers.storage}
                onChange={(value) => setValue("storage", value)}
              />
            </Question>
            <Question number="06" title="如果现在要找三年前的一段经验，容易吗？">
              <RadioGroup
                name="findability"
                options={["很容易，我有完整整理", "可以找到，但需要花时间", "比较困难，经常找不到", "基本靠回忆"]}
                value={answers.findability}
                onChange={(value) => setValue("findability", value)}
              />
            </Question>
          </>
        )}

        {step === 2 && (
          <>
            <Question number="07" title="你每天主要在哪些事情中产生新经验？" hint="可多选">
              <CheckboxGroup
                options={sourceOptions}
                value={answers.sources}
                onChange={(value) => setValue("sources", value)}
              />
            </Question>
            <Question number="08" title="你目前有固定记录习惯吗？">
              <RadioGroup
                name="recordHabit"
                options={["每天记录", "偶尔记录", "想记录但经常忘", "基本没有记录"]}
                value={answers.recordHabit}
                onChange={(value) => setValue("recordHabit", value)}
              />
            </Question>
            <Question number="09" title="如果记录可以变得很省事，你最想留下什么？" hint="可多选">
              <CheckboxGroup
                options={desiredRecordOptions}
                value={answers.desiredRecords}
                onChange={(value) => setValue("desiredRecords", value)}
              />
            </Question>
          </>
        )}

        {step === 3 && (
          <>
            <Question number="10" title="你最希望AI帮你做哪些事情？" hint="最多选择5项">
              <CheckboxGroup
                options={goalOptions}
                value={answers.goals}
                onChange={(value) => setValue("goals", value)}
                max={5}
              />
            </Question>
            <Question number="11" title="如果有一个真正了解你的AI助手，你希望它怎样帮你？" hint="选填">
              <div className="diagnosis-fields">
                <textarea
                  value={answers.futureAssistant}
                  onChange={(event) => setValue("futureAssistant", event.target.value)}
                  placeholder="例如：帮我根据过去的客户案例分析新问题，或者按照我的风格写文章……"
                />
              </div>
            </Question>
            <Question number="12" title="以后你最想把AI用在哪些地方？" hint="可多选">
              <CheckboxGroup
                options={useCaseOptions}
                value={answers.useCases}
                onChange={(value) => setValue("useCases", value)}
              />
            </Question>
          </>
        )}

        {step === 4 && (
          <>
            <Question number="13" title="你目前使用过哪些工具？" hint="可多选">
              <CheckboxGroup
                options={toolOptions}
                value={answers.tools}
                onChange={(value) => setValue("tools", value)}
              />
            </Question>
            <Question number="14" title="你现在对AI的熟悉程度是？">
              <RadioGroup
                name="familiarity"
                options={["经常使用AI解决工作问题", "会使用一些AI工具", "知道AI，但不知道怎么用", "基本没有接触"]}
                value={answers.familiarity}
                onChange={(value) => setValue("familiarity", value)}
              />
            </Question>
            <Question number="15" title="你更希望采用哪种方式？">
              <RadioGroup
                name="approach"
                options={[
                  "推荐一个简单方案，我直接使用",
                  "我有自己的工具，希望帮我连接",
                  "我希望建立一个完整的个人AI系统",
                  "我要解决企业团队使用问题",
                ]}
                value={answers.approach}
                onChange={(value) => setValue("approach", value)}
              />
            </Question>
            <Question number="16" title="你希望以后让团队一起使用吗？">
              <RadioGroup
                name="teamNeed"
                options={["暂时只服务个人", "希望未来团队使用", "目前已经有团队需求"]}
                value={answers.teamNeed}
                onChange={(value) => setValue("teamNeed", value)}
              />
            </Question>
            <Question number="17" title="你现在最希望我们提供哪类帮助？">
              <RadioGroup
                name="help"
                options={[
                  "我只想了解AI知识管理方法",
                  "希望有人帮我把个人经验和资料整理好",
                  "希望建立自己的AI助手",
                  "希望企业团队使用AI",
                ]}
                value={answers.help}
                onChange={(value) => setValue("help", value)}
              />
            </Question>
          </>
        )}

        {error && <p className="diagnosis-error">{error}</p>}
        <div className="diagnosis-controls">
          {step > 0 ? (
            <button className="secondary-control" type="button" onClick={back}>
              上一步
            </button>
          ) : (
            <a className="secondary-control" href="/">返回介绍页</a>
          )}
          <button className="primary-control" type="button" onClick={next} disabled={submitting}>
            {submitting ? "正在同步…" : step === stepNames.length - 1 ? "保存并查看诊断结果" : "下一步"}
            <span>→</span>
          </button>
        </div>
      </div>

      <footer className="diagnosis-footer diagnosis-shell">
        深度诊断将与已经提交的快速诊断关联保存，用于生成更准确的方案建议。
      </footer>
    </main>
  );
}
