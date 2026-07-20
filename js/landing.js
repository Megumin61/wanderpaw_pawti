// ============ Landing 页（首屏紧凑 · 2 行错落横向滚动宠物墙） ============
// 16 只毛孩子 = 16 种旅行人格。
//   · 正面：风格化贴纸插画 + 正面底部胶囊名牌
//   · 背面：这只毛孩子的真实旅行照 + 中文名（逐字弹跳入场）+ 玻璃条 tagline
//   · hover：弹跳放大 + accent 光晕 + 顶部气泡（emoji + 名字 + tagline + 城市 pin）
//   · hover 停留 600ms 自动翻面（并触发快门闪白特效）；离开立刻收回
//   · 点击仍可 toggle 翻面（老用户习惯）

import { FEATURED_PETS } from './data/pets.js';

// —— 按宠物 id 映射的 emoji（气泡里展示）——
// 注：id 名是历史命名，承载的角色已重映射；emoji 按"当前承载角色"调整
const PET_EMOJI = {
  husky: '🐺', collie: '🐶', orange: '🐼', ragdoll: '🐱',
  capybara: '🦫', shiba: '🐶', frenchie: '🐶', lihua: '🐱',
  calico: '🐱', corgi: '🐶', british: '🐱', golden: '🐶',
  samoyed: '🐶', lop: '🐰', pomeranian: '🐶', siamese: '🐹',
};

// hover-intent 延迟（毫秒）——停留超过这个时间才自动翻面
const HOVER_FLIP_DELAY = 600;

export function renderLanding(container) {
  // 上下两行错开
  const rowTop = FEATURED_PETS.filter((_, i) => i % 2 === 0);
  const rowBottom = FEATURED_PETS.filter((_, i) => i % 2 === 1);

  container.innerHTML = `
    <div class="relative pt-20 md:pt-24 pb-6 md:pb-8 overflow-hidden min-h-screen flex flex-col">

      <!-- 透明层（让 body 的渐变背景透出来） -->
      <div id="leaf-drops-layer" class="absolute inset-0 pointer-events-none"></div>

      <!-- =============== 顶部：标题区 =============== -->
      <div class="relative z-0 px-6 md:px-10 mb-5 md:mb-6">
        <div class="max-w-6xl mx-auto text-center">

          <!-- 小标签（橄榄胶囊） -->
          <div class="flex justify-center mb-3 anim-in" style="animation-delay:0.05s">
            <span class="chip accent">
              <span class="dot-amber"></span>
              PAWTI · 小宠物试旅行
            </span>
          </div>

          <!-- 主标题 -->
          <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black anim-in text-paw-ink" style="animation-delay:0.15s">
            <span class="block">测测你是哪只</span>
            <span class="block mt-1 md:mt-2">
              <span class="text-paw-fern hand-underline">毛孩子</span>旅行人格
            </span>
          </h1>

          <!-- 副标题 -->
          <p class="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-paw-bark max-w-2xl mx-auto anim-in" style="animation-delay:0.3s">
            🐾 每只毛孩子都是一种旅行人格。翻到它们的背面，看看它们真实旅途里的样子。
          </p>
        </div>
      </div>

      <!-- =============== 中部：2 行错落横向无限滚动宠物墙 =============== -->
      <div class="relative z-20 flex-1 flex flex-col justify-center gap-0 md:gap-0 anim-in" style="animation-delay:0.4s">

        <!-- 上行：向左滚动 -->
        <div class="pet-marquee-row pet-marquee-row-left">
          <div class="pet-marquee-track">
            ${renderPetRow(rowTop)}
            ${renderPetRow(rowTop)}
          </div>
        </div>

        <!-- 下行：向右滚动，整体右移形成错落 -->
        <div class="pet-marquee-row pet-marquee-row-right">
          <div class="pet-marquee-track pet-marquee-offset">
            ${renderPetRow(rowBottom)}
            ${renderPetRow(rowBottom)}
          </div>
        </div>

      </div>

      <!-- =============== 底部：CTA 按钮（参考图：橄榄绿胶囊+爪印） =============== -->
      <div class="relative z-10 px-6 md:px-10 mt-5 md:mt-6 anim-in" style="animation-delay:0.55s">
        <div class="max-w-xl mx-auto flex flex-col items-center gap-2.5">
          <button id="start-quiz-btn"
            class="btn-paw pulse-ring text-base md:text-lg px-9 md:px-11 py-4">
            <span class="text-xl">🐾</span>
            <span>带它出发</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p class="text-xs md:text-sm text-paw-bark mt-1">
            悬停或点击卡片，先认识这些可能替你出门的小动物
          </p>
        </div>
      </div>

    </div>
  `;

  // ============ 全局 Portal 气泡（挂在 body 上，脱离 marquee 的 mask 裁切） ============
  // 原因：.pet-marquee-row 使用了 mask-image，会创建新的 stacking context 并隐式裁切内部元素，
  //      所以卡片内的气泡无论 z-index 多高都会被 mask 裁掉。解决办法：把气泡渲染到 <body> 下，
  //      通过 fixed 定位 + 实时跟随卡片 getBoundingClientRect 来避开所有祖先限制。
  let bubbleEl = document.querySelector('.pet-bubble-portal');
  if (!bubbleEl) {
    bubbleEl = document.createElement('div');
    bubbleEl.className = 'pet-bubble-portal';
    bubbleEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bubbleEl);
  }

  let bubbleTarget = null;  // 当前需要显示气泡的卡片 wrapper
  let bubbleRAF = null;

  const fillBubble = (wrapper) => {
    const name    = wrapper.dataset.name    || '';
    const emoji   = wrapper.dataset.emoji   || '🐾';
    const city    = wrapper.dataset.city    || '';
    bubbleEl.innerHTML = `
      <div class="pet-bubble-name">
        <span class="pet-bubble-emoji">${emoji}</span>
        <span>${name}</span>
      </div>
      ${city ? `<span class="pet-bubble-pin">${city}</span>` : ''}
    `;
  };

  const positionBubble = () => {
    if (!bubbleTarget) return;
    const rect = bubbleTarget.getBoundingClientRect();
    // 气泡宽高
    const bw = bubbleEl.offsetWidth;
    const bh = bubbleEl.offsetHeight;
    // 目标位置：卡片顶部上方 10px，水平居中于卡片
    let x = rect.left + rect.width / 2 - bw / 2;
    let y = rect.top - bh - 12;
    // 视口边界保护
    const pad = 6;
    const vw = window.innerWidth;
    if (x < pad) x = pad;
    if (x + bw > vw - pad) x = vw - pad - bw;
    if (y < pad) y = rect.bottom + 12; // 顶部放不下 → 改为卡片下方
    bubbleEl.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  const startFollow = () => {
    const tick = () => {
      positionBubble();
      bubbleRAF = requestAnimationFrame(tick);
    };
    if (bubbleRAF) cancelAnimationFrame(bubbleRAF);
    bubbleRAF = requestAnimationFrame(tick);
  };
  const stopFollow = () => {
    if (bubbleRAF) cancelAnimationFrame(bubbleRAF);
    bubbleRAF = null;
  };

  const showBubble = (wrapper) => {
    bubbleTarget = wrapper;
    fillBubble(wrapper);
    // 立即定位一次，再启动 rAF 循环跟随
    positionBubble();
    bubbleEl.classList.add('is-visible');
    startFollow();
  };

  const hideBubble = () => {
    bubbleTarget = null;
    bubbleEl.classList.remove('is-visible');
    stopFollow();
  };

  // ============ 交互逻辑：hover-intent 自动翻面 + 点击 toggle + 快门闪白 + Portal 气泡 ============
  container.querySelectorAll('.pet-card-wrapper').forEach(wrapper => {
    const card = wrapper.querySelector('.flip-card');
    if (!card) return;

    let hoverTimer = null;
    const ensureBackImage = () => {
      const image = card.querySelector('.pet-back-photo[data-src]');
      if (!image) return;
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    };

    // 触发翻面（附带快门闪白）
    const flipTo = (isFlipped) => {
      // 先触发闪白
      card.classList.remove('is-flashing');
      // 强制重排，确保动画可重放
      void card.offsetWidth;
      card.classList.add('is-flashing');
      setTimeout(() => card.classList.remove('is-flashing'), 600);

      if (isFlipped) {
        card.classList.add('flipped');
        card.classList.remove('hover-flip');
        wrapper.classList.add('is-flipped');
        hideBubble(); // 翻面时收起气泡
      } else {
        card.classList.remove('flipped');
        card.classList.remove('hover-flip');
        wrapper.classList.remove('is-flipped');
      }
    };

    // hover-intent：停留 600ms 后自动翻面（除非已经翻面）
    wrapper.addEventListener('mouseenter', () => {
      ensureBackImage();
      if (hoverTimer) clearTimeout(hoverTimer);
      // 未翻面状态下：显示气泡
      if (!card.classList.contains('flipped') && !card.classList.contains('hover-flip')) {
        showBubble(wrapper);
      }
      if (card.classList.contains('flipped')) return;
      hoverTimer = setTimeout(() => {
        // 再次确认：触发时鼠标仍在卡片上 & 仍未点击翻面
        if (wrapper.matches(':hover') && !card.classList.contains('flipped')) {
          // 闪白
          card.classList.remove('is-flashing');
          void card.offsetWidth;
          card.classList.add('is-flashing');
          setTimeout(() => card.classList.remove('is-flashing'), 600);
          card.classList.add('hover-flip');
          wrapper.classList.add('is-flipped');
          hideBubble(); // 翻面时收起气泡
        }
      }, HOVER_FLIP_DELAY);
    });

    wrapper.addEventListener('mouseleave', () => {
      if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
      hideBubble();
      // 离开时自动收回 hover-flip（不影响 .flipped 这种点击状态）
      card.classList.remove('hover-flip');
      // 若没有点击翻面状态，同步移除 is-flipped
      if (!card.classList.contains('flipped')) {
        wrapper.classList.remove('is-flipped');
      }
    });

    // 点击：toggle .flipped；同时附带快门闪白
    card.addEventListener('click', () => {
      ensureBackImage();
      flipTo(!card.classList.contains('flipped'));
    });
  });

  // 滚动/resize 时若气泡可见，立刻重新定位（rAF 本身也会跟，这里做一次立即响应）
  window.addEventListener('scroll', positionBubble, { passive: true });
  window.addEventListener('resize', positionBubble);

  // 飘落的爪印
  renderPawDrops(container.querySelector('#leaf-drops-layer'));
}

// ============ 单行宠物卡片 ============
// 正面：风格化插画贴纸 + 胶囊名牌；背面：真实旅行照 + 逐字弹跳中文名 + 玻璃条 tagline
// 气泡由全局 portal（挂在 <body> 上）动态渲染，卡片本身只通过 data-* 携带气泡信息
function renderPetRow(pets) {
  return pets.map(pet => {
    const emoji = PET_EMOJI[pet.id] || '🐾';
    // 把中文名拆为单字符 span（每个单字入场动画错峰）
    const nameSpans = Array.from(pet.chinese).map(ch => `<span>${ch}</span>`).join('');

    return `
    <div class="pet-card-wrapper flex-shrink-0"
         data-name="${pet.chinese}"
         data-emoji="${emoji}"
         data-city="${pet.city || ''}"
         data-tagline="${(pet.tagline || '').replace(/"/g, '&quot;')}">

      <div class="flip-card" data-pet-id="${pet.id}" style="--pet-accent:${pet.bgColor}">
        <div class="flip-card-inner">

          <!-- 正面：纯风格化插画贴纸 -->
          <div class="flip-card-face pet-card-front" style="background:${pet.bgColor}">
            <img
              src="${pet.illustrationUrl}"
              alt="${pet.chinese}"
              class="absolute inset-0 w-full h-full object-contain"
              loading="lazy"
              decoding="async"
              width="800"
              height="800"
              draggable="false"
            />
            <!-- 底部：白色胶囊名字标签 -->
            <div class="pet-name-tag">${pet.chinese}</div>
          </div>

          <!-- 背面：真实旅行照 · 色调叠加 · 大号中文名（逐字入场）· 玻璃条 tagline -->
          <div class="flip-card-face flip-card-back">
            <div class="relative w-full h-full overflow-hidden">
              <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" data-src="${pet.photoUrl}" alt="${pet.chinese}真实照片"
                class="pet-back-photo absolute inset-0 w-full h-full object-cover"
                loading="lazy" decoding="async" width="960" height="960" draggable="false"/>
              <!-- 彩色叠加（宠物主题色） -->
              <div class="pet-back-tint"></div>
              <!-- 底部深色渐变 -->
              <div class="pet-back-gradient"></div>

              <!-- 主内容区：名字（逐字 span） + 玻璃条 tagline -->
              <div class="pet-back-content">
                <div class="pet-back-name">${nameSpans}</div>
                <div class="pet-back-tagline">
                  <span>${pet.tagline}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- 快门闪白层（整张卡片覆盖，is-flashing 触发） -->
        <div class="flip-card-flash" aria-hidden="true"></div>
      </div>
    </div>
  `;
  }).join('');
}

// ============ 飘落的爪印 ============
function renderPawDrops(layer) {
  if (!layer) return;
  // 森系：4 种叶子 SVG 随机选用，飘落时缓慢旋转
  const leafSvgs = [
    // 1. 椭圆叶（柳叶）
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C7 2 3 7 3 13c0 5 4 9 9 9 0-5-1-9-3-12 2 1 4 3 6 7 1-9-3-15-3-15z"/>
    </svg>`,
    // 2. 心形叶（薄荷叶）
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c-1-3-5-5-7-9-1.5-3 0-7 3.5-7 1.8 0 3 1 3.5 2.5C12.5 7 13.7 6 15.5 6c3.5 0 5 4 3.5 7-2 4-6 6-7 9z"/>
    </svg>`,
    // 3. 三裂叶
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 5-3 8-7 9 4 1 7 4 7 9 0-5 3-8 7-9-4-1-7-4-7-9z"/>
    </svg>`,
    // 4. 蕨叶简化
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 20 C 8 14, 12 8, 20 4 L 20 6 C 13 10, 9 15, 5 21 Z"/>
    </svg>`,
  ];
  // 颜色池：参考图绘本风（深橄榄/棕墨/焦糖，半透明 · 去掉浅苔泛绿）
  const colorClasses = [
    'text-paw-forest/35',
    'text-paw-forest/25',
    'text-paw-bark/28',
    'text-paw-apricot/30',
  ];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div');
    el.innerHTML = leafSvgs[Math.floor(Math.random() * leafSvgs.length)];
    const colorCls = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    el.className = `leaf-drop absolute ${colorCls}`;
    el.style.left = Math.random() * 100 + '%';
    el.style.width = 14 + Math.random() * 22 + 'px';
    el.style.animationDuration = 11 + Math.random() * 12 + 's';
    el.style.animationDelay = Math.random() * 10 + 's';
    // 随机初始角度，让每片叶子姿态不一样
    el.style.setProperty('--leaf-tilt', (Math.random() * 60 - 30) + 'deg');
    frag.appendChild(el);
  }
  layer.appendChild(frag);
}
