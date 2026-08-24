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
    this.counterEl = document.getElementById('slideCounter');
    this.progressFillEl = document.getElementById('progressFill');
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.btnNotes = document.getElementById('btnNotes');
    this.btnSound = document.getElementById('btnSound');
    this.btnOverview = document.getElementById('btnOverview');
    this.notesDrawer = document.getElementById('notesDrawer');
    this.notesBody = document.getElementById('notesBody');
    this.overviewModal = document.getElementById('overviewModal');
  }

  bindEvents() {
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prevSlide());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextSlide());
    if (this.btnNotes) this.btnNotes.addEventListener('click', () => this.toggleNotes());
    if (this.btnSound) this.btnSound.addEventListener('click', () => this.toggleSound());
    if (this.btnOverview) this.btnOverview.addEventListener('click', () => this.toggleOverview());

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
      } else if (e.key.toLowerCase() === 'm') {
        this.toggleSound();
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
      this.counterEl.innerHTML = `<strong>${String(slideNum).padStart(2, '0')}</strong> / ${String(this.totalSlides).padStart(2, '0')}`;
    }

    if (this.progressFillEl) {
      const pct = ((slideNum - 1) / (this.totalSlides - 1)) * 100;
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
    if (this.btnSound) {
      this.btnSound.classList.toggle('active', this.audioEnabled);
      this.btnSound.innerHTML = this.audioEnabled ? '🔊' : '🔇';
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
    }
  }

  updateNotes(slideNum) {
    if (!this.notesBody) return;
    const activeCard = this.slideCards[slideNum - 1];
    const notesData = activeCard ? activeCard.getAttribute('data-notes') : '';
    if (notesData) {
      this.notesBody.innerHTML = notesData;
    }
  }
}

if (typeof window !== 'undefined') {
  window.OverviewDeckEngine = OverviewDeckEngine;
}
