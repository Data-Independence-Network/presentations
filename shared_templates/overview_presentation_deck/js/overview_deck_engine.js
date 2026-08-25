/**
 * Core Slide Deck Interactive Navigation & Audio Sync Engine
 * Reusable engine for overview presentations
 */

class OverviewDeckEngine {
  constructor(config = {}) {
    this.totalSlides = config.totalSlides || 15;
    this.currentSlide = 1;
    this.audioEnabled = true;
    this.audioPathPrefix = config.audioPathPrefix || '../audio/slide_';
    this.audioPlayer = new Audio();
    this.notesDrawerOpen = false;
    this.overviewModalOpen = false;

    this.initElements();
    this.bindEvents();
    this.showSlide(1, false);
  }

  initElements() {
    this.slideCards = document.querySelectorAll('.slide-card');
    this.totalSlides = this.slideCards.length || this.totalSlides;
    this.counterEl = document.getElementById('slideIndicator') || document.getElementById('slideCounter');
    this.progressFillEl = document.getElementById('progressFill');
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.btnNotes = document.getElementById('btnNotes');
    this.btnVoice = document.getElementById('btnVoice') || document.getElementById('btnSound');
    this.btnOverview = document.getElementById('btnOverview');
    this.btnFullscreen = document.getElementById('btnFullscreen');
    this.btnPrint = document.getElementById('btnPrint');
    this.notesDrawer = document.getElementById('notesDrawer');
    this.notesBody = document.getElementById('notesBody');
    this.btnCloseNotes = document.getElementById('btnCloseNotes');
    this.overviewModal = document.getElementById('overviewModal');
    this.overviewGrid = document.getElementById('overviewGrid');
    this.btnCloseOverview = document.getElementById('btnCloseOverview');

    this.populateOverviewGrid();
  }

  bindEvents() {
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prevSlide());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextSlide());
    if (this.btnNotes) this.btnNotes.addEventListener('click', () => this.toggleNotes());
    if (this.btnCloseNotes) this.btnCloseNotes.addEventListener('click', () => this.toggleNotes());
    if (this.btnVoice) this.btnVoice.addEventListener('click', () => this.toggleSound());
    if (this.btnOverview) this.btnOverview.addEventListener('click', () => this.toggleOverview());
    if (this.btnCloseOverview) this.btnCloseOverview.addEventListener('click', () => this.toggleOverview());
    if (this.btnFullscreen) this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    if (this.btnPrint) this.btnPrint.addEventListener('click', () => window.print());

    // Close modal on outside click
    if (this.overviewModal) {
      this.overviewModal.addEventListener('click', (e) => {
        if (e.target === this.overviewModal) this.toggleOverview();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.showSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.showSlide(this.totalSlides);
      } else if (e.key.toLowerCase() === 'n') {
        this.toggleNotes();
      } else if (e.key.toLowerCase() === 'o') {
        this.toggleOverview();
      } else if (e.key.toLowerCase() === 'v' || e.key.toLowerCase() === 'm') {
        this.toggleSound();
      } else if (e.key.toLowerCase() === 'f') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (this.overviewModalOpen) this.toggleOverview();
        if (this.notesDrawerOpen) this.toggleNotes();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;
      if (diffX < -50) this.nextSlide();
      if (diffX > 50) this.prevSlide();
    }, { passive: true });

    // Expose global methods for Playwright / CLI screenshot capturers
    window.showSlide = (n) => this.showSlide(n, false);
    window.nextSlide = () => this.nextSlide();
    window.prevSlide = () => this.prevSlide();
  }

  populateOverviewGrid() {
    if (!this.overviewGrid) return;
    this.overviewGrid.innerHTML = '';
    this.slideCards.forEach((card, idx) => {
      const slideNum = idx + 1;
      const titleEl = card.querySelector('.slide-title');
      const tagEl = card.querySelector('.slide-category-tag');
      const title = titleEl ? titleEl.textContent.trim() : `Слайд ${slideNum}`;
      const tag = tagEl ? tagEl.textContent.trim() : '';

      const thumb = document.createElement('div');
      thumb.className = `grid-slide-thumb ${slideNum === this.currentSlide ? 'current' : ''}`;
      thumb.setAttribute('data-target-slide', slideNum);
      thumb.innerHTML = `
        <div class="thumb-header">
          <span class="thumb-num">#${slideNum}</span>
          ${tag ? `<span class="thumb-tag">${tag}</span>` : ''}
        </div>
        <div class="thumb-title">${title}</div>
      `;

      thumb.addEventListener('click', () => {
        this.showSlide(slideNum);
        this.toggleOverview();
      });

      this.overviewGrid.appendChild(thumb);
    });
  }

  showSlide(slideNum, playAudio = true) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > this.totalSlides) slideNum = this.totalSlides;

    this.currentSlide = slideNum;

    // Update active slide card
    this.slideCards.forEach((card, idx) => {
      if (idx + 1 === slideNum) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update controls
    if (this.counterEl) {
      this.counterEl.textContent = `Слайд ${slideNum} / ${this.totalSlides}`;
    }

    if (this.progressFillEl) {
      const pct = ((slideNum - 1) / (this.totalSlides - 1 || 1)) * 100;
      this.progressFillEl.style.width = `${pct}%`;
    }

    if (this.btnPrev) this.btnPrev.disabled = (slideNum === 1);
    if (this.btnNext) this.btnNext.disabled = (slideNum === this.totalSlides);

    // Update speaker notes
    this.updateNotes(slideNum);

    // Audio Playback
    if (this.audioEnabled && playAudio) {
      const padded = String(slideNum).padStart(2, '0');
      this.audioPlayer.src = `${this.audioPathPrefix}${padded}.mp3`;
      this.audioPlayer.play().catch(() => {});
    } else {
      this.audioPlayer.pause();
    }
  }

  prevSlide() {
    if (this.currentSlide > 1) {
      this.showSlide(this.currentSlide - 1);
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.showSlide(this.currentSlide + 1);
    }
  }

  toggleNotes() {
    this.notesDrawerOpen = !this.notesDrawerOpen;
    if (this.notesDrawer) {
      this.notesDrawer.classList.toggle('open', this.notesDrawerOpen);
    }
    if (this.btnNotes) {
      this.btnNotes.classList.toggle('active', this.notesDrawerOpen);
    }
  }

  toggleSound() {
    this.audioEnabled = !this.audioEnabled;
    if (this.btnVoice) {
      this.btnVoice.classList.toggle('active', this.audioEnabled);
      this.btnVoice.innerHTML = this.audioEnabled ? '<span class="btn-icon">🔊</span> Озвучка' : '<span class="btn-icon">🔇</span> Без звука';
    }
    if (!this.audioEnabled) {
      this.audioPlayer.pause();
    } else {
      this.showSlide(this.currentSlide, true);
    }
  }

  toggleOverview() {
    this.overviewModalOpen = !this.overviewModalOpen;
    if (this.overviewModal) {
      this.overviewModal.classList.toggle('open', this.overviewModalOpen);
      if (this.overviewModalOpen) {
        // Highlight active thumbnail
        const thumbs = this.overviewModal.querySelectorAll('.grid-slide-thumb');
        thumbs.forEach(t => {
          const num = parseInt(t.getAttribute('data-target-slide'), 10);
          t.classList.toggle('current', num === this.currentSlide);
        });
      }
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  updateNotes(slideNum) {
    if (!this.notesBody) return;
    const activeCard = this.slideCards[slideNum - 1];
    if (!activeCard) return;

    const notesElem = activeCard.querySelector('.speaker-notes-content');
    const notesAttr = activeCard.getAttribute('data-notes');

    if (notesElem) {
      this.notesBody.innerHTML = notesElem.innerHTML;
    } else if (notesAttr) {
      this.notesBody.innerHTML = notesAttr;
    } else {
      this.notesBody.innerHTML = '<p style="color:var(--text-muted);">Заметки диктора для этого слайда отсутствуют.</p>';
    }
  }
}

if (typeof window !== 'undefined') {
  window.OverviewDeckEngine = OverviewDeckEngine;
}
