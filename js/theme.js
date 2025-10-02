// theme.js — small enhancements for the modern portfolio
(function(){
  'use strict';

  // mobile nav toggle
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
    // close when a link is clicked
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> nav.classList.remove('open')));
  }

  // reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

  // improved scrollspy: keeps nav link active for the section near top
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navlinks = Array.from(document.querySelectorAll('#site-nav a'));
  const spy = new IntersectionObserver((entries)=>{
    // find the entry nearest to the top by isIntersecting and boundingClientRect
    const visible = entries.filter(e=> e.isIntersecting).sort((a,b)=> a.boundingClientRect.top - b.boundingClientRect.top);
    if(visible.length){
      const id = visible[0].target.id;
      navlinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    }
  },{threshold:[0.25,0.5,0.75],rootMargin:'-12% 0px -55% 0px'});
  sections.forEach(s=> spy.observe(s));

  // smooth scroll offset for fixed header
  function offsetScrollTo(hash){
    if(!hash) return;
    const el = document.querySelector(hash);
    if(!el) return;
    const header = document.querySelector('.site-header');
    const top = el.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight + 12 : 12);
    window.scrollTo({top,behavior:'smooth'});
  }
  // hijack clicks
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        offsetScrollTo(href);
        history.replaceState(null,'',href);
      }
    });
  });

  // skills toggle (open/close)
  document.querySelectorAll('.skill-toggle').forEach(btn=>{
    const toggleFn = ()=>{
      const skills = btn.closest('.skills');
      if(!skills) return;
      const open = skills.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? 'Hide skills ▴' : 'Show skills ▾';
    };
    btn.addEventListener('click', toggleFn);
    // keyboard support
    btn.addEventListener('keydown', (ev)=>{
      if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); toggleFn(); }
    });
  });

  // ensure clicking project cards doesn't remove nav or hide it; keep state stable
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      // when project clicked, ensure active nav remains pointing to projects
      navlinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#projects'));
    });
  });

  // set current year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // contact form stub — prevent default and show a basic confirmation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if(btn) btn.disabled = true;
      // simple visual confirmation
      btn.textContent = 'Sent — thank you!';
      setTimeout(()=>{ if(btn){ btn.disabled=false; btn.textContent='Send Message'; } }, 2200);
    });
  }

})();
