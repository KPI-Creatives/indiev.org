# Indiev — Astro rebuild

Порт главной страницы indiev.org из Webflow-экспорта на Astro. Визуально 1:1, без webflow.js и jQuery.

## Структура

- `src/styles/tokens.css` — дизайн-токены (цвета, градиенты, шрифты, радиусы, отступы), извлечённые из Webflow-сайта
- `src/styles/main.css` — стили оригинала, очищенные до используемых на главной правил (170KB → ~100KB) и переведённые на токены
- `src/styles/overrides.css` — состояния, которые в Webflow делал JS (аккордеоны, модалка, тоггл тарифов, мобильное меню)
- `src/components/*.astro` — секции главной (Hero, Pricing, Faq и т.д.)
- `src/scripts/main.js` — весь интерактив на ванильном JS (заменяет webflow.js + инлайн-скрипты)
- `src/layouts/Base.astro` — head, метаданные, JSON-LD схемы, GTM/аналитика, Calendly
- `public/` — только используемые ассеты: 24 картинки (532KB вместо 32MB), шрифты, Lottie-анимация

## Локальная разработка

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # статика в dist/
```

⚠️ Папку `node_modules/` в этом каталоге нужно удалить и поставить заново (`rm -rf node_modules && npm install`) — она была частично установлена в песочнице.

## Деплой на Cloudflare Pages

Вариант А (Git): подключи репозиторий в Cloudflare Pages.
- Build command: `npm run build`
- Build output directory: `dist`

Вариант Б (drag & drop): готовая сборка уже лежит в `dist/` — можно загрузить как есть через Direct Upload в дашборде Cloudflare Pages.

## Что осталось от старого сайта как есть

- Все трекеры: GTM (2 контейнера), Meta Pixel, Bing UET, Clarity, Ahrefs, CMP-баннер
- Calendly-бейдж и страница /calendly (ссылки ведут на /calendly — страница ещё не портирована)
- Форма в модалке шлёт лиды в Attio через kpi-back-phi.vercel.app (как в оригинале)
- Email-форма в футере — была завязана на Webflow Forms, сейчас не отправляет (нужен новый бэкенд)

## Ещё не портировано

Внутренние страницы: /about, /portfolio, /contacts, /signup-pricing, /terms, /privacy, /sp/* (33 SEO-страницы) — ссылки на них уже ведут на чистые URL без .html.
