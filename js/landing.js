// ============ Landing 页（首屏紧凑 · 2 行错落横向滚动宠物墙） ============
// 16 只毛孩子 = 16 种旅行人格。
//   · 正面：风格化贴纸插画（PET_ILLUSTRATIONS）
//   · 翻过来的背面：这只毛孩子的真实旅行照片 + 中文名 + tagline
//   · 正面不再显示城市标签

import { FEATURED_PETS } from './data/pets.js';

export function renderLanding(container) {
  // 上下两行错开
  const rowTop = FEATURED_PETS.filter((_, i) => i % 2 === 0);
  const rowBottom = FEATURED_PETS.filter((_, i) => i % 2 === 1);

  container.innerHTML = `
    <div class="relative pt-20 md:pt-24 pb-6 md:pb-8 overflow-hidden min-h-screen flex flex-col">

      <!-- 背景装饰 -->
      <div class="absolute top-0 right-0 w-72 h-72 md:w-[480px] md:h-[480px] bg-paw-peach/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-20 left-10 w-40 h-40 md:w-60 md:h-60 bg-paw-blush/40 rounded-full blur-3xl pointer-events-none"></div>
      <div id="paw-drops-layer" class="absolute inset-0 pointer-events-none"></div>

      <!-- =============== 顶部：标题区 =============== -->
      <div class="relative z-10 px-6 md:px-10 mb-5 md:mb-6">
        <div class="max-w-6xl mx-auto text-center">

          <!-- 小标签 -->
          <div class="flex justify-center mb-3 anim-in" style="animation-delay:0.05s">
            <span class="chip accent">
              <span class="w-2 h-2 rounded-full bg-paw-rust animate-pulse"></span>
              PAWTI · 旅行人格测试
            </span>
          </div>

          <!-- 主标题 -->
          <h1 class="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black anim-in" style="animation-delay:0.15s">
            <span class="block">测测你是哪只</span>
            <span class="block mt-1 md:mt-2">
              <span class="text-paw-rust hand-underline">毛孩子</span>旅行人格
            </span>
          </h1>

          <!-- 副标题 -->
          <p class="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-paw-ink/65 max-w-2xl mx-auto anim-in" style="animation-delay:0.3s">
            每只毛孩子都是一种旅行人格。翻到它们的背面，看看它们真实旅途里的样子。
          </p>
        </div>
      </div>

      <!-- =============== 中部：2 行错落横向无限滚动宠物墙 =============== -->
      <div class="relative z-10 flex-1 flex flex-col justify-center gap-3 md:gap-4 anim-in" style="animation-delay:0.4s">

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

      <!-- =============== 底部：CTA 按钮 =============== -->
      <div class="relative z-10 px-6 md:px-10 mt-5 md:mt-6 anim-in" style="animation-delay:0.55s">
        <div class="max-w-xl mx-auto flex flex-col items-center gap-2.5">
          <button id="start-quiz-btn"
            class="group relative px-8 md:px-10 py-3.5 md:py-4 bg-paw-ink text-paw-cream rounded-full text-base md:text-lg font-semibold hover:bg-paw-rust transition-all pulse-ring flex items-center gap-3 shadow-xl">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C10 2 8 4 8 6.5S10 11 12 11s4-2 4-4.5S14 2 12 2zM5 8c-1.5 0-3 1.5-3 3.5S3.5 15 5 15s3-1.5 3-3.5S6.5 8 5 8zm14 0c-1.5 0-3 1.5-3 3.5s1.5 3.5 3 3.5 3-1.5 3-3.5-1.5-3.5-3-3.5zM12 13c-3.5 0-7 2.5-7 6 0 2 1.5 3 3 3h8c1.5 0 3-1 3-3 0-3.5-3.5-6-7-6z"/>
            </svg>
            <span>开始 PAWTI 测试</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p class="text-xs md:text-sm text-paw-ink/50 mt-1">
            👆 鼠标悬停或点击卡片翻面，看它在旅途里的真实照片
          </p>
        </div>
      </div>

    </div>
  `;

  // 卡片翻转事件（点击）
  container.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // 飘落的爪印
  renderPawDrops(container.querySelector('#paw-drops-layer'));
}

// ============ 单行宠物卡片 ============
// 正面：风格化插画贴纸（干净，不加任何标签）
// 背面：真实旅行照片 + 中文名 + tagline（无城市）
function renderPetRow(pets) {
  return pets.map(pet => `
    <div class="pet-card-wrapper flex-shrink-0">
      <div class="flip-card" data-pet-id="${pet.id}">
        <div class="flip-card-inner">

          <!-- 正面：纯风格化插画贴纸（图片完全铺满，无白边） + 底部中文名标签 -->
          <div class="flip-card-face pet-card-front shadow-md" style="background:${pet.bgColor}">
            <img
              src="${pet.illustrationUrl}"
              alt="${pet.chinese}"
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
            <!-- 底部：白色胶囊名字标签 -->
            <div class="pet-name-tag">${pet.chinese}</div>
          </div>

          <!-- 背面：真实旅行照片 + 暗化遮罩 + 中文名 + tagline -->
          <div class="flip-card-face flip-card-back">
            <div class="relative w-full h-full">
              <img src="${pet.photoUrl}" alt="${pet.chinese}真实照片"
                class="absolute inset-0 w-full h-full object-cover"
                loading="lazy" draggable="false"/>
              <div class="absolute inset-0 bg-gradient-to-t from-paw-ink/92 via-paw-ink/45 to-transparent"></div>
              <div class="absolute inset-0 flex flex-col justify-end p-3 text-paw-cream">
                <div class="font-serif text-base font-bold mb-0.5 leading-tight">${pet.chinese}</div>
                <div class="text-[11px] opacity-90 leading-snug line-clamp-2">${pet.tagline}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `).join('');
}

// ============ 飘落的爪印 ============
function renderPawDrops(layer) {
  if (!layer) return;
  const pawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10 2 8 4 8 6.5S10 11 12 11s4-2 4-4.5S14 2 12 2zM5 8c-1.5 0-3 1.5-3 3.5S3.5 15 5 15s3-1.5 3-3.5S6.5 8 5 8zm14 0c-1.5 0-3 1.5-3 3.5s1.5 3.5 3 3.5 3-1.5 3-3.5-1.5-3.5-3-3.5zM12 13c-3.5 0-7 2.5-7 6 0 2 1.5 3 3 3h8c1.5 0 3-1 3-3 0-3.5-3.5-6-7-6z"/>
  </svg>`;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.innerHTML = pawSvg;
    el.className = 'paw-drop absolute text-paw-rust/15';
    el.style.left = Math.random() * 100 + '%';
    el.style.width = 16 + Math.random() * 18 + 'px';
    el.style.animationDuration = 9 + Math.random() * 10 + 's';
    el.style.animationDelay = Math.random() * 8 + 's';
    frag.appendChild(el);
  }
  layer.appendChild(frag);
}