// Site interactions: theme toggle, mobile nav, reveal-on-scroll, filters, search, lightbox.
(function () {
  'use strict';
  var root = document.documentElement;

  // ---- Theme toggle ----
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Hero oscilloscope: scrolling multichannel traces with spikes ----
  var canvas = document.getElementById('scope');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CH = 12, STEP = 3, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, N, chans = [], pointerY = -1, pointerActive = 0;
    var SPIKE = [0, -.08, -.2, -1, -.55, .45, .35, .18, .08, 0];
    var css = function (v) { return getComputedStyle(root).getPropertyValue(v).trim(); };
    var colors;

    function setup() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      N = Math.ceil(W / STEP) + 2;
      chans = [];
      for (var c = 0; c < CH; c++) {
        var ch = { data: new Float32Array(N), noise: 0, queue: [], rate: 0.004 + Math.random() * 0.01, phase: Math.random() * 6 };
        for (var i = 0; i < N; i++) ch.data[i] = sample(ch, c);
        chans.push(ch);
      }
    }
    function sample(ch, c) {
      ch.noise = ch.noise * 0.82 + (Math.random() - 0.5) * 0.5;
      ch.phase += 0.09 + c * 0.004;
      var v = ch.noise * 0.22 + Math.sin(ch.phase) * 0.05;
      var laneY = (c + 0.5) / CH * H;
      var near = pointerActive && Math.abs(pointerY - laneY) < H / CH * 1.6 ? 0.12 : 0;
      if (!ch.queue.length && Math.random() < ch.rate + near) {
        var amp = 0.7 + Math.random() * 0.6;
        ch.queue = SPIKE.map(function (s) { return s * amp; });
      }
      if (ch.queue.length) v += ch.queue.shift();
      return v;
    }
    function draw() {
      colors = {
        dim: css('--faint'), sig: css('--signal'), cyan: css('--c-cyan'), mag: css('--c-mag'),
        line: css('--line'), muted: css('--muted')
      };
      ctx.clearRect(0, 0, W, H);
      var lane = H / CH;
      ctx.font = '10px "IBM Plex Mono", monospace';
      for (var c = 0; c < CH; c++) {
        var ch = chans[c], y0 = (c + 0.5) * lane, amp = lane * 0.9;
        var col = c === 3 ? colors.sig : c === 7 ? colors.cyan : c === 10 ? colors.mag : colors.dim;
        ctx.strokeStyle = col; ctx.lineWidth = (c === 3 || c === 7 || c === 10) ? 1.4 : 1;
        ctx.globalAlpha = (c === 3 || c === 7 || c === 10) ? 0.95 : 0.55;
        ctx.beginPath();
        for (var i = 0; i < N; i++) {
          var x = i * STEP, y = y0 + ch.data[i] * amp;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 0.7; ctx.fillStyle = colors.muted;
        ctx.fillText('CH' + (c < 9 ? '0' : '') + (c + 1), W - 44, y0 - 6);
      }
      ctx.globalAlpha = 1;
    }
    function tick() {
      for (var k = 0; k < 2; k++) {
        for (var c = 0; c < CH; c++) {
          var d = chans[c].data;
          d.copyWithin(0, 1);
          d[N - 1] = sample(chans[c], c);
        }
      }
      draw();
      if (running) requestAnimationFrame(tick);
    }
    var running = false;
    function start() { if (!running && !reduce) { running = true; requestAnimationFrame(tick); } }
    function stop() { running = false; }

    setup(); draw();
    var hero = canvas.parentElement;
    hero.addEventListener('pointermove', function (e) {
      var r = canvas.getBoundingClientRect();
      pointerY = e.clientY - r.top; pointerActive = 1;
    });
    hero.addEventListener('pointerleave', function () { pointerActive = 0; });
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { setup(); draw(); }, 150); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }).observe(canvas);
    } else start();
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    if (themeBtn) themeBtn.addEventListener('click', function () { setTimeout(draw, 0); });
  }

  // ---- Mobile nav ----
  var navBtn = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) navBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', String(open));
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---- Generic filter bars ----
  // <div class="filter-bar" data-filter-target="#grid" data-filter-attr="category" [data-filter-mode="contains"] [data-filter-param="tag"]>
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
      if (el.classList.contains('tl-year')) return; // handled below
      var data = (el.dataset[attr] || '').trim();
      var match = value === 'all' || (contains ? data.split(/\s+/).indexOf(value) !== -1 : data === value);
      if (match && q) match = el.textContent.toLowerCase().indexOf(q) !== -1;
      el.classList.toggle('is-hidden', !match);
      if (match) { visible++; el.classList.add('is-visible'); }
    });

    // Timeline: hide year markers with no visible items after them.
    var years = target.querySelectorAll('.tl-year');
    years.forEach(function (y) {
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
    var key = bar.dataset.filterTarget;
    var param = bar.dataset.filterParam;
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
        if (btn.dataset.value === 'all') url.searchParams.delete(param);
        else url.searchParams.set(param, btn.dataset.value);
        history.replaceState(null, '', url);
      }
    });
    // Preselect from ?tag=…
    if (param) {
      var pre = new URLSearchParams(location.search).get(param);
      var btn = pre && bar.querySelector('.filter[data-value="' + CSS.escape(pre) + '"]');
      if (btn) select(btn);
    }
    if (searchInput && key === '#posts') {
      searchInput.addEventListener('input', function () { applyFilter(bar); });
    }
  });

  // ---- Lightbox for case-study galleries ----
  var lb = document.getElementById('lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lightbox-caption');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        lbImg.src = item.dataset.full;
        lbImg.alt = item.dataset.caption || '';
        lbCap.textContent = item.dataset.caption || '';
        lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.closest('.lightbox-close')) lb.close();
    });
  }
})();
