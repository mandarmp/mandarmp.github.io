// Site interactions: theme, nav, header shadow, staggered reveal, signal trace,
// filters/search and the figure lightbox. All motion respects reduced-motion.
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Theme toggle (defaults to the system setting) ----
  var themeBtn = document.getElementById('theme-toggle');
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Mobile nav ----
  var navBtn = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', String(open));
  });

  // ---- Header border once scrolled ----
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Staggered reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i, 6) * 0.07 + 's');
  });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Signal trace: a calm, slowly scrolling neural recording ----
  var canvas = document.getElementById('signal');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, data = [], noise = 0, queue = [], phase = 0, running = false;
    var SPIKE = [0, -.06, -.15, -.9, -.45, .38, .3, .16, .07, 0];
    function sample() {
      noise = noise * 0.86 + (Math.random() - 0.5) * 0.22;
      phase += 0.05;
      var v = noise * 0.35 + Math.sin(phase) * 0.06 + Math.sin(phase * 0.23) * 0.05;
      if (!queue.length && Math.random() < 0.012) {
        var a = 0.75 + Math.random() * 0.25;
        queue = SPIKE.map(function (s) { return s * a; });
      }
      if (queue.length) v += queue.shift();
      return v;
    }
    function setup() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.ceil(W / 2) + 1;
      data = []; for (var i = 0; i < n; i++) data.push(sample());
    }
    function draw() {
      var cs = getComputedStyle(root);
      var accent = cs.getPropertyValue('--accent').trim();
      ctx.clearRect(0, 0, W, H);
      var grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.15, accent);
      grad.addColorStop(0.85, accent);
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad; ctx.lineWidth = 1.4; ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      for (var i = 0; i < data.length; i++) {
        var x = i * 2, y = H / 2 + data[i] * H * 0.42;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    function tick() {
      data.shift(); data.push(sample());
      draw();
      if (running) requestAnimationFrame(tick);
    }
    function start() { if (!running && !reduce) { running = true; requestAnimationFrame(tick); } }
    function stop() { running = false; }
    setup(); draw();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { setup(); draw(); }, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }).observe(canvas);
    } else start();
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    if (themeBtn) themeBtn.addEventListener('click', function () { setTimeout(draw, 0); });
  }

  // ---- Filter bars ----
  var searchInput = document.getElementById('post-search');
  var activeFilters = {};
  function applyFilter(bar) {
    var target = document.querySelector(bar.dataset.filterTarget);
    if (!target) return;
    var attr = bar.dataset.filterAttr;
    var value = activeFilters[bar.dataset.filterTarget] || 'all';
    var contains = bar.dataset.filterMode === 'contains';
    var q = searchInput && target.id === 'posts' ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;
    Array.prototype.forEach.call(target.children, function (el) {
      if (el.classList.contains('tl-year')) return;
      var data = (el.dataset[attr] || '').trim();
      var match = value === 'all' || (contains ? data.split(/\s+/).indexOf(value) !== -1 : data === value);
      if (match && q) match = el.textContent.toLowerCase().indexOf(q) !== -1;
      el.classList.toggle('is-hidden', !match);
      if (match) { visible++; el.classList.add('is-visible'); }
    });
    target.querySelectorAll('.tl-year').forEach(function (y) {
      var n = y.nextElementSibling, any = false;
      while (n && !n.classList.contains('tl-year')) {
        if (!n.classList.contains('is-hidden')) { any = true; break; }
        n = n.nextElementSibling;
      }
      y.classList.toggle('is-hidden', !any);
    });
    var empty = target.parentElement.querySelector('.empty-state');
    if (empty) empty.hidden = visible > 0;
  }
  document.querySelectorAll('.filter-bar').forEach(function (bar) {
    var key = bar.dataset.filterTarget, param = bar.dataset.filterParam;
    function select(btn) {
      bar.querySelectorAll('.filter').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      activeFilters[key] = btn.dataset.value;
      applyFilter(bar);
    }
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      select(btn);
      if (param && history.replaceState) {
        var url = new URL(location.href);
        if (btn.dataset.value === 'all') url.searchParams.delete(param); else url.searchParams.set(param, btn.dataset.value);
        history.replaceState(null, '', url);
      }
    });
    if (param) {
      var pre = new URLSearchParams(location.search).get(param);
      var b = pre && bar.querySelector('.filter[data-value="' + CSS.escape(pre) + '"]');
      if (b) select(b);
    }
    if (searchInput && key === '#posts') searchInput.addEventListener('input', function () { applyFilter(bar); });
  });

  // ---- Lightbox ----
  var lb = document.getElementById('lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lightbox-caption');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        lbImg.src = item.dataset.full; lbImg.alt = item.dataset.caption || '';
        lbCap.textContent = item.dataset.caption || ''; lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lightbox-close')) lb.close(); });
  }
})();
