# SEO Audit: indiev.org (Astro build, pre-deploy)
## Date: 2026-06-11 · Scope: 50 static pages in `dist/`

## Executive Summary
Полный технический аудит новой Astro-сборки перед деплоем на Cloudflare Pages. Найдено и **исправлено в этом же проходе** 9 классов проблем: от битой Product-схемы на 33 страницах до отсутствующих robots.txt/sitemap.xml. Контент и структура унаследованы от живого сайта и уже неплохо оптимизированы; главный нереализованный потенциал — вес изображений (исправлено: −13MB) и off-site сигналы.

## SEO Health Score: 87/100

| Категория | Балл | Вес | Статус |
|----------|------|-----|--------|
| Technical SEO | 95 | 22% | 🟢 |
| Content Quality | 82 | 23% | 🟢 |
| On-Page SEO | 90 | 20% | 🟢 |
| Structured Data | 92 | 10% | 🟢 |
| Performance | 85 | 10% | 🟢 |
| AI Search Readiness | 72 | 10% | 🟡 |
| Images | 88 | 5% | 🟢 |

## Исправлено в этом проходе

| # | Проблема | Масштаб | Фикс |
|---|----------|---------|------|
| 1 | Невалидный Product JSON-LD (`};` из Webflow-эмбедов) | 33 sp-страницы | `;` удалён, схема валидна |
| 2 | Невалидный символ `\t` в author Product-схемы | 1 страница | исправлено |
| 3 | FAQPage + OfferCatalog схемы дублировались на всех 50 страницах | сайт целиком | теперь только на главной |
| 4 | Нет robots.txt | сайт | создан, AI-краулеры разрешены (default allow) |
| 5 | Нет sitemap.xml | сайт | создан: 44 индексируемых URL |
| 6 | Служебные страницы индексируемы (thankyou×3, calendly, detail_reviews×2) | 6 страниц | `noindex,follow` |
| 7 | Titles-заглушки («affiliate», «signup-pricing», «expert-video-editing» = имена файлов) и слишком длинные/короткие titles/descriptions | 12 страниц | переписаны (главная 73→63, contacts 66→54, about desc 194→160 и т.д.) |
| 8 | Нет H1 на signup-pricing | 1 страница | h2 «Choose the Plan…» → h1 |
| 9 | 20 изображений >200KB (худшее 3.3MB) | 21MB → 7.7MB | пережаты WebP/JPEG q75-78, max 1920w; dist 29MB→15MB |

## Что уже хорошо
- 100% страниц: canonical, OG/Twitter-карты, meta description, ровно один H1 (кроме noindex-страниц)
- ProfessionalService schema с NAP, sameAs (8 профилей), часами работы — сильный сигнал для Knowledge Graph
- 0 битых внутренних ссылок, чистые URL без .html
- 0 синхронных render-blocking скриптов в head; статика без webflow.js/jQuery (−~120KB JS)
- Все изображения имеют alt-атрибут (91 пустой — декоративные, это корректно)
- SSR/статика: контент полностью извлекаем AI-краулерами без JS

## High Priority (после деплоя)
1. **Замерить CWV на Cloudflare Pages** (PSI был рейт-лимитен в аудите). Ожидание: статика+CF легко даст зелёные LCP/INP/CLS, но проверить swiper CSS с unpkg — лучше self-host.
2. **301-редиректы со старых URL**, если на Webflow были отличия (особенно `/sp/*` и LA-страница) — файл `_redirects` в CF Pages.
3. **GSC**: после деплоя отправить sitemap.xml, запросить переобход ключевых страниц (главная, about, portfolio — у них новые titles/H1).

## Medium Priority (квартал)
4. **AI Search / GEO**: главная отвечает на запрос в первых 30% страницы (ski ramp — ок), но off-site футпринт слабый — YouTube-канал есть (@INDIEVORG), стоит наращивать упоминания в листиклах «best video editing services» (это сильнейший фактор цитирования в ChatGPT/Perplexity).
5. **Freshness**: контент sp-страниц датируется 2024 — медианный возраст цитируемого AI контента ~500 дней, пора планировать substantive refresh (не только даты!).
6. **3 sp-страницы с одинаковым description** (outsource-кластер) — разнести.
7. 4 AVIF >200KB оставлены как есть (формат уже эффективный, суммарно 1.5MB) — можно пережать при желании.

## Low Priority
- llms.txt — опционально, подтверждённой поддержки нет ни у одного LLM-провайдера.
- Self-host Swiper CSS/JS вместо unpkg/jsdelivr (минус 2 DNS-лукапа).
- detail_reviews-страницы без H1 — noindex, можно игнорировать.

## Two-layer measurement (после деплоя)
- **Классика**: позиции по «video editing services» (KD 22, сейчас 24-я), «video editing agency» (46-я по GSC), органический трафик GSC.
- **AI-слой**: упоминания бренда в ChatGPT/Perplexity по запросам «best video editing services», «unlimited video editing» — отслеживать агрегированно (Ahrefs Brand Radar), разовые проверки нерепрезентативны (<1% повторяемости).
