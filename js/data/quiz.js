// ============ PAWTI v11 · 代理旅行版问卷 + 匹配模型 ============
//
// 核心叙事：
//   用户不是在判断「自己像哪只动物」，
//   而是在训练一只会代你旅行、拍照、写信的小宠物。
//
// 结构：
//   序章
//   第一站 · 成都  Q1-Q2
//   第二站 · 大理  Q3-Q5
//   第三站 · 东京  Q6-Q7
//   第四站 · 三亚  Q8-Q9
//
// 评分：
//   0.45 * 七维人格向量 fit
// + 0.40 * 旅行锚点 fit
// + 0.15 * 直接宠物证据 fit

export const DIM_KEYS = ['P', 'E', 'S', 'X', 'A', 'H', 'L'];

export const QUESTION_WEIGHTS = [0.95, 1.00, 0.95, 1.15, 1.10, 1.05, 0.95, 1.00, 1.15];

export const PET_NAME_TO_ID = {
  '哈士奇': 'husky',
  '边牧': 'collie',
  '小熊猫': 'orange',
  '奶牛猫': 'ragdoll',
  '豚豚': 'capybara',
  '豚豚君': 'capybara',
  '柴犬': 'shiba',
  '比格': 'frenchie',
  '比格犬': 'frenchie',
  '狸花猫': 'lihua',
  '三花': 'calico',
  '三花猫': 'calico',
  '柯基': 'corgi',
  '柯基酱': 'corgi',
  '英短': 'british',
  '英短蓝猫': 'british',
  '金毛': 'golden',
  '萨摩耶': 'samoyed',
  '垂耳兔': 'lop',
  '豚鼠鼠': 'siamese',
};

const PET_LABELS = {
  husky: '哈士奇',
  frenchie: '比格犬',
  ragdoll: '奶牛猫',
  collie: '边牧',
  corgi: '柯基酱',
  golden: '金毛',
  siamese: '豚鼠鼠',
  orange: '小熊猫',
  capybara: '豚豚君',
  lop: '垂耳兔',
  lihua: '狸花猫',
  british: '英短蓝猫',
  calico: '三花猫',
  shiba: '柴犬',
  samoyed: '萨摩耶',
};

const TAIL_GROUPS = [
  {
    ids: ['husky', 'frenchie', 'ragdoll'],
    q: '它晚回来了一小时，最可能是因为：',
    options: [
      { text: '追着风走上了一条能看见远山的路', pets: { husky: 4.0 } },
      { text: '被声音和香味一路带进了热闹的小店', pets: { frenchie: 4.0 } },
      { text: '发现一扇很奇怪的门，没忍住进去看了', pets: { ragdoll: 4.0 } },
    ],
  },
  {
    ids: ['collie', 'corgi'],
    q: '它最得意地拿给你看的是：',
    options: [
      { text: '一份连换乘和休息时间都刚刚好的路线', pets: { collie: 4.0 } },
      { text: '一张盖满印章、想去的地方一个没落下的地图', pets: { corgi: 4.0 } },
    ],
  },
  {
    ids: ['golden', 'siamese', 'orange'],
    q: '它说“这趟真的值了”，是因为：',
    options: [
      { text: '吃到一口比期待中还好吃的东西', pets: { golden: 4.0 } },
      { text: '新鲜的东西能吃、能买、能试，几乎都体验了', pets: { siamese: 4.0 } },
      { text: '带回了一小袋好看、舒服、舍不得忘记的碎片', pets: { orange: 4.0 } },
    ],
  },
  {
    ids: ['lihua', 'british', 'calico'],
    q: '它说一个地方“很特别”，更可能是因为：',
    options: [
      { text: '那里藏着一段几乎没人注意的故事', pets: { lihua: 4.0 } },
      { text: '那里足够安静，可以独自待很久', pets: { british: 4.0 } },
      { text: '那里的光和颜色，让它特别想按下快门', pets: { calico: 4.0 } },
    ],
  },
  {
    ids: ['shiba', 'samoyed'],
    q: '旅途中最让它开心的是：',
    options: [
      { text: '和刚认识的人聊了很久，还听到一个新故事', pets: { shiba: 4.0 } },
      { text: '一路都和喜欢的人待在一起，去哪儿反而没那么重要', pets: { samoyed: 4.0 } },
    ],
  },
  {
    ids: ['capybara', 'lop'],
    q: '它说自己终于慢下来了，是因为：',
    options: [
      { text: '找到一个能晒太阳、发呆、什么都不做的地方', pets: { capybara: 4.0 } },
      { text: '没有目的地，只顺着风慢慢走了一下午', pets: { lop: 4.0 } },
    ],
  },
];

export const ACT_BREAKS = [
  {
    beforeQ: 0,
    segmentLabel: '成都',
    label: '序章',
    title: '领取一只尚未成形的小毛球',
    quote: '远行前，它还不太懂怎样替你看世界。\n接下来的每次选择，都会教会它如何出发、如何铭记，又如何把远方写进一封信。',
    icon: '🐾',
    cta: '带它出发',
    image: './generated/chapters/chapter-01-capybara-v2.webp?v=2',
    imageAlt: '清晨站台上，背着小包的毛茸茸旅伴准备出发',
  },
  {
    beforeQ: 2,
    segmentLabel: '大理',
    label: '第二站',
    title: '大理 · 它学会怎样绕路',
    quote: '成都让它学会怎样慢慢落地。\n来到大理，它要在风和岔路之间，替你判断该往哪里走。',
    icon: '🍃',
    cta: '继续出发',
    image: './generated/chapters/chapter-02-capybara-v2.webp?v=2',
    imageAlt: '洱海边的岔路上，小旅伴停下来判断方向',
  },
  {
    beforeQ: 5,
    segmentLabel: '东京',
    label: '第三站',
    title: '东京 · 它学会在陌生世界里行动',
    quote: '它已经学会绕路，也学会替你留住一片风景。\n下一站更明亮、更复杂——它要试着在陌生世界里行动。',
    icon: '🚇',
    cta: '进入东京',
    image: './generated/chapters/chapter-03-capybara-v2.webp?v=2',
    imageAlt: '东京车站的人流里，小旅伴拿着地图寻找方向',
  },
  {
    beforeQ: 7,
    segmentLabel: '三亚',
    label: '第四站',
    title: '三亚 · 它学会如何给你写信',
    quote: '它开始懂得如何照顾自己，也照顾同行的人。\n旅程最后，它要把一路看见的世界，轻轻写进给你的第一封信。',
    icon: '🌙',
    cta: '去看海风',
    image: './generated/chapters/chapter-04-capybara-v2.webp?v=2',
    imageAlt: '月光下的三亚海滩，小旅伴准备写下第一封信',
  },
];

export const QUESTIONS = [
  {
    id: 1,
    stationLabel: '第一站',
    stationTitle: '成都 · 刚落地',
    scene: '到成都了。\n\n空气潮乎乎的，旁边有人举着刚买的蛋烘糕路过，四周弥漫着一股火锅底料的香味。街边还有只橘猫在台阶上睡觉，睡得很死。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-01-chengdu-arrival-v3.webp?v=2',
      alt: '成都刚落地的潮湿街边，蛋烘糕、火锅香气和睡着的橘猫',
      description: '刚落地的成都像一口潮热的锅。画面左侧是一只手举着刚买的蛋烘糕，奶油快要融开；街边有火锅店的红油雾气从门缝里飘出来，台阶上趴着一只睡到完全不管世界的橘猫。远处行李箱轮子压过湿漉漉的石板路，空气里有刚抵达的疲惫和一点兴奋。',
      directorNote: '镜头低一点，像人刚从车站出来拖着箱子看到的第一眼。左前景给蛋烘糕，中景给橘猫和台阶，远景用火锅热气和街灯制造“成都味道”。不要做成景点照，要像一张刚到城市时随手拍下的生活切片。',
      prompt: 'Wide cinematic diary-style scene, Chengdu street immediately after arrival, humid evening air and wet stone pavement, foreground hand holding a warm danhonggao egg cake with slightly melting cream, soft red hotpot steam drifting from a small restaurant doorway, an orange cat sleeping heavily on stone steps, a suitcase wheel trail on the ground, gentle travel fatigue mixed with appetite and curiosity, warm paper texture, olive and cream PAWTI palette, atmospheric depth, no text, no UI, 21:8 composition.',
    },
    q: '朋友问：“我们先去哪儿？”\n你更可能说：',
    options: [
      { text: '火锅前让我先来个老干妈奶油蛋烘糕开开胃', dims: { H: 2.0, E: 0.8, X: 0.6, P: -0.4 }, anchors: { food: 2.0, taste: 1.6, try: 1.0, smallJoy: 0.8 }, pets: { golden: 1.6, frenchie: 1.2, siamese: 1.0 } },
      { text: '按照计划，我们第一站要先去看大熊猫', dims: { P: 2.0, L: 1.5, E: 0.7, X: -0.8 }, anchors: { plan: 2.0, checklist: 1.5, leader: 1.2, safety: 0.6 }, pets: { collie: 1.8, corgi: 1.4 } },
      { text: '怪热闹的，我们跟那只猫拍个照吧先', dims: { A: 1.2, S: 0.7, X: 0.8, E: -0.2 }, anchors: { soft: 1.2, hidden: 0.8, smallJoy: 1.0, photo: 0.8 }, pets: { lop: 1.0, ragdoll: 0.9, orange: 0.8, calico: 0.6 } },
      { text: '力竭了已经，先回酒店歇会儿', dims: { E: -1.8, H: 1.0, P: 0.6, X: -0.8 }, anchors: { comfort: 2.0, chill: 1.6, quiet: 1.0, safety: 0.8 }, pets: { capybara: 1.8, british: 1.2, lop: 0.8 } },
    ],
    feedbacks: [
      '它记住了：一座城市可以先从香气里醒来。',
      '它记住了：陌生的路，也可以被你稳稳地牵住。',
      '它记住了：偶然遇见的小生命，也算旅程的第一声招呼。',
      '它记住了：刚抵达时，先把自己安顿好，也是一种出发。',
    ],
  },
  {
    id: 2,
    stationLabel: '第一站',
    stationTitle: '成都 · 雨突然落下来',
    scene: '下午走到玉林里的一条老巷子，雨忽然变大。\n\n路口茶馆的老板坐在屋檐下扇蒲扇，旧书店门口一排的小画书，更远处传来锅里翻炒的声音。你没带伞。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-02-chengdu-rain.webp?v=2',
      alt: '成都玉林老巷雨中茶馆、旧书店和锅气',
      description: '雨忽然把玉林的小巷压低了。屋檐下的茶馆老板慢慢扇着蒲扇，旧书店门口的小画书被雨气泡得微微卷边，巷子深处有炒菜的锅气和一盏暖黄灯。画面要有躲雨时那种“先别急”的停顿感，让人闻得到雨水、茶和热锅的味道。',
      directorNote: '构图像站在屋檐下往巷子里看：上方有雨线，左侧是茶馆，右侧是旧书店，巷子深处给一团模糊锅气。重点不是雨有多大，而是突然被迫停下后，城市慢慢靠近人的感觉。',
      prompt: 'Wide atmospheric travel diary illustration, rainy Yulin alley in Chengdu after a sudden downpour, tea house owner sitting under the awning slowly waving a palm fan, old picture books and faded posters at the entrance of a tiny bookshop with curled damp paper edges, warm wok steam and yellow light glowing deeper in the alley, glossy wet stone road reflecting lanterns, intimate shelter-from-rain mood, calm and sensory, paper grain, olive green and warm cream palette, no text, no signs, 21:8 composition.',
    },
    q: '你会：',
    options: [
      { text: '进茶馆喝壶茶，听雨停下来再说', dims: { E: -1.6, H: 1.0, A: 0.8, X: -0.4 }, anchors: { chill: 1.8, comfort: 1.4, smallJoy: 1.0, quiet: 0.8 }, pets: { capybara: 1.8, lop: 1.2, orange: 0.7 } },
      { text: '屋檐下和店主攀谈两句，聊聊附近有意思的地方', dims: { S: 2.0, X: 0.5, L: 0.6, E: 0.5 }, anchors: { social: 1.8, story: 1.5, warm: 1.2, local: 1.0 }, pets: { shiba: 1.8, samoyed: 1.1 } },
      { text: '借把伞沿着香味走，来都来了吃口苍蝇馆子', dims: { H: 1.6, X: 1.4, E: 1.0, P: -0.5 }, anchors: { food: 1.6, noise: 1.0, random: 1.2, try: 1.0 }, pets: { frenchie: 1.8, golden: 0.8, siamese: 0.8 } },
      { text: '躲进旧书店，翻翻小画书、旧海报', dims: { A: 2.0, S: -0.6, E: -0.5, L: 0.8 }, anchors: { hidden: 1.8, meaning: 1.5, aesthetic: 1.2, quiet: 1.0 }, pets: { lihua: 1.8, calico: 1.2, british: 0.7 } },
    ],
    feedbacks: [
      '它记住了：不是每一趟旅行都要立刻开始。',
      '它记住了：城市也藏在屋檐下的人情里。',
      '它记住了：有时地图不如一阵香味可靠。',
      '它记住了：热闹背后的小角落，也会发光。',
    ],
  },
  {
    id: 3,
    stationLabel: '第二站',
    stationTitle: '大理 · 洱海边的山道',
    scene: '你在大理洱海边发呆，风微凉，很惬意。\n\n朋友发消息说有条山间小道，爬上去据说能俯瞰整个洱海。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-03-dali-erhai-path.webp?v=2',
      alt: '大理洱海边微风和远处山间小道',
      description: '洱海边的风是凉的，水面很亮，人坐在湖边发呆，像暂时不需要回答任何事情。远处山坡上有一条细细的小道往上绕，隐约能看见更高处的湖面。画面不要热闹，要有“朋友发来一条消息，远方突然多了一种可能”的轻轻心动。',
      directorNote: '画面要留大量空气和水面，人物很小，手机提示只用一小点光暗示即可。山路要在远处但能被看见，像一个邀请。整体情绪是从松弛里冒出一点“要不要去看看”的心动。',
      prompt: 'Wide soft cinematic travel illustration, Dali Erhai lakeside in a cool breeze, a quiet traveler sitting near the water in a relaxed daze, shimmering lake surface and pale sky, far hillside with a thin winding mountain path leading upward to a lookout over the lake, small phone notification glow implied but no readable screen text, airy and peaceful, a sudden possibility in the distance, warm cream paper texture with olive shadows, no text, no UI, 21:8 composition.',
    },
    q: '你怎么回？',
    options: [
      { text: '哪呢哪呢发定位！', dims: { E: 2.0, X: 1.6, L: 1.0, P: -0.6 }, anchors: { wild: 1.8, action: 1.4, random: 0.8, view: 0.8 }, pets: { husky: 1.8, corgi: 0.6 } },
      { text: '往返要多久？我怕吃菌子那家去晚该下班了。', dims: { P: 1.0, H: 1.7, E: 0.5, X: -0.2 }, anchors: { food: 1.5, taste: 1.4, plan: 0.8, spend: 0.7 }, pets: { golden: 1.4, siamese: 1.2, frenchie: 0.6 } },
      { text: '挺好，记得多拍几张照片我云欣赏一下。', dims: { E: -2.0, H: 0.9, P: -0.6, S: -0.2 }, anchors: { chill: 1.8, comfort: 1.6, soft: 0.8, view: 0.8 }, pets: { capybara: 1.8, lop: 1.0, british: 0.5 } },
      { text: '好啊，我跟你一起。', dims: { E: 1.1, S: 1.0, X: 0.7, A: 0.6 }, anchors: { action: 1.0, together: 1.2, view: 1.0, photo: 0.8 }, pets: { corgi: 0.9, samoyed: 0.8, calico: 0.7 } },
    ],
    feedbacks: [
      '它正在学会：有些路不在计划里，却会在风里突然亮起来。',
      '它正在学会：浪漫不一定要失控，照顾好时间也能抵达风景。',
      '它正在学会：不必每一步都亲自走到，心也能先去看一眼。',
      '它正在学会：有些风景，是因为同行才变得更值得。',
    ],
  },
  {
    id: 4,
    stationLabel: '第二站',
    stationTitle: '大理 · 走错路',
    scene: '骑着刚租的小电驴环洱海，走错路了。\n\n是一条很窄的村道，两边是密得透不进光的竹林，安静得有点不真实。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-04-dali-wrong-turn.webp?v=2',
      alt: '大理窄村道、小电驴和密不透光的竹林',
      description: '环洱海的小电驴停在一条窄到不像路的村道旁。竹林密得把光筛成很细的线，路尽头看不清，安静得像误入了另一个世界。画面要有一点点不真实：不是危险，而是“走错了，但也许这里才有东西”的吸引。',
      directorNote: '镜头放在小电驴后方一点，像刚停下来犹豫要不要继续。竹林要形成明显纵深，路尽头有一点亮但不要看清。氛围是安静、神秘、轻微偏航，不要做成恐怖森林。',
      prompt: 'Wide atmospheric diary illustration, Dali village road after a wrong turn while riding around Erhai, a small electric scooter parked at the edge of a very narrow lane, dense bamboo forest on both sides filtering sunlight into thin lines, road disappearing into quiet green shadow, slightly surreal but not scary, feeling of accidental discovery and curiosity, warm paper grain, deep olive shadow, soft cream haze at the edges, no text, 21:8 composition.',
    },
    q: '你会？',
    options: [
      { text: '继续往里骑，看看尽头是什么', dims: { X: 2.0, E: 1.4, L: 1.0, P: -1.0 }, anchors: { random: 1.8, hidden: 1.2, wild: 1.0, action: 0.9 }, pets: { husky: 1.5, ragdoll: 1.2, lihua: 0.6 } },
      { text: '电驴靠边停好，钻进竹林看看', dims: { X: 1.7, E: 1.2, A: 1.0, P: -0.8, S: -0.4 }, anchors: { hidden: 1.6, wild: 1.2, weird: 0.9, action: 0.8 }, pets: { ragdoll: 1.6, husky: 0.9, lihua: 0.8 } },
      { text: '找好角度拍几张，朋友圈配文林深不见鹿', dims: { A: 2.0, X: 0.7, E: 0.2, L: 0.4 }, anchors: { photo: 1.8, aesthetic: 1.6, meaning: 0.8, collect: 0.6 }, pets: { calico: 1.8, orange: 0.8, lihua: 0.7 } },
      { text: '立刻打开地图，应该是上个路口骑岔了', dims: { P: 2.0, L: 1.4, X: -1.2, E: -0.2 }, anchors: { plan: 2.0, safety: 1.6, checklist: 1.0, leader: 0.8 }, pets: { collie: 1.8, corgi: 1.0, british: 0.4 } },
    ],
    feedbacks: [
      '它正在学会：走错路也可能是世界递来的暗号。',
      '它正在学会：你会被那些没理由的入口轻轻拽住。',
      '它正在学会：光落下来的那一秒，也值得认真等一等。',
      '它正在学会：安全感不是停下，而是知道怎么回到方向。',
    ],
  },
  {
    id: 5,
    stationLabel: '第二站',
    stationTitle: '大理 · 你希望它替你看见什么',
    scene: '傍晚，你决定让小宠物自己去古城里逛一圈。\n\n临走前只能嘱咐一句。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-05-dali-pet-alone.webp?v=2',
      alt: '傍晚大理古城里背着小包独自出发的小宠物轮廓',
      description: '傍晚的大理古城开始亮灯，一只还没有完全成形的小毛球背着小包，独自往巷子里走。街边有旧招牌、小挂件、明信片和半开的木门。它回头看你一眼，像是在等你最后交代一句：要替你看什么、记什么、带什么回来。',
      directorNote: '这是代理旅行感最强的一张：小宠物不要画成具体品种，只是圆圆的毛球轮廓，有耳朵或尾巴的暗示。它在画面下方偏右，背对巷子、回头看用户。巷子要温暖，像“放它自己去逛”但不会让人担心。',
      prompt: 'Tender wide diary illustration, Dali old town at dusk with warm shop lights beginning to glow, a small undefined fluffy pet silhouette wearing a tiny backpack walking alone into an alley, old signs, postcards, small hanging souvenirs, half-open wooden doors, the pet gently looking back as if waiting for one final instruction, proxy travel, trust, softness, warm cream and olive palette, paper texture, no readable text, no UI, 21:8 composition.',
    },
    q: '你最想告诉它：',
    options: [
      { text: '留意那些不写在攻略里的旧招牌和本地故事', dims: { A: 2.0, L: 1.0, S: -0.4, X: 0.6 }, anchors: { hidden: 1.8, story: 1.6, meaning: 1.6, local: 1.0 }, pets: { lihua: 1.8, british: 0.6 } },
      { text: '如果遇到很好看的转角，记得替我拍下来', dims: { A: 2.0, H: 0.5, L: 0.5 }, anchors: { photo: 2.0, aesthetic: 1.8, collect: 0.8, view: 0.8 }, pets: { calico: 1.8, orange: 0.7 } },
      { text: '看见好吃、好看的小东西，可以挑一样带回来', dims: { H: 1.8, A: 0.9, X: 0.4 }, anchors: { collect: 1.8, smallJoy: 1.5, taste: 1.0, spend: 0.8 }, pets: { orange: 1.8, siamese: 0.8, golden: 0.7 } },
      { text: '不必挂念，晚上告诉我你今天开不开心就好', dims: { H: 1.0, S: 0.7, E: -0.9, L: -0.3 }, anchors: { comfort: 1.5, soft: 1.5, warm: 1.2, chill: 0.8 }, pets: { lop: 1.5, capybara: 1.0, samoyed: 0.6 } },
    ],
    feedbacks: [
      '它正在学会：旧招牌会褪色，但故事会悄悄留下来。',
      '它正在学会：那些刚刚好好看的瞬间，可以替你保存。',
      '它正在学会：旅行也是把小小的喜欢装进口袋里。',
      '它正在学会：比起抵达多少地方，你更在意它有没有被风好好照顾。',
    ],
  },
  {
    id: 6,
    stationLabel: '第三站',
    stationTitle: '东京 · 新宿站的五分钟',
    scene: '你们在新宿站换乘。人从四面八方涌过来，朋友们看着导航开始沉默——屏幕上的线路图密密麻麻，像一碗打结的面。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-06-tokyo-shinjuku.webp?v=2',
      alt: '东京新宿站人流、导航和像打结的线路图',
      description: '新宿站像一团会移动的线。人潮从四面涌来，朋友们围着手机导航沉默，头顶的线路和指示牌像打结的面条。旁边远远有便利店冷白的灯，给混乱里留了一点安全感。画面要有复杂、明亮、轻微迷路的压迫感。',
      directorNote: '画面中心是朋友们围着手机的停顿，周围人流做成拖影，让“他们不动，世界在动”的感觉出来。顶部线路可以抽象成复杂线条，但不能出现可读文字。便利店灯作为远处的安全出口，不要抢主体。',
      prompt: 'Wide cinematic diary illustration, Shinjuku station transfer moment, dense crowd streams moving from multiple directions, a small group of friends standing still around a phone map in silence, overhead train lines and station signs abstracted like tangled noodles with no readable text, cool white convenience-store light glowing nearby as a tiny safe point, bright complex urban pressure, slight lost feeling, soft haze, no UI, 21:8 composition.',
    },
    q: '你通常会：',
    options: [
      { text: '接过手机，带大家先坐这条线，再换乘', dims: { P: 2.0, L: 2.0, X: -1.0, E: 0.5 }, anchors: { plan: 2.0, leader: 2.0, safety: 1.0, checklist: 0.8 }, pets: { collie: 1.8, corgi: 1.0 } },
      { text: '跟着走就行，谁带路我都可以，别把我落下', dims: { S: 1.5, L: -0.8, P: 0.5, X: -0.4 }, anchors: { warm: 1.8, follow: 1.4, together: 1.2, social: 0.8 }, pets: { samoyed: 1.8, shiba: 0.8, lop: 0.5 } },
      { text: '想去旁边便利店看看，等会儿地铁口汇合', dims: { L: 1.7, S: -1.8, A: 0.7, X: 0.6, E: -0.3 }, anchors: { solo: 1.8, hidden: 1.0, quiet: 1.0, smallJoy: 0.8 }, pets: { british: 1.8, lihua: 0.9, orange: 0.5 } },
      { text: '活跃氛围，追风接梗，即使坐错也是东京限定体验', dims: { X: 2.0, P: -1.0, E: 1.0, S: 0.8 }, anchors: { random: 1.8, story: 1.0, weird: 1.0, lively: 0.8 }, pets: { husky: 1.3, ragdoll: 1.3, frenchie: 0.6 } },
    ],
    feedbacks: [
      '它发现了：世界像一团打结的线时，你会先把方向找出来。',
      '它发现了：你不一定站在最前面，但很在意不要和喜欢的人走散。',
      '它发现了：只离队五分钟，也可以拥有一小块自己的城市。',
      '它发现了：迷路不一定是事故，也可能是城市递来的限定体验。',
    ],
  },
  {
    id: 7,
    stationLabel: '第三站',
    stationTitle: '东京 · 最后一晚的便利店',
    scene: '东京最后一晚。回酒店路上路过一家便利店，门口亮得很安心，货架上全是没见过的饭团、布丁、限定饮料和小零食。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-07-tokyo-konbini.webp?v=2',
      alt: '东京夜晚便利店、饭团布丁和限定饮料',
      description: '东京最后一晚，便利店像一盏不会追问你的灯。玻璃门里是饭团、布丁、限定饮料和一排排包装好看的小零食，门外是安静的街、细细的路灯和快结束旅行时那种舍不得。画面要像“再买一点，把今晚带回去”。',
      directorNote: '镜头从便利店外往里看，玻璃门和货架形成明亮窗口。不要画成拥挤超市，要有深夜路过、进去前停一下的感觉。货架颜色可以丰富，但所有包装都不能有可读品牌或文字。',
      prompt: 'Wide warm night travel illustration, Tokyo convenience store glowing softly on a quiet street on the last night of a trip, glass doors and shelves filled with rice balls, pudding cups, limited drinks, colorful small snacks with no readable labels, reflections on pavement, streetlamp outside, tender reluctance before returning to hotel, comforting and slightly nostalgic, paper texture, cream and muted neon palette, no text, 21:8 composition.',
    },
    q: '你最可能：',
    options: [
      { text: '布丁、饭团、限定饮料都想试，最后一晚不能空手回去', dims: { H: 2.0, E: 0.7, X: 0.4 }, anchors: { food: 1.8, taste: 2.0, try: 1.0, smallJoy: 0.8 }, pets: { golden: 1.8, siamese: 0.8, frenchie: 0.6 } },
      { text: '慢慢看每一排包装，挑一个最顺眼的带走', dims: { A: 1.6, H: 1.1, E: -0.2, X: 0.4 }, anchors: { aesthetic: 1.6, collect: 1.4, smallJoy: 1.0, photo: 0.7 }, pets: { orange: 1.5, calico: 1.0, british: 0.4 } },
      { text: '本来只想买水，结果边猎奇边拿了一路', dims: { X: 1.8, H: 1.5, E: 1.0, P: -0.6 }, anchors: { try: 1.8, weird: 1.2, spend: 1.2, random: 1.0 }, pets: { siamese: 1.6, frenchie: 1.0, ragdoll: 0.6 } },
      { text: '买杯热饮，沿着安静的街慢慢走回去', dims: { E: -1.6, A: 1.0, H: 0.9, S: -0.6 }, anchors: { quiet: 1.5, chill: 1.5, comfort: 1.2, soft: 0.8 }, pets: { british: 1.5, capybara: 1.0, lop: 0.8 } },
    ],
    feedbacks: [
      '它发现了：你会用一点味道，把快结束的一晚轻轻封存起来。',
      '它发现了：你挑走的不是商品，是刚好被打中的心情。',
      '它发现了：“来都来了”之后，总有一些新鲜感值得试试。',
      '它发现了：最后一晚不必热烈告别，也可以温柔收尾。',
    ],
  },
  {
    id: 8,
    stationLabel: '第四站',
    stationTitle: '三亚 · 海边天黑以后',
    scene: '后海村晚上，路边灯都亮了。有人刚冲浪回来，头发还湿着，烧烤摊在冒烟，旁边一桌人笑得很大声。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-08-sanya-houhai.webp?v=2',
      alt: '三亚后海村夜晚、冲浪后的人、烧烤烟和笑声',
      description: '后海村入夜以后，路边灯一盏盏亮起来。有人抱着冲浪板回来，头发还滴着水；烧烤摊的烟往海风里散，旁边一桌人笑得很大声。画面要热闹但不拥挤，有海边夜晚的咸味、烟火气和“下一小时随便发生什么都行”的松动。',
      directorNote: '画面要有左右两种能量：一边是海风和冲浪板带来的湿润感，一边是烧烤摊和笑声带来的烟火气。人物可以是剪影或半身，不需要看清脸。重点是夜晚变得开放，像随时会发生一个小故事。',
      prompt: 'Wide lively yet cozy diary illustration, Sanya Houhai village at night, roadside lights turning on, wet-haired surfer carrying a surfboard back from the sea, barbecue smoke drifting into sea breeze, nearby table of people laughing loudly, warm amber lamps, dark blue coastal air, relaxed anything-can-happen next-hour feeling, cinematic depth, paper texture, no readable text, no UI, 21:8 composition.',
    },
    q: '接下来一小时，你：',
    options: [
      { text: '被那桌人逗笑了，没准一会儿就聊上了', dims: { S: 2.0, E: 1.1, X: 0.8, L: 0.6 }, anchors: { social: 2.0, lively: 1.5, story: 1.2, warm: 0.8 }, pets: { shiba: 1.8, frenchie: 0.7, samoyed: 0.6 } },
      { text: '烧烤配啤酒，找个地方坐着吹海风', dims: { H: 1.8, E: -0.4, S: 0.6, X: 0.2 }, anchors: { food: 1.2, chill: 1.4, comfort: 1.0, lively: 0.7 }, pets: { capybara: 1.1, golden: 1.1, siamese: 0.7 } },
      { text: '蹲蹲大家想干啥，一起开心最重要', dims: { S: 1.8, L: -1.2, H: 0.8, E: 0.3 }, anchors: { warm: 1.8, follow: 1.8, together: 1.5, comfort: 0.7 }, pets: { samoyed: 1.8, lop: 0.8, shiba: 0.5 } },
      { text: '看到有人玩水拍照，莫名其妙又下水玩起来', dims: { X: 1.8, E: 1.7, P: -0.8, A: 0.6 }, anchors: { random: 1.5, action: 1.5, wild: 1.2, photo: 0.8 }, pets: { husky: 1.4, ragdoll: 1.0, corgi: 0.7 } },
    ],
    feedbacks: [
      '第一封信的语气开始变暖：笑声很大的夜晚，也值得被记住。',
      '第一封信里有烧烤的烟、夜风的咸，和一点点被好好喂饱的幸福。',
      '第一封信学会了回头看你：去哪里不重要，和谁在一起更重要。',
      '第一封信里已经有一点海风和小小的失控。',
    ],
  },
  {
    id: 9,
    stationLabel: '第四站',
    stationTitle: '三亚 · 它寄来的第一句话',
    scene: '夜里，小宠物终于从三亚寄来第一封信。\n\n通知栏只能看到第一句话。',
    sceneImage: {
      placement: 'scene-before-question',
      src: './generated/quiz/scene-09-sanya-first-letter.webp?v=2',
      alt: '三亚夜里手机通知亮起，小宠物寄来第一封信',
      description: '夜里房间很安静，窗外远远有海。手机屏幕亮起来，只露出一条看不清字的通知；桌边的小毛球趴着写明信片，旁边有一盏暖黄小灯和几张刚拍回来的照片。画面要有“第一封信终于来了”的轻微心跳。',
      directorNote: '这张要非常安静，像结果揭晓前的一秒。手机屏幕可以发光但不能有文字，小毛球在灯下写东西，照片散在旁边但内容只隐约可见。窗外海面和月光负责把空间拉远，桌面暖光负责把情绪拉近。',
      prompt: 'Wide quiet emotional diary illustration, Sanya night inside a small room by a window with distant dark sea, phone screen glowing with a message notification but absolutely no readable text, a small fluffy pet silhouette lying at a desk writing a postcard, warm lamp, a few freshly taken travel photos scattered nearby, moonlight, intimate first-letter heartbeat, soft cream haze, no UI, 21:8 composition.',
    },
    q: '哪一句会让你最想马上点开？',
    options: [
      { text: '我三天狂炫二十家店，巷尾的这家海南鸡饭，肉最嫩、葱油最香。', dims: { H: 1.8, X: 0.8, E: 0.8, S: 0.4 }, anchors: { food: 1.8, taste: 1.6, story: 1.0, lively: 0.7 }, pets: { golden: 1.4, frenchie: 1.2, siamese: 0.5 } },
      { text: '我好像走错路了，但这里比原来的目的地更有意思。', dims: { X: 2.0, P: -1.0, A: 0.7, E: 0.5 }, anchors: { weird: 1.5, random: 1.8, hidden: 1.0, story: 0.8 }, pets: { ragdoll: 1.8, husky: 1.0, lihua: 0.5 } },
      { text: '我找到一个很安静的角落，光落在我脸上，可爱如常。', dims: { A: 1.7, E: -1.0, S: -0.7, H: 0.7 }, anchors: { quiet: 1.3, aesthetic: 1.6, soft: 1.0, meaning: 0.8 }, pets: { calico: 1.3, british: 1.1, lihua: 0.9, lop: 0.4 } },
      { text: '我这绝对是最完美的路线和攻略，所有雷点都排好啦~', dims: { P: 2.0, L: 1.6, X: -0.6, E: 0.3 }, anchors: { plan: 1.8, checklist: 1.6, leader: 1.2, safety: 1.0 }, pets: { collie: 1.5, corgi: 1.4 } },
    ],
    feedbacks: [
      '它终于明白：有些城市，要从一口热腾腾的味道开始写。',
      '它终于明白：真正有意思的地方，常常藏在走错路以后。',
      '它终于明白：不急着说话的角落，也可以很认真地想你。',
      '它终于明白：把路铺好，也是在替你温柔地抵达。',
    ],
  },
];

export const PERSONAS = [
  {
    code: 'WILD',
    chinese: '一脚踩空也要先跑出去的哈士奇',
    englishLine: 'THE WIND-LED RUNNER',
    tagline: '被风、山路和未知点燃',
    petId: 'husky',
    petName: '哈士奇',
    primaryTags: ['追风', '行动', '岔路'],
    description: '它会替你先跑出去。风从哪边来，它就往哪边冲；哪条路没有写在计划里，它就最想替你先走进去看看。',
    petReason: '你们都相信：真正的旅程常常发生在“本来不是要去那里”的路上。',
    cities: ['西藏', '冰岛', '新疆'],
    color: '#D8E8F0',
  },
  {
    code: 'BAYG',
    chinese: '耳朵一飞起来就知道又要闯祸的比格',
    englishLine: 'THE NOSE-LED WANDERER',
    tagline: '有声有味的地方最值得追',
    petId: 'frenchie',
    petName: '比格犬',
    primaryTags: ['热闹', '香味', '好奇过载'],
    description: '它会替你追着声音、香味和热闹跑过去。不是因为计划写了那里，而是身体已经被新鲜感拽走了。',
    petReason: '你们都很难对“来都来了”保持冷静，尤其当空气里有一点香味和一点动静。',
    cities: ['重庆', '长沙', '武汉'],
    color: '#EADDC8',
  },
  {
    code: 'MOON',
    chinese: '上一秒端着走路下一秒突然弹射的奶牛猫',
    englishLine: 'THE ODD DOOR SEEKER',
    tagline: '奇怪，但很有意思',
    petId: 'ragdoll',
    petName: '奶牛猫',
    primaryTags: ['奇怪入口', '随机', '抽象派'],
    description: '它会替你钻进那些看上去没理由、但就是很有意思的地方。别人问为什么，你们可能也说不清。',
    petReason: '你们都保留着一点不解释的冲动：越奇怪，越想看看。',
    cities: ['上海', '京都', '里斯本'],
    color: '#E8D5E8',
  },
  {
    code: 'PLAN',
    chinese: '眼神比你还清醒的边牧',
    englishLine: 'THE PLAN GEEK',
    tagline: '把远方变成可以放心抵达的路线',
    petId: 'collie',
    petName: '边牧',
    primaryTags: ['规划', '带路', '安全感'],
    description: '它会替你把路线、换乘、时间和雷点都提前顺好。不是为了扫兴，而是为了让风景更安心地发生。',
    petReason: '你们都知道，秩序不是旅行的反面，秩序是让人玩得更放松的底气。',
    cities: ['京都', '苏州', '瑞士'],
    color: '#CFDCC5',
  },
  {
    code: 'DOIT',
    chinese: '小短腿但永远不肯被落下的柯基酱',
    englishLine: 'THE CHECKLIST RUNNER',
    tagline: '一个都不能少',
    petId: 'corgi',
    petName: '柯基酱',
    primaryTags: ['执行', '打卡', '完成'],
    description: '它会替你把想去的地方一个个点亮。腿短不影响冲劲，路线远也不影响“今天必须完成”。',
    petReason: '你们都对“没逛完就回去”这件事有点不甘心。',
    cities: ['首尔', '东京', '新加坡'],
    color: '#F5D9C0',
  },
  {
    code: 'FOOD',
    chinese: '看见美食眼睛能亮出两个太阳的金毛',
    englishLine: 'THE FOOD CAPTAIN',
    tagline: '一口就让城市变亲近',
    petId: 'golden',
    petName: '金毛',
    primaryTags: ['味觉', '分享', '满足'],
    description: '它会替你认真吃、认真闻、认真记住每一口。城市不是地图上的名字，而是某家小店冒出来的热气。',
    petReason: '你们都相信：胃先喜欢上的地方，心也会慢慢住下来。',
    cities: ['成都', '潮汕', '大阪'],
    color: '#F5D79C',
  },
  {
    code: 'TRYX',
    chinese: '就是要消费既然来都来了的鼠鼠',
    englishLine: 'THE LITTLE TRYER',
    tagline: '能吃能买能试，别扫兴',
    petId: 'siamese',
    petName: '豚鼠鼠',
    primaryTags: ['尝试', '小东西', '不扫兴'],
    description: '它会替你把新鲜东西试个遍。好吃的、好看的、没见过的，都可以成为这一趟的具体快乐。',
    petReason: '你们都很会把旅程变成一袋满满当当的小喜欢。',
    cities: ['伊斯坦布尔', '长沙', '京都'],
    color: '#E6DBC9',
  },
  {
    code: 'GEMS',
    chinese: '把小宝贝一件件叼回窝里的小熊猫',
    englishLine: 'THE SMALL JOY COLLECTOR',
    tagline: '舍不得忘记的碎片，要收好',
    petId: 'orange',
    petName: '小熊猫',
    primaryTags: ['收藏', '小确幸', '审美'],
    description: '它会替你收集那些小小的、软软的、好看的瞬间。不是大景点也没关系，只要心里轻轻亮了一下。',
    petReason: '你们都愿意认真对待细小的快乐，并把它们带回家。',
    cities: ['峨眉山', '婺源', '苏州'],
    color: '#F3E0CB',
  },
  {
    code: 'SLOW',
    chinese: '泡澡不被打扰天塌了也不管的豚豚君',
    englishLine: 'THE SUN SOAKER',
    tagline: '不急，太阳又不会跑',
    petId: 'capybara',
    petName: '豚豚君',
    primaryTags: ['松弛', '舒服', '晒太阳'],
    description: '它会替你把“什么也不做”过得郑重其事。一杯热茶、一阵雨声、一块阳光，都是旅行本身。',
    petReason: '你们都知道：身体先放松下来，远方才会变得亲近。',
    cities: ['大理', '清迈', '婺源'],
    color: '#F2E7CE',
  },
  {
    code: 'SOFT',
    chinese: '一被摸就化成一摊年糕的垂耳兔',
    englishLine: 'THE GENTLE FLOATER',
    tagline: '先别急，风会带路',
    petId: 'lop',
    petName: '垂耳兔',
    primaryTags: ['温柔', '顺风走', '陪伴'],
    description: '它会替你顺着风和心情慢慢走。去哪里不一定重要，重要的是一路有没有被温柔地照顾。',
    petReason: '你们都不急着证明什么，更在意路上有没有舒服、柔软、被接住的时刻。',
    cities: ['巴厘岛', '大理', '清迈'],
    color: '#F3E6D0',
  },
  {
    code: 'HIDE',
    chinese: '晒干野花瓣作 OOTD 小配饰的狸花猫',
    englishLine: 'THE OFF-GRID STORY SEEKER',
    tagline: '旧巷、二楼和没人写下的故事',
    petId: 'lihua',
    petName: '狸花猫',
    primaryTags: ['隐藏角落', '意义感', '本地故事'],
    description: '它会替你走进热闹背后的旧巷和二楼。旧招牌、掉漆的字、店主的一句话，都可能是它寄回来的重点。',
    petReason: '你们都容易被“不显眼但有来历”的东西吸引。',
    cities: ['泉州', '平遥', '里斯本'],
    color: '#E8DFCE',
  },
  {
    code: 'SOLO',
    chinese: '被吵到了也只是缓缓闭上一只眼的英短',
    englishLine: 'THE QUIET SOLOIST',
    tagline: '这一小块城市，只属于我',
    petId: 'british',
    petName: '英短蓝猫',
    primaryTags: ['独处', '安静', '自成空间'],
    description: '它会替你找到可以独自待很久的地方。没有人催促，没有人打扰，世界安静下来以后，你才真正抵达。',
    petReason: '你们都珍惜那种不必解释、不被打扰的完整感。',
    cities: ['冰岛', '北海道', '苏格兰'],
    color: '#DCE2E8',
  },
  {
    code: 'SHOT',
    chinese: '每个角度都自带电影感的三花',
    englishLine: 'THE FRAME HUNTER',
    tagline: '光刚刚好，就值得按下快门',
    petId: 'calico',
    petName: '三花猫',
    primaryTags: ['光影', '照片', '审美判断'],
    description: '它会替你等光、看颜色、找角度。那个“刚刚好”的一秒，会被它认真保存下来。',
    petReason: '你们都认得出：有些瞬间不需要热闹，只需要刚好好看。',
    cities: ['东京', '厦门', '巴塞罗那'],
    color: '#F7E4CA',
  },
  {
    code: 'TALK',
    chinese: '被叫一声就笑出八颗牙的柴犬',
    englishLine: 'THE STREET SOCIALITE',
    tagline: '陌生人只是还没认识的朋友',
    petId: 'shiba',
    petName: '柴犬',
    primaryTags: ['社交', '故事', '热闹'],
    description: '它会替你和这个世界打招呼。屋檐下的人、夜市里的笑声、路边突然聊上的故事，都会被它带回来。',
    petReason: '你们都相信，人和人靠近时，城市会忽然变亮。',
    cities: ['曼谷', '伊斯坦布尔', '成都'],
    color: '#F8D6C4',
  },
  {
    code: 'WARM',
    chinese: '招招手就会笑眯眯贴回去的萨摩耶',
    englishLine: 'THE WARM COMPANION',
    tagline: '和喜欢的人一起，路就是好的',
    petId: 'samoyed',
    petName: '萨摩耶',
    primaryTags: ['陪伴', '跟随', '温暖'],
    description: '它会替你在人群里慢一点、回头看一眼。方向不一定要由你掌控，但同行的人不能走散。',
    petReason: '你们都很懂：去哪里不重要，和谁一起才重要。',
    cities: ['清迈', '长沙', '冲绳'],
    color: '#EDEAE3',
  },
  {
    code: 'LOST',
    chinese: '跑出三米就忘了主人长什么样的博美',
    englishLine: 'THE HAPPY LOST',
    tagline: '我不是迷路，我是在探险',
    petId: 'pomeranian',
    petName: '博美',
    primaryTags: ['兜底', '好奇', '迷路'],
    description: '它暂时不在本轮核心匹配里，但会作为未来彩蛋保留。',
    petReason: '有些小动物只负责快乐跑远，暂时不负责被准确分类。',
    cities: ['西藏', '新疆', '挪威'],
    color: '#F9DDC2',
  },
];

export const MYSTERY_PERSONA = {
  code: 'MYST',
  chinese: '还没有被完全拼出来的小毛球',
  englishLine: 'THE UNFINISHED PAW',
  tagline: '只差最后一小片心情',
  petId: 'mystery',
  petName: '小毛球',
  primaryTags: ['未成形', '需要更多线索', '动态题候选'],
  description: '它已经露出一点尾巴了，但耳朵、脚步和来信语气还没有完全拼完整。',
  petReason: '你的旅行偏好在几个方向之间轻轻摇摆，还需要最后一点点线索。',
  cities: [],
  color: '#EDE6D4',
  isMystery: true,
};

const PET_PROTOTYPES = {
  husky: { P: -1, E: 2, S: 1, X: 2, A: 0, H: 0, L: 1 },
  frenchie: { P: -1, E: 2, S: 1, X: 1, A: -1, H: 2, L: 0 },
  ragdoll: { P: -2, E: 1, S: 0, X: 2, A: 1, H: 0, L: 1 },
  collie: { P: 2, E: 1, S: 0, X: -1, A: 0, H: 0, L: 2 },
  corgi: { P: 2, E: 2, S: 1, X: 0, A: 0, H: 1, L: 1 },
  golden: { P: 0, E: 1, S: 2, X: 0, A: 0, H: 2, L: 0 },
  siamese: { P: 0, E: 1, S: 0, X: 1, A: 1, H: 2, L: 0 },
  orange: { P: 0, E: -1, S: -1, X: 0, A: 2, H: 2, L: 0 },
  capybara: { P: -1, E: -2, S: 0, X: -1, A: 1, H: 2, L: 0 },
  lop: { P: -1, E: -1, S: 1, X: 1, A: 1, H: 1, L: -1 },
  lihua: { P: 0, E: -1, S: -1, X: 1, A: 2, H: 0, L: 2 },
  british: { P: 1, E: -2, S: -2, X: -1, A: 1, H: 1, L: 2 },
  calico: { P: 0, E: 0, S: 0, X: 0, A: 2, H: 1, L: 1 },
  shiba: { P: 0, E: 1, S: 2, X: 1, A: 0, H: 0, L: 2 },
  samoyed: { P: 0, E: 1, S: 2, X: 0, A: 0, H: 1, L: -1 },
};

const PET_ANCHOR_PROFILES = {
  husky: { wild: 2.0, action: 1.6, random: 1.4, view: 0.8, lively: 0.6 },
  frenchie: { food: 1.3, noise: 1.6, lively: 1.4, try: 1.3, random: 1.1 },
  ragdoll: { weird: 2.0, random: 1.8, hidden: 1.0, action: 0.8 },
  collie: { plan: 2.0, leader: 1.8, safety: 1.4, checklist: 1.2 },
  corgi: { checklist: 1.8, action: 1.6, plan: 1.4, view: 0.8, lively: 0.6 },
  golden: { food: 2.0, taste: 1.8, warm: 1.0, share: 1.0, lively: 0.7 },
  siamese: { try: 1.8, spend: 1.6, taste: 1.4, smallJoy: 1.0, lively: 0.7 },
  orange: { collect: 2.0, smallJoy: 1.6, aesthetic: 1.4, comfort: 0.8 },
  capybara: { chill: 2.0, comfort: 1.8, soft: 1.0, quiet: 0.8 },
  lop: { soft: 1.8, comfort: 1.4, follow: 1.0, chill: 1.0, warm: 0.8 },
  lihua: { hidden: 2.0, meaning: 1.8, story: 1.4, quiet: 1.0, local: 1.0 },
  british: { solo: 2.0, quiet: 1.8, comfort: 1.0, aesthetic: 0.8, safety: 0.6 },
  calico: { aesthetic: 2.0, photo: 1.8, collect: 1.0, view: 0.8 },
  shiba: { social: 2.0, story: 1.8, lively: 1.2, local: 1.0, warm: 0.8 },
  samoyed: { warm: 2.0, follow: 1.8, together: 1.6, comfort: 0.8, social: 0.8 },
};

const ANCHOR_LABELS = {
  food: '味觉雷达',
  taste: '亲自尝过',
  try: '来都来了',
  spend: '具体快乐',
  collect: '收藏碎片',
  smallJoy: '小确幸',
  plan: '路线安心',
  checklist: '稳稳完成',
  leader: '带路能力',
  safety: '安全感',
  wild: '追风',
  random: '即兴拐弯',
  weird: '奇怪有趣',
  noise: '热闹香气',
  action: '先动起来',
  chill: '慢下来',
  comfort: '身体舒服',
  soft: '柔软心情',
  quiet: '安静角落',
  hidden: '旧巷二楼',
  meaning: '故事意味',
  story: '本地故事',
  aesthetic: '光影颜色',
  photo: '按下快门',
  solo: '自己的五分钟',
  social: '陌生人快乐',
  warm: '人情暖意',
  follow: '安心同行',
  together: '一起更重要',
  lively: '现场感',
  local: '本地气息',
  view: '看见风景',
  share: '分享快乐',
};

const ANCHOR_PHRASES = {
  food: '一口让城市忽然变亲近的味道',
  taste: '需要亲自尝过才算抵达的瞬间',
  try: '“来都来了”之后的小小冒险',
  spend: '能买、能吃、能试的具体快乐',
  collect: '舍不得忘记、想悄悄带回来的碎片',
  smallJoy: '路边突然冒出来的小确幸',
  plan: '让远方变得安心的路线',
  checklist: '一个个被稳稳完成的小目标',
  leader: '在复杂世界里先找到方向的能力',
  safety: '把慌张提前安放好的秩序',
  wild: '被风、山路和未知点燃的冲动',
  random: '没有理由却很想拐进去的瞬间',
  weird: '奇怪、抽象、但很有意思的东西',
  noise: '声音、香味和热闹一起涌过来的地方',
  action: '先动起来再说的身体反应',
  chill: '什么都不做也很好的下午',
  comfort: '身体先放松下来的地方',
  soft: '不需要用力也能被接住的心情',
  quiet: '可以独自待很久的安静角落',
  hidden: '藏在热闹背后的旧巷和二楼',
  meaning: '让风景不只是风景的故事',
  story: '路人、店主和城市留下来的小片段',
  aesthetic: '光、颜色和构图刚好对上的一秒',
  photo: '值得替你按下快门的画面',
  solo: '不被打扰、只属于自己的五分钟',
  social: '和陌生人忽然聊上的快乐',
  warm: '被人情、笑声和陪伴照亮的时刻',
  follow: '不必掌控方向也能安心同行',
  together: '去哪里不重要，和谁在一起更重要',
  lively: '有灯、有笑声、有热闹的现场感',
  local: '只有停下来才会听见的本地气息',
  view: '替你先看见的一片风景',
  share: '想带回去分给你的快乐',
};

const Q5_PROXY_LINES = [
  '它会多留意没有被写进攻略里的旧招牌和本地故事。',
  '它会替你等待那个很好看的转角，然后认真按下快门。',
  '它会把好吃、好看、舍不得忘的小东西悄悄带回来。',
  '它会先确认自己有没有开心，再把那份轻松寄给你。',
];

const Q9_LETTER_LINES = [
  '它的来信会从一口具体的味道开始，把城市写得热气腾腾。',
  '它的来信会承认走错路，也会告诉你错路上藏着什么惊喜。',
  '它的来信会很安静，像光落在脸上的那一秒。',
  '它的来信会清清楚楚，把路线、雷点和安心感一起寄回来。',
];

const PET_IDS = Object.keys(PET_PROTOTYPES);

function addWeighted(target, source = {}, weight = 1) {
  Object.entries(source).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + value * weight;
  });
}

function getDimMaxAbs() {
  const maxAbs = Object.fromEntries(DIM_KEYS.map(dim => [dim, 0]));
  QUESTIONS.forEach((q, qIdx) => {
    const weight = QUESTION_WEIGHTS[qIdx] || 1;
    DIM_KEYS.forEach(dim => {
      const optionMax = Math.max(...q.options.map(opt => Math.abs(opt.dims?.[dim] || 0)));
      maxAbs[dim] += optionMax * weight;
    });
  });
  DIM_KEYS.forEach(dim => {
    if (!maxAbs[dim]) maxAbs[dim] = 1;
  });
  return maxAbs;
}

function normalizeDims(rawDims) {
  const maxAbs = getDimMaxAbs();
  return Object.fromEntries(DIM_KEYS.map(dim => {
    const normalized = (rawDims[dim] || 0) / maxAbs[dim];
    return [dim, Math.max(-1, Math.min(1, normalized))];
  }));
}

function compressAnchors(rawAnchors) {
  return Object.fromEntries(
    Object.entries(rawAnchors).map(([key, value]) => [key, Math.log1p(Math.max(0, value))])
  );
}

function cosineSimilarity(a, b, keys) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  keys.forEach(key => {
    const av = a[key] || 0;
    const bv = b[key] || 0;
    dot += av * bv;
    magA += av * av;
    magB += bv * bv;
  });
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function dimensionFit(userDimsNorm, petPrototype) {
  const sim = cosineSimilarity(userDimsNorm, petPrototype, DIM_KEYS);
  return ((sim + 1) / 2) * 100;
}

function anchorFit(userAnchorsCompressed, petAnchorProfile) {
  const keys = Array.from(new Set([
    ...Object.keys(userAnchorsCompressed),
    ...Object.keys(petAnchorProfile),
  ]));
  const sim = cosineSimilarity(userAnchorsCompressed, petAnchorProfile, keys);
  return Math.max(0, sim) * 100;
}

function getTopAnchors(userAnchorsCompressed) {
  return Object.entries(userAnchorsCompressed)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, score]) => ({ key, score, label: ANCHOR_LABELS[key] || key, phrase: ANCHOR_PHRASES[key] || key }));
}

function generateInsight(answers, topAnchors) {
  const phrases = topAnchors.map(anchor => anchor.phrase);
  const fallback = ['路边突然冒出来的小确幸', '可以被慢慢记住的心情', '从远方寄回来的小片段'];
  const filled = [...phrases, ...fallback].slice(0, 3);

  return {
    topAnchorKeys: topAnchors.map(anchor => anchor.key),
    captureLine: `它不是单纯替你去远方，而是会优先捕捉${filled[0]}、${filled[1]}，以及${filled[2]}。`,
    proxyLine: Q5_PROXY_LINES[answers[4]] || '它会替你筛选那些最值得被写进明信片的小片段。',
    letterLine: Q9_LETTER_LINES[answers[8]] || '它会用最像你的语气，把远方轻轻放到你手心里。',
  };
}

function getPersonaByPetId(petId) {
  return PERSONAS.find(persona => persona.petId === petId) || PERSONAS[0];
}

export function calculatePersona(answers, tailPets = null) {
  const rawDims = {};
  const rawAnchors = {};
  const directScores = {};

  answers.forEach((optIdx, qIdx) => {
    if (optIdx == null) return;
    const question = QUESTIONS[qIdx];
    const option = question?.options?.[optIdx];
    if (!option) return;

    const weight = QUESTION_WEIGHTS[qIdx] || 1;
    addWeighted(rawDims, option.dims, weight);
    addWeighted(rawAnchors, option.anchors, weight);
    addWeighted(directScores, option.pets, weight);
  });

  if (tailPets) addWeighted(directScores, tailPets);

  const userDimsNorm = normalizeDims(rawDims);
  const userAnchorsCompressed = compressAnchors(rawAnchors);
  const maxDirect = Math.max(...PET_IDS.map(id => directScores[id] || 0), 1);

  const ranked = PET_IDS.map(id => {
    const dFit = dimensionFit(userDimsNorm, PET_PROTOTYPES[id]);
    const aFit = anchorFit(userAnchorsCompressed, PET_ANCHOR_PROFILES[id]);
    const directFit = ((directScores[id] || 0) / maxDirect) * 100;
    const rawScore = 0.45 * dFit + 0.40 * aFit + 0.15 * directFit;
    return { id, dFit, aFit, directFit, rawScore };
  }).sort((a, b) => b.rawScore - a.rawScore);

  const best = ranked[0];
  const second = ranked[1];
  const persona = getPersonaByPetId(best.id);
  const topAnchors = getTopAnchors(userAnchorsCompressed);
  const matchPercent = Math.min(99, Math.max(82, Math.round(82 + (best.rawScore / 100) * 17)));

  const scores = Object.fromEntries(
    ranked.map(item => [PET_LABELS[item.id], Math.round(item.rawScore)])
  );

  return {
    persona,
    topTags: topAnchors.map(anchor => anchor.label),
    matchPercent,
    scores,
    isMystery: false,
    insight: generateInsight(answers, topAnchors),
    needsTailQuestion: !!second && best.rawScore - second.rawScore < 5.5,
    debug: {
      userDims: rawDims,
      userDimsNorm,
      anchors: rawAnchors,
      anchorsCompressed: userAnchorsCompressed,
      directScores,
      ranked,
    },
  };
}

export function getTailQuestion(result) {
  if (!result?.needsTailQuestion) return null;
  const candidateIds = result.debug?.ranked?.slice(0, 2).map(item => item.id) || [];
  if (candidateIds.length < 2) return null;

  const group = TAIL_GROUPS.find(item => candidateIds.every(id => item.ids.includes(id)));
  if (!group) return null;

  return {
    ...group,
    options: group.options.filter(option => {
      const petId = Object.keys(option.pets)[0];
      return candidateIds.includes(petId);
    }),
  };
}
