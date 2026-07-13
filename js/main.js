// ============ 主入口 ============
// 负责页面初始化，以及三个 section 间的切换
// 切换到 quiz / result 时，隐藏顶部导航的 slogan 和"开始测试"按钮

import { renderLanding } from './landing.js';
import { renderQuiz } from './quiz.js';
import { renderResult } from './result.js';
import { QUESTIONS, ACT_BREAKS } from './data/quiz.js';

const sections = {
  landing: document.getElementById('section-landing'),
  quiz:    document.getElementById('section-quiz'),
  result:  document.getElementById('section-result'),
};

// 顶部导航的可控元素
const navSlogan   = document.getElementById('nav-slogan');
const navStartWrap = document.getElementById('nav-start-wrap');
const quizProgressSlot = document.getElementById('quiz-progress-slot');

function showSection(name) {
  Object.entries(sections).forEach(([key, el]) => {
    if (!el) return;
    if (key === name) {
      el.classList.remove('section-hidden');
    } else {
      el.classList.add('section-hidden');
    }
  });

  // 控制顶部导航：只在 landing 页显示 slogan 和开始按钮
  if (name === 'landing') {
    if (navSlogan)    navSlogan.style.display = '';
    if (navStartWrap) navStartWrap.style.display = '';
    if (quizProgressSlot) quizProgressSlot.style.display = 'none';
  } else {
    if (navSlogan)    navSlogan.style.display = 'none';
    if (navStartWrap) navStartWrap.style.display = 'none';
    if (quizProgressSlot) quizProgressSlot.style.display = name === 'quiz' ? 'block' : 'none';
  }

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初始化渲染
function init() {
  registerOfflineCache();
  // 1. Landing
  renderLanding(sections.landing);

  // 用户浏览首页时提前把问卷首屏及后续场景放进浏览器缓存，
  // 避免移动网络进入答题后才看到大片空白或图片渐次下载。
  warmQuizImages();

  // 2. 隐藏 quiz 和 result
  sections.quiz.classList.add('section-hidden');
  sections.result.classList.add('section-hidden');

  // 3. 绑定「开始测试」按钮（Landing 和 顶部 nav 都触发）
  const startBtns = [
    document.getElementById('start-quiz-btn'),
    document.getElementById('nav-start-btn'),
  ];
  startBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        startQuiz();
      });
    }
  });
}

function startQuiz() {
  renderQuiz(sections.quiz, handleQuizComplete);
  showSection('quiz');
}

function handleQuizComplete(result) {
  renderResult(sections.result, result);
  showSection('result');
}

// DOMContentLoaded 后启动
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function registerOfflineCache() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => {
      console.info('PAWTI cache unavailable:', error.message);
    });
  }, { once: true });
}

function warmQuizImages() {
  const useMobileImages = window.matchMedia('(max-width: 640px)').matches;
  const sources = [
    ACT_BREAKS[0]?.image,
    QUESTIONS[0]?.sceneImage?.src,
  ].filter(Boolean).map(src => useMobileImages ? toMobileImage(src) : src);

  const preload = () => sources.forEach(src => {
    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'high';
    image.src = src;
  });

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preload, { timeout: 1200 });
  } else {
    window.setTimeout(preload, 250);
  }
}

function toMobileImage(src) {
  return String(src).replace(/\.webp$/i, '-mobile.webp');
}
