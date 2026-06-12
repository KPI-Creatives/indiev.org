# Подключение формы сайта к Twenty CRM (как на kpicreatives.com и indiev.org)

Гайд для подключения любого нового сайта к той же CRM. Сделано одинаково на kpicreatives.com (форма /contact) и indiev.org (модалка Contact Us).

## 1. Куда отправлять

Лиды принимает вебхук Twenty CRM Workflow:

```
POST https://crm.kpicreatives.com/webhooks/workflows/45c38966-9698-42cb-9116-d2de9350484f/757d8601-a088-4074-8fcd-a424efe113c3
Content-Type: application/json
```

Это **общий** вебхук для всех сайтов. Сайты различаются полем `source` в payload. Если для нового сайта нужен отдельный workflow — создай его в Twenty (Settings → Workflows → Webhook trigger) и подставь новый URL.

## 2. Схема payload

```json
{
  "firstName": "John",            // имя (первое слово из full name)
  "lastName": "Smith",            // остальное из full name ("" если одно слово)
  "email": "john@acme.com",
  "phone": "3105551234",          // только цифры, без +1 (см. нормализацию ниже)
  "industry": "Real Estate",      // опционально (на kpicreatives — select, на indiev нет)
  "source": "indiev-website",     // ← УНИКАЛЬНЫЙ ИДЕНТИФИКАТОР САЙТА. Для нового сайта свой!
  "domain": "acme.com",           // домен из email (после @, lowercase)
  "companyName": "Acme Inc",      // опционально
  "companyDisplayName": "Acme Inc", // companyName, или domain если company не заполнили
  "closeDateHint": "2026-06-19T00:00:00.000Z", // now + 7 дней, ISO
  "smsConsent": false,            // true только если есть чекбокс и телефон валиден
  "message": "[indiev.org] текст сообщения", // префикс с доменом сайта — виден всегда
  "gaClientId": "1159143671.1781216917",  // опционально, из gtag (см. п.5)
  "gaSessionId": "1781216916"             // опционально
}
```

Обязательный минимум: `firstName`, `email`, `source`. Остальное — по наличию полей в форме.

## 3. Правила нормализации (важно соблюдать)

- **Имя**: `fullName.trim().replace(/\s+/g,' ')`; первое слово → firstName, остаток → lastName
- **Телефон**: убрать всё кроме цифр; если 11 цифр и начинается с `1` — срезать единицу; слать только если ≥7 цифр
- **Email-валидация**: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`
- **Honeypot**: скрытое поле `name="website"` (`tabindex="-1" autocomplete="off"`, спрятано CSS). Если заполнено — НЕ слать в CRM, просто сделать redirect на /thank-you (бот уходит довольным)
- **Успех**: `response.ok` → `window.location.href = '/thank-you'` (или /thankyou)
- **Ошибка**: показать текст «Send failed. Email hello@kpicreatives.com instead.», кнопку разблокировать

## 4. Готовый сниппет (vanilla JS, как на indiev.org)

```js
const CRM_ENDPOINT = 'https://crm.kpicreatives.com/webhooks/workflows/45c38966-9698-42cb-9116-d2de9350484f/757d8601-a088-4074-8fcd-a424efe113c3';
const SITE = 'newsite.com'; // ← поменять

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (form.website && form.website.value.trim()) { location.href = '/thank-you'; return; } // honeypot

  const full = form.fullName.value.trim().replace(/\s+/g, ' ');
  const sp = full.indexOf(' ');
  let phone = (form.phone?.value || '').replace(/\D/g, '');
  if (phone.length === 11 && phone.startsWith('1')) phone = phone.slice(1);
  const email = form.email.value.trim();

  const payload = {
    firstName: sp === -1 ? full : full.slice(0, sp),
    lastName:  sp === -1 ? ''   : full.slice(sp + 1),
    email,
    source: SITE + '-website',
    domain: (email.split('@')[1] || '').toLowerCase(),
    companyDisplayName: (email.split('@')[1] || '').toLowerCase(),
    closeDateHint: new Date(Date.now() + 7 * 864e5).toISOString(),
    smsConsent: false,
    message: '[' + SITE + '] ' + (form.message?.value.trim() || 'no information'),
  };
  if (phone.length >= 7) payload.phone = phone;

  const r = await fetch(CRM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (r.ok) location.href = '/thank-you';
  else alert('Send failed. Email hello@kpicreatives.com instead.');
});
```

На kpicreatives.com endpoint лежит в data-атрибуте формы (`<form data-contact-form data-endpoint="...">`), а скрипт один на все формы — удобно, если форм несколько.

## 5. GA-атрибуция (опционально, как на kpicreatives.com)

Перед отправкой вытащить client_id/session_id из gtag и добавить в payload:

```js
const gaIds = await new Promise((res) => {
  if (typeof gtag !== 'function') return res({});
  const out = {}; let n = 2;
  const done = () => (--n === 0) && res(out);
  setTimeout(() => res(out), 800); // не ждать дольше 800мс
  gtag('get', 'G-XXXXXXX', 'client_id', v => { if (v) out.gaClientId = v; done(); });
  gtag('get', 'G-XXXXXXX', 'session_id', v => { if (v) out.gaSessionId = v; done(); });
});
Object.assign(payload, gaIds);
```

## 6. Букинг (Cal.com), если нужен на новом сайте

Плавающая кнопка сразу на конкретный ивент (без меню выбора):

```html
<script>
(function (C, A, L) { let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace])}else p(cal,ar);return}p(cal,ar)};})(window, "https://book.kpicreatives.com/embed/embed.js", "init");
Cal("init", { origin: "https://book.kpicreatives.com" });
Cal("floatingButton", { calLink: "dima/qualification-15", buttonText: "Schedule a Call", buttonColor: "#7b5be9", buttonTextColor: "#ffffff" });
</script>
```

Инлайн-эмбед на странице: `<div id="cal-inline" style="min-height:760px"></div>` + `Cal("inline", { elementOrSelector: "#cal-inline", calLink: "dima/qualification-15" })`.

Доступные ивенты Димы: `dima/qualification-15`, `dima/proposal-45`, `dima/deep-dive-60`, `dima/kickoff-60`, `dima/directormode-intro`.

## 7. Чек-лист подключения нового сайта

1. Придумать `source` (например `aduscale-website`) и префикс `[домен]` в message
2. Вставить сниппет из п.4, подставить SITE
3. Honeypot-поле в форму
4. Создать страницу /thank-you
5. Тестовый сабмит → проверить лид в Twenty (имя Test + source) → удалить
6. Если нужна GA-атрибуция — п.5 со своим G-ID
