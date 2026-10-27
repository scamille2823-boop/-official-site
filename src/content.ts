export const navLinks = [
  { href: "#product", label: "产品中心" },
  { href: "#health", label: "健康管理" },
  { href: "#app", label: "App 体验" },
  { href: "#brand", label: "品牌介绍" },
  { href: "#support", label: "支持与服务" },
] as const;

export const heroSignals = [
  "7×24 日常生理信号记录",
  "多模态信号分析",
  "个人健康基线与分级提示",
] as const;

export const whyItems = [
  {
    index: "01",
    title: "日常关注",
    body: "心血管健康与作息、压力、运动息息相关。把关注放进每天的佩戴里，而不是只在体检时才想起。",
  },
  {
    index: "02",
    title: "理解趋势",
    body: "单次数值意义有限，连续记录才能帮助你看清自己的长期变化。",
  },
  {
    index: "03",
    title: "主动管理",
    body: "发现值得留意的变化时，及时调整生活方式，必要时寻求专业医生的意见。",
  },
] as const;

export const appSlides = [
  {
    id: "radar",
    kicker: "01 / 03",
    title: "风险雷达",
    body: "在日常守护模式下查看过劳、心血管负荷、情绪负荷、代谢异常、睡眠呼吸暂停和精神压力等维度的综合参考，并配合放松方案。该展示用于帮助理解趋势，不能替代医生诊断。",
    image: "/images/app-ai.png",
    alt: "灵跃 App 风险雷达与 AI 助手界面",
  },
  {
    id: "home",
    kicker: "02 / 03",
    title: "健康档案",
    body: "在「我家」中查看健康主页、体检报告、病历记录、用药助手入口，以及亲友守护网络。以上能力以 App 实际界面为准。",
    image: "/images/app-home.jpg",
    alt: "灵跃 App 健康档案与我家界面",
  },
  {
    id: "monitor",
    kicker: "03 / 03",
    title: "手动检测",
    body: "心率、血氧、愉悦度、心电图（ECG），支持为本人或他人检测。监测策略页同时提供心率、血氧等自动监测开关。部分能力在 App 中标注为待开放。",
    image: "/images/app-monitor.png",
    alt: "灵跃 App 监测策略与手动检测界面",
  },
] as const;

export type SpecRow = {
  label: string;
  value?: string;
  pending?: boolean;
};

export const specLeft: SpecRow[] = [
  { label: "产品名称", value: "灵跃智能体戒指" },
  { label: "型号", pending: true },
  { label: "尺寸", pending: true },
  { label: "手机兼容性", pending: true },
  { label: "保修政策", pending: true },
];

export const specRight: SpecRow[] = [
  { label: "配色", value: "银色 / 金色" },
  { label: "材质", pending: true },
  { label: "续航与充电", pending: true },
  { label: "医疗器械注册 / 认证", pending: true },
  { label: "出品", value: "昊克云智（杭州）科技有限公司" },
];
