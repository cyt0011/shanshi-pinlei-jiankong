const STORAGE_KEY = "nutrition-ai-console-state-v3";
const DEMO_TODAY = new Date("2026-07-03T00:00:00+08:00");

const ownerMap = {
  C: "陈雅婷",
  H: "何洋",
  S: "沈浩",
  L: "李文明",
  G: "桂婧",
};

const platformNames = ["Amazon", "速卖通", "eBay", "独立站", "Temu"];

const brandStyles = {
  Aeasynapa: {
    line: "Amazon 品牌化主线",
    promise: "更稳定的色彩、版式和成分表达规范，重点承接睡眠、肠胃、基础营养等复购型产品",
    colors: ["#0f766e", "#8bbd93", "#f5efe4", "#26332c"],
    tone: "自然日常营养、复购、品牌资产",
  },
  VecNythra: {
    line: "Temu / 精铺测试主线",
    promise: "适合草本滴剂、胶囊等功能明确产品；即使测品，也保持统一类目标签结构",
    colors: ["#2463a6", "#6a8fbf", "#f4f7fb", "#202938"],
    tone: "草本专业、测试效率、剂型清晰",
  },
  CeuRioint: {
    line: "Temu / 精铺测试与护理线",
    promise: "适合护眼、睡眠、关节健康等护理感产品；为后续品牌化保留统一视觉资产",
    colors: ["#b7791f", "#0f766e", "#fff7e6", "#3a3428"],
    tone: "科技护理、场景明确、渠道适配",
  },
};

const brandCategoryMatrix = [
  ["睡眠管理", "Amazon 品牌化主线", "可测品", "可测品", "深色安睡感、剂量清晰、非医疗化表达"],
  ["草本滴剂", "谨慎", "主推", "补充", "草本专业感、容量、滴管图标、多语种版本"],
  ["眼部健康", "补充", "谨慎", "主推", "屏幕场景、叶黄素/蓝莓表达、科技护理感"],
  ["肠胃健康", "主推", "补充", "谨慎", "菌株、CFU、周期装、保存条件"],
  ["关节健康", "补充", "可测品", "主推", "运动恢复/中老年场景、过敏原提示"],
];

const approvalStages = [
  "开发上传配方",
  "AI 初审",
  "合规评审",
  "业务审核 / 下单需求",
  "开发报价",
  "业务利润核算",
  "确认下单 / 建料号",
];

const dailyTaskMap = {
  李文明: [
    "NP-202607-001 睡眠软糖：等待业务利润核算，今天跟进陈雅婷确认。",
    "S0003239 黑胡桃油滴剂：补充正式 COA 文件，准备进入第一批批次库存管理。",
    "KJWGL20260601-VN-C：根据 Amazon 销售反馈，评估组合装和多语种标签版本。",
  ],
  陈雅婷: [
    "NP-202607-001 睡眠软糖：完成利润核算，确认是否下单 3000 瓶。",
    "Amazon H2 目标：补充在售 SKU 销售数据，标记高潜力英雄 SKU。",
    "助眠软糖：复盘点击高但转化待提升原因，反馈标签和价格带建议。",
  ],
  何洋: [
    "检查待业务审核新品，补齐目标平台、首单数量和竞品依据。",
    "辅助平台测品 SKU：标记是否需要进入 Amazon 品牌化储备。",
    "同步 Temu 测品表现，筛选可保留配方。",
  ],
  沈浩: [
    "补充负责 SKU 的供应商报价和 MOQ 信息。",
    "检查是否存在同类目重复配方，避免测品过度分散。",
    "跟进标签草稿是否符合品牌 x 类目模板。",
  ],
  桂婧: [
    "完成待合规评审配方的成分、剂量和平台禁词检查。",
    "复查标签中的 Supplement Facts、警示语和用法用量。",
    "标记缺 COA / 检测报告的 SKU，推送开发补资料。",
  ],
};

const defaultSuppliers = [
  {
    id: "SUP-US-001",
    name: "NutraHealth Labs",
    type: "胶囊/片剂工厂",
    categories: ["睡眠管理", "肠胃健康", "免疫支持", "基础营养"],
    country: "USA",
    fda: "FDA Registered 2026",
    gmp: "cGMP Valid",
    haccp: "HACCP Valid",
    iso: "ISO 22000",
    coa: "批批 COA",
    audit: "2026-06-18 已审核",
    contact: "Sarah / QA",
    moq: "3000 瓶",
    leadTime: "25 天",
    status: "准入可用",
    risk: "低",
    notes: "适合 Amazon 品牌化主线，资料完整，可直接绑定新品审批。",
  },
  {
    id: "SUP-HK-002",
    name: "HerbalDrop Biotech",
    type: "草本滴剂工厂",
    categories: ["草本滴剂", "免疫支持", "女性健康"],
    country: "HK / USA",
    fda: "FDA Registered 2026",
    gmp: "GMP Valid",
    haccp: "待补",
    iso: "ISO 9001",
    coa: "首批 COA + 原料规格书",
    audit: "2026-07-01 已审核",
    contact: "Leo / Sales",
    moq: "2000 瓶",
    leadTime: "20 天",
    status: "准入可用",
    risk: "中",
    notes: "滴剂剂型成熟，需重点复核基底、滴管容量和多语种标签。",
  },
  {
    id: "SUP-CN-003",
    name: "BrightCare Nutrition",
    type: "软糖/粉包工厂",
    categories: ["睡眠管理", "眼部健康", "关节健康"],
    country: "CN",
    fda: "FDA Facility Number 已归档",
    gmp: "GMP Valid",
    haccp: "HACCP Valid",
    iso: "ISO 22000",
    coa: "COA 待批次上传",
    audit: "2026-05-28 已审核",
    contact: "May / Project",
    moq: "5000 瓶",
    leadTime: "30 天",
    status: "资料待补",
    risk: "中",
    notes: "适合测品，需补充正式 COA 与标签警示语复核。",
  },
];

const modules = [
  {
    group: "产品开发中心",
    items: [
      { id: "sku-review", title: "新品开发审批" },
      { id: "supplier-quality", title: "供应商资料库" },
    ],
  },
  {
    group: "品牌标签中心",
    items: [{ id: "label-score", title: "新配方标签评分" }],
  },
  {
    group: "海外仓储中心",
    items: [
      { id: "inbound", title: "入库批次与库位" },
      { id: "location-care", title: "库位保管监控" },
      { id: "shelf-life", title: "效期红线 SKU" },
      { id: "pallet", title: "全平台共享货盘" },
    ],
  },
  {
    group: "增长反馈中心",
    items: [
      { id: "hero-sku", title: "销售类目与英雄 SKU" },
      { id: "data-import", title: "赛狐数据上传" },
      { id: "ai-flow", title: "经营复盘日报" },
    ],
  },
];

const moduleLookup = modules
  .flatMap((group) => group.items.map((item) => ({ ...item, group: group.group })))
  .reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

let state = normalizeState(loadState());
let currentModule = window.location.hash.replace("#", "") || "sku-review";
if (!moduleLookup[currentModule]) currentModule = "sku-review";

function seedState() {
  return {
    skuReviews: [
      {
        recordId: "SKU-REV-2606-001",
        code: "KJWGC20260601-60G",
        productName: "Elderberry Zinc Gummies",
        brand: "Aeasynapa",
        ownerCode: "C",
        owner: "陈雅婷",
        year: "2026",
        month: "06",
        sequence: "01",
        suffix: "60G",
        category: "免疫支持",
        formula: "接骨木莓 150mg + 锌 10mg + 维生素C 90mg",
        status: "AI初审通过",
        auditScore: 88,
        riskLevel: "中",
        createdAt: "2026-06-08 09:20",
        version: 1,
        source: "新品立项",
      },
      {
        recordId: "SKU-REV-2606-002",
        code: "KJWGH20260602-120C",
        productName: "Magnesium Glycinate Capsules",
        brand: "VecNythra",
        ownerCode: "H",
        owner: "何洋",
        year: "2026",
        month: "06",
        sequence: "02",
        suffix: "120C",
        category: "睡眠压力",
        formula: "甘氨酸镁 200mg + 维生素B6 2mg",
        status: "跨部门复核",
        auditScore: 82,
        riskLevel: "低",
        createdAt: "2026-06-13 14:10",
        version: 1,
        source: "新品立项",
      },
      {
        recordId: "SKU-REV-2607-001",
        code: "KJWGS20260701-60S",
        productName: "Omega-3 Softgels",
        brand: "VecNythra",
        ownerCode: "S",
        owner: "沈浩",
        year: "2026",
        month: "07",
        sequence: "01",
        suffix: "60S",
        category: "心脑血管",
        formula: "鱼油 1000mg，EPA 330mg，DHA 220mg",
        status: "待标签评分",
        auditScore: 79,
        riskLevel: "中",
        createdAt: "2026-07-01 10:05",
        version: 1,
        source: "新品立项",
      },
      {
        recordId: "SKU-REV-2607-002",
        code: "KJWGL20260702-30S",
        productName: "Probiotic Daily Sachets",
        brand: "CeuRioint",
        ownerCode: "L",
        owner: "李文明",
        year: "2026",
        month: "07",
        sequence: "02",
        suffix: "30S",
        category: "肠胃益生菌",
        formula: "复合益生菌 50B CFU + 菊粉 500mg",
        status: "供应商资料待补",
        auditScore: 74,
        riskLevel: "中",
        createdAt: "2026-07-02 16:35",
        version: 1,
        source: "新品立项",
      },
      {
        recordId: "SKU-REV-2607-003",
        code: "KJWGG20260703-60C",
        productName: "Ashwagandha Calm Capsules",
        brand: "Aeasynapa",
        ownerCode: "G",
        owner: "桂婧",
        year: "2026",
        month: "07",
        sequence: "03",
        suffix: "60C",
        category: "睡眠压力",
        formula: "南非醉茄提取物 600mg + L-茶氨酸 100mg",
        status: "功效宣称复核",
        auditScore: 76,
        riskLevel: "高",
        createdAt: "2026-07-03 11:18",
        version: 1,
        source: "新品立项",
      },
    ],
    approvalCases: [
      {
        id: "NP-202607-001",
        title: "睡眠软糖",
        sku: "KJWGL20260701-TY-B",
        materialId: "",
        supplierId: "SUP-CN-003",
        owner: "李文明",
        uploadedAt: "2026-07-03 09:20",
        targetPlatform: "Amazon 美国站",
        currentBlocker: "业务利润核算",
        holdHours: 18,
        formula: "褪黑素 3mg、L-茶氨酸、镁，蓝莓味软糖，60 粒/瓶",
        firstOrderQty: 3000,
        supplierQuote: "¥12.00/瓶，MOQ 3000，交期 25 天",
        grossMargin: "待核算",
        status: "待利润核算",
        stages: [
          { name: "开发上传配方", state: "done", owner: "李文明", time: "2026-07-03 09:20", note: "褪黑素、茶氨酸、镁，蓝莓味软糖。" },
          { name: "AI 初审", state: "done", owner: "系统", time: "2026-07-03 09:22", note: "睡眠管理，推荐 CeuRioint，需注意宣称边界。" },
          { name: "合规评审", state: "done", owner: "桂婧", time: "2026-07-03 10:15", note: "剂量、禁词、Supplement Facts 初审通过。" },
          { name: "业务审核 / 下单需求", state: "done", owner: "陈雅婷", time: "2026-07-03 11:40", note: "首单 3000 瓶，供应商资料已绑定。" },
          { name: "开发报价", state: "done", owner: "李文明", time: "2026-07-03 14:10", note: "¥12.00/瓶，MOQ 3000，交期 25 天。" },
          { name: "业务利润核算", state: "wait", owner: "陈雅婷", time: "待确认", note: "核算平台费、广告预算和目标毛利。" },
          { name: "确认下单 / 建料号", state: "todo", owner: "待确认", time: "未开始", note: "利润核算通过后进入下单和建料号。" },
        ],
      },
      {
        id: "NP-202607-002",
        title: "黑胡桃油滴剂",
        sku: "KJWGL20260601-VN-C",
        materialId: "S0003239",
        supplierId: "SUP-HK-002",
        owner: "李文明",
        uploadedAt: "2026-07-02 15:00",
        targetPlatform: "Amazon / 独立站",
        currentBlocker: "已建料号",
        holdHours: 0,
        formula: "黑胡桃、毛蕊花、大蒜，草本滴剂",
        firstOrderQty: 2000,
        supplierQuote: "¥12.00/瓶，20 天",
        grossMargin: "毛利可行",
        status: "已建料号",
        stages: approvalStages.map((name) => ({
          name,
          state: "done",
          owner: name === "AI 初审" ? "系统" : name === "合规评审" ? "桂婧" : name.includes("业务") ? "陈雅婷" : "李文明",
          time: name === "确认下单 / 建料号" ? "2026-07-03 16:00" : "已完成",
          note: name === "确认下单 / 建料号" ? "S0003239。" : name === "AI 初审" ? "草本滴剂，推荐 VecNythra。" : "资料已归档。",
        })),
      },
    ],
    suppliers: defaultSuppliers,
    lots: [
      {
        lotId: "LOT-ELD-2606A",
        materialId: "S0004101",
        sku: "KJWGC20260601-60G",
        productName: "Elderberry Zinc Gummies",
        brand: "Aeasynapa",
        warehouse: "US-01 洛杉矶海外仓",
        zone: "A 常温避光区",
        location: "A-01-02-B03",
        qty: 3200,
        inboundDate: "2026-06-22",
        mfgDate: "2026-05-12",
        expDate: "2028-05-12",
        temp: 22,
        humidity: 48,
        preservation: "常温避光，密封防潮",
        inspection: "合格",
      },
      {
        lotId: "LOT-MAG-2606A",
        materialId: "S0004102",
        sku: "KJWGH20260602-120C",
        productName: "Magnesium Glycinate Capsules",
        brand: "VecNythra",
        warehouse: "US-01 洛杉矶海外仓",
        zone: "B 高周转拣货区",
        location: "B-03-01-C02",
        qty: 2150,
        inboundDate: "2026-06-28",
        mfgDate: "2026-04-30",
        expDate: "2028-04-30",
        temp: 21,
        humidity: 42,
        preservation: "常温防潮，外箱完整",
        inspection: "合格",
      },
      {
        lotId: "LOT-OLD-2501B",
        materialId: "S0004101",
        sku: "KJWGC20260601-60G",
        productName: "Elderberry Zinc Gummies",
        brand: "Aeasynapa",
        warehouse: "US-01 洛杉矶海外仓",
        zone: "C 待消耗区",
        location: "C-02-04-A01",
        qty: 640,
        inboundDate: "2025-03-15",
        mfgDate: "2025-01-18",
        expDate: "2027-01-18",
        temp: 24,
        humidity: 58,
        preservation: "常温避光，需优先消耗",
        inspection: "效期红线",
      },
      {
        lotId: "LOT-PRO-2607A",
        materialId: "S0004103",
        sku: "KJWGL20260702-30S",
        productName: "Probiotic Daily Sachets",
        brand: "CeuRioint",
        warehouse: "US-01 洛杉矶海外仓",
        zone: "D 温控观察区",
        location: "D-01-01-A04",
        qty: 1600,
        inboundDate: "2026-07-02",
        mfgDate: "2026-05-28",
        expDate: "2028-05-28",
        temp: 19,
        humidity: 40,
        preservation: "温控、避光、干燥剂复查",
        inspection: "待二检",
      },
    ],
    initialReservations: [
      { lotId: "LOT-ELD-2606A", sku: "KJWGC20260601-60G", platform: "Amazon", qty: 800 },
      { lotId: "LOT-ELD-2606A", sku: "KJWGC20260601-60G", platform: "速卖通", qty: 260 },
      { lotId: "LOT-ELD-2606A", sku: "KJWGC20260601-60G", platform: "eBay", qty: 120 },
      { lotId: "LOT-ELD-2606A", sku: "KJWGC20260601-60G", platform: "独立站", qty: 180 },
      { lotId: "LOT-ELD-2606A", sku: "KJWGC20260601-60G", platform: "Temu", qty: 420 },
      { lotId: "LOT-MAG-2606A", sku: "KJWGH20260602-120C", platform: "Amazon", qty: 560 },
      { lotId: "LOT-MAG-2606A", sku: "KJWGH20260602-120C", platform: "Temu", qty: 330 },
      { lotId: "LOT-OLD-2501B", sku: "KJWGC20260601-60G", platform: "Amazon", qty: 260 },
      { lotId: "LOT-PRO-2607A", sku: "KJWGL20260702-30S", platform: "Amazon", qty: 320 },
    ],
    reservationEvents: [],
    movementLog: [
      {
        time: "2026-06-29 15:12",
        lotId: "LOT-OLD-2501B",
        from: "A-05-03-D01",
        to: "C-02-04-A01",
        action: "移入待消耗区",
        operator: "仓储",
        note: "生产日期已超过 12 个月，按 FEFO 优先出库。",
      },
    ],
    locationChecks: [
      {
        time: "2026-07-01 09:00",
        location: "D-01-01-A04",
        temp: 19,
        humidity: 40,
        result: "合格",
        action: "复核干燥剂与外箱密封",
      },
      {
        time: "2026-07-02 09:15",
        location: "C-02-04-A01",
        temp: 24,
        humidity: 58,
        result: "关注",
        action: "贴效期红线标识，限制新品补货。",
      },
    ],
    labelReviews: [
      {
        id: "LAB-2606-001",
        sku: "KJWGC20260601-60G",
        brand: "Aeasynapa",
        category: "免疫支持",
        formula: "接骨木莓 + 锌 + 维生素C",
        score: 89,
        status: "可投入生产",
        suggestion: "正面保留植物识别色，功效语降级为日常支持。",
        createdAt: "2026-06-15 17:20",
      },
      {
        id: "LAB-2607-001",
        sku: "KJWGG20260703-60C",
        brand: "Aeasynapa",
        category: "睡眠压力",
        formula: "南非醉茄 + L-茶氨酸",
        score: 72,
        status: "返修",
        suggestion: "减少治疗暗示，补足适用人群和警示语层级。",
        createdAt: "2026-07-03 11:50",
      },
    ],
    sales: [
      {
        month: "2026-06",
        sku: "KJWGC20260601-60G",
        brand: "Aeasynapa",
        channel: "Amazon",
        units: 1830,
        salesAmount: 786900,
        grossMargin: 0.53,
        acos: 0.17,
        repeatRate: 0.14,
      },
      {
        month: "2026-06",
        sku: "KJWGC20260601-60G",
        brand: "Aeasynapa",
        channel: "Temu",
        units: 960,
        salesAmount: 259200,
        grossMargin: 0.34,
        acos: 0.11,
        repeatRate: 0.08,
      },
      {
        month: "2026-06",
        sku: "KJWGH20260602-120C",
        brand: "VecNythra",
        channel: "Amazon",
        units: 980,
        salesAmount: 578200,
        grossMargin: 0.57,
        acos: 0.14,
        repeatRate: 0.18,
      },
      {
        month: "2026-06",
        sku: "KJWGL20260702-30S",
        brand: "CeuRioint",
        channel: "独立站",
        units: 420,
        salesAmount: 218400,
        grossMargin: 0.61,
        acos: 0.09,
        repeatRate: 0.22,
      },
      {
        month: "2026-05",
        sku: "KJWGC20260601-60G",
        brand: "Aeasynapa",
        channel: "Amazon",
        units: 1380,
        salesAmount: 579600,
        grossMargin: 0.51,
        acos: 0.19,
        repeatRate: 0.11,
      },
    ],
    imports: [],
    auditLog: [
      {
        time: "2026-07-03 13:40",
        module: "系统",
        title: "建立膳食 AI 监控台演示账套",
        detail: "初始化 SKU、批次、库位、销售、标签评分和货盘共享数据。",
      },
    ],
  };
}

function normalizeState(rawState) {
  const defaults = seedState();
  const normalized = { ...defaults, ...(rawState || {}) };
  Object.keys(defaults).forEach((key) => {
    if (Array.isArray(defaults[key]) && !Array.isArray(normalized[key])) {
      normalized[key] = defaults[key];
    }
  });
  if (!normalized.approvalCases?.length) normalized.approvalCases = defaults.approvalCases;
  if (!normalized.suppliers?.length) normalized.suppliers = defaults.suppliers;
  const materialBySku = {
    "KJWGC20260601-60G": "S0004101",
    "KJWGH20260602-120C": "S0004102",
    "KJWGL20260702-30S": "S0004103",
  };
  normalized.lots = normalized.lots.map((lot, index) => ({
    ...lot,
    materialId: lot.materialId || materialBySku[lot.sku] || `S000${4100 + index + 1}`,
  }));
  return normalized;
}

function loadState() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.warn("Failed to load state", error);
  }
  return seedState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addLog(module, title, detail) {
  state.auditLog.unshift({
    time: formatDateTime(DEMO_TODAY),
    module,
    title,
    detail,
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(date) {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}

function toDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00+08:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateToYmd(date) {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function addYears(dateString, years) {
  const date = toDate(dateString);
  if (!date) return "";
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return dateToYmd(next);
}

function monthsBetween(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return Math.max(0, months + (endDate.getDate() >= startDate.getDate() ? 0 : -1));
}

function daysBetween(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  return Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
}

function parseSku(code) {
  const normalized = String(code || "").trim().toUpperCase();
  const match = normalized.match(/^KJWG([CHSLG])(\d{4})(\d{2})(\d{2})(.*)$/);
  if (!match) {
    return {
      valid: false,
      message: "编码未匹配 KJWG + 开发人 + 年月 + 月度排序；审核通过后可按开发规则补规格/料号后缀。",
    };
  }
  const [, ownerCode, year, month, sequence, rawSuffix] = match;
  const monthNum = Number(month);
  const suffix = rawSuffix.replace(/^-/, "") || "审核后制定";
  return {
    valid: monthNum >= 1 && monthNum <= 12,
    ownerCode,
    owner: ownerMap[ownerCode],
    year,
    month,
    sequence,
    suffix,
    message:
      monthNum >= 1 && monthNum <= 12
        ? "编码结构有效。"
        : "月份字段不在 01-12 范围内。",
  };
}

function classifyFormula(formula) {
  const text = String(formula || "").toLowerCase();
  const rules = [
    {
      category: "睡眠管理",
      keywords: ["magnesium", "镁", "melatonin", "褪黑", "gaba", "茶氨酸", "ashwagandha", "南非醉茄", "calm"],
      risk: "中",
      evidence: "剂量、警示语、适用人群、避免治疗暗示和依赖性表达",
    },
    {
      category: "草本滴剂",
      keywords: ["black walnut", "黑胡桃", "mullein", "毛蕊花", "garlic", "大蒜", "drop", "滴剂", "草本"],
      risk: "中",
      evidence: "草本来源、滴管容量、酒精/甘油基底、多语种标签版本",
    },
    {
      category: "眼部健康",
      keywords: ["lutein", "叶黄素", "blueberry", "蓝莓", "vision", "视力", "eye", "护眼", "screen"],
      risk: "低",
      evidence: "叶黄素/玉米黄质含量、屏幕场景表达、非医疗化视觉保护文案",
    },
    {
      category: "免疫支持",
      keywords: ["vitamin c", "维生素c", "elderberry", "接骨木", "zinc", "锌", "d3", "echinacea"],
      risk: "中",
      evidence: "成分含量、糖含量、儿童适用性",
    },
    {
      category: "肠胃健康",
      keywords: ["probiotic", "益生菌", "cfu", "inulin", "菊粉", "digest"],
      risk: "中",
      evidence: "菌株编号、活菌数稳定性、温控要求",
    },
    {
      category: "心脑血管",
      keywords: ["omega", "鱼油", "epa", "dha", "coq10", "辅酶", "krill"],
      risk: "中",
      evidence: "氧化值、重金属、软胶囊稳定性",
    },
    {
      category: "关节健康",
      keywords: ["collagen", "胶原", "calcium", "钙", "glucosamine", "氨糖", "msm", "关节", "joint"],
      risk: "低",
      evidence: "运动恢复/中老年场景、过敏原、每日剂量、关节舒适非治疗表达",
    },
    {
      category: "女性健康",
      keywords: ["cranberry", "蔓越莓", "iron", "铁", "folate", "叶酸", "biotin", "生物素"],
      risk: "中",
      evidence: "人群禁忌、含铁量、功效表达边界",
    },
    {
      category: "运动营养",
      keywords: ["creatine", "肌酸", "whey", "乳清", "electrolyte", "电解质", "protein"],
      risk: "低",
      evidence: "剂量、口味稳定性、运动场景证明",
    },
  ];
  const hit = rules.find((rule) => rule.keywords.some((keyword) => text.includes(keyword)));
  return (
    hit || {
      category: "基础营养",
      risk: "低",
      evidence: "补齐配方剂量、适用人群、供应商证明",
    }
  );
}

function claimRisk(text) {
  const riskyWords = ["治疗", "治愈", "降血糖", "降血压", "抗癌", "抑郁", "失眠", "炎症"];
  const value = String(text || "");
  return riskyWords.some((word) => value.includes(word)) ? "高" : "中";
}

function scoreSkuAudit(formula, productName, brand) {
  let score = 62;
  if (String(formula || "").length >= 12) score += 10;
  if (String(formula || "").match(/\d/)) score += 8;
  if (productName) score += 6;
  if (brand) score += 5;
  if (claimRisk(formula) === "高") score -= 12;
  return Math.max(45, Math.min(96, score));
}

function statusTone(label) {
  if (["可投入生产", "AI初审通过", "合格", "正常", "通过", "完成"].some((word) => String(label).includes(word))) {
    return "ok";
  }
  if (["红线", "高", "过期", "锁定", "异常"].some((word) => String(label).includes(word))) {
    return "danger";
  }
  if (["返修", "待", "关注", "复核", "补"].some((word) => String(label).includes(word))) {
    return "watch";
  }
  return "info";
}

function pill(label, tone = statusTone(label)) {
  const classes = {
    ok: "status-ok",
    watch: "status-watch",
    danger: "status-danger",
    info: "status-info",
    violet: "status-violet",
  };
  return `<span class="status-pill ${classes[tone] || classes.info}">${escapeHtml(label)}</span>`;
}

function getLatestSkuRecords() {
  const byCode = new Map();
  state.skuReviews.forEach((record) => {
    const current = byCode.get(record.code);
    if (!current || Number(record.version || 1) >= Number(current.version || 1)) {
      byCode.set(record.code, record);
    }
  });
  return Array.from(byCode.values());
}

function skuName(code) {
  return getLatestSkuRecords().find((item) => item.code === code)?.productName || code;
}

function getSupplier(idOrName) {
  return (state.suppliers || []).find((item) => item.id === idOrName || item.name === idOrName);
}

function supplierStatusLine(supplier) {
  if (!supplier) return "未绑定供应商";
  return `${supplier.name}｜${supplier.fda}｜${supplier.gmp}｜${supplier.coa}`;
}

function currentLocation(lotId) {
  const lot = state.lots.find((item) => item.lotId === lotId);
  const moves = state.movementLog.filter((item) => item.lotId === lotId);
  return moves.length ? moves[0].to : lot?.location || "";
}

function lotReservationEvents() {
  return [...(state.initialReservations || []), ...(state.reservationEvents || [])];
}

function reservedQtyForLot(lotId) {
  return lotReservationEvents()
    .filter((item) => item.lotId === lotId)
    .reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function reservedBySkuAndPlatform(sku) {
  const result = Object.fromEntries(platformNames.map((platform) => [platform, 0]));
  lotReservationEvents()
    .filter((item) => item.sku === sku)
    .forEach((item) => {
      result[item.platform] = (result[item.platform] || 0) + Number(item.qty || 0);
    });
  return result;
}

function shelfStatus(lot) {
  const mfgDate = toDate(lot.mfgDate);
  const expDate = toDate(lot.expDate);
  const ageMonths = monthsBetween(mfgDate, DEMO_TODAY);
  const remainingDays = daysBetween(DEMO_TODAY, expDate);
  if (remainingDays < 0) {
    return {
      label: "过期锁定",
      tone: "danger",
      ageMonths,
      remainingDays,
      action: "停止出库，进入报废审批。",
    };
  }
  if (remainingDays <= 180 || ageMonths >= 18) {
    return {
      label: "效期红线",
      tone: "danger",
      ageMonths,
      remainingDays,
      action: "锁定新品补货，按 FEFO 优先清货。",
    };
  }
  if (remainingDays <= 365 || ageMonths >= 12) {
    return {
      label: "尽快消耗",
      tone: "watch",
      ageMonths,
      remainingDays,
      action: "提高销售权重，进入月度消耗计划。",
    };
  }
  return {
    label: "新鲜可售",
    tone: "ok",
    ageMonths,
    remainingDays,
    action: "正常共享货盘。",
  };
}

function conditionStatus(temp, humidity) {
  const t = Number(temp);
  const h = Number(humidity);
  if (t > 30 || h > 70) return { label: "保管异常", tone: "danger" };
  if (t > 25 || h > 60) return { label: "环境关注", tone: "watch" };
  return { label: "保管合格", tone: "ok" };
}

function aggregateInventory() {
  const bySku = new Map();
  state.lots.forEach((lot) => {
    const current = bySku.get(lot.sku) || {
      sku: lot.sku,
      productName: skuName(lot.sku),
      brand: lot.brand,
      qty: 0,
      reserved: 0,
      redQty: 0,
      locations: new Set(),
    };
    const shelf = shelfStatus(lot);
    current.qty += Number(lot.qty || 0);
    current.reserved += reservedQtyForLot(lot.lotId);
    if (shelf.tone === "danger" || shelf.label === "尽快消耗") {
      current.redQty += Number(lot.qty || 0);
    }
    current.locations.add(currentLocation(lot.lotId));
    bySku.set(lot.sku, current);
  });
  return Array.from(bySku.values()).map((item) => ({
    ...item,
    available: item.qty - item.reserved,
    locations: Array.from(item.locations),
  }));
}

function categorySales() {
  const skuRecords = getLatestSkuRecords();
  const result = new Map();
  state.sales.forEach((sale) => {
    const category = skuRecords.find((item) => item.code === sale.sku)?.category || "未分类";
    const current = result.get(category) || { category, sales: 0, units: 0, marginValue: 0 };
    current.sales += Number(sale.salesAmount || 0);
    current.units += Number(sale.units || 0);
    current.marginValue += Number(sale.salesAmount || 0) * Number(sale.grossMargin || 0);
    result.set(category, current);
  });
  return Array.from(result.values()).sort((a, b) => b.sales - a.sales);
}

function heroSkuRows() {
  const bySku = new Map();
  state.sales.forEach((sale) => {
    const current = bySku.get(sale.sku) || {
      sku: sale.sku,
      brand: sale.brand,
      sales: 0,
      units: 0,
      marginValue: 0,
      acosValue: 0,
      repeatValue: 0,
      rows: 0,
    };
    current.sales += Number(sale.salesAmount || 0);
    current.units += Number(sale.units || 0);
    current.marginValue += Number(sale.salesAmount || 0) * Number(sale.grossMargin || 0);
    current.acosValue += Number(sale.acos || 0);
    current.repeatValue += Number(sale.repeatRate || 0);
    current.rows += 1;
    bySku.set(sale.sku, current);
  });
  const maxSales = Math.max(...Array.from(bySku.values()).map((item) => item.sales), 1);
  const inventory = aggregateInventory();
  return Array.from(bySku.values())
    .map((item) => {
      const inv = inventory.find((row) => row.sku === item.sku);
      const margin = item.marginValue / Math.max(item.sales, 1);
      const acos = item.acosValue / item.rows;
      const repeat = item.repeatValue / item.rows;
      const availabilityScore = inv && inv.available > 600 ? 12 : inv && inv.available > 0 ? 7 : 0;
      const score =
        (item.sales / maxSales) * 42 +
        margin * 28 +
        repeat * 18 +
        Math.max(0, 12 - acos * 28) +
        availabilityScore;
      return {
        ...item,
        productName: skuName(item.sku),
        margin,
        acos,
        repeat,
        available: inv?.available || 0,
        redQty: inv?.redQty || 0,
        score: Math.round(Math.min(100, score)),
      };
    })
    .sort((a, b) => b.score - a.score);
}

function renderMetricRow(items) {
  return `<div class="metric-row">${items
    .map(
      (item) => `
        <div class="metric">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          ${item.note ? `<p class="muted small">${escapeHtml(item.note)}</p>` : ""}
        </div>
      `,
    )
    .join("")}</div>`;
}

function renderNav() {
  const nav = document.getElementById("moduleNav");
  nav.innerHTML = modules
    .map(
      (group) => `
      <section>
        <p class="nav-group-title">${escapeHtml(group.group)}</p>
        <div class="nav-items">
          ${group.items
            .map(
              (item) => `
                <button class="nav-item ${item.id === currentModule ? "active" : ""}" data-module="${item.id}" type="button">
                  <span>${escapeHtml(item.title)}</span>
                  <span class="nav-badge">${escapeHtml(navBadge(item.id))}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
    `,
    )
    .join("");
}

function navBadge(moduleId) {
  if (moduleId === "sku-review") return (state.approvalCases || []).length;
  if (moduleId === "supplier-quality") return (state.suppliers || []).length;
  if (moduleId === "label-score") return state.labelReviews.length;
  if (moduleId === "inbound") return state.lots.length;
  if (moduleId === "location-care") return state.locationChecks.length;
  if (moduleId === "shelf-life") {
    return state.lots.filter((lot) => shelfStatus(lot).tone !== "ok").length;
  }
  if (moduleId === "pallet") return platformNames.length;
  if (moduleId === "hero-sku") return heroSkuRows().length;
  if (moduleId === "data-import") return state.imports.length;
  if (moduleId === "ai-flow") return state.auditLog.length;
  return "目录";
}

function render() {
  renderNav();
  const moduleInfo = moduleLookup[currentModule];
  document.getElementById("modulePath").textContent = `${moduleInfo.group} / ${moduleInfo.title}`;
  document.getElementById("moduleTitle").textContent = moduleInfo.title;

  document.querySelectorAll(".process-line button").forEach((button) => {
    button.classList.toggle("active", button.dataset.module === currentModule);
  });

  const renderers = {
    "sku-review": renderSkuReview,
    "supplier-quality": renderSupplierQuality,
    "label-score": renderLabelScore,
    inbound: renderInbound,
    "location-care": renderLocationCare,
    "shelf-life": renderShelfLife,
    pallet: renderPallet,
    "hero-sku": renderHeroSku,
    "data-import": renderDataImport,
    "ai-flow": renderAiFlow,
  };
  const content = document.getElementById("content");
  content.innerHTML = renderers[currentModule]();
  bindModuleEvents(currentModule);
}

function stageStateText(stateName) {
  if (stateName === "done") return "已完成";
  if (stateName === "wait") return "待处理";
  return "未开始";
}

function stageStateClass(stateName) {
  if (stateName === "done") return "done";
  if (stateName === "wait") return "wait";
  return "";
}

function renderApprovalCards() {
  const cases = state.approvalCases || [];
  if (!cases.length) return `<div class="empty-state">暂无新品审批单</div>`;
  return cases
    .map((item) => {
      const supplier = getSupplier(item.supplierId);
      return `
        <article class="approval-card">
          <header>
            <div>
              <strong>${escapeHtml(item.id)} · ${escapeHtml(item.title)} · <span class="mono">${escapeHtml(item.sku)}</span></strong>
              <p>开发人：${escapeHtml(item.owner)} · 上传时间：${escapeHtml(item.uploadedAt)} · 目标平台：${escapeHtml(item.targetPlatform)} · 当前卡点：${escapeHtml(item.currentBlocker)}</p>
              <p>供应商：${escapeHtml(supplierStatusLine(supplier))}</p>
            </div>
            ${pill(item.materialId || `停留 ${item.holdHours || 0} 小时`, item.materialId ? "ok" : "watch")}
          </header>
          <div class="approval-steps">
            ${(item.stages || approvalStages.map((name) => ({ name, state: "todo", owner: "待补", time: "未开始", note: "" })))
              .map(
                (stage) => `
                  <article>
                    <span class="status-dot ${stageStateClass(stage.state)}">${stageStateText(stage.state)}</span>
                    <b>${escapeHtml(stage.name)}</b>
                    <p>${escapeHtml(stage.owner)}<br />${escapeHtml(stage.time)}<br />${escapeHtml(stage.note)}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSkuReview() {
  const latest = getLatestSkuRecords();
  const highRisk = latest.filter((item) => item.riskLevel === "高").length;
  const pending = latest.filter((item) => statusTone(item.status) !== "ok").length;
  const monthSku = latest.filter((item) => `${item.year}-${item.month}` === "2026-07").length;
  const approvals = state.approvalCases || [];
  const businessPending = approvals.filter((item) => String(item.currentBlocker || "").includes("业务")).length;
  const compliancePending = approvals.filter((item) => item.stages?.some((stage) => stage.name === "合规评审" && stage.state !== "done")).length;
  const profitPending = approvals.filter((item) => String(item.currentBlocker || "").includes("利润")).length;
  const overdue = approvals.filter((item) => Number(item.holdHours || 0) >= 24).length;
  return `
    ${renderMetricRow([
      { label: "待业务审核", value: businessPending, note: "业务需求、首单数量、供应商报价待确认" },
      { label: "待合规评审", value: compliancePending, note: "成分、剂量、禁词、Supplement Facts" },
      { label: "待利润核算", value: profitPending, note: "平台费、广告预算、目标毛利" },
      { label: "超时节点", value: overdue, note: "停留超过 24 小时自动进入日报" },
    ])}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>新品立项审批流</h3>
          <p>配方立项 - SKU 审核 - 合规评审 - 业务需求 - 开发报价 - 利润核算 - 确认下单 - 建立料号，都在同一张审批流里推进。</p>
        </div>
        <div class="topbar-actions">
          ${pill(`已建 SKU ${latest.length}`, "info")}
          ${pill(`7 月新增 ${monthSku}`, "violet")}
          ${pill(`高风险 ${highRisk}`, highRisk ? "danger" : "ok")}
        </div>
      </div>
      <div class="panel-body">
        <div class="approval-board">
          ${renderApprovalCards()}
        </div>
      </div>
    </section>

    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>新增配方立项 / SKU 建立</h3>
            <p>上传配方后生成新品立项单，同时按 KJWG 规则生成 SKU，后续推进到报价、利润核算和建料号。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="skuForm" class="form-grid">
            <label>产品名称
              <input name="productName" placeholder="例如 Sleep Complex Capsules" required />
            </label>
            <label>品牌
              <select name="brand">
                ${Object.keys(brandStyles).map((brand) => `<option>${brand}</option>`).join("")}
              </select>
            </label>
            <label>供应商
              <select name="supplierId">
                ${(state.suppliers || [])
                  .map((supplier) => `<option value="${supplier.id}">${supplier.name} - ${supplier.type}</option>`)
                  .join("")}
              </select>
            </label>
            <label>开发负责人
              <select name="ownerCode">
                ${Object.entries(ownerMap)
                  .map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
                  .join("")}
              </select>
            </label>
            <label>立项月份
              <input name="month" type="month" value="2026-07" required />
            </label>
            <label>来源
              <select name="source">
                <option>新品立项</option>
                <option>赛狐导入</option>
                <option>配方迭代</option>
                <option>品牌复用</option>
              </select>
            </label>
            <label>目标平台
              <select name="targetPlatform">
                <option>Amazon 美国站</option>
                <option>Amazon / 独立站</option>
                <option>Temu 测品</option>
                <option>全平台</option>
              </select>
            </label>
            <label>首单数量
              <input name="firstOrderQty" type="number" min="0" value="3000" />
            </label>
            <label>开发报价
              <input name="supplierQuote" placeholder="例如 ¥12.00/瓶，MOQ 3000，交期 25 天" />
            </label>
            <label class="field-span">配方草案
              <textarea name="formula" placeholder="输入核心成分、剂量、剂型、人群或卖点"></textarea>
            </label>
            <div class="field-span form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">+</span>生成并提交审核</button>
            </div>
          </form>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>SKU 编码拆解器</h3>
            <p>用于审核赛狐导出或手工新增 SKU 是否符合跨境外购规则。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="form-grid single">
            <label>产品编码
              <input id="skuParserInput" class="mono" value="KJWGC20260601-60G" />
            </label>
          </div>
          <div id="skuParserResult" class="result-box" style="margin-top: 14px;"></div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>SKU 审核库</h3>
          <p>重复导入同一 SKU 会新增版本，不覆盖旧记录；下单后补充主料号进入供应链批次管理。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>产品</th>
              <th>品牌 / 类目</th>
              <th>负责人</th>
              <th>AI 分</th>
              <th>风险</th>
              <th>状态</th>
              <th>版本</th>
            </tr>
          </thead>
          <tbody>
            ${latest
              .map(
                (item) => `
                <tr>
                  <td class="mono">${escapeHtml(item.code)}</td>
                  <td>
                    <strong>${escapeHtml(item.productName)}</strong>
                    <div class="muted small">${escapeHtml(item.formula)}</div>
                    <div class="muted small">供应商：${escapeHtml(item.supplierName || getSupplier(item.supplierId)?.name || "待绑定")}</div>
                  </td>
                  <td>${escapeHtml(item.brand)}<br /><span class="muted small">${escapeHtml(item.category)}</span></td>
                  <td>${escapeHtml(item.owner)}</td>
                  <td>${item.auditScore}</td>
                  <td>${pill(item.riskLevel, statusTone(item.riskLevel))}</td>
                  <td>${pill(item.status)}</td>
                  <td>V${item.version}</td>
                </tr>
              `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderFormulaIntake() {
  const categories = categorySales();
  return `
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>新配方 AI 分类</h3>
            <p>先判类目，再决定品牌线、供应商证据和标签审核重点。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="formulaForm" class="form-grid single">
            <label>配方输入
              <textarea name="formula" placeholder="例如 Magnesium glycinate 200mg + GABA 100mg + L-theanine 100mg"></textarea>
            </label>
            <label>目标人群
              <select name="audience">
                <option>成人日常营养</option>
                <option>女性健康</option>
                <option>运动人群</option>
                <option>中老年人群</option>
                <option>家庭补充</option>
              </select>
            </label>
            <label>计划渠道
              <select name="channel">
                <option>Amazon</option>
                <option>Temu</option>
                <option>独立站</option>
                <option>全平台</option>
              </select>
            </label>
            <div class="form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">◎</span>生成分类建议</button>
            </div>
          </form>
          <div id="formulaResult" class="result-box" style="margin-top: 14px;"></div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>产品开发监控目录</h3>
            <p>产品开发部从立项开始持续监控，而不是等销售异常后再补救。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="directory-map">
            ${[
              ["01 市场机会", "关键词趋势、竞品剂型、平台价格带、目标毛利和下半年目标贡献。", "月更"],
              ["02 配方资产", "核心成分、剂量、剂型、过敏原、稳定性、证据等级和配伍风险。", "立项前"],
              ["03 品牌归属", "Aeasynapa / VecNythra / CeuRioint 风格、卖点层级、目标人群。", "立项时"],
              ["04 供应链可行性", "供应商资质、MOQ、交期、COA、重金属/微生物检测、打样记录。", "打样前"],
              ["05 质量与标签", "功效宣称边界、警示语、Supplement Facts、标签评分和返修闭环。", "量产前"],
              ["06 库存策略", "首单量、海外仓共享库存、效期消耗节奏、库位保管条件。", "入库后"],
            ]
              .map(
                ([name, desc, cadence]) => `
                  <div class="directory-row">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                    ${pill(cadence, cadence === "月更" ? "info" : "violet")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>当前类目贡献</h3>
          <p>销售反馈会反哺产品线规划，决定继续补 SKU、改包装、清库存或停开。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>类目</th>
              <th>销售额</th>
              <th>销量</th>
              <th>毛利额</th>
              <th>开发动作</th>
            </tr>
          </thead>
          <tbody>
            ${categories
              .map(
                (item) => `
                <tr>
                  <td>${escapeHtml(item.category)}</td>
                  <td>${formatMoney(item.sales)}</td>
                  <td>${formatNumber(item.units)}</td>
                  <td>${formatMoney(item.marginValue)}</td>
                  <td>${item.sales > 600000 ? "补强规格和复购装" : "验证关键词与渠道价格带"}</td>
                </tr>
              `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSupplierQuality() {
  const suppliers = state.suppliers || [];
  const qualified = suppliers.filter((item) => item.status === "准入可用").length;
  const pending = suppliers.filter((item) => item.status !== "准入可用").length;
  return `
    ${renderMetricRow([
      { label: "供应商资料库", value: suppliers.length, note: "按厂商固定资质沉淀" },
      { label: "准入可用", value: qualified, note: "FDA/GMP 等资料可复用" },
      { label: "资料待补", value: pending, note: "SKU 绑定时自动提示风险" },
      { label: "SKU 绑定", value: "立项选择", note: "创建 SKU 时直接引用厂商资料" },
    ])}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>供应商资料库</h3>
          <p>FDA、GMP、HACCP、ISO、COA 规则和联系人是厂商固定资料；后续 SKU 创建时只选择厂商，系统自动带出资质与风险。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>厂商</th>
              <th>分类 / 适配类目</th>
              <th>FDA / GMP</th>
              <th>COA / 审核</th>
              <th>MOQ / 交期</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            ${suppliers
              .map(
                (supplier) => `
                  <tr>
                    <td>
                      <strong>${escapeHtml(supplier.name)}</strong>
                      <div class="muted small">${escapeHtml(supplier.id)} · ${escapeHtml(supplier.country)} · ${escapeHtml(supplier.contact)}</div>
                    </td>
                    <td>${escapeHtml(supplier.type)}<br /><span class="muted small">${supplier.categories.map(escapeHtml).join(" / ")}</span></td>
                    <td>${escapeHtml(supplier.fda)}<br /><span class="muted small">${escapeHtml(supplier.gmp)} · ${escapeHtml(supplier.haccp)} · ${escapeHtml(supplier.iso)}</span></td>
                    <td>${escapeHtml(supplier.coa)}<br /><span class="muted small">${escapeHtml(supplier.audit)}</span></td>
                    <td>${escapeHtml(supplier.moq)}<br /><span class="muted small">${escapeHtml(supplier.leadTime)}</span></td>
                    <td>${pill(supplier.status, supplier.status === "准入可用" ? "ok" : "watch")}<br /><span class="muted small">风险：${escapeHtml(supplier.risk)}</span></td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>SKU 绑定规则</h3>
            <p>开发端只选择供应商，不重复录入资质；查看 SKU 配对时直接回到这里取厂商资料。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="timeline">
            ${[
              ["厂商分类", "按剂型、适配类目、国家、资质状态分类管理。", "资料库"],
              ["固定资质", "FDA、GMP、HACCP、ISO、联系人、MOQ、交期只维护一次。", "复用"],
              ["SKU 绑定", "新品审批选择供应商后，审批卡自动显示资质和 COA 状态。", "立项"],
              ["批次补证", "正式入库时补充该 SKU 对应批次 COA、检测报告和批次追踪。", "入库"],
              ["风险提示", "资料待补或高风险厂商会在 SKU 配对和下单前提醒。", "预警"],
            ]
              .map(
                (step, index) => `
                  <div class="timeline-step">
                    <span class="step-index">${index + 1}</span>
                    <div>
                      <strong>${step[0]}</strong>
                      <p class="muted small">${step[1]}</p>
                    </div>
                    ${pill(step[2], step[2] === "必填" ? "danger" : "watch")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>当前 SKU 供应商配对</h3>
            <p>立项审批里选过供应商的 SKU，会自动回写到这里，方便其他人查资料。</p>
          </div>
        </div>
        <div class="panel-body">
          ${(state.approvalCases || [])
            .filter((item) => item.supplierId)
            .map(
              (item) => {
                const supplier = getSupplier(item.supplierId);
                return `
              <div class="directory-row">
                <strong class="mono">${escapeHtml(item.sku)}</strong>
                <p>${escapeHtml(item.title)}：${escapeHtml(supplierStatusLine(supplier))}</p>
                ${pill(supplier?.status || "待绑定", supplier?.status === "准入可用" ? "ok" : "watch")}
              </div>
            `;
              },
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderLabelScore() {
  const last = state.labelReviews[0];
  const selectedBrand = last?.brand || "Aeasynapa";
  return `
    <div class="module-grid reverse">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>标签评分记录</h3>
            <p>评分 85 分及以上进入生产，70-84 返修，低于 70 停审。</p>
          </div>
        </div>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>编号</th>
                <th>SKU</th>
                <th>品牌 / 类目</th>
                <th>分数</th>
                <th>状态</th>
                <th>建议</th>
              </tr>
            </thead>
            <tbody>
              ${state.labelReviews
                .map(
                  (item) => `
                    <tr>
                      <td>${escapeHtml(item.id)}</td>
                      <td class="mono">${escapeHtml(item.sku || "未绑定")}</td>
                      <td>${escapeHtml(item.brand)}<br /><span class="muted small">${escapeHtml(item.category)}</span></td>
                      <td><strong>${item.score}</strong></td>
                      <td>${pill(item.status)}</td>
                      <td>${escapeHtml(item.suggestion)}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>新配方标签评分</h3>
            <p>根据品牌风格、配方分类、宣称风险和标签完整度给出上线建议。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="labelForm" class="form-grid single">
            <label>SKU
              <select name="sku">
                <option value="">未绑定 SKU</option>
                ${getLatestSkuRecords().map((item) => `<option value="${item.code}">${item.code} - ${item.productName}</option>`).join("")}
              </select>
            </label>
            <label>品牌
              <select name="brand" id="labelBrand">
                ${Object.keys(brandStyles).map((brand) => `<option ${brand === selectedBrand ? "selected" : ""}>${brand}</option>`).join("")}
              </select>
            </label>
            <label>配方
              <textarea name="formula" placeholder="输入配方，系统会匹配类目和风格"></textarea>
            </label>
            <label>正面宣称
              <textarea name="claim" placeholder="例如 Supports daily immune wellness"></textarea>
            </label>
            <label>
              <input name="facts" type="checkbox" checked />
              包含 Supplement Facts / 批号 / 保质期 / 警示语
            </label>
            <div class="form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">✓</span>评分并入库</button>
            </div>
          </form>
          <div id="labelScoreResult" class="result-box" style="margin-top: 14px;"></div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>品牌风格模板与定位</h3>
          <p>新配方标签沿用品牌 x 类目统一风格，区分 Amazon 品牌化和辅助平台测品策略。</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="module-grid">
          <div class="label-preview" id="labelPreview">
            ${renderLabelPreview(selectedBrand, "Daily Wellness", "统一成分层级、剂量信息和合规警示，生产前通过 AI 评分闸口。")}
          </div>
          <div>
            ${Object.entries(brandStyles)
              .map(
                ([brand, style]) => `
                  <div class="directory-row">
                    <strong>${brand}</strong>
                    <p>${style.line}：${style.promise}<br /><span class="muted">${style.tone}</span></p>
                    <span>
                      <span class="style-swatches">
                        ${style.colors.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
                      </span>
                    </span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>品牌 x 类目矩阵</h3>
          <p>开发员只换配方、规格和卖点，不随意改版式；系统检查品牌色、类目风格、关键信息、平台禁词和一致性评分。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>类目</th>
              <th>Aeasynapa</th>
              <th>VecNythra</th>
              <th>CeuRioint</th>
              <th>标签统一重点</th>
            </tr>
          </thead>
          <tbody>
            ${brandCategoryMatrix
              .map(
                (row) => `
                  <tr>
                    <td><strong>${escapeHtml(row[0])}</strong></td>
                    <td>${escapeHtml(row[1])}</td>
                    <td>${escapeHtml(row[2])}</td>
                    <td>${escapeHtml(row[3])}</td>
                    <td>${escapeHtml(row[4])}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLabelPreview(brand, productLine, copy) {
  const style = brandStyles[brand] || brandStyles.Aeasynapa;
  return `
    <div class="label-top" style="background:${style.colors[0]}">
      <span class="label-name">${escapeHtml(brand)}</span>
      <span class="label-category">${escapeHtml(style.line)}</span>
    </div>
    <div class="label-middle">
      <strong>${escapeHtml(productLine)}</strong>
      <p>${escapeHtml(copy)}</p>
      <div class="style-swatches">
        ${style.colors.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
      </div>
    </div>
    <div class="label-bottom">
      <span>Supplement Facts</span>
      <span>Lot / Expiry</span>
      <span>Warning</span>
    </div>
  `;
}

function renderInbound() {
  const lots = [...state.lots].sort((a, b) => b.inboundDate.localeCompare(a.inboundDate));
  return `
    ${renderMetricRow([
      { label: "海外仓", value: "US-01", note: "一个仓，全平台共享实物库存" },
      { label: "主料号", value: "不变", note: "同配方、同标签规格统一料号" },
      { label: "总库存", value: formatNumber(lots.reduce((sum, lot) => sum + Number(lot.qty || 0), 0)), note: "含红线批次" },
      { label: "出库策略", value: "FEFO", note: "先到期先出库" },
    ])}
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>新增入库批次</h3>
            <p>有效期按生产日期自动加 2 年，入库即绑定库位和保管条件。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="inboundForm" class="form-grid">
            <label>SKU
              <select name="sku">
                ${getLatestSkuRecords().map((item) => `<option value="${item.code}">${item.code} - ${item.productName}</option>`).join("")}
              </select>
            </label>
            <label>批次号
              <input name="lotId" placeholder="例如 LOT-XXX-2607A" required />
            </label>
            <label>主料号
              <input name="materialId" placeholder="例如 S0003239" />
            </label>
            <label>入库数量
              <input name="qty" type="number" min="1" value="1000" required />
            </label>
            <label>生产日期
              <input name="mfgDate" type="date" value="2026-06-20" required />
            </label>
            <label>入库日期
              <input name="inboundDate" type="date" value="2026-07-03" required />
            </label>
            <label>库位
              <input name="location" placeholder="例如 A-01-02-B03" required />
            </label>
            <label>温度 C
              <input name="temp" type="number" min="0" value="22" required />
            </label>
            <label>湿度 %
              <input name="humidity" type="number" min="0" value="48" required />
            </label>
            <label class="field-span">保管要求
              <input name="preservation" value="常温避光，密封防潮" />
            </label>
            <div class="field-span form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">+</span>登记入库批次</button>
            </div>
          </form>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>批次编码与入库闸口</h3>
            <p>主料号保持不变，库存按批次管理；仓库收货时同步建立效期与库位记录。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="timeline">
            ${[
              ["主料号", "例如 S0003239，对应同一配方、同一标签规格。", "不变"],
              ["批次号", "例如 S0003239-B202604，表示该料号 2026 年 4 月生产/入库批次。", "分批"],
              ["效期判断", "优先读取到期日期；没有到期日期时，用生产日期 + 24 个月推算。", "24月"],
              ["库存策略", "同料号多个批次分开库存，按 FEFO 先消耗临近到期批次。", "FEFO"],
              ["库位保管", "记录温湿度、避光、防潮和外箱完整性。", "仓储"],
            ]
              .map(
                (step, index) => `
                  <div class="timeline-step">
                    <span class="step-index">${index + 1}</span>
                    <div>
                      <strong>${step[0]}</strong>
                      <p class="muted small">${step[1]}</p>
                    </div>
                    ${pill(step[2], "info")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>批次库存与库位</h3>
          <p>同一 SKU 可有多个批次和库位，后续按 FEFO 消耗。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>批次</th>
              <th>主料号</th>
              <th>SKU / 产品</th>
              <th>数量</th>
              <th>库位</th>
              <th>生产 / 有效期</th>
              <th>效期状态</th>
              <th>保管环境</th>
            </tr>
          </thead>
          <tbody>
            ${lots
              .map((lot) => {
                const shelf = shelfStatus(lot);
                const condition = conditionStatus(lot.temp, lot.humidity);
                return `
                  <tr>
                    <td class="mono">${escapeHtml(lot.lotId)}</td>
                    <td class="mono">${escapeHtml(lot.materialId || "")}</td>
                    <td><span class="mono">${escapeHtml(lot.sku)}</span><br /><span class="muted small">${escapeHtml(lot.productName)}</span></td>
                    <td>${formatNumber(lot.qty)}</td>
                    <td>${escapeHtml(currentLocation(lot.lotId))}<br /><span class="muted small">${escapeHtml(lot.zone)}</span></td>
                    <td>${escapeHtml(lot.mfgDate)}<br /><span class="muted small">EXP ${escapeHtml(lot.expDate)}</span></td>
                    <td>${pill(shelf.label, shelf.tone)}<br /><span class="muted small">${shelf.action}</span></td>
                    <td>${pill(condition.label, condition.tone)}<br /><span class="muted small">${lot.temp}C / ${lot.humidity}%</span></td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLocationCare() {
  const locations = aggregateLocations();
  return `
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>库位保管检查</h3>
            <p>膳食产品有效期 2 年，库位必须看温湿度、避光、防潮和红线批次。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="locationCheckForm" class="form-grid">
            <label>库位
              <input name="location" list="locationList" placeholder="例如 A-01-02-B03" required />
              <datalist id="locationList">
                ${Array.from(new Set(state.lots.map((lot) => currentLocation(lot.lotId))))
                  .map((loc) => `<option value="${loc}"></option>`)
                  .join("")}
              </datalist>
            </label>
            <label>检查结果
              <select name="result">
                <option>合格</option>
                <option>关注</option>
                <option>异常</option>
              </select>
            </label>
            <label>温度 C
              <input name="temp" type="number" value="22" />
            </label>
            <label>湿度 %
              <input name="humidity" type="number" value="48" />
            </label>
            <label class="field-span">保管动作
              <input name="action" placeholder="例如 更换干燥剂 / 移入待消耗区 / 复核外箱密封" />
            </label>
            <div class="field-span form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">+</span>追加检查记录</button>
            </div>
          </form>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>移库记录</h3>
            <p>移库采用追加日志，保留旧库位轨迹。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="moveForm" class="form-grid single">
            <label>批次
              <select name="lotId">
                ${state.lots.map((lot) => `<option value="${lot.lotId}">${lot.lotId} - ${lot.sku}</option>`).join("")}
              </select>
            </label>
            <label>新库位
              <input name="to" placeholder="例如 C-01-01-A01" required />
            </label>
            <label>原因
              <input name="note" placeholder="例如 效期超过 12 个月，移至待消耗区" />
            </label>
            <div class="form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">→</span>追加移库</button>
            </div>
          </form>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>库位地图</h3>
          <p>红线批次和环境异常会直接影响共享货盘可售量。</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="location-grid">
          ${locations
            .map(
              (loc) => `
                <div class="location-cell">
                  <strong>${escapeHtml(loc.location)}</strong>
                  <p>批次 ${loc.lots} 个 / 数量 ${formatNumber(loc.qty)}</p>
                  <p>红线或消耗 ${formatNumber(loc.redQty)}</p>
                  ${pill(loc.status.label, loc.status.tone)}
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>最近保管与移库记录</h3>
          <p>所有检查和移库都追加到历史，不删除旧数据。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>时间</th>
              <th>类型</th>
              <th>对象</th>
              <th>结果 / 动作</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ...state.locationChecks.map((item) => ({
                time: item.time,
                type: "保管检查",
                object: item.location,
                result: item.result,
                detail: `${item.temp}C / ${item.humidity}%：${item.action}`,
              })),
              ...state.movementLog.map((item) => ({
                time: item.time,
                type: "移库",
                object: item.lotId,
                result: `${item.from} -> ${item.to}`,
                detail: item.note,
              })),
            ]
              .sort((a, b) => b.time.localeCompare(a.time))
              .slice(0, 12)
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.time)}</td>
                    <td>${escapeHtml(item.type)}</td>
                    <td class="mono">${escapeHtml(item.object)}</td>
                    <td>${pill(item.result, statusTone(item.result))}</td>
                    <td>${escapeHtml(item.detail)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function aggregateLocations() {
  const result = new Map();
  state.lots.forEach((lot) => {
    const location = currentLocation(lot.lotId);
    const current = result.get(location) || {
      location,
      lots: 0,
      qty: 0,
      redQty: 0,
      status: { label: "保管合格", tone: "ok" },
    };
    const shelf = shelfStatus(lot);
    const condition = conditionStatus(lot.temp, lot.humidity);
    current.lots += 1;
    current.qty += Number(lot.qty || 0);
    if (shelf.tone !== "ok") current.redQty += Number(lot.qty || 0);
    if (condition.tone === "danger" || shelf.tone === "danger") current.status = { label: "需要处理", tone: "danger" };
    else if (condition.tone === "watch" || shelf.tone === "watch") current.status = { label: "重点巡检", tone: "watch" };
    result.set(location, current);
  });
  return Array.from(result.values()).sort((a, b) => a.location.localeCompare(b.location));
}

function renderShelfLife() {
  const rows = [...state.lots]
    .map((lot) => ({ ...lot, shelf: shelfStatus(lot) }))
    .sort((a, b) => a.shelf.remainingDays - b.shelf.remainingDays);
  const watchRows = rows.filter((row) => row.shelf.tone !== "ok");
  const redQty = watchRows.reduce((sum, row) => sum + Number(row.qty || 0), 0);
  return `
    ${renderMetricRow([
      { label: "效期关注批次", value: watchRows.length, note: "生产超过 12 个月或剩余效期不足 12 个月" },
      { label: "关注库存", value: formatNumber(redQty), note: "需要渠道消耗计划" },
      { label: "最短剩余", value: `${Math.min(...rows.map((row) => row.shelf.remainingDays))} 天`, note: "按批次 FEFO 计算" },
      { label: "规则", value: "24 个月", note: "生产日期 + 2 年有效期" },
    ])}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>保质期红线规则</h3>
          <p>膳食类目按生产日期管理：超过 12 个月尽快消耗，剩余 6 个月或生产超过 18 个月进入红线。</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="timeline">
          ${[
            ["0-12 个月", "新鲜可售，正常进入共享货盘。", "正常"],
            ["13-18 个月", "尽快消耗，运营做渠道倾斜、组合装、折扣计划。", "关注"],
            ["19-24 个月", "效期红线，限制补货，FEFO 优先出库。", "红线"],
            ["超过 24 个月", "过期锁定，不进入可售库存。", "锁定"],
          ]
            .map(
              (step, index) => `
                <div class="timeline-step">
                  <span class="step-index">${index + 1}</span>
                  <div>
                    <strong>${step[0]}</strong>
                    <p class="muted small">${step[1]}</p>
                  </div>
                  ${pill(step[2])}
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>效期红线 SKU</h3>
          <p>这里不是按 SKU 粗略提醒，而是按批次、库位、剩余天数定位责任动作。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>优先级</th>
              <th>批次 / SKU</th>
              <th>库位</th>
              <th>库存</th>
              <th>已生产</th>
              <th>剩余效期</th>
              <th>动作</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td><span class="mono">${escapeHtml(row.lotId)}</span><br /><span class="mono muted small">${escapeHtml(row.sku)}</span></td>
                    <td>${escapeHtml(currentLocation(row.lotId))}</td>
                    <td>${formatNumber(row.qty)}</td>
                    <td>${row.shelf.ageMonths} 个月</td>
                    <td>${row.shelf.remainingDays} 天<br />${pill(row.shelf.label, row.shelf.tone)}</td>
                    <td>${escapeHtml(row.shelf.action)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPallet() {
  const rows = aggregateInventory();
  const totalQty = rows.reduce((sum, row) => sum + row.qty, 0);
  const totalAvailable = rows.reduce((sum, row) => sum + row.available, 0);
  return `
    ${renderMetricRow([
      { label: "海外仓", value: "US-01", note: "一个实物库存池" },
      { label: "总库存", value: formatNumber(totalQty), note: "按批次汇总" },
      { label: "可售库存", value: formatNumber(totalAvailable), note: "扣除平台虚拟占用" },
      { label: "共享平台", value: platformNames.length, note: platformNames.join(" / ") },
    ])}
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>平台占用登记</h3>
            <p>平台不拆实物仓，只追加虚拟占用记录，保持一个海外仓货盘。</p>
          </div>
        </div>
        <div class="panel-body">
          <form id="reserveForm" class="form-grid">
            <label>批次
              <select name="lotId">
                ${state.lots.map((lot) => `<option value="${lot.lotId}">${lot.lotId} - ${lot.sku}</option>`).join("")}
              </select>
            </label>
            <label>平台
              <select name="platform">
                ${platformNames.map((platform) => `<option>${platform}</option>`).join("")}
              </select>
            </label>
            <label>占用数量
              <input name="qty" type="number" min="1" value="100" required />
            </label>
            <label>原因
              <select name="reason">
                <option>首发上架</option>
                <option>活动备货</option>
                <option>效期消耗</option>
                <option>渠道补货</option>
              </select>
            </label>
            <div class="field-span form-actions">
              <button class="primary-button" type="submit"><span class="button-icon">+</span>追加平台占用</button>
            </div>
          </form>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>共享货盘原则</h3>
            <p>实物库存只有一个，渠道只是占用额度；效期红线优先进入高转化渠道。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="directory-map">
            ${[
              ["统一库存池", "所有平台读取 US-01 可售库存，避免重复备货和账面超卖。"],
              ["平台虚拟占用", "Amazon、速卖通、eBay、独立站、Temu 只记录占用量。"],
              ["FEFO 货盘", "生产日期早的批次优先释放给高周转平台。"],
              ["红线管控", "效期红线库存不能进入新品首发，只能进入消耗计划。"],
            ]
              .map(
                ([name, desc]) => `
                  <div class="directory-row">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                    ${pill("执行", "info")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>SKU 共享货盘</h3>
          <p>可售库存 = 实物库存 - 平台占用；红线库存会提示开发和运营调整节奏。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>产品</th>
              <th>实物库存</th>
              <th>占用合计</th>
              <th>可售</th>
              <th>平台占用</th>
              <th>库位</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map((row) => {
                const reserved = reservedBySkuAndPlatform(row.sku);
                return `
                  <tr>
                    <td class="mono">${escapeHtml(row.sku)}</td>
                    <td>${escapeHtml(row.productName)}<br /><span class="muted small">${escapeHtml(row.brand)}</span></td>
                    <td>${formatNumber(row.qty)}</td>
                    <td>${formatNumber(row.reserved)}</td>
                    <td>${pill(formatNumber(row.available), row.available > 300 ? "ok" : "watch")}</td>
                    <td>${platformNames.map((platform) => `${platform}: ${formatNumber(reserved[platform] || 0)}`).join("<br />")}</td>
                    <td>${row.locations.map(escapeHtml).join("<br />")}</td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderHeroSku() {
  const rows = heroSkuRows();
  const top = rows[0];
  const salesTotal = state.sales.reduce((sum, item) => sum + Number(item.salesAmount || 0), 0);
  return `
    ${renderMetricRow([
      { label: "Amazon H2 目标", value: "4000 万", note: "主销售目标，销售接入后拆到品牌/类目/SKU" },
      { label: "辅助平台", value: "4", note: "速卖通、eBay、独立站、Temu 用于测品和消化库存" },
      { label: "英雄 SKU", value: top?.sku || "-", note: top?.productName || "" },
      { label: "下半年目标差距", value: formatMoney(40000000 - salesTotal), note: "以 4000 万目标做缺口追踪" },
    ])}
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>英雄 SKU 输出逻辑</h3>
            <p>开发部用它决定补规格、拓品牌、换剂型或停止开品。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="timeline">
            ${[
              ["销售额", "是否能贡献目标规模，而不是只看上架数量。", "42%"],
              ["毛利", "是否能覆盖平台费、广告和海外仓成本。", "28%"],
              ["复购", "是否具备长期类目资产价值。", "18%"],
              ["库存安全", "是否有足够可售库存且效期不拖累。", "12%"],
            ]
              .map(
                (item, index) => `
                  <div class="timeline-step">
                    <span class="step-index">${index + 1}</span>
                    <div>
                      <strong>${item[0]}</strong>
                      <p class="muted small">${item[1]}</p>
                    </div>
                    ${pill(item[2], "violet")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>产品开发看什么</h3>
            <p>销售数据反推产品开发、补货和标签优化动作。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="directory-map">
            ${[
              ["卖得好", "确认是否补货、扩规格、扩口味、扩同类配方。", "扩品"],
              ["有流量不转化", "检查标签、主图、卖点、价格带和评价痛点。", "优化"],
              ["毛利低", "回到开发端优化成本、规格、供应商和组合装。", "降本"],
              ["库存压力大", "联动批次效期，决定促销、清仓或停止补货。", "清货"],
            ]
              .map(
                ([name, desc, tag]) => `
                  <div class="directory-row">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                    ${pill(tag, tag === "清货" ? "watch" : "info")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>英雄 SKU 排名</h3>
          <p>这块后续可接赛狐 ERP、Amazon、速卖通、eBay、独立站和 Temu 销售数据。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>排名</th>
              <th>SKU / 产品</th>
              <th>品牌</th>
              <th>销售额</th>
              <th>销量</th>
              <th>毛利率</th>
              <th>复购</th>
              <th>可售库存</th>
              <th>英雄分</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td><span class="mono">${escapeHtml(row.sku)}</span><br /><span class="muted small">${escapeHtml(row.productName)}</span></td>
                    <td>${escapeHtml(row.brand)}</td>
                    <td>${formatMoney(row.sales)}</td>
                    <td>${formatNumber(row.units)}</td>
                    <td>${Math.round(row.margin * 100)}%</td>
                    <td>${Math.round(row.repeat * 100)}%</td>
                    <td>${formatNumber(row.available)}</td>
                    <td>${pill(row.score, row.score >= 80 ? "ok" : row.score >= 65 ? "watch" : "info")}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDataImport() {
  return `
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>赛狐 SKU 文件上传</h3>
            <p>演示版可直接解析 CSV/TSV；XLSX 会登记为待解析任务，后续接赛狐 ERP 或 XLSX 解析服务。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="import-drop">
            <label>上传文件
              <input id="importFile" type="file" accept=".csv,.tsv,.txt,.xlsx,.xls" />
            </label>
            <div class="form-actions">
              <button id="sampleCsvBtn" class="subtle-button" type="button"><span class="button-icon">↓</span>下载 CSV 模板</button>
            </div>
            <div id="importResult" class="result-box"></div>
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>字段识别规则</h3>
            <p>上传记录只追加版本，不改旧 SKU。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="directory-map">
            ${[
              ["产品编码", "SKU、产品编码、商品编码、货号"],
              ["产品名称", "产品名称、品名、商品名称、Title"],
              ["品牌", "品牌、Brand"],
              ["配方", "配方、成分、Formula、卖点"],
              ["库存批次", "主料号、SKU、批次号、生产日期、入库日期、到期日期、供应商、仓库、库存数量"],
              ["销售数据", "平台、SKU、销售额、销量、毛利、广告费、退款、库存、在售状态"],
            ]
              .map(
                ([name, desc]) => `
                  <div class="directory-row">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                    ${pill("自动匹配", "info")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>上传历史</h3>
          <p>后续每次从赛狐导出的膳食 SKU 表都会形成一条导入批次。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>时间</th>
              <th>文件</th>
              <th>行数</th>
              <th>新增 SKU 版本</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            ${
              state.imports.length
                ? state.imports
                    .map(
                      (item) => `
                        <tr>
                          <td>${escapeHtml(item.time)}</td>
                          <td>${escapeHtml(item.fileName)}</td>
                          <td>${item.rows}</td>
                          <td>${item.created}</td>
                          <td>${pill(item.status)}</td>
                        </tr>
                      `,
                    )
                    .join("")
                : `<tr><td colspan="5"><div class="empty-state">还没有上传记录</div></td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDailyReportFor(name) {
  const tasks = dailyTaskMap[name] || [];
  return `
    <div class="result-box">
      <h4>${escapeHtml(name)} · 今日重点任务</h4>
      <p class="muted small">2026-07-03 自动生成，覆盖新品审批、合规资料、报价料号、库存效期和销售反馈。</p>
      <ul class="suggestion-list">
        ${tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderAiFlow() {
  const departmentRows = [
    ["产品开发部", "SKU 建立、配方归类、目标毛利、首单策略", "KJWG 编码通过率 / 新品毛利预测"],
    ["品牌标签中心", "品牌风格统一、标签评分、宣称降级建议", "标签评分 >=85 才可量产"],
    ["采购供应链", "供应商准入、报价、MOQ、交期、备选供应商", "证据链完整率"],
    ["质控部", "COA、检测项目、批次审核、召回预案", "批次入库合格率"],
    ["海外仓储", "入库、库位、温湿度、FEFO、效期红线", "红线批次处理时效"],
    ["运营销售", "平台占用、价格带、销售反馈、英雄 SKU", "英雄 SKU 贡献与库存健康"],
    ["数据/AI", "赛狐导入、规则模型、告警、审计日志", "流程自动化覆盖率"],
  ];
  return `
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>生成开发日报</h3>
            <p>每天选择开发人员，系统汇总新品审批、合规资料、报价、料号、库存效期和销售反馈。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="form-grid single">
            <label>选择开发人员
              <select id="developerSelect">
                ${Object.values(ownerMap).map((name) => `<option>${name}</option>`).join("")}
              </select>
            </label>
            <div class="form-actions">
              <button id="dailyReportBtn" class="primary-button" type="button"><span class="button-icon">◎</span>生成今日重点任务</button>
            </div>
          </div>
          <div id="dailyReport" style="margin-top: 14px;">${renderDailyReportFor("陈雅婷")}</div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>日报会提醒什么</h3>
            <p>不是泛泛汇报，而是把当天卡点直接推给对应负责人。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="directory-map">
            ${[
              ["新品审批", "哪些配方卡在业务、合规、报价、利润核算或建料号。"],
              ["合规资料", "哪些 SKU 缺 COA、标签信息、平台禁词检查。"],
              ["库存效期", "哪些批次需要优先消耗，哪些不能再补货。"],
              ["销售反馈", "哪些 Amazon 在售 SKU 需要补货、改标签、扩配方或淘汰。"],
            ]
              .map(
                ([name, desc]) => `
                  <div class="directory-row">
                    <strong>${name}</strong>
                    <p>${desc}</p>
                    ${pill("日报", "violet")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>膳食类目 AI 流程目录</h3>
          <p>按部门协同建立流程，而不是单点工具展示。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>部门</th>
              <th>监控内容</th>
              <th>AI 考核指标</th>
            </tr>
          </thead>
          <tbody>
            ${departmentRows
              .map(
                (row) => `
                  <tr>
                    <td><strong>${row[0]}</strong></td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
    <div class="module-grid">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>从 SKU 到销售反馈</h3>
            <p>每一步都有数据闸口和历史留痕。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="timeline">
            ${[
              ["SKU 建立审核", "编码、开发人、月份序列、配方初审、供应商绑定。"],
              ["配方与品牌匹配", "自动分类并推荐品牌风格、标签风险和证据清单。"],
              ["供应商质控", "供应商、COA、检测、成本毛利和打样记录。"],
              ["标签评分", "低于 85 分不能投入生产。"],
              ["入库库位", "批次、库位、温湿度、生产日期和 2 年有效期。"],
              ["效期消耗", "超过 12 个月进入消耗提醒，红线批次按 FEFO。"],
              ["销售复盘", "销售、毛利、复购、库存健康输出英雄 SKU。"],
            ]
              .map(
                (step, index) => `
                  <div class="timeline-step">
                    <span class="step-index">${index + 1}</span>
                    <div>
                      <strong>${step[0]}</strong>
                      <p class="muted small">${step[1]}</p>
                    </div>
                    ${pill(index < 4 ? "开发主责" : "协同", index < 4 ? "violet" : "info")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          <div>
            <h3>操作审计日志</h3>
            <p>新增、导入、移库、评分都可追踪。</p>
          </div>
        </div>
        <div class="panel-body">
          <div class="audit-log">
            ${state.auditLog
              .slice(0, 18)
              .map(
                (item) => `
                  <div class="log-item">
                    <time>${escapeHtml(item.time)}<br />${escapeHtml(item.module)}</time>
                    <div>
                      <strong>${escapeHtml(item.title)}</strong>
                      <p class="muted small">${escapeHtml(item.detail)}</p>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>赛狐与 AI 接入路线</h3>
          <p>先把文件上传和流程日报跑起来，再接赛狐 SKU / 库存 / 销售导出表，最后接 API。</p>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>阶段</th>
              <th>接入内容</th>
              <th>系统输出</th>
              <th>价值</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ["阶段 1", "文件上传", "审批流、日报、批次预警", "先把工作推进起来"],
              ["阶段 2", "赛狐 SKU / 库存 / 销售导出表", "自动更新 SKU、库存批次、销售表现", "减少手工整理"],
              ["阶段 3", "赛狐 ERP API", "每日同步商品、订单、库存、批次", "变成真实监控系统"],
              ["阶段 4", "AI 决策模型", "英雄 SKU、开品建议、风险预警、个人日报", "支撑开发效率和 Amazon 目标"],
            ]
              .map(
                (row) => `
                  <tr>
                    <td><strong>${row[0]}</strong></td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                    <td>${row[3]}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function bindModuleEvents(moduleId) {
  if (moduleId === "sku-review") bindSkuReview();
  if (moduleId === "label-score") bindLabelScore();
  if (moduleId === "inbound") bindInbound();
  if (moduleId === "location-care") bindLocationCare();
  if (moduleId === "pallet") bindPallet();
  if (moduleId === "data-import") bindDataImport();
  if (moduleId === "ai-flow") bindAiFlow();
}

function bindSkuReview() {
  const parser = document.getElementById("skuParserInput");
  const renderParser = () => {
    const result = parseSku(parser.value);
    document.getElementById("skuParserResult").innerHTML = result.valid
      ? `
        <h4>${pill("结构有效", "ok")}</h4>
        <p><strong>开发人：</strong>${result.ownerCode} - ${result.owner}</p>
        <p><strong>立项年月：</strong>${result.year}-${result.month}；<strong>月度序号：</strong>${result.sequence}</p>
        <p><strong>规格/料号后缀：</strong>${escapeHtml(result.suffix)}</p>
      `
      : `<h4>${pill("结构异常", "danger")}</h4><p>${escapeHtml(result.message)}</p>`;
  };
  parser.addEventListener("input", renderParser);
  renderParser();

  document.getElementById("skuForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const monthValue = form.get("month");
    const [year, month] = monthValue.split("-");
    const ownerCode = form.get("ownerCode");
    const monthlyCodes = new Set(
      state.skuReviews.filter((item) => item.year === year && item.month === month).map((item) => item.code),
    );
    const sequence = monthlyCodes.size + 1;
    const code = `KJWG${ownerCode}${year}${month}${String(sequence).padStart(2, "0")}`;
    const supplierId = String(form.get("supplierId") || "");
    const supplier = getSupplier(supplierId);
    const formula = String(form.get("formula") || "").trim();
    const classification = classifyFormula(formula);
    const score = scoreSkuAudit(formula, form.get("productName"), form.get("brand"));
    const risk = claimRisk(formula) === "高" ? "高" : classification.risk;
    const record = {
      recordId: `SKU-REV-${year.slice(2)}${month}-${String(state.skuReviews.length + 1).padStart(3, "0")}`,
      code,
      productName: String(form.get("productName") || "").trim(),
      brand: form.get("brand"),
      ownerCode,
      owner: ownerMap[ownerCode],
      year,
      month,
      sequence: String(sequence).padStart(2, "0"),
      suffix: "审核后制定",
      supplierId,
      supplierName: supplier?.name || "",
      category: classification.category,
      formula,
      status: score >= 85 ? "AI初审通过" : "跨部门复核",
      auditScore: score,
      riskLevel: risk,
      createdAt: formatDateTime(DEMO_TODAY),
      version: 1,
      source: form.get("source"),
    };
    state.skuReviews.push(record);
    const approvalId = `NP-${year}${month}-${String((state.approvalCases || []).length + 1).padStart(3, "0")}`;
    state.approvalCases.unshift({
      id: approvalId,
      title: record.productName,
      sku: code,
      materialId: "",
      supplierId,
      owner: record.owner,
      uploadedAt: formatDateTime(DEMO_TODAY),
      targetPlatform: String(form.get("targetPlatform") || "Amazon 美国站"),
      currentBlocker: score >= 85 ? "业务利润核算" : "合规评审",
      holdHours: 0,
      formula,
      firstOrderQty: Number(form.get("firstOrderQty") || 0),
      supplierQuote: String(form.get("supplierQuote") || ""),
      grossMargin: "待核算",
      status: score >= 85 ? "待利润核算" : "待合规评审",
      stages: [
        { name: "开发上传配方", state: "done", owner: record.owner, time: formatDateTime(DEMO_TODAY), note: formula || "配方待补充。" },
        { name: "AI 初审", state: "done", owner: "系统", time: formatDateTime(DEMO_TODAY), note: `${classification.category}，推荐 ${suggestBrand(classification.category)}，AI 分 ${score}。` },
        { name: "合规评审", state: score >= 85 ? "done" : "wait", owner: "桂婧", time: score >= 85 ? formatDateTime(DEMO_TODAY) : "待确认", note: score >= 85 ? "成分与宣称初审通过。" : "需复核剂量、禁词、Supplement Facts。" },
        { name: "业务审核 / 下单需求", state: score >= 85 ? "done" : "todo", owner: "陈雅婷", time: score >= 85 ? formatDateTime(DEMO_TODAY) : "未开始", note: `首单 ${form.get("firstOrderQty") || 0}，供应商 ${supplier?.name || "待选"}。` },
        { name: "开发报价", state: form.get("supplierQuote") ? "done" : "wait", owner: record.owner, time: form.get("supplierQuote") ? formatDateTime(DEMO_TODAY) : "待确认", note: String(form.get("supplierQuote") || "等待供应商报价、MOQ 和交期。") },
        { name: "业务利润核算", state: "wait", owner: "陈雅婷", time: "待确认", note: "核算平台费、广告预算和目标毛利。" },
        { name: "确认下单 / 建料号", state: "todo", owner: record.owner, time: "未开始", note: "利润核算通过后建立主料号并进入供应链批次管理。" },
      ],
    });
    addLog("新品开发审批", "新增立项与 SKU", `${approvalId} / ${code} 已建立，类目 ${classification.category}，当前卡点 ${score >= 85 ? "业务利润核算" : "合规评审"}。`);
    saveState();
    showToast(`已新增 ${approvalId} / ${code}`);
    render();
  });
}

function bindFormulaIntake() {
  document.getElementById("formulaForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formula = form.get("formula");
    const result = classifyFormula(formula);
    const brand = suggestBrand(result.category);
    document.getElementById("formulaResult").innerHTML = `
      <h4>${pill(result.category, "info")} ${pill(`风险 ${result.risk}`, statusTone(result.risk))}</h4>
      <p><strong>建议品牌：</strong>${brand}，${brandStyles[brand].line}。</p>
      <p><strong>证据清单：</strong>${result.evidence}。</p>
      <ul class="suggestion-list">
        <li>先补齐剂量和供应商规格书，再进入标签评分。</li>
        <li>首单量需结合海外仓效期消耗节奏，不只看 MOQ。</li>
        <li>${form.get("channel")} 渠道先验证价格带和关键词，再决定是否扩规格。</li>
      </ul>
    `;
  });
}

function suggestBrand(category) {
  if (["肠胃健康", "免疫支持", "基础营养"].includes(category)) return "Aeasynapa";
  if (["草本滴剂", "心脑血管", "运动营养"].includes(category)) return "VecNythra";
  if (["睡眠管理", "眼部健康", "关节健康"].includes(category)) return "CeuRioint";
  return "Aeasynapa";
}

function bindLabelScore() {
  const brandSelect = document.getElementById("labelBrand");
  const preview = document.getElementById("labelPreview");
  brandSelect.addEventListener("change", () => {
    preview.innerHTML = renderLabelPreview(brandSelect.value, "Daily Wellness", brandStyles[brandSelect.value].promise);
  });
  document.getElementById("labelForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formula = String(form.get("formula") || "");
    const claim = String(form.get("claim") || "");
    const classification = classifyFormula(formula);
    const brand = String(form.get("brand"));
    let score = 58;
    if (formula.length >= 10) score += 8;
    if (formula.match(/\d/)) score += 8;
    if (claim.length >= 8) score += 7;
    if (form.get("facts")) score += 12;
    if (brand === suggestBrand(classification.category)) score += 8;
    if (claimRisk(claim) === "高") score -= 18;
    score = Math.max(45, Math.min(96, score));
    const status = score >= 85 ? "可投入生产" : score >= 70 ? "返修" : "停审";
    const suggestion =
      score >= 85
        ? "可进入生产资料归档，保持品牌色、剂量层级和警示语位置。"
        : "需降低功效宣称强度，补足剂量、警示语、批号效期和品牌识别层级。";
    const record = {
      id: `LAB-${String(260700 + state.labelReviews.length + 1)}`,
      sku: form.get("sku"),
      brand,
      category: classification.category,
      formula,
      score,
      status,
      suggestion,
      createdAt: formatDateTime(DEMO_TODAY),
    };
    state.labelReviews.unshift(record);
    addLog("标签评分", "新增标签评分", `${record.sku || "未绑定 SKU"} 得分 ${score}，状态 ${status}。`);
    saveState();
    document.getElementById("labelScoreResult").innerHTML = `
      <div class="score-meter">
        <h4>${pill(status, statusTone(status))} 得分 ${score}</h4>
        <div class="meter-track"><div class="meter-fill" style="width:${score}%"></div></div>
        <p>${suggestion}</p>
      </div>
    `;
    showToast(`标签评分已保存：${score}`);
    setTimeout(render, 500);
  });
}

function bindInbound() {
  document.getElementById("inboundForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const sku = form.get("sku");
    const skuRecord = getLatestSkuRecords().find((item) => item.code === sku);
    const mfgDate = String(form.get("mfgDate"));
    const expDate = addYears(mfgDate, 2);
    const location = String(form.get("location")).trim().toUpperCase();
    const zone = `${location.split("-")[0] || "A"} 库区`;
    const materialId =
      String(form.get("materialId") || "").trim().toUpperCase() ||
      state.lots.find((lot) => lot.sku === sku)?.materialId ||
      `S000${4100 + state.lots.length + 1}`;
    const lot = {
      lotId: String(form.get("lotId")).trim().toUpperCase(),
      materialId,
      sku,
      productName: skuRecord?.productName || sku,
      brand: skuRecord?.brand || "",
      warehouse: "US-01 洛杉矶海外仓",
      zone,
      location,
      qty: Number(form.get("qty") || 0),
      inboundDate: String(form.get("inboundDate")),
      mfgDate,
      expDate,
      temp: Number(form.get("temp") || 0),
      humidity: Number(form.get("humidity") || 0),
      preservation: String(form.get("preservation") || ""),
      inspection: "待复核",
    };
    state.lots.push(lot);
    addLog("入库批次与库位", "新增入库批次", `${materialId} / ${lot.lotId} 入库 ${formatNumber(lot.qty)} 件，EXP ${expDate}，库位 ${location}。`);
    saveState();
    showToast(`已登记批次 ${lot.lotId}`);
    render();
  });
}

function bindLocationCare() {
  document.getElementById("locationCheckForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const location = String(form.get("location")).trim().toUpperCase();
    const record = {
      time: formatDateTime(DEMO_TODAY),
      location,
      temp: Number(form.get("temp") || 0),
      humidity: Number(form.get("humidity") || 0),
      result: String(form.get("result")),
      action: String(form.get("action") || "常规巡检"),
    };
    state.locationChecks.unshift(record);
    addLog("库位保管监控", "追加库位检查", `${location} 检查结果 ${record.result}，${record.action}。`);
    saveState();
    showToast(`已追加 ${location} 保管检查`);
    render();
  });

  document.getElementById("moveForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lotId = String(form.get("lotId"));
    const from = currentLocation(lotId);
    const to = String(form.get("to")).trim().toUpperCase();
    state.movementLog.unshift({
      time: formatDateTime(DEMO_TODAY),
      lotId,
      from,
      to,
      action: "移库",
      operator: "仓储",
      note: String(form.get("note") || "按仓储策略调整库位。"),
    });
    addLog("库位保管监控", "追加移库记录", `${lotId} 从 ${from} 移至 ${to}。`);
    saveState();
    showToast(`已追加移库：${lotId}`);
    render();
  });
}

function bindPallet() {
  document.getElementById("reserveForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lotId = String(form.get("lotId"));
    const lot = state.lots.find((item) => item.lotId === lotId);
    const qty = Number(form.get("qty") || 0);
    const already = reservedQtyForLot(lotId);
    if (lot && already + qty > lot.qty) {
      showToast("占用数量超过该批次库存，请调低数量。");
      return;
    }
    const record = {
      time: formatDateTime(DEMO_TODAY),
      lotId,
      sku: lot?.sku || "",
      platform: String(form.get("platform")),
      qty,
      reason: String(form.get("reason")),
    };
    state.reservationEvents.unshift(record);
    addLog("全平台共享货盘", "追加平台占用", `${record.platform} 占用 ${lotId} ${formatNumber(qty)} 件，用途 ${record.reason}。`);
    saveState();
    showToast("平台占用已追加");
    render();
  });
}

function bindDataImport() {
  document.getElementById("sampleCsvBtn").addEventListener("click", () => {
    const csv = [
      ["产品编码", "产品名称", "品牌", "配方", "开发人", "状态"].join(","),
      ["KJWGC20260704-90C", "Vitamin D3 K2 Capsules", "VecNythra", "D3 5000IU + K2 100mcg", "陈雅婷", "赛狐导入"].join(","),
    ].join("\n");
    downloadText("赛狐膳食SKU导入模板.csv", csv);
  });

  document.getElementById("importFile").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (["xlsx", "xls"].includes(ext)) {
      const record = {
        time: formatDateTime(DEMO_TODAY),
        fileName: file.name,
        rows: 0,
        created: 0,
        status: "XLSX 待解析",
      };
      state.imports.unshift(record);
      addLog("赛狐数据上传", "登记 XLSX 上传任务", `${file.name} 已登记，生产版接赛狐 API 或 XLSX 解析服务。`);
      saveState();
      document.getElementById("importResult").innerHTML = `<h4>${pill("已登记", "watch")}</h4><p>XLSX 已加入上传历史。演示版请使用 CSV/TSV 直接解析；生产版可接赛狐 ERP 接口。</p>`;
      renderNav();
      return;
    }
    const text = await file.text();
    const rows = parseDelimited(text);
    if (!rows.length) {
      document.getElementById("importResult").innerHTML = `<h4>${pill("解析失败", "danger")}</h4><p>文件为空或无法识别。</p>`;
      return;
    }
    const created = importSkuRows(rows);
    const record = {
      time: formatDateTime(DEMO_TODAY),
      fileName: file.name,
      rows: rows.length,
      created,
      status: "已解析",
    };
    state.imports.unshift(record);
    addLog("赛狐数据上传", "导入 SKU 文件", `${file.name} 解析 ${rows.length} 行，新增 ${created} 条 SKU 版本。`);
    saveState();
    document.getElementById("importResult").innerHTML = `<h4>${pill("导入完成", "ok")}</h4><p>解析 ${rows.length} 行，新增 ${created} 条 SKU 版本。旧记录未覆盖。</p>`;
    showToast(`导入完成：${created} 条`);
    setTimeout(render, 700);
  });
}

function parseDelimited(text) {
  const trimmed = text.replace(/^\ufeff/, "").trim();
  if (!trimmed) return [];
  const firstLine = trimmed.split(/\r?\n/)[0];
  const delimiter = firstLine.includes("\t") ? "\t" : firstLine.includes(";") ? ";" : ",";
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < trimmed.length; i += 1) {
    const char = trimmed[i];
    const next = trimmed[i + 1];
    if (char === '"' && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }
  row.push(current);
  rows.push(row);
  const headers = rows.shift().map((item) => item.trim());
  return rows
    .filter((items) => items.some((item) => item.trim()))
    .map((items) =>
      headers.reduce((acc, header, index) => {
        acc[header] = items[index] || "";
        return acc;
      }, {}),
    );
}

function pick(row, aliases) {
  const entries = Object.entries(row);
  const hit = entries.find(([key]) => aliases.some((alias) => key.toLowerCase().includes(alias.toLowerCase())));
  return hit ? hit[1] : "";
}

function importSkuRows(rows) {
  let created = 0;
  rows.forEach((row) => {
    const code = String(pick(row, ["产品编码", "SKU", "sku", "商品编码", "货号"])).trim().toUpperCase();
    if (!code) return;
    const parsed = parseSku(code);
    const formula = pick(row, ["配方", "成分", "Formula", "卖点"]);
    const brand = pick(row, ["品牌", "Brand"]) || "Aeasynapa";
    const productName = pick(row, ["产品名称", "品名", "商品名称", "Title"]) || code;
    const existingVersions = state.skuReviews.filter((item) => item.code === code).length;
    const classification = classifyFormula(formula);
    const ownerName = pick(row, ["开发人", "负责人"]) || (parsed.valid ? parsed.owner : "");
    const ownerCode =
      parsed.valid && parsed.ownerCode
        ? parsed.ownerCode
        : Object.entries(ownerMap).find(([, name]) => ownerName.includes(name))?.[0] || "C";
    state.skuReviews.push({
      recordId: `SKU-IMP-${String(state.skuReviews.length + 1).padStart(4, "0")}`,
      code,
      productName,
      brand,
      ownerCode,
      owner: ownerMap[ownerCode],
      year: parsed.valid ? parsed.year : "2026",
      month: parsed.valid ? parsed.month : "07",
      sequence: parsed.valid ? parsed.sequence : "00",
      suffix: parsed.valid ? parsed.suffix : "待补",
      category: classification.category,
      formula,
      status: pick(row, ["状态"]) || "赛狐导入待审",
      auditScore: scoreSkuAudit(formula, productName, brand),
      riskLevel: classification.risk,
      createdAt: formatDateTime(DEMO_TODAY),
      version: existingVersions + 1,
      source: "赛狐导入",
    });
    created += 1;
  });
  return created;
}

function bindAiFlow() {
  const select = document.getElementById("developerSelect");
  const button = document.getElementById("dailyReportBtn");
  const target = document.getElementById("dailyReport");
  if (!select || !button || !target) return;
  const renderReport = () => {
    target.innerHTML = renderDailyReportFor(select.value);
    addLog("经营复盘日报", "生成开发日报", `${select.value} 今日重点任务已生成。`);
    saveState();
  };
  button.addEventListener("click", renderReport);
}

function downloadText(fileName, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("moduleNav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-module]");
  if (!button) return;
  currentModule = button.dataset.module;
  window.location.hash = currentModule;
  render();
});

document.querySelector(".process-line").addEventListener("click", (event) => {
  const button = event.target.closest("[data-module]");
  if (!button) return;
  currentModule = button.dataset.module;
  window.location.hash = currentModule;
  render();
});

document.getElementById("exportJsonBtn").addEventListener("click", () => {
  downloadText("膳食AI监控台演示数据.json", JSON.stringify(state, null, 2));
});

document.getElementById("resetDemoBtn").addEventListener("click", () => {
  state = seedState();
  saveState();
  showToast("演示数据已恢复");
  render();
});

window.addEventListener("hashchange", () => {
  const next = window.location.hash.replace("#", "");
  if (moduleLookup[next] && next !== currentModule) {
    currentModule = next;
    render();
  }
});

saveState();
render();
