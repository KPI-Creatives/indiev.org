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

  /* ---------- pricing toggle (subscription / flat rates) ---------- */
  const btnYear = document.querySelector('.button-year');
  const btnMonth = document.querySelector('.button-month');
  const switchEl = document.querySelector('.button-switch');
  if (btnYear && btnMonth && switchEl) {
    btnYear.addEventListener('click', (e) => {
      e.preventDefault();
      switchEl.classList.add('year');
      document.querySelector('.clone-year').style.display = 'block';
      document.querySelector('.clone-month').style.display = 'none';
    });
    btnMonth.addEventListener('click', (e) => {
      e.preventDefault();
      switchEl.classList.remove('year');
      document.querySelector('.clone-year').style.display = 'none';
      document.querySelector('.clone-month').style.display = 'block';
    });
  }

  /* ---------- modal ---------- */
  const modal = document.querySelector('.modal_wrapper');
  if (modal) {
    document.querySelectorAll('.open_modal').forEach((button) => {
      button.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.classList.add('no-scroll');
      });
    });
    const close = () => {
      modal.style.display = 'none';
      document.body.classList.remove('no-scroll');
    };
    document.querySelector('.modal_close_button')?.addEventListener('click', close);
    document.querySelector('.moda_backdrop')?.addEventListener('click', close);
  }

  /* ---------- modal form validation + submit (Attio backend) ---------- */
  const submitButton = document.getElementById('price-submmit-button');
  if (submitButton) {
    const emailInput = document.getElementById('price-email');
    const nameInput = document.getElementById('price-name');
    const phoneInput = document.getElementById('price-phone');
    const check = document.getElementById('email-check');
    const phoneCheck = document.getElementById('phone-check');
    const nameCheck = document.getElementById('name-check');
    const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    // Accepts masked values: "+1 (310) 555-1234" or international "+447911123456"
    const validatePhone = (v) => {
      const s = v.trim();
      if (!s.startsWith('+')) return false;
      const digits = s.replace(/\D/g, '');
      if (digits.startsWith('1')) return digits.length === 11; // US/Canada: full 10-digit number
      return digits.length >= 8 && digits.length <= 15; // other countries: E.164
    };
    const validateName = (v) => v.trim().length >= 2;

    /* phone input mask: US formats as +1 (XXX) XXX-XXXX, other +CC kept as plain digits */
    const formatPhone = (raw) => {
      const s = raw.trim();
      if (s === '' || s === '+') return s;
      if (s.startsWith('+') && !/^\+1/.test(s)) return '+' + s.replace(/\D/g, '').slice(0, 15);
      let d = s.replace(/\D/g, '');
      if (d.startsWith('1')) d = d.slice(1);
      d = d.slice(0, 10);
      if (!d.length) return '+1'; // lets backspace walk all the way out of the mask
      let out = '+1 (' + d.slice(0, 3);
      if (d.length > 3) out += ') ' + d.slice(3, 6);
      if (d.length > 6) out += '-' + d.slice(6);
      return out;
    };
    phoneInput.setAttribute('inputmode', 'tel');
    phoneInput.setAttribute('placeholder', '+1 (310) 555-1234');
    phoneInput.addEventListener('input', () => {
      const formatted = formatPhone(phoneInput.value);
      if (formatted !== phoneInput.value) phoneInput.value = formatted;
    });
    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value.trim()) phoneInput.value = '+1 ';
    });
    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim() === '+1' || phoneInput.value.trim() === '+') phoneInput.value = '';
    });
    submitButton.classList.add('disable');
    const checkState = () => {
      submitButton.classList.toggle(
        'disable',
        !(validateName(nameInput.value) && validateEmail(emailInput.value) && validatePhone(phoneInput.value))
      );
    };
    const bind = (input, validate, errId, checkEl, msg) => {
      input.addEventListener('input', () => {
        const err = document.getElementById(errId);
        const ok = validate(input.value);
        err.textContent = ok ? '' : msg;
        err.style.display = ok ? 'none' : 'block';
        checkEl.style.display = ok ? 'block' : 'none';
        checkState();
      });
    };
    bind(nameInput, validateName, 'name-error', nameCheck, 'Name must be at least 2 characters.');
    bind(phoneInput, validatePhone, 'phone-error', phoneCheck, 'Please enter a valid phone number format (e.g., +123456789).');
    bind(emailInput, validateEmail, 'email-error', check, 'Please enter a valid email address.');
    const CRM_ENDPOINT = 'https://crm.kpicreatives.com/webhooks/workflows/45c38966-9698-42cb-9116-d2de9350484f/757d8601-a088-4074-8fcd-a424efe113c3';
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();
      // Honeypot: bots fill the hidden "website" field — pretend success, skip CRM
      const honeypot = submitButton.closest('form')?.querySelector('input[name="website"]');
      if (honeypot && honeypot.value.trim()) { window.location.href = '/thankyou'; return; }
      submitButton.value = 'Please wait...';
      submitButton.disabled = true;
      const full = nameInput.value.trim().replace(/\s+/g, ' ');
      const sp = full.indexOf(' ');
      const firstName = sp === -1 ? full : full.slice(0, sp);
      const lastName = sp === -1 ? '' : full.slice(sp + 1);
      let phone = phoneInput.value.trim().replace(/\D/g, '');
      if (phone.length === 11 && phone.startsWith('1')) phone = phone.slice(1);
      const email = emailInput.value.trim();
      const domain = (email.split('@')[1] || '').trim().toLowerCase();
      const msg = document.getElementById('price-message').value.trim();
      const payload = {
        firstName,
        lastName,
        email,
        source: 'indiev-website',
        domain,
        companyDisplayName: domain,
        closeDateHint: new Date(Date.now() + 7 * 864e5).toISOString(),
        smsConsent: false,
        message: '[indiev.org] ' + (msg || 'no information'),
      };
      if (phone.length >= 7) payload.phone = phone;
      try {
        const response = await fetch(CRM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) window.location.href = '/thankyou';
        else console.error('CRM webhook failed:', response.status);
      } catch (error) {
        console.error('Error sending data:', error);
      } finally {
        submitButton.value = 'Submit';
        submitButton.disabled = false;
      }
    });
  }

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

  /* ---------- GTM price-button tracking ---------- */
  document.querySelectorAll('.track_button').forEach((button) => {
    button.addEventListener('click', function () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'price_button_click',
        price: this.getAttribute('data-price'),
        name: this.getAttribute('data-name'),
      });
    });
  });
});
