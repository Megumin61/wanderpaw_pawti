// ============ 13 道题 + 评分机制（PAWTI v1） ============
//
// 世界观：「宠格代你出发 · 13 个旅行场景小切口」
//   不是问"你是谁"，是问"如果你有一身毛，你会怎么做？"
//   一只小的替你出门，它的每一步都在替你回答这场关于"你"的问卷。
//
// 题库结构：
//   13 题 / 3 幕 / 每题 4 选项
//   每个选项直接给若干「宠格中文名」加分（+2 共享 / +3 唯一）
//   计分时累加每只宠格的总分，最高分 = 你的旅行宠格
//   特殊触发条件命中时 → 输出彩蛋款「迷路宠格 ?????」
//
// 涉及的 15 个宠格 + 1 个彩蛋（mystery）：
//   哈士奇 collie 金毛 豚豚 狸花猫 柯基 小熊猫 柴犬
//   英短 三花 萨摩耶 比格 奶牛猫 豚鼠鼠 垂耳兔
//   ?????（迷路宠格 · 彩蛋）

// ============ 中文宠格名 → pet id（FEATURED_PETS 中的 id）映射 ============
// quiz 计分时累加的是中文名，这张表用于把"哈士奇"映射到 'husky'
export const PET_NAME_TO_ID = {
  '哈士奇':   'husky',
  '边牧':     'collie',
  '小熊猫':   'orange',
  '奶牛猫':   'ragdoll',
  '豚豚':     'capybara',
  '柴犬':     'shiba',
  '比格':     'frenchie',
  '狸花猫':   'lihua',
  '三花':     'calico',
  '柯基':     'corgi',
  '英短':     'british',
  '金毛':     'golden',
  '萨摩耶':   'samoyed',
  '垂耳兔':   'lop',
  '豚鼠鼠':   'siamese',
};

// ============ 幕间卡数据（3 幕） ============
// beforeQ: 在第几题（0-indexed）之前插入幕间卡
export const ACT_BREAKS = [
  {
    beforeQ: 0,
    act: 0,
    label: '序章',
    title: '行李箱被拉出来了',
    quote: '有些时候，世界在动，你动不了。\n但可以先派一只小的出去。\n\n在它出发之前——\n让我们先认识一下彼此。',
    icon: '🧳',
  },
  {
    beforeQ: 3,
    act: 1,
    label: '幕二',
    title: '它出门了，站在新的远方',
    quote: '好了，它出门了，替你站在一个新的远方。\n鼻子先感觉到什么了——',
    icon: '🍃',
  },
  {
    beforeQ: 10,
    act: 2,
    label: '幕三',
    title: '明天就要回来了',
    quote: '明天它就要回来了，带着这趟的一切。\n出发前最后一个晚上，它会怎么过——',
    icon: '🌙',
  },
];

// ============ 13 道题 ============
// 每题结构：
//   id      : 题号
//   scene   : 场景前情（灰色小字，可空）
//   q       : 核心问句
//   options : 4 个选项，text 是文案，scores 是 { 中文宠格名: 分数 }
//   feedbacks: 选中后浮层弹出的短彩蛋（可选）

export const QUESTIONS = [

  // ===== 幕一 · 行李箱被拉出来了（Q1-Q3）=====

  // Q1 · D1 冲劲
  {
    id: 1,
    scene: '主人把行李箱从柜子里拉出来。',
    q: '你的第一反应是什么？',
    options: [
      { text: '已经站在门口了',                                       scores: { '哈士奇': 2, '比格': 2 } },
      { text: '在旁边转两圈、抖抖毛摇摇尾巴，等着看去哪',             scores: { '金毛': 2, '柯基': 2 } },
      { text: '凑过去闻了闻，先摸清楚情况再说',                       scores: { '边牧': 2, '三花': 2 } },
      { text: '盯着行李，心里已经盘等会儿要坐哪条班车去吃那家小肉干', scores: { '边牧': 3 } },
    ],
    feedbacks: [
      '门一开你就上路，不问去哪。',
      '你最爱"等一声叫"的那种出发。',
      '你在出门前，会先把世界闻一遍。',
      '你的脑子，永远比腿先到达目的地。',
    ],
  },

  // Q2 · D5 计划
  {
    id: 2,
    scene: '出发前一晚。',
    q: '你在想什么？',
    options: [
      { text: '什么也没想，今天吃撑了，先睡',                         scores: { '哈士奇': 2, '垂耳兔': 2, '豚豚': 2, '奶牛猫': 2 } },
      { text: '想了个大概，明天再说吧',                               scores: { '柴犬': 2, '萨摩耶': 2, '金毛': 2 } },
      { text: '重要的几个景点几家店记好了，其他随机应变',             scores: { '柯基': 2, '小熊猫': 2, '三花': 2 } },
      { text: '从出门到回来，每一步都在脑子里过了一遍',               scores: { '边牧': 3 } },
    ],
    feedbacks: [
      '你和明天的关系，是先睡再说。',
      '你相信，路上会自己告诉你怎么走。',
      '你的随机，是建立在攻略上的随机。',
      '你的确定感，自己给自己。',
    ],
  },

  // Q3 · D3 节奏
  {
    id: 3,
    scene: '一座新的城市，你刚到。',
    q: '你更容易是什么状态？',
    options: [
      { text: '腿停不下来，要把每个角落都颠一遍',                     scores: { '柯基': 2, '哈士奇': 2, '柴犬': 2 } },
      { text: '必打卡的打完罢了，其他跟着感觉走',                     scores: { '金毛': 2, '三花': 2, '边牧': 2 } },
      { text: '找到一个好地方，扎进去不动了',                         scores: { '豚豚': 2, '英短': 2 } },
      { text: '没有方向，脚带到哪是哪',                               scores: { '垂耳兔': 2, '奶牛猫': 2 } },
    ],
    feedbacks: [
      '你是用腿丈量一座城的。',
      '你既要打完卡，也要留点空白。',
      '你愿意为一个角落，留出一整天。',
      '你信任脚比脑子诚实。',
    ],
  },

  // ===== 幕二 · 它出门了，站在新的远方（Q4-Q10）=====

  // Q4 · D1 + D3
  {
    id: 4,
    scene: '同行那只突然说，那边好像挺香的。',
    q: '要不要绕过去——',
    options: [
      { text: '那只话音未落已经跑没影儿了',                           scores: { '哈士奇': 2, '比格': 2, '萨摩耶': 2 } },
      { text: '好啊，go',                                             scores: { '柴犬': 2, '金毛': 2, '奶牛猫': 2 } },
      { text: '绕过去的话，今天那家卤肉饭咋办',                       scores: { '边牧': 2, '三花': 2 } },
      { text: '有缘再会吧姐们儿兄弟儿好朋宠，我要先把今天的跑完',     scores: { '边牧': 2, '英短': 2 } },
    ],
    feedbacks: [
      '你是会先跑后想的那一种。',
      '你给"路上"留了好多空格。',
      '你做选择，不是凭嗅觉，是凭规划。',
      '你心里有一份，不肯被打乱的清单。',
    ],
  },

  // Q5 · D2 社交
  {
    id: 5,
    scene: '一个陌生人蹲下来，好像想摸摸来着。',
    q: '你会——',
    options: [
      { text: '直接蹭过去，嘿嘿，先舔为敬',                           scores: { '柴犬': 2, '比格': 2 } },
      { text: '闻着还行吧，摸摸也不是不可以',                         scores: { '萨摩耶': 2, '金毛': 2, '豚鼠鼠': 2 } },
      { text: '看了一眼，缩了一下，没走过去',                         scores: { '英短': 2, '三花': 2 } },
      { text: '绕开走，不要和陌生人说话',                             scores: { '狸花猫': 2, '小熊猫': 2 } },
    ],
    feedbacks: [
      '你把陌生人当成新朋友的预备役。',
      '你给世界开了一道，刚刚好的门。',
      '你的礼貌，写在你停下的那一秒里。',
      '你有自己一个人才能去的远方。',
    ],
  },

  // Q6 · D4 驱动（三叉分流）
  {
    id: 6,
    scene: '走进一条从没走过的街。',
    q: '你最先停下来是因为？',
    options: [
      { text: '一股甜味儿从巷子里飘出来，追着跑了两步',               scores: { '金毛': 2, '豚鼠鼠': 2 } },
      { text: '一块旧招牌，字有点看不懂，但说不出哪里有意思',         scores: { '狸花猫': 3 } },
      { text: '前面有几个人聚着，动静不小',                           scores: { '柴犬': 2, '比格': 2 } },
      { text: '光落在那墙上，可爱不寻常',                             scores: { '三花': 2, '英短': 2 } },
    ],
    feedbacks: [
      '你跟着鼻子走，鼻子从不撒谎。',
      '你的眼睛会停在没人停的地方。',
      '你最想要的旅伴，是热闹本身。',
      '你识别得出"光"在和你说话。',
    ],
  },

  // Q7 · D3 节奏
  {
    id: 7,
    scene: '地图上有三个地方相邻。',
    q: '你会怎么安排？',
    options: [
      { text: '顺道的事儿，反正腿够用',                               scores: { '柯基': 2, '哈士奇': 2 } },
      { text: '先去最想去的那个，慢慢待，其他看时间',                 scores: { '金毛': 2, '三花': 2, '边牧': 2 } },
      { text: '选最有感觉的那个，能睡会儿才好',                       scores: { '豚豚': 3 } },
      { text: '边走边看吧，拐角说不定更有趣儿',                       scores: { '狸花猫': 2, '比格': 2, '垂耳兔': 2 } },
    ],
    feedbacks: [
      '你的腿，是你最忠实的导游。',
      '你愿意为最想去的，放弃别的。',
      '你把"睡个会儿"当成正经行程。',
      '你信任拐角。',
    ],
  },

  // Q8 · D2 社交 + 陪伴模式
  {
    id: 8,
    scene: '和朋宠一起出门。',
    q: '你通常是什么角色？',
    options: [
      { text: '最先出发的那个，方向我来定',                           scores: { '柴犬': 2, '边牧': 2, '柯基': 2 } },
      { text: '有人叫就跟上，跟着走最省心',                           scores: { '萨摩耶': 2, '豚鼠鼠': 2 } },
      { text: '走着走着各自散了，饭点碰头',                           scores: { '英短': 2, '狸花猫': 2 } },
      { text: '跟着走，但眼睛和耳朵是自己的',                         scores: { '垂耳兔': 2, '小熊猫': 2 } },
    ],
    feedbacks: [
      '你说"我来吧"，比谁都自然。',
      '你的好脾气，是一种行动力。',
      '你的边界感，让旅行更轻盈。',
      '你和大家一起走，但只跟着自己。',
    ],
  },

  // Q9 · 精确区分：英短 vs 狸花猫
  {
    id: 9,
    scene: '一条没有游客的旧巷子——空的，阳光从罅隙间漏进来。',
    q: '你的反应是？',
    options: [
      { text: '好。',                                                 scores: { '英短': 3 } },
      { text: '墙角有几个字，掉了漆，凑近看看',                       scores: { '狸花猫': 3 } },
      { text: '前面还有路，走走',                                     scores: { '比格': 2, '垂耳兔': 2 } },
      { text: '窝进阳光里',                                           scores: { '豚豚': 2, '三花': 2 } },
    ],
    feedbacks: [
      '一个字，把这条巷子说尽了。',
      '你要的不止"好"，你要的是"为什么"。',
      '你给路留余地，所以路也给你余地。',
      '你和阳光，达成了某种协议。',
    ],
  },

  // Q10 · 精确区分：柴犬 vs 萨摩耶
  {
    id: 10,
    scene: '偶遇 WanderPaw 旅行天团——',
    q: '你会怎么做？',
    options: [
      { text: '直接冲过去，丝滑加入，气氛搞定',                       scores: { '柴犬': 3 } },
      { text: '摇摇尾巴，等它们过来，贴贴蹭蹭挺好的',                 scores: { '萨摩耶': 3 } },
      { text: '绕开了，不太想凑热闹',                                 scores: { '英短': 2, '狸花猫': 2 } },
      { text: '跟了一段，没说话，耳朵竖着',                           scores: { '小熊猫': 2, '比格': 2 } },
    ],
    feedbacks: [
      '热闹一靠近你就活过来了。',
      '你的温柔，是被靠过来才懂的。',
      '你保留你的远，所以远也保留你。',
      '你听得很仔细，听得人都没察觉。',
    ],
  },

  // ===== 幕三 · 明天就要回来了（Q11-Q13）=====

  // Q11 · 精确区分：豚豚 vs 垂耳兔
  {
    id: 11,
    scene: '旅行最后一个没有安排的下午。',
    q: '你会？',
    options: [
      { text: '找一块阳光，趴下来，眯个盹儿，尾巴都舒服得乱翘',       scores: { '豚豚': 3 } },
      { text: '随便溜出去，没有目的，走到哪算哪',                     scores: { '垂耳兔': 2, '奶牛猫': 2 } },
      { text: '冲去那个之前没时间去的地方，不留遗憾',                 scores: { '柯基': 2, '哈士奇': 2 } },
      { text: '找个好位置，记个爪帐，把这趟的事慢慢回味一遍',         scores: { '三花': 2, '小熊猫': 2 } },
    ],
    feedbacks: [
      '你把"什么也不做"做成了一件正经事。',
      '你的方向感，是一种心情。',
      '你绝不让最后一格留白。',
      '你记下来的，比经历过的还多。',
    ],
  },

  // Q12 · D4 驱动（综合确认）
  {
    id: 12,
    scene: '回来之后。',
    q: '这座城市在你身上留下的是？',
    options: [
      { text: '那家的小肉松酥酥香香，闻到就能回到那条街',             scores: { '金毛': 2, '豚鼠鼠': 2 } },
      { text: '某个角落的光，某个时刻微风拂面，说不清楚',             scores: { '三花': 2, '小熊猫': 2 } },
      { text: '那家伙阿巴阿巴时的样子，挺可爱的',                     scores: { '柴犬': 2, '萨摩耶': 2 } },
      { text: '某件事，某几个字，某地的刻痕，一直没消化完',           scores: { '狸花猫': 2, '英短': 2 } },
    ],
    feedbacks: [
      '气味是你最忠诚的相册。',
      '你的记忆，是一段段画面。',
      '你最珍惜的，是路上的那个人。',
      '你带回家的，常常没办法解释给别人听。',
    ],
  },

  // Q13 · D4 驱动（精细化）
  {
    id: 13,
    scene: '什么瞬间让你觉得"来了真好"？',
    q: '',
    options: [
      { text: '吃到了什么臭豆腐榴莲肥肠螺蛳粉，当场愣了一下',         scores: { '金毛': 2, '豚鼠鼠': 2 } },
      { text: '钻进了一个没人推荐过的地方，悄悄地，就对了',           scores: { '狸花猫': 2, '英短': 2 } },
      { text: '跟一个素不相识的家伙闻了很久',                         scores: { '柴犬': 2, '萨摩耶': 2 } },
      { text: '在一个光恰到好处的角落，拍到了宠生照片',               scores: { '三花': 3 } },
    ],
    feedbacks: [
      '你愿意为一口怪味跑很远。',
      '你的小众，是一种确认自己的方式。',
      '你和陌生人之间，不需要语言。',
      '你拍的不是照片，是当时的自己。',
    ],
  },
];

// ============ 16 个人格画像（15 实体宠 + 1 彩蛋迷路宠格） ============

export const PERSONAS = [
  {
    code: 'WILD',
    chinese: '一脚踩空也要先跑出去的哈士奇',
    englishLine: 'THE WILD RUNNER',
    tagline: '冲！冲哪路上再说',
    petId: 'husky',
    petName: '哈士奇',
    primaryTags: ['说走就走', '高能量', '随性派'],
    description: '它会替你先跑出去。不问去哪，不等计划，门一开就冲——就像你心里那个从没被堵住过的部分。',
    petReason: '看见门开着就冲出去，跑出两条街才想起来要去哪。',
    cities: ['西藏', '冰岛', '新疆'],
    color: '#D8E8F0',
  },
  {
    code: 'NERD',
    chinese: '眼神比你还清醒的边牧',
    englishLine: 'THE PLAN GEEK',
    tagline: '攻略做完了，just follow me',
    petId: 'collie',
    petName: '边牧',
    primaryTags: ['攻略控', '掌控感', '稳准狠'],
    description: '它会替你把每一步都顺好。不爱临时慌张，更爱一切尽在掌握，玩的时候才放得开。它去的地方，是你认真挑过的。',
    petReason: '还没出门，心里已经把今天怎么走过一遍了。',
    cities: ['京都', '苏州', '瑞士'],
    color: '#CFDCC5',
  },
  {
    code: 'NOMZ',
    chinese: '把小宝贝一件件叼回窝里的小熊猫',
    englishLine: 'THE LATE-NIGHT FORAGER',
    tagline: '这碗面、这片叶、这一夜，都值得收藏',
    petId: 'orange',
    petName: '小熊猫',
    primaryTags: ['享受派', '小确幸', '记忆收藏'],
    description: '它会替你把这一趟过得有滋有味。好吃的食物、好看的风景、睡得很香的一晚，都会被它像集邮一样认真收好。',
    petReason: '遇见心爱的东西，就想悄悄抱回窝里，留着反复回味。',
    cities: ['峨眉山', '婺源', '苏州'],
    color: '#F3E0CB',
  },
  {
    code: 'CHIC',
    chinese: '上一秒端着走路下一秒突然弹射的奶牛猫',
    englishLine: 'THE MOOD CURATOR',
    tagline: '别管，突然想疯一下',
    petId: 'ragdoll',
    petName: '奶牛猫',
    primaryTags: ['抽象派', '随机弹射', '不可预测'],
    description: '它替你保留了那个突然想疯一下的瞬间。明明走得好好的，下一秒就被一股气点着——就像你不愿向人解释的那个自己。',
    petReason: '明明走得好好的，也会突然自己跟自己较劲，啪一下就弹出去老远。',
    cities: ['上海', '京都', '里斯本'],
    color: '#E8D5E8',
  },
  {
    code: 'COZY',
    chinese: '泡澡不被打扰天塌了也不管的豚豚君',
    englishLine: 'THE SUN SOAKER',
    tagline: '不急，太阳又不会跑',
    petId: 'capybara',
    petName: '豚豚君',
    primaryTags: ['松弛感', '不动派', '太阳就够了'],
    description: '它会替你把"什么也不做"过得郑重其事。一杯放凉了的咖啡、一棵缠绵了很久的树、一块阳光，待着，就够了。',
    petReason: '泡进温泉就没打算上来，地震也劝不动。',
    cities: ['大理', '清迈', '婺源'],
    color: '#F2E7CE',
  },
  {
    code: 'WOOF',
    chinese: '被叫一声就笑出八颗牙的柴犬',
    englishLine: 'THE STREET SOCIALITE',
    tagline: '你是谁我不知道，但我喜欢你',
    petId: 'shiba',
    petName: '柴犬',
    primaryTags: ['街头社牛', '主动型', '气氛搞定者'],
    description: '它替你和这个世界打招呼。能和民宿老板娘聊到凌晨，能丝滑加入公园大爷下棋，陌生人都是还没认识的朋友。',
    petReason: '见到谁都想过去打个招呼，最爱把小 i 狗揣在口袋里玩耍。',
    cities: ['曼谷', '伊斯坦布尔', '成都'],
    color: '#F8D6C4',
  },
  {
    code: 'STUB',
    chinese: '耳朵一飞起来就知道又要闯祸的比格',
    englishLine: 'THE NOSE-LED WANDERER',
    tagline: '我先冲了，后果等会儿再说',
    petId: 'frenchie',
    petName: '比格犬',
    primaryTags: ['好奇过载', '鼻子优先', '一路被拽走'],
    description: '它替你保留那个被新鲜事拽着走的自己。安静太难，有声儿就想凑，有味儿就想追，旅行被它越带越兴奋。',
    petReason: '鼻子和耳朵永远比脑子先出发，还没闻到动静已经冲过去了。',
    cities: ['重庆', '长沙', '武汉'],
    color: '#EADDC8',
  },
  {
    code: 'HIDE',
    chinese: '晒干野花瓣作 OOTD 小配饰的狸花猫',
    englishLine: 'THE OFF-GRID SEEKER',
    tagline: '远行，是奥德赛时期的灵魂朝圣',
    petId: 'lihua',
    petName: '狸花猫',
    primaryTags: ['意义感', '小众敏锐', '冷巷更对味'],
    description: '它替你去那些没人推荐过的地方。热闹背面的二楼旧书店、凌晨还亮着灯的窄街——你说不出来的"为什么停下"，它都懂。',
    petReason: '总能无声无息钻进那些不起眼、却最有故事的角落。',
    cities: ['泉州', '平遥', '里斯本'],
    color: '#E8DFCE',
  },
  {
    code: 'SHOT',
    chinese: '每个角度都自带电影感的三花',
    englishLine: 'THE FRAME HUNTER',
    tagline: '出片是你对抗虚无的创造力',
    petId: 'calico',
    petName: '三花猫',
    primaryTags: ['审美派', '光线敏感', '随地大小拍'],
    description: '它替你拍下那些"光刚刚好的角落"。构图、光线、色温——它替你认得出，哪个瞬间值得被留下。',
    petReason: '每个角度都好看，连打哈欠都像在拍杂志。',
    cities: ['东京', '厦门', '巴塞罗那'],
    color: '#F7E4CA',
  },
  {
    code: 'FOMO',
    chinese: '小短腿但永远不肯被落下的柯基酱',
    englishLine: 'THE CHECKLIST HUNTER',
    tagline: '还没逛完，怎么能回酒店',
    petId: 'corgi',
    petName: '柯基酱',
    primaryTags: ['打卡控', '高密度', '一个不能少'],
    description: '它替你把每一格清单都点亮。每个打卡点都是攻略下来的城池，少看一个会心痒，错过一点会可惜。',
    petReason: '小腿短短，屁股扭扭，再远的地方也要颠到。',
    cities: ['首尔', '东京', '新加坡'],
    color: '#F5D9C0',
  },
  {
    code: 'SOLO',
    chinese: '被吵到了也只是缓缓闭上一只眼的英短',
    englishLine: 'THE SOLO DRIFTER',
    tagline: '别闹，我在思考鱼',
    petId: 'british',
    petName: '英短蓝猫',
    primaryTags: ['独处感', '安静派', '不解释'],
    description: '它替你戴上耳机走开。一个人走、一个人吃、一个人看，是你和世界的最佳距离。',
    petReason: '全世界都在吵，某比某格尤其闹腾，眯眯着眼睛不听不听就好。',
    cities: ['冰岛', '北海道', '苏格兰'],
    color: '#DCE2E8',
  },
  {
    code: 'BOSS',
    chinese: '看见美食眼睛能亮出两个太阳的金毛',
    englishLine: 'THE FOOD CAPTAIN',
    tagline: '只要有吃的，能绕地球跑两圈',
    petId: 'golden',
    petName: '金毛',
    primaryTags: ['味觉派', '光盘行动', '凌晨烧烤'],
    description: '它替你嗦完那一碗、咬完那一口。味蕾是你的旅行指南，味道是你的城市地图，没有什么是一顿夜宵解决不了的。',
    petReason: '醒着的时间分两半，一半在吃，一半在等下一顿。',
    cities: ['成都', '潮汕', '大阪'],
    color: '#F5D79C',
  },
  {
    code: 'WARM',
    chinese: '招招手就会笑眯眯贴回去的萨摩耶',
    englishLine: 'THE WARM WANDERER',
    tagline: '来都来了，摸一下嘛',
    petId: 'samoyed',
    petName: '萨摩耶',
    primaryTags: ['一键跟随', '团宠', '亲密派'],
    description: '它替你温柔地跟在喜欢的人旁边。有人招手就跟上，有热闹就凑近，攻略不必操心——和喜欢的人在一起，路就是好的。',
    petReason: '觉得地球上每个人都是来亲亲抱抱举高高的。',
    cities: ['清迈', '长沙', '冲绳'],
    color: '#EDEAE3',
  },
  {
    code: 'CHIL',
    chinese: '一被摸就化成一摊年糕的垂耳兔',
    englishLine: 'THE CHILL FLOATER',
    tagline: '先别急，风会带路',
    petId: 'lop',
    petName: '垂耳兔',
    primaryTags: ['佛系派', '随风走', '不证明什么'],
    description: '它替你顺着感觉走，走到刚刚好的地方。不急着追赶或证明什么，舒服的风、柔和的光、安静的角落，就会慢慢安定下来。',
    petReason: '一被摸就软成一摊，眼皮都懒得抬。',
    cities: ['巴厘岛', '大理', '清迈'],
    color: '#F3E6D0',
  },
  {
    code: 'GOSS',
    chinese: '就是要消费既然来都来了的鼠鼠',
    englishLine: 'THE MURMUR WALKER',
    tagline: '可以啊，试试呗，夺少钱',
    petId: 'siamese',
    petName: '豚鼠鼠',
    primaryTags: ['来都来了', '光盘冲锋', '不扫兴'],
    description: '它替你把这一趟过得饱饱满满。能吃就吃，能买就买，能玩就玩，付款第一个冲上去——开心最重要，别扫兴。',
    petReason: '看到想试的就点，端上桌的就光盘，唯一会认真追问的只有厕所在哪。',
    cities: ['伊斯坦布尔', '长沙', '京都'],
    color: '#E6DBC9',
  },
  // —— 兜底人格：博美（新方案中无对应题，但保留 PERSONAS 完整性，分数恒为 0，永远不会被选中） ——
  {
    code: 'LOST',
    chinese: '跑出三米就忘了主人长什么样的博美',
    englishLine: 'THE HAPPY LOST',
    tagline: '我不是迷路，我是在探险',
    petId: 'pomeranian',
    petName: '博美',
    primaryTags: ['即兴派', '好奇', '冲动'],
    description: '手机没电也觉得"没事吧"，走丢了就走丢了，反正总会到某个地方的。',
    petReason: '跑出去三米就开始找回家的路，但坚决不承认自己迷路。',
    cities: ['西藏', '新疆', '挪威'],
    color: '#F9DDC2',
  },
];

// ============ 彩蛋宠格：迷路宠格 ?????（无对应实体 pet） ============
// 满足触发条件时，作为最终结果输出。result.js 中以 isMystery=true 走特殊渲染分支。
export const MYSTERY_PERSONA = {
  code: 'MYSTERY',
  chinese: '?????',
  englishLine: 'THE UNCATCHABLE',
  tagline: '恭喜你，你是最未曾捕捉无法拥有的「?????」',
  petId: 'mystery',
  petName: '?????',
  primaryTags: ['散点', '无归属', '难以被捕捉'],
  description: '我们预设的所有 PAWTI，没有一只能完全装下你。这不是坏事——世界上最有意思的旅行者，往往最难被归类。',
  petReason: '你身上同时存在好几个相反的部分，没有一只小的能完全替你出发。所以，你只能自己去。',
  cities: [],
  color: '#EDE6D4',
  isMystery: true,
};

// ============ 评分算法（v3 · 直接累加宠格分） ============
//
// 输入：用户每题选择的 option index 数组（length = 13）
// 输出：{ persona, topTags, matchPercent, scores, isMystery }
//
// 算法步骤：
//   1. 按 QUESTIONS[i].options[idx].scores 累加每只宠格的总分
//   2. 检查迷路宠格触发条件：
//      a) 极值矛盾：Q1=A 且 Q3=A 且 Q2=D 且 Q4=D
//      b) 散点无归属：第一名得分 - 第二名得分 ≤ 1
//      命中任一 → 返回 MYSTERY_PERSONA
//   3. 否则取分数最高的宠格 → 反查 PERSONAS 输出对应人格
//
// 匹配度：bestScore / 该宠格的理论最高分 → 80%-99% 区间映射
//
// 各宠格的理论最高分（参考开发文档，用于匹配度归一化）：
const PET_THEORETICAL_MAX = {
  '三花':   23,
  '柴犬':   19,
  '英短':   19,
  '边牧':   18,
  '金毛':   18,
  '狸花猫': 18,
  '萨摩耶': 15,
  '比格':   14,
  '哈士奇': 12,
  '柯基':   12,
  '豚豚':   12,
  '小熊猫': 12,
  '垂耳兔': 12,
  '豚鼠鼠': 10,
  '奶牛猫': 8,
};

export function calculatePersona(answers) {
  // 1. 累加每只宠格的得分（key = 中文名）
  const scores = {};
  answers.forEach((optIdx, qIdx) => {
    if (optIdx == null) return;
    const opt = QUESTIONS[qIdx]?.options?.[optIdx];
    if (!opt || !opt.scores) return;
    Object.entries(opt.scores).forEach(([petName, point]) => {
      scores[petName] = (scores[petName] || 0) + point;
    });
  });

  // 2. 排序
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  const top1 = sorted[0];
  const top2 = sorted[1];

  // 3. 触发条件 a：极值矛盾（Q1=A 且 Q3=A 且 Q2=D 且 Q4=D）
  // 注意：QUESTIONS 数组下标 0 = Q1
  const isExtremeContradiction =
    answers[0] === 0 && // Q1 = A
    answers[2] === 0 && // Q3 = A
    answers[1] === 3 && // Q2 = D
    answers[3] === 3;   // Q4 = D

  // 4. 触发条件 b：散点无归属（第一名 - 第二名 ≤ 1）
  const top1Score = top1?.score || 0;
  const top2Score = top2?.score || 0;
  const isScattered = sorted.length >= 2 && (top1Score - top2Score) <= 1;

  // 命中任一 → 输出迷路宠格
  if (isExtremeContradiction || isScattered) {
    return {
      persona: MYSTERY_PERSONA,
      topTags: sorted.slice(0, 3).map(x => x.name),
      matchPercent: 99,
      scores,
      isMystery: true,
      mysteryReason: isExtremeContradiction ? 'extreme' : 'scattered',
    };
  }

  // 5. 正常匹配：取分数最高的宠格
  // 注意：题目中的宠格名是「简称」（如"豚豚"、"比格"、"三花"），
  //       PERSONAS 里的 petName 是「全称」（如"豚豚君"、"比格犬"、"三花猫"），
  //       所以这里通过 PET_NAME_TO_ID 把简称映射到 id，再用 id 反查 persona
  const bestPetName = top1.name;
  const bestPetId = PET_NAME_TO_ID[bestPetName];
  const bestPersona =
    PERSONAS.find(p => p.petId === bestPetId) ||
    PERSONAS.find(p => p.petName === bestPetName) ||
    PERSONAS[0];

  // 6. 匹配度计算：bestScore / 理论最高分 → 映射到 80%-99%
  const theoreticalMax = PET_THEORETICAL_MAX[bestPetName] || 12;
  const ratio = Math.min(1, top1Score / theoreticalMax);
  const matchPercent = Math.min(99, Math.max(80, Math.round(80 + ratio * 19)));

  // topTags：用前 3 个宠格的中文名作为"用户特质"展示
  const topTags = sorted.slice(0, 3).map(x => x.name);

  return {
    persona: bestPersona,
    topTags,
    matchPercent,
    scores,
    isMystery: false,
  };
}
