// ============ 主入口 ============
// 负责页面初始化，以及三个 section 间的切换
// 切换到 quiz / result 时，隐藏顶部导航的 slogan 和"开始测试"按钮

import { renderLanding } from './landing.js?v=17';
import { QUESTIONS, ACT_BREAKS, PERSONAS } from './data/quiz.js?v=12';
import { FEATURED_PETS } from './data/pets.js?v=17';

const sections = {
  landing: document.getElementById('section-landing'),
  quiz:    document.getElementById('section-quiz'),
  result:  document.getElementById('section-result'),
};

// 顶部导航的可控元素
const navSlogan   = document.getElementById('nav-slogan');
const navStartWrap = document.getElementById('nav-start-wrap');
const quizProgressSlot = document.getElementById('quiz-progress-slot');
let quizModulePromise = null;

function loadQuizModule() {
  if (!quizModulePromise) quizModulePromise = import('./quiz.js?v=12');
  return quizModulePromise;
}

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
async function init() {
  registerOfflineCache();
  const sharedPetId = getSharedPetId();

  // 先隐藏非当前页面，避免动态模块加载时出现内容闪烁。
  sections.landing.classList.add('section-hidden');
  sections.quiz.classList.add('section-hidden');
  sections.result.classList.add('section-hidden');

  if (sharedPetId) {
    await renderSharedResult(sharedPetId);
    return;
  }

  // 1. Landing
  renderLanding(sections.landing);
  showSection('landing');

  // 用户浏览首页时提前把问卷首屏及后续场景放进浏览器缓存，
  // 避免移动网络进入答题后才看到大片空白或图片渐次下载。
  warmSiteImages();

  // 2. 绑定「开始测试」按钮（Landing 和 顶部 nav 都触发）
  const startBtns = [
    document.getElementById('start-quiz-btn'),
    document.getElementById('nav-start-btn'),
  ];
  startBtns.forEach(btn => {
    if (btn) {
      // 用户准备点击时就加载模块，避免点击后才开始解析 50KB+ 的问卷逻辑。
      btn.addEventListener('pointerenter', loadQuizModule, { once: true });
      btn.addEventListener('focus', loadQuizModule, { once: true });
      btn.addEventListener('touchstart', loadQuizModule, { once: true, passive: true });
      btn.addEventListener('click', () => {
        startQuiz();
      });
    }
  });

  if (new URLSearchParams(location.search).get('start') === '1') {
    history.replaceState({}, '', '/');
    await startQuiz();
  }
}

async function startQuiz() {
  const { renderQuiz } = await loadQuizModule();
  renderQuiz(sections.quiz, handleQuizComplete);
  showSection('quiz');
}

async function handleQuizComplete(result) {
  const petId = result?.persona?.petId;
  if (petId) history.replaceState({ pawtiResult: petId }, '', `/r/${encodeURIComponent(petId)}/`);
  updateResultMeta(result);
  const { renderResult } = await import('./result.js?v=17');
  renderResult(sections.result, result);
  showSection('result');
}

function getSharedPetId() {
  const metaPetId = document.querySelector('meta[name="pawti-shared-pet"]')?.content;
  const pathPetId = location.pathname.match(/\/r\/([^/]+)\/?$/i)?.[1];
  const candidate = decodeURIComponent(metaPetId || pathPetId || '');
  return FEATURED_PETS.some(pet => pet.id === candidate) ? candidate : null;
}

async function renderSharedResult(petId) {
  const persona = PERSONAS.find(item => item.petId === petId);
  const pet = FEATURED_PETS.find(item => item.id === petId);
  if (!persona || !pet) {
    location.replace('/');
    return;
  }
  const result = {
    persona,
    topTags: persona.primaryTags,
    matchPercent: 94,
    isMystery: false,
    isShared: true,
  };
  updateResultMeta(result);
  const { renderResult } = await import('./result.js?v=17');
  renderResult(sections.result, result);
  showSection('result');
}

function updateResultMeta(result) {
  const persona = result?.persona;
  const pet = FEATURED_PETS.find(item => item.id === persona?.petId);
  if (!persona || !pet) return;
  const resultUrl = `https://wanderpaw.cn/r/${encodeURIComponent(pet.id)}/`;
  const title = `我的旅行人格是「${persona.chinese}」｜WanderPaw`;
  const description = `${persona.description} 匹配到${pet.chinese}，它替我去了${pet.city}。`;
  document.title = title;
  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', resultUrl);
  setMeta('meta[property="og:image"]', 'content', `https://wanderpaw.cn/generated/share/cards/${pet.id}.jpg`);
  setMeta('link[rel="canonical"]', 'href', resultUrl);
}

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
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
    navigator.serviceWorker.register('./sw.js?v=16').catch(error => {
      console.info('PAWTI cache unavailable:', error.message);
    });
  }, { once: true });
}

function warmSiteImages() {
  const useMobileImages = window.matchMedia('(max-width: 640px)').matches;
  const criticalSources = [
    ACT_BREAKS[0]?.image,
    QUESTIONS[0]?.sceneImage?.src,
  ].filter(Boolean).map(src => useMobileImages ? toMobileImage(src) : src);

  const quizSources = [
    ...ACT_BREAKS.map(item => item.image),
    ...QUESTIONS.map(item => item.sceneImage?.src),
  ].filter(Boolean).map(src => useMobileImages ? toMobileImage(src) : src);
  // 横向滚动的宠物墙使用 transform，浏览器原生 lazy-load 有时无法及时预测
  // 即将滑入视口的卡片，因此在页面加载完成后按顺序低优先级补齐正面插画。
  const landingSources = FEATURED_PETS.map(item => item.illustrationUrl).filter(Boolean);
  // 问卷图优先于非首屏宠物墙插画，确保用户快速开始答题时后续题图已经在路上。
  const allSources = [...new Set([...quizSources, ...landingSources])];

  const preloadImage = (src, priority) => new Promise(resolve => {
    const image = new Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve();
    };
    const timeout = window.setTimeout(finish, 6000);
    image.decoding = 'async';
    image.fetchPriority = priority;
    image.onload = image.onerror = finish;
    image.src = src;
  });

  const preloadCritical = () => criticalSources.forEach(src => preloadImage(src, 'high'));
  const preloadDeferred = async () => {
    if (navigator.connection?.saveData) return;
    for (const src of allSources) {
      if (criticalSources.includes(src)) continue;
      await preloadImage(src, 'low');
    }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadCritical, { timeout: 900 });
  } else {
    window.setTimeout(preloadCritical, 250);
  }

  const scheduleDeferred = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadDeferred, { timeout: 2500 });
    } else {
      window.setTimeout(preloadDeferred, 1200);
    }
  };

  if (document.readyState === 'complete') scheduleDeferred();
  else window.addEventListener('load', scheduleDeferred, { once: true });
}

function toMobileImage(src) {
  return String(src).replace(/\.webp(?=\?|$)/i, '-mobile.webp');
}
