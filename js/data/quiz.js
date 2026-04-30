// ============ 12 道题 + 评分机制 ============
//
// 标签系统（16 维度，每只宠物匹配 2-3 个关键标签）：
//   WILD : 说走就走、高能量         (哈士奇)
//   NERD : 攻略控、规划狂           (边牧)
//   NOMZ : 吃货、味觉导向           (橘猫)
//   CHIC : 氛围感、出片控           (布偶)
//   COZY : 慢节奏、松弛             (水豚)
//   WOOF : 社交牛、爱搭讪           (金毛/柴犬社交面)
//   STUB : 倔强、有主见             (柴犬)
//   HIDE : 冷门派、不爱扎堆         (狸花猫)
//   SHOT : 照片狂魔                 (布偶/三花)
//   WARM : 温柔、关照他人           (三花/金毛)
//   SOLO : 独行、戴耳机隐身         (英短)
//   FOMO : 怕错过、打卡控           (柯基)
//   LOST : 迷路也无所谓、即兴       (博美/哈士奇幼犬)
//   CHIL : 躺平、能省则省           (法斗)
//   GOSS : 话痨、爱表达             (暹罗)
//   BOSS : 执行力强、为目标冲       (边牧/橘猫)
//
// 每题每个选项会给 1-2 个标签各加 2 分

export const QUESTIONS = [
  {
    id: 1,
    q: '朋友周五晚11点突然在群里发："明早6点机场？"你的反应是——',
    options: [
      { text: '"走啊！"立刻起床开始收拾', tags: ['WILD', 'LOST'] },
      { text: '问清楚去哪、住哪、机票多少再说', tags: ['NERD', 'FOMO'] },
      { text: '"你们去吧，我在家躺着"', tags: ['CHIL', 'COZY'] },
      { text: '"算我一个，先查查那有什么好吃的"', tags: ['BOSS', 'NOMZ'] },
    ],
  },
  {
    id: 2,
    q: '到了新城市，酒店 check-in 完第一件事——',
    options: [
      { text: '打开小红书，明天的路线 Excel 连夜列出来', tags: ['NERD', 'FOMO'] },
      { text: '换鞋出门乱走，先看看酒店周围长什么样', tags: ['WILD', 'WOOF'] },
      { text: '瘫床上刷手机，反正明天的事明天说', tags: ['CHIL', 'COZY'] },
      { text: '"附近有什么本地菜？"直接找最近的馆子', tags: ['BOSS', 'NOMZ'] },
    ],
  },
  {
    id: 3,
    q: '你的旅行相册里，点开最多的是——',
    options: [
      { text: '好吃的特写，连汤都拍清楚', tags: ['BOSS', 'NOMZ'] },
      { text: '自己的背影，在各种风景里', tags: ['SHOT', 'CHIC'] },
      { text: '路上遇到的猫猫狗狗/小孩/大爷', tags: ['WOOF', 'WARM'] },
      { text: '没人的小巷、老招牌、窗框光影', tags: ['HIDE', 'CHIC'] },
    ],
  },
  {
    id: 4,
    q: '走在路上发现一条没计划过的小巷——',
    options: [
      { text: '拐进去，看看里面有什么', tags: ['WILD', 'LOST'] },
      { text: '拍张照记下来，回去查资料再专门来', tags: ['NERD', 'FOMO'] },
      { text: '犹豫3秒，继续按原路线走', tags: ['FOMO', 'NERD'] },
      { text: '"走进去说不定有好吃的"', tags: ['NOMZ', 'HIDE'] },
    ],
  },
  {
    id: 5,
    q: '突然下暴雨，你在外面没带伞——',
    options: [
      { text: '"哇下雨了！"继续淋着走，顺便拍视频', tags: ['WILD', 'SHOT'] },
      { text: '冲进最近的店，点杯热的坐下', tags: ['COZY', 'CHIC'] },
      { text: '挑一家有氛围的咖啡馆，下午就耗这', tags: ['CHIL', 'CHIC'] },
      { text: '跑进最近的小饭馆，吃顿热乎的', tags: ['NOMZ', 'WARM'] },
    ],
  },
  {
    id: 6,
    q: '旅行里最让你记忆深刻的瞬间，可能是——',
    options: [
      { text: '某家小店的味道，回来还想复刻', tags: ['BOSS', 'NOMZ'] },
      { text: '某个清晨/黄昏的光线，说不清但记得', tags: ['CHIC', 'COZY'] },
      { text: '和路上某个陌生人的对话', tags: ['WOOF', 'WARM'] },
      { text: '一个人静静走过的那条路', tags: ['SOLO', 'HIDE'] },
    ],
  },
  {
    id: 7,
    q: '一家店门口排着1小时的长队，你会——',
    options: [
      { text: '排！招牌菜必须吃到', tags: ['BOSS', 'NOMZ'] },
      { text: '拍张照发朋友圈，然后走了', tags: ['SHOT', 'FOMO'] },
      { text: '查查附近有没有替代的，不行就算了', tags: ['NERD', 'STUB'] },
      { text: '绕一圈，在旁边找家没人的小店', tags: ['HIDE', 'CHIL'] },
    ],
  },
  {
    id: 8,
    q: '这两个行程，哪个更让你心动——',
    options: [
      { text: '凌晨4点爬山看日出，住山里的木屋', tags: ['WILD', 'COZY'] },
      { text: '傍晚的城市天台，一杯酒看霓虹', tags: ['CHIC', 'WOOF'] },
      { text: '老城巷子里的书店咖啡店，泡一整天', tags: ['HIDE', 'SOLO'] },
      { text: '跟本地人去他们常吃的苍蝇馆子', tags: ['NOMZ', 'BOSS'] },
    ],
  },
  {
    id: 9,
    q: '旅行中遇到一只野猫/流浪狗，你会——',
    options: [
      { text: '蹲下喵喵叫，试图 social', tags: ['WOOF', 'WARM'] },
      { text: '远远拍30张照片，不敢靠近', tags: ['SHOT', 'SOLO'] },
      { text: '从包里摸出吃的（随身带的那种）', tags: ['NOMZ', 'WARM'] },
      { text: '看一眼，在心里say hi，继续走', tags: ['SOLO', 'HIDE'] },
    ],
  },
  {
    id: 10,
    q: '旅行结束前最后一晚，你在做——',
    options: [
      { text: '打开地图把今天走过的地方再看一遍', tags: ['GOSS', 'COZY'] },
      { text: '去开头就想去的那家店，再吃一次', tags: ['NOMZ', 'STUB'] },
      { text: '在安静的地方，发呆到很晚', tags: ['COZY', 'SOLO'] },
      { text: '已经在订下一次的机票了', tags: ['WILD', 'LOST'] },
    ],
  },
  {
    id: 11,
    q: '下列选项里，最「不像」你的旅行方式是——',
    options: [
      { text: '提前3个月做攻略，订好每顿饭', tags: ['WILD', 'CHIL'] }, // 反选：不做攻略的人选这个
      { text: '跟旅游团按表走，每个点20分钟', tags: ['HIDE', 'SOLO'] }, // 反选：不爱跟团
      { text: '纯跟团购，懒得做任何决定', tags: ['NERD', 'BOSS'] },     // 反选：爱掌控
      { text: '一个人0计划，随便走到哪是哪', tags: ['NERD', 'FOMO'] },  // 反选：爱规划
    ],
  },
  {
    id: 12,
    q: '最后一题，请盲选（真的，这题没题目）——',
    options: [
      { text: '🐕  在沙发上打滚的狗', tags: ['WILD', 'WOOF'] },
      { text: '🐈  坐在窗台看雨的猫', tags: ['SOLO', 'CHIC'] },
      { text: '🦫  草地上躺平的水豚', tags: ['COZY', 'CHIL'] },
      { text: '🐦  飞过天空的小鸟', tags: ['LOST', 'HIDE'] },
    ],
  },
];

// ============ 16 个人格画像 ============
// 每个人格有 2-3 个标签（就是"灵魂签名"），哪个人格和用户Top标签吻合度最高 → 就是用户结果

export const PERSONAS = [
  {
    code: 'WILD',
    chinese: '山河撒野家',
    englishLine: 'THE WILD RUNNER',
    petId: 'husky',
    petName: '哈士奇',
    primaryTags: ['WILD', 'LOST', 'WOOF'],
    description: '机票买完行李都没收拾，但已经冲出门了。你的旅行字典里没有「等一下」，只有「走了」。',
    petReason: '你和二哈都一样——精力过剩、说走就走、到了陌生地方先嗷一声再说。',
    cities: ['西藏', '冰岛', '新疆'],
    color: '#D8E8F0',
  },
  {
    code: 'NERD',
    chinese: '攻略图书管理员',
    englishLine: 'THE PLAN GEEK',
    petId: 'collie',
    petName: '边牧',
    primaryTags: ['NERD', 'FOMO', 'BOSS'],
    description: '出发前Excel已经做好三版，每家店的排队时间都查过。你觉得这不是负担，是浪漫。',
    petReason: '边牧是狗界公认的学霸——会看人眼色、执行力超强、永远比你先想到下一步。',
    cities: ['京都', '苏州', '瑞士'],
    color: '#CFDCC5',
  },
  {
    code: 'NOMZ',
    chinese: '深夜觅食者',
    englishLine: 'THE LATE-NIGHT FORAGER',
    petId: 'orange',
    petName: '胖橘',
    primaryTags: ['NOMZ', 'BOSS', 'WARM'],
    description: '凌晨两点的烧烤摊是你的归宿，胃是你的旅行指南，味道是你的城市地图。',
    petReason: '十只橘猫九只胖，另一只还在吃。社交牛逼+干饭第一，跟你一模一样。',
    cities: ['成都', '潮汕', '武汉'],
    color: '#F3E0CB',
  },
  {
    code: 'CHIC',
    chinese: '氛围感鉴赏家',
    englishLine: 'THE MOOD CURATOR',
    petId: 'ragdoll',
    petName: '布偶猫',
    primaryTags: ['CHIC', 'SHOT', 'COZY'],
    description: '光线不对的店你不进，没拍到好看的照片这趟就不算来过。你为美学而活。',
    petReason: '布偶猫=行走的颜值担当。温柔、有仪式感、每一个角度都是ins风。',
    cities: ['巴黎', '京都', '上海'],
    color: '#E8D5E8',
  },
  {
    code: 'COZY',
    chinese: '慢速晒太阳家',
    englishLine: 'THE SUN SOAKER',
    petId: 'capybara',
    petName: '水豚酱',
    primaryTags: ['COZY', 'CHIL', 'SOLO'],
    description: '一棵树下能坐一下午，不赶路、不打卡，只想感受这个城市本来的呼吸。',
    petReason: '水豚是松弛感天花板——发呆爱好者、不紧不慢、一切都是刚刚好。',
    cities: ['大理', '清迈', '婺源'],
    color: '#F2E7CE',
  },
  {
    code: 'WOOF',
    chinese: '街头社牛官',
    englishLine: 'THE STREET SOCIALITE',
    petId: 'shiba',
    petName: '柴犬',
    primaryTags: ['WOOF', 'WARM', 'WILD'],
    description: '能和民宿老板娘聊到凌晨，能和大爷下一盘棋。陌生人都是你还没认识的朋友。',
    petReason: '柴犬有社交牛逼症——见谁都摇尾巴，跟谁都像失散多年的亲人。',
    cities: ['曼谷', '伊斯坦布尔', '成都'],
    color: '#F8D6C4',
  },
  {
    code: 'STUB',
    chinese: '原地趴地师',
    englishLine: 'THE STUBBORN WALKER',
    petId: 'frenchie',
    petName: '法斗',
    primaryTags: ['STUB', 'CHIL', 'SOLO'],
    description: '不想走就是不想走，谁来都没用。你有自己的节奏，世界配合你。',
    petReason: '法斗自带地砖 buff——趴下就是圣地，任凭你怎么拖都不挪窝。',
    cities: ['京都', '釜山', '台南'],
    color: '#EADDC8',
  },
  {
    code: 'HIDE',
    chinese: '小众冷门玩家',
    englishLine: 'THE OFF-GRID SEEKER',
    petId: 'lihua',
    petName: '狸花猫',
    primaryTags: ['HIDE', 'SOLO', 'STUB'],
    description: '游客越多越绕道，冷巷才是真爱。你的私藏地图比Google Maps还全。',
    petReason: '狸花猫是中华田园本尊——誓不为奴、向往自由、自己嗨自己的。',
    cities: ['泉州', '平遥', '里斯本'],
    color: '#E8DFCE',
  },
  {
    code: 'SHOT',
    chinese: '出片型人格',
    englishLine: 'THE FRAME HUNTER',
    petId: 'calico',
    petName: '三花猫',
    primaryTags: ['SHOT', 'CHIC', 'FOMO'],
    description: '没拍够九宫格，这次旅行就不算结束。构图、光线、色温，你是专业的。',
    petReason: '三花猫是天生出片选手——每个角度都上镜，配色天生高级。',
    cities: ['东京', '厦门', '巴塞罗那'],
    color: '#F7E4CA',
  },
  {
    code: 'FOMO',
    chinese: '打卡搜集癖',
    englishLine: 'THE CHECKLIST HUNTER',
    petId: 'corgi',
    petName: '柯基',
    primaryTags: ['FOMO', 'BOSS', 'NERD'],
    description: '每个网红点都不能漏，漏一个就心痒。你的 Notion 攻略表有五个 tab。',
    petReason: '柯基小短腿，却要追快递车——认准的事再远也要去。',
    cities: ['首尔', '东京', '新加坡'],
    color: '#F5D9C0',
  },
  {
    code: 'SOLO',
    chinese: '耳机隐身侠',
    englishLine: 'THE SOLO DRIFTER',
    petId: 'british',
    petName: '英短蓝猫',
    primaryTags: ['SOLO', 'HIDE', 'COZY'],
    description: '戴上耳机，世界与我无关。一个人走、一个人吃、一个人看，是你最舒服的节奏。',
    petReason: '英短的气质刻在骨子里——冷静、独处、自有一套节奏。',
    cities: ['冰岛', '北海道', '苏格兰'],
    color: '#DCE2E8',
  },
  {
    code: 'BOSS',
    chinese: '城市美食指挥官',
    englishLine: 'THE FOOD CAPTAIN',
    petId: 'golden',
    petName: '金毛',
    primaryTags: ['BOSS', 'NOMZ', 'NERD'],
    description: '吃，是今天唯一的 KPI。你的旅行是一场精确打击，每一餐都不能浪费。',
    petReason: '金毛为了一口吃的能跋山涉水——目标明确、执行到位、绝不让嘴巴闲着。',
    cities: ['成都', '潮汕', '大阪'],
    color: '#F5D79C',
  },
  {
    code: 'WARM',
    chinese: '路边搭讪家',
    englishLine: 'THE WARM WANDERER',
    petId: 'samoyed',
    petName: '萨摩耶',
    primaryTags: ['WARM', 'WOOF', 'NOMZ'],
    description: '和奶茶店小哥聊、和卖菜阿姨聊，旅行结束时你手机里多了十个微信好友。',
    petReason: '萨摩耶是天生的微笑天使——走到哪都招人爱，陌生人也会变朋友。',
    cities: ['清迈', '长沙', '冲绳'],
    color: '#EDEAE3',
  },
  {
    code: 'CHIL',
    chinese: '随缘漂流派',
    englishLine: 'THE CHILL FLOATER',
    petId: 'lop',
    petName: '垂耳兔',
    primaryTags: ['CHIL', 'COZY', 'LOST'],
    description: '计划？不存在的。能躺就躺，能坐就坐，能不走路就绝对不走路。',
    petReason: '垂耳兔的哲学——躺着就是最好的状态。你俩是失散多年的亲戚。',
    cities: ['巴厘岛', '大理', '清迈'],
    color: '#F3E6D0',
  },
  {
    code: 'LOST',
    chinese: '即兴走丢者',
    englishLine: 'THE HAPPY LOST',
    petId: 'pomeranian',
    petName: '博美',
    primaryTags: ['LOST', 'WILD', 'CHIL'],
    description: '手机没电也觉得"没事吧"，走丢了就走丢了，反正总会到某个地方的。',
    petReason: '博美跑起来根本不看方向——哪里热闹往哪冲，迷路了也照样乐呵。',
    cities: ['西藏', '新疆', '挪威'],
    color: '#F9DDC2',
  },
  {
    code: 'GOSS',
    chinese: '碎嘴漫游客',
    englishLine: 'THE MURMUR WALKER',
    petId: 'siamese',
    petName: '暹罗猫',
    primaryTags: ['GOSS', 'WOOF', 'SHOT'],
    description: '每个地方都要在脑内解说一遍，回来能写三千字游记。你的朋友圈是长篇连载。',
    petReason: '暹罗猫是猫界话痨——一秒能叨叨一百句，路上见啥都要给你播报。',
    cities: ['伊斯坦布尔', '长沙', '京都'],
    color: '#E6DBC9',
  },
];

// ============ 评分算法 ============
// 输入：用户12题选择的 option index 数组
// 输出：匹配到的人格对象 + top 标签分数表

export function calculatePersona(answers) {
  // 累计每个标签的得分
  const scores = {};
  answers.forEach((optIdx, qIdx) => {
    if (optIdx == null) return;
    const opt = QUESTIONS[qIdx].options[optIdx];
    opt.tags.forEach(tag => {
      scores[tag] = (scores[tag] || 0) + 2;
    });
  });

  // 找出用户的 Top 3 标签
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, score]) => ({ tag, score }));
  const topTags = sorted.slice(0, 3).map(x => x.tag);

  // 人格匹配：计算每个人格和用户Top标签的吻合度
  // 规则：人格的 primary 标签命中用户 Top3，每命中一个 + 用户该标签的得分权重
  let bestPersona = null;
  let bestScore = -1;

  PERSONAS.forEach(p => {
    let matchScore = 0;
    p.primaryTags.forEach((tag, idx) => {
      // 该标签在用户分数表中的得分（没有则 0）
      const userScore = scores[tag] || 0;
      // 人格的第1标签权重更高
      const weight = idx === 0 ? 1.5 : idx === 1 ? 1.0 : 0.7;
      matchScore += userScore * weight;
    });
    if (matchScore > bestScore) {
      bestScore = matchScore;
      bestPersona = p;
    }
  });

  // 匹配度：最优人格得分 / 理论最大值
  const theoreticalMax = 12 * 2 * 1.5; // 12题 × 每题2分 × 权重
  const matchPercent = Math.min(99, Math.round((bestScore / theoreticalMax) * 100) + 20);

  return {
    persona: bestPersona,
    topTags,
    matchPercent,
    scores,
  };
}