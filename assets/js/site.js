// Site interactions: theme toggle, mobile nav, reveal-on-scroll, filters, search, lightbox.
(function () {
  'use strict';
  var root = document.documentElement;

  // ---- Theme toggle ----
  var themeBtn = document.getElementById('theme-toggle');
  function currentTheme() {
    return root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
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
