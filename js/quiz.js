// ============ 答题页模块 ============
// 12 道题，每题一屏，用户选择后自动进入下一题
// 答完后调用评分函数并跳转到结果页
// 新增：幕间章节卡 + 答后彩蛋浮层 + 4 段进度条 + 题干两段式

import { QUESTIONS, ACT_BREAKS, calculatePersona } from './data/quiz.js';

let userAnswers = new Array(QUESTIONS.length).fill(null);
let currentIdx = 0;
let onCompleteCallback = null;
let isShowingActBreak = false;

// 彩蛋文案池（随机抽取，不用每题的 feedbacks）—— 森系语境
const EASTER_EGGS = [
  { type: 'stat',   text: '和你做了同样选择的人，比你想象的多。' },
  { type: 'stat',   text: '只有 12% 的人会这样选。' },
  { type: 'trait',  text: '检测到特质：林间感 +1' },
  { type: 'trait',  text: '检测到特质：松弛度 +1' },
  { type: 'trait',  text: '检测到特质：草木气 +1' },
  { type: 'trait',  text: '检测到特质：独处力 +1' },
  { type: 'trait',  text: '检测到特质：晨雾度 +1' },
  { type: 'letter', text: '你的毛孩子正穿过林子，朝你走来…' },
  { type: 'letter', text: '它已经把背包放在树下了。' },
  { type: 'letter', text: '它说：这个答案，我猜到了。' },
];

export function renderQuiz(container, onComplete) {
  onCompleteCallback = onComplete;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  currentIdx = 0;
  isShowingActBreak = false;

  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center px-6 py-24 md:py-28 relative">

      <div class="w-full max-w-3xl relative z-10">

        <!-- 顶部进度区 -->
        <div class="mb-10" id="quiz-progress">
          <!-- 卷标 + 题号 -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span id="act-label" class="text-xs tracking-widest text-paw-ink font-mono uppercase font-bold">卷一</span>
              <span class="text-paw-bark/50 text-xs">·</span>
              <span class="font-mono text-sm text-paw-bark">
                <span id="q-current">01</span>
                <span class="opacity-60"> / ${String(QUESTIONS.length).padStart(2, '0')}</span>
              </span>
            </div>
            <div id="act-title-label" class="text-xs text-paw-bark tracking-widest font-medium">如果有一身毛</div>
          </div>
          <!-- 4 段进度条 -->
          <div id="progress-segments" class="flex gap-1.5">
            ${renderProgressSegments(0)}
          </div>
        </div>

        <!-- 题目内容容器 -->
        <div id="question-content"></div>

        <!-- 底部控制 -->
        <div class="mt-12 flex items-center justify-between">
          <button id="prev-btn"
            class="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono text-paw-bark hover:text-paw-ink transition-all disabled:opacity-0 disabled:pointer-events-none"
            disabled>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            上一题
          </button>
          <span id="skip-hint" class="font-mono text-xs text-paw-bark/70">
            🐾 选择后自动跳转下一题
          </span>
        </div>

      </div>

    </div>

    <!-- 答后彩蛋浮层（单例，挂在 quiz 容器内） -->
    <div id="quiz-easter-egg" class="easter-egg-overlay" aria-hidden="true"></div>
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

// ============ 4 段进度条渲染 ============
function renderProgressSegments(currentQ) {
  // 4 幕的题目范围（16 题 = 4 卷 × 每卷 4 题）
  const acts = [
    { label: '卷一', start: 0,  end: 3  },
    { label: '卷二', start: 4,  end: 7  },
    { label: '卷三', start: 8,  end: 11 },
    { label: '卷四', start: 12, end: 15 },
  ];

  return acts.map(act => {
    const total = act.end - act.start + 1;
    const done = Math.max(0, Math.min(total, currentQ - act.start));
    const pct = (done / total) * 100;
    const isActive = currentQ >= act.start && currentQ <= act.end;
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
  const content = container.querySelector('#question-content');
  const prevBtn = container.querySelector('#prev-btn');
  const skipHint = container.querySelector('#skip-hint');
  if (prevBtn) prevBtn.style.opacity = '0';
  if (skipHint) skipHint.style.opacity = '0';

  content.innerHTML = `
    <div class="act-break-card anim-in">
      <div class="act-break-icon">${actBreak.icon}</div>
      <div class="act-break-meta">
        <span class="act-break-label">${actBreak.label}</span>
        <span class="act-break-dot">·</span>
        <span class="act-break-title">${actBreak.title}</span>
      </div>
      <p class="act-break-quote">${actBreak.quote.replace(/\n/g, '<br>')}</p>
      <button class="act-break-btn" id="act-continue-btn">
        继续旅程
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;

  content.querySelector('#act-continue-btn').addEventListener('click', () => {
    isShowingActBreak = false;
    if (prevBtn) prevBtn.style.opacity = '';
    if (skipHint) skipHint.style.opacity = '';
    onContinue();
  });
}

// ============ 题目渲染 ============
function renderQuestion(container) {
  const q = QUESTIONS[currentIdx];
  const content = container.querySelector('#question-content');

  // 更新进度
  container.querySelector('#q-current').textContent = String(currentIdx + 1).padStart(2, '0');
  container.querySelector('#prev-btn').disabled = currentIdx === 0;

  // 更新 4 段进度条
  const segContainer = container.querySelector('#progress-segments');
  if (segContainer) segContainer.innerHTML = renderProgressSegments(currentIdx);

  // 更新幕标签
  const actBreak = [...ACT_BREAKS].reverse().find(b => b.beforeQ <= currentIdx);
  if (actBreak) {
    const actLabel = container.querySelector('#act-label');
    const actTitleLabel = container.querySelector('#act-title-label');
    if (actLabel) actLabel.textContent = actBreak.label;
    if (actTitleLabel) actTitleLabel.textContent = actBreak.title;
  }

  content.innerHTML = `
    <div class="anim-in" key="${currentIdx}">

      <!-- 场景前情（灰色小字，营造画面感） -->
      ${q.scene ? `
        <p class="quiz-scene">${q.scene}</p>
      ` : ''}

      <!-- 核心问句（加粗） -->
      <h2 class="quiz-question">
        ${q.q}
      </h2>

      <!-- 选项（参考图2：未选中=米杏卡片+空心圆+厚硬阴影；选中=橄榄绿底+白字+右上角🐾） -->
      <div class="space-y-4 md:space-y-5">
        ${q.options.map((opt, idx) => `
          <button
            class="option-card w-full text-left px-5 md:px-6 py-4 md:py-5 rounded-2xl flex items-center gap-4 group ${userAnswers[currentIdx] === idx ? 'selected' : ''}"
            data-option-idx="${idx}"
          >
            <div class="option-dot flex-shrink-0 ${userAnswers[currentIdx] === idx ? 'active' : ''}"></div>
            <div class="option-text flex-1 text-base md:text-lg leading-relaxed text-paw-ink font-medium">
              ${opt.text}
            </div>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // 选项点击
  content.querySelectorAll('.option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const optIdx = parseInt(btn.dataset.optionIdx);
      userAnswers[currentIdx] = optIdx;

      // 视觉反馈
      content.querySelectorAll('.option-card').forEach(b => {
        b.classList.remove('selected');
        b.querySelector('.option-dot')?.classList.remove('active');
      });
      btn.classList.add('selected');
      btn.querySelector('.option-dot')?.classList.add('active');

      // 显示彩蛋
      showEasterEgg(container, currentIdx, optIdx);

      // 延时自动进入下一题
      setTimeout(() => {
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
          const result = calculatePersona(userAnswers);
          if (onCompleteCallback) onCompleteCallback(result);
        }
      }, 1400);
    });
  });
}

// ============ 彩蛋浮层 ============
function showEasterEgg(container, qIdx, optIdx) {
  const overlay = container.querySelector('#quiz-easter-egg');
  if (!overlay) return;

  // 优先用题目自带的 feedback，否则随机抽彩蛋
  const q = QUESTIONS[qIdx];
  let text = '';
  let type = 'letter';

  if (q.feedbacks && q.feedbacks[optIdx]) {
    text = q.feedbacks[optIdx];
    type = 'letter';
  } else {
    const egg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
    text = egg.text;
    type = egg.type;
  }

  overlay.innerHTML = `
    <div class="easter-egg-inner easter-egg-${type}">
      <span class="easter-egg-icon">${type === 'stat' ? '📊' : type === 'trait' ? '🌿' : '🍃'}</span>
      <span class="easter-egg-text">${text}</span>
    </div>
  `;
  overlay.classList.add('is-visible');
}

function hideEasterEgg(container) {
  const overlay = container.querySelector('#quiz-easter-egg');
  if (overlay) overlay.classList.remove('is-visible');
}