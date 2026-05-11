// ============ 16 道题 + 评分机制 ============
//
// 世界观：「毛茸茸测验 · 假如你是一只」
//   不是"变身"、也不是"旅行者"——而是一个平行设问：
//   假如你是一只动物，你会在哪里？会做什么？会想念谁？
//
// 16 张明信片式小瞬间 = 4 卷 × 每卷 4 题
//   卷一 · 如果有一身毛     清晨、醒来、第一道光
//   卷二 · 第一口风         出门、街道、陌生气味
//   卷三 · 太阳走到头顶     午后、相遇、食物
//   卷四 · 晚一点再回家     黄昏、独处、一点心事
//
// 题干风格参考网易云 × 19 工作室：
//   · 题干极短，一个画面 + 一句问句
//   · 选项像独立的短句，有画面、有留白、不解释
//   · 去 emoji 前缀、去破折号炫技、去口号
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

// ============ 幕间卡数据 ============
// beforeQ: 在第几题（0-indexed）之前插入幕间卡
export const ACT_BREAKS = [
  {
    beforeQ: 0,
    act: 1,
    label: '卷一',
    title: '如果有一身毛',
    quote: '你不必变成它。\n你本来就有一点像。',
    icon: '🌾',
  },
  {
    beforeQ: 4,
    act: 2,
    label: '卷二',
    title: '第一口风',
    quote: '门开了。\n一点没见过的风，从脚底下钻过去。',
    icon: '🍃',
  },
  {
    beforeQ: 8,
    act: 3,
    label: '卷三',
    title: '太阳走到头顶',
    quote: '一切都慢下来了。\n影子短了，心跳也是。',
    icon: '🌞',
  },
  {
    beforeQ: 12,
    act: 4,
    label: '卷四',
    title: '晚一点再回家',
    quote: '天快黑了。\n你还没有想好，要不要回。',
    icon: '🌙',
  },
];

// ============ 16 道题 ============
// 每题结构：
//   scene   : 场景前情（1-2 句，灰色小字，营造画面感；可留空）
//   q       : 核心问句（加粗，尽量短、尽量画面感）
//   options : 4 个选项，text 是独立短句，tags 是 1-2 个标签
//   feedbacks: 选中某项后浮层弹出的短彩蛋（和选项一一对应）

export const QUESTIONS = [

  // ===== 卷一 · 如果有一身毛（题 01-04）=====

  // 01 · 唤起 · 清晨的第一件事
  {
    id: 1,
    scene: '清晨六点，窗帘还没拉开。',
    q: '你的耳朵突然动了一下，是因为什么？',
    options: [
      { text: '有风从缝里进来，带着远处的味道',          tags: ['WILD', 'LOST'] },
      { text: '楼下有谁在敲什么东西，一下一下',          tags: ['NERD', 'GOSS'] },
      { text: '被子刚好是暖的',                          tags: ['COZY', 'CHIL'] },
      { text: '厨房有油锅响了一声',                      tags: ['NOMZ', 'BOSS'] },
    ],
    feedbacks: [
      '你的第一反应，总是向着门外那边。',
      '你是那种，连风声都能听出八卦的。',
      '你值得一个不用赶着起床的早上。',
      '你的胃，比闹钟先醒了五分钟。',
    ],
  },

  // 02 · 本能 · 起床后做的第一件事
  {
    id: 2,
    scene: '',
    q: '睁开眼之后，你做的第一件事是什么？',
    options: [
      { text: '伸一个很长很长的懒腰，骨头咔的响一声',    tags: ['COZY', 'CHIL'] },
      { text: '一骨碌跳下来，不知道要去哪',              tags: ['WILD', 'FOMO'] },
      { text: '先蹲着看半分钟，什么都不做',              tags: ['SOLO', 'HIDE'] },
      { text: '低头看食盆',                              tags: ['NOMZ', 'STUB'] },
    ],
    feedbacks: [
      '你和早晨的相处方式，是慢慢的。',
      '你的一天，是从一个冲动开始的。',
      '你需要一点时间，才会真的到场。',
      '你诚实地活着。',
    ],
  },

  // 03 · 安全感 · 最怕的东西
  {
    id: 3,
    scene: '',
    q: '你最不喜欢的一种声音是什么？',
    options: [
      { text: '吸尘器',                                  tags: ['HIDE', 'STUB'] },
      { text: '楼下突然多出来的一群人',                  tags: ['SOLO', 'CHIC'] },
      { text: '门铃响了三声没人应',                      tags: ['WARM', 'FOMO'] },
      { text: '没什么特别怕的，热闹点好',                tags: ['WOOF', 'GOSS'] },
    ],
    feedbacks: [
      '你有自己不愿意被打扰的那一块。',
      '你喜欢的热闹，是远远的那种。',
      '你连没人回应的门铃，都替它心疼一下。',
      '你是那种，人来人往都不怕的。',
    ],
  },

  // 04 · 味觉 · 早饭
  {
    id: 4,
    scene: '',
    q: '如果可以选一样做早饭，你会选哪个？',
    options: [
      { text: '刚煎好的鱼，边上还冒着油花',              tags: ['NOMZ', 'BOSS'] },
      { text: '一小碗温过的牛奶',                        tags: ['COZY', 'SOLO'] },
      { text: '一颗刚剥开的煮蛋，黄的那种',              tags: ['CHIC', 'SHOT'] },
      { text: '谁吃剩的那半块，不挑',                    tags: ['CHIL', 'LOST'] },
    ],
    feedbacks: [
      '你对食物，是有态度的。',
      '你相信温度比味道重要。',
      '你讲究一种别人看不见的讲究。',
      '你活得比大部分人轻松。',
    ],
  },

  // ===== 卷二 · 第一口风（题 05-08）=====

  // 05 · 姿态 · 走路的样子
  {
    id: 5,
    scene: '门开了。你迈出第一步。',
    q: '你走路是什么样子的？',
    options: [
      { text: '一路小跑，尾巴翘得老高',                  tags: ['WILD', 'WOOF'] },
      { text: '先停三秒，看两眼，再迈第一步',            tags: ['NERD', 'STUB'] },
      { text: '走得很慢，像没在赶时间',                  tags: ['COZY', 'CHIL'] },
      { text: '边走边嗅，路线是歪的',                    tags: ['LOST', 'GOSS'] },
    ],
    feedbacks: [
      '你的快乐，是写在尾巴上的。',
      '你的谨慎，是一种温柔。',
      '你不急，因为你知道该来的都会来。',
      '你的方向感，跟着鼻子走。',
    ],
  },

  // 06 · 好奇 · 岔路
  {
    id: 6,
    scene: '右手边出现一条没走过的窄巷。',
    q: '你会怎么做？',
    options: [
      { text: '尾巴一翘就钻进去',                        tags: ['WILD', 'LOST'] },
      { text: '坐在巷口看一会儿，记住路',                tags: ['NERD', 'HIDE'] },
      { text: '没停，继续往前走',                        tags: ['FOMO', 'BOSS'] },
      { text: '鼻子先动了一下，里面好像有香的',          tags: ['NOMZ', 'WOOF'] },
    ],
    feedbacks: [
      '你的地图里，最长的那条路是弯的。',
      '你记下来的，比走过的还多。',
      '你有自己的正事。',
      '你的鼻子，比脑子先到。',
    ],
  },

  // 07 · 应对 · 暴雨
  {
    id: 7,
    scene: '天忽然黑了一块，雨点砸在瓦片上。',
    q: '你会怎么做？',
    options: [
      { text: '甩了甩毛，接着走',                        tags: ['WILD', 'STUB'] },
      { text: '一溜烟钻进最近的屋檐底下',                tags: ['CHIL', 'COZY'] },
      { text: '找了个高一点的地方，看雨',                tags: ['CHIC', 'SHOT'] },
      { text: '跑去人最多的那家店门口蹭一下',            tags: ['WOOF', 'WARM'] },
    ],
    feedbacks: [
      '你的身体，比雨还快。',
      '你懂得怎么对自己好。',
      '你把一场雨，看成了一幅画。',
      '你知道，哪里有人，哪里就有办法。',
    ],
  },

  // 08 · 社交感 · 被陌生人盯
  {
    id: 8,
    scene: '一个陌生人蹲下来，看着你，没说话。',
    q: '你会怎么做？',
    options: [
      { text: '走过去，让他摸一下',                      tags: ['WOOF', 'WARM'] },
      { text: '先歪头看他两秒，再决定',                  tags: ['NERD', 'CHIC'] },
      { text: '后退一步，往墙角挪',                      tags: ['HIDE', 'STUB'] },
      { text: '装没看见，继续舔爪子',                    tags: ['SOLO', 'CHIL'] },
    ],
    feedbacks: [
      '你把世界当作朋友，所以它常常也是。',
      '你是礼貌地观察过，再喜欢一个人。',
      '你的边界，写在你的脚步里。',
      '你允许自己不回应。',
    ],
  },

  // ===== 卷三 · 太阳走到头顶（题 09-12）=====

  // 09 · 探索 · 爬高
  {
    id: 9,
    scene: '午后的墙被晒得发亮，墙头有一只鸟叫了一声。',
    q: '你会怎么做？',
    options: [
      { text: '一下就跳上去，想看更远一点',              tags: ['WILD', 'SHOT'] },
      { text: '绕两圈，找一个稳一点的台阶',              tags: ['NERD', 'BOSS'] },
      { text: '在墙根躺下，听它叫',                      tags: ['COZY', 'CHIL'] },
      { text: '抬头看了一眼，不感兴趣',                  tags: ['HIDE', 'STUB'] },
    ],
    feedbacks: [
      '你的视野，常常比别人高一层。',
      '你不鲁莽，但也不胆小。',
      '你享受一种不需要参与的热闹。',
      '你不会为了热闹做事。',
    ],
  },

  // 10 · 同类 · 遇到另一只
  {
    id: 10,
    scene: '另一只和你差不多的，坐在墙头看着你。',
    q: '对视了两秒，你会怎么做？',
    options: [
      { text: '你先叫了一声',                            tags: ['WOOF', 'GOSS'] },
      { text: '你当没看见，走你的',                      tags: ['SOLO', 'STUB'] },
      { text: '你也坐下，看它',                          tags: ['CHIC', 'COZY'] },
      { text: '你跑过去看它脚边有没有吃的',              tags: ['NOMZ', 'FOMO'] },
    ],
    feedbacks: [
      '你愿意先开口，这很了不起。',
      '你的独处里，有一种自尊。',
      '你的陪伴，不需要说话。',
      '你活得实际，这没什么不好。',
    ],
  },

  // 11 · 美食 · 排长队的地方
  {
    id: 11,
    scene: '那家老远就能闻到味道的店门口，排了一排人。',
    q: '你会怎么做？',
    options: [
      { text: '挤到最前面，仰着头等',                    tags: ['BOSS', 'NOMZ'] },
      { text: '转身去隔壁没人的那家',                    tags: ['HIDE', 'NOMZ'] },
      { text: '先坐下来观察谁手上拿得最多',              tags: ['NERD', 'SHOT'] },
      { text: '趴在门边睡一会儿，醒了再说',              tags: ['CHIL', 'STUB'] },
    ],
    feedbacks: [
      '你相信，好东西值得等。',
      '你的馆子，是别人还没发现的。',
      '你做每件事，都有研究过。',
      '你把"等"变成了一种享受。',
    ],
  },

  // 12 · 温度 · 小孩伸手
  {
    id: 12,
    scene: '一个小孩蹲下来，手里有半块饼干，朝你伸过来。',
    q: '你会怎么做？',
    options: [
      { text: '凑过去，低头吃了',                        tags: ['NOMZ', 'WARM'] },
      { text: '先闻一下手，再吃',                        tags: ['NERD', 'WARM'] },
      { text: '抬头看了他一眼，蹭了蹭他的膝盖',          tags: ['WOOF', 'WARM'] },
      { text: '没动，等他放下',                          tags: ['STUB', 'HIDE'] },
    ],
    feedbacks: [
      '你懂得接受别人给你的好。',
      '你温柔里有一点分寸。',
      '你知道，有时候回应比吃更重要。',
      '你有你的尊严，饼干也不行。',
    ],
  },

  // ===== 卷四 · 晚一点再回家（题 13-16）=====

  // 13 · 接受赞美 · 被夸了
  {
    id: 13,
    scene: '有人路过，停下来跟你说：你真好看。',
    q: '你会怎么做？',
    options: [
      { text: '立刻转个圈，给他看正面',                  tags: ['WOOF', 'SHOT'] },
      { text: '眯起眼睛，很满意地哼一声',                tags: ['CHIC', 'BOSS'] },
      { text: '装没听见，但尾巴摇了一下',                tags: ['SOLO', 'WARM'] },
      { text: '瞄了一眼，继续做你刚才在做的事',          tags: ['HIDE', 'CHIL'] },
    ],
    feedbacks: [
      '你的开心，不怕被看见。',
      '你接受夸奖的方式，很高级。',
      '你假装不在意，其实都记得。',
      '你不需要外界的评价来确认自己。',
    ],
  },

  // 14 · 迷路 · 丢了路
  {
    id: 14,
    scene: '天快黑了，你发现自己走得有点远，这条街不认识。',
    q: '你会怎么做？',
    options: [
      { text: '再往前走走看，说不定好玩',                tags: ['LOST', 'WILD'] },
      { text: '坐下来，看路灯一盏一盏亮起来',            tags: ['COZY', 'CHIC'] },
      { text: '原路一点点嗅回去',                        tags: ['NERD', 'FOMO'] },
      { text: '找一个有人声的方向走',                    tags: ['WOOF', 'WARM'] },
    ],
    feedbacks: [
      '你把迷路，过成了探险。',
      '你把迷路，过成了风景。',
      '你把迷路，过成了一场归途。',
      '你相信，有人的地方就有回家的路。',
    ],
  },

  // 15 · 仪式感 · 回窝前
  {
    id: 15,
    scene: '快到家了，离门口还有一小段路。',
    q: '你会怎么做？',
    options: [
      { text: '绕一个大圈，把这一天再过一遍',            tags: ['GOSS', 'NERD'] },
      { text: '抬头看一眼天，再进门',                    tags: ['CHIC', 'SOLO'] },
      { text: '直接推门进去，不想再待一秒了',            tags: ['CHIL', 'BOSS'] },
      { text: '在门口的花盆边多待了一会儿',              tags: ['HIDE', 'WARM'] },
    ],
    feedbacks: [
      '你喜欢把一天，亲手收好。',
      '你回家前，要先和天空告个别。',
      '你诚实地累。',
      '你的门口，有一个只有你知道的小地方。',
    ],
  },

  // 16 · 潜意识投射 · 最后一题
  {
    id: 16,
    scene: '闭上眼，别想太久。',
    q: '脑子里最先出现的画面是哪一个？',
    options: [
      { text: '一只在草地上打滚打到肚皮朝天的',          tags: ['WILD', 'WOOF'] },
      { text: '一只坐在窗台看了一下午雨的',              tags: ['SOLO', 'CHIC'] },
      { text: '一只泡在温水里眯着眼的',                  tags: ['COZY', 'CHIL'] },
      { text: '一群飞过橘色天空的，最后那只飞得最歪',    tags: ['LOST', 'FOMO'] },
    ],
    feedbacks: [
      '你心里最自由的那一部分，被你认出来了。',
      '你心里最安静的那一部分，被你认出来了。',
      '你心里最松弛的那一部分，被你认出来了。',
      '你心里最随性的那一部分，被你认出来了。',
    ],
  },
];

// ============ 16 个人格画像 ============
// 每个人格有 2-3 个标签（就是"灵魂签名"），哪个人格和用户Top标签吻合度最高 → 就是用户结果

export const PERSONAS = [
  {
    code: 'WILD',
    chinese: '拆家三秒后忘了为什么的哈士奇',
    englishLine: 'THE WILD RUNNER',
    tagline: '冲！冲哪我也不知道',
    petId: 'husky',
    petName: '哈士奇',
    primaryTags: ['WILD', 'LOST', 'WOOF'],
    description: '机票买完行李都没收拾，但已经冲出门了。你的旅行字典里没有「等一下」，只有「走了」。',
    petReason: '看见门开着就冲出去，跑出两条街才想起来要去哪。',
    cities: ['西藏', '冰岛', '新疆'],
    color: '#D8E8F0',
  },
  {
    code: 'NERD',
    chinese: '眼神比你还清醒的边牧',
    englishLine: 'THE PLAN GEEK',
    tagline: '你急什么，攻略我做完了',
    petId: 'collie',
    petName: '边牧',
    primaryTags: ['NERD', 'FOMO', 'BOSS'],
    description: '出发前Excel已经做好三版，每家店的排队时间都查过。你觉得这不是负担，是浪漫。',
    petReason: '别人在玩，它在算时间，连放风都按表来。',
    cities: ['京都', '苏州', '瑞士'],
    color: '#CFDCC5',
  },
  {
    code: 'NOMZ',
    chinese: '十只九只胖、剩下一只在吃的胖橘',
    englishLine: 'THE LATE-NIGHT FORAGER',
    tagline: '干饭，是我最后的尊严',
    petId: 'orange',
    petName: '胖橘',
    primaryTags: ['NOMZ', 'BOSS', 'WARM'],
    description: '凌晨两点的烧烤摊是你的归宿，胃是你的旅行指南，味道是你的城市地图。',
    petReason: '醒着的时间分两半，一半在吃，一半在等下一顿。',
    cities: ['成都', '潮汕', '武汉'],
    color: '#F3E0CB',
  },
  {
    code: 'CHIC',
    chinese: '走两步要先确认有没有人在看的布偶',
    englishLine: 'THE MOOD CURATOR',
    tagline: '这个角度，不行，重来',
    petId: 'ragdoll',
    petName: '布偶猫',
    primaryTags: ['CHIC', 'SHOT', 'COZY'],
    description: '光线不对的店你不进，没拍到好看的照片这趟就不算来过。你为美学而活。',
    petReason: '拍照前要先找好光，不然宁可不出镜。',
    cities: ['巴黎', '京都', '上海'],
    color: '#E8D5E8',
  },
  {
    code: 'COZY',
    chinese: '泡澡不被打扰天塌了也不管的水豚',
    englishLine: 'THE SUN SOAKER',
    tagline: '不急，太阳又不会跑',
    petId: 'capybara',
    petName: '水豚酱',
    primaryTags: ['COZY', 'CHIL', 'SOLO'],
    description: '一棵树下能坐一下午，不赶路、不打卡，只想感受这个城市本来的呼吸。',
    petReason: '泡进温泉就不打算上来了，地震也劝不动。',
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
    primaryTags: ['WOOF', 'WARM', 'WILD'],
    description: '能和民宿老板娘聊到凌晨，能和大爷下一盘棋。陌生人都是你还没认识的朋友。',
    petReason: '见到谁都想过去打个招呼，被拒绝也笑得很开心。',
    cities: ['曼谷', '伊斯坦布尔', '成都'],
    color: '#F8D6C4',
  },
  {
    code: 'STUB',
    chinese: '呼吸比走路声音还大的法斗',
    englishLine: 'THE STUBBORN WALKER',
    tagline: '趴着，是一种态度',
    petId: 'frenchie',
    petName: '法斗',
    primaryTags: ['STUB', 'CHIL', 'SOLO'],
    description: '不想走就是不想走，谁来都没用。你有自己的节奏，世界配合你。',
    petReason: '趴下之后，叫它名字它只回你一个白眼。',
    cities: ['京都', '釜山', '台南'],
    color: '#EADDC8',
  },
  {
    code: 'HIDE',
    chinese: '半夜回家不带钥匙也能进门的狸花猫',
    englishLine: 'THE OFF-GRID SEEKER',
    tagline: '人少的地方才有惊喜（和老鼠）',
    petId: 'lihua',
    petName: '狸花猫',
    primaryTags: ['HIDE', 'SOLO', 'STUB'],
    description: '游客越多越绕道，冷巷才是真爱。你的私藏地图比Google Maps还全。',
    petReason: '哪条巷子人少就往哪走，专挑没人发现的角落。',
    cities: ['泉州', '平遥', '里斯本'],
    color: '#E8DFCE',
  },
  {
    code: 'SHOT',
    chinese: '每个角度都自带滤镜的三花',
    englishLine: 'THE FRAME HUNTER',
    tagline: '拍我可以，但请打光',
    petId: 'calico',
    petName: '三花猫',
    primaryTags: ['SHOT', 'CHIC', 'FOMO'],
    description: '没拍够九宫格，这次旅行就不算结束。构图、光线、色温，你是专业的。',
    petReason: '每个角度都好看，连打哈欠都像在拍杂志。',
    cities: ['东京', '厦门', '巴塞罗那'],
    color: '#F7E4CA',
  },
  {
    code: 'FOMO',
    chinese: '小短腿但永远不肯被落下的柯基',
    englishLine: 'THE CHECKLIST HUNTER',
    tagline: '腿短，但我从不认输',
    petId: 'corgi',
    petName: '柯基',
    primaryTags: ['FOMO', 'BOSS', 'NERD'],
    description: '每个网红点都不能漏，漏一个就心痒。你的 Notion 攻略表有五个 tab。',
    petReason: '腿不长但从不认输，再远的地方它也要颠到。',
    cities: ['首尔', '东京', '新加坡'],
    color: '#F5D9C0',
  },
  {
    code: 'SOLO',
    chinese: '被吵到了也只是缓缓闭上一只眼的英短',
    englishLine: 'THE SOLO DRIFTER',
    tagline: '吵什么吵，我在思考鱼',
    petId: 'british',
    petName: '英短蓝猫',
    primaryTags: ['SOLO', 'HIDE', 'COZY'],
    description: '戴上耳机，世界与我无关。一个人走、一个人吃、一个人看，是你最舒服的节奏。',
    petReason: '全世界都在吵，它眯着眼睛装作什么都没听见。',
    cities: ['冰岛', '北海道', '苏格兰'],
    color: '#DCE2E8',
  },
  {
    code: 'BOSS',
    chinese: '看见食物眼睛能亮出两个太阳的金毛',
    englishLine: 'THE FOOD CAPTAIN',
    tagline: '只要有吃的，地球都能跑两圈',
    petId: 'golden',
    petName: '金毛',
    primaryTags: ['BOSS', 'NOMZ', 'NERD'],
    description: '吃，是今天唯一的 KPI。你的旅行是一场精确打击，每一餐都不能浪费。',
    petReason: '听到拆零食袋的声音，比听到自己名字反应还快。',
    cities: ['成都', '潮汕', '大阪'],
    color: '#F5D79C',
  },
  {
    code: 'WARM',
    chinese: '以为全世界都是来摸它的萨摩耶',
    englishLine: 'THE WARM WANDERER',
    tagline: '来都来了，摸一下嘛',
    petId: 'samoyed',
    petName: '萨摩耶',
    primaryTags: ['WARM', 'WOOF', 'NOMZ'],
    description: '和奶茶店小哥聊、和卖菜阿姨聊，旅行结束时你手机里多了十个微信好友。',
    petReason: '觉得地球上每一个人都是来摸它的。',
    cities: ['清迈', '长沙', '冲绳'],
    color: '#EDEAE3',
  },
  {
    code: 'CHIL',
    chinese: '一被摸就化成一摊年糕的垂耳兔',
    englishLine: 'THE CHILL FLOATER',
    tagline: '躺，是一种修行',
    petId: 'lop',
    petName: '垂耳兔',
    primaryTags: ['CHIL', 'COZY', 'LOST'],
    description: '计划？不存在的。能躺就躺，能坐就坐，能不走路就绝对不走路。',
    petReason: '一被摸就软成一摊，眼皮都懒得抬。',
    cities: ['巴厘岛', '大理', '清迈'],
    color: '#F3E6D0',
  },
  {
    code: 'LOST',
    chinese: '跑出三米就忘了主人长什么样的博美',
    englishLine: 'THE HAPPY LOST',
    tagline: '我不是迷路，我是在探险',
    petId: 'pomeranian',
    petName: '博美',
    primaryTags: ['LOST', 'WILD', 'CHIL'],
    description: '手机没电也觉得"没事吧"，走丢了就走丢了，反正总会到某个地方的。',
    petReason: '跑出去三米就开始找回家的路，但坚决不承认自己迷路。',
    cities: ['西藏', '新疆', '挪威'],
    color: '#F9DDC2',
  },
  {
    code: 'GOSS',
    chinese: '一天能叫八百句但句句不重样的暹罗',
    englishLine: 'THE MURMUR WALKER',
    tagline: '听我说听我说听我说',
    petId: 'siamese',
    petName: '暹罗猫',
    primaryTags: ['GOSS', 'WOOF', 'SHOT'],
    description: '每个地方都要在脑内解说一遍，回来能写三千字游记。你的朋友圈是长篇连载。',
    petReason: '一天能叫八百句，每一句都觉得自己在讲重要的事。',
    cities: ['伊斯坦布尔', '长沙', '京都'],
    color: '#E6DBC9',
  },
];

// ============ 评分算法 ============
// 输入：用户每题选择的 option index 数组
// 输出：匹配到的人格对象 + top 标签分数表
//
// 算法思路（v2）：
//   1. 累计每个标签的得分（每选项命中 +2）
//   2. 计算用户的标签向量（归一化后的相对强度）
//   3. 对每个人格计算「位置加权匹配分」：
//      - 人格 primaryTags[0] 必须出现在用户 Top3，权重 ×3
//      - 人格 primaryTags[1] 出现在用户 Top5 加分，权重 ×1.5
//      - 人格 primaryTags[2] 出现在用户 Top7 加分，权重 ×0.8
//      - 用户的 Top1 标签必须命中人格的 primaryTags 之一，否则该人格不入选
//   4. 同分时，primaryTags[0] = 用户 Top1 的人格优先

export function calculatePersona(answers) {
  // 1. 累计每个标签的得分
  const scores = {};
  answers.forEach((optIdx, qIdx) => {
    if (optIdx == null) return;
    const opt = QUESTIONS[qIdx].options[optIdx];
    opt.tags.forEach(tag => {
      scores[tag] = (scores[tag] || 0) + 2;
    });
  });

  // 2. 排序并取 Top N
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, score]) => ({ tag, score }));
  const topTags = sorted.slice(0, 3).map(x => x.tag);
  const top1 = sorted[0]?.tag;
  const top3 = sorted.slice(0, 3).map(x => x.tag);
  const top5 = sorted.slice(0, 5).map(x => x.tag);
  const top7 = sorted.slice(0, 7).map(x => x.tag);

  // 3. 对每个人格计算匹配分
  const candidates = [];
  PERSONAS.forEach(p => {
    const [pri, sec, ter] = p.primaryTags;

    // 硬条件：人格的 primaryTags 必须至少有一个出现在用户的 Top3
    // 否则这个人格根本不像用户
    const hitTop3 = p.primaryTags.some(t => top3.includes(t));
    if (!hitTop3) return;

    let matchScore = 0;

    // 主标签命中 Top1 是最重要的（这决定人格基调）
    if (pri === top1) matchScore += (scores[pri] || 0) * 3.0;
    else if (top3.includes(pri)) matchScore += (scores[pri] || 0) * 2.0;
    else if (top5.includes(pri)) matchScore += (scores[pri] || 0) * 1.0;

    // 次标签
    if (sec === top1) matchScore += (scores[sec] || 0) * 1.5;
    else if (top3.includes(sec)) matchScore += (scores[sec] || 0) * 1.2;
    else if (top5.includes(sec)) matchScore += (scores[sec] || 0) * 0.8;

    // 第三标签
    if (ter && top3.includes(ter)) matchScore += (scores[ter] || 0) * 0.8;
    else if (ter && top7.includes(ter)) matchScore += (scores[ter] || 0) * 0.5;

    // 完美匹配 bonus：primaryTags[0] = 用户 Top1，且 primaryTags[1] 在 Top3
    if (pri === top1 && top3.includes(sec)) matchScore += 8;

    candidates.push({ persona: p, score: matchScore });
  });

  // 兜底：如果硬条件全过滤掉了（极端情况），退回老逻辑
  if (candidates.length === 0) {
    PERSONAS.forEach(p => {
      let s = 0;
      p.primaryTags.forEach((tag, idx) => {
        const w = idx === 0 ? 1.5 : idx === 1 ? 1.0 : 0.7;
        s += (scores[tag] || 0) * w;
      });
      candidates.push({ persona: p, score: s });
    });
  }

  // 4. 取最高分
  candidates.sort((a, b) => b.score - a.score);
  const bestPersona = candidates[0].persona;
  const bestScore = candidates[0].score;

  // 匹配度：最优人格得分 / 理论最大值
  // 理论最大值 = 用户 Top1 标签的最高可能得分 × 3 + 其他标签贡献
  // 简化：用 (Top1 分数 + Top2 分数 + Top3 分数) × 系数 作为参考
  const referenceMax = (sorted[0]?.score || 0) * 3 + (sorted[1]?.score || 0) * 1.5 + (sorted[2]?.score || 0) * 0.8 + 8;
  const matchPercent = Math.min(99, Math.max(72, Math.round((bestScore / referenceMax) * 100)));

  return {
    persona: bestPersona,
    topTags,
    matchPercent,
    scores,
  };
}