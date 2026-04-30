// ============ 结果页模块（两步式） ============
// Step 1：宠物人格结果（插画 + 人格描述）
// Step 2：它去了哪里（城市高清图）+ 寄回的随手拍（左图右文）

import { FEATURED_PETS, CITY_IMAGES, PET_LETTERS } from './data/pets.js';

export function renderResult(container, result) {
  const { persona, topTags, matchPercent } = result;
  const pet = FEATURED_PETS.find(p => p.id === persona.petId) || FEATURED_PETS[0];

  renderStep1(container, persona, pet, topTags, matchPercent);
}

// ============ Step 1：宠物人格结果 ============
function renderStep1(container, persona, pet, topTags, matchPercent) {
  container.innerHTML = `
    <div class="min-h-screen py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">

      <!-- 背景柔光 -->
      <div class="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style="background: radial-gradient(circle, ${pet.bgColor}99 0%, transparent 65%);"></div>

      <div class="max-w-5xl mx-auto relative z-10">

        <!-- 顶部：结果标题 -->
        <div class="text-center mb-10 anim-in">
          <div class="text-xs tracking-[0.35em] text-paw-ink/50 mb-4 uppercase">你的旅行人格是</div>

          <!-- 大字代号 -->
          <div class="letter-drop font-serif text-7xl md:text-9xl font-black text-paw-rust tracking-tighter mb-4">
            ${persona.code.split('').map(l => `<span>${l}</span>`).join('')}
          </div>

          <!-- 中文人格名 -->
          <h2 class="font-serif text-3xl md:text-5xl font-bold mb-3 pop-in" style="animation-delay:0.6s">
            ${persona.chinese}
          </h2>
          <p class="text-base text-paw-ink/60 pop-in" style="animation-delay:0.7s">${persona.englishLine}</p>

          <!-- 匹配度 -->
          <div class="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-paw-rust/10 rounded-full pop-in" style="animation-delay:0.85s">
            <span class="w-2 h-2 rounded-full bg-paw-rust animate-pulse"></span>
            <span class="text-sm text-paw-rust font-medium">匹配度 ${matchPercent}%</span>
          </div>
        </div>

        <!-- 主卡片：左右布局 -->
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12">

          <!-- 左：宠物照片宝丽来 -->
          <div class="pop-in" style="animation-delay:1s">
            <div class="polaroid max-w-xs mx-auto" style="background:${pet.bgColor}">
              <img src="${pet.illustrationUrl}" alt="${pet.chinese}" class="rounded-lg" />
              <div class="text-center mt-3 text-sm text-paw-ink/70 font-medium">
                ${pet.chinese} · 正在代你出发 🐾
              </div>
            </div>
          </div>

          <!-- 右：人格描述 -->
          <div class="pop-in space-y-5" style="animation-delay:1.1s">
            <div>
              <div class="text-xs tracking-wider text-paw-ink/50 mb-2 uppercase">你是这样的旅人</div>
              <p class="font-serif text-xl md:text-2xl leading-relaxed">${persona.description}</p>
            </div>

            <div class="dashed-divider"></div>

            <div>
              <div class="text-xs tracking-wider text-paw-ink/50 mb-2">在动物界你最像 · <span class="text-paw-rust font-medium">${pet.chinese}</span></div>
              <p class="text-base md:text-lg text-paw-ink/80 leading-relaxed">${persona.petReason}</p>
            </div>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 pt-2">
              ${topTags.map(t => `<span class="chip accent">#${t}</span>`).join('')}
              ${pet.tags.map(t => `<span class="chip">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- 下一步按钮 -->
        <div class="flex flex-col items-center gap-4 pop-in" style="animation-delay:1.3s">
          <button id="next-step-btn"
            class="group relative px-10 py-4 bg-paw-ink text-paw-cream rounded-full text-lg font-semibold hover:bg-paw-rust transition-all pulse-ring flex items-center gap-3 shadow-xl">
            <span>🗺️ 看看它替你去了哪里</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p class="text-xs text-paw-ink/40">点击查看 ${pet.chinese} 在 ${pet.city} 的旅行足迹和来信</p>
        </div>

        <!-- 分享 -->
        <div class="mt-10 text-center pop-in" style="animation-delay:1.5s">
          <div class="text-xs text-paw-ink/40 mb-3">分享你的旅行人格</div>
          <div class="inline-flex gap-3">
            <button class="share-btn w-10 h-10 rounded-full bg-paw-ink/5 hover:bg-paw-rust hover:text-paw-cream transition-all flex items-center justify-center" data-platform="wechat">💬</button>
            <button class="share-btn w-10 h-10 rounded-full bg-paw-ink/5 hover:bg-paw-rust hover:text-paw-cream transition-all flex items-center justify-center" data-platform="weibo">🪶</button>
            <button class="share-btn w-10 h-10 rounded-full bg-paw-ink/5 hover:bg-paw-rust hover:text-paw-cream transition-all flex items-center justify-center" data-platform="xhs">📔</button>
          </div>
        </div>

      </div>
    </div>
  `;

  // 下一步
  container.querySelector('#next-step-btn').addEventListener('click', () => {
    renderStep2(container, persona, pet);
  });

  // 分享
  container.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = `我是「${persona.chinese}」（${persona.code}），我在动物界是一只${pet.chinese} 🐾 你呢？`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text + ' ' + location.href);
        showToast('已复制分享文案 ✓');
      }
    });
  });
}

// ============ Step 2：它去了哪里 + 寄回的随手拍 ============
function renderStep2(container, persona, pet) {
  const letter = PET_LETTERS[pet.id] || {
    city: pet.city,
    location: pet.location,
    date: '刚刚',
    content: `亲爱的主人：\n\n我在${pet.city}${pet.location}，一切都好。\n\n想你的${pet.chinese}敬上`,
    photoCaption: [`来自 ${pet.city}`, '想让你也看看'],
  };
  const cityImg = CITY_IMAGES[pet.city] || '';

  container.innerHTML = `
    <div class="min-h-screen py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">

      <!-- 背景柔光 -->
      <div class="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style="background: radial-gradient(circle, ${pet.bgColor}88 0%, transparent 65%);"></div>

      <div class="max-w-5xl mx-auto relative z-10">

        <!-- 顶部标题 -->
        <div class="text-center mb-10 anim-in">
          <div class="text-xs tracking-[0.35em] text-paw-ink/50 mb-3 uppercase">${pet.chinese} 的旅行足迹</div>
          <h2 class="font-serif text-3xl md:text-5xl font-bold">
            它替你去了<span class="text-paw-rust hand-underline">${pet.city}</span>
          </h2>
          <p class="mt-3 text-sm md:text-base text-paw-ink/60">
            📍 ${pet.location}
          </p>
        </div>

        <!-- ======= 板块 1：城市高清大图 ======= -->
        <div class="mb-14 anim-in" style="animation-delay:0.15s">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9]">
            ${cityImg ? `
              <img src="${cityImg}" alt="${pet.city}" class="absolute inset-0 w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-paw-ink/80 via-paw-ink/10 to-transparent"></div>
            ` : `<div class="absolute inset-0" style="background:${pet.bgColor}"></div>`}

            <!-- 左上：日期 -->
            <div class="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2">
              <span class="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-mono text-paw-ink/80 shadow-sm">
                ✈️ ${letter.date || '这个春天'}
              </span>
            </div>

            <!-- 右上：打卡章 -->
            <div class="absolute top-5 right-5 md:top-7 md:right-7">
              <div class="stamp-circle">
                <span>PAWTI</span>
                <span>✓ CHECK-IN</span>
              </div>
            </div>

            <!-- 底部：城市名 -->
            <div class="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-paw-cream">
              <div class="text-xs md:text-sm opacity-80 tracking-widest mb-2">WANDERPAW · CITY DIARY</div>
              <div class="flex items-end justify-between gap-3 flex-wrap">
                <div>
                  <h3 class="font-serif text-4xl md:text-6xl font-black leading-none">${pet.city}</h3>
                  <div class="mt-2 text-sm md:text-base opacity-90">📍 ${pet.location}</div>
                </div>
                <div class="text-right">
                  <div class="text-xs opacity-70">特派员</div>
                  <div class="font-serif text-lg md:text-xl font-bold">${pet.chinese} 🐾</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======= 板块 2：寄回的随手拍 · 左图右文 ======= -->
        <div class="mb-12 anim-in" style="animation-delay:0.3s">
          <div class="text-center mb-6">
            <div class="text-xs tracking-[0.3em] text-paw-ink/50 mb-2 uppercase">📮 从 ${pet.city} 寄来的</div>
            <h3 class="font-serif text-2xl md:text-3xl font-bold">${pet.chinese} 的随手拍 & 来信</h3>
          </div>

          <!-- 信件卡片：左图（自拍 + 配文叠加） 右文（手写信） · 窄屏自动变上下 -->
          <div class="letter-card grid md:grid-cols-[5fr_6fr] rounded-3xl overflow-hidden shadow-2xl bg-paw-cream/95 paper-texture border border-paw-ink/10">

            <!-- 左：宠物真实自拍 + 叠加文字（保留原图比例） -->
            <div class="relative w-full bg-paw-ink/5 md:min-h-[520px]">
              <img src="${pet.photoUrl}" alt="${pet.chinese}在${pet.city}的自拍"
                class="block w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover"/>
              <!-- 底部渐变 -->
              <div class="absolute inset-0 bg-gradient-to-t from-paw-ink/70 via-transparent to-transparent pointer-events-none"></div>

              <!-- 左上：胶片日期 -->
              <div class="absolute top-3 left-3">
                <span class="px-2 py-1 rounded bg-black/40 backdrop-blur text-[10px] font-mono text-paw-cream/90 tracking-wider">
                  ${letter.date}
                </span>
              </div>

              <!-- 右上：地点 pin -->
              <div class="absolute top-3 right-3">
                <span class="px-2 py-1 rounded bg-paw-rust/90 text-[10px] font-medium text-paw-cream tracking-wider">
                  📍 ${pet.location}
                </span>
              </div>

              <!-- 底部：图片配文（两行短句） -->
              <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-paw-cream">
                <div class="photo-caption">
                  <div class="font-serif text-lg md:text-2xl font-bold leading-tight">${letter.photoCaption[0]}</div>
                  <div class="font-serif text-lg md:text-2xl font-bold leading-tight mt-1">${letter.photoCaption[1]}</div>
                </div>
              </div>
            </div>

            <!-- 右：手写信 -->
            <div class="relative p-6 md:p-10 flex flex-col">
              <!-- 邮票装饰 -->
              <div class="absolute -top-4 right-5 md:right-10 bg-paw-rust text-paw-cream rounded-lg px-3 py-1 text-xs rotate-3 shadow-md font-mono">
                ✉️ ${pet.city}
              </div>

              <!-- 信头 -->
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-paw-ink/10">
                <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-paw-rust/30">
                  <img src="${pet.photoUrl}" alt="${pet.chinese}" class="w-full h-full object-cover"/>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-paw-ink">${pet.chinese}</div>
                  <div class="text-xs text-paw-ink/50">📍 ${pet.location}</div>
                </div>
              </div>

              <!-- 信件正文（保留换行） -->
              <div class="flex-1 font-serif text-[15px] md:text-base leading-[2] text-paw-ink whitespace-pre-line">
${letter.content}
              </div>

              <!-- 底部邮戳 -->
              <div class="mt-5 pt-4 border-t border-dashed border-paw-ink/15 flex items-center justify-between text-xs text-paw-ink/45 font-mono">
                <span>PAWTI · LETTER #01</span>
                <span>寄自 ${pet.city}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- 底部 CTA -->
        <div class="flex flex-col items-center gap-4 pop-in" style="animation-delay:0.5s">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
            <button id="retake-btn"
              class="px-6 py-4 rounded-full bg-paw-cream border-2 border-paw-ink text-paw-ink font-semibold hover:bg-paw-ink hover:text-paw-cream transition-all">
              🔁 再测一次
            </button>
            <button id="waitlist-btn"
              class="px-6 py-4 rounded-full bg-paw-ink text-paw-cream font-semibold hover:bg-paw-rust transition-all">
              🐾 加入等候名单
            </button>
          </div>
          <p class="text-xs text-paw-ink/40 text-center max-w-lg">
            PAWTI 即将上线 — 届时，${pet.chinese} 会真的代你出发，定期寄回照片和来信。
          </p>
        </div>

      </div>
    </div>
  `;

  // 按钮事件
  container.querySelector('#retake-btn').addEventListener('click', () => {
    location.reload();
  });
  container.querySelector('#waitlist-btn').addEventListener('click', () => {
    showToast(`感谢期待 🐾 ${pet.chinese} 正在为你打包出发…`);
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-paw-ink text-paw-cream px-5 py-3 rounded-full text-sm shadow-2xl';
  toast.textContent = msg;
  toast.style.animation = 'slideUp 0.3s both';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
