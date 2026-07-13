// ============ 宠物素材清单 · 完整对齐版 ============
// 每只毛孩子 = 16种旅行人格之一。
// 为了保证图片与文字 100% 对齐，正面（卡片正面）和背面（卡片翻过来）
// 都使用同一张真实的旅行自拍照。
// 每只毛孩子写死一个「主城市 + 打卡地点」，以及对应的来信和图片配文。
//
// id 复用映射（保留字段结构，仅替换承载内容）：
//   husky      → 哈士奇 · 西藏纳木错
//   collie     → 边牧 · 京都嵐山
//   orange     → 小熊猫 · 四川峨眉山金顶（替换旧胖橘位）
//   ragdoll    → 奶牛猫 · 上海武康路（替换旧布偶位）
//   capybara   → 豚豚君（水豚改名） · 大理洱海
//   shiba      → 柴犬 · 曼谷唐人街
//   frenchie   → 比格犬 · 重庆山城步道（替换旧法斗位）
//   lihua      → 狸花猫 · 泉州老城红砖巷
//   calico     → 三花猫 · 东京昭和小巷
//   corgi      → 柯基酱 · 首尔益善洞
//   british    → 英短蓝猫 · 冰岛黑沙滩
//   golden     → 金毛 · 成都玉林路
//   samoyed    → 萨摩耶 · 清迈周日步行街
//   lop        → 垂耳兔 · 巴厘岛乌布稻田
//   pomeranian → 博美（兜底保留） · 西藏羊卓雍措
//   siamese    → 豚鼠鼠 · 伊斯坦布尔大巴扎（替换旧暹罗位）

// ============ 宠物旅行自拍照（用于正面、背面、结果页） ============
export const PET_PHOTOS = {
  husky:      './generated/pets/optimized/husky-photo.webp',       // 哈士奇 · 卡片背面
  collie:     './generated/pets/optimized/collie-photo.webp',       // 边牧 · 卡片背面
  orange:     './generated/pets/optimized/orange-photo.webp',                                                                                                                                  // 小熊猫 · 卡片背面（新生成）
  ragdoll:    './generated/pets/optimized/ragdoll-photo.webp',                                                                                                                                    // 奶牛猫 · 卡片背面（新生成）
  capybara:   './generated/pets/optimized/capybara-photo.webp',       // 豚豚君（水豚） · 卡片背面
  shiba:      './generated/pets/optimized/shiba-photo.webp',       // 柴犬 · 卡片背面
  frenchie:   './generated/pets/optimized/frenchie-photo.webp',                                                                                                                                    // 比格犬 · 卡片背面（沿用之前）
  lihua:      './generated/pets/optimized/lihua-photo.webp',                                                                                                                                // 狸花猫 · 卡片背面（v2 · 重新生成 · 修正了原 URL 指向错误图）
  calico:     './generated/pets/optimized/calico-photo.webp',       // 三花猫 · 卡片背面
  corgi:      './generated/pets/optimized/corgi-photo.webp',       // 柯基酱 · 卡片背面
  british:    './generated/pets/optimized/british-photo.webp',       // 英短蓝猫 · 卡片背面
  golden:     './generated/pets/optimized/golden-photo.webp',       // 金毛 · 卡片背面
  samoyed:    './generated/pets/optimized/samoyed-photo.webp',       // 萨摩耶 · 卡片背面
  lop:        './generated/pets/optimized/lop-photo.webp',       // 垂耳兔 · 卡片背面
  pomeranian: './generated/pets/optimized/pomeranian-photo.webp',       // 博美 · 卡片背面（兜底）
  siamese:    './generated/pets/optimized/siamese-photo.webp',                                                                                                                              // 豚鼠鼠 · 卡片背面（新生成 v2）
};

// ============ 宠物风格化插画（正面贴纸用） ============
export const PET_ILLUSTRATIONS = {
  husky:      './generated/pets/optimized/husky-illustration.webp', // 哈士奇 · 正面
  collie:     './generated/pets/optimized/collie-illustration.webp', // 边牧 · 正面
  orange:     './generated/pets/optimized/orange-illustration.webp',                                                                                                                       // 小熊猫 · 正面（v2 · 严格风格对齐）
  ragdoll:    './generated/pets/optimized/ragdoll-illustration.webp',                                                                                                                         // 奶牛猫 · 正面（v2 · 严格风格对齐）
  capybara:   './generated/pets/optimized/capybara-illustration.webp', // 豚豚君 · 正面
  shiba:      './generated/pets/optimized/shiba-illustration.webp', // 柴犬 · 正面
  frenchie:   './generated/pets/optimized/frenchie-illustration.webp',                                                                                                                         // 比格犬 · 正面（v2 · 严格风格对齐）
  lihua:      './generated/pets/optimized/lihua-illustration.webp',                                                                                                                              // 狸花 · 正面（v2 · 重新生成 · 修正了原 URL 指向错误图）
  calico:     './generated/pets/optimized/calico-illustration.webp', // 三花 · 正面
  corgi:      './generated/pets/optimized/corgi-illustration.webp', // 柯基酱 · 正面
  british:    './generated/pets/optimized/british-illustration.webp', // 英短 · 正面
  golden:     './generated/pets/optimized/golden-illustration.webp', // 金毛 · 正面
  samoyed:    './generated/pets/optimized/samoyed-illustration.webp', // 萨摩耶 · 正面
  lop:        './generated/pets/optimized/lop-illustration.webp', // 垂耳兔 · 正面
  pomeranian: './generated/pets/optimized/pomeranian-illustration.webp', // 博美 · 正面（兜底）
  siamese:    './generated/pets/optimized/siamese-illustration.webp',                                                                                                                      // 豚鼠鼠 · 正面（v2 · 全新生成）
};

// ============ 宠物「旅行场景照」（结果页信件用） ============
export const PET_TRAVEL_PHOTOS = {
  husky:      './generated/pets/optimized/husky-travel.webp',       // 哈士奇 @ 西藏 纳木错
  collie:     './generated/pets/optimized/collie-travel.webp',       // 边牧 @ 京都 嵐山竹林
  orange:     './generated/pets/optimized/orange-travel.webp',                                                                                                                              // 小熊猫 @ 峨眉山金顶（新生成）
  ragdoll:    './generated/pets/optimized/ragdoll-travel.webp',                                                                                                                                // 奶牛猫 @ 上海武康路（新生成）
  capybara:   './generated/pets/optimized/capybara-travel.webp',       // 豚豚君 @ 大理 洱海
  shiba:      './generated/pets/optimized/shiba-travel.webp',       // 柴犬 @ 曼谷 唐人街
  frenchie:   './generated/pets/optimized/frenchie-travel.webp',                                                                                                                                // 比格犬 @ 重庆 山城步道（新生成）
  lihua:      './generated/pets/optimized/lihua-travel.webp',                                                                                                                            // 狸花猫 @ 泉州 红砖巷（v2 · 重新生成 · 修正了原 URL 指向错误图）
  calico:     './generated/pets/optimized/calico-travel.webp',       // 三花猫 @ 东京 昭和小巷
  corgi:      './generated/pets/optimized/corgi-travel.webp',       // 柯基酱 @ 首尔 益善洞
  british:    './generated/pets/optimized/british-travel.webp',       // 英短蓝猫 @ 冰岛 黑沙滩
  golden:     './generated/pets/optimized/golden-travel.webp',       // 金毛 @ 成都 苍蝇馆子
  samoyed:    './generated/pets/optimized/samoyed-travel.webp',       // 萨摩耶 @ 清迈 步行街
  lop:        './generated/pets/optimized/lop-travel.webp',       // 垂耳兔 @ 巴厘岛 稻田日落
  pomeranian: './generated/pets/optimized/pomeranian-travel.webp',       // 博美 @ 西藏 草原白塔（兜底）
  siamese:    './generated/pets/optimized/siamese-travel.webp',                                                                                                                          // 豚鼠鼠 @ 伊斯坦布尔 大巴扎（v2 · 全新生成）
};

// ============ 16 只毛孩子完整资料 ============
// 每只宠物锁定：主城市 + 打卡地点 + 旅行主题
export const FEATURED_PETS = [
  {
    id: 'husky',
    chinese: '哈士奇',
    english: 'Husky',
    tagline: '冲！冲哪路上再说',
    tags: ['说走就走', '追风接梗王', '耶耶的贴心拎包助理'],
    bgColor: '#D8E8F0',
    illustrationUrl: PET_ILLUSTRATIONS.husky,
    photoUrl: PET_PHOTOS.husky,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.husky,
    city: '西藏',
    location: '纳木错湖边',
  },
  {
    id: 'collie',
    chinese: '边牧',
    english: 'Border Collie',
    tagline: '攻略做完了，just follow me',
    tags: ['会做攻略', '机酒预定者', '万事通包打听'],
    bgColor: '#CFDCCE',
    illustrationUrl: PET_ILLUSTRATIONS.collie,
    photoUrl: PET_PHOTOS.collie,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.collie,
    city: '京都',
    location: '嵐山竹林',
  },
  {
    id: 'orange',
    chinese: '小熊猫',
    english: 'Red Panda',
    tagline: '这碗面、这片叶、这一夜，都值得收藏',
    tags: ['享受派', '小确幸', '记忆收藏'],
    bgColor: '#F5D6B0',
    illustrationUrl: PET_ILLUSTRATIONS.orange,
    photoUrl: PET_PHOTOS.orange,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.orange,
    city: '峨眉山',
    location: '金顶云海竹林',
  },
  {
    id: 'ragdoll',
    chinese: '奶牛猫',
    english: 'Cow Cat',
    tagline: '别管，突然想疯一下',
    tags: ['抽象派', '随机开疯', '瓜田里上蹿下跳'],
    bgColor: '#E8E2D8',
    illustrationUrl: PET_ILLUSTRATIONS.ragdoll,
    photoUrl: PET_PHOTOS.ragdoll,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.ragdoll,
    city: '上海',
    location: '武康路转角',
  },
  {
    id: 'capybara',
    chinese: '豚豚君',
    english: 'Capybara',
    tagline: '不急，太阳又不会跑',
    tags: ['发呆系', '随缘出发', '温泉常驻'],
    bgColor: '#E8D8BE',
    illustrationUrl: PET_ILLUSTRATIONS.capybara,
    photoUrl: PET_PHOTOS.capybara,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.capybara,
    city: '大理',
    location: '洱海边',
  },
  {
    id: 'shiba',
    chinese: '柴犬',
    english: 'Shiba Inu',
    tagline: '你是谁我不知道，但我喜欢你',
    tags: ['街头社牛', '随地大小聊', '戏精'],
    bgColor: '#F3D5B5',
    illustrationUrl: PET_ILLUSTRATIONS.shiba,
    photoUrl: PET_PHOTOS.shiba,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.shiba,
    city: '曼谷',
    location: '唐人街夜市',
  },
  {
    id: 'frenchie',
    chinese: '比格犬',
    english: 'Beagle',
    tagline: '我先冲了，后果等会儿再说',
    tags: ['好奇过载', '情绪价值永动机', '让我吃一口'],
    bgColor: '#F0DCD0',
    illustrationUrl: PET_ILLUSTRATIONS.frenchie,
    photoUrl: PET_PHOTOS.frenchie,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.frenchie,
    city: '重庆',
    location: '山城步道',
  },
  {
    id: 'lihua',
    chinese: '狸花猫',
    english: 'Li Hua Cat',
    tagline: '远行，是奥德赛时期的灵魂朝圣',
    tags: ['意义感', '灵魂共振', '小众敏锐'],
    bgColor: '#D8D2C4',
    illustrationUrl: PET_ILLUSTRATIONS.lihua,
    photoUrl: PET_PHOTOS.lihua,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.lihua,
    city: '泉州',
    location: '老城红砖巷',
  },
  {
    id: 'calico',
    chinese: '三花猫',
    english: 'Calico Cat',
    tagline: '出片是你对抗虚无的创造力',
    tags: ['审美积累', '面包天使精灵', '拍照装备党'],
    bgColor: '#F5E4CC',
    illustrationUrl: PET_ILLUSTRATIONS.calico,
    photoUrl: PET_PHOTOS.calico,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.calico,
    city: '东京',
    location: '昭和小巷',
  },
  {
    id: 'corgi',
    chinese: '柯基酱',
    english: 'Corgi',
    tagline: '还没逛完，怎么能回酒店',
    tags: ['高能量', '狗沟构', '满格行动力'],
    bgColor: '#F5D5BE',
    illustrationUrl: PET_ILLUSTRATIONS.corgi,
    photoUrl: PET_PHOTOS.corgi,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.corgi,
    city: '首尔',
    location: '益善洞彩色阶梯',
  },
  {
    id: 'british',
    chinese: '英短蓝猫',
    english: 'British Shorthair',
    tagline: '别闹，我在思考鱼',
    tags: ['独行侠', '沉静', '高冷'],
    bgColor: '#D6DCE0',
    illustrationUrl: PET_ILLUSTRATIONS.british,
    photoUrl: PET_PHOTOS.british,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.british,
    city: '冰岛',
    location: '黑沙滩',
  },
  {
    id: 'golden',
    chinese: '金毛',
    english: 'Golden Retriever',
    tagline: '只要有吃的，能绕地球跑两圈',
    tags: ['社交牛杯', '本地狗好评美食雷达', '光盘行动派'],
    bgColor: '#F5DCB0',
    illustrationUrl: PET_ILLUSTRATIONS.golden,
    photoUrl: PET_PHOTOS.golden,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.golden,
    city: '成都',
    location: '玉林路苍蝇馆子',
  },
  {
    id: 'samoyed',
    chinese: '萨摩耶',
    english: 'Samoyed',
    tagline: '来都来了，摸一下嘛',
    tags: ['一键跟随', '微笑天使', '午安晚安早安'],
    bgColor: '#F0F0F0',
    illustrationUrl: PET_ILLUSTRATIONS.samoyed,
    photoUrl: PET_PHOTOS.samoyed,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.samoyed,
    city: '清迈',
    location: '周日步行街市场',
  },
  {
    id: 'lop',
    chinese: '垂耳兔',
    english: 'Holland Lop',
    tagline: '先别急，风会带路',
    tags: ['随性', '佛系', '松软'],
    bgColor: '#EDD9D0',
    illustrationUrl: PET_ILLUSTRATIONS.lop,
    photoUrl: PET_PHOTOS.lop,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.lop,
    city: '巴厘岛',
    location: '乌布稻田日落',
  },
  {
    id: 'pomeranian',
    chinese: '博美',
    english: 'Pomeranian',
    tagline: '我不是迷路，我是在探险',
    tags: ['即兴派', '好奇', '冲动'],
    bgColor: '#F5E0D0',
    illustrationUrl: PET_ILLUSTRATIONS.pomeranian,
    photoUrl: PET_PHOTOS.pomeranian,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.pomeranian,
    city: '西藏',
    location: '羊卓雍措草原白塔',
  },
  {
    id: 'siamese',
    chinese: '豚鼠鼠',
    english: 'Guinea Pig',
    tagline: '可以啊，试试呗，夺少钱',
    tags: ['有钱买单', '来都来了', '光盘行动执行者', '厕所在哪'],
    bgColor: '#E5CFB6',
    illustrationUrl: PET_ILLUSTRATIONS.siamese,
    photoUrl: PET_PHOTOS.siamese,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.siamese,
    city: '伊斯坦布尔',
    location: '大巴扎',
  },
];

// ============ 宠物来信（左图右文，每只一封） ============
// 严格按照用户模板：
//   · 第一人称，称"你/主人"
//   · 结合城市+地点+体验，100字以内
//   · 照片配文 photoCaption：两行短句，每行 ≤ 12 字
export const PET_LETTERS = {
  husky: {
    city: '西藏',
    location: '纳木错湖边',
    date: '4 月 · 晴转雪',
    content: `亲爱的主人：

今天在纳木错，我追了一条长长的经幡跑了好远！风一吹它就跳，我一蹦就扑个空。一只乌鸦从我头顶掠过，好像在笑我。后来我坐在湖边喘气，整个人变成了风的形状。真希望你也在身边一起疯。

在高原想你的小哈敬上`,
    photoCaption: ['经幡追着风跑', '我追着经幡跑'],
  },
  collie: {
    city: '京都',
    location: '嵐山竹林',
    date: '4 月 · 晨雾',
    content: `亲爱的主人：

清晨的嵐山还带着雾，竹林里光一条一条斜下来。我遇到一位写生的爷爷，他画画，我安静趴在旁边。他走时送了我一颗糖。竹叶沙沙响，像整个京都在悄悄说话。想把这一刻也寄给你。

静静想你的小边敬上`,
    photoCaption: ['竹林漏下晨光', '我替你安静一下'],
  },
  orange: {
    city: '峨眉山',
    location: '金顶云海竹林',
    date: '4 月 · 雾晴',
    content: `亲爱的主人：

今天在峨眉山的竹林里，我遇到了一阵慢慢爬上来的云。它擦过我耳朵的时候是凉的，停在金顶上的时候是亮的。我把一片落下来的竹叶藏到了树洞里，下次来还能再找到。这一天，我想认认真真地收好。

慢慢想你的小熊猫敬上`,
    photoCaption: ['云擦过我耳朵', '我把这一刻收好'],
  },
  ragdoll: {
    city: '上海',
    location: '武康路转角',
    date: '4 月 · 傍晚微风',
    content: `亲爱的主人：

今天在武康路，我本来只是想慢慢走，结果被一头横冲直撞的比格吓得原地弹开，差点撞进一家花店。老板娘没生气，还送了我一小枝白色洋桔梗。风吹过来时，我又装作什么都没发生。你看，我还是很体面的。

怪怪想你的小奶牛敬上`,
    photoCaption: ['刚刚还很端庄', '下一秒就飞出去'],
  },
  capybara: {
    city: '大理',
    location: '洱海边',
    date: '4 月 · 慢阳光',
    content: `亲爱的主人：

今天在洱海边，一只浅色的流浪狗走过来，和我一起晒太阳。它没说话，我也没说话，海浪替我们聊了一下午。云慢慢在水里走，我慢慢在岸上化成一摊。这里的时间是软的，你一定会喜欢。

慢慢想你的豚豚君敬上`,
    photoCaption: ['海浪替我们说话', '太阳替我们答应'],
  },
  shiba: {
    city: '曼谷',
    location: '唐人街夜市',
    date: '4 月 · 热夜',
    content: `亲爱的主人：

夜市太好玩了！我在一个芒果糯米饭摊前愣住，老板娘笑着往我碗里多舀了两勺。旁边的大叔在吹一只塑料喇叭，节奏乱七八糟，但我尾巴自己跟着摇。曼谷的夜晚是甜的、吵的、亮的。

开心想你的小柴敬上`,
    photoCaption: ['霓虹比月亮亮', '我比霓虹开心'],
  },
  frenchie: {
    city: '重庆',
    location: '山城步道',
    date: '4 月 · 起风午后',
    content: `亲爱的主人：

今天在山城步道，我跟着一阵香味跑错了三个弯。拐角有个卖糍粑的小摊，阿姨一边笑一边看我打滑。风从坡上吹下来，我的耳朵被吹得像两面小旗子。重庆是会把人越带越兴奋的地方，你来了肯定也会乱跑。

吵吵想你的小比格敬上`,
    photoCaption: ['风把耳朵吹起来', '我把心情跑乱了'],
  },
  lihua: {
    city: '泉州',
    location: '老城红砖巷',
    date: '4 月 · 午后静',
    content: `亲爱的主人：

今天溜进了泉州一个小庙，木门半开，檀香味很淡。一位阿婆笑着把掉在地上的香烛灰吹给我看。红砖墙被太阳晒得发烫，屋檐下的燕子叫了一下又沉默。这里没有人赶我，也没有人找我，刚刚好。

远远想你的狸花敬上`,
    photoCaption: ['檀香飘过屋檐', '我缩在阴影里'],
  },
  calico: {
    city: '东京',
    location: '昭和小巷',
    date: '4 月 · 樱花飞',
    content: `亲爱的主人：

我在东京一条老巷子里被一串风铃拦住了。玻璃的、陶瓷的，叮叮当当。店主是个戴眼镜的奶奶，她举起一只樱花色的让我听——那声音像春天打的盹。我做了一个很长的表情，假装自己是杂志封面。

甜甜想你的三花敬上`,
    photoCaption: ['风铃响了一声', '春天就被叫醒'],
  },
  corgi: {
    city: '首尔',
    location: '益善洞彩色阶梯',
    date: '4 月 · 晴',
    content: `亲爱的主人：

益善洞的彩色阶梯上，有个小女孩拉着我比赛！我的小短腿在粉色那格输给了她的小皮鞋。我们在顶上击掌（爪），她的妈妈给我们一人一块奶油面包。今天阳光明亮，我的心情也是橘色的。

蹦蹦想你的小柯敬上`,
    photoCaption: ['一格粉一格橘', '一步一个心跳'],
  },
  british: {
    city: '冰岛',
    location: '黑沙滩',
    date: '4 月 · 大风',
    content: `亲爱的主人：

冰岛的黑沙滩像世界背过身去。风把一块白色浮木推到我爪子旁边，我看了它很久。远处有人在拍照，没人说话。我没冷，只是觉得自己突然变得很小，又很完整。你要是懂这种感觉，就好。

在风里想你的小英短敬上`,
    photoCaption: ['一块白色浮木', '写着海的来信'],
  },
  golden: {
    city: '成都',
    location: '玉林路苍蝇馆子',
    date: '4 月 · 傍晚微雨',
    content: `亲爱的主人：

今晚在玉林路，我交到了一个新朋友——老板家的一只小黑狗。我们一人一条冷吃兔骨头，互相看了看就决定是饭搭子了。辣椒香飘出巷口，雨还没停。主人，这一桌少了你。

嘴馋想你的金毛敬上`,
    photoCaption: ['一盘冷吃兔', '两个新朋友'],
  },
  samoyed: {
    city: '清迈',
    location: '周日步行街市场',
    date: '4 月 · 暖风夜',
    content: `亲爱的主人：

今天我做了件了不起的小事！一位小僧人的佛珠断了，珠子滚到我脚边，我一颗一颗叼回给他。他双手合十谢了我，我也有样学样把爪子搭起来。夜市灯亮起来，风是甜的，我觉得自己被祝福了一下。

软软想你的萨摩耶敬上`,
    photoCaption: ['一串佛珠散了', '我一颗颗叼回'],
  },
  lop: {
    city: '巴厘岛',
    location: '乌布稻田日落',
    date: '4 月 · 黄昏',
    content: `亲爱的主人：

我在乌布稻田边遇到一只鸭子，我们刚好同一个方向，就一起走了一段。它摇摇摆摆，我一蹦一蹦，谁也没带目的地。稻穗被夕阳染金，我的耳朵也是暖的。主人，被风带着走真的好舒服呀。

飘飘想你的小兔敬上`,
    photoCaption: ['和一只鸭同行', '往黄昏那边去'],
  },
  pomeranian: {
    city: '西藏',
    location: '羊卓雍措草原',
    date: '4 月 · 阳光刺眼',
    content: `亲爱的主人：

一条白色的哈达被风吹到我脸上！我吓得原地转了三圈。抬头才看见草原尽头的白塔，蓝得发烫的湖，云跑得飞快。我不知道自己走到了哪，但这里好美，我决定先开心一会儿。

乱跑想你的博美敬上`,
    photoCaption: ['哈达贴上脸颊', '云在天上赛跑'],
  },
  siamese: {
    city: '伊斯坦布尔',
    location: '大巴扎',
    date: '4 月 · 傍晚金光',
    content: `亲爱的主人：

大巴扎里有一只绿色的鹦鹉，它会说"Merhaba"，我立刻回它一声，我们就这么对嘴吵了起来！老板笑到合不拢嘴，给我一小块番红花奶酪。金黄的灯把整条街点亮。你要是在，我们一定能聊上两小时。

叽喳想你的小鼠敬上`,
    photoCaption: ['和鹦鹉吵两句', '替你尝了奶酪'],
  },
};
