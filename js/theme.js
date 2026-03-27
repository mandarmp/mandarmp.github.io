// theme.js — small enhancements for the modern portfolio
(function(){
  'use strict';

  // mobile nav toggle
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // close when a link is clicked
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
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

  // robust scrollspy for fixed header layouts
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navlinks = Array.from(document.querySelectorAll('#site-nav a'));
  function updateActiveNav(){
    if(!sections.length || !navlinks.length) return;

    const header = document.querySelector('.site-header');
    const offset = (header ? header.offsetHeight : 0) + 24;
    const y = window.scrollY + offset;
    let activeId = sections[0].id;

    for(let i = 0; i < sections.length; i++){
      const current = sections[i];
      const next = sections[i + 1];
      const currentTop = current.offsetTop;
      const nextTop = next ? next.offsetTop : Number.POSITIVE_INFINITY;
      if(y >= currentTop && y < nextTop){
        activeId = current.id;
        break;
      }
    }

    navlinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#' + activeId));
  }
  updateActiveNav();
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);

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
      // keep nav state fresh after in-section interactions
      updateActiveNav();
    });
  });

  // set current year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // contact form submission with server feedback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const status = document.getElementById('formStatus');
      const originalBtnText = btn ? btn.textContent : '';
      const endpoint = form.getAttribute('action') || 'mail/contact_me.php';

      if(status){
        status.textContent = '';
        status.classList.remove('success', 'error');
      }

      try {
        if(btn){
          btn.disabled = true;
          btn.textContent = 'Sending...';
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form)
        });

        if(!response.ok){
          throw new Error('Request failed');
        }

        const body = (await response.text()).trim();
        if(body && /no arguments provided/i.test(body)){
          throw new Error('Validation failed');
        }

        if(status){
          status.textContent = 'Message sent successfully. Thank you.';
          status.classList.add('success');
        }
        form.reset();
      } catch (err) {
        if(status){
          status.textContent = 'Unable to send right now. Please email mmpatil@health.ucdavis.edu.';
          status.classList.add('error');
        }
      } finally {
        if(btn){
          btn.disabled = false;
          btn.textContent = originalBtnText || 'Send Message';
        }
      }
    });
  }

})();
