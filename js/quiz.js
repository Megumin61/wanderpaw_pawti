// ============ 答题页模块 ============
// 9 道题，每题一屏，用户选择后自动进入下一题
// 答完后调用评分函数并跳转到结果页
// v11：序章 + 四站式代理旅行进度 + 答后学习反馈

import { QUESTIONS, ACT_BREAKS, calculatePersona } from './data/quiz.js';

let userAnswers = new Array(QUESTIONS.length).fill(null);
let currentIdx = 0;
let onCompleteCallback = null;
let isShowingActBreak = false;
// 当前题目的"延迟跳转"定时器和处理函数（用于支持再次点击立即跳转）
let pendingAdvanceTimer = null;
let pendingAdvanceFn = null;

// 彩蛋文案池（随机抽取，不用每题的 feedbacks）—— 小宠物学习语境
const EASTER_EGGS = [
  { type: 'trait',  text: '它悄悄在本子上记了一笔。' },
  { type: 'trait',  text: '它好像更懂你的旅行节奏了。' },
  { type: 'trait',  text: '它的脚步正在慢慢成形。' },
  { type: 'trait',  text: '它把这个偏好收进了小背包。' },
  { type: 'letter', text: '它正在练习替你看世界。' },
  { type: 'letter', text: '它的第一封信，已经有一点语气了。' },
  { type: 'letter', text: '它轻轻晃了晃尾巴：收到。' },
];

export function renderQuiz(container, onComplete) {
  onCompleteCallback = onComplete;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  currentIdx = 0;
  isShowingActBreak = false;
  // 清空可能残留的延迟跳转任务
  if (pendingAdvanceTimer) { clearTimeout(pendingAdvanceTimer); pendingAdvanceTimer = null; }
  pendingAdvanceFn = null;

  const progressSlot = document.getElementById('quiz-progress-slot');
  if (progressSlot) {
    progressSlot.innerHTML = `
      <div id="quiz-progress">
        <div class="quiz-progress-meta mb-2">
          <div class="quiz-progress-count flex items-center gap-2">
            <span id="act-label" class="text-xs tracking-widest text-paw-ink font-mono uppercase font-bold">第一站</span>
            <span class="text-paw-bark/50 text-xs">·</span>
            <span class="font-mono text-sm text-paw-bark">
              <span id="q-current">01</span>
              <span class="opacity-60"> / ${String(QUESTIONS.length).padStart(2, '0')}</span>
            </span>
          </div>
          <div id="act-title-label" class="text-xs text-paw-bark tracking-widest font-medium">成都 · 刚落地</div>
        </div>
        <div id="progress-segments" class="flex gap-1.5">${renderProgressSegments(0)}</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="quiz-stage min-h-screen flex items-start justify-center px-4 md:px-6 relative">

      <div class="w-full max-w-5xl relative z-10">

        <!-- 题目内容容器 -->
        <div id="question-content"></div>

        <!-- 底部控制 -->
        <div id="quiz-bottom-controls" class="quiz-bottom-controls mt-7 flex items-center justify-between">
          <button id="prev-btn"
            class="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono text-paw-bark hover:text-paw-ink transition-all disabled:opacity-0 disabled:pointer-events-none"
            disabled>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            上一题
          </button>
          <span id="skip-hint" class="font-mono text-xs text-paw-bark/70">
            🐾 它会记住这次选择 · 再点一次立即继续
          </span>
        </div>

      </div>

    </div>

    <!-- 实验：桌边旅行便签（移动端会转为底部便签） -->
    <aside id="quiz-side-note" class="quiz-side-note" aria-live="polite" aria-hidden="true">
      <span class="quiz-side-note-kicker">旅行手帐</span>
      <span class="quiz-side-note-text"></span>
    </aside>
  `;

  // 检查第 0 题前是否有幕间卡
  const firstBreak = ACT_BREAKS.find(b => b.beforeQ === 0);
  if (firstBreak) {
    renderActBreak(container, firstBreak, () => {
      renderQuestion(container);
    });
  } else {
    renderQuestion(container);
  }

  container.querySelector('#prev-btn').addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      renderQuestion(container);
    }
  });
}

// ============ 四站进度条渲染 ============
function renderProgressSegments(currentQ) {
  const acts = ACT_BREAKS
    .map((act, idx) => {
      const next = ACT_BREAKS[idx + 1];
      return {
        label: act.segmentLabel || act.label,
        start: act.beforeQ,
        end: next ? next.beforeQ - 1 : QUESTIONS.length - 1,
      };
    })
    .filter(act => act.start < QUESTIONS.length);

  return acts.map(act => {
    const total = act.end - act.start + 1;
    const done = Math.max(0, Math.min(total, currentQ - act.start + 1));
    const pct = (done / total) * 100;
    const isPast = currentQ > act.end;

    return `
      <div class="flex-1 flex flex-col gap-1">
        <div class="h-2 bg-paw-mist rounded-full overflow-hidden border border-paw-bark/15">
          <div class="progress-track h-full rounded-full transition-all duration-500"
            style="width:${isPast ? 100 : pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ============ 幕间章节卡 ============
function renderActBreak(container, actBreak, onContinue) {
  isShowingActBreak = true;
  hideEasterEgg(container);
  const content = container.querySelector('#question-content');
  const prevBtn = container.querySelector('#prev-btn');
  const skipHint = container.querySelector('#skip-hint');
  const bottomControls = container.querySelector('#quiz-bottom-controls');
  if (prevBtn) prevBtn.style.opacity = '0';
  if (skipHint) skipHint.style.opacity = '0';
  if (bottomControls) bottomControls.classList.add('is-hidden');

  content.innerHTML = `
    <div class="act-break-card anim-in">
      <img class="act-break-image" src="${actBreak.image || ''}" alt="${actBreak.imageAlt || actBreak.title}" draggable="false" />
      <div class="act-break-scrim"></div>
      <div class="act-break-content">
        <div class="act-break-meta">
          <span class="act-break-label">${actBreak.label}</span>
          <span class="act-break-dot">·</span>
          <span class="act-break-title">${actBreak.title}</span>
        </div>
        <p class="act-break-quote">${actBreak.quote.replace(/\n+/g, '<br>')}</p>
        ${renderChapterLearning(actBreak)}
        <button class="act-break-btn" id="act-continue-btn">
          ${actBreak.cta || '继续旅程'}
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  content.querySelector('#act-continue-btn').addEventListener('click', () => {
    isShowingActBreak = false;
    if (prevBtn) prevBtn.style.opacity = '';
    if (skipHint) skipHint.style.opacity = '';
    if (bottomControls) bottomControls.classList.remove('is-hidden');
    onContinue();
    requestAnimationFrame(() => {
      document.getElementById('section-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderChapterLearning(actBreak) {
  const breakIdx = ACT_BREAKS.indexOf(actBreak);
  if (breakIdx <= 0) {
    return `
      <div class="chapter-learning chapter-learning-empty">
        <span class="chapter-learning-label">这一程，它会学着</span>
        <span class="chapter-learning-summary">替你选择，也替你记住。</span>
      </div>
    `;
  }

  const start = ACT_BREAKS[breakIdx - 1].beforeQ;
  const end = actBreak.beforeQ - 1;
  const notes = [];
  for (let qIdx = start; qIdx <= end; qIdx++) {
    const answerIdx = userAnswers[qIdx];
    const optionText = QUESTIONS[qIdx]?.options?.[answerIdx]?.text;
    if (optionText) notes.push(String(optionText).replace(/[“”]/g, ''));
  }

  if (!notes.length) return '';
  return `
    <div class="chapter-learning">
      <span class="chapter-learning-label">上一站，它记住了</span>
      <div class="chapter-learning-tags">
        ${notes.map(note => `<span>${note}</span>`).join('')}
      </div>
    </div>
  `;
}

// ============ 题目渲染 ============
function renderQuestion(container) {
  // 进入新一题，清空可能残留的延迟跳转任务
  if (pendingAdvanceTimer) { clearTimeout(pendingAdvanceTimer); pendingAdvanceTimer = null; }
  pendingAdvanceFn = null;

  const q = QUESTIONS[currentIdx];
  const content = container.querySelector('#question-content');
  const progressSlot = document.getElementById('quiz-progress-slot');

  // 更新进度
  progressSlot.querySelector('#q-current').textContent = String(currentIdx + 1).padStart(2, '0');
  container.querySelector('#prev-btn').disabled = currentIdx === 0;

  // 更新 3 段进度条
  const segContainer = progressSlot.querySelector('#progress-segments');
  if (segContainer) segContainer.innerHTML = renderProgressSegments(currentIdx);

  // 更新幕标签
  const actLabel = progressSlot.querySelector('#act-label');
  const actTitleLabel = progressSlot.querySelector('#act-title-label');
  if (actLabel) actLabel.textContent = q.stationLabel || '';
  if (actTitleLabel) actTitleLabel.textContent = q.stationTitle || '';

  content.innerHTML = `
    <div class="quiz-question-shell anim-in ${q.sceneImage?.src ? 'has-scene-image' : 'no-scene-image'}" key="${currentIdx}">

      <div class="quiz-scene-card">
        ${renderSceneImage(q)}
        ${q.scene ? `<p class="quiz-scene">${formatQuizText(q.scene)}</p>` : ''}
        <div id="scene-feedback-bubble" class="scene-feedback-bubble" aria-live="polite">
          <span class="scene-feedback-paw">🐾</span>
          <span>收到，这一笔我记下了。</span>
        </div>
      </div>

      <!-- 核心问句（加粗） -->
      <h2 class="quiz-question">
        ${formatQuizText(q.q)}
      </h2>

      <!-- 选项（参考图2：未选中=米杏卡片+空心圆+厚硬阴影；选中=橄榄绿底+白字+右上角🐾） -->
      <div class="quiz-options-grid">
        ${q.options.map((opt, idx) => `
          <button
            class="option-card w-full text-left px-5 md:px-6 py-4 md:py-5 rounded-2xl flex items-center gap-4 group ${userAnswers[currentIdx] === idx ? 'selected' : ''}"
            data-option-idx="${idx}"
          >
            <div class="option-dot flex-shrink-0 ${userAnswers[currentIdx] === idx ? 'active' : ''}"></div>
            <div class="option-content flex-1">
              <div class="option-text text-base md:text-lg leading-relaxed text-paw-ink font-medium">
                ${formatQuizText(opt.text)}
              </div>
              <div class="option-inline-feedback" aria-live="polite">
                <span>🐾</span>
                <span class="option-inline-feedback-text"></span>
              </div>
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  const sceneImage = content.querySelector('.quiz-scene-image img');
  if (sceneImage) {
    const revealScene = () => sceneImage.classList.add('is-loaded');
    if (sceneImage.complete) revealScene();
    else sceneImage.addEventListener('load', revealScene, { once: true });
  }
  preloadNextScene(currentIdx);

  // 选项点击
  content.querySelectorAll('.option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const optIdx = parseInt(btn.dataset.optionIdx);

      // 如果当前已有"待跳转"任务（用户刚选过），再次点击 → 立即跳转
      if (pendingAdvanceFn) {
        clearTimeout(pendingAdvanceTimer);
        pendingAdvanceTimer = null;
        const fn = pendingAdvanceFn;
        pendingAdvanceFn = null;
        // 如果用户改选了别的选项，更新答案并刷新视觉
        if (userAnswers[currentIdx] !== optIdx) {
          userAnswers[currentIdx] = optIdx;
          content.querySelectorAll('.option-card').forEach(b => {
            b.classList.remove('selected');
            b.querySelector('.option-dot')?.classList.remove('active');
          });
          btn.classList.add('selected');
          btn.querySelector('.option-dot')?.classList.add('active');
        }
        fn();
        return;
      }

      userAnswers[currentIdx] = optIdx;

      // 视觉反馈
      content.querySelectorAll('.option-card').forEach(b => {
        b.classList.remove('selected');
        b.querySelector('.option-dot')?.classList.remove('active');
      });
      btn.classList.add('selected');
      btn.querySelector('.option-dot')?.classList.add('active');

      // 同时显示五种实验反馈，便于比较筛选
      showEasterEgg(container, currentIdx, optIdx);

      // 真正的"跳转下一题/出结果"逻辑，封装为函数（再次点击可提前调用）
      const advance = () => {
        hideEasterEgg(container);

        const nextIdx = currentIdx + 1;

        if (nextIdx < QUESTIONS.length) {
          // 检查下一题前是否有幕间卡
          const nextBreak = ACT_BREAKS.find(b => b.beforeQ === nextIdx);
          currentIdx = nextIdx;

          if (nextBreak) {
            renderActBreak(container, nextBreak, () => {
              renderQuestion(container);
            });
          } else {
            renderQuestion(container);
          }

          // 滚动到 quiz 顶部
          const quizSection = document.getElementById('section-quiz');
          if (quizSection) {
            quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // 最后一题 → 计算结果
          hideEasterEgg(container);
          const result = calculatePersona(userAnswers);
          if (onCompleteCallback) onCompleteCallback(result);
        }
      };

      // 延时自动进入下一题：中心提示更大，停留稍久一点方便读完
      pendingAdvanceFn = advance;
      pendingAdvanceTimer = setTimeout(() => {
        pendingAdvanceTimer = null;
        // 防御：执行时再次确认 fn 还是当前任务
        if (pendingAdvanceFn === advance) {
          pendingAdvanceFn = null;
          advance();
        }
      }, 1800);
    });
  });
}

function formatQuizText(text) {
  return String(text).replace(/[“”]/g, '').replace(/\n+/g, '<br>');
}

function renderSceneImage(q) {
  const image = q.sceneImage;
  if (!image?.src) return '';

  return `
    <figure class="quiz-scene-image" data-placement="${image.placement || 'scene-before-question'}">
      <img src="${image.src}" alt="${image.alt || q.stationTitle || 'PAWTI 场景图'}" loading="eager" fetchpriority="high" decoding="async" draggable="false" />
    </figure>
  `;
}

function preloadNextScene(qIdx) {
  const nextSrc = QUESTIONS[qIdx + 1]?.sceneImage?.src;
  if (!nextSrc) return;
  const preload = new Image();
  preload.decoding = 'async';
  preload.src = nextSrc;
}

// ============ 彩蛋浮层 ============
function showEasterEgg(container, qIdx, optIdx) {
  const q = QUESTIONS[qIdx];
  let text = '';

  if (q.feedbacks && q.feedbacks[optIdx]) {
    text = q.feedbacks[optIdx];
  } else {
    const egg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
    text = egg.text;
  }

  const selected = container.querySelector(`.option-card[data-option-idx="${optIdx}"]`);
  container.querySelectorAll('.option-card').forEach(card => card.classList.remove('has-feedback'));
  if (selected) {
    const inlineText = selected.querySelector('.option-inline-feedback-text');
    if (inlineText) inlineText.textContent = text;
    selected.classList.add('has-feedback');
  }

  const bubble = container.querySelector('#scene-feedback-bubble');
  if (bubble) bubble.classList.add('is-visible');

  const sideNote = container.querySelector('#quiz-side-note');
  if (sideNote) {
    const noteText = sideNote.querySelector('.quiz-side-note-text');
    if (noteText) noteText.textContent = text;
    sideNote.classList.add('is-visible');
    sideNote.setAttribute('aria-hidden', 'false');
  }
}

function hideEasterEgg(container) {
  container.querySelectorAll('.option-card.has-feedback').forEach(card => card.classList.remove('has-feedback'));
  container.querySelector('#scene-feedback-bubble')?.classList.remove('is-visible');
  const sideNote = container.querySelector('#quiz-side-note');
  if (sideNote) {
    sideNote.classList.remove('is-visible');
    sideNote.setAttribute('aria-hidden', 'true');
  }
}
