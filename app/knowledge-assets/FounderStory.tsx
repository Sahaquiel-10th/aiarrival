"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import FounderStoryMobile from "./FounderStoryMobile";

const outcomes = [
  ["一个懂你的AI助手", "理解你的经验、方法和判断方式，帮助回答问题、辅助思考和生成内容。", "懂"],
  ["一个自动积累系统", "不改变工作习惯，会议、沟通和决策持续沉淀，AI越来越理解你。", "积"],
  ["一套企业AI基础", "从个人经验开始，未来继续扩展为工作助手、团队知识助手和企业AI员工。", "企"],
];

const inputs = [
  ["经营会议", "讨论与判断", "会"],
  ["客户沟通", "需求与经验", "客"],
  ["经营方法", "取舍与方法", "法"],
  ["项目复盘", "教训与总结", "复"],
];

const outputs = [
  ["回答问题", "调用真实经营经验", "答"],
  ["带新员工", "讲清标准与方法", "带"],
  ["客户挖掘", "辅助判断与跟进", "客"],
  ["辅助决策", "提供经验参考", "决"],
];

const wasteQuestions = ["哪些客户值得合作？", "哪些项目应该放弃？", "如何培养团队？", "如何解决复杂问题？"];

const serviceProcess = [
  ["设计采集方式", "先了解你的工作习惯，再设计最省事的记录方式。会议、沟通、文字和临时想法都可以被接住。"],
  ["完成系统配置", "设备、软件、账号、知识库和AI助手全部协助选购、注册、连接和配置，你不用研究工具。"],
  ["持续积累优化", "15天轻陪跑帮助你真正用起来。此后工作照常，新的经验会继续丰富AI对你的理解。"],
];

const recapPairs = [
  ["会议记录", "决策摘要"],
  ["日常盘点", "经营复盘"],
  ["客户经验", "客户跟进"],
  ["运营资料", "运营分析"],
  ["日常讲话", "观点内容"],
  ["头脑风暴", "方案草案"],
  ["团队经验", "团队方案"],
  ["日常沟通", "待办清单"],
  ["项目复盘", "改进建议"],
  ["行业判断", "决策参考"],
  ["销售交流", "客户洞察"],
  ["课程案例", "教学内容"],
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function smoothstep(from: number, to: number, value: number) {
  const progress = clamp((value - from) / Math.max(.0001, to - from));
  return progress * progress * (3 - 2 * progress);
}

function sceneWindow(progress: number, enterFrom: number, enterTo: number, exitFrom: number, exitTo: number) {
  return smoothstep(enterFrom, enterTo, progress) * (1 - smoothstep(exitFrom, exitTo, progress));
}

function FounderStoryDesktop() {
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const actValueRef = useRef(0);
  const outcomeValueRef = useRef(0);
  const [act, setAct] = useState(0);
  const [outcome, setOutcome] = useState(0);

  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage) return;

    const update = () => {
      frameRef.current = null;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const mobile = window.innerWidth <= 720;
      const resultsMove = smoothstep(.10, .15, progress);
      const heroMove = smoothstep(.30, .36, progress);
      const wasteShift = smoothstep(.66, .70, progress);
      const serviceMove = smoothstep(.94, .96, progress);
      const heroX = mobile ? 86 : 88;
      const heroY = mobile ? 22 : 15;
      const heroScale = mobile ? 1.2 : 2.18;
      const centerX = mobile ? 50 : 50;
      const wasteX = mobile ? 50 : 54;
      const serviceX = mobile ? 50 : 22;
      const centerScale = mobile ? .82 : .9;
      const wasteScale = mobile ? .78 : .92;
      const serviceScale = mobile ? .58 : .62;
      const resultsX = mobile ? 50 : 70;
      const resultsY = mobile ? 27 : 36;
      const resultsScale = mobile ? .98 : 1.35;
      let brainX = interpolate(heroX, resultsX, resultsMove);
      let brainY = interpolate(heroY, resultsY, resultsMove);
      let brainScale = interpolate(heroScale, resultsScale, resultsMove);
      brainX = interpolate(brainX, centerX, heroMove);
      brainY = interpolate(brainY, mobile ? 46 : 50, heroMove);
      brainScale = interpolate(brainScale, centerScale, heroMove);
      brainX = interpolate(brainX, wasteX, wasteShift);
      brainY = interpolate(brainY, mobile ? 48 : 50, wasteShift);
      brainScale = interpolate(brainScale, wasteScale, wasteShift);
      brainX = interpolate(brainX, serviceX, serviceMove);
      brainY = interpolate(brainY, 50, serviceMove);
      brainScale = interpolate(brainScale, serviceScale, serviceMove);
      const heroOpacity = 1 - smoothstep(.10, .135, progress);
      const resultsOpacity = sceneWindow(progress, .13, .155, .30, .33);
      const principleOpacity = sceneWindow(progress, .33, .36, .43, .46);
      const flowOpacity = sceneWindow(progress, .46, .49, .62, .66);
      const wasteOpacity = sceneWindow(progress, .66, .69, .93, .95);
      const serviceOpacity = smoothstep(.95, .97, progress);
      const flowReveal = smoothstep(.48, .52, progress);
      const flowExit = smoothstep(.62, .66, progress);
      const questionReveal = smoothstep(.77, .84, progress);
      const wasteExit = smoothstep(.93, .95, progress);
      const wasteResultReveal = smoothstep(.83, .845, progress) * (1 - wasteExit);
      const nameOpacity = clamp(heroOpacity + resultsOpacity + wasteOpacity * (1 - smoothstep(.93, .945, progress)) + serviceOpacity);
      const processOpacity = clamp(principleOpacity + flowOpacity);
      const resolvedAct = progress < .13 ? 0 : progress < .33 ? 1 : progress < .46 ? 2 : progress < .66 ? 3 : progress < .95 ? 4 : 5;

      stage.style.setProperty("--story-progress", String(progress));
      stage.style.setProperty("--brain-shift-x", `${brainX - 50}vw`);
      stage.style.setProperty("--brain-shift-y", `${brainY - 50}vh`);
      stage.style.setProperty("--brain-scale", String(brainScale));
      stage.style.setProperty("--brain-rotation", `${progress * 760}deg`);
      stage.style.setProperty("--hero-opacity", String(heroOpacity));
      stage.style.setProperty("--hero-exit-y", `${-120 * smoothstep(.10, .14, progress)}px`);
      stage.style.setProperty("--results-opacity", String(resultsOpacity));
      stage.style.setProperty("--results-exit", `${-80 * smoothstep(.30, .33, progress)}px`);
      stage.style.setProperty("--principle-opacity", String(principleOpacity));
      stage.style.setProperty("--flow-opacity", String(flowOpacity));
      stage.style.setProperty("--flow-exit", String(flowExit));
      stage.style.setProperty("--flow-exit-left", `${-70 * flowExit}px`);
      stage.style.setProperty("--flow-exit-right", `${70 * flowExit}px`);
      stage.style.setProperty("--waste-opacity", String(wasteOpacity));
      stage.style.setProperty("--waste-exit", String(wasteExit));
      stage.style.setProperty("--waste-copy-exit", `${-80 * wasteExit}px`);
      stage.style.setProperty("--waste-question-exit", `${80 * wasteExit}px`);
      stage.style.setProperty("--service-opacity", String(serviceOpacity));
      stage.style.setProperty("--service-heading-shift", `${70 * (1 - serviceOpacity)}px`);
      stage.style.setProperty("--brain-name-opacity", String(nameOpacity));
      stage.style.setProperty("--brain-process-opacity", String(processOpacity));
      stage.style.setProperty("--flow-reveal", String(flowReveal));
      stage.style.setProperty("--question-reveal", String(questionReveal));
      stage.style.setProperty("--waste-result-opacity", String(wasteResultReveal));
      stage.style.setProperty("--flow-stream-opacity", String(flowReveal * (1 - flowExit)));
      for (let index = 0; index < 4; index += 1) {
        const outcomeProgress = smoothstep(.15 + index * .025, .185 + index * .025, progress);
        const cardProgress = smoothstep(.48 + index * .012, .52 + index * .012, progress);
        const capsuleReveal = smoothstep(.67 + index * .01, .69 + index * .01, progress);
        const capsuleProgress = smoothstep(.75 + index * .01, .79 + index * .01, progress);
        const itemQuestionProgress = smoothstep(.77 + index * .01, .805 + index * .01, progress);
        stage.style.setProperty(`--outcome-${index}`, String(outcomeProgress));
        stage.style.setProperty(`--flow-card-${index}`, String(cardProgress));
        stage.style.setProperty(`--flow-left-${index}`, `${-36 * (1 - cardProgress) - 70 * flowExit}px`);
        stage.style.setProperty(`--flow-right-${index}`, `${36 * (1 - cardProgress) + 70 * flowExit}px`);
        stage.style.setProperty(`--question-${index}`, String(itemQuestionProgress));
        stage.style.setProperty(`--question-x-${index}`, `${35 * (1 - itemQuestionProgress)}px`);
        stage.style.setProperty(`--question-blur-${index}`, `${5 * (1 - itemQuestionProgress)}px`);
        const start = mobile
          ? [[-152, -128], [-170, -70], [-162, -12], [-138, 46]][index]
          : [[-260, -190], [-300, -105], [-280, -20], [-240, 65]][index];
        const end = mobile
          ? [[115, 95], [135, 122], [126, 151], [98, 178]][index]
          : [[380, -126], [400, -42], [390, 44], [350, 130]][index];
        const passage = clamp(capsuleProgress / .56);
        const release = clamp((capsuleProgress - .56) / .44);
        const midY = mobile ? 52 + index * 9 : 25 + index * 11;
        const fragmentX = capsuleProgress <= .56
          ? interpolate(start[0], 0, passage)
          : interpolate(0, end[0], release);
        const fragmentY = capsuleProgress <= .56
          ? interpolate(start[1], midY, passage)
          : interpolate(midY, end[1], release);
        stage.style.setProperty(`--fragment-x-${index + 1}`, `${fragmentX}px`);
        stage.style.setProperty(`--fragment-y-${index + 1}`, `${fragmentY}px`);
        stage.style.setProperty(`--fragment-opacity-${index + 1}`, String(capsuleReveal * (1 - smoothstep(.72, 1, capsuleProgress))));
        stage.style.setProperty(`--fragment-scale-${index + 1}`, String(interpolate(.9 + capsuleReveal * .1, .72, capsuleProgress)));
        stage.style.setProperty(`--fragment-blur-${index + 1}`, "0px");
      }
      stage.style.setProperty("--waste-stream-opacity", String(smoothstep(.75, .77, progress) * (1 - smoothstep(.85, .89, progress))));
      stage.dataset.act = String(resolvedAct);
      if (actValueRef.current !== resolvedAct) {
        actValueRef.current = resolvedAct;
        setAct(resolvedAct);
      }

      const resultsProgress = clamp((progress - .15) / .105);
      const nextOutcome = Math.min(2, Math.floor(resultsProgress * 3));
      if (outcomeValueRef.current !== nextOutcome) {
        outcomeValueRef.current = nextOutcome;
        setOutcome(nextOutcome);
      }
    };

    const schedule = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className="founder-story" id="top" ref={storyRef} aria-label="AI第二大脑六幕介绍">
      <span className="story-anchor story-anchor-why" id="why" />
      <span className="story-anchor story-anchor-results" id="results" />
      <span className="story-anchor story-anchor-service" id="service" />
      <div className="founder-story-stage" data-act={act} ref={stageRef}>
        <div className="story-ambient" aria-hidden="true"><i /><i /><i /></div>

        <div className="story-brain" aria-label="AI第二大脑">
          <div className="story-orbit orbit-a"><i /><i /><i /></div>
          <div className="story-orbit orbit-b"><i /><i /></div>
          <div className="story-brain-sphere"><div className="brain-surface" /></div>
          <div className="story-brain-name"><span>AI</span><strong>第二大脑</strong></div>
          <div className="story-brain-process"><strong>提取重点</strong><i /><strong>整理经验</strong><i /><strong>持续沉淀</strong></div>
        </div>

        <article className="story-scene story-scene-hero" aria-hidden={act !== 0}>
          <div className="story-hero-copy">
            <h1>全程代办，到手即用<em>让AI自动记住你的每一句话</em></h1>
            <a href="/diagnosis?audience=founder">点此立即加入AI第二大脑启动计划 <span>→</span></a>
            <div className="story-proof"><span><b>不用整理资料</b><small>全程代办</small></span><span><b>15天启动</b><small>快速上线</small></span><span><b>持续自动积累</b><small>越用越懂你</small></span></div>
          </div>
          <span className="story-hero-cue">下滑查看更多内容 <i>↓</i></span>
        </article>

        <article className="story-scene story-scene-results" aria-hidden={act !== 1}>
          <div className="story-outcomes" data-outcome={outcome}>
            <h2>15天后，你将拥有</h2>
            {outcomes.map(([title, text, icon], index) => <div style={{ "--outcome-progress": `var(--outcome-${index})` } as CSSProperties} className={`story-outcome outcome-${index + 1}`} key={title}><b>{icon}</b><span><strong>{title}</strong><small>{text}</small></span></div>)}
            <div className="story-outcome-dots"><i /><i /><i /></div>
          </div>
        </article>

        <article className="story-scene story-scene-principle" aria-hidden={act !== 2}>
          <h2>AI第二大脑</h2>
          <p>结果卡片被第二大脑接住，从此持续学习你的经验。</p>
          <span className="story-scroll-cue">继续向下</span>
        </article>

        <article className="story-scene story-scene-flow" aria-hidden={act !== 3}>
          <h2>老板继续经营，AI负责积累</h2>
          <div className="story-flow-column story-inputs"><small>老板日常的经验与知识</small>{inputs.map(([title, text, icon], index) => <div style={{ "--card-progress": `var(--flow-card-${index})`, "--card-offset": `var(--flow-left-${index})` } as CSSProperties} key={title}><b>{icon}</b><span><strong>{title}</strong><em>{text}</em></span></div>)}</div>
          <div className="story-flow-column story-outputs"><small>经验可以用在这里</small>{outputs.map(([title, text, icon], index) => <div style={{ "--card-progress": `var(--flow-card-${index})`, "--card-offset": `var(--flow-right-${index})` } as CSSProperties} key={title}><b>{icon}</b><span><strong>{title}</strong><em>{text}</em></span></div>)}</div>
          <div className="story-data-stream stream-input" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="story-data-stream stream-output" aria-hidden="true"><i /><i /><i /><i /></div>
          <span className="story-auto-caption">自动积累</span>
        </article>

        <article className="story-scene story-scene-waste" aria-hidden={act !== 4}>
          <div className="story-waste-copy"><small>正在消失的企业资产</small><h2>AI时代，老板最大的资产正在被浪费</h2><p>每个创业者都有多年积累的判断、经验和方法。它们很有价值，却常常只存在于脑子里、聊天记录里、会议里和文件里，无法被团队持续调用。</p></div>
          <div className="story-fragments">{["脑子里", "聊天记录里", "会议里", "文件里"].map((item, index) => <span className={`fragment-${index + 1}`} key={item}>{item}</span>)}</div>
          <div className="story-waste-stream" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="story-waste-questions">{wasteQuestions.map((item, index) => <span style={{ "--question-progress": `var(--question-${index})`, "--question-offset": `var(--question-x-${index})`, "--question-blur": `var(--question-blur-${index})` } as CSSProperties} key={item}><i>0{index + 1}</i>{item}</span>)}</div>
          <p className="story-waste-result"><span>我们帮助你</span>把个人经验，变成企业可以持续使用的AI资产。</p>
        </article>

        <article className="story-scene story-scene-service" aria-hidden={act !== 5}>
          <div className="story-service-heading"><small>15天全程代办，到手即用</small><h2>我们帮你完成第一次AI经验资产化</h2><p>你只需要告诉我们习惯，并开放必要权限；选择、购买、注册、配置和连接由我们协助完成。</p></div>
          <div className="story-service-steps">{serviceProcess.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>)}</div>
          <div className="story-service-note"><b>15天轻陪跑</b><span>不要求你停下来整理过去，从今天正在发生的工作开始。</span><small>结束时交付已配置的采集方式、自动同步链路、可使用的AI助手、知识分身上架权限和结项报告。</small></div>
          <div className="story-recap-inputs story-service-recap" aria-label="持续进入AI第二大脑的经验">
            {recapPairs.map(([input], index) => <span style={{ "--recap-index": index } as CSSProperties} key={input}>{input}</span>)}
          </div>
          <div className="story-recap-outputs story-service-recap" aria-label="AI第二大脑持续产生的结果">
            {recapPairs.map(([, output], index) => <span style={{ "--recap-index": index } as CSSProperties} key={output}>{output}</span>)}
          </div>
          <div className="story-recap-labels story-service-recap"><span>自动吸收经验</span><span>随时调用产出</span></div>
        </article>

        <nav className="story-act-nav" aria-label="章节进度">{["看见承诺", "看见结果", "理解原理", "理解用途", "产生必要性", "相信能交付"].map((label, index) => <span className={act === index ? "active" : ""} key={label}><i>{index + 1}</i><b>{label}</b></span>)}</nav>
      </div>
    </section>
  );
}

const mobileQuery = "(max-width: 720px)";

function subscribeToMobile(callback: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

export default function FounderStory() {
  const mobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, () => false);
  return mobile ? <FounderStoryMobile /> : <FounderStoryDesktop />;
}
