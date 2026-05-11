// ============ 主入口 ============
// 负责页面初始化，以及三个 section 间的切换
// 切换到 quiz / result 时，隐藏顶部导航的 slogan 和"开始测试"按钮

import { renderLanding } from './landing.js';
import { renderQuiz } from './quiz.js';
import { renderResult } from './result.js';

const sections = {
  landing: document.getElementById('section-landing'),
  quiz:    document.getElementById('section-quiz'),
  result:  document.getElementById('section-result'),
};

// 顶部导航的可控元素
const navSlogan   = document.getElementById('nav-slogan');
const navStartWrap = document.getElementById('nav-start-wrap');

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
  } else {
    if (navSlogan)    navSlogan.style.display = 'none';
    if (navStartWrap) navStartWrap.style.display = 'none';
  }

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 初始化渲染
function init() {
  // 1. Landing
  renderLanding(sections.landing);

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