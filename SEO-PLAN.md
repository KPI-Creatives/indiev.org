# SEO Plan & Keyword Map: indiev.org
## 2026-06-11 · по итогам полного аудита (Ahrefs + GSC + перелинковка + скорость)

## Что сделано в этом проходе

**Скорость**: шрифты TTF/OTF → WOFF2 (838KB → 285KB, −66%), preload двух критичных шрифтов. Ожидаемый эффект на mobile Performance: 58 → ~70+ (замерить после деплоя).

**Перелинковка**: было 3 orphan-страницы без единой входящей ссылки — LA-страница (вошла контекстной ссылкой с главной, анкор «video editor Los Angeles»), `/sp/video-production-consulting` и `/sp/music-video-production-company-los-angeles` (добавлены в сетку «Services We Offer» на всех 34 страницах → по 34 входящих). Остальные страницы и так связаны плотно (33–49 входящих).

**Тексты — переписаны топ-10 страниц** (title с CTR-хуком, meta description ≤160, intro с ценами/сроками/вторичными ключами):

| Страница | Primary keyword | Vol | KD | TP |
|---|---|---|---|---|
| /sp/wedding-video-editing-services | wedding video editing services | 250 | 21 | 600 |
| /sp/real-estate-video-editing-services | real estate video editing services | 200 | 1 | **3200** |
| /sp/remote-video-editing-services | remote video editing | 200 | 1 | **3400** |
| /sp/post-production-video-editing-services | post production video editing (+ video post production services 350/KD0) | 200+350 | 4/0 | 1000 |
| /sp/sports-video-editing-services | sports video editing | 200 | 1 | 80 |
| /sp/video-production-consulting | video production consulting | 200 | 0 | 150 |
| /sp/outsource-youtube-video-editing-services | outsource youtube video editing | 150 | 3 | 100 |
| /sp/outsource-video-editing-services | outsource video editing services | 150 | 14 | 450 |
| /sp/white-label-video-editing-services | white label video editing | 90 | 0 | 20 |
| /sp/social-media-video-editing-services | social media video editing services | 90 | 1 | 30 |

(Главная, /about, /portfolio оптимизированы ранее: unlimited video editing services 1900/KD22, video editing company 600/KD47, video editing portfolio 550-кластер/KD0–1.)

## Новые страницы (keyword gap — рекомендую создать)

1. **/hire-video-editor** — «hire video editor» 600/мес KD1 + «video editor for hire» 450/мес KD1. Самый большой незакрытый кластер с нулевой конкуренцией. Лендинг «найми выделенного редактора» с ценами и сравнением с фрилансом.
2. **/sp/music-video-editing-services** — «music video editing services» 100/мес KD0, CPC $2. Страницы нет вообще.
3. **/sp/podcast-video-editing-services** — «podcast video editing» 150/мес KD62. Высокая сложность, но есть синергия с вашим start-podcast.com (перекрёстные ссылки двух доменов дадут тематический авторитет).
4. **Блог-хаб /blog** — для информационных ключей: «how much does video editing cost» и How-to-кластеры. Фундамент под AI-цитируемость (fan-out coverage).

## Слабые страницы (низкий приоритет, не трогать или объединить)

«4k/gopro/event/reels/interview/instagram/best-online/digital» — volume 0–20. Не переписывать; кандидаты на консолидацию в будущем, если не дадут показов за 6 месяцев (смотреть GSC).

## Двухслойное измерение (после деплоя, чекать раз в месяц)

- Классика: позиции по 13 primary-ключам выше (Ahrefs rank tracker), клики/показы GSC
- AI-слой: упоминания в ChatGPT/Perplexity по «best video editing services», «outsource video editing» (Brand Radar)

## Блокеры вне кода

- GA: property пуста, поток `G-89M62CWQ70` мёртв (503) — пересоздать data stream
- GSC: отправить sitemap после логина
- Off-site: YouTube-канал + листиклы «best video editing services» — сильнейший фактор AI-цитируемости (r=0.735)

## Дополнение по GSC-экспорту (14.05–10.06, данные старого сайта)

7224 показа / 6 кликов — почти весь инвентарь висел на 30–50 позициях (CTR ~0). Подтверждённые цели:

- **hire-кластер**: ~220 показов на позициях 54–96 ещё ДО создания /hire-video-editor («hire video editors» 41, «video editor for hire» 39, «hire wedding video editor» 31, «wedding video editor for hire» 28). Страница создана 11.06 — следить за ростом.
- **«video editing 2026»: 532 показа, позиция 12** — крупнейший quick win. Нет целевой страницы. Рекомендация: статья-тренды «Video Editing in 2026: Trends, Costs, AI Tools» (первый материал блога).
- **Quick wins поз. 4–20**: «video editors» (79 imp, поз. 6.8), «best video editing company» (23, поз. 6.8), GoPro-кластер (40, поз. ~19 — description обновлён), «outsource youtube shorts...bulk» (поз. 4.5).
- **«white label video production»** (101 imp, поз. 47) — вхождение добавлено на white-label страницу.
- wedding-outsourcing кластер (~310 imp суммарно) — самый сильный тематический блок старого сайта; перелинковать wedding ↔ outsource-wedding ↔ hire.
