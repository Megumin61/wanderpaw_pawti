// ============ 答题页模块 ============
// 12 道题，每题一屏，用户选择后自动进入下一题
// 答完后调用评分函数并跳转到结果页

import { QUESTIONS, calculatePersona } from './data/quiz.js';

let userAnswers = new Array(QUESTIONS.length).fill(null);
let currentIdx = 0;
let onCompleteCallback = null;

export function renderQuiz(container, onComplete) {
  onCompleteCallback = onComplete;
  userAnswers = new Array(QUESTIONS.length).fill(null);
  currentIdx = 0;

  container.innerHTML = `
    <div class="min-h-screen flex items-center justify-center px-6 py-24 md:py-28 relative">

      <!-- 背景装饰：左右的大号模糊色块 -->
      <div class="absolute top-20 -left-20 w-96 h-96 bg-paw-peach/40 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-20 -right-20 w-96 h-96 bg-paw-blush/30 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-3xl relative z-10">

        <!-- 顶部进度区 -->
        <div class="mb-10">
          <div class="flex items-center justify-between mb-3">
            <div class="font-mono text-sm text-paw-ink/60">
              <span id="q-current">01</span>
              <span class="opacity-40"> / ${String(QUESTIONS.length).padStart(2, '0')}</span>
            </div>
            <div class="text-xs text-paw-ink/50 tracking-widest">旅行人格测试</div>
          </div>
          <!-- 进度条 -->
          <div class="h-1.5 bg-paw-ink/10 rounded-full overflow-hidden">
            <div id="progress-bar" class="progress-track h-full rounded-full" style="width:0%"></div>
          </div>
        </div>

        <!-- 题目内容容器（会被替换） -->
        <div id="question-content"></div>

        <!-- 底部控制 -->
        <div class="mt-12 flex items-center justify-between">
          <button id="prev-btn"
            class="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono text-paw-ink/60 hover:text-paw-ink transition-all disabled:opacity-0 disabled:pointer-events-none"
            disabled>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            上一题
          </button>
          <span id="skip-hint" class="font-mono text-xs text-paw-ink/40">
            选择后自动跳转下一题
          </span>
        </div>

      </div>

    </div>
  `;

  renderQuestion(container);

  container.querySelector('#prev-btn').addEventListener('click', () => {
    if (currentIdx > 0) {
      currentIdx--;
      renderQuestion(container);
    }
  });
}

function renderQuestion(container) {
  const q = QUESTIONS[currentIdx];
  const content = container.querySelector('#question-content');
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  container.querySelector('#q-current').textContent = String(currentIdx + 1).padStart(2, '0');
  container.querySelector('#progress-bar').style.width = progress + '%';
  container.querySelector('#prev-btn').disabled = currentIdx === 0;

  content.innerHTML = `
    <div class="anim-in" key="${currentIdx}">
      <!-- 题号小装饰 -->
      <div class="text-xs text-paw-rust tracking-[0.3em] mb-3">
        第 ${String(currentIdx + 1).padStart(2, '0')} 题
      </div>

      <!-- 题目 -->
      <h2 class="font-serif text-2xl md:text-4xl font-bold leading-tight mb-8 md:mb-10">
        ${q.q}
      </h2>

      <!-- 选项 -->
      <div class="space-y-3 md:space-y-4">
        ${q.options.map((opt, idx) => `
          <button
            class="option-card w-full text-left px-5 md:px-6 py-4 md:py-5 rounded-2xl bg-paw-cream/70 backdrop-blur flex items-start gap-4 group ${userAnswers[currentIdx] === idx ? 'selected' : ''}"
            data-option-idx="${idx}"
          >
            <div class="flex-shrink-0 w-8 h-8 rounded-full border-2 border-paw-ink/20 flex items-center justify-center font-mono text-sm font-bold transition-all group-hover:border-paw-rust group-hover:bg-paw-rust group-hover:text-paw-cream ${userAnswers[currentIdx] === idx ? 'border-paw-rust bg-paw-rust text-paw-cream' : ''}">
              ${String.fromCharCode(65 + idx)}
            </div>
            <div class="flex-1 text-base md:text-lg leading-relaxed text-paw-ink pt-1">
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
      content.querySelectorAll('.option-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // 延时自动进入下一题
      setTimeout(() => {
        if (currentIdx < QUESTIONS.length - 1) {
          currentIdx++;
          renderQuestion(container);
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
      }, 400);
    });
  });
}
