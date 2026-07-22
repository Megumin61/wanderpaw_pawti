// ============ 结果页模块（两步式） ============
// Step 1：宠物人格结果（插画 + 人格描述）
// Step 2：它去了哪里（城市高清图）+ 寄回的随手拍（左图右文）
// 特殊：迷路宠格 ?????（isMystery=true）走单页彩蛋分支

import { FEATURED_PETS, PET_CITY_IMAGES, PET_LETTERS } from './data/pets.js?v=21';

const PAWTI_SITE_URL = 'https://wanderpaw.cn/';
const RESULT_MEDIA_VERSION = '21';
const PAWTI_SITE_QR = '/generated/share/pawti-site-qr.svg';
const WAITLIST_GROUP_QR = '/generated/waitlist/wanderpaw-group-3-v2.jpg';

export function renderResult(container, result) {
  const { persona, topTags, matchPercent, isMystery } = result;

  // 迷路宠格：彩蛋款单页结果
  if (isMystery || persona.isMystery) {
    renderMystery(container, persona, topTags, result);
    return;
  }

  const pet = FEATURED_PETS.find(p => p.id === persona.petId) || FEATURED_PETS[0];
  const insight = result.insight || buildProxyInsight(persona, pet);
  warmResultMedia(result);
  renderStep1(container, persona, pet, topTags, matchPercent, insight, result.isShared);
}

function buildProxyInsight(persona, pet) {
  return {
    proxyLine: `它会沿着${persona.primaryTags.slice(0, 2).join('与')}，替你找到真正想停下来的地方。`,
    letterLine: `它会从${pet.city}寄回一封很像你的信，把沿途最舍不得忘记的片段留好。`,
  };
}

function getPetCityImage(pet) {
  return PET_CITY_IMAGES[pet?.id] || '';
}

// ============ 彩蛋款：迷路宠格 ????? ============
function renderMystery(container, persona, topTags, result) {
  // 用户分布最高的几只"接近宠格"，给一种"我们差点抓住你"的感觉
  const sorted = Object.entries(result.scores || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  container.innerHTML = `
    <div class="min-h-screen py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">
      <div class="max-w-3xl mx-auto relative z-10 text-center">

        <!-- 章戳 -->
        <div class="mb-6 anim-in">
          <span class="stamp-badge" style="border-color:#7C6B47; color:#7C6B47;">PAWTI · UNCATCHABLE</span>
        </div>

        <!-- 大问号视觉 -->
        <div class="pop-in mb-6" style="animation-delay:0.2s">
          <div class="mystery-orb">
            <span class="mystery-q">?</span>
            <span class="mystery-q mystery-q-2">?</span>
            <span class="mystery-q mystery-q-3">?</span>
          </div>
        </div>

        <!-- 主文案 -->
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight text-paw-ink pop-in" style="animation-delay:0.4s">
          恭喜你<br/>
          你是最未曾捕捉无法拥有的<br/>
          <span class="text-paw-forest">「?????」</span>
        </h2>

        <p class="font-hand text-2xl md:text-3xl text-paw-forest pop-in mb-8" style="animation-delay:0.55s">
          "我们差点就抓住你了。"
        </p>

        <!-- 描述卡 -->
        <div class="bg-paw-cream/95 border-2 border-paw-forest/30 rounded-3xl p-6 md:p-8 text-left pop-in paper-texture" style="animation-delay:0.7s; box-shadow:6px 6px 0 #E3CE99;">
          <p class="font-serif text-base md:text-lg leading-loose text-paw-ink whitespace-pre-line">
我们预设的所有 PAWTI，没有一只能完全装下你。

这不是坏事。
世界上最有意思的旅行者，往往最难被归类。

你身上同时存在几个相反的部分——
有那么一刻像哈士奇，有那么一刻像英短，
有那么一刻像三花，又有那么一刻像狸花猫。

所以，没有一只小的，能完全替你出发。

——你只能自己去。
          </p>

          ${sorted.length > 0 ? `
            <div class="mt-6 pt-5 border-t border-dashed border-paw-forest/30">
              <div class="text-xs tracking-widest text-paw-bark mb-3 uppercase">差点就是 · ALMOST</div>
              <div class="flex flex-wrap gap-2">
                ${sorted.map(([name, score]) => `
                  <span class="chip">${name} · ${score}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- CTA -->
        <div class="result-cta pop-in" style="animation-delay:0.9s">
          <div class="result-primary-actions">
            <button id="waitlist-btn" class="btn-paw">
              <span>🐾</span>
              <span>加入等候名单</span>
            </button>
            <button id="share-result-btn" class="btn-paw-secondary">
              <span>↗</span>
              <span>分享结果</span>
            </button>
          </div>
          <button id="retake-btn" class="result-retake-btn">再测一次</button>
          <p class="result-launch-note">
            WanderPaw 即将上线 iOS 商店 — 也许我们会为你这种最难被归类的旅人，专门做一只。
          </p>
        </div>

      </div>
    </div>
  `;

  container.querySelector('#retake-btn').addEventListener('click', startNewQuiz);
  const waitlistButton = container.querySelector('#waitlist-btn');
  const shareButton = container.querySelector('#share-result-btn');
  const fallbackPet = FEATURED_PETS[0];
  preloadOnIntent(waitlistButton, WAITLIST_GROUP_QR);
  preloadOnIntent(shareButton, getStaticPoster({ pet: fallbackPet }).previewUrl);
  waitlistButton.addEventListener('click', () => {
    openWaitlistDialog();
  });
  shareButton.addEventListener('click', () => {
    openShareDialog({
      persona,
      pet: fallbackPet,
      letter: {
        content: '世界上最有意思的旅行者，往往最难被归类。\n这一次，只能由你亲自出发。',
      },
      cityImg: getPetCityImage(fallbackPet),
      isMystery: true,
    });
  });
}

// ============ Step 1：宠物人格结果 ============
function renderStep1(container, persona, pet, topTags, matchPercent, insight, isShared = false) {
  container.innerHTML = `
    <div class="result-step result-step-one min-h-screen py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">

        <div class="max-w-5xl mx-auto relative z-10">

        ${isShared ? `
          <div class="shared-result-notice anim-in">
            <span>朋友分享给你的旅行档案</span>
            <strong>看完它的旅程，也测测哪只毛孩子最像你</strong>
          </div>
        ` : ''}

        <!-- 顶部：结果标题 -->
        <div class="result-hero text-center mb-10 anim-in">
          <!-- 章戳：手帐红色 PAWTI RESULT -->
          <div class="mb-5">
            <span class="stamp-badge">PAWTI · RESULT</span>
          </div>
          <div class="text-xs tracking-[0.35em] text-paw-bark mb-5 uppercase font-semibold">🐾 你的旅行人格是</div>

          <!-- 中文人格名（宠物视角 · 主视觉） -->
          <h2 class="result-persona-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight pop-in text-paw-ink px-4" style="animation-delay:0.4s">
            「${persona.chinese}」
          </h2>

          <!-- 金句标语（手写体引号风） -->
          <p class="result-persona-tagline font-hand text-2xl md:text-3xl text-paw-forest pop-in" style="animation-delay:0.55s">
            "${persona.tagline}"
          </p>

          <!-- 匹配度（手帐胶带风胶囊 · 牛皮纸黄硬阴影） -->
          <div class="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-paw-peach rounded-full pop-in" style="animation-delay:0.85s; transform:rotate(-1.5deg); box-shadow:3px 3px 0 #E3CE99;">
            <span class="dot-amber"></span>
            <span class="text-sm text-paw-ink font-bold tracking-wide font-mono">MATCH ${matchPercent}%</span>
          </div>
        </div>

        <!-- 主卡片：左右布局 -->
        <div class="result-summary-grid grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12">

          <!-- 左：宠物照片宝丽来 -->
          <div class="pop-in" style="animation-delay:1s">
            <div class="result-polaroid polaroid max-w-xs mx-auto" style="background:${pet.bgColor}">
              <img src="${resultMediaUrl(pet.illustrationUrl)}" data-pawti-image alt="${pet.chinese}" class="rounded-lg"
                loading="eager" fetchpriority="high" decoding="async" width="800" height="800" />
              <div class="text-center mt-3 text-sm text-paw-ink/70 font-medium">
                🐾 ${pet.chinese} · 正在代你穿过林子
              </div>
            </div>
          </div>

          <!-- 右：人格描述 -->
          <div class="result-persona-copy pop-in space-y-5" style="animation-delay:1.1s">
            <div>
              <div class="text-xs tracking-wider text-paw-bark mb-2 uppercase font-semibold">你是这样的旅人</div>
              <p class="result-persona-description font-serif text-xl md:text-2xl leading-relaxed text-paw-ink">${persona.description}</p>
            </div>

            <div class="proxy-insight-card">
              <div class="proxy-insight-head">
                <span class="proxy-insight-code">PAWTI / PROXY</span>
                <span class="proxy-insight-kicker">代理旅行画像</span>
              </div>
              <h3 class="proxy-insight-title">它会怎样替你旅行</h3>
              <div class="proxy-insight-divider"></div>
              <div class="proxy-insight-details">
                <div>
                  <span>沿途</span>
                  <p>${insight.proxyLine}</p>
                </div>
                <div>
                  <span>来信</span>
                  <p>${insight.letterLine}</p>
                </div>
              </div>
            </div>

            <div class="dashed-divider"></div>

            <div>
              <div class="text-xs tracking-wider text-paw-bark mb-2 font-semibold">在动物界你最像 · <span class="text-paw-berry font-bold">${pet.chinese}</span></div>
              <p class="text-base md:text-lg text-paw-ink/80 leading-relaxed">${persona.petReason}</p>
            </div>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 pt-2">
              ${topTags.map(t => `<span class="chip accent">#${t}</span>`).join('')}
              ${pet.tags.map(t => `<span class="chip">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- 下一步按钮（统一 btn-paw） -->
        <div class="flex flex-col items-center gap-4 pop-in" style="animation-delay:1.3s">
          <button id="next-step-btn" class="btn-paw pulse-ring text-base md:text-lg px-9 py-4">
            <span class="text-xl">🐾</span>
            <span>看看它替你去了哪里</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          ${isShared ? `<button id="shared-retake-btn" class="result-retake-btn">我也测一次</button>` : ''}
          <p class="text-xs text-paw-bark">点击查看 ${pet.chinese} 在 ${pet.city} 的旅行足迹和来信</p>
        </div>

      </div>
    </div>
  `;

  bindResilientImages(container);

  // 下一步
  const nextStepButton = container.querySelector('#next-step-btn');
  preloadOnIntent(nextStepButton, getPetCityImage(pet));
  nextStepButton.addEventListener('click', () => {
    renderStep2(container, persona, pet);
  });
  container.querySelector('#shared-retake-btn')?.addEventListener('click', startNewQuiz);

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
  const cityImg = getPetCityImage(pet);

  container.innerHTML = `
    <div class="result-step result-step-two min-h-screen py-24 md:py-28 px-6 md:px-10 relative overflow-hidden">

      <div class="max-w-5xl mx-auto relative z-10">

        <!-- 顶部标题 -->
        <div class="text-center mb-10 anim-in">
          <div class="text-xs tracking-[0.35em] text-paw-bark mb-3 uppercase font-semibold">🐾 ${pet.chinese} 的旅行足迹</div>
          <h2 class="font-serif text-3xl md:text-5xl font-bold text-paw-ink">
            它替你去了<span class="text-paw-ink hand-underline">${pet.city}</span>
          </h2>
          <p class="mt-3 text-sm md:text-base text-paw-bark">
            📍 ${pet.location}
          </p>
        </div>

        <!-- ======= 板块 1：城市高清大图 ======= -->
        <div class="mb-14 anim-in" style="animation-delay:0.15s">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[21/9]">
            ${cityImg ? `
              <img src="${resultMediaUrl(cityImg)}" data-pawti-image alt="${pet.city}" class="absolute inset-0 w-full h-full object-cover"
                loading="eager" fetchpriority="high" decoding="async" />
              <div class="absolute inset-0 bg-gradient-to-t from-paw-ink/80 via-paw-ink/10 to-transparent"></div>
            ` : `<div class="absolute inset-0" style="background:${pet.bgColor}"></div>`}

            <!-- 左上：日期 -->
            <div class="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2">
              <span class="px-3 py-1.5 rounded-full bg-paw-fog text-xs font-mono text-paw-ink font-bold shadow-[0_2px_0_rgba(107,84,54,0.3)]">
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
                  <div class="font-serif text-lg md:text-xl font-bold">${pet.chinese} 🌿</div>
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
          <!-- 注：外层 pt-5 给顶部邮戳留出空间，内层 inner-card 才是真正的卡片视觉容器 -->
          <div class="letter-card relative pt-5">

            <!-- 顶部邮戳（手帐红章戳） · 提到 letter-card 顶层，避免被内层 overflow-hidden 裁切 -->
            <div class="absolute top-0 right-6 md:right-12 z-20 bg-paw-berry text-paw-cream rounded-md px-3 py-1 text-xs rotate-3 shadow-[0_2px_0_rgba(58,46,34,0.4)] font-mono tracking-wider">
              🐾 ${pet.city}
            </div>

            <div class="grid md:grid-cols-[5fr_6fr] rounded-3xl overflow-hidden shadow-2xl bg-paw-cream/95 paper-texture border border-paw-ink/10">

            <!-- 左：宠物在城市里的旅行场景照 + 叠加文字（保留原图比例） -->
            <div class="relative w-full bg-paw-ink/5 md:min-h-[520px]">
              <img src="${resultMediaUrl(pet.travelPhotoUrl || pet.photoUrl)}" data-pawti-image alt="${pet.chinese}在${pet.city}的旅行照"
                class="block w-full h-auto md:absolute md:inset-0 md:w-full md:h-full md:object-cover"
                loading="lazy" fetchpriority="low" decoding="async"/>
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
                <span class="px-2 py-1 rounded bg-paw-bark text-[10px] font-medium text-paw-cream tracking-wider shadow-[0_2px_0_rgba(58,46,34,0.5)]">
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
              <!-- 信头 -->
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-dashed border-paw-bark/30">
                <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-paw-bark/45">
                  <img src="${resultMediaUrl(pet.travelPhotoUrl || pet.photoUrl)}" data-pawti-image alt="${pet.chinese}" class="w-full h-full object-cover"
                    loading="lazy" fetchpriority="low" decoding="async" width="40" height="40"/>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm text-paw-ink">${pet.chinese}</div>
                  <div class="text-xs text-paw-bark">📍 ${pet.location}</div>
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

            </div><!-- /inner-grid -->
          </div>
        </div>

        <!-- 底部 CTA -->
        <div class="result-cta pop-in" style="animation-delay:0.5s">
          <div class="result-primary-actions">
            <button id="waitlist-btn" class="btn-paw">
              <span>🐾</span>
              <span>加入等候名单</span>
            </button>
            <button id="share-result-btn" class="btn-paw-secondary">
              <span>↗</span>
              <span>分享结果</span>
            </button>
          </div>
          <button id="retake-btn" class="result-retake-btn">再测一次</button>
          <p class="result-launch-note">
            WanderPaw 即将上线 iOS 商店 — 届时，${pet.chinese} 会真的代你出发，定期寄回照片和来信。
          </p>
        </div>

      </div>
    </div>
  `;

  bindResilientImages(container);

  // 按钮事件
  container.querySelector('#retake-btn').addEventListener('click', startNewQuiz);
  const waitlistButton = container.querySelector('#waitlist-btn');
  const shareButton = container.querySelector('#share-result-btn');
  preloadOnIntent(waitlistButton, WAITLIST_GROUP_QR);
  preloadOnIntent(shareButton, getStaticPoster({ pet }).previewUrl);
  waitlistButton.addEventListener('click', () => {
    openWaitlistDialog();
  });
  shareButton.addEventListener('click', () => {
    openShareDialog({ persona, pet, letter, cityImg });
  });
}

function openWaitlistDialog() {
  closeResultDialog();
  const dialog = document.createElement('div');
  dialog.id = 'result-dialog';
  dialog.className = 'result-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '加入 WanderPaw 等候名单');
  dialog.innerHTML = `
    <div class="result-dialog-backdrop" data-close-dialog></div>
    <section class="waitlist-dialog-panel">
      <button class="result-dialog-close" data-close-dialog aria-label="关闭">×</button>
      <div class="result-dialog-kicker">WANDERPAW · WAITING LIST</div>
      <h2>先来群里等它出发</h2>
      <p>扫描二维码加入 WanderPaw 用户群，获取产品进度、内测资格与 iOS 上线通知。</p>
      <div class="waitlist-qr-frame">
        <img src="${WAITLIST_GROUP_QR}" alt="WanderPaw 用户群二维码" loading="eager" fetchpriority="high" decoding="async" />
      </div>
      <div class="waitlist-dialog-note">二维码更新时，我们也会同步替换这里的入口。</div>
    </section>
  `;
  mountResultDialog(dialog);
}

async function openShareDialog(data) {
  closeResultDialog();
  const poster = getStaticPoster(data);
  const dialog = document.createElement('div');
  dialog.id = 'result-dialog';
  dialog.className = 'result-dialog share-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', '分享我的旅行结果');
  dialog.innerHTML = `
    <div class="result-dialog-backdrop" data-close-dialog></div>
    <section class="share-dialog-panel">
      <button class="result-dialog-close" data-close-dialog aria-label="关闭">×</button>
      <header class="share-dialog-header">
        <div>
          <div class="result-dialog-kicker">MY WANDERPAW DIARY</div>
          <h2>分享我的旅行档案</h2>
        </div>
        <p>向下滑动预览完整长图：旅行人格、匹配宠物、目的地、来信和网站二维码都已装订好。</p>
      </header>
      <div class="share-dialog-body">
        <div class="share-poster-frame">
          <img
            id="share-poster"
            src="${poster.previewUrl}"
            width="720"
            alt="${data.pet.chinese}的 WanderPaw 旅行人格长图"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <div class="share-poster-loading">正在打开旅行档案…</div>
        </div>
        <aside class="share-actions" aria-label="长图操作">
          <button class="share-save-button" data-save-poster>
            <span>保存长图</span><small>下载高清版本</small>
          </button>
          <button class="share-copy-button" data-share-link>
            <span>复制文字链接</span><small>文案和结果链接一并复制</small>
          </button>
        </aside>
      </div>
    </section>
  `;
  mountResultDialog(dialog);

  const image = dialog.querySelector('#share-poster');
  const loading = dialog.querySelector('.share-poster-loading');
  const revealPoster = () => loading.remove();
  if (image.complete && image.naturalWidth > 0) revealPoster();
  else image.addEventListener('load', revealPoster, { once: true });
  image.addEventListener('error', () => {
    loading.textContent = '旅行档案加载失败，请检查网络后重试';
  }, { once: true });

  dialog.querySelector('[data-save-poster]').addEventListener('click', () => saveStaticPoster(poster, data));
  const copyShareButton = dialog.querySelector('[data-share-link]');
  copyShareButton.addEventListener('click', async () => {
    try {
      await copyResultTextAndLink(data);
      const label = copyShareButton.querySelector('span');
      label.textContent = '已复制 ✓';
      window.setTimeout(() => {
        if (copyShareButton.isConnected) label.textContent = '复制文字链接';
      }, 1400);
    } catch (error) {
      console.error('PAWTI share copy:', error);
      showToast('复制失败，请稍后再试');
    }
  });
}

function getStaticPoster(data) {
  const id = data?.pet?.id || 'capybara';
  const base = `/generated/share/posters/v3/${id}`;
  return {
    // v3 poster assets are served with an immutable one-year cache. Keep the
    // query version in sync with result media so regenerated posters replace
    // previously cached versions immediately after deployment.
    previewUrl: `${base}-preview.webp?v=${RESULT_MEDIA_VERSION}`,
    downloadUrl: `${base}.jpg?v=${RESULT_MEDIA_VERSION}`,
  };
}

async function getPosterBlob(poster) {
  const response = await fetch(poster.downloadUrl, { cache: 'force-cache' });
  if (!response.ok) throw new Error(`Poster request failed: ${response.status}`);
  return response.blob();
}

function posterFilename(data) {
  return `WanderPaw-${data.persona.code || 'PAWTI'}-${data.pet.city || '旅行档案'}.jpg`;
}

async function saveStaticPoster(poster, data) {
  try {
    const blob = await getPosterBlob(poster);
    downloadBlob(blob, posterFilename(data));
    showToast('高清旅行档案已保存 ✓');
  } catch (error) {
    console.error('PAWTI poster download:', error);
    window.open(poster.downloadUrl, '_blank', 'noopener');
    showToast('已打开高清长图，请长按保存');
  }
}

function mountResultDialog(dialog) {
  document.body.appendChild(dialog);
  document.body.classList.add('result-dialog-open');
  requestAnimationFrame(() => dialog.classList.add('is-visible'));
  dialog.querySelectorAll('[data-close-dialog]').forEach(button => {
    button.addEventListener('click', closeResultDialog);
  });
  const onKeydown = event => {
    if (event.key === 'Escape') {
      closeResultDialog();
      document.removeEventListener('keydown', onKeydown);
    }
  };
  document.addEventListener('keydown', onKeydown);
}

function closeResultDialog() {
  const dialog = document.getElementById('result-dialog');
  if (dialog) dialog.remove();
  document.body.classList.remove('result-dialog-open');
}

async function drawSharePoster(canvas, data) {
  const { persona, pet, letter, cityImg, isMystery } = data;
  const ctx = canvas.getContext('2d');
  const heroSrc = isMystery
    ? (cityImg || pet.photoUrl)
    : (cityImg || pet.photoUrl || pet.illustrationUrl);
  const [hero, petPortrait, qrImage] = await Promise.all([
    loadCanvasImage(heroSrc),
    loadCanvasImage(pet.illustrationUrl || pet.photoUrl),
    loadCanvasImage(PAWTI_SITE_QR),
  ]);

  ctx.fillStyle = '#FFF8EA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPosterDots(ctx, canvas.width, canvas.height);

  ctx.fillStyle = '#3D4A2A';
  ctx.font = '700 34px "Noto Sans SC", "Microsoft YaHei", sans-serif';
  ctx.fillText('WanderPaw', 78, 90);
  ctx.fillStyle = '#7C6B47';
  ctx.font = '600 18px "DM Mono", monospace';
  ctx.fillText('PAWTI · PROXY TRAVEL DIARY', 78, 126);

  ctx.fillStyle = '#687949';
  roundCanvasRect(ctx, 78, 168, 250, 46, 23);
  ctx.fill();
  ctx.fillStyle = '#FFFAF0';
  ctx.font = '700 20px "Noto Sans SC", sans-serif';
  ctx.fillText('我的旅行人格', 106, 198);

  ctx.fillStyle = '#3D4A2A';
  ctx.font = '900 56px "Noto Serif SC", "Songti SC", serif';
  const personaTitle = isMystery ? '无法被归类的旅行者' : persona.chinese;
  fitCanvasText(ctx, `「${personaTitle}」`, 78, 272, 920, 56);

  ctx.save();
  roundCanvasRect(ctx, 78, 326, 924, 566, 38);
  ctx.clip();
  drawImageCover(ctx, hero, 78, 326, 924, 566);
  const gradient = ctx.createLinearGradient(0, 540, 0, 892);
  gradient.addColorStop(0, 'rgba(30,38,25,0)');
  gradient.addColorStop(1, 'rgba(30,38,25,0.8)');
  ctx.fillStyle = gradient;
  ctx.fillRect(78, 326, 924, 566);
  ctx.restore();

  ctx.fillStyle = '#FFFAF0';
  ctx.font = '800 38px "Noto Sans SC", sans-serif';
  ctx.fillText(isMystery ? '这一次，只能由你亲自出发' : `${pet.chinese} · 前往 ${pet.city}`, 116, 816);
  ctx.font = '500 24px "Noto Sans SC", sans-serif';
  ctx.fillText(isMystery ? 'PAWTI 暂时没有抓住你' : `📍 ${pet.location}`, 116, 858);

  ctx.fillStyle = '#FBF1DC';
  roundCanvasRect(ctx, 78, 930, 924, 244, 30);
  ctx.fill();
  ctx.strokeStyle = 'rgba(104,121,73,0.28)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (petPortrait) {
    ctx.save();
    roundCanvasRect(ctx, 112, 970, 164, 164, 26);
    ctx.clip();
    drawImageCover(ctx, petPortrait, 112, 970, 164, 164);
    ctx.restore();
  }
  ctx.fillStyle = '#7C6B47';
  ctx.font = '700 18px "DM Mono", monospace';
  ctx.fillText('TRAVEL PARTNER', 312, 982);
  ctx.fillStyle = '#3D4A2A';
  ctx.font = '900 38px "Noto Serif SC", serif';
  ctx.fillText(isMystery ? '?????' : pet.chinese, 312, 1036);
  ctx.font = '600 24px "Noto Sans SC", sans-serif';
  wrapCanvasText(ctx, persona.tagline || persona.description, 312, 1080, 624, 36, 2);

  ctx.fillStyle = '#687949';
  roundCanvasRect(ctx, 78, 1212, 924, 386, 32);
  ctx.fill();
  ctx.fillStyle = '#FFFAF0';
  ctx.font = '700 20px "DM Mono", monospace';
  ctx.fillText(isMystery ? 'A NOTE FOR YOU' : `LETTER FROM ${String(pet.city).toUpperCase()}`, 116, 1262);
  ctx.font = '900 34px "Noto Serif SC", serif';
  ctx.fillText(isMystery ? '写给无法被归类的你' : `从 ${pet.city} 寄来的第一封信`, 116, 1312);
  ctx.fillStyle = 'rgba(255,250,240,0.9)';
  ctx.font = '500 25px "Noto Serif SC", serif';
  const letterText = String(letter.content || '').replace(/\n{2,}/g, '\n').trim();
  wrapCanvasText(ctx, letterText, 116, 1368, 848, 42, 5);

  ctx.fillStyle = '#3D4A2A';
  ctx.font = '800 26px "Noto Sans SC", sans-serif';
  ctx.fillText('测测哪只小宠物会替你去旅行', 78, 1680);
  ctx.fillStyle = '#7C6B47';
  ctx.font = '500 20px "Noto Sans SC", sans-serif';
  ctx.fillText('扫描二维码，领取你的 PAWTI', 78, 1720);
  ctx.font = '500 15px "DM Mono", monospace';
  ctx.fillText('wanderpaw.cn', 78, 1754);

  ctx.fillStyle = '#FFFAF0';
  roundCanvasRect(ctx, 772, 1632, 230, 230, 24);
  ctx.fill();
  if (qrImage) ctx.drawImage(qrImage, 789, 1649, 196, 196);

  ctx.fillStyle = '#A68B5B';
  ctx.font = '600 17px "DM Mono", monospace';
  ctx.fillText('WANDERPAW · COMING SOON TO THE iOS APP STORE', 78, 1852);
}

function resultMediaUrl(src) {
  if (!src) return '';
  const siteRoot = new URL('/', window.location.href);
  const url = new URL(src, siteRoot);
  if (url.origin === window.location.origin && (
    url.pathname.startsWith('/generated/pets/') ||
    url.pathname.startsWith('/generated/cities/')
  )) {
    url.searchParams.set('v', RESULT_MEDIA_VERSION);
  }
  return url.href;
}

function bindResilientImages(root) {
  root.querySelectorAll('img[data-pawti-image]').forEach(image => {
    image.classList.add('pawti-image-loading');
    const frame = image.parentElement;

    const reveal = () => {
      image.classList.remove('pawti-image-loading', 'pawti-image-error');
      image.classList.add('pawti-image-ready');
      frame?.classList.add('pawti-image-frame-ready');
      frame?.classList.remove('pawti-image-frame-error');
    };

    const retry = () => {
      if (!image.dataset.retryAttempted) {
        image.dataset.retryAttempted = 'true';
        const retryUrl = new URL(image.currentSrc || image.src, window.location.href);
        retryUrl.searchParams.set('retry', Date.now().toString(36));
        image.src = retryUrl.href;
        return;
      }
      image.classList.remove('pawti-image-loading');
      image.classList.add('pawti-image-error');
      frame?.classList.add('pawti-image-frame-error');
    };

    image.addEventListener('load', reveal);
    image.addEventListener('error', retry);
    if (image.complete) {
      if (image.naturalWidth > 0) reveal();
      else retry();
    }
  });
}

function loadCanvasImage(src, timeoutMs = 4000) {
  return new Promise(resolve => {
    if (!src) return resolve(null);
    const image = new Image();
    image.decoding = 'async';
    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    image.onload = () => finish(image);
    image.onerror = () => finish(null);
    image.src = resultMediaUrl(src);
  });
}

function warmResultMedia(result) {
  const persona = result?.persona;
  const pet = FEATURED_PETS.find(item => item.id === persona?.petId) || FEATURED_PETS[0];
  const critical = new Image();
  critical.decoding = 'async';
  critical.fetchPriority = 'high';
  critical.src = resultMediaUrl(pet.illustrationUrl);

  const warmDeferred = () => {
    const sources = [getPetCityImage(pet), pet.travelPhotoUrl || pet.photoUrl].filter(Boolean);
    [...new Set(sources)].forEach(src => {
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = 'low';
      image.src = resultMediaUrl(src);
    });
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(warmDeferred, { timeout: 1000 });
  else window.setTimeout(warmDeferred, 180);
}

function preloadOnIntent(element, src, priority = 'high') {
  if (!element || !src) return;
  let started = false;
  const preload = () => {
    if (started) return;
    started = true;
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = priority;
    image.src = resultMediaUrl(src);
  };
  element.addEventListener('pointerenter', preload, { once: true, passive: true });
  element.addEventListener('focus', preload, { once: true, passive: true });
  element.addEventListener('touchstart', preload, { once: true, passive: true });
}

function drawImageCover(ctx, image, x, y, width, height) {
  if (!image) return;
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  const sourceX = (image.naturalWidth - sourceWidth) / 2;
  const sourceY = (image.naturalHeight - sourceHeight) / 2;
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function roundCanvasRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const paragraphs = String(text).split('\n');
  const lines = [];
  paragraphs.forEach((paragraph, paragraphIndex) => {
    let line = '';
    Array.from(paragraph).forEach(char => {
      const testLine = line + char;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = testLine;
      }
    });
    if (line) lines.push(line);
    if (paragraphIndex < paragraphs.length - 1) lines.push('');
  });
  const visibleLines = lines.slice(0, maxLines);
  if (lines.length > maxLines && visibleLines.length) {
    visibleLines[visibleLines.length - 1] = visibleLines[visibleLines.length - 1].replace(/[，。！？、\s]*$/, '') + '…';
  }
  visibleLines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
}

function fitCanvasText(ctx, text, x, y, maxWidth, startSize) {
  let size = startSize;
  while (size > 30) {
    ctx.font = `900 ${size}px "Noto Serif SC", "Songti SC", serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  ctx.fillText(text, x, y);
}

function drawPosterDots(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = 'rgba(166,139,91,0.14)';
  for (let y = 24; y < height; y += 34) {
    for (let x = 24; x < width; x += 34) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('无法生成分享图片')), 'image/png', 0.94);
  });
}

async function sharePoster(canvas, data) {
  const blob = await canvasToBlob(canvas);
  const filename = `WanderPaw-${data.persona.code || 'PAWTI'}-${data.pet.city || '旅行档案'}.png`;
  const file = new File([blob], filename, { type: 'image/png' });
  const shareData = {
    title: '我的 WanderPaw 旅行档案',
    text: buildShareText(data),
    files: [file],
  };

  if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  downloadBlob(blob, filename);
  await copyText(buildShareText(data));
  showToast('长图已保存，分享文案也已复制 ✓');
}

async function savePoster(canvas, data) {
  const blob = await canvasToBlob(canvas);
  const filename = `WanderPaw-${data.persona.code || 'PAWTI'}-${data.pet.city || '旅行档案'}.png`;
  downloadBlob(blob, filename);
  showToast('旅行档案长图已生成 ✓');
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function copyShareText(data) {
  await copyText(buildShareText(data));
  showToast('分享文案已复制 ✓');
}

async function copyResultTextAndLink(data) {
  await copyText(buildShareText(data));
  showToast('分享文案和结果链接已复制 ✓');
}

function openWechatShareGuide(url) {
  const guide = document.createElement('div');
  guide.className = 'wechat-share-guide';
  guide.setAttribute('role', 'dialog');
  guide.setAttribute('aria-modal', 'true');
  guide.setAttribute('aria-label', '微信分享提示');
  guide.innerHTML = `
    <div class="wechat-share-guide-arrow">↗</div>
    <div class="wechat-share-guide-card">
      <div class="result-dialog-kicker">WECHAT SHARE</div>
      <h2>点击右上角 <strong>···</strong></h2>
      <p>选择“发送给朋友”或“分享到朋友圈”。朋友打开后会直接看到这份旅行人格。</p>
      <small>结果链接已复制：${url}</small>
      <button type="button" data-close-wechat-guide>知道了</button>
    </div>
  `;

  document.body.appendChild(guide);
  document.body.classList.add('result-dialog-open');
  guide.querySelector('[data-close-wechat-guide]').addEventListener('click', () => {
    guide.remove();
    document.body.classList.remove('result-dialog-open');
  });
}

function getResultShareUrl(data) {
  if (data?.isMystery) return PAWTI_SITE_URL;
  const petId = data?.pet?.id;
  return petId ? new URL(`r/${encodeURIComponent(petId)}/`, PAWTI_SITE_URL).href : PAWTI_SITE_URL;
}

function buildShareText(data) {
  const siteUrl = getResultShareUrl(data);
  if (data.isMystery) {
    return `我的 PAWTI 是「无法被归类的旅行者」——这一次，只能由我亲自出发。你也来测测：${siteUrl}`;
  }
  return `我的旅行人格是「${data.persona.chinese}」，匹配到${data.pet.chinese}，它替我去了${data.pet.city}。你的小宠物会去哪里？${siteUrl}`;
}

function startNewQuiz() {
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname);
  const target = isLocal ? new URL('/?start=1', location.origin).href : new URL('?start=1', PAWTI_SITE_URL).href;
  location.href = target;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // 部分微信/安卓 WebView 暴露了 clipboard API，但会拒绝写入；继续使用兼容方案。
    }
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Clipboard write failed');
}

function showToast(msg) {
  document.getElementById('pawti-toast')?.remove();
  const toast = document.createElement('div');
  toast.id = 'pawti-toast';
  toast.className = 'pawti-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
