/**
 * Core Presentation Deck Compiler for Turbase Platform
 * Compiles a single canonical `docs/presentation_deck.md` file into a high-performance,
 * interactive, billboard-scale `web_deck/index.html` slide presentation player.
 */

const fs = require('fs');
const path = require('path');

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseFrontmatter(content) {
  const meta = {
    title: 'Платформа «Турбаза»',
    subtitle: 'Распределенная инфраструктура данных',
    header_title: 'ТУРБАЗА',
    header_subtitle: 'Распределенная архитектура и экономика данных',
    theme: 'dark_sovereign',
    total_slides: 15,
    voice: 'ru-RU-DmitryNeural',
    pitch: '-5Hz',
    rate: '-9%'
  };

  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return { meta, body: content };

  const rawYaml = match[1];
  const body = content.slice(match[0].length);

  rawYaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (!isNaN(val) && val !== '') {
      val = Number(val);
    }
    meta[key] = val;
  });

  return { meta, body };
}

function parseSlides(body) {
  const rawSections = body.split(/<!--\s*slide:\s*(\d+)\s*-->|(?=^#{1,2}\s*Слайд\s*\d+)/gim);
  const slides = [];

  // Group raw chunks by slide
  const chunks = body.split(/(?:^|\n)(?=<!--\s*slide:\s*\d+\s*-->|^#{1,2}\s*Слайд\s*\d+:?)/i);

  for (let idx = 0; idx < chunks.length; idx++) {
    const chunk = chunks[idx].trim();
    if (!chunk) continue;

    const slideNumMatch = chunk.match(/(?:<!--\s*slide:\s*(\d+)\s*-->|#{1,2}\s*Слайд\s*(\d+))/i);
    const slideNum = slideNumMatch ? parseInt(slideNumMatch[1] || slideNumMatch[2], 10) : slides.length + 1;

    // Extract Header Properties
    let tag = '';
    let title = '';
    let subtitle = '';
    let badge = '';

    const tagMatch = chunk.match(/[-*]\s*\*\*tag:\*\*\s*"([^"]+)"|Tag:\s*([^\n]+)/i);
    if (tagMatch) tag = tagMatch[1] || tagMatch[2];

    const titleMatch = chunk.match(/[-*]\s*\*\*title:\*\*\s*"([^"]+)"|Title:\s*([^\n]+)/i);
    if (titleMatch) title = titleMatch[1] || titleMatch[2];
    if (!title) {
      const headingMatch = chunk.match(/#{1,3}\s*Заголовок:?\s*([^\n]+)/i);
      if (headingMatch) title = headingMatch[1].trim();
    }

    const subMatch = chunk.match(/[-*]\s*\*\*subtitle:\*\*\s*"([^"]+)"|Subtitle:\s*([^\n]+)/i);
    if (subMatch) subtitle = subMatch[1] || subMatch[2];

    const badgeMatch = chunk.match(/[-*]\s*\*\*(?:badge|citation):\*\*\s*"([^"]+)"/i);
    if (badgeMatch) badge = badgeMatch[1];

    // Extract Visual Section
    let visualHtml = '';
    const visualSection = chunk.match(/###\s*\[VISUAL[^\]]*\]([\s\S]*?)(?=###\s*\[CONTENT|###\s*Текст для диктора|---|$)/i);
    if (visualSection) {
      const rawVisual = visualSection[1].trim();
      if (rawVisual.includes('```mermaid')) {
        const mermaidCode = rawVisual.replace(/```mermaid\s*([\s\S]*?)```/, '$1').trim();
        visualHtml = `<div class="mermaid-diagram-card"><div class="mermaid">\n${mermaidCode}\n</div></div>`;
      } else {
        // Parse cards or lists
        const items = rawVisual.split(/\n\s*[-*]\s+/).filter(Boolean);
        const cardsHtml = items.map(it => {
          it = it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return `<div class="visual-mini-card"><p>${it.trim()}</p></div>`;
        }).join('\n');
        visualHtml = `<div class="visual-cards-stack">${cardsHtml}</div>`;
      }
    }

    // Extract Content Section
    let contentHtml = '';
    const contentSection = chunk.match(/###\s*\[CONTENT[^\]]*\]([\s\S]*?)(?=###\s*Текст для диктора|---|$)/i);
    if (contentSection) {
      const rawContent = contentSection[1].trim();
      const items = rawContent.split(/\n\s*[-*]\s+/).filter(Boolean);
      const cardsHtml = items.map(it => {
        it = it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<div class="content-benefit-card"><p>${it.trim()}</p></div>`;
      }).join('\n');
      contentHtml = `<div class="content-cards-stack">${cardsHtml}</div>`;
    }

    // Extract Speaker Narration
    let narration = '';
    const narrationSection = chunk.match(/(?:###\s*Текст для диктора[^\n]*|###\s*\[SPEAKER_NOTES\][^\n]*)([\s\S]*?)(?=---|$)/i);
    if (narrationSection) {
      narration = narrationSection[1]
        .split('\n')
        .map(l => l.replace(/^>\s*/, '').replace(/^\(Narration\):?/i, '').trim())
        .filter(Boolean)
        .join('\n\n')
        .replace(/[«»"]/g, '"');
    }

    // Check if chunk has direct rich HTML slide content before narration
    let rawHtmlBody = '';
    const beforeNarration = chunk.split(/(?:###\s*Текст для диктора|###\s*\[SPEAKER_NOTES\])/i)[0].trim();
    if (beforeNarration.includes('<div') || beforeNarration.includes('<table') || beforeNarration.includes('<section')) {
      rawHtmlBody = beforeNarration;
      
      const titleTagMatch = rawHtmlBody.match(/<h[12][^>]*class="[^"]*slide-title[^"]*"[^>]*>([\s\S]*?)<\/h[12]>/i) ||
                            rawHtmlBody.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
      if (titleTagMatch) title = titleTagMatch[1].replace(/<[^>]+>/g, '').trim();

      const tagTagMatch = rawHtmlBody.match(/<(?:div|span)[^>]*class="[^"]*(?:slide-tag|slide-category-tag)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|span)>/i);
      if (tagTagMatch) tag = tagTagMatch[1].replace(/<[^>]+>/g, '').trim();

      const subTagMatch = rawHtmlBody.match(/<p[^>]*class="[^"]*slide-subtitle[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      if (subTagMatch) subtitle = subTagMatch[1].replace(/<[^>]+>/g, '').trim();
    }

    slides.push({
      slideNum,
      tag: tag || `Слайд ${slideNum}`,
      title: title || `Слайд ${slideNum}`,
      subtitle: subtitle || '',
      badge: badge || '',
      rawHtmlBody: rawHtmlBody || '',
      visualHtml: visualHtml || '<div class="visual-empty"></div>',
      contentHtml: contentHtml || '<div class="content-empty"></div>',
      narration: narration || ''
    });
  }

  return slides.sort((a, b) => a.slideNum - b.slideNum);
}

function findRepoRoot(startDir) {
  let cur = path.resolve(startDir || process.cwd());
  while (cur !== path.dirname(cur)) {
    if (fs.existsSync(path.join(cur, 'shared_templates')) && fs.existsSync(path.join(cur, 'scripts'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  cur = path.resolve(startDir || process.cwd());
  while (cur !== path.dirname(cur)) {
    if (fs.existsSync(path.join(cur, 'shared_templates'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return path.resolve(process.cwd());
}

function compileDeckHtml(presentationDir, options = {}) {
  const docsDir = path.join(presentationDir, 'docs');
  const webDeckDir = options.outputDir || path.join(presentationDir, 'generated', 'outputs', 'web_deck');
  const rootDir = findRepoRoot(presentationDir);
  
  if (!fs.existsSync(webDeckDir)) {
    fs.mkdirSync(webDeckDir, { recursive: true });
  }

  // Locate markdown file: presentation_deck.md or *deck.md or *narration.md
  let mdPath = path.join(docsDir, 'presentation_deck.md');
  if (!fs.existsSync(mdPath)) {
    const mdFiles = fs.existsSync(docsDir) ? fs.readdirSync(docsDir).filter(f => f.endsWith('.md')) : [];
    const candidate = mdFiles.find(f => f.includes('deck') || f.includes('narration') || f.includes('outline'));
    if (candidate) mdPath = path.join(docsDir, candidate);
    else throw new Error(`No presentation markdown source found in ${docsDir}`);
  }

  const rawContent = fs.readFileSync(mdPath, 'utf8');
  const { meta, body } = parseFrontmatter(rawContent);
  const slides = parseSlides(body);

  const totalSlides = slides.length || meta.total_slides || 15;

  const deckCoreRel = path.relative(webDeckDir, path.join(rootDir, 'shared_templates', 'deck_core')).replace(/\\/g, '/');
  const sharedTemplatesRel = path.relative(webDeckDir, path.join(rootDir, 'shared_templates', 'overview_presentation_deck')).replace(/\\/g, '/');
  const platformOverviewRel = path.relative(webDeckDir, path.join(rootDir, 'shared_templates', 'platform_overview_deck')).replace(/\\/g, '/');
  const detailedImpactRel = path.relative(webDeckDir, path.join(rootDir, 'shared_templates', 'detailed_impact_deck')).replace(/\\/g, '/');
  const audioRel = path.relative(webDeckDir, path.join(presentationDir, 'generated', 'artifacts', 'audio')).replace(/\\/g, '/');

  // Discover and copy presentation-specific local CSS from docs/ to web_deck/
  let localCssFiles = [];
  if (fs.existsSync(docsDir)) {
    const docFiles = fs.readdirSync(docsDir);
    if (docFiles.includes('deck.css')) {
      localCssFiles = ['deck.css'];
    } else if (docFiles.includes('stakeholders.css')) {
      localCssFiles = ['stakeholders.css'];
    } else if (docFiles.includes('architecture.css')) {
      localCssFiles = ['architecture.css'];
    } else {
      localCssFiles = docFiles.filter(f => f.endsWith('.css'));
    }
  }

  let cssLinkTags = '';
  if (localCssFiles.length > 0) {
    // Copy isolated CSS file(s) directly into web_deck/
    localCssFiles.forEach(cssFile => {
      const srcDocCss = path.join(docsDir, cssFile);
      const destWebCss = path.join(webDeckDir, cssFile);
      fs.copyFileSync(srcDocCss, destWebCss);
    });
    cssLinkTags = [
      `  <!-- Universal Presentation Engine Chrome (Shared Viewport, Header & Controls) -->`,
      `  <link rel="stylesheet" href="${deckCoreRel}/css/deck_core.css">`,
      ...localCssFiles.map(cssFile => `  <!-- Isolated Standalone Presentation Theme & Content -->\n  <link rel="stylesheet" href="${cssFile}">`)
    ].join('\n');
  } else {
    // Fallback for presentations that have not yet migrated to an isolated local stylesheet
    if (presentationDir.includes('platform_overview') || meta.theme === 'platform_overview') {
      cssLinkTags = `  <!-- Universal Presentation Engine Chrome -->\n  <link rel="stylesheet" href="${deckCoreRel}/css/deck_core.css">\n  <!-- Platform Overview Design System (Fallback) -->\n  <link rel="stylesheet" href="${platformOverviewRel}/css/platform_overview_theme.css">\n  <link rel="stylesheet" href="${platformOverviewRel}/css/platform_overview_components.css">`;
    } else if (presentationDir.includes('detailed_overall_impact') || meta.theme === 'detailed_impact') {
      cssLinkTags = `  <!-- Universal Presentation Engine Chrome -->\n  <link rel="stylesheet" href="${deckCoreRel}/css/deck_core.css">\n  <!-- Detailed Impact Presentations Design System (Fallback) -->\n  <link rel="stylesheet" href="${detailedImpactRel}/css/detailed_deck_theme.css">\n  <link rel="stylesheet" href="${detailedImpactRel}/css/detailed_deck_components.css">`;
    } else {
      cssLinkTags = `  <!-- Universal Presentation Engine Chrome -->\n  <link rel="stylesheet" href="${deckCoreRel}/css/deck_core.css">\n  <!-- Universal Sovereign Overview Design System (Fallback) -->\n  <link rel="stylesheet" href="${sharedTemplatesRel}/css/overview_deck_base.css">\n  <link rel="stylesheet" href="${sharedTemplatesRel}/css/overview_deck_components.css">`;
    }
  }

  let slidesHtml = '';
  slides.forEach((slide, sIdx) => {
    const activeClass = sIdx === 0 ? 'active' : '';
    const badgeHtml = slide.badge ? `<div class="kpi-badge">${escapeHtml(slide.badge)}</div>` : '';

    const slideBody = slide.rawHtmlBody ? slide.rawHtmlBody : `
        <div class="slide-top-bar">
          <div class="slide-header-content">
            <span class="slide-category-tag">${escapeHtml(slide.tag)}</span>
            <h1 class="slide-title">${escapeHtml(slide.title)}</h1>
            ${slide.subtitle ? `<p class="slide-subtitle">${escapeHtml(slide.subtitle)}</p>` : ''}
          </div>
          ${badgeHtml}
        </div>

        <div class="slide-body-grid">
          <div class="visual-col">
            ${slide.visualHtml}
          </div>
          <div class="content-col">
            ${slide.contentHtml}
          </div>
        </div>
    `;

    slidesHtml += `
      <!-- ==================== СЛАЙД ${slide.slideNum} ==================== -->
      <section class="slide-card ${activeClass}" data-slide="${slide.slideNum}">
        ${slideBody}

        <div class="speaker-notes-content" data-slide="${slide.slideNum}" style="display:none;">
          ${escapeHtml(slide.narration).replace(/\n\n/g, '<br/><br/>')}
        </div>
      </section>
    `;
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)} — ${escapeHtml(meta.subtitle)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
${cssLinkTags}

  <!-- Mermaid.js Vector Renderer -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      flowchart: { htmlLabels: true, curve: 'basis' },
      themeVariables: {
        darkMode: true,
        background: '#070b14',
        primaryColor: '#0e1626',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#38bdf8',
        lineColor: '#facc15',
        fontFamily: 'Inter, sans-serif'
      }
    });
  </script>
</head>
<body class="${meta.sector_theme || meta.theme_class || ''}">

  <!-- Top Navigation & Control Bar -->
  <header class="presentation-header">
    <div class="header-left">
      <a href="/" class="logo-badge" title="Вернуться к каталогу всех презентаций (Главная)">
        <span class="logo-icon">🌲</span>
        <span class="logo-text">${escapeHtml(meta.header_title)}</span>
      </a>
      <span class="header-title">${escapeHtml(meta.header_subtitle)}</span>
    </div>
    <div class="header-center">
      <button id="btnPrev" class="nav-btn nav-btn-arrow" title="Предыдущий слайд (←)"><span class="btn-icon">◀</span></button>
      <span id="slideIndicator" class="slide-indicator">Слайд 1 / ${totalSlides}</span>
      <button id="btnNext" class="nav-btn nav-btn-arrow" title="Следующий слайд (→)"><span class="btn-icon">▶</span></button>
    </div>
    <div class="header-right">
      <button id="btnOverview" class="nav-btn" title="Сетка слайдов (O)"><span class="btn-icon">▦</span> Сетка</button>
      <button id="btnVoice" class="nav-btn voice-btn" title="Голосовое сопровождение (V)"><span class="btn-icon">🔊</span> Озвучка</button>
      <button id="btnNotes" class="nav-btn" title="Текст диктора (N)"><span class="btn-icon">🎙️</span> Текст спикера</button>
      <button id="btnFullscreen" class="nav-btn" title="Полноэкранный режим (F)"><span class="btn-icon">⛶</span> Экран</button>
      <button id="btnPrint" class="nav-btn" title="Печать в PDF (Ctrl+P)"><span class="btn-icon">🖨️</span> PDF</button>
    </div>
  </header>

  <!-- Presentation Viewport -->
  <main class="presentation-viewport">
    <div id="deckContainer" class="deck-container">
      ${slidesHtml}
    </div>
  </main>

  <!-- Speaker Notes Drawer -->
  <aside id="notesDrawer" class="notes-drawer">
    <div class="notes-drawer-header">
      <div class="notes-title-wrap">
        <span class="notes-icon">🎙️</span>
        <span class="notes-title">Текст диктора / Заметки к слайду</span>
      </div>
      <button id="btnCloseNotes" class="notes-close-btn">&times;</button>
    </div>
    <div id="notesBody" class="notes-body">
      <!-- Injected dynamically by Deck Engine -->
    </div>
  </aside>

  <!-- Modal: Grid Overview -->
  <div id="overviewModal" class="modal-overlay">
    <div class="modal-card wide">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span class="modal-icon">▦</span>
          <h3>Обзор всех ${totalSlides} слайдов презентации</h3>
        </div>
        <button id="btnCloseOverview" class="modal-close-btn">&times;</button>
      </div>
      <div id="overviewGrid" class="overview-grid">
        <!-- Injected dynamically by Deck Engine -->
      </div>
    </div>
  </div>

  <!-- Universal Presentation Engine (Single Shared Source) -->
  <script src="${sharedTemplatesRel}/js/overview_deck_engine.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      window.deckEngine = new OverviewDeckEngine({
        totalSlides: ${totalSlides},
        audioPathPrefix: '${audioRel}/slide_'
      });
    });
  </script>
</body>
</html>`;

  const outputHtmlPath = path.join(webDeckDir, 'index.html');
  fs.writeFileSync(outputHtmlPath, fullHtml, 'utf8');
  console.log(`[✓] Web Deck compiled: ${outputHtmlPath} (${totalSlides} slides from ${path.basename(mdPath)})`);
  return outputHtmlPath;
}

module.exports = {
  findRepoRoot,
  parseFrontmatter,
  parseSlides,
  compileDeckHtml
};
