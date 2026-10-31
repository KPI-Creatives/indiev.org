// Interactions ported from the Webflow site (webflow.js + inline scripts replaced)

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  /* ---------- mobile nav ---------- */
  const navbar = document.querySelector('.navbar');
  const navButton = document.querySelector('.w-nav-button');
  if (navbar && navButton) {
    navButton.addEventListener('click', () => {
      navbar.classList.toggle('nav-open');
      navButton.classList.toggle('w--open');
    });
  }

  /* ---------- swipers (Swiper itself loads lazily after window.load) ---------- */
  const initSwipers = () => {
    document.querySelectorAll('.slide-content').forEach((el) => {
      new window.Swiper(el, {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 1,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          750: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        },
      });
    });
    const fbList = document.querySelector('.projects-col-list');
    if (fbList) {
      const wrap = fbList.parentElement;
      wrap.classList.add('swiper');
      fbList.classList.add('swiper-wrapper');
      fbList.querySelectorAll(':scope > .projects-col-item').forEach((el) => el.classList.add('swiper-slide'));
      new window.Swiper(wrap, {
        spaceBetween: 10,
        loop: true,
        breakpoints: {
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        },
      });
    }
  };
  if (window.Swiper) initSwipers();
  else document.addEventListener('swiper:ready', initSwipers, { once: true });

  /* ---------- empowering list: user-initiated highlight ----------
     Auto-rotation removed: it expanded/collapsed item text on a timer,
     producing ~0.13 scroll-triggered CLS. Hover/tap shifts are
     user-initiated and excluded from CLS. */
  const items = document.querySelectorAll('.vertical_item');
  if (items.length) {
    const setHover = (index) => items.forEach((item, i) => item.classList.toggle('hovered', i === index));
    setHover(0);
    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => setHover(index));
      item.addEventListener('click', () => setHover(index));
    });
  }

  /* ---------- accordions ---------- */
  // Webflow export leaves inline height:0 on collapsible blocks — strip it so CSS max-height takes over
  document.querySelectorAll('.question_content_wrapper, .text_wrapper_accordion').forEach((el) => {
    el.style.removeProperty('height');
  });

  document.querySelectorAll('.accordion_title_wrapper').forEach((t) => {
    t.addEventListener('click', () => t.closest('.accordion_item').classList.toggle('open'));
  });
  document.querySelectorAll('.question_title_wrapper').forEach((t) => {
    t.addEventListener('click', () => t.closest('.question_item').classList.toggle('open'));
  });

  /* ---------- SEO read-more ---------- */
  document.querySelectorAll('.read_more_spann').forEach((span) => {
    span.addEventListener('click', () => {
      span.closest('.seo_text_container')?.classList.toggle('expanded');
    });
  });

  /* ---------- hide video play pulse once the player is clicked ---------- */
  window.addEventListener('blur', () => {
    const ae = document.activeElement;
    if (ae && ae.tagName === 'IFRAME' && ae.closest('.video_wrapper')) {
      document.querySelectorAll('.video-play-pulse').forEach((p) => { p.style.display = 'none'; });
    }
  });

});
