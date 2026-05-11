// ============ 宠物素材清单 · 完整对齐版 ============
// 每只毛孩子 = 16种旅行人格之一。
// 为了保证图片与文字 100% 对齐，正面（卡片正面）和背面（卡片翻过来）
// 都使用同一张真实的旅行自拍照。
// 每只毛孩子写死一个「主城市 + 打卡地点」，以及对应的来信和图片配文。

// ============ 宠物旅行自拍照（用于正面、背面、结果页） ============
// 这些图片是按照"宠物+城市+自拍"模板生成的真实风格照片，
// 每一张都与该宠物的人格和城市一一匹配。
export const PET_PHOTOS = {
  // —— 前 8 只：按用户重新确认的对应关系重新映射 ——
  husky:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/16ef7663-7c07-4985-a4a3-ac11ed02c6df/45477e1b1dde4326998eab2985161dfe.png',       // 哈士奇
  collie:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/6520546c-cbf4-418d-92c3-3921560ec85f/05b2748494c4417b975f8cb9515ac2da.png',       // 边牧
  orange:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/2d73cef3-dc60-45f8-9933-a9e07c1ab3ef/52b23dd00c8c4982a55fd0eacabd5e9c.png',       // 胖橘
  ragdoll:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/9991480a-4e5e-4cc0-b429-b537afd7c458/1ab60ec5d9c64473972f18d4db2b57fe.png',       // 布偶猫
  capybara:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/b7d2072f-f904-425c-a5b8-f78a44f3b9a6/54808872f114449b8f65be3044e673b1.png',       // 卡皮巴拉 / 水豚
  shiba:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/f9fd2e12-5de6-4151-98f8-cfc8b343de9c/813f77fb0e4540189ee561fdeaafd823.png',       // 柴犬
  frenchie:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/9b8d89f3-1a67-4a6d-b685-003002c13465/6253a5fbae484afc8cf458cdd5cd00e1.png',       // 法斗
  lihua:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/706f2e44-92f5-4674-8dc7-9492ee1fea99/faee927243634c34bba5bf18cce47ed5.png',       // 狸花猫
  // —— 后 8 只 ——
  calico:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/922e1028-eba6-4585-86bc-d4a01dbbdc35/ef9061f1e0274955a563bf7bd567d7d5.png',       // 三花猫
  corgi:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/644c4cb8-e6bd-4009-b9c2-dacad498a293/1f751ab123c3479081d858d744bf0bf9.png',       // 柯基 · 草地傍晚奔跑
  // 英短 · 冰岛黑沙滩旅行自拍
  british:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/9dfd46f5-8ebe-4408-9561-8e7ec7bf9755/0512190ba0d542a0aa1ffc8fbc43f3c1.png',       // 英短蓝猫 · 冰岛黑沙滩
  golden:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/317971a4-51bf-4587-8bda-86edbfc48550/30d3ff92986645659e465bd777cb3f1d.png',       // 金毛 · 室内软光坐姿（重新生成）
  samoyed:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/28e88632-b49b-4428-932a-5b5f13e841d6/3ae522e237d84901941cf440846db49b.png',       // 萨摩耶 · 室内木地板微笑坐姿（重新生成）
  lop:        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/ed729721-ba7a-49d1-9d1c-f103b464bd44/85c6aabc14f143c9a344da34125824a7.png',       // 垂耳兔
  pomeranian: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/8e7c94c9-b14a-4f95-9309-26f608da7c16/6cfeb5b44da442a6bc96b573ad9477cd.png',       // 博美
  siamese:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/bc3091ae-d7a2-44ef-a306-75d0acae5638/7c6958ec18d9450ca7fbbe0ea43a9990.png',       // 暹罗猫
};

// ============ 宠物风格化插画（正面贴纸用） ============
// 每只毛孩子一张 flat-vector 贴纸风的手绘插画，作为卡片正面。
// 翻过来才是它们对应的真实旅行照片（PET_PHOTOS）。
export const PET_ILLUSTRATIONS = {
  // —— 前 8 只：无白边水彩贴纸版（按用户确认的对应关系） ——
  husky:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/a9a4f2e7-8c20-4e8c-adb8-42ed57443d00/d7257b232d134a368323095647d48868.png', // 哈士奇
  ragdoll:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/49b7091e-5d19-4a90-8ad4-f0dfbf9872ff/cda224f65d3f462b9a1da468828e02b0.png', // 布偶
  collie:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/b128a342-085c-4a07-be21-b87fbba6b6ba/cfdd9199d49b4076b2098e7d341fd1d8.png', // 边牧
  orange:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/bb0f8736-4a07-486e-ba2d-b48d41e6e1ef/e479c92fe8484c3ca81cd011e4fcbb6e.png', // 胖橘
  capybara:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/cedce72b-36a2-4a7a-8f19-a53d47aac82a/fb86a4cc996f44fb86d60d834be88a53.png', // 水豚
  shiba:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/78e9b424-3783-40e6-ba6d-22718ace7dc5/a4e4953dc9da413b826cd95e5351d74d.png', // 柴犬
  frenchie:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/b885b4c9-80b6-40d4-8706-c3723ba99b60/aa21db4df5574ed386ac16d3abc0c436.png', // 法斗
  lihua:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/1875dae1-f76e-47b2-b744-3680f5cda0a9/e910b469b6024cef823aa4976768c12d.png', // 狸花
  // —— 后 8 只：无白边水彩贴纸版（按用户确认的对应关系） ——
  calico:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/35ea814e-8ae8-47f5-a34e-85799fab7ad8/5d0e35cab83b450d927b8390e7e59456.png', // 三花
  corgi:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/ae8a4110-6c27-402e-808a-5015f0c5cf82/59a8a05043d34131a58afcb5b279df71.png', // 柯基
  british:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/1245add6-5e16-47f0-bc75-33d19d08d7f0/81866f410a464da9932498e39454e4e4.png', // 英短
  golden:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/f3e613f7-5302-4ac1-bedb-d58065aa5da3/12254ae1f5ba498b8b1db675bc65604a.png', // 金毛
  samoyed:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/8afd5a73-5df3-46b4-93a5-0b11c56a1026/9e0797e650534e57bd626105c3fd67f1.png', // 萨摩耶
  lop:        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/e5645b0d-0cdf-4195-a224-df76e137d167/6b59ead23f54414a80c554ec030258fe.png', // 垂耳兔
  pomeranian: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/b0f9d2eb-113b-4153-8724-469ab605f907/e14425b8ae4d423ebc0fab811d981faa.png', // 博美
  siamese:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/5b7710ea-5e93-4087-a94b-8dbf1878696f/95fb37bd65f64a3fa31fe912bf51a499.png', // 暹罗
};

// ============ 宠物「旅行场景照」（结果页信件用） ============
// 与 PET_PHOTOS 不同：这一组是宠物在「具体旅行城市的场景」中拍的照片，
// 用于结果页 Step2 「它寄回的随手拍」 — 强调"它真的代你去了那座城市"。
// 首页卡片背面继续使用 PET_PHOTOS（更通用的真实自拍感）。
export const PET_TRAVEL_PHOTOS = {
  husky:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/6d87a272-d241-42f4-b0d6-3f2225bedf8e/dd704bd7daeb438e8e5f449952bf9ade.png',       // 哈士奇 @ 西藏 纳木错
  collie:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/2b46c382-558a-44a0-9a89-1131618ca065/d7fc2e4a3c5f490db54d768a1f0b2633.png',       // 边牧 @ 京都 嵐山竹林
  orange:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/26bd211f-f96a-44c4-bac7-ad62698222d2/8b463900409b4683bee9befab67e0618.png',       // 胖橘 @ 成都 宽窄巷子
  ragdoll:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/3742b7e4-b629-49a8-9594-22bcc21733d4/c702ac23cf9941d0829d8e953950849a.png',       // 布偶猫 @ 巴黎 左岸咖啡馆
  capybara:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/7b956343-34c1-44fb-b1e9-a4b12288c914/e6798fab194441cb917517083fdbc1c7.png',       // 水豚 @ 大理 洱海
  shiba:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/c16a7787-a0a2-4de6-b26c-b4ac86ca4c7c/ae876fa3c3ac48d49c5f899a3c0fe863.png',       // 柴犬 @ 曼谷 唐人街
  frenchie:   'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/94e09e91-4253-49ae-af5b-866e3e1cf7bb/4eb3808ae1494ebd8ca42fd00f59bbad.png',       // 法斗 @ 京都 祇园石阶樱花
  lihua:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/b5e87864-ce87-4457-a5f6-db3ab7f4d22c/04faddf2c1c1455280ae3521f4df64b0.png',       // 狸花猫 @ 泉州 红砖巷
  calico:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/dbcb5e1c-5745-4763-bdc5-1b326e189f9a/a0844d9db66b4b9abd8d690048f2da6a.png',       // 三花猫 @ 东京 昭和小巷
  corgi:      'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/99800f9b-0ddf-4dfb-be36-6930174e966e/5991fc82ee4045f28539fe4d84a451eb.png',       // 柯基 @ 首尔 益善洞彩色阶梯
  british:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/c726a7a0-813b-49b6-b994-2780fc5530d9/c3c23cddcc23463bb8f2647bb1535c4d.png',       // 英短蓝猫 @ 冰岛 黑沙滩
  golden:     'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/ef991e24-f747-41f5-89aa-0f1b1d8caa4f/9eba51ec81c64036972310e0dc10876a.png',       // 金毛 @ 成都 苍蝇馆子
  samoyed:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/36b188d3-445e-4f33-a8ac-df7367e05db4/ff589158abba407390568643cbdfc1ea.png',       // 萨摩耶 @ 清迈 市场水果摊
  lop:        'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/ad09850d-8441-43ac-872a-facc1d6a5629/05b2ce9214764bad8317a6d88d2154a4.png',       // 垂耳兔 @ 巴厘岛 稻田日落
  pomeranian: 'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/d430e41f-d4c4-46c9-8cf9-68124bc1ad63/34b3b4e708be408b99831065421f201a.png',       // 博美 @ 西藏 草原白塔
  siamese:    'https://zhiyan-ai-agent-with-1258344702.cos.ap-guangzhou.tencentcos.cn/copilot/00106f9e-a389-4973-b388-53eecae5e87e/16ea1eba64a0433ba6b343abaa8a6db7.png',       // 暹罗猫 @ 伊斯坦布尔 大巴扎
};

// ============ 16 只毛孩子完整资料 ============
// 每只宠物锁定：主城市 + 打卡地点 + 旅行主题
export const FEATURED_PETS = [
  {
    id: 'husky',
    chinese: '哈士奇',
    english: 'Husky',
    tagline: '山河撒野家，风在哪它就冲向哪',
    tags: ['精力过剩', '说走就走', '自由派'],
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
    tagline: '狗界学霸，攻略做到小数点后两位',
    tags: ['智商第一', '规划控', '完美主义'],
    bgColor: '#CFDCCE',
    illustrationUrl: PET_ILLUSTRATIONS.collie,
    photoUrl: PET_PHOTOS.collie,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.collie,
    city: '京都',
    location: '嵐山竹林',
  },
  {
    id: 'orange',
    chinese: '胖橘',
    english: 'Orange Tabby',
    tagline: '十只橘猫九只胖，干饭永不缺席',
    tags: ['干饭王', '社交牛逼', '馋嘴'],
    bgColor: '#F5C38D',
    illustrationUrl: PET_ILLUSTRATIONS.orange,
    photoUrl: PET_PHOTOS.orange,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.orange,
    city: '成都',
    location: '宽窄巷子',
  },
  {
    id: 'ragdoll',
    chinese: '布偶猫',
    english: 'Ragdoll',
    tagline: '仙女下凡，气质要排在风景之前',
    tags: ['氛围感', '颜值控', '优雅'],
    bgColor: '#E8D5E8',
    illustrationUrl: PET_ILLUSTRATIONS.ragdoll,
    photoUrl: PET_PHOTOS.ragdoll,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.ragdoll,
    city: '巴黎',
    location: '左岸咖啡馆窗台',
  },
  {
    id: 'capybara',
    chinese: '水豚酱',
    english: 'Capybara',
    tagline: '松弛感天花板，慢到发呆有理',
    tags: ['松弛', '治愈', '慢慢来'],
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
    tagline: '戏精本精，街头社牛专业户',
    tags: ['街头社牛', '戏精', '自嗨'],
    bgColor: '#F3D5B5',
    illustrationUrl: PET_ILLUSTRATIONS.shiba,
    photoUrl: PET_PHOTOS.shiba,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.shiba,
    city: '曼谷',
    location: '唐人街夜市',
  },
  {
    id: 'frenchie',
    chinese: '法斗',
    english: 'French Bulldog',
    tagline: '原地趴地师，能坐着绝不站着',
    tags: ['躺平派', '岁月静好', '慢节奏'],
    bgColor: '#F0DCD0',
    illustrationUrl: PET_ILLUSTRATIONS.frenchie,
    photoUrl: PET_PHOTOS.frenchie,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.frenchie,
    city: '京都',
    location: '祇园樱花石阶',
  },
  {
    id: 'lihua',
    chinese: '狸花猫',
    english: 'Li Hua Cat',
    tagline: '小众冷门玩家，野性又孤独',
    tags: ['野性', '独立', '冷门控'],
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
    tagline: '出片型人格，每帧都是滤镜',
    tags: ['氛围感', '出片王', '审美在线'],
    bgColor: '#F5E4CC',
    illustrationUrl: PET_ILLUSTRATIONS.calico,
    photoUrl: PET_PHOTOS.calico,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.calico,
    city: '东京',
    location: '昭和小巷',
  },
  {
    id: 'corgi',
    chinese: '柯基',
    english: 'Corgi',
    tagline: '打卡搜集癖，小短腿跑遍全城',
    tags: ['打卡狂', '效率派', '笑面虎'],
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
    tagline: '耳机隐身侠，喜欢一个人发呆',
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
    tagline: '美食指挥官，一条街一条街地扫',
    tags: ['吃货', '社牛', '热情'],
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
    tagline: '路边搭讪家，见谁都要去贴贴',
    tags: ['社牛', '微笑天使', '人见人爱'],
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
    tagline: '随缘漂流派，风吹到哪是哪',
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
    tagline: '即兴走丢者，下一秒在哪不知道',
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
    chinese: '暹罗猫',
    english: 'Siamese Cat',
    tagline: '碎嘴漫游客，见什么都要聊两句',
    tags: ['话痨', '好奇宝宝', '机灵'],
    bgColor: '#E0D0C0',
    illustrationUrl: PET_ILLUSTRATIONS.siamese,
    photoUrl: PET_PHOTOS.siamese,
    travelPhotoUrl: PET_TRAVEL_PHOTOS.siamese,
    city: '伊斯坦布尔',
    location: '大巴扎',
  },
];

// ============ 城市高清真实图 ============
// 每个城市一张真实风景图，用于结果页"它去了哪里"
export const CITY_IMAGES = {
  '西藏':       'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=85',
  '京都':       'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
  '成都':       'https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=1200&q=85',
  '巴黎':       'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
  '大理':       'https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=1200&q=85',
  '曼谷':       'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85',
  '泉州':       'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=85',
  '东京':       'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85',
  '首尔':       'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85',
  '冰岛':       'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=85',
  '清迈':       'https://images.unsplash.com/photo-1598935898639-81586f7d2129?auto=format&fit=crop&w=1200&q=85',
  '巴厘岛':     'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
  '伊斯坦布尔': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=85',
  // 备用城市图（人格里的其他城市）
  '冰岛雷克雅未克': 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=85',
  '新疆':       'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=85',
  '苏州':       'https://images.unsplash.com/photo-1561501878-aabd62634533?auto=format&fit=crop&w=1200&q=85',
  '瑞士':       'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=85',
  '潮汕':       'https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=1200&q=85',
  '武汉':       'https://images.unsplash.com/photo-1538334421852-687c439c92f4?auto=format&fit=crop&w=1200&q=85',
  '上海':       'https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=1200&q=85',
  '婺源':       'https://images.unsplash.com/photo-1542601906-9bbc6fb11d3d?auto=format&fit=crop&w=1200&q=85',
  '釜山':       'https://images.unsplash.com/photo-1583499871880-de841d1ace2a?auto=format&fit=crop&w=1200&q=85',
  '台南':       'https://images.unsplash.com/photo-1575556226554-c2fd5211ff51?auto=format&fit=crop&w=1200&q=85',
  '平遥':       'https://images.unsplash.com/photo-1598100763828-9c6286c12f1f?auto=format&fit=crop&w=1200&q=85',
  '里斯本':     'https://images.unsplash.com/photo-1580323956656-26bbb1206e34?auto=format&fit=crop&w=1200&q=85',
  '厦门':       'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=1200&q=85',
  '巴塞罗那':   'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85',
  '新加坡':     'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=85',
  '北海道':     'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=85',
  '苏格兰':     'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85',
  '大阪':       'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=85',
  '长沙':       'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=1200&q=85',
  '冲绳':       'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=85',
  '挪威':       'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85',
};

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
    city: '成都',
    location: '宽窄巷子',
    date: '4 月 · 阴天微凉',
    content: `亲爱的主人：

今天在宽窄巷子被一支鸡毛逗得连打三个喷嚏——是给客人掏耳朵的师傅啦！他笑呵呵请我喝了口盖碗茶，茶香绕着胡子转。巷口一只大花猫睨了我一眼就走开，我也懒得计较。要是你在，我们能慢慢泡上一下午。

嘴馋想你的小橘敬上`,
    photoCaption: ['盖碗茶的热气', '漫过我的胡须'],
  },
  ragdoll: {
    city: '巴黎',
    location: '左岸咖啡馆窗台',
    date: '4 月 · 微雨',
    content: `亲爱的主人：

今天左岸咖啡馆窗外有位手风琴老人，他弹了一首我听不懂名字的歌，刚好为我停下。雨点落在玻璃上，像轻轻打的拍子。侍者给我送来一小碟奶油。我在想，你喝拿铁的样子也很巴黎。

有点想你的小布偶敬上`,
    photoCaption: ['手风琴在雨里', '雨在窗上打拍'],
  },
  capybara: {
    city: '大理',
    location: '洱海边',
    date: '4 月 · 慢阳光',
    content: `亲爱的主人：

今天在洱海边，一只浅色的流浪狗走过来，和我一起晒太阳。它没说话，我也没说话，海浪替我们聊了一下午。云慢慢在水里走，我慢慢在岸上化成一摊。这里的时间是软的，你一定会喜欢。

慢慢想你的水豚敬上`,
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
    city: '京都',
    location: '祇园樱花石阶',
    date: '4 月 · 花期末',
    content: `亲爱的主人：

我在祇园的石阶上睡着了。一位艺伎提着裙摆走过，绸缎轻轻扫过我的鼻子，像一片樱花。她低头看了我一眼，弯眉笑了。我没动——这种小场面，趴着享受就好。京都很温柔，你会喜欢。

懒懒想你的小法斗敬上`,
    photoCaption: ['绸缎掠过鼻尖', '像一整个春天'],
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

撑撑想你的金毛敬上`,
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

大巴扎里有一只绿色的鹦鹉，它会说"Merhaba"，我立刻回它一声"喵"，我们就这么对嘴吵了起来！老板笑到合不拢嘴，给我一小块番红花奶酪。金黄的灯把整条街点亮。你要是在，我们一定能聊上两小时。

叽喳想你的小暹敬上`,
    photoCaption: ['和鹦鹉吵两句', '替你尝了奶酪'],
  },
};