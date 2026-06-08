const STORAGE_KEY = "life_inspiration_helper_state_v1";

const categoryOptions = ["周末去哪", "一人食", "新手穿搭", "旅行计划", "学习入门", "情绪回血", "送礼灵感", "租房改造"];
const lifeStatusOptions = [
  { label: "有点累但想出门透气", placeholder: "比如：这个周末想一个人出去走走，但不想太累", bias: "low_energy_outdoor" },
  { label: "想一个人待着", placeholder: "比如：想找个地方安静待一下午，不想太社交", bias: "solo" },
  { label: "想拍点好看的", placeholder: "比如：想学拍照，但不知道今天可以从哪里开始", bias: "photo" },
  { label: "想找点新鲜感", placeholder: "比如：最近日子有点重复，想做个不费力的小改变", bias: "fresh" },
  { label: "想和朋友轻松约一下", placeholder: "比如：想和朋友见一面，但不要太赶太累", bias: "friends" },
  { label: "预算不高但想有仪式感", placeholder: "比如：预算不高，也想让这个周末有一点漂亮的小仪式", bias: "budget_ritual" }
];
const moodOptions = [
  "我有点累，想轻松一点",
  "我想找点新鲜感",
  "我想省钱但过得有趣",
  "我想高效完成任务",
  "我只是想被推一把",
  "我想拍点好看的照片"
];
const adjustOptions = [
  { key: "cheaper", label: "更省钱一点" },
  { key: "softer", label: "更松弛一点" },
  { key: "photo", label: "更适合拍照" },
  { key: "solo", label: "更适合独处" },
  { key: "friends", label: "更适合朋友一起" },
  { key: "rainy", label: "雨天也可以" },
  { key: "less_walk", label: "少走路" },
  { key: "ritual", label: "多一点仪式感" },
  { key: "local", label: "更像本地人玩法" }
];
const noteFilters = [
  { key: "all", label: "全部" },
  { key: "private", label: "仅自己可见" },
  { key: "selected_friends", label: "好友可见" },
  { key: "group_visible", label: "分组可见" },
  { key: "followers_visible", label: "关注可见" },
  { key: "public", label: "公开发布" },
  { key: "draft", label: "草稿" }
];
const visibilityOptions = [
  {
    key: "private",
    label: "仅自己可见",
    drawerLabel: "仅自己可见",
    text: "只保存在你的今日体验里，不会展示给别人。",
    hint: "这条笔记只会保存在你的今日体验里。",
    action: "保存笔记",
    toast: "收到啦，今天这点小小的体验已经被好好收起来了。"
  },
  {
    key: "selected_friends",
    label: "指定好友可见",
    drawerLabel: "好友可见",
    text: "只分享给你选择的人。",
    hint: "选择你想分享给谁，对方才能看到。",
    action: "分享给好友",
    toast: "收到啦，已经轻轻放到选中的好友那边。"
  },
  {
    key: "group_visible",
    label: "分组可见",
    drawerLabel: "分组可见",
    text: "只给你选好的小分组看见。",
    hint: "这条笔记只会出现在你选择的分组里。",
    action: "分享给分组",
    toast: "收到啦，已经分享给这个小分组。"
  },
  {
    key: "followers_visible",
    label: "关注我的人可见",
    drawerLabel: "关注可见",
    text: "只给关注你的人看到这条体验。",
    hint: "这条笔记会给关注你的人看见，发布前可以再检查一下。",
    action: "分享给关注的人",
    toast: "收到啦，已经分享给关注你的人。"
  },
  {
    key: "public",
    label: "公开发布",
    drawerLabel: "公开发布",
    text: "所有人都可以看到这条体验笔记。",
    hint: "分享前可以再检查一下文字和图片，别放进不想公开的信息。",
    action: "公开发布",
    toast: "收到啦，这条体验已经公开发布。"
  },
  {
    key: "draft",
    label: "先存草稿",
    drawerLabel: "草稿",
    text: "先放着，不发布，之后想好了再说。",
    hint: "这里只保存草稿，不会自动发布。",
    action: "存成草稿",
    toast: "收到啦，先替你放进草稿里。"
  }
];
const mockFriends = ["小林", "阿周", "室友", "旅行搭子", "学习搭子"];
const circleTags = ["亲近朋友", "同城搭子", "学习小组", "旅行搭子", "室友小组", "拍照同好"];
const completionOptions = ["做了一点点", "完成了一半", "基本完成", "只是收藏了想法"];
const noteMoodOptions = ["轻松了一点", "有点累但还不错", "今天很安静", "想再来一次", "没完成也没关系", "有一点点变好"];
const locationTagOptions = ["家里", "附近小店", "公园", "书店", "路上", "朋友身边", "没写地点"];
const loadingTexts = [
  "正在把模糊想法整理成小计划...",
  "正在从小红书灵感里找几个可复刻的做法...",
  "正在帮你把今天变轻一点..."
];
const judgementTexts = [
  "今天更适合做一个低消耗、容易复刻的小计划。",
  "这个想法可以先从轻量版本开始，不用把一天安排满。",
  "你现在更适合选择近一点、便宜一点、完成感更强的方案。",
  "如果状态一般，就别把计划做得太满，选一个主任务就够了。"
];

const xiaohongshuNoteData = [
  {
    id: "xhs-001",
    platform: "小红书",
    authorName: "@一个人也要出门",
    publishTime: "2天前",
    title: "一个人逛展不累的半日路线",
    excerpt: "真的不要贪多，我这次只选了一个主展区，看完去旁边咖啡店坐了40分钟，反而比打卡三四个地方舒服。",
    imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-001",
    tags: ["一人出行", "不累路线", "半日计划"],
    relatedCategory: "周末去哪",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "一人逛展",
    noteType: "一人出行"
  },
  {
    id: "xhs-002",
    platform: "小红书",
    authorName: "@低预算生活研究员",
    publishTime: "1周前",
    title: "50元以内的周末回血方式",
    excerpt: "地铁来回 8 元，咖啡 18 元，公园免费，回家路上买一束小花 15 元，整个下午都很轻。",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-002",
    tags: ["低预算", "情绪回血", "可复刻"],
    relatedCategory: "情绪回血",
    relatedMood: "我想省钱但过得有趣",
    relatedScenario: "公园路线",
    noteType: "低预算生活"
  },
  {
    id: "xhs-003",
    platform: "小红书",
    authorName: "@城市散步记录员",
    publishTime: "3天前",
    title: "不赶路的城市漫游清单",
    excerpt: "我会先找一条树多的路，再挑一家能坐下来的店。手机里只留 12 张照片，回家选 6 张就够了。",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-003",
    tags: ["城市漫游", "慢一点", "照片记录"],
    relatedCategory: "周末去哪",
    relatedMood: "我想找点新鲜感",
    relatedScenario: "周末城市漫游",
    noteType: "周末路线"
  },
  {
    id: "xhs-004",
    platform: "小红书",
    authorName: "@咖啡店角落",
    publishTime: "昨天",
    title: "低电量也能去的咖啡店独处",
    excerpt: "选不用排队的店，带一本薄书和耳机，坐 40 分钟就走。不需要假装很充实，安静一下就很好。",
    imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-004",
    tags: ["咖啡店", "独处", "低电量"],
    relatedCategory: "情绪回血",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "咖啡店独处",
    noteType: "情绪回血"
  },
  {
    id: "xhs-005",
    platform: "小红书",
    authorName: "@一人食小桌",
    publishTime: "4天前",
    title: "30元以内的一人食小仪式",
    excerpt: "便利店买饭团和热汤，回家加一个水果，用漂亮盘子装出来。不是大餐，但会觉得今天被照顾到了。",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-005",
    tags: ["一人食", "低预算", "小仪式"],
    relatedCategory: "一人食",
    relatedMood: "我想省钱但过得有趣",
    relatedScenario: "低预算一人食",
    noteType: "低预算生活"
  },
  {
    id: "xhs-006",
    platform: "小红书",
    authorName: "@书店里躲一会儿",
    publishTime: "5天前",
    title: "书店路线适合不想说话的下午",
    excerpt: "先去二楼翻画册，再在附近买一杯热饮。给自己一个规则：只买一本，不把轻松变成消费压力。",
    imageUrl: "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-006",
    tags: ["书店", "独处", "安静下午"],
    relatedCategory: "周末去哪",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "书店路线",
    noteType: "周末路线"
  },
  {
    id: "xhs-007",
    platform: "小红书",
    authorName: "@租房也有光",
    publishTime: "2周前",
    title: "出租屋氛围角不用大改",
    excerpt: "只换了台灯、床头布和收纳篮，花费不到 120。最有用的是先收掉杂物，房间立刻轻了很多。",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-007",
    tags: ["出租屋", "氛围角", "小预算"],
    relatedCategory: "租房改造",
    relatedMood: "我想省钱但过得有趣",
    relatedScenario: "出租屋改造",
    noteType: "租房改造"
  },
  {
    id: "xhs-008",
    platform: "小红书",
    authorName: "@生日礼物慢慢挑",
    publishTime: "6天前",
    title: "预算不高但很用心的生日礼物",
    excerpt: "我会选一个日常会用到的小东西，再写三张具体小卡片。礼物不贵，但朋友说最喜欢那些被记住的细节。",
    imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-008",
    tags: ["送礼", "低预算", "朋友生日"],
    relatedCategory: "送礼灵感",
    relatedMood: "我想省钱但过得有趣",
    relatedScenario: "朋友生日礼物",
    noteType: "低预算生活"
  },
  {
    id: "xhs-009",
    platform: "小红书",
    authorName: "@新手拍照慢慢来",
    publishTime: "今天",
    title: "新手拍照先练三个角度",
    excerpt: "不要一开始学太多参数，先练窗边侧光、低机位、留白。每次只拍一个主题，进步会更明显。",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-009",
    tags: ["新手拍照", "留白", "光线"],
    relatedCategory: "学习入门",
    relatedMood: "我想拍点好看的照片",
    relatedScenario: "新手拍照",
    noteType: "穿搭拍照"
  },
  {
    id: "xhs-010",
    platform: "小红书",
    authorName: "@衣柜清爽一点",
    publishTime: "1周前",
    title: "新手穿搭从三套固定组合开始",
    excerpt: "先别买一堆新衣服。找出白上衣、直筒裤、外套，固定三套能出门的组合，早上会省很多力气。",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-010",
    tags: ["新手穿搭", "衣柜整理", "省力"],
    relatedCategory: "新手穿搭",
    relatedMood: "我想高效完成任务",
    relatedScenario: "新手穿搭",
    noteType: "穿搭拍照"
  },
  {
    id: "xhs-011",
    platform: "小红书",
    authorName: "@30分钟学习桌",
    publishTime: "3天前",
    title: "学习入门别把计划写太满",
    excerpt: "我只做三件事：找一个入门视频、记五个关键词、写一个明天能继续的问题。这样更容易真的开始。",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-011",
    tags: ["学习入门", "30分钟", "开始就好"],
    relatedCategory: "学习入门",
    relatedMood: "我只是想被推一把",
    relatedScenario: "学习入门",
    noteType: "学习入门"
  },
  {
    id: "xhs-012",
    platform: "小红书",
    authorName: "@短途旅行不赶场",
    publishTime: "2周前",
    title: "一天短途旅行只选一个地方",
    excerpt: "早上出发，午后到目的地附近走走，傍晚回程。只选一个主地点，路上反而会更舒服。",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-012",
    tags: ["短途旅行", "不赶场", "低消耗"],
    relatedCategory: "旅行计划",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "短途旅行",
    noteType: "周末路线"
  },
  {
    id: "xhs-013",
    platform: "小红书",
    authorName: "@低预算刷新日",
    publishTime: "8天前",
    title: "不用花大钱也能换个心情",
    excerpt: "换床单、整理桌面、买一支便宜花、晚上泡脚。预算 60 左右，但房间和人都会松下来。",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-013",
    tags: ["低预算", "生活刷新", "居家"],
    relatedCategory: "情绪回血",
    relatedMood: "我想省钱但过得有趣",
    relatedScenario: "低预算生活刷新",
    noteType: "情绪回血"
  },
  {
    id: "xhs-014",
    platform: "小红书",
    authorName: "@睡前把灯调暗",
    publishTime: "5天前",
    title: "睡前30分钟情绪回血",
    excerpt: "关掉大灯，只留台灯。热水洗脸，写一句今天舒服的瞬间。没发生大事也可以，今天平安就很好。",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-014",
    tags: ["睡前", "情绪回血", "安静"],
    relatedCategory: "情绪回血",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "居家情绪回血",
    noteType: "情绪回血"
  },
  {
    id: "xhs-015",
    platform: "小红书",
    authorName: "@房间慢慢变好看",
    publishTime: "1个月前",
    title: "房间氛围感先从一个角落开始",
    excerpt: "不要一次改全屋，先选床头或书桌。清空、加灯、放一张照片，拍照看起来就会干净很多。",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-015",
    tags: ["房间氛围", "小角落", "可复刻"],
    relatedCategory: "租房改造",
    relatedMood: "我想拍点好看的照片",
    relatedScenario: "房间氛围感",
    noteType: "租房改造"
  },
  {
    id: "xhs-016",
    platform: "小红书",
    authorName: "@公园长椅计划",
    publishTime: "9天前",
    title: "公园路线比热门点更舒服",
    excerpt: "找一个有树荫和长椅的公园，带水和小点心。走累了就坐，不需要把每条路都走完。",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=80",
    sourceUrl: "https://example.com/xhs/note-016",
    tags: ["公园", "低消耗", "一人出门"],
    relatedCategory: "周末去哪",
    relatedMood: "我有点累，想轻松一点",
    relatedScenario: "公园路线",
    noteType: "周末路线"
  }
];

const defaultState = {
  currentInput: "",
  selectedLifeStatus: lifeStatusOptions[0].label,
  selectedMood: moodOptions[0],
  selectedCategory: categoryOptions[0],
  xiaohongshuNoteData,
  generatedPlans: [],
  savedPlans: [],
  historyRecords: [],
  checklistState: {},
  experienceNotes: [],
  noteDrafts: {},
  draftUndoMarks: {},
  undoStack: [],
  resultMode: "idle",
  selectedPlanId: "",
  activeNoteFilter: "all",
  judgement: ""
};

let appState = loadState();

const dom = {
  form: document.querySelector("#inspirationForm"),
  input: document.querySelector("#ideaInput"),
  lifeStatusPills: document.querySelector("#lifeStatusPills"),
  categoryPills: document.querySelector("#categoryPills"),
  moodPills: document.querySelector("#moodPills"),
  generateButton: document.querySelector("#generateButton"),
  loadingPanel: document.querySelector("#loadingPanel"),
  loadingText: document.querySelector("#loadingText"),
  resultSection: document.querySelector("#resultSection"),
  resultJudgement: document.querySelector("#resultJudgement"),
  plansGrid: document.querySelector("#plansGrid"),
  adjustActions: document.querySelector("#adjustActions"),
  regenerateButton: document.querySelector("#regenerateButton"),
  undoButton: document.querySelector("#undoButton"),
  historyButton: document.querySelector("#historyButton"),
  savedButton: document.querySelector("#savedButton"),
  notesButton: document.querySelector("#notesButton"),
  noteImageInput: document.querySelector("#noteImageInput"),
  savedPlansList: document.querySelector("#savedPlansList"),
  historyList: document.querySelector("#historyList"),
  experienceNotesList: document.querySelector("#experienceNotesList"),
  noteFilters: document.querySelector("#noteFilters"),
  toastStack: document.querySelector("#toastStack")
};

init();

function init() {
  renderPills();
  renderAdjustActions();
  renderNoteFilters();
  bindEvents();
  hydrateFromState();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredCloneSafe(defaultState);
    return {
      ...structuredCloneSafe(defaultState),
      ...saved,
      xiaohongshuNoteData
    };
  } catch {
    return structuredCloneSafe(defaultState);
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  dom.undoButton.disabled = appState.undoStack.length === 0;
  renderChromeStatus();
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function createSnapshot() {
  const snapshot = structuredCloneSafe(appState);
  snapshot.undoStack = [];
  return snapshot;
}

function pushUndo() {
  appState.undoStack.push(createSnapshot());
  if (appState.undoStack.length > 30) appState.undoStack.shift();
  persistState();
}

function restoreSnapshot(snapshot) {
  appState = {
    ...structuredCloneSafe(defaultState),
    ...snapshot,
    xiaohongshuNoteData,
    undoStack: appState.undoStack
  };
  persistState();
  hydrateFromState();
}

function hydrateFromState() {
  dom.input.value = appState.currentInput || "";
  renderPills();
  renderResults();
  renderSavedPlans();
  renderHistory();
  renderNoteFilters();
  renderExperienceNotes();
  renderChromeStatus();
  dom.undoButton.disabled = appState.undoStack.length === 0;
}

function renderChromeStatus() {
  dom.historyButton.innerHTML = `生成记录${renderCountBadge(appState.historyRecords.length)}`;
  dom.savedButton.innerHTML = `灵感盒子${renderCountBadge(appState.savedPlans.length)}`;
  dom.notesButton.innerHTML = `今日体验${renderCountBadge(appState.experienceNotes.length)}`;
}

function renderCountBadge(count) {
  return count ? `<span class="count-badge">${count}</span>` : "";
}

function renderPills() {
  dom.lifeStatusPills.innerHTML = lifeStatusOptions.map((item) => `
    <button class="pill ${appState.selectedLifeStatus === item.label ? "is-active" : ""}" type="button" data-life-status="${escapeAttr(item.label)}">${item.label}</button>
  `).join("");
  const activeStatus = getLifeStatus(appState.selectedLifeStatus);
  dom.input.placeholder = activeStatus.placeholder;
  dom.categoryPills.innerHTML = categoryOptions.map((item) => `
    <button class="pill ${appState.selectedCategory === item ? "is-active" : ""}" type="button" data-category="${escapeAttr(item)}">${item}</button>
  `).join("");
  dom.moodPills.innerHTML = moodOptions.map((item) => `
    <button class="pill ${appState.selectedMood === item ? "is-active" : ""}" type="button" data-mood="${escapeAttr(item)}">${item}</button>
  `).join("");
}

function getLifeStatus(label) {
  return lifeStatusOptions.find((item) => item.label === label) || lifeStatusOptions[0];
}

function renderAdjustActions() {
  dom.adjustActions.innerHTML = adjustOptions.map((item) => `
    <button class="mini-button" type="button" data-adjust="${item.key}">${item.label}</button>
  `).join("");
}

function renderNoteFilters() {
  dom.noteFilters.innerHTML = noteFilters.map((item) => `
    <button class="pill ${appState.activeNoteFilter === item.key ? "is-active" : ""}" type="button" data-note-filter="${item.key}">${item.label}</button>
  `).join("");
}

function bindEvents() {
  dom.form.addEventListener("submit", handleGenerate);
  dom.regenerateButton.addEventListener("click", () => runGeneration("regen"));
  dom.lifeStatusPills.addEventListener("click", (event) => {
    const button = event.target.closest("[data-life-status]");
    if (!button) return;
    appState.selectedLifeStatus = button.dataset.lifeStatus;
    const status = getLifeStatus(appState.selectedLifeStatus);
    if (!dom.input.value.trim()) dom.input.placeholder = status.placeholder;
    persistState();
    renderPills();
  });
  dom.categoryPills.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    appState.selectedCategory = button.dataset.category;
    persistState();
    renderPills();
  });
  dom.moodPills.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood]");
    if (!button) return;
    appState.selectedMood = button.dataset.mood;
    persistState();
    renderPills();
  });
  dom.adjustActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-adjust]");
    if (!button) return;
    adjustPlans(button.dataset.adjust);
  });
  dom.plansGrid.addEventListener("click", handlePlanClick);
  dom.plansGrid.addEventListener("change", handlePlanChange);
  dom.plansGrid.addEventListener("input", handlePlanInput);
  dom.undoButton.addEventListener("click", undoLastStep);
  document.querySelectorAll("[data-drawer]").forEach((button) => {
    button.addEventListener("click", () => openDrawer(button.dataset.drawer));
  });
  document.querySelectorAll("[data-close-drawer]").forEach((button) => {
    button.addEventListener("click", closeDrawers);
  });
  document.querySelectorAll(".drawer").forEach((drawer) => {
    drawer.addEventListener("click", (event) => {
      if (event.target === drawer) closeDrawers();
    });
  });
  dom.savedPlansList.addEventListener("click", handleSavedClick);
  dom.historyList.addEventListener("click", handleHistoryClick);
  dom.noteFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-note-filter]");
    if (!button) return;
    appState.activeNoteFilter = button.dataset.noteFilter;
    persistState();
    renderNoteFilters();
    renderExperienceNotes();
  });
  dom.noteImageInput.addEventListener("change", handleImageUpload);
}

function handleGenerate(event) {
  event.preventDefault();
  runGeneration("generate");
}

function runGeneration(mode) {
  const input = dom.input.value.trim();
  if (!input) {
    showToast("先告诉我你想解决什么小问题");
    dom.input.focus();
    return;
  }

  pushUndo();
  appState.currentInput = input;
  appState.resultMode = "loading";
  dom.loadingText.textContent = randomFrom(loadingTexts);
  dom.loadingPanel.classList.remove("is-hidden");
  dom.resultSection.classList.add("is-hidden");
  dom.generateButton.disabled = true;
  dom.generateButton.classList.add("is-loading");
  dom.regenerateButton.disabled = true;
  persistState();

  window.setTimeout(() => {
    const notes = fetchXiaohongshuNotes(input);
    appState.generatedPlans = generateInspirationPlans(input, appState.selectedMood, appState.selectedCategory, notes, mode, appState.selectedLifeStatus);
    appState.judgement = chooseJudgement(input, appState.selectedMood);
    appState.resultMode = "ready";
    appState.historyRecords.unshift({
      id: createId("history"),
      input,
      selectedLifeStatus: appState.selectedLifeStatus,
      selectedMood: appState.selectedMood,
      selectedCategory: appState.selectedCategory,
      tuningTrail: [],
      finalPlanTitle: appState.generatedPlans[0]?.title || "",
      judgement: appState.judgement,
      generatedPlans: structuredCloneSafe(appState.generatedPlans),
      createdAt: new Date().toISOString()
    });
    appState.historyRecords = appState.historyRecords.slice(0, 12);
    dom.loadingPanel.classList.add("is-hidden");
    dom.generateButton.disabled = false;
    dom.generateButton.classList.remove("is-loading");
    dom.regenerateButton.disabled = false;
    persistState();
    renderResults();
    renderHistory();
    showToast(mode === "regen" ? "换好了一组新的灵感" : "整理好了，挑一个轻一点的开始吧");
  }, 850);
}

function fetchXiaohongshuNotes(query) {
  const lower = query.toLowerCase();
  return appState.xiaohongshuNoteData
    .map((note) => {
      const text = [note.title, note.excerpt, note.relatedCategory, note.relatedMood, note.relatedScenario, note.noteType, ...note.tags].join(" ").toLowerCase();
      let score = 0;
      if (note.relatedCategory === appState.selectedCategory) score += 4;
      if (note.relatedMood === appState.selectedMood) score += 3;
      if (text.includes(lower)) score += 3;
      lower.split(/\s+|，|。|、/).filter(Boolean).forEach((word) => {
        if (text.includes(word)) score += 1;
      });
      return { ...note, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function generateInspirationPlans(userInput, selectedMood, selectedCategory, notes, adjustType, selectedLifeStatus = appState.selectedLifeStatus) {
  const categoryKey = inferCategory(userInput, selectedCategory);
  const status = getLifeStatus(selectedLifeStatus);
  const moodTags = inferMoodTags(selectedMood, adjustType, status);
  const templates = getPlanTemplates(categoryKey, userInput);
  return templates.slice(0, 3).map((template, index) => {
    const planId = createId(`plan-${index + 1}`);
    const relatedNotes = pickNotes(notes, template, index);
    const adjusted = applyAdjustments(template, adjustType);
    return {
      ...adjusted,
      id: planId,
      moodTags,
      styleLabel: getStyleLabel(index, status.bias, adjustType),
      tuningTrail: adjustType && !["generate", "regen"].includes(adjustType) ? [adjustType] : [],
      relatedNotes,
      isExpanded: index === 0 && adjustType === "regen" ? true : false,
      timeMode: "loose",
      createdAt: new Date().toISOString()
    };
  });
}

function inferCategory(input, selectedCategory) {
  const text = `${input} ${selectedCategory}`;
  if (/租房|房间|出租屋|改造|收纳|氛围/.test(text)) return "home";
  if (/礼物|生日|朋友|送/.test(text)) return "gift";
  if (/拍照|照片|相机|胶片/.test(text)) return "photo";
  if (/穿搭|衣服|搭配/.test(text)) return "outfit";
  if (/学习|入门|课程|开始/.test(text)) return "learn";
  if (/旅行|短途|出发|城市/.test(text)) return "travel";
  if (/吃|饭|一人食|做饭/.test(text)) return "food";
  if (/情绪|状态|回血|累|改变/.test(text)) return "reset";
  return "weekend";
}

function inferMoodTags(selectedMood, adjustType, status = getLifeStatus(appState.selectedLifeStatus)) {
  const base = {
    "我有点累，想轻松一点": ["低电量", "想独处"],
    "我想找点新鲜感": ["想找新鲜感", "轻量探索"],
    "我想省钱但过得有趣": ["想省钱", "小预算"],
    "我想高效完成任务": ["不拖延", "清爽完成"],
    "我只是想被推一把": ["想被推一把", "开始就好"],
    "我想拍点好看的照片": ["想拍点好看的照片", "想变精致"]
  }[selectedMood] || ["轻量", "可复刻"];
  const statusTag = {
    low_energy_outdoor: "低消耗",
    solo: "适合独处",
    photo: "出片友好",
    fresh: "新鲜感",
    friends: "轻松约会",
    budget_ritual: "小预算仪式感"
  }[status.bias];
  const extra = {
    cheaper: "想省钱",
    softer: "低电量",
    photo: "适合拍照",
    solo: "想独处",
    friends: "朋友一起",
    local: "本地人玩法"
  }[adjustType];
  return Array.from(new Set([...base, statusTag, extra].filter(Boolean)));
}

function getStyleLabel(index, bias, adjustType) {
  const tuned = {
    cheaper: "省钱打磨版",
    softer: "更松弛版",
    photo: "更出片版",
    solo: "独处友好版",
    friends: "朋友轻约版",
    rainy: "雨天也能做",
    less_walk: "少走路版",
    ritual: "仪式感版",
    local: "本地感玩法"
  }[adjustType];
  if (tuned) return tuned;
  const byBias = {
    low_energy_outdoor: ["低消耗版", "附近走走版", "情绪修复版"],
    solo: ["独处安静版", "轻量出门版", "睡前修复版"],
    photo: ["出片版", "低预算拍照版", "新手练习版"],
    fresh: ["新鲜感版", "本地小路线", "生活刷新版"],
    friends: ["朋友轻约版", "不赶场版", "小预算见面版"],
    budget_ritual: ["低预算仪式版", "一人小漂亮版", "居家刷新版"]
  };
  return (byBias[bias] || ["低消耗版", "出片版", "情绪修复版"])[index] || "轻量版";
}

function getPlanTemplates(categoryKey, input) {
  const common = planCommon();
  const library = {
    weekend: [
      {
        title: "低消耗城市漫游计划",
        suitableFor: "适合想出门但电量不高的人",
        imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
        cost: "45-90元",
        replicateScore: 4,
        noteTypes: ["周末路线", "一人出行"],
        taskPoints: ["找一个离你不远、能坐 40 分钟的小地方", "给今天定一个很小的主题，比如“记录城市里的绿色”", "只安排一个主任务，不再额外加行程", "回家后整理 6 张照片"],
        checklist: ["选一家离你不超过 20 分钟路程的店", "只安排一个主任务，不再额外加行程", "给今天定一个拍照主题，比如“记录城市里的绿色”", "回家后只整理 6 张照片", "写一句复盘：今天让我舒服的一件事是什么"],
        items: ["耳机", "水杯", "手机/相机", "舒服外套", "充电宝"],
        budget: { "交通": "10-20元", "餐饮": "25-45元", "门票": "0元", "其他": "10-25元" },
        traps: common.trapsLowEnergy,
        timePlan: common.timePlans.outdoor
      },
      {
        title: "50元以内的一人回血路线",
        suitableFor: "适合预算有限但想过得有点漂亮的人",
        imageUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80",
        cost: "30-50元",
        replicateScore: 5,
        noteTypes: ["低预算生活", "情绪回血"],
        taskPoints: ["先查一条交通方便的路线", "选一个免费公园或街区", "只买一杯饮品或一束小花", "回家后把花或照片放在常看到的位置"],
        checklist: ["把交通费用控制在 15 元以内", "提前看一眼店铺菜单，不临时加预算", "带一个帆布袋，少买临时小物", "回家后拍一张桌面或花的照片"],
        items: ["帆布袋", "水杯", "耳机", "零钱包", "备选店铺链接"],
        budget: { "交通": "8-15元", "餐饮": "18-28元", "门票": "0元", "其他": "10-15元" },
        traps: common.trapsBudget,
        timePlan: common.timePlans.outdoor
      },
      {
        title: "不出远门的周末生活刷新法",
        suitableFor: "适合想改变状态但不想太用力的人",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
        cost: "20-80元",
        replicateScore: 4,
        noteTypes: ["情绪回血", "低预算生活"],
        taskPoints: ["清掉一个最显眼的小角落", "买一件便宜但会常用的小物", "给房间留一盏暖一点的灯", "睡前写一句今天舒服的瞬间"],
        checklist: ["只整理一个桌面或床头，不扩大战场", "丢掉 5 个已经用不到的小东西", "换一个干净杯子或床品", "睡前写一句：今天不用完美也可以"],
        items: ["垃圾袋", "湿巾", "台灯", "香薰或热饮", "小收纳盒"],
        budget: { "交通": "0元", "餐饮": "10-25元", "门票": "0元", "其他": "20-55元" },
        traps: common.trapsHome,
        timePlan: common.timePlans.home
      }
    ],
    food: [
      {
        title: "30元以内的一人食小仪式",
        suitableFor: "适合一个人也想有点仪式感的周末",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
        cost: "18-35元",
        replicateScore: 5,
        noteTypes: ["低预算生活"],
        taskPoints: ["选一个热汤或热饭作为主角", "只加一个水果或小甜点", "用家里最好看的杯盘装出来", "吃完把桌面恢复干净"],
        checklist: ["先看冰箱里已有的食材", "只补买 1-2 样东西", "把手机放远一点，好好吃完一顿饭", "拍一张不用修太久的餐桌照片"],
        items: ["漂亮杯盘", "热汤", "水果", "桌垫", "喜欢的歌单"],
        budget: { "交通": "0元", "餐饮": "18-35元", "门票": "0元", "其他": "0元" },
        traps: common.trapsBudget,
        timePlan: common.timePlans.home
      },
      ...planCommon().fallbackHome
    ],
    reset: [
      {
        title: "睡前30分钟情绪回血法",
        suitableFor: "适合状态一般、只想让今天松一点的人",
        imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
        cost: "0-30元",
        replicateScore: 5,
        noteTypes: ["情绪回血"],
        taskPoints: ["关掉大灯，只留一盏柔和的小灯", "洗脸或泡脚，把身体先照顾好", "写一句今天舒服的瞬间", "明天只留一个最小任务"],
        checklist: ["把房间大灯关掉", "手机放到够不着的位置 15 分钟", "写一句：今天让我舒服的一件事是什么", "给明天留一个很小的开始"],
        items: ["台灯", "热水", "干净睡衣", "纸笔", "轻音乐"],
        budget: { "交通": "0元", "餐饮": "0-15元", "门票": "0元", "其他": "0-15元" },
        traps: common.trapsLowEnergy,
        timePlan: common.timePlans.night
      },
      ...planCommon().fallbackHome
    ],
    home: [
      {
        title: "新手也能复刻的出租屋氛围角",
        suitableFor: "适合想改造房间但不想花太多钱的人",
        imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
        cost: "80-160元",
        replicateScore: 4,
        noteTypes: ["租房改造"],
        taskPoints: ["只选一个角落，不一次改完整个房间", "先清空台面，再考虑买东西", "用灯光和布料增加温柔感", "拍照检查哪里还显乱"],
        checklist: ["选床头、书桌或窗边中的一个角落", "先收掉桌面上 10 件杂物", "买一盏小灯或一块布，不同时买太多", "用手机拍一张正面图，看哪里还需要留白"],
        items: ["台灯", "收纳篮", "床头布", "小相框", "无痕挂钩"],
        budget: { "交通": "0元", "餐饮": "0元", "门票": "0元", "其他": "80-160元" },
        traps: common.trapsHome,
        timePlan: common.timePlans.home
      },
      ...planCommon().fallbackHome
    ],
    gift: [
      {
        title: "适合学生党的低预算生日礼物方案",
        suitableFor: "适合预算不高但想让朋友感到被记住的人",
        imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80",
        cost: "45-100元",
        replicateScore: 4,
        noteTypes: ["低预算生活"],
        taskPoints: ["先写下朋友最近真实用得到的东西", "礼物只选一个主物，不堆小废物", "配三张具体小卡片", "包装保持干净，不需要很夸张"],
        checklist: ["写下朋友最近提过的 3 个小细节", "把预算拆成主礼物和包装两部分", "写三句只属于你们的具体话", "拍照留底，避免送前忘记内容"],
        items: ["小卡片", "包装纸", "贴纸", "主礼物", "细头笔"],
        budget: { "交通": "0-15元", "餐饮": "0元", "门票": "0元", "其他": "45-85元" },
        traps: ["不要为了凑满盒子买一堆用不上的小物", "不确定喜好时选日常会消耗掉的东西", "别把包装做得太难拆", "预算有限时先把心意写具体"],
        timePlan: common.timePlans.task
      },
      ...planCommon().fallbackHome
    ],
    photo: [
      {
        title: "新手也能复刻的拍照练习日",
        suitableFor: "适合想拍点好看的照片但不知道从哪开始的人",
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
        cost: "0-60元",
        replicateScore: 4,
        noteTypes: ["穿搭拍照"],
        taskPoints: ["只练一个主题，比如窗边光或城市里的绿色", "同一个角度拍 5 张，不急着换地方", "保留 6 张照片就好", "给每张照片写一个很短的标题"],
        checklist: ["提前擦干净镜头", "选一个光线柔和的位置", "同一主题至少拍 10 分钟", "回家只选 6 张，不修到很累"],
        items: ["手机/相机", "充电宝", "干净镜头布", "浅色外套", "小道具"],
        budget: { "交通": "0-20元", "餐饮": "0-35元", "门票": "0元", "其他": "0-5元" },
        traps: ["不要一开始学太多参数", "不要为了拍照去人挤人的地方", "光线不好时先换位置，不急着修图", "别把自己拍到不开心"],
        timePlan: common.timePlans.outdoor
      },
      ...planCommon().fallbackOutdoor
    ],
    outfit: [
      {
        title: "新手穿搭三套固定组合法",
        suitableFor: "适合早上不想纠结但想看起来清爽的人",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
        cost: "0-80元",
        replicateScore: 5,
        noteTypes: ["穿搭拍照"],
        taskPoints: ["先从衣柜里找出三件最常穿的单品", "固定三套能直接出门的组合", "拍照存进手机，早上照着穿", "只补一个真正缺的配件"],
        checklist: ["拿出白上衣、直筒裤、外套各一件", "搭出 3 套能出门的组合", "每套都拍一张全身照", "只记录一个需要补买的东西"],
        items: ["全身镜", "基础上衣", "直筒裤", "外套", "手机支架"],
        budget: { "交通": "0元", "餐饮": "0元", "门票": "0元", "其他": "0-80元" },
        traps: ["别一开始就买一整套新衣服", "不舒服的鞋先不要放进日常组合", "颜色控制在三种以内更省心", "拍照只是辅助，不要挑剔太久"],
        timePlan: common.timePlans.task
      },
      ...planCommon().fallbackHome
    ],
    learn: [
      {
        title: "30分钟学习入门启动法",
        suitableFor: "适合想开始但不想被计划压住的人",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80",
        cost: "0-30元",
        replicateScore: 5,
        noteTypes: ["学习入门"],
        taskPoints: ["找一个入门视频或文章", "只记 5 个关键词", "做一个最小练习", "写下明天可以继续的问题"],
        checklist: ["选一个 20 分钟以内的入门内容", "记下 5 个看懂的关键词", "马上做一个 5 分钟小练习", "写一个明天想继续查的问题"],
        items: ["笔记本", "计时器", "耳机", "一杯水", "安静桌面"],
        budget: { "交通": "0元", "餐饮": "0-20元", "门票": "0元", "其他": "0-10元" },
        traps: ["不要一上来收藏 20 个教程", "看不懂的先标记，不要卡太久", "只完成一个小练习也算开始", "别把桌面整理变成拖延"],
        timePlan: common.timePlans.task
      },
      ...planCommon().fallbackHome
    ],
    travel: [
      {
        title: "不赶场的一日短途计划",
        suitableFor: "适合想换个地方呼吸、但不想累垮的人",
        imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
        cost: "120-260元",
        replicateScore: 3,
        noteTypes: ["周末路线"],
        taskPoints: ["只选一个主地点，不安排连环打卡", "提前查好返程方式", "给路上留出发呆时间", "回家后只整理一小段记录"],
        checklist: ["确定一个主地点和一个备选休息点", "查好返程末班或最后一班车", "只带一个轻便包", "回家写一句这趟最值得的瞬间"],
        items: ["身份证件", "充电宝", "水杯", "轻便外套", "备选路线"],
        budget: { "交通": "60-140元", "餐饮": "50-90元", "门票": "0-40元", "其他": "10-30元" },
        traps: ["不要把一天排成景点接力", "不熟的地方先看交通时间", "一个人出门尽量选择交通方便的地方", "状态一般时别安排太多社交项目"],
        timePlan: common.timePlans.outdoor
      },
      ...planCommon().fallbackOutdoor
    ]
  };
  const plans = library[categoryKey] || library.weekend;
  return ensureThreePlans(plans, input);
}

function ensureThreePlans(plans) {
  const fallback = [...planCommon().fallbackOutdoor, ...planCommon().fallbackHome];
  return [...plans, ...fallback].slice(0, 3);
}

function planCommon() {
  return {
    trapsLowEnergy: ["不要把周末安排成另一个工作日", "不要为了拍照去人挤人的地方", "状态一般时，不要安排太多需要社交的项目", "一个人出门尽量选择交通方便的地方"],
    trapsBudget: ["预算有限时先查菜单和交通时间", "不要临时加太多小消费", "先用已有物品，不急着买新的", "给自己留一点回家路上的余量"],
    trapsHome: ["不要一次改完整个房间", "先收掉杂物，再决定要不要买东西", "别买太多同风格装饰", "状态一般时只整理一个角落就好"],
    timePlans: {
      outdoor: { "上午": "选一个想去的小地方", "午后": "完成一个主任务", "傍晚": "整理照片或写一句记录", "睡前": "保存今日体验笔记" },
      home: { "任意 30 分钟": "只处理一个小角落", "回家后": "把常用物品放回顺手的位置", "睡前": "写一句今天舒服的瞬间" },
      night: { "睡前": "关掉大灯，留一盏小灯", "任意 30 分钟": "洗脸、泡脚或写一句记录", "明天出门前": "只保留一个小任务" },
      task: { "上午": "挑一个最小入口", "午后": "完成一个小练习或购买动作", "傍晚": "整理结果，不继续加码", "睡前": "留下明天可以继续的一步" }
    },
    fallbackOutdoor: [
      {
        title: "离家近一点的轻量散步",
        suitableFor: "适合想出门透气但不想走太远的人",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
        cost: "0-50元",
        replicateScore: 5,
        noteTypes: ["周末路线", "情绪回血"],
        taskPoints: ["找一个交通方便的小地方", "只走一小段路，累了就坐", "带一杯水和耳机", "回家后记录一个舒服的细节"],
        checklist: ["选一个离你不超过 20 分钟的地点", "提前看天气和回程路线", "只安排一个主任务", "回家写一句舒服的瞬间"],
        items: ["耳机", "水杯", "舒服鞋子", "充电宝"],
        budget: { "交通": "0-15元", "餐饮": "0-30元", "门票": "0元", "其他": "0-5元" },
        traps: ["不要临时加远路", "不要把散步变成打卡任务", "累了就回家", "尽量选择熟悉或明亮的路线"],
        timePlan: { "午后": "去一个离家近的小地方", "傍晚": "慢慢回家", "睡前": "写一句记录" }
      }
    ],
    fallbackHome: [
      {
        title: "居家小回血计划",
        suitableFor: "适合不想出门但想让今天有点新鲜感的人",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
        cost: "0-60元",
        replicateScore: 5,
        noteTypes: ["情绪回血", "租房改造"],
        taskPoints: ["清掉一个最常看到的小角落", "给自己准备一杯热饮", "换一首不吵的歌单", "睡前写一句今天没关系"],
        checklist: ["只整理一个桌面或床头", "把水杯洗干净并倒一杯热饮", "放一首不打扰自己的歌", "写一句：做了一点点也算数"],
        items: ["热饮", "纸笔", "台灯", "干净杯子"],
        budget: { "交通": "0元", "餐饮": "0-25元", "门票": "0元", "其他": "0-35元" },
        traps: ["不要一边休息一边责怪自己", "别把整理扩大到全屋", "不要开太多新任务", "困了就早点结束"],
        timePlan: { "任意 30 分钟": "整理一个小角落", "睡前": "留一句温柔记录" }
      }
    ]
  };
}

function applyAdjustments(plan, adjustType) {
  const next = structuredCloneSafe(plan);
  if (!adjustType || adjustType === "generate" || adjustType === "regen") return next;
  const changes = {
    cheaper: {
      suffix: "低预算版",
      cost: "0-50元",
      task: "先用已有物品，今天只允许补买一样小东西",
      trap: "想省钱时先看已有物品，别把新鲜感全交给购物",
      scoreBoost: 1,
      budget: { "交通": "0-12元", "餐饮": "0-28元", "门票": "0元", "其他": "0-10元" }
    },
    softer: {
      suffix: "松弛版",
      task: "把计划缩到一个小动作，完成就可以收尾",
      trap: "状态一般时，不需要把计划做成完整的一天",
      scoreBoost: 1
    },
    photo: {
      suffix: "拍照友好版",
      task: "给今天定一个画面主题，比如光影、绿色或窗边",
      trap: "拍不到喜欢的照片也没关系，先把眼睛放慢一点",
      imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80"
    },
    solo: {
      suffix: "独处版",
      task: "选一个不用频繁开口交流的地点或动作",
      trap: "一个人出门优先选交通方便、能随时离开的地方"
    },
    friends: {
      suffix: "朋友一起版",
      task: "提前说好今天只做一个主任务，别临时加太多安排",
      trap: "同行时先确认预算和体力，不要让任何人硬撑"
    },
    rainy: {
      suffix: "雨天版",
      task: "把地点换成室内或半室内，留一段不用赶路的停留时间",
      trap: "雨天别安排太多转场，鞋子和回程比打卡更重要",
      imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=900&q=80"
    },
    less_walk: {
      suffix: "少走路版",
      task: "把路线缩成一个地点加一个休息点，走累前就停下来",
      trap: "少走路不是偷懒，是让计划真的能完成",
      scoreBoost: 1
    },
    ritual: {
      suffix: "仪式感版",
      task: "给这个小计划加一个漂亮收尾，比如一张照片、一杯热饮或一句记录",
      trap: "仪式感不需要买很多东西，一个固定动作就够了"
    },
    local: {
      suffix: "本地人玩法",
      task: "避开热门打卡点，找一条更顺路的小街或社区店",
      trap: "先别去热门打卡点，找一个离你更近的小地方"
    }
  }[adjustType];
  if (!changes) return next;
  next.title = `${next.title} · ${changes.suffix}`;
  next.cost = changes.cost || next.cost;
  next.taskPoints = [changes.task, ...next.taskPoints.slice(0, 3)];
  next.checklist = [changes.task, ...next.checklist.slice(0, 4)];
  next.traps = [changes.trap, ...next.traps.slice(0, 3)];
  next.replicateScore = Math.min(5, next.replicateScore + (changes.scoreBoost || 0));
  next.budget = changes.budget || next.budget;
  next.imageUrl = changes.imageUrl || next.imageUrl;
  return next;
}

function pickNotes(notes, template, index) {
  const matches = notes.filter((note) => template.noteTypes.includes(note.noteType) || template.noteTypes.includes(note.relatedScenario));
  const list = matches.length ? matches : notes;
  return list.slice(index, index + 3).length >= 2 ? list.slice(index, index + 3) : list.slice(0, 3);
}

function chooseJudgement(input, mood) {
  if (/累|状态|回血|不想/.test(`${input}${mood}`)) return judgementTexts[3];
  if (/省钱|预算|低/.test(`${input}${mood}`)) return judgementTexts[2];
  return randomFrom(judgementTexts);
}

function renderResults() {
  const hasPlans = appState.generatedPlans.length > 0 && appState.resultMode === "ready";
  dom.resultSection.classList.toggle("is-hidden", !hasPlans);
  if (!hasPlans) return;
  dom.resultJudgement.textContent = appState.judgement || judgementTexts[0];
  dom.plansGrid.innerHTML = appState.generatedPlans.map(renderPlanCard).join("");
}

function getBudgetSummary(budget) {
  const values = Object.values(budget || {}).filter(Boolean);
  return values.length ? values.join(" / ") : "按当天状态微调";
}

function getPlanReason(plan) {
  const firstTask = plan.taskPoints?.[0] || "先从一个很小的动作开始";
  return `推荐理由：${firstTask}，不会把今天变成另一个任务清单。`;
}

function renderPlanCard(plan) {
  const checklist = appState.checklistState[plan.id] || {};
  const isSelected = appState.selectedPlanId === plan.id;
  return `
    <article class="plan-card ${isSelected ? "is-selected" : ""} ${plan.justTuned ? "is-refreshing" : ""}" data-plan-id="${plan.id}">
      <div class="plan-image"><img src="${plan.imageUrl}" alt="${escapeAttr(plan.title)}" loading="lazy"></div>
      <div class="plan-body">
        <div class="mini-tags">
          <span class="tag purple">${escapeHtml(plan.styleLabel || "轻量版")}</span>
          ${plan.moodTags.map((tag, index) => `<span class="tag ${tagClass(index)}">${tag}</span>`).join("")}
        </div>
        <h3>${escapeHtml(plan.title)}</h3>
        <div class="meta-line"><span>${escapeHtml(plan.suitableFor)}</span></div>
        <div class="meta-line">
          <span class="tag green">预计消耗 ${escapeHtml(plan.cost)}</span>
          <span class="tag blue">预算 ${escapeHtml(getBudgetSummary(plan.budget))}</span>
          <span class="tag purple">出片指数 ${Math.max(2, Math.min(5, plan.replicateScore - 1))}/5</span>
        </div>
        <div class="replicate" aria-label="可复刻指数">
          <div class="dots">${Array.from({ length: 5 }, (_, index) => `<span class="dot ${index < plan.replicateScore ? "is-on" : ""}"></span>`).join("")}</div>
        </div>
        <div class="detail-section compact-section">
          <h4>轻量步骤</h4>
          <ul class="plain-list">${plan.taskPoints.slice(0, 3).map((item) => `<li><span>·</span><span>${escapeHtml(item)}</span></li>`).join("")}</ul>
        </div>
        <p class="reason-text">${escapeHtml(getPlanReason(plan))}</p>
        <div class="composer-actions">
          <button class="secondary-button" type="button" data-select-plan="${plan.id}">${isSelected ? "已经选中" : "就选这个"}</button>
          <button class="mini-button" type="button" data-save-plan="${plan.id}">先收进灵感盒子</button>
          <button class="mini-button" type="button" data-record-plan="${plan.id}">记录今天</button>
          <button class="mini-button" type="button" data-toggle-plan="${plan.id}">${plan.isExpanded ? "收起细节" : "展开细节"}</button>
        </div>
        <div class="card-tune-row" aria-label="继续打磨这个方案">
          <button class="mini-button" type="button" data-tune-plan="${plan.id}" data-tune-type="softer">再轻一点</button>
          <button class="mini-button" type="button" data-tune-plan="${plan.id}" data-tune-type="cheaper">更省钱</button>
          <button class="mini-button" type="button" data-tune-plan="${plan.id}" data-tune-type="photo">想要更出片</button>
          <button class="mini-button" type="button" data-tune-plan="${plan.id}" data-tune-type="solo">更适合独处</button>
          <button class="mini-button" type="button" data-tune-plan="${plan.id}" data-tune-type="rainy">雨天也可以</button>
          <button class="mini-button" type="button" data-replace-plan="${plan.id}">换一张</button>
        </div>
        ${plan.isExpanded ? renderPlanDetails(plan, checklist) : ""}
      </div>
    </article>
  `;
}

function renderPlanDetails(plan, checklist) {
  return `
    <div class="detail-panel">
      <section class="detail-section">
        <h4>可以这样开始</h4>
        <ul class="plain-list">${plan.taskPoints.map((item) => `<li><span>·</span><span>${escapeHtml(item)}</span></li>`).join("")}</ul>
      </section>

      <section class="detail-section">
        <h4>时间想排多细？</h4>
        <div class="composer-actions">
          <button class="mini-button ${plan.timeMode === "loose" ? "is-active" : ""}" type="button" data-time-mode="loose" data-plan-id="${plan.id}">保留松弛版</button>
          <button class="mini-button ${plan.timeMode === "scheduled" ? "is-active" : ""}" type="button" data-time-mode="scheduled" data-plan-id="${plan.id}">帮我排具体时间</button>
        </div>
        ${plan.timeMode === "scheduled" ? renderTimePlan(plan.timePlan) : `<p class="visibility-hint">先不用把一天写满，挑一个最想做的小动作就很好。</p>`}
      </section>

      <section class="detail-section">
        <h4>做完可以勾掉</h4>
        <ul class="task-list">
          ${plan.checklist.map((item, index) => `
            <li>
              <input id="${plan.id}-check-${index}" type="checkbox" data-check-plan="${plan.id}" data-check-index="${index}" ${checklist[index] ? "checked" : ""}>
              <label for="${plan.id}-check-${index}">${escapeHtml(item)}</label>
            </li>
          `).join("")}
        </ul>
      </section>

      <section class="detail-section">
        <h4>出发前带上</h4>
        <div class="mini-tags">${plan.items.map((item) => `<span class="tag blue">${escapeHtml(item)}</span>`).join("")}</div>
      </section>

      <section class="detail-section">
        <h4>预算小卡片</h4>
        <div class="budget-grid">
          ${Object.entries(plan.budget).map(([name, value]) => `<div class="budget-item"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(value)}</span></div>`).join("")}
        </div>
      </section>

      <section class="detail-section">
        <h4>避坑提醒</h4>
        <ul class="plain-list">${plan.traps.slice(0, 4).map((item) => `<li><span>·</span><span>${escapeHtml(item)}</span></li>`).join("")}</ul>
      </section>

      <section class="detail-section">
        <h4>大家也这样玩过</h4>
        <div class="xhs-grid">${plan.relatedNotes.slice(0, 3).map(renderXhsNote).join("")}</div>
      </section>

      ${renderExperienceComposer(plan)}
    </div>
  `;
}

function renderTimePlan(timePlan) {
  return `
    <div class="time-box">
      ${Object.entries(timePlan).map(([period, text]) => `<div class="time-item"><strong>${escapeHtml(period)}</strong><p>${escapeHtml(text)}</p></div>`).join("")}
    </div>
  `;
}

function renderXhsNote(note) {
  return `
    <article class="xhs-card">
      <div class="xhs-image"><img src="${note.imageUrl}" alt="${escapeAttr(note.title)}" loading="lazy"></div>
      <div class="xhs-content">
        <div class="meta-line"><span class="tag">${note.platform}</span><span>${escapeHtml(note.authorName)}</span><span>${escapeHtml(note.publishTime)}</span></div>
        <h4>${escapeHtml(note.title)}</h4>
        <p>${escapeHtml(note.excerpt)}</p>
        <div class="mini-tags">${note.tags.map((tag) => `<span class="tag blue">${escapeHtml(tag)}</span>`).join("")}</div>
        <a class="mini-button" href="${note.sourceUrl}" target="_blank" rel="noopener noreferrer">查看小红书笔记</a>
      </div>
    </article>
  `;
}

function renderExperienceComposer(plan) {
  const draft = getDraft(plan.id);
  const visibility = getVisibility(draft.visibility);
  return `
    <section class="note-composer" data-note-plan="${plan.id}">
      <div class="composer-head">
        <h4>今日体验笔记</h4>
        <p>记下今天的小瞬间，可以只给自己看，也可以分享给想分享的人。先记录，再决定要不要公开。</p>
      </div>
      <textarea rows="3" data-note-text="${plan.id}" placeholder="今天有什么小瞬间值得留下？">${escapeHtml(draft.text || "")}</textarea>
      <div class="composer-actions">
        <button class="mini-button" type="button" data-add-image="${plan.id}">添加图片</button>
        <button class="mini-button" type="button" data-add-voice="${plan.id}">添加一段语音</button>
      </div>
      <div class="album-row">${(draft.images || []).map((src) => `<div class="album-image"><img src="${src}" alt="体验照片"></div>`).join("")}</div>
      <div class="voice-row">${(draft.voiceClips || []).map((clip) => `<span class="voice-chip">${clip.duration} ${escapeHtml(clip.title)}</span>`).join("")}</div>

      <div class="detail-section">
        <h4>今天的感觉</h4>
        <div class="pill-row">${noteMoodOptions.map((tag) => `<button class="pill ${draft.moodTags.includes(tag) ? "is-active" : ""}" type="button" data-note-mood="${plan.id}" data-value="${escapeAttr(tag)}">${tag}</button>`).join("")}</div>
      </div>

      <div class="detail-section">
        <h4>完成到哪里</h4>
        <div class="pill-row">${completionOptions.map((item) => `<button class="pill ${draft.completionStatus === item ? "is-active" : ""}" type="button" data-completion="${plan.id}" data-value="${escapeAttr(item)}">${item}</button>`).join("")}</div>
      </div>

      <div class="detail-section">
        <h4>在哪里发生</h4>
        <div class="pill-row">${locationTagOptions.map((item) => `<button class="pill ${draft.locationTag === item ? "is-active" : ""}" type="button" data-location-tag="${plan.id}" data-value="${escapeAttr(item)}">${item}</button>`).join("")}</div>
      </div>

      <div class="visibility-summary">
        <span><strong>当前：</strong>${visibility.label}</span>
        <button class="mini-button" type="button" data-toggle-visibility="${plan.id}">设置可见范围</button>
      </div>
      <div class="visibility-options ${draft.visibilityOpen ? "" : "is-hidden"}">
        ${visibilityOptions.map((item) => `
          <button class="visibility-card ${draft.visibility === item.key ? "is-active" : ""}" type="button" data-visibility="${plan.id}" data-value="${item.key}">
            <strong>${item.label}</strong>
            <span>${item.text}</span>
          </button>
        `).join("")}
      </div>
      ${renderVisibilitySelectors(plan.id, draft)}
      <p class="visibility-hint">${visibility.hint}</p>
      ${draft.visibility === "draft" ? `<div class="share-preview"><strong>草稿预览</strong><p>${escapeHtml(draft.text || "做了一点点也算数。")}</p><span class="tag purple">${escapeHtml(plan.title)}</span></div>` : ""}
      <button class="primary-button" type="button" data-save-note="${plan.id}">${visibility.action}</button>
    </section>
  `;
}

function renderVisibilitySelectors(planId, draft) {
  if (draft.visibility === "selected_friends") {
    return `<div class="selector-panel"><h4>分享给谁</h4><div class="pill-row">${mockFriends.map((name) => `<button class="pill ${draft.visibleToFriends.includes(name) ? "is-active" : ""}" type="button" data-friend="${planId}" data-value="${escapeAttr(name)}">${name}</button>`).join("")}</div></div>`;
  }
  if (draft.visibility === "group_visible") {
    return `<div class="selector-panel"><h4>选择分组</h4><div class="pill-row">${circleTags.map((name) => `<button class="pill ${draft.visibleToCircles.includes(name) ? "is-active" : ""}" type="button" data-circle="${planId}" data-value="${escapeAttr(name)}">${name}</button>`).join("")}</div></div>`;
  }
  return "";
}

function getDraft(planId) {
  appState.noteDrafts = appState.noteDrafts || {};
  if (!appState.noteDrafts[planId]) {
    appState.noteDrafts[planId] = {
      text: "",
      images: [],
      voiceClips: [],
      moodTags: [],
      locationTag: "没写地点",
      completionStatus: "做了一点点",
      visibility: "private",
      visibilityOpen: false,
      visibleToFriends: [],
      visibleToCircles: []
    };
  }
  return appState.noteDrafts[planId];
}

function getVisibility(key) {
  return visibilityOptions.find((item) => item.key === key) || visibilityOptions[0];
}

function handlePlanClick(event) {
  const target = event.target;
  const select = target.closest("[data-select-plan]");
  const toggle = target.closest("[data-toggle-plan]");
  const save = target.closest("[data-save-plan]");
  const record = target.closest("[data-record-plan]");
  const tune = target.closest("[data-tune-plan]");
  const replace = target.closest("[data-replace-plan]");
  const timeMode = target.closest("[data-time-mode]");
  const addImage = target.closest("[data-add-image]");
  const addVoice = target.closest("[data-add-voice]");
  const toggleVisibility = target.closest("[data-toggle-visibility]");
  const visibility = target.closest("[data-visibility]");
  const mood = target.closest("[data-note-mood]");
  const completion = target.closest("[data-completion]");
  const locationTag = target.closest("[data-location-tag]");
  const friend = target.closest("[data-friend]");
  const circle = target.closest("[data-circle]");
  const saveNote = target.closest("[data-save-note]");

  if (select) selectPlan(select.dataset.selectPlan);
  if (toggle) togglePlan(toggle.dataset.togglePlan);
  if (save) savePlan(save.dataset.savePlan);
  if (record) openRecordComposer(record.dataset.recordPlan);
  if (tune) tunePlan(tune.dataset.tunePlan, tune.dataset.tuneType);
  if (replace) replacePlan(replace.dataset.replacePlan);
  if (timeMode) setTimeMode(timeMode.dataset.planId, timeMode.dataset.timeMode);
  if (addImage) addMockImage(addImage.dataset.addImage);
  if (addVoice) addMockVoice(addVoice.dataset.addVoice);
  if (toggleVisibility) toggleVisibilityOptions(toggleVisibility.dataset.toggleVisibility);
  if (visibility) setVisibility(visibility.dataset.visibility, visibility.dataset.value);
  if (mood) toggleDraftArrayValue(mood.dataset.noteMood, "moodTags", mood.dataset.value);
  if (completion) setDraftValue(completion.dataset.completion, "completionStatus", completion.dataset.value);
  if (locationTag) setDraftValue(locationTag.dataset.locationTag, "locationTag", locationTag.dataset.value);
  if (friend) toggleDraftArrayValue(friend.dataset.friend, "visibleToFriends", friend.dataset.value);
  if (circle) toggleDraftArrayValue(circle.dataset.circle, "visibleToCircles", circle.dataset.value);
  if (saveNote) saveExperienceNote(saveNote.dataset.saveNote);
}

function handlePlanChange(event) {
  const checkbox = event.target.closest("[data-check-plan]");
  if (!checkbox) return;
  pushUndo();
  const planId = checkbox.dataset.checkPlan;
  appState.checklistState[planId] = appState.checklistState[planId] || {};
  appState.checklistState[planId][checkbox.dataset.checkIndex] = checkbox.checked;
  persistState();
}

function handlePlanInput(event) {
  const textarea = event.target.closest("[data-note-text]");
  if (!textarea) return;
  const planId = textarea.dataset.noteText;
  const draft = getDraft(planId);
  if (draft.text !== textarea.value) markDraftUndoOnce(planId, "text");
  draft.text = textarea.value;
  persistState();
}

function markDraftUndoOnce(planId, field) {
  appState.draftUndoMarks = appState.draftUndoMarks || {};
  const key = `${planId}:${field}`;
  if (appState.draftUndoMarks[key]) return;
  pushUndo();
  appState.draftUndoMarks[key] = true;
}

function togglePlan(planId) {
  appState.generatedPlans = appState.generatedPlans.map((plan) => plan.id === planId ? { ...plan, isExpanded: !plan.isExpanded } : plan);
  persistState();
  renderResults();
}

function selectPlan(planId) {
  pushUndo();
  appState.selectedPlanId = planId;
  const plan = appState.generatedPlans.find((item) => item.id === planId);
  addHistoryRecord("选中方案", plan, []);
  persistState();
  renderResults();
  showToast("好，就先按这张慢慢来");
}

function openRecordComposer(planId) {
  appState.generatedPlans = appState.generatedPlans.map((plan) => plan.id === planId ? { ...plan, isExpanded: true } : plan);
  appState.selectedPlanId = planId;
  persistState();
  renderResults();
  window.setTimeout(() => {
    const textarea = document.querySelector(`[data-note-text="${planId}"]`);
    if (textarea) textarea.focus();
  }, 80);
  showToast("今天的小瞬间可以记在这里");
}

function tunePlan(planId, tuneType) {
  const plan = appState.generatedPlans.find((item) => item.id === planId);
  if (!plan) return;
  pushUndo();
  const tunedPlan = {
    ...applyAdjustments(plan, tuneType),
    id: plan.id,
    isExpanded: plan.isExpanded,
    timeMode: plan.timeMode,
    relatedNotes: plan.relatedNotes,
    styleLabel: getStyleLabel(0, getLifeStatus(appState.selectedLifeStatus).bias, tuneType),
    tuningTrail: [...(plan.tuningTrail || []), tuneType],
    justTuned: true
  };
  appState.generatedPlans = appState.generatedPlans.map((item) => item.id === planId ? tunedPlan : { ...item, justTuned: false });
  appState.selectedPlanId = planId;
  addHistoryRecord(getTuneLabel(tuneType), tunedPlan, tunedPlan.tuningTrail);
  persistState();
  renderResults();
  window.setTimeout(() => {
    const current = appState.generatedPlans.find((item) => item.id === planId);
    if (!current?.justTuned) return;
    appState.generatedPlans = appState.generatedPlans.map((item) => item.id === planId ? { ...item, justTuned: false } : item);
    persistState();
    renderResults();
  }, 650);
  showToast("这张已经按你的方向调过了");
}

function replacePlan(planId) {
  const plan = appState.generatedPlans.find((item) => item.id === planId);
  if (!plan) return;
  pushUndo();
  const notes = fetchXiaohongshuNotes(appState.currentInput);
  const nextPlan = generateInspirationPlans(appState.currentInput, appState.selectedMood, appState.selectedCategory, notes, "regen", appState.selectedLifeStatus)[Math.floor(Math.random() * 3)];
  nextPlan.id = plan.id;
  nextPlan.isExpanded = plan.isExpanded;
  nextPlan.justTuned = true;
  appState.generatedPlans = appState.generatedPlans.map((item) => item.id === planId ? nextPlan : item);
  addHistoryRecord("换了一张", nextPlan, nextPlan.tuningTrail || []);
  persistState();
  renderResults();
  showToast("换了一张新的，看看这张顺不顺眼");
}

function getTuneLabel(type) {
  return {
    cheaper: "更省钱",
    softer: "再轻一点",
    photo: "想要更出片",
    solo: "更适合独处",
    friends: "更适合朋友",
    rainy: "雨天也可以",
    less_walk: "少走路",
    ritual: "多一点仪式感",
    local: "更像本地人玩法"
  }[type] || "继续打磨";
}

function addHistoryRecord(action, plan, tuningTrail = []) {
  if (!appState.currentInput && !plan) return;
  appState.historyRecords.unshift({
    id: createId("history"),
    input: appState.currentInput || "从收藏里继续调整",
    selectedLifeStatus: appState.selectedLifeStatus,
    selectedMood: appState.selectedMood,
    selectedCategory: appState.selectedCategory,
    action,
    tuningTrail: structuredCloneSafe(tuningTrail),
    finalPlanTitle: plan?.title || "",
    judgement: appState.judgement || "慢慢打磨到更适合今天的版本。",
    generatedPlans: structuredCloneSafe(appState.generatedPlans),
    createdAt: new Date().toISOString()
  });
  appState.historyRecords = appState.historyRecords.slice(0, 18);
}

function setTimeMode(planId, mode) {
  appState.generatedPlans = appState.generatedPlans.map((plan) => plan.id === planId ? { ...plan, timeMode: mode } : plan);
  persistState();
  renderResults();
}

function adjustPlans(adjustType) {
  if (!appState.generatedPlans.length) {
    showToast("先生成一组灵感，再慢慢调");
    return;
  }
  pushUndo();
  const notes = fetchXiaohongshuNotes(appState.currentInput);
  const expandedIds = new Set(appState.generatedPlans.filter((plan) => plan.isExpanded).map((plan) => plan.id));
  appState.generatedPlans = generateInspirationPlans(appState.currentInput, appState.selectedMood, appState.selectedCategory, notes, adjustType, appState.selectedLifeStatus)
    .map((plan, index) => ({ ...plan, isExpanded: index === 0 || expandedIds.size > 0 && index < expandedIds.size }));
  appState.judgement = chooseJudgement(appState.currentInput, appState.selectedMood);
  addHistoryRecord(getTuneLabel(adjustType), appState.generatedPlans[0], [adjustType]);
  persistState();
  renderResults();
  showToast("已经轻轻调过了");
}

function savePlan(planId) {
  const plan = appState.generatedPlans.find((item) => item.id === planId);
  if (!plan) return;
  if (appState.savedPlans.some((item) => item.title === plan.title)) {
    showToast("这个灵感已经在盒子里了");
    return;
  }
  pushUndo();
  appState.savedPlans.unshift({
    ...structuredCloneSafe(plan),
    savedStatus: "想试试",
    savedAt: new Date().toISOString(),
    checklistState: structuredCloneSafe(appState.checklistState[planId] || {})
  });
  persistState();
  renderSavedPlans();
  showToast("已放进灵感盒子");
}

function renderSavedPlans() {
  if (!appState.savedPlans.length) {
    dom.savedPlansList.innerHTML = `<div class="empty-state">还没有收藏的灵感。看到想试试的方案，可以先放进盒子里慢慢挑。</div>`;
    return;
  }
  dom.savedPlansList.innerHTML = appState.savedPlans.map((plan) => `
    <article class="drawer-item saved-item">
      <div class="saved-thumb"><img src="${plan.imageUrl}" alt="${escapeAttr(plan.title)}" loading="lazy"></div>
      <div>
        <h3>${escapeHtml(plan.title)}</h3>
        <p>${escapeHtml(plan.taskPoints.slice(0, 2).join(" / "))}</p>
        <div class="mini-tags">
          <span class="tag purple">${escapeHtml(plan.savedStatus || "想试试")}</span>
          ${plan.moodTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="card-tune-row">
          ${["想试试", "已体验", "暂存"].map((status) => `<button class="mini-button ${plan.savedStatus === status ? "is-active" : ""}" type="button" data-saved-status="${plan.id}" data-status="${status}">${status}</button>`).join("")}
        </div>
        <div class="composer-actions">
          <button class="mini-button" type="button" data-open-saved="${plan.id}">打开继续调</button>
          <button class="mini-button" type="button" data-delete-saved="${plan.id}">移出盒子</button>
        </div>
      </div>
    </article>
  `).join("");
}

function handleSavedClick(event) {
  const deleteButton = event.target.closest("[data-delete-saved]");
  const statusButton = event.target.closest("[data-saved-status]");
  const openButton = event.target.closest("[data-open-saved]");
  if (statusButton) {
    pushUndo();
    appState.savedPlans = appState.savedPlans.map((plan) => plan.id === statusButton.dataset.savedStatus ? { ...plan, savedStatus: statusButton.dataset.status } : plan);
    persistState();
    renderSavedPlans();
    showToast(`已标记为「${statusButton.dataset.status}」`);
    return;
  }
  if (openButton) {
    const plan = appState.savedPlans.find((item) => item.id === openButton.dataset.openSaved);
    if (!plan) return;
    pushUndo();
    const reopened = { ...structuredCloneSafe(plan), id: createId("plan-reopen"), isExpanded: true, justTuned: true };
    appState.generatedPlans = [reopened, ...appState.generatedPlans.filter((item) => item.title !== plan.title)].slice(0, 3);
    appState.selectedPlanId = reopened.id;
    appState.resultMode = "ready";
    appState.currentInput = appState.currentInput || "从灵感盒子继续调整";
    addHistoryRecord("从灵感盒子继续", reopened, reopened.tuningTrail || []);
    persistState();
    closeDrawers();
    renderResults();
    showToast("这张灵感回到桌面上了");
    return;
  }
  const button = deleteButton;
  if (!button) return;
  pushUndo();
  appState.savedPlans = appState.savedPlans.filter((plan) => plan.id !== button.dataset.deleteSaved);
  persistState();
  renderSavedPlans();
  showToast("已经移出灵感盒子");
}

function renderHistory() {
  if (!appState.historyRecords.length) {
    dom.historyList.innerHTML = `<div class="empty-state">还没有生成记录，先问一个小问题吧。</div>`;
    return;
  }
  dom.historyList.innerHTML = appState.historyRecords.map((record) => `
    <article class="drawer-item">
      <div class="meta-line">
        <span class="tag blue">${escapeHtml(record.selectedCategory || "生活灵感")}</span>
        <span class="tag">${escapeHtml(record.action || "生成了一组")}</span>
        <span>${formatDate(record.createdAt)}</span>
      </div>
      <h3>${escapeHtml(record.input)}</h3>
      <p>${escapeHtml(record.finalPlanTitle ? `最后停在：${record.finalPlanTitle}` : record.judgement)}</p>
      ${record.tuningTrail?.length ? `<div class="mini-tags">${record.tuningTrail.map((item) => `<span class="tag purple">${escapeHtml(getTuneLabel(item))}</span>`).join("")}</div>` : ""}
      <button class="mini-button" type="button" data-restore-history="${record.id}">恢复这一步</button>
    </article>
  `).join("");
}

function handleHistoryClick(event) {
  const button = event.target.closest("[data-restore-history]");
  if (!button) return;
  const record = appState.historyRecords.find((item) => item.id === button.dataset.restoreHistory);
  if (!record) return;
  pushUndo();
  appState.currentInput = record.input;
  appState.selectedLifeStatus = record.selectedLifeStatus || appState.selectedLifeStatus;
  appState.selectedMood = record.selectedMood;
  appState.selectedCategory = record.selectedCategory;
  appState.generatedPlans = structuredCloneSafe(record.generatedPlans);
  appState.selectedPlanId = record.generatedPlans?.[0]?.id || "";
  appState.judgement = record.judgement;
  appState.resultMode = "ready";
  persistState();
  closeDrawers();
  hydrateFromState();
  showToast("这组灵感回来了");
}

function toggleVisibilityOptions(planId) {
  markDraftUndoOnce(planId, "visibilityOpen");
  const draft = getDraft(planId);
  draft.visibilityOpen = !draft.visibilityOpen;
  persistState();
  renderResults();
}

function setVisibility(planId, value) {
  pushUndo();
  const draft = getDraft(planId);
  draft.visibility = value;
  draft.visibilityOpen = true;
  draft.visibleToFriends = value === "selected_friends" ? draft.visibleToFriends : [];
  draft.visibleToCircles = value === "group_visible" ? draft.visibleToCircles : [];
  persistState();
  renderResults();
}

function setDraftValue(planId, key, value) {
  markDraftUndoOnce(planId, key);
  const draft = getDraft(planId);
  draft[key] = value;
  persistState();
  renderResults();
}

function toggleDraftArrayValue(planId, key, value) {
  markDraftUndoOnce(planId, key);
  const draft = getDraft(planId);
  draft[key] = draft[key] || [];
  draft[key] = draft[key].includes(value) ? draft[key].filter((item) => item !== value) : [...draft[key], value];
  persistState();
  renderResults();
}

function addMockImage(planId) {
  appState.activeImagePlanId = planId;
  if (dom.noteImageInput) {
    dom.noteImageInput.value = "";
    dom.noteImageInput.click();
    return;
  }
  addImageToDraft(planId);
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  const planId = appState.activeImagePlanId;
  if (!planId) return;
  if (!file) {
    addImageToDraft(planId);
    return;
  }
  markDraftUndoOnce(planId, "images");
  const reader = new FileReader();
  reader.onload = () => {
    const draft = getDraft(planId);
    draft.images = [...draft.images, reader.result].slice(0, 4);
    persistState();
    renderResults();
    showToast("照片已经放进今天的小相册");
  };
  reader.readAsDataURL(file);
}

function addImageToDraft(planId) {
  markDraftUndoOnce(planId, "images");
  const draft = getDraft(planId);
  const samples = [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=280&q=80",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=280&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=280&q=80"
  ];
  draft.images = [...draft.images, samples[draft.images.length % samples.length]].slice(0, 4);
  persistState();
  renderResults();
  showToast("加了一张小照片");
}

function addMockVoice(planId) {
  markDraftUndoOnce(planId, "voiceClips");
  const draft = getDraft(planId);
  draft.voiceClips = [...draft.voiceClips, { id: createId("voice"), duration: "00:18", title: "今日语音记录" }].slice(0, 3);
  persistState();
  renderResults();
  showToast("加了一段模拟语音");
}

function saveExperienceNote(planId) {
  const plan = appState.generatedPlans.find((item) => item.id === planId);
  const draft = getDraft(planId);
  if (!plan) return;
  if (!draft.text.trim() && !draft.images.length && !draft.voiceClips.length) {
    showToast("先留下一个小瞬间吧");
    return;
  }
  pushUndo();
  const visibility = getVisibility(draft.visibility);
  const note = {
    id: createId("note"),
    date: new Date().toLocaleDateString("zh-CN"),
    relatedPlanId: plan.id,
    relatedPlanTitle: plan.title,
    text: draft.text.trim(),
    images: structuredCloneSafe(draft.images),
    voiceClips: structuredCloneSafe(draft.voiceClips),
    moodTags: structuredCloneSafe(draft.moodTags),
    locationTag: draft.locationTag,
    completionStatus: draft.completionStatus,
    visibility: draft.visibility,
    visibleToFriends: structuredCloneSafe(draft.visibleToFriends),
    visibleToCircles: structuredCloneSafe(draft.visibleToCircles),
    isAnonymous: false,
    shareCardData: draft.visibility === "draft" ? { title: plan.title, text: draft.text.trim() || "做了一点点也算数。" } : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  appState.experienceNotes.unshift(note);
  publishExperienceNote(note.id, {
    visibility: draft.visibility,
    visibleToFriends: draft.visibleToFriends,
    visibleToCircles: draft.visibleToCircles
  });
  appState.noteDrafts[planId] = {
    text: "",
    images: [],
    voiceClips: [],
    moodTags: [],
    locationTag: "没写地点",
    completionStatus: "做了一点点",
    visibility: "private",
    visibilityOpen: false,
    visibleToFriends: [],
    visibleToCircles: []
  };
  clearDraftUndoMarks(planId);
  persistState();
  renderResults();
  renderExperienceNotes();
  showToast(visibility.toast);
}

function clearDraftUndoMarks(planId) {
  appState.draftUndoMarks = Object.fromEntries(
    Object.entries(appState.draftUndoMarks || {}).filter(([key]) => !key.startsWith(`${planId}:`))
  );
}

function publishExperienceNote(noteId, visibilityConfig) {
  return { ok: true, noteId, visibilityConfig, mocked: true };
}

function renderExperienceNotes() {
  const notes = appState.activeNoteFilter === "all"
    ? appState.experienceNotes
    : appState.experienceNotes.filter((note) => note.visibility === appState.activeNoteFilter);
  if (!notes.length) {
    dom.experienceNotesList.innerHTML = `<div class="empty-state">还没有留下今日体验。做了一点点也算数，先记录一个瞬间就好。</div>`;
    return;
  }
  dom.experienceNotesList.innerHTML = notes.map((note) => {
    const visibility = getVisibility(note.visibility);
    return `
      <article class="drawer-item">
        <div class="meta-line"><span>${escapeHtml(note.date)}</span><span class="tag purple">${visibility.drawerLabel}</span></div>
        <h3>${escapeHtml(note.relatedPlanTitle)}</h3>
        <p>${escapeHtml(note.text || "今天只留下了一点点记录。")}</p>
        <div class="album-row">${note.images.map((src) => `<div class="album-image"><img src="${src}" alt="体验照片"></div>`).join("")}</div>
        <div class="voice-row">${note.voiceClips.map((clip) => `<span class="voice-chip">${clip.duration} ${escapeHtml(clip.title)}</span>`).join("")}</div>
        <div class="mini-tags">
          ${note.moodTags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          <span class="tag blue">${escapeHtml(note.locationTag || "没写地点")}</span>
          <span class="tag green">${escapeHtml(note.completionStatus)}</span>
          ${note.isAnonymous ? `<span class="tag blue">匿名用户</span>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

function undoLastStep() {
  if (!appState.undoStack.length) return;
  const snapshot = appState.undoStack.pop();
  restoreSnapshot(snapshot);
  showToast("已撤回上一步");
}

function openDrawer(id) {
  const drawer = document.querySelector(`#${id}`);
  if (!drawer) return;
  closeDrawers();
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  const trigger = document.querySelector(`[data-drawer="${id}"]`);
  if (trigger) trigger.setAttribute("aria-expanded", "true");
  document.body.classList.add("drawer-open");
  renderSavedPlans();
  renderHistory();
  renderExperienceNotes();
}

function closeDrawers() {
  document.querySelectorAll(".drawer").forEach((drawer) => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  });
  document.querySelectorAll("[data-drawer]").forEach((button) => button.setAttribute("aria-expanded", "false"));
  document.body.classList.remove("drawer-open");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  dom.toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2600);
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function tagClass(index) {
  return ["", "blue", "green", "purple"][index % 4];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
