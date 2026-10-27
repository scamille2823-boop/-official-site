import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};
const inView = { once: true, margin: "-12%" };

const svgBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function PlusIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg {...svgBase} className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function BrandMark({ className = "h-9 w-9" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="brand-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <path
        d="M30.5 8.5A15.5 15.5 0 1 0 30.5 31.5"
        fill="none"
        stroke="url(#brand-ring)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M31.5 6l1.2 3.6L36.5 11l-3.8 1.4L31.5 16l-1.2-3.6L26.5 11l3.8-1.4z"
        fill="#2dd4bf"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#colors", label: "产品配色" },
  { href: "#value", label: "健康价值" },
  { href: "#app", label: "App 体验" },
  { href: "#faq", label: "常见问题" },
];

function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/5 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto grid h-16 w-full max-w-[1280px] grid-cols-[auto_1fr] items-center gap-4 px-5 md:px-8 lg:h-20 lg:grid-cols-[auto_1fr_auto] lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-xl"
          onClick={() => setOpen(false)}
        >
          <BrandMark className="h-8 w-8 lg:h-9 lg:w-9" />
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-slate-900 lg:text-lg">
            灵跃健康
          </span>
        </a>

        <nav className="hidden items-center justify-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
              <span className="mt-1.5 block h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden justify-end lg:flex">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(14,165,233,0.28)] transition-transform hover:scale-[1.03]"
          >
            产品咨询
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          className="justify-self-end rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 transition hover:border-slate-300 lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-slate-900/5 bg-white/85 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1 px-5 pb-5 pt-2 md:px-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] text-slate-700 transition hover:bg-slate-50"
                >
                  {link.label}
                  <ChevronRightIcon className="h-4 w-4 text-slate-400" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-5 py-3 text-sm font-semibold text-white"
              >
                产品咨询
                <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const HERO_SLIDES = [
  {
    src: "/images/hero-home.jpg",
    mobileSrc: "/images/hero-home-portrait.jpg",
    alt: "居家场景中的女性，代表日常主动健康管理",
    position: "object-center lg:object-[68%_center]",
  },
  {
    src: "/images/ring-duo.jpg",
    alt: "灵跃健康智能戒指双色实拍",
    position: "object-center",
  },
  {
    src: "/images/color-gold.jpg",
    alt: "灵跃健康智能戒指晨曦金配色实拍",
    position: "object-center",
  },
];

function Hero() {
  const heroRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  const slide = HERO_SLIDES[index];
  const go = (step) =>
    setIndex(
      (current) =>
        (current + step + HERO_SLIDES.length) % HERO_SLIDES.length,
    );

  return (
    <section
      id="top"
      ref={heroRef}
      className="bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid h-[calc(100svh-64px)] min-h-[560px] overflow-hidden lg:h-[calc(100svh-80px)]">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, x: 64 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 1.05, ease: EASE }}
            className="[grid-area:1/1] grid overflow-hidden bg-slate-100"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="[grid-area:1/1] h-full w-full"
            >
              <picture className="block h-full w-full">
                <source
                  media="(min-width: 1024px)"
                  srcSet={slide.src}
                />
                <img
                  src={slide.mobileSrc || slide.src}
                  alt={slide.alt}
                  loading="eager"
                  decoding="async"
                  className={`h-full w-full object-cover ${slide.position}`}
                />
              </picture>
            </motion.div>
            <div className="[grid-area:1/1] bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_38%,rgba(255,255,255,0.32)_64%,rgba(255,255,255,0)_90%)]" />
            <div className="[grid-area:1/1] bg-[linear-gradient(0deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.55)_12%,rgba(255,255,255,0)_30%)]" />
          </motion.div>
        </AnimatePresence>

        <div className="[grid-area:1/1] z-10 mx-auto grid w-full max-w-[1280px] grid-rows-[1fr_auto] px-5 pb-6 pt-14 md:px-8 lg:px-10 lg:pb-8 lg:pt-20">
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="text-[2rem] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900 sm:text-[3.2rem] lg:text-[clamp(3.3rem,5.1vw,4.9rem)]"
            >
              <span className="block">关注心血管风险，</span>
              <span className="block">主动管理每一天</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center gap-3 lg:mt-11"
            >
              <a
                href="#colors"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(14,165,233,0.32)] transition-transform hover:scale-[1.02]"
              >
                探索产品
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#value"
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/90 px-7 py-4 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:scale-[1.02]"
              >
                了解健康管理
              </a>
            </motion.div>
          </div>

          <div className="flex items-end justify-between gap-6 pt-10">
            <div className="flex items-center gap-2.5">
              {HERO_SLIDES.map((item, slideIndex) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`切换到第 ${slideIndex + 1} 张`}
                  aria-current={slideIndex === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    slideIndex === index
                      ? "w-10 bg-slate-900"
                      : "w-5 bg-slate-900/20 hover:bg-slate-900/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums tracking-[0.2em] text-slate-500">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(HERO_SLIDES.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="上一张"
                className="rounded-full border border-slate-900/10 bg-white/70 p-2.5 text-slate-800 backdrop-blur transition hover:scale-105 hover:bg-white"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="下一张"
                className="rounded-full border border-slate-900/10 bg-white/70 p-2.5 text-slate-800 backdrop-blur transition hover:scale-105 hover:bg-white"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const COLORWAYS = [
  {
    name: "曜石黑",
    image: "/images/color-obsidian.jpg",
    hex: "#1b1e24",
    alt: "曜石黑配色的灵跃健康智能戒指",
  },
  {
    name: "晨曦金",
    image: "/images/color-gold.jpg",
    hex: "#c9a47a",
    alt: "晨曦金配色的灵跃健康智能戒指",
  },
  {
    name: "钛银灰",
    image: "/images/color-silver.jpg",
    hex: "#b7bcc4",
    alt: "钛银灰配色的灵跃健康智能戒指",
  },
];

function ColorSwitcher() {
  const [active, setActive] = useState(0);
  const color = COLORWAYS[active];

  return (
    <section id="colors" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#07111c] p-4 md:p-6"
        >
          <div className="flex items-center justify-between px-2 pb-3 text-[11px] tracking-[0.28em] text-white/45">
            <span>COLOR</span>
            <span className="tracking-[0.12em] text-white/70">{color.name}</span>
          </div>

          <div className="grid aspect-[4/3] overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.14),transparent_62%)]">
            <AnimatePresence initial={false}>
              <motion.img
                key={color.image}
                src={color.image}
                alt={color.alt}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.65, ease: EASE }}
                className="[grid-area:1/1] h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="[grid-area:1/1] bg-gradient-to-t from-[#07111c]/50 via-transparent to-transparent" />
          </div>

          <div className="flex items-center justify-between gap-4 px-2 pt-4 text-xs text-white/55">
            <span>曜石黑 / 晨曦金 / 钛银灰</span>
            <span className="tabular-nums">
              {String(active + 1).padStart(2, "0")} / 03
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="lg:pl-8"
        >
          <p className="text-xs font-semibold tracking-[0.32em] text-teal-600">
            产品配色
          </p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-900 lg:text-[3.4rem]">
            三色随心选
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-slate-500">
            点击色块，查看曜石黑、晨曦金与钛银灰在同一种光线下的质感。
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {COLORWAYS.map((item, colorIndex) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(colorIndex)}
                aria-pressed={colorIndex === active}
                className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 transition-colors ${
                  colorIndex === active
                    ? "border-teal-400 bg-teal-50/60"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`h-12 w-12 rounded-full ring-2 ring-offset-4 transition ${
                    colorIndex === active
                      ? "ring-teal-400/70"
                      : "ring-transparent group-hover:ring-slate-200"
                  }`}
                  style={{ backgroundColor: item.hex }}
                />
                <span className="text-sm font-medium text-slate-700">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const VALUE_CARDS = [
  {
    index: "01",
    tag: "风险筛查",
    title: "常规体检之外的连续记录",
    body: "体检是离散时间点的静态切片，而日常高压、熬夜与睡眠中的生理变化，更需要被连续记录。",
  },
  {
    index: "02",
    tag: "夜间时段",
    title: "睡着之后，身体仍在说话",
    body: "夜间心率、血氧与心率变异性的变化趋势，会被连续记录，并整理成可随时回看的曲线。",
  },
  {
    index: "03",
    tag: "压力恢复",
    title: "把压力变成可读的信号",
    body: "通过 HRV 与皮电等日常信号，观察身体负荷与恢复节奏，在需要的时候提醒自己休息。",
  },
  {
    index: "04",
    tag: "行动建议",
    title: "从数据到下一步行动",
    body: "基于个人健康基线给出分级提示；出现值得留意的变化时，及时调整生活方式并咨询专业医生。",
  },
];

function ValueSticky() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.24]);

  return (
    <section id="value" ref={sectionRef} className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.32em] text-teal-600">
            健康价值
          </p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.14] tracking-[-0.03em] text-slate-900 lg:text-[3.4rem]">
            把心血管风险管理
            <br className="hidden md:block" />
            放进每一天
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-500">
            从日常生理信号，到可以理解的风险提示，健康管理发生在当下，而不是下一次体检。
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-32 lg:max-w-none">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white p-3 shadow-[0_20px_40px_rgb(0,0,0,0.05)]">
              <div className="grid aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100">
                <motion.img
                  src="/images/ring-duo.jpg"
                  alt="灵跃健康智能戒指产品实拍"
                  loading="lazy"
                  style={{ y: imageY, scale: imageScale }}
                  className="[grid-area:1/1] h-full w-full object-cover"
                />
                <div className="[grid-area:1/1] bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-5">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    灵跃健康智能戒指
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    PPG · ECG · EDA 多模态记录
                  </p>
                </div>
                <span className="rounded-full bg-slate-900 px-3.5 py-1.5 text-[11px] font-medium text-white">
                  产品实拍
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {VALUE_CARDS.map((card) => (
              <motion.article
                key={card.index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="rounded-[2rem] border border-slate-200/70 bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-teal-500">
                    {card.index}
                  </span>
                  <span className="h-px w-8 bg-teal-400/60" />
                  <span className="text-xs font-medium tracking-[0.2em] text-slate-400">
                    {card.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-slate-900 md:text-[1.7rem]">
                  {card.title}
                </h3>
                <p className="mt-4 text-[15px] leading-8 text-slate-500">
                  {card.body}
                </p>
              </motion.article>
            ))}
            <p className="px-1 pt-4 text-xs leading-6 text-slate-400">
              本产品用于生理信号监测与健康管理参考，不替代专业医生诊断。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const VERSIONS = [
  {
    key: "vital",
    name: "Vital 版",
    tag: "日常健康记录",
    body: "适合以日常趋势与生活方式管理为主的用户。",
    image: "/images/ring-silver.jpg",
    features: ["心率与血氧趋势记录", "睡眠分期与 HRV", "活动与运动数据"],
    theme: "light",
  },
  {
    key: "pro",
    name: "Pro 版",
    tag: "全维风险筛查",
    body: "适合希望进一步查看心电与代谢趋势的用户。",
    image: "/images/ring-duo.jpg",
    features: [
      "包含 Vital 版全部能力",
      "ECG 心电与血压趋势",
      "血糖、血脂、尿酸趋势",
      "心血管风险雷达",
    ],
    theme: "dark",
  },
];

function VersionCard({ version }) {
  const dark = version.theme === "dark";

  return (
    <article className="w-1/2 shrink-0 px-2 md:px-4">
      <div
        className={`grid h-full overflow-hidden rounded-[2.5rem] border lg:grid-cols-2 ${
          dark
            ? "border-slate-700 bg-slate-900 text-white"
            : "border-slate-200 bg-slate-50 text-slate-900"
        }`}
      >
        <div className="grid aspect-[4/3] overflow-hidden lg:aspect-auto">
          <img
            src={version.image}
            alt={`${version.name} 产品图`}
            loading="lazy"
            className="[grid-area:1/1] h-full w-full object-cover"
          />
          <div
            className={`[grid-area:1/1] bg-gradient-to-t to-transparent ${
              dark ? "from-slate-900/60" : "from-slate-50/60"
            }`}
          />
        </div>

        <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
          <span
            className={`text-xs font-semibold tracking-[0.26em] ${
              dark ? "text-teal-300" : "text-teal-600"
            }`}
          >
            {version.tag}
          </span>
          <h3 className="text-4xl font-semibold tracking-[-0.03em]">
            {version.name}
          </h3>
          <p
            className={`text-[15px] leading-8 ${
              dark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {version.body}
          </p>
          <ul className="grid gap-3">
            {version.features.map((feature) => (
              <li
                key={feature}
                className={`flex items-start gap-3 text-sm ${
                  dark ? "text-slate-200" : "text-slate-600"
                }`}
              >
                <CheckIcon
                  className={`mt-0.5 h-4 w-4 flex-none ${
                    dark ? "text-teal-300" : "text-teal-500"
                  }`}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className={`group mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
              dark
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white"
            }`}
          >
            产品咨询
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function VersionCompare() {
  const [index, setIndex] = useState(0);

  return (
    <section id="versions" className="bg-white py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeUp}
            viewport={inView}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold tracking-[0.32em] text-teal-600">
              版本选择
            </p>
            <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.14] tracking-[-0.03em] text-slate-900 lg:text-[3.4rem]">
              Vital 版 与 Pro 版
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-500">
              横向滑动或点击标签，对比两个版本在日常生活里的不同侧重。
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-full border border-slate-200 bg-white p-1">
              {VERSIONS.map((version, versionIndex) => (
                <button
                  key={version.key}
                  type="button"
                  onClick={() => setIndex(versionIndex)}
                  aria-pressed={versionIndex === index}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    versionIndex === index
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {version.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIndex(0)}
                aria-label="上一版本"
                className="rounded-full border border-slate-200 p-2.5 text-slate-700 transition hover:scale-105 hover:border-slate-300"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => setIndex(1)}
                aria-label="下一版本"
                className="rounded-full border border-slate-200 p-2.5 text-slate-700 transition hover:scale-105 hover:border-slate-300"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </header>

        <div className="mt-12 overflow-hidden">
          <motion.div
            animate={{ x: index === 0 ? "0%" : "-50%" }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) setIndex(1);
              if (info.offset.x > 60 || info.velocity.x > 400) setIndex(0);
            }}
            style={{ touchAction: "pan-y" }}
            className="flex w-[200%] cursor-grab active:cursor-grabbing"
          >
            {VERSIONS.map((version) => (
              <VersionCard key={version.key} version={version} />
            ))}
          </motion.div>
        </div>

        <p className="mt-6 text-xs leading-6 text-slate-400">
          具体监测维度与开放状态，以 App 内标注与正式发布版本为准。
        </p>
      </div>
    </section>
  );
}

const APP_SHOTS = [
  { src: "/images/app/heart-rate.png", label: "心率" },
  { src: "/images/app/spo2.png", label: "血氧" },
  { src: "/images/app/sleep.png", label: "睡眠" },
  { src: "/images/app/hrv.png", label: "HRV" },
  { src: "/images/app/ecg-1.png", label: "ECG 心电" },
  { src: "/images/app/radar.jpg", label: "风险雷达" },
];

function AppMatrix() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setActive(
      max > 0
        ? Math.round((track.scrollLeft / max) * (APP_SHOTS.length - 1))
        : 0,
    );
  };

  return (
    <section id="app" ref={sectionRef} className="bg-slate-950 text-white">
      <div className="grid overflow-hidden">
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="[grid-area:1/1] h-full w-[120%] bg-[radial-gradient(ellipse_at_30%_20%,rgba(45,212,191,0.18),transparent_55%),radial-gradient(ellipse_at_72%_78%,rgba(14,165,233,0.16),transparent_55%)]"
        />

        <div className="[grid-area:1/1] mx-auto w-full max-w-[1280px] px-5 py-24 md:px-8 lg:px-10 lg:py-32">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-2xl"
            >
              <p className="text-xs font-semibold tracking-[0.32em] text-teal-300">
                App 体验
              </p>
              <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.14] tracking-[-0.03em] lg:text-[3.4rem]">
                全维度指标，随时查看
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-300">
                心率、血氧、睡眠、心电与 HRV，在同一套界面里连续记录。
              </p>
            </motion.div>

            <div className="flex items-center gap-4">
              <span className="text-xs tabular-nums tracking-[0.22em] text-white/45">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(APP_SHOTS.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollTrack(-1)}
                  aria-label="上一屏"
                  className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:scale-105 hover:bg-white/10"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(1)}
                  aria-label="下一屏"
                  className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/80 transition hover:scale-105 hover:bg-white/10"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:gap-6"
          >
            {APP_SHOTS.map((shot, shotIndex) => (
              <motion.article
                key={shot.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="w-[230px] shrink-0 snap-start sm:w-[250px]"
              >
                <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.06] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                  <div className="overflow-hidden rounded-[2rem] bg-white">
                    <img
                      src={shot.src}
                      alt={`App 界面：${shot.label}`}
                      loading="lazy"
                      className="aspect-[9/19.5] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-medium text-white/90">{shot.label}</span>
                  <span className="text-xs tabular-nums text-white/35">
                    {String(shotIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-white/40">
            以上为 App 实际界面，指标解读结果仅供参考，不构成医疗诊断。
          </p>
        </div>
      </div>
    </section>
  );
}

const bentoHover = {
  whileHover: { scale: 1.02 },
  transition: { type: "spring", stiffness: 260, damping: 22 },
};

function BrandBento() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.32em] text-teal-600">
            品牌
          </p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.14] tracking-[-0.03em] text-slate-900 lg:text-[3.4rem]">
            让主动健康
            <br className="hidden md:block" />
            成为每个人的日常
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:auto-rows-[minmax(180px,auto)] lg:grid-cols-12">
          <motion.div
            {...bentoHover}
            className="flex flex-col justify-between rounded-[2rem] border border-slate-200/70 bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10 lg:col-span-7 lg:row-span-2"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-teal-600">
                使命
              </p>
              <h3 className="mt-6 text-3xl font-semibold leading-[1.3] tracking-[-0.02em] text-slate-900 md:text-[2.15rem] lg:text-[2.6rem]">
                人人都能拥有
                <br />
                自己的健康智能体
              </h3>
            </div>
            <div className="mt-12 flex items-end justify-between gap-6">
              <p className="text-sm text-slate-400">灵跃健康</p>
              <div className="grid h-20 w-20 flex-none place-items-center rounded-full border border-teal-400/25 bg-gradient-to-br from-teal-400/15 to-sky-500/10">
                <div className="h-11 w-11 rounded-full border-2 border-teal-400/70" />
              </div>
            </div>
          </motion.div>

          <motion.div
            {...bentoHover}
            className="flex flex-col justify-between gap-8 rounded-[2rem] border border-slate-800 bg-slate-900 p-8 text-white transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10 lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-teal-300">
              愿景
            </p>
            <h3 className="text-2xl font-semibold leading-[1.45] tracking-[-0.02em] md:text-[1.8rem]">
              让主动健康守护成为每个人和每个家庭的日常
            </h3>
          </motion.div>

          <motion.div
            {...bentoHover}
            className="flex flex-col justify-between gap-8 rounded-[2rem] border border-slate-200/70 bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10 lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-teal-600">
              定位
            </p>
            <p className="text-xl font-medium leading-[1.6] tracking-[-0.01em] text-slate-800 md:text-2xl">
              以心血管风险筛查为核心，以主动健康管理为延伸
            </p>
          </motion.div>

          <motion.div
            {...bentoHover}
            className="flex flex-col justify-between gap-8 rounded-[2rem] border border-slate-200/70 bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10 lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-teal-600">
              出品
            </p>
            <div>
              <p className="text-xl font-semibold tracking-[-0.02em] text-slate-900 md:text-2xl">
                昊克云智（杭州）科技有限公司
              </p>
              <p className="mt-3 text-sm text-slate-400">灵跃健康</p>
            </div>
          </motion.div>

          <motion.div
            {...bentoHover}
            className="flex flex-col justify-between gap-8 rounded-[2rem] border border-slate-200/70 bg-white p-8 transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:p-10 lg:col-span-7"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-teal-600">
              日常信号
            </p>
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 md:text-[1.9rem]">
                PPG · ECG · EDA
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                多模态融合记录，把一天里的身体变化，整理成可回看的趋势。
              </p>
            </div>
          </motion.div>

          <motion.div
            {...bentoHover}
            className="grid gap-8 rounded-[2rem] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white transition-shadow hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:grid-cols-3 md:p-10 lg:col-span-12"
          >
            {[
              { value: "2.8g", label: "戒身重量" },
              { value: "5ATM + IP68", label: "防护等级" },
              { value: "7×24h", label: "日常生理信号记录" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    question: "灵跃健康智能戒指是医疗器械吗？",
    answer:
      "不是。产品用于生理信号监测与健康管理参考，不替代专业医生诊断，也不替代专业医疗机构的诊疗服务。如出现胸痛、呼吸困难等不适，请及时前往专业医疗机构就诊。",
  },
  {
    question: "它可以监测哪些指标？",
    answer:
      "涵盖心率、血氧、睡眠、HRV 与运动等日常维度，并提供 ECG 心电以及血压、血糖、血脂、尿酸等趋势记录，同时支持一键微体检与亲友远程关爱。具体开放状态以 App 内标注与正式发布版本为准。",
  },
  {
    question: "续航和充电是怎样的？",
    answer:
      "蓝牙连接状态下续航约 13–15 天，具体视使用频率而定；采用充电仓充电，充满约需 1 小时。",
  },
  {
    question: "防水等级是多少？",
    answer: "规格书标注为 5ATM + IP68，最终以官方发布的检测报告为准。",
  },
  {
    question: "支持哪些手机系统？",
    answer:
      "支持 iOS 13.0 及以上、Android 8.0 及以上；鸿蒙系统支持 5.0 以下版本，暂不支持纯血鸿蒙。",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={inView}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-xs font-semibold tracking-[0.32em] text-teal-600">
            常见问题
          </p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.14] tracking-[-0.03em] text-slate-900 lg:text-[3.4rem]">
            关于产品，
            <br />
            你可能想知道
          </h2>
          <p className="mt-6 max-w-sm text-base leading-8 text-slate-500">
            关于监测能力、续航、防护与使用方式的说明。
          </p>
        </motion.div>

        <div className="border-t border-slate-200">
          {FAQS.map((item, faqIndex) => {
            const isOpen = openIndex === faqIndex;
            return (
              <div key={item.question} className="border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : faqIndex)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[15px] font-medium text-slate-900 md:text-base">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`grid h-8 w-8 flex-none place-items-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-teal-400 bg-teal-50 text-teal-600"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-10 text-sm leading-8 text-slate-500">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section id="contact" className="bg-slate-950 text-white">
      <div className="grid overflow-hidden">
        <div className="[grid-area:1/1] h-full w-[120%] bg-[radial-gradient(ellipse_at_50%_18%,rgba(14,165,233,0.2),transparent_58%)]" />

        <div className="[grid-area:1/1] mx-auto w-full max-w-[1280px] px-5 py-24 md:px-8 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              viewport={inView}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="text-xs font-semibold tracking-[0.32em] text-teal-300">
                产品咨询
              </p>
              <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.12] tracking-[-0.03em] lg:text-[3.6rem]">
                把主动健康管理
                <br />
                带进每一天
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                从了解自己的每一天开始，建立属于自己的健康基线。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#colors"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(14,165,233,0.3)] transition-transform hover:scale-[1.02]"
                >
                  探索产品
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#value"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02] hover:bg-white/10"
                >
                  了解健康管理
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.9, ease: EASE }}
              className="mx-auto w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-3 lg:max-w-none"
            >
              <img
                src="/images/ring-duo.jpg"
                alt="灵跃健康智能戒指产品实拍"
                loading="lazy"
                className="aspect-square w-full rounded-[2rem] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-5 py-8 text-xs leading-6 text-white/45 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <div className="flex flex-none items-center gap-2 whitespace-nowrap text-white/70">
            <BrandMark className="h-6 w-6" />
            <span>© 2026 灵跃健康</span>
          </div>
          <p className="max-w-3xl md:text-right">
            本产品用于生理信号监测与健康管理参考，不替代专业医生诊断，也不替代专业医疗机构的诊疗服务。如出现胸痛、呼吸困难等不适，请及时前往专业医疗机构就诊。
          </p>
        </div>
      </footer>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-slate-900">
        <SiteNav />
        <main>
          <Hero />
          <ColorSwitcher />
          <ValueSticky />
          <VersionCompare />
          <AppMatrix />
          <BrandBento />
          <FaqSection />
          <ClosingCta />
        </main>
      </div>
    </MotionConfig>
  );
}
