#!/usr/bin/env node

/**
 * Presentation Portal Generator for Turbase Platform
 * Scans all presentations, detects neural audio completion status,
 * and compiles the Sovereign Presentation Portal (index.html).
 * 
 * Ready presentations with generated audio are fully accessible.
 * Unfinished presentations without audio are locked/disabled or filtered.
 */

const fs = require('fs');
const path = require('path');
const { discoverAllPresentations } = require('./core/incremental_engine');
const { parseFrontmatter } = require('./core/deck_builder');

const rootDir = path.resolve(__dirname, '..');

const CATEGORIES = {
  platform_overview: {
    id: 'platform_overview',
    title: 'Эксплейнер-трилогия платформы',
    icon: '🏔️',
    badge: '3 части',
    desc: 'Основополагающий концептуальный 3-серийный цикл: смена парадигмы, архитектура данных и суверенная экономика'
  },
  overall_presentations: {
    id: 'overall_presentations',
    title: 'Мастер-обзор экосистемы',
    icon: '🏛️',
    badge: '2 части',
    desc: 'Стратегические обзоры: 3-уровневая суверенная топология Leaf-Branch-Trunk и экономическая матрица ценности для 6 групп стейкхолдеров'
  },
  applications_presentations: {
    id: 'applications_presentations',
    title: 'Скоро: Флагманские прикладные решения',
    icon: '🚀',
    badge: '5 приложений · В фокусе: «КубГолос»',
    desc: 'Пакет прикладных сервисов экосистемы прямого владения данными. «КубГолос» находится в фокусе первоочередной доработки и подготовки к нейроозвучке первым по списку, далее «Забота» и «Деловой»'
  },
  architecture_presentations: {
    id: 'architecture_presentations',
    title: 'Инженерная архитектура (7 выпусков)',
    icon: '⚙️',
    badge: '7 выпусков',
    desc: 'Глубокая инженерная спецификация: топология Leaf, конвейер Branch, протоколы P2P/WebRTC, TreeSearch и криптоконтур'
  },
  detailed_overall_impact_presentations: {
    id: 'detailed_overall_impact_presentations',
    title: 'Детальный анализ стейкхолдеров (10 выпусков)',
    icon: '👥',
    badge: '10 выпусков',
    desc: 'Отраслевые глубокие срезы: граждане, безопасность, бизнес/МСП, рекламодатели, AdTech, госсектор, разработчики, финтех и миграция'
  }
};

// Curated metadata enrichment for all 27 presentations
const PRESENTATION_METADATA = {
  // --- PLATFORM OVERVIEW (READY) ---
  'platform_overview/01_paradigm_shift_presentation': {
    customTitle: 'Парадигмальный сдвиг',
    customSubtitle: 'От платформенного монополизма к владению собственной информацией. Личные автономные хранилища и защита семейных архивов.',
    marker: 'ЭКСПЛЕЙНЕР · ЧАСТЬ 1',
    tags: ['Суверенитет данных', 'Личные хранилища', 'Ликвидация утечек', 'Zero-PII']
  },
  'platform_overview/02_architecture_principles_presentation': {
    customTitle: 'Анатомия и Архитектура платформы',
    customSubtitle: 'Неделимые Хранилища, внешние реляционные связи, Общественные Оболочки API и микоризный Интернет данных.',
    marker: 'ЭКСПЛЕЙНЕР · ЧАСТЬ 2',
    tags: ['Хранилища Leaf', 'Оболочки API', 'Микоризная сеть', 'P2P-клиринг']
  },
  'platform_overview/03_sovereign_economy_presentation': {
    customTitle: 'Суверенная экономика и смарт-контракты',
    customSubtitle: 'Двухконтурная модель Турбазы, детерминированные автоматы FSM O(1), Цифровой рубль ЦБ РФ и P2P-клиринг.',
    marker: 'ЭКСПЛЕЙНЕР · ЧАСТЬ 3',
    tags: ['Цифровой рубль', 'FSM O(1)', 'Экономика API 1/N', 'Zero-PII']
  },

  // --- OVERALL PRESENTATIONS (READY) ---
  'overall_presentations/01_sovereign_architecture_presentation': {
    customTitle: 'Архитектура Цифрового Суверенитета',
    customSubtitle: 'Трёхуровневая распределённая топология Leaf-Branch-Trunk, прямое владение данными и защищённые вычисления.',
    marker: 'МАСТЕР-ОБЗОР · СИСТЕМА',
    tags: ['Leaf-Branch-Trunk', '152-ФЗ Zero-PII', 'Криптоконтур', 'Федеративный поиск']
  },
  'overall_presentations/02_stakeholders_benefits_presentation': {
    customTitle: 'Матрица Ценности для Стейкхолдеров',
    customSubtitle: 'Комплексный анализ выгод и экономических сценариев запуска для граждан, МСП, AdTech, финтеха и государства.',
    marker: 'МАСТЕР-ОБЗОР · ЭКОНОМИКА',
    tags: ['6 Стейкхолдеров', 'TCO -85%', 'Игра с + суммой', 'Локальный таргетинг']
  },

  // --- APPLICATIONS (COMING SOON / СКОРО) ---
  'applications_presentations/01_kubgolos_app_presentation': {
    customTitle: 'Платформа «КубГолос»',
    customSubtitle: 'Одноранговые микро-опросы, легитимное голосование и защита мнений в локальных сообществах и коллективах.',
    marker: 'ПРИЛОЖЕНИЕ · ВЫПУСК 1',
    tags: ['Микро-опросы', 'Криптография', 'Локальное волеизъявление', 'В фокусе'],
    isNextInLine: true
  },
  'applications_presentations/02_zabota_app_presentation': {
    customTitle: 'Платформа «Забота»',
    customSubtitle: 'Взаимопомощь, открытая децентрализованная репутация и доверенные круги взаимоподдержки жителей.',
    marker: 'ПРИЛОЖЕНИЕ · ВЫПУСК 2',
    tags: ['Взаимопомощь', 'Открытая репутация', 'Доверенные круги']
  },
  'applications_presentations/03_delovoy_app_presentation': {
    customTitle: 'Органайзер «Деловой»',
    customSubtitle: 'Автономное планирование, локальные календари и P2P-координация задач прямого владения данными без внешних облаков и слежки.',
    marker: 'ПРИЛОЖЕНИЕ · ВЫПУСК 3',
    tags: ['Органайзер', 'Локальный Leaf', 'P2P-синхронизация', 'Оффлайн-режим']
  },
  'applications_presentations/04_uratur_app_presentation': {
    customTitle: 'Платформа «УраТур»',
    customSubtitle: 'Автономный навигатор путешествий прямого владения данными и локальные маршруты без грабительских комиссий платформам-монополиям.',
    marker: 'ПРИЛОЖЕНИЕ · ВЫПУСК 4',
    tags: ['Туризм', '0% комиссии платформ', 'Прямые расчеты', 'P2P']
  },
  'applications_presentations/05_local_services_presentation': {
    customTitle: 'Локальные Сервисы и Реестр МСП',
    customSubtitle: 'Районная экономика, локальные каталоги услуг и независимая кооперация малого бизнеса.',
    marker: 'ПРИЛОЖЕНИЕ · ЭКОСИСТЕМА',
    tags: ['Реестр МСП', 'Районная экономика', 'Прямая кооперация']
  },

  // --- ARCHITECTURE (DRAFT) ---
  'architecture_presentations/01_topology_and_sovereignty': {
    customTitle: 'Топология и Суверенитет',
    customSubtitle: 'Трёхуровневая топология прямого владения данными (Leaf-Branch-Trunk) и парадигма Edge Computing.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 1',
    tags: ['Leaf-Branch-Trunk', 'Edge Computing', 'Zero-PII', 'Децентрализация']
  },
  'architecture_presentations/02_leaf_storage_engine': {
    customTitle: 'Локальное хранилище Leaf',
    customSubtitle: 'Архитектура узла «Лист»: встроенная СУБД SQLite, трехколоночная модель и реляционный микро-чейн.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 2',
    tags: ['SQLite', 'Микро-чейн', 'Составные ключи', 'Локальный Leaf']
  },
  'architecture_presentations/03_app_framework_and_sdk': {
    customTitle: 'Фреймворк приложений и SDK',
    customSubtitle: 'Прикладной каркас (Framework), инструментарий разработчика и реактивная среда исполнения On-Device.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 3',
    tags: ['SDK разработчика', 'Каркас приложений', 'Реактивный UI', 'On-Device']
  },
  'architecture_presentations/04_branch_pipeline_and_storage': {
    customTitle: 'Конвейер Ветки и хранилище',
    customSubtitle: 'Архитектура узла «Ветка»: конвейер обработки данных, надёжность хранения и кэширующий буфер.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 4',
    tags: ['Узел Ветка', 'Конвейер данных', 'Локальный кэш', 'P2P-буфер']
  },
  'architecture_presentations/05_routing_p2p_and_passthrough': {
    customTitle: 'Сетевая маршрутизация и P2P',
    customSubtitle: 'Сетевой стек, одноранговые P2P WebRTC-соединения, NAT Traversal и ведомственные сквозные туннели.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 5',
    tags: ['WebRTC', 'P2P-туннели', 'NAT Traversal', 'Защищенные каналы']
  },
  'architecture_presentations/06_tree_search_and_analytics': {
    customTitle: 'Поиск TreeSearch и аналитика',
    customSubtitle: 'Древовидный глобальный поиск TreeSearch, хэш-индексы и федеративная конфиденциальная аналитика.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 6',
    tags: ['TreeSearch', 'Федеративная аналитика', 'Хэш-индексы', 'Privacy']
  },
  'architecture_presentations/07_cryptography_and_api_economy': {
    customTitle: 'Криптография и экономика API',
    customSubtitle: 'Криптографический стек ГОСТ/PQC, экономика совместного использования API (1/N) и микроплатежи.',
    marker: 'АРХИТЕКТУРА · ВЫПУСК 7',
    tags: ['ГОСТ / PQC', 'Экономика API 1/N', 'Микроплатежи', 'Смарт-контракты']
  },

  // --- STAKEHOLDERS (DRAFT) ---
  'detailed_overall_impact_presentations/01_citizens_presentation': {
    customTitle: 'Граждане и Домохозяйства',
    customSubtitle: 'Владение собственной информацией, священный семейный архив и абсолютная защита личной тайны.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 1',
    tags: ['Личная тайна', 'Семейный архив', '0% утечек', 'Автономия']
  },
  'detailed_overall_impact_presentations/02_security_organs_presentation': {
    customTitle: 'Органы Безопасности и Правопорядка',
    customSubtitle: 'Неуязвимый суверенный криптоконтур, ликвидация баз-мишеней и математический аудит доступа.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 2',
    tags: ['Суверенный контур', 'Ликвидация баз-мишеней', 'ГОСТ', 'Аудит']
  },
  'detailed_overall_impact_presentations/03_business_sme_presentation': {
    customTitle: 'Малый, Средний и Крупный Бизнес',
    customSubtitle: 'Снижение IT TCO на 85%, локальный учет, независимость от подписок и прямая торговля без посредников.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 3',
    tags: ['TCO -85%', 'Прямая торговля', 'Локальный POS', 'Без комиссий']
  },
  'detailed_overall_impact_presentations/04_advertisers_presentation': {
    customTitle: 'Рекламодатели и Бренды',
    customSubtitle: '100% релевантный On-Device таргетинг, рост конверсий в 3–4 раза и криптографическая атрибуция.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 4',
    tags: ['On-Device таргетинг', 'Конверсии х3', 'Честная атрибуция', 'Без фрода']
  },
  'detailed_overall_impact_presentations/05_ad_platforms_presentation': {
    customTitle: 'Рекламные Платформы и AdTech',
    customSubtitle: 'Федеративная дистрибуция, ликвидация клик-фрода и сокращение серверных затрат на 80%.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 5',
    tags: ['Федеративная сеть', 'Серверы -80%', '0% клик-фрода', 'Приватность']
  },
  'detailed_overall_impact_presentations/06_government_infra_presentation': {
    customTitle: 'Государство и Муниципалитеты',
    customSubtitle: 'Устойчивые госуслуги, разгрузка ЦОД на 80%, 152-ФЗ Zero-PII и непрерывность при любых ЧС.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 6',
    tags: ['Разгрузка ЦОД 80%', 'Непрерывность при ЧС', '152-ФЗ', 'Устойчивость']
  },
  'detailed_overall_impact_presentations/07_it_developers_presentation': {
    customTitle: 'ИТ-Разработчики и Инженеры',
    customSubtitle: 'Serverless Edge, экономика совместного вызова API (1/N) и софт без абонентской платы за серверы.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 7',
    tags: ['Serverless Edge', 'Экономика 1/N', '0 серверных расходов', 'SDK']
  },
  'detailed_overall_impact_presentations/08_fintech_banking_presentation': {
    customTitle: 'Банки, Финтех и Цифровой Рубль',
    customSubtitle: 'On-Device скоринг, эскроу смарт-контракты и 0% риска утечки банковской тайны.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 8',
    tags: ['Цифровой рубль', 'On-Device скоринг', 'Эскроу FSM', 'Банковская тайна']
  },
  'detailed_overall_impact_presentations/09_cross_synergies_presentation': {
    customTitle: 'Межотраслевая Синергия и Сетевые Эффекты',
    customSubtitle: 'Игра с положительной суммой и маховик национальной распределенной цифровой экономики.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 9',
    tags: ['Сетевые эффекты', 'Маховик экономики', 'Игра с + суммой', 'P2P-рынки']
  },
  'detailed_overall_impact_presentations/10_migration_roadmap_presentation': {
    customTitle: 'Дорожная Карта и Legacy-мосты',
    customSubtitle: 'Бесшовный поэтапный переход к распределенному Edge без остановки текущих процессов.',
    marker: 'СТЕЙКХОЛДЕРЫ · ВЫПУСК 10',
    tags: ['Legacy-мосты', 'Поэтапный переход', 'Гибридный контур', 'План 2026-2028']
  }
};

const WHITEPAPERS = [
  {
    num: '01',
    marker: 'БЕЛАЯ КНИГА · 01',
    title: 'Белая книга 01: Концептуальный обзор платформы',
    desc: 'Парадигмальный сдвиг децентрализации, трехуровневая модель «Лист — Ветка — Ствол», 152-ФЗ Zero-PII и снижение TCO на 90%.',
    mdPath: 'shared_docs/whitepapers/01_platform_overview_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/01_platform_overview_whitepaper.pdf',
    isReady: false,
    tags: ['📊 15 страниц', 'Суверенитет', 'Zero-PII', 'TCO -90%', 'Edge Computing']
  },
  {
    num: '02',
    marker: 'БЕЛАЯ КНИГА · 02',
    title: 'Белая книга 02: Пакет флагманских прикладных решений',
    desc: 'Прикладные алгоритмы прямого владения данными: «КубГолос», «Забота», «Деловой», «УраТур», реестр МСП и Branch-шлюзы ЕСИА, СБП, ГИС ЖКХ.',
    mdPath: 'shared_docs/whitepapers/02_applications_suite_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/02_applications_suite_whitepaper.pdf',
    isReady: false,
    tags: ['📊 15 страниц', 'КубГолос', 'Забота', 'Деловой', 'Шлюзы ЕСИА/СБП']
  },
  {
    num: '03',
    marker: 'БЕЛАЯ КНИГА · 03',
    title: 'Белая книга 03: Инженерная спецификация архитектуры',
    desc: 'Реляционная модель AirEntity, встраиваемый SQLite на Листе, Read-Anywhere Write-Self, конвейер Branch, P2P/WebRTC и TreeSearch.',
    mdPath: 'shared_docs/whitepapers/03_engineering_architecture_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/03_engineering_architecture_whitepaper.pdf',
    isReady: false,
    tags: ['📊 15 страниц', 'SQLite', 'Branch Pipeline', 'P2P/WebRTC', 'TreeSearch']
  },
  {
    num: '04',
    marker: 'БЕЛАЯ КНИГА · 04',
    title: 'Белая книга 04: Экосистемный анализ стейкхолдеров',
    desc: 'Матрица выигрыша для 10 категорий участников (граждане, бизнес, AdTech, финтех, государство), расчет экономии TCO и 4-фазная миграция.',
    mdPath: 'shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/04_ecosystem_impact_whitepaper.pdf',
    isReady: false,
    tags: ['📊 15 страниц', '10 Участников', 'TCO анализ', 'Экосистема', 'Миграция']
  },
  {
    num: '05',
    marker: 'БЕЛАЯ КНИГА · 05',
    title: 'Белая книга 05: Суверенное управление и регуляторный контур',
    desc: 'Юридический комплаенс 152-ФЗ, ведомственная юрисдикция, подписи ГОСТ Р 34.10-2012, неизменяемый аудит и доверенный контур БРИКС+.',
    mdPath: 'shared_docs/whitepapers/05_sovereign_governance_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/05_sovereign_governance_whitepaper.pdf',
    isReady: false,
    tags: ['📊 15 страниц', '152-ФЗ Zero-PII', 'ГОСТ Р 34.10', 'БРИКС+', 'Аудит']
  },
  {
    num: '06',
    marker: 'БЕЛАЯ КНИГА · 06 · ЦБ РФ',
    title: 'Белая книга 06: Смарт-контракты Банка России и FSM O(1)',
    desc: 'Официальный отзыв на Концепцию ПКСК ЦБ РФ: детерминированные автоматы состояний (FSM) O(1), Zero-PII, бестерминальность и интеграция с Цифровым рублем.',
    mdPath: 'shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md',
    pdfPath: 'shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.pdf',
    isReady: true,
    tags: ['📊 15 страниц', 'Банк России', 'FSM O(1)', 'Цифровой рубль', 'Экспертный отзыв']
  },
  {
    num: 'DOC',
    marker: 'ТЕХНИЧЕСКИЙ ДОКУМЕНТ',
    title: 'Технический документ платформы «Турбаза»',
    desc: 'Сводный фундаментальный документ архитектуры распределенных вычислений, суверенных данных и открытого стека AIRport.',
    mdPath: 'shared_docs/Технический документ платформы Турбаза.md',
    pdfPath: 'shared_docs/Технический документ платформы Турбаза.pdf',
    isReady: false,
    tags: ['Архитектура', 'Спецификация', 'Leaf-Branch-Trunk', 'AIRport Stack']
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function scanAllPresentations() {
  const presentationDirs = discoverAllPresentations(rootDir);
  const items = [];

  for (const presDir of presentationDirs) {
    const rel = path.relative(rootDir, presDir).replace(/\\/g, '/');
    const [catKey, dirName] = rel.split('/');

    const deckMd = path.join(presDir, 'docs', 'presentation_deck.md');
    let meta = {};
    if (fs.existsSync(deckMd)) {
      const raw = fs.readFileSync(deckMd, 'utf8');
      meta = parseFrontmatter(raw).meta;
    }

    const audioDir = path.join(presDir, 'generated', 'artifacts', 'audio');
    const mp3s = fs.existsSync(audioDir) ? fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3')) : [];
    const hasAudio = mp3s.length > 0;
    const audioCount = mp3s.length;

    const webDeckIndex = path.join(presDir, 'generated', 'outputs', 'web_deck', 'index.html');
    const hasWebDeck = fs.existsSync(webDeckIndex);

    const pdfDir = path.join(presDir, 'generated', 'outputs', 'pdf');
    const pdfs = fs.existsSync(pdfDir)
      ? fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf')).map(f => ({
          name: f,
          path: path.relative(rootDir, path.join(pdfDir, f)).replace(/\\/g, '/')
        }))
      : [];

    const curated = PRESENTATION_METADATA[rel] || {};

    const title = curated.customTitle || meta.header_subtitle || meta.title || dirName;
    const subtitle = curated.customSubtitle || meta.subtitle || '';
    const marker = curated.marker || (meta.header_title || 'ТУРБАЗА');
    const tags = curated.tags || ['Архитектура', 'Edge Computing', 'Суверенитет'];

    items.push({
      dir: rel,
      dirName,
      catKey,
      title,
      subtitle,
      marker,
      tags,
      slidesCount: meta.total_slides || 15,
      hasAudio,
      audioCount,
      hasWebDeck,
      webDeckUrl: hasWebDeck ? `${rel}/generated/outputs/web_deck/index.html` : null,
      isNextInLine: Boolean(curated.isNextInLine),
      isComingSoon: catKey === 'applications_presentations',
      pdfs
    });
  }

  return items;
}

function buildPortalHtml(items) {
  const readyCount = items.filter(i => i.hasAudio).length;
  const totalCount = items.length;
  const draftCount = totalCount - readyCount;
  const totalAudios = items.reduce((acc, cur) => acc + cur.audioCount, 0);

  // Group items by category
  const grouped = {};
  for (const key of Object.keys(CATEGORIES)) {
    grouped[key] = items.filter(i => i.catKey === key);
  }

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Платформа «Турбаза» — Портал Презентационного Комплекса</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #070b14;
      --bg-surface: #0e1626;
      --bg-card: #121c32;
      --bg-card-hover: #17243f;
      --border-subtle: rgba(255, 255, 255, 0.12);
      --border-focus: rgba(56, 189, 248, 0.45);
      --gold: #facc15;
      --gold-dim: rgba(250, 204, 21, 0.15);
      --cyan: #38bdf8;
      --cyan-dim: rgba(56, 189, 248, 0.14);
      --emerald: #10b981;
      --emerald-dim: rgba(16, 185, 129, 0.15);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-dark);
      color: var(--text-main);
      line-height: 1.5;
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient Background Gradients */
    .ambient-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .ambient-glow-1 {
      position: absolute;
      top: -150px;
      left: 20%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(7, 11, 20, 0) 70%);
      filter: blur(80px);
    }
    .ambient-glow-2 {
      position: absolute;
      top: 300px;
      right: 10%;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, rgba(7, 11, 20, 0) 70%);
      filter: blur(90px);
    }

    .container {
      max-width: 1540px;
      margin: 0 auto;
      padding: 32px 28px 80px;
      position: relative;
      z-index: 1;
    }

    /* ==================== HERO HEADER ==================== */
    .hero-header {
      padding: 36px 0 28px;
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 32px;
    }

    .hero-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .brand-logo-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(250, 204, 21, 0.15);
      border: 1.5px solid var(--gold);
      padding: 6px 14px;
      border-radius: 8px;
      color: var(--gold);
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
      color: var(--cyan);
      font-weight: 600;
    }

    .hero-title {
      font-size: 42px;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #ffffff 40%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      font-size: 19px;
      color: var(--text-muted);
      max-width: 980px;
      font-weight: 400;
      line-height: 1.55;
    }

    /* ==================== STATS METRICS ROW ==================== */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-top: 28px;
    }

    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 18px 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;
      overflow: hidden;
      transition: var(--transition);
    }
    .stat-card:hover {
      border-color: rgba(255, 255, 255, 0.22);
      transform: translateY(-2px);
    }
    .stat-card.ready-stat {
      border-color: rgba(16, 185, 129, 0.35);
      background: linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, var(--bg-surface) 100%);
    }
    .stat-card.coming-soon-stat {
      border-color: rgba(250, 204, 21, 0.35);
      background: linear-gradient(145deg, rgba(250, 204, 21, 0.08) 0%, var(--bg-surface) 100%);
    }

    .stat-number {
      font-size: 36px;
      font-weight: 900;
      line-height: 1;
      font-family: var(--font-mono);
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .stat-card.ready-stat .stat-number { color: var(--emerald); }
    .stat-card.audio-stat .stat-number { color: var(--cyan); }
    .stat-card.total-stat .stat-number { color: var(--gold); }
    .stat-card.zero-pii .stat-number { color: #a78bfa; }

    .stat-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
    }
    .stat-desc {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* ==================== CONTROLS / FILTER BAR ==================== */
    .controls-bar {
      background: rgba(14, 22, 38, 0.85);
      backdrop-filter: blur(14px);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: sticky;
      top: 16px;
      z-index: 50;
      box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.6);
    }

    .controls-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 14px;
    }

    /* Mode Switcher Tabs */
    .mode-switch-group {
      display: inline-flex;
      background: rgba(7, 11, 20, 0.8);
      padding: 4px;
      border-radius: 10px;
      border: 1px solid var(--border-subtle);
    }

    .mode-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      background: transparent;
      color: var(--text-muted);
      transition: var(--transition);
    }
    .mode-tab:hover {
      color: var(--text-main);
    }
    .mode-tab.active {
      background: var(--bg-card);
      color: var(--text-main);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
    .mode-tab.active.ready-mode {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.45);
    }
    .mode-tab.active.featured-mode {
      background: rgba(250, 204, 21, 0.16);
      color: #fde047;
      border: 1px solid rgba(250, 204, 21, 0.45);
    }

    .tab-badge {
      background: rgba(255, 255, 255, 0.12);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-family: var(--font-mono);
      font-weight: 700;
    }
    .mode-tab.active.ready-mode .tab-badge {
      background: var(--emerald);
      color: #070b14;
    }
    .mode-tab.active.featured-mode .tab-badge {
      background: var(--gold);
      color: #070b14;
    }

    /* Search Input */
    .search-wrapper {
      position: relative;
      flex: 1;
      max-width: 440px;
      min-width: 260px;
    }
    .search-input {
      width: 100%;
      background: rgba(7, 11, 20, 0.85);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 10px 14px 10px 38px;
      font-size: 14px;
      color: var(--text-main);
      font-family: var(--font-sans);
      outline: none;
      transition: var(--transition);
    }
    .search-input:focus {
      border-color: var(--cyan);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--text-dim);
      pointer-events: none;
    }

    /* Category Filter Pills */
    .category-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 12px;
    }

    .cat-pill {
      background: transparent;
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .cat-pill:hover {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .cat-pill.active {
      background: rgba(56, 189, 248, 0.16);
      border-color: var(--cyan);
      color: #7dd3fc;
    }

    /* ==================== CONTENT SECTIONS ==================== */
    .section-block {
      margin-bottom: 48px;
    }

    .section-header {
      margin-bottom: 20px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 12px;
    }

    .section-title-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-icon {
      font-size: 24px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--text-main);
    }

    .section-badge {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--gold);
    }

    .section-desc {
      font-size: 14px;
      color: var(--text-muted);
      width: 100%;
      margin-top: 4px;
    }

    /* Cards Grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 20px;
    }

    /* ==================== CARD STYLES ==================== */
    .pres-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      transition: var(--transition);
      overflow: hidden;
    }

    /* Glow border effect on ready cards */
    .pres-card.is-ready {
      border-color: rgba(16, 185, 129, 0.38);
      background: linear-gradient(165deg, rgba(16, 185, 129, 0.06) 0%, var(--bg-card) 60%);
      box-shadow: 0 10px 28px -12px rgba(16, 185, 129, 0.2);
    }
    .pres-card.is-ready:hover {
      border-color: rgba(16, 185, 129, 0.7);
      transform: translateY(-3px);
      box-shadow: 0 18px 36px -12px rgba(16, 185, 129, 0.35);
    }

    /* Highlighted Next-In-Line Card («КубГолос») */
    .pres-card.is-next {
      border: 2px solid rgba(250, 204, 21, 0.75);
      background: linear-gradient(165deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.05) 45%, var(--bg-card) 90%);
      box-shadow: 0 12px 32px -10px rgba(250, 204, 21, 0.3), 0 0 22px rgba(250, 204, 21, 0.15);
    }
    .pres-card.is-next:hover {
      border-color: rgba(250, 204, 21, 1);
      transform: translateY(-3px);
      box-shadow: 0 18px 42px -10px rgba(250, 204, 21, 0.5), 0 0 32px rgba(250, 204, 21, 0.25);
    }

    /* General Coming Soon Cards */
    .pres-card.is-coming-soon {
      border-color: rgba(56, 189, 248, 0.28);
      background: linear-gradient(165deg, rgba(56, 189, 248, 0.05) 0%, var(--bg-card) 75%);
    }
    .pres-card.is-coming-soon:hover {
      border-color: rgba(56, 189, 248, 0.55);
      transform: translateY(-2px);
    }

    /* Draft / Locked Card */
    .pres-card.is-draft {
      opacity: 0.65;
      background: rgba(18, 28, 50, 0.45);
      border-color: rgba(255, 255, 255, 0.08);
    }
    .pres-card.is-draft:hover {
      opacity: 0.85;
      border-color: rgba(255, 255, 255, 0.16);
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      gap: 10px;
    }

    .card-marker {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
    }
    .pres-card.is-ready .card-marker {
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
    }
    .card-marker.is-next-marker {
      background: rgba(250, 204, 21, 0.2) !important;
      color: #fde047 !important;
      border: 1px solid rgba(250, 204, 21, 0.55) !important;
    }

    .card-status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
    }
    .status-ready {
      background: rgba(16, 185, 129, 0.18);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.45);
    }
    .status-ready .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulse-dot 2s infinite ease-in-out;
    }
    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.6; }
    }

    .status-next {
      background: rgba(250, 204, 21, 0.2);
      color: #fef08a;
      border: 1px solid rgba(250, 204, 21, 0.6);
      font-weight: 800;
    }
    .status-next .status-dot-next {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #facc15;
      box-shadow: 0 0 10px #facc15;
      animation: pulse-next 1.5s infinite ease-in-out;
    }
    @keyframes pulse-next {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.65; }
    }

    .status-soon {
      background: rgba(56, 189, 248, 0.16);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.4);
    }

    .status-draft {
      background: rgba(250, 204, 21, 0.1);
      color: #facc15;
      border: 1px solid rgba(250, 204, 21, 0.25);
    }

    .card-title {
      font-size: 20px;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 10px;
      color: var(--text-main);
    }

    .card-subtitle {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 16px;
      flex-grow: 1;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }

    .tag-pill {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-dim);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .pres-card.is-ready .tag-pill {
      background: rgba(56, 189, 248, 0.08);
      color: #93c5fd;
      border-color: rgba(56, 189, 248, 0.15);
    }

    /* Card Action Footer */
    .card-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .btn-launch {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      font-weight: 800;
      font-size: 14px;
      padding: 12px 18px;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
      transition: var(--transition);
      border: none;
      cursor: pointer;
    }
    .btn-launch:hover {
      background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
    }

    .btn-next-launch {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #facc15 0%, #ca8a04 100%);
      color: #070b14;
      font-weight: 900;
      font-size: 14px;
      padding: 12px 18px;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(250, 204, 21, 0.4);
      transition: var(--transition);
      border: none;
      cursor: pointer;
    }
    .btn-next-launch:hover {
      background: linear-gradient(135deg, #fef08a 0%, #eab308 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(250, 204, 21, 0.6);
      color: #000;
    }

    .btn-preview {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: rgba(56, 189, 248, 0.12);
      color: #7dd3fc;
      font-weight: 700;
      font-size: 13px;
      padding: 12px 18px;
      border-radius: 8px;
      text-decoration: none;
      border: 1px solid rgba(56, 189, 248, 0.3);
      transition: var(--transition);
    }
    .btn-preview:hover {
      background: rgba(56, 189, 248, 0.22);
      color: #ffffff;
      border-color: rgba(56, 189, 248, 0.65);
      transform: translateY(-1px);
    }

    .btn-locked {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-dim);
      font-weight: 700;
      font-size: 13px;
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px dashed rgba(255, 255, 255, 0.14);
      cursor: not-allowed;
      user-select: none;
    }

    .btn-pdf {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 11px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      transition: var(--transition);
      white-space: nowrap;
    }
    .btn-pdf:hover {
      background: rgba(255, 255, 255, 0.12);
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.25);
    }

    /* ==================== WHITEPAPERS SECTION ==================== */
    .whitepapers-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 32px;
      margin-top: 56px;
    }

    .whitepaper-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }

    .whitepaper-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      text-decoration: none;
      color: inherit;
      transition: var(--transition);
    }
    .whitepaper-card:hover {
      border-color: var(--cyan);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

    .wp-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .wp-num {
      background: var(--cyan-dim);
      color: var(--cyan);
      border: 1px solid rgba(56, 189, 248, 0.35);
      font-family: var(--font-mono);
      font-weight: 800;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .wp-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }
    .wp-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.45;
    }
    .wp-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: var(--cyan);
      font-weight: 700;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    /* ==================== FOOTER ==================== */
    .portal-footer {
      margin-top: 64px;
      padding-top: 32px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      color: var(--text-dim);
      font-size: 13px;
    }
    .footer-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .footer-commands {
      font-family: var(--font-mono);
      font-size: 12px;
      background: rgba(0, 0, 0, 0.3);
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
    }

    /* Responsive */
    @media (max-width: 900px) {
      .hero-title { font-size: 32px; }
      .cards-grid { grid-template-columns: 1fr; }
      .whitepaper-grid { grid-template-columns: 1fr; }
      .controls-bar { position: static; }
      .search-wrapper { max-width: 100%; width: 100%; }
    }
  </style>
</head>
<body>

  <div class="ambient-bg">
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>
  </div>

  <div class="container">

    <!-- HERO HEADER -->
    <header class="hero-header">
      <div class="hero-top">
        <div class="brand-group">
          <div class="brand-logo-pill">
            <span>🌲</span> ТУРБАЗА
          </div>
          <span class="brand-badge">Sovereign Edge Computing</span>
        </div>
        <div class="header-status">
          <span class="card-status-pill status-ready">
            <span class="status-dot"></span>
            ${readyCount} готовых презентаций с нейроозвучкой (${totalAudios} слайдов)
          </span>
        </div>
      </div>

      <h1 class="hero-title">Портал Презентационного Комплекса</h1>
      <p class="hero-subtitle">
        Единый каталог интерактивных слайд-деков, архитектурных спецификаций и белых книг платформы цифрового суверенитета «Турбаза».
        Переход от платформенного монополизма к прямому владению собственной информацией на периферийных устройствах.
      </p>

      <!-- KEY METRICS ROW -->
      <div class="stats-row">
        <div class="stat-card ready-stat">
          <div class="stat-number">${readyCount} <span style="font-size: 16px; font-weight: 600;">/ ${totalCount}</span></div>
          <div class="stat-label">Озвучено и готово</div>
          <div class="stat-desc">Завершённые презентации с дикторским звуком</div>
        </div>

        <div class="stat-card coming-soon-stat">
          <div class="stat-number" style="color: var(--gold);">${grouped.applications_presentations ? grouped.applications_presentations.length : 5} <span style="font-size: 14px; font-weight: 800; color: #fde047;">(След: «КубГолос»)</span></div>
          <div class="stat-label">Раздел «Скоро»</div>
          <div class="stat-desc">5 флагманских приложений · КубГолос в фокусе</div>
        </div>

        <div class="stat-card audio-stat">
          <div class="stat-number">${totalAudios}</div>
          <div class="stat-label">Слайдов с аудио</div>
          <div class="stat-desc">Синхронная нейроозвучка (Edge DmitryNeural)</div>
        </div>

        <div class="stat-card zero-pii">
          <div class="stat-number">100%</div>
          <div class="stat-label">Автономность и Zero-PII</div>
          <div class="stat-desc">Локальная работа без облачных утечек данных</div>
        </div>
      </div>
    </header>

    <!-- INTERACTIVE CONTROLS & FILTER BAR -->
    <nav class="controls-bar" id="controlsBar">
      <div class="controls-top">
        <!-- Mode Switcher Tabs -->
        <div class="mode-switch-group">
          <button class="mode-tab active featured-mode" id="btnModeFeatured" data-mode="featured">
            <span>🌟 Главная: Релизы и «Скоро»</span>
            <span class="tab-badge">${readyCount + (grouped.applications_presentations ? grouped.applications_presentations.length : 5)}</span>
          </button>
          <button class="mode-tab" id="btnModeReady" data-mode="ready">
            <span>🎙️ Только с озвучкой</span>
            <span class="tab-badge">${readyCount}</span>
          </button>
          <button class="mode-tab" id="btnModeAll" data-mode="all">
            <span>📋 Вся дорожная карта</span>
            <span class="tab-badge">${totalCount}</span>
          </button>
        </div>

        <!-- Search Input -->
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input type="text" id="searchInput" class="search-input" placeholder="Поиск по темам, слайдам, технологиям..." autocomplete="off">
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-pills" id="categoryPills">
        <button class="cat-pill active" data-cat="all">Все разделы (${totalCount})</button>
        <button class="cat-pill" data-cat="platform_overview">🏔️ Эксплейнеры (${grouped.platform_overview ? grouped.platform_overview.filter(i => i.hasAudio).length : 0}/${grouped.platform_overview ? grouped.platform_overview.length : 0})</button>
        <button class="cat-pill" data-cat="overall_presentations">🏛️ Мастер-обзор (${grouped.overall_presentations ? grouped.overall_presentations.filter(i => i.hasAudio).length : 0}/${grouped.overall_presentations ? grouped.overall_presentations.length : 0})</button>
        <button class="cat-pill" data-cat="applications_presentations">⏳ Скоро: Приложения (${grouped.applications_presentations ? grouped.applications_presentations.length : 0})</button>
        <button class="cat-pill" data-cat="architecture_presentations">⚙️ Архитектура (${grouped.architecture_presentations ? grouped.architecture_presentations.filter(i => i.hasAudio).length : 0}/${grouped.architecture_presentations ? grouped.architecture_presentations.length : 0})</button>
        <button class="cat-pill" data-cat="detailed_overall_impact_presentations">👥 Стейкхолдеры (${grouped.detailed_overall_impact_presentations ? grouped.detailed_overall_impact_presentations.filter(i => i.hasAudio).length : 0}/${grouped.detailed_overall_impact_presentations ? grouped.detailed_overall_impact_presentations.length : 0})</button>
        <button class="cat-pill" data-cat="whitepapers">📑 Белые книги (${WHITEPAPERS.filter(w => w.isReady).length}/${WHITEPAPERS.length})</button>
      </div>
    </nav>

    <!-- DYNAMIC STATUS NOTICE -->
    <div id="filterNotice" style="margin-bottom: 24px; font-size: 14px; color: var(--text-muted); display: none;">
      Отображается: <strong id="matchingCount" style="color: var(--text-main);">0</strong> презентаций.
    </div>

    <!-- PRESENTATIONS SECTIONS -->
    <main id="presentationsCatalog">
${Object.entries(CATEGORIES).map(([catKey, catMeta]) => {
  const catItems = grouped[catKey] || [];
  if (catItems.length === 0) return '';
  const readyCatItems = catItems.filter(i => i.hasAudio).length;

  return `
      <!-- CATEGORY: ${catMeta.title} -->
      <section class="section-block" data-category="${catKey}">
        <div class="section-header">
          <div class="section-title-group">
            <span class="section-icon">${catMeta.icon}</span>
            <h2 class="section-title">${escapeHtml(catMeta.title)}</h2>
            <span class="section-badge">${readyCatItems}/${catItems.length} готово</span>
          </div>
          <p class="section-desc">${escapeHtml(catMeta.desc)}</p>
        </div>

        <div class="cards-grid">
${catItems.map(item => {
  const isReady = item.hasAudio;
  const isNext = Boolean(item.isNextInLine);
  const isComingSoon = Boolean(item.isComingSoon);
  const pdfLink = item.pdfs && item.pdfs.length > 0 ? item.pdfs[0].path : null;

  let cardClasses = 'pres-card';
  if (isReady) cardClasses += ' is-ready';
  else if (isNext) cardClasses += ' is-coming-soon is-next';
  else if (isComingSoon) cardClasses += ' is-coming-soon';
  else cardClasses += ' is-draft';

  return `
          <!-- Card: ${escapeHtml(item.dir)} -->
          <article class="${cardClasses}"
                   data-card
                   data-ready="${isReady ? 'true' : 'false'}"
                   data-coming-soon="${isComingSoon ? 'true' : 'false'}"
                   data-next="${isNext ? 'true' : 'false'}"
                   data-category="${catKey}"
                   data-search="${escapeHtml((item.title + ' ' + item.subtitle + ' ' + item.tags.join(' ') + ' ' + item.dirName).toLowerCase())}">
            
            <div>
              <div class="card-top">
                <span class="card-marker${isNext ? ' is-next-marker' : ''}">${escapeHtml(item.marker)}</span>
                ${isReady 
                  ? `<span class="card-status-pill status-ready"><span class="status-dot"></span> Готово (${item.audioCount} аудио)</span>`
                  : isNext
                    ? `<span class="card-status-pill status-next"><span class="status-dot-next"></span> 🔥 Следующий релиз</span>`
                    : isComingSoon
                      ? `<span class="card-status-pill status-soon">⏳ Скоро</span>`
                      : `<span class="card-status-pill status-draft">📐 В разработке</span>`
                }
              </div>

              <h3 class="card-title">${escapeHtml(item.title)}</h3>
              <p class="card-subtitle">${escapeHtml(item.subtitle)}</p>

              <div class="card-tags">
                <span class="tag-pill">📊 ${item.slidesCount} слайдов</span>
                ${item.tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('\n                ')}
              </div>
            </div>

            <div class="card-actions">
              ${isReady
                ? `
              <a href="${item.webDeckUrl}" class="btn-launch" title="Запустить интерактивную презентацию с аудио">
                ▶ Смотреть (${item.slidesCount} сл.)
              </a>
              ${pdfLink ? `<a href="${pdfLink}" target="_blank" class="btn-pdf" title="Скачать PDF с текстом диктора">📄 PDF</a>` : ''}
                `
                : isNext
                  ? `
              <a href="${item.webDeckUrl}" class="btn-next-launch" title="Предпросмотр слайдов «КубГолос» (в фокусе следующей доработки)">
                🚀 Предпросмотр слайдов (${item.slidesCount} сл.)
              </a>
              ${pdfLink ? `<a href="${pdfLink}" target="_blank" class="btn-pdf" title="Скачать PDF">📄 PDF</a>` : ''}
                  `
                  : isComingSoon
                    ? `
              <a href="${item.webDeckUrl}" class="btn-preview" title="Предпросмотр слайд-дека">
                👁️ Предпросмотр (${item.slidesCount} сл.)
              </a>
              ${pdfLink ? `<a href="${pdfLink}" target="_blank" class="btn-pdf" title="Скачать PDF">📄 PDF</a>` : ''}
                    `
                    : `
              <button class="btn-locked" disabled title="Презентация находится в стадии подготовки контента">
                🔒 В разработке
              </button>
                    `
              }
            </div>
          </article>`;
}).join('\n')}
        </div>
      </section>`;
}).join('\n')}
    </main>

    <!-- WHITEPAPERS SECTION -->
    <section class="section-block whitepapers-section" id="whitepapersSection">
      <div class="section-header">
        <div class="section-title-group">
          <span class="section-icon">📑</span>
          <h2 class="section-title">Пакет Белых Книг (A4 Whitepapers)</h2>
          <span class="section-badge">${WHITEPAPERS.filter(w => w.isReady).length} готово · ${WHITEPAPERS.filter(w => !w.isReady).length} в разработке</span>
        </div>
        <p class="section-desc">
          Официальный пакет 6 публикационных белых книг и генерального технического документа платформы «Турбаза». Белая книга 06 (экспертный отзыв для Банка России) финализирована и доступна в полиграфическом A4 PDF; документы 01–05 находятся в активной подготовке и доступны для чтения во встроенном веб-вьюере и в исходных Markdown-файлах.
        </p>
      </div>

      <div class="cards-grid">
${WHITEPAPERS.map(wp => {
  const isReady = Boolean(wp.isReady);
  let cardClasses = 'pres-card';
  if (isReady) cardClasses += ' is-ready';
  else cardClasses += ' is-draft';

  return `
        <!-- Card: Whitepaper ${escapeHtml(wp.num)} -->
        <article class="${cardClasses}"
                 data-card
                 data-ready="${isReady ? 'true' : 'false'}"
                 data-coming-soon="false"
                 data-next="false"
                 data-category="whitepapers"
                 data-search="${escapeHtml((wp.title + ' ' + wp.desc + ' ' + wp.tags.join(' ') + ' ' + wp.marker).toLowerCase())}">
          
          <div>
            <div class="card-top">
              <span class="card-marker">${escapeHtml(wp.marker)}</span>
              ${isReady 
                ? `<span class="card-status-pill status-ready"><span class="status-dot"></span> Готово (PDF A4)</span>`
                : `<span class="card-status-pill status-draft">📐 В разработке</span>`
              }
            </div>

            <h3 class="card-title">${escapeHtml(wp.title)}</h3>
            <p class="card-subtitle">${escapeHtml(wp.desc)}</p>

            <div class="card-tags">
              ${wp.tags.map(t => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('\n              ')}
            </div>
          </div>

          <div class="card-actions">
            ${isReady
              ? `
            <a href="${wp.pdfPath}" target="_blank" class="btn-launch" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);" title="Открыть официальный полиграфический A4 PDF (15 стр.)">
              📄 PDF Документ (15 стр.)
            </a>
            <a href="viewer.html?doc=${encodeURIComponent(wp.mdPath)}" class="btn-preview" title="Читать белую книгу во встроенном веб-вьюере">
              📖 Вьюер
            </a>
            <a href="${wp.mdPath}" target="_blank" class="btn-pdf" title="Открыть исходный файл Markdown">
              📝 .md
            </a>
              `
              : `
            <a href="viewer.html?doc=${encodeURIComponent(wp.mdPath)}" class="btn-preview" title="Читать черновик документа во встроенном веб-вьюере">
              📖 Читать во вьюере
            </a>
            <a href="${wp.mdPath}" target="_blank" class="btn-pdf" title="Открыть исходный файл Markdown">
              📝 Исходник .md
            </a>
            ${wp.num === 'DOC' ? `<a href="${wp.pdfPath}" target="_blank" class="btn-pdf" title="Открыть PDF">📄 PDF</a>` : ''}
              `
            }
          </div>
        </article>`;
}).join('\n')}
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="portal-footer">
      <div class="footer-left">
        <span>🏔️ Платформа «Турбаза»</span>
        <span>•</span>
        <span>Распределённая инфраструктура данных Leaf-Branch-Trunk</span>
      </div>
      <div class="footer-commands">
        npm run rebuild-overall • npm run regen-overall • ./start_presentation.sh
      </div>
    </footer>

  </div>

  <!-- INTERACTIVE FILTER LOGIC (VANILLA JS, ZERO DEPENDENCIES) -->
  <script>
    (function() {
      const btnModeFeatured = document.getElementById('btnModeFeatured');
      const btnModeReady = document.getElementById('btnModeReady');
      const btnModeAll = document.getElementById('btnModeAll');
      const searchInput = document.getElementById('searchInput');
      const categoryPills = document.querySelectorAll('.cat-pill');
      const cards = document.querySelectorAll('[data-card]');
      const sections = document.querySelectorAll('.section-block');
      const filterNotice = document.getElementById('filterNotice');
      const matchingCount = document.getElementById('matchingCount');

      let currentMode = 'featured'; // 'featured' (default: ready + coming soon applications), 'ready' (strictly only with audio), 'all' (entire roadmap)
      let currentCategory = 'all';
      let searchQuery = '';

      function updateView() {
        let visibleCount = 0;

        cards.forEach(card => {
          const isReady = card.getAttribute('data-ready') === 'true';
          const isComingSoon = card.getAttribute('data-coming-soon') === 'true';
          const cardCat = card.getAttribute('data-category');
          const searchData = card.getAttribute('data-search') || '';

          // 1. Mode check:
          if (currentMode === 'ready') {
            // Strictly audio-ready only
            if (!isReady) {
              card.style.display = 'none';
              return;
            }
          } else if (currentMode === 'featured') {
            // Featured: show ready presentations OR coming soon applications OR whitepapers section
            if (!isReady && !isComingSoon && cardCat !== 'whitepapers') {
              card.style.display = 'none';
              return;
            }
          }
          // If 'all', show everything subject to category/search

          // 2. Category filter
          if (currentCategory !== 'all' && cardCat !== currentCategory) {
            card.style.display = 'none';
            return;
          }

          // 3. Search query filter
          if (searchQuery.trim() !== '' && !searchData.includes(searchQuery.trim().toLowerCase())) {
            card.style.display = 'none';
            return;
          }

          card.style.display = 'flex';
          visibleCount++;
        });

        // Hide empty category sections
        sections.forEach(sec => {
          const secCards = sec.querySelectorAll('[data-card]');
          let hasVisible = false;
          secCards.forEach(c => {
            if (c.style.display !== 'none') hasVisible = true;
          });
          sec.style.display = hasVisible ? 'block' : 'none';
        });

        // Update notice if search is active or filtered
        if (searchQuery.trim() !== '' || currentCategory !== 'all' || currentMode !== 'all') {
          filterNotice.style.display = 'block';
          matchingCount.textContent = visibleCount;
        } else {
          filterNotice.style.display = 'none';
        }
      }

      // Mode Switcher Listeners
      btnModeFeatured.addEventListener('click', () => {
        currentMode = 'featured';
        btnModeFeatured.classList.add('active', 'featured-mode');
        btnModeReady.classList.remove('active', 'ready-mode');
        btnModeAll.classList.remove('active');
        updateView();
      });

      btnModeReady.addEventListener('click', () => {
        currentMode = 'ready';
        btnModeReady.classList.add('active', 'ready-mode');
        btnModeFeatured.classList.remove('active', 'featured-mode');
        btnModeAll.classList.remove('active');
        updateView();
      });

      btnModeAll.addEventListener('click', () => {
        currentMode = 'all';
        btnModeAll.classList.add('active');
        btnModeFeatured.classList.remove('active', 'featured-mode');
        btnModeReady.classList.remove('active', 'ready-mode');
        updateView();
      });

      // Category Pill Listeners
      categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
          categoryPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          currentCategory = pill.getAttribute('data-cat');
          updateView();
        });
      });

      // Search Listener
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateView();
      });

      // Initial execution: show featured by default!
      updateView();
    })();
  </script>
</body>
</html>
`;
}

function generatePortal() {
  console.log('[*] Scanning presentation suite for neural audio status...');
  const items = scanAllPresentations();
  const readyCount = items.filter(i => i.hasAudio).length;
  console.log(`[✓] Found ${items.length} presentations (${readyCount} with audio, ${items.length - readyCount} in development).`);

  const html = buildPortalHtml(items);
  const targetPath = path.join(rootDir, 'index.html');
  fs.writeFileSync(targetPath, html, 'utf8');
  console.log(`[🚀] Sovereign Presentation Portal compiled successfully:`);
  console.log(`     -> ${targetPath}`);

  // Compile offline bundle for viewer.html (enables reading via file:// protocol without CORS errors)
  const docsBundle = {};
  for (const wp of WHITEPAPERS) {
    if (wp.mdPath) {
      const fullPath = path.join(rootDir, wp.mdPath);
      if (fs.existsSync(fullPath)) {
        docsBundle[wp.mdPath] = fs.readFileSync(fullPath, 'utf8');
      }
    }
  }
  const bundlePath = path.join(rootDir, 'shared_docs', 'docs_bundle.js');
  fs.writeFileSync(bundlePath, `/** Turbase Offline Docs Bundle — Auto-generated by scripts/generate_portal.js */\nwindow.TURBASE_DOCS_BUNDLE = ${JSON.stringify(docsBundle)};\n`, 'utf8');
  console.log(`[📑] Offline Docs Bundle compiled: ${bundlePath} (${Object.keys(docsBundle).length} documents)`);
}

if (require.main === module) {
  generatePortal();
}

module.exports = { generatePortal, scanAllPresentations };
