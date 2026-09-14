/**
 * Universal Slide Deck Interactive Navigation & Audio Sync Engine
 * Shared across all presentation tracks (Overview, Participant Impact, Technical, Explainer)
 */

class DeckCoreEngine {
  constructor(config = {}) {
    this.totalSlides = config.totalSlides || 10;
    this.currentSlide = 1;
    this.audioEnabled = true;
    this.audioPathPrefix = config.audioPathPrefix || '../audio/slide_';
    this.audioPlayer = new Audio();
    this.notesDrawerOpen = false;
    this.overviewModalOpen = false;
    this._userHasInteracted = false;
    this._autoplayFallbackAttached = false;
    this._autoplayBannerActive = false;

    this.initElements();
    this.bindEvents();
    this.showSlide(1, true);
  }

  initElements() {
    this.slideCards = document.querySelectorAll('.slide-card');
    this.counterEl = document.getElementById('slideCounter') || document.getElementById('slideIndicator');
    this.progressFillEl = document.getElementById('progressFill');
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.btnNotes = document.getElementById('btnNotes');
    this.btnSound = document.getElementById('btnSound') || document.getElementById('btnVoice');
    this.btnOverview = document.getElementById('btnOverview');
    this.notesDrawer = document.getElementById('notesDrawer');
    this.notesBody = document.getElementById('notesBody') || document.getElementById('notesText');
    this.overviewModal = document.getElementById('overviewModal');

    if (this.audioPlayer) {
      this.audioPlayer.addEventListener('play', () => {
        if (this.btnSound) this.btnSound.classList.add('playing');
      });
      this.audioPlayer.addEventListener('pause', () => {
        if (this.btnSound) this.btnSound.classList.remove('playing');
      });
      this.audioPlayer.addEventListener('ended', () => {
        if (this.btnSound) this.btnSound.classList.remove('playing');
      });
    }
  }

  bindEvents() {
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prevSlide());
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.nextSlide());
    if (this.btnNotes) this.btnNotes.addEventListener('click', () => this.toggleNotes());
    if (this.btnSound) this.btnSound.addEventListener('click', () => this.toggleSound());
    if (this.btnOverview) this.btnOverview.addEventListener('click', () => this.toggleOverview());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (this._autoplayBannerActive || (this.audioEnabled && this.audioPlayer && this.audioPlayer.paused)) {
          this.dismissAutoplayBanner();
          if (this.audioEnabled && this.audioPlayer) {
            this.audioPlayer.play().catch(() => {});
          }
        } else {
          this.nextSlide();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        this.dismissAutoplayBanner();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.dismissAutoplayBanner();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.dismissAutoplayBanner();
        this.showSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.dismissAutoplayBanner();
        this.showSlide(this.totalSlides);
      } else if (e.key.toLowerCase() === 'n') {
        this.toggleNotes();
      } else if (e.key.toLowerCase() === 'o') {
        this.toggleOverview();
      } else if (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 'v') {
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

    // Expose global methods for Playwright screenshot capturers
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

    // Update counter
    if (this.counterEl) {
      this.counterEl.innerHTML = `<strong>${String(slideNum).padStart(2, '0')}</strong> / ${String(this.totalSlides).padStart(2, '0')}`;
    }

    // Update progress bar
    if (this.progressFillEl) {
      const pct = this.totalSlides > 1 ? ((slideNum - 1) / (this.totalSlides - 1)) * 100 : 100;
      this.progressFillEl.style.width = `${pct}%`;
    }

    if (this.btnPrev) this.btnPrev.disabled = (slideNum === 1);
    if (this.btnNext) this.btnNext.disabled = (slideNum === this.totalSlides);

    if (slideNum > 1) {
      this.dismissAutoplayBanner();
    }

    // Update speaker notes
    this.updateNotes(slideNum);

    // Audio Playback
    if (this.audioEnabled && playAudio) {
      const padded = String(slideNum).padStart(2, '0');
      const targetSrc = `${this.audioPathPrefix}${padded}.mp3`;
      if (!this.audioPlayer.src || !this.audioPlayer.src.endsWith(`${padded}.mp3`)) {
        this.audioPlayer.src = targetSrc;
      }
      this.audioPlayer.currentTime = 0;
      const playPromise = this.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this._userHasInteracted = true;
          this.dismissAutoplayBanner();
          if (this.btnSound) this.btnSound.classList.add('playing');
        }).catch(() => {
          if (this.btnSound) this.btnSound.classList.remove('playing');
          if (!this._userHasInteracted) {
            this.setupAutoplayFallback();
          }
        });
      }
    } else {
      this.audioPlayer.pause();
      if (this.btnSound) this.btnSound.classList.remove('playing');
    }
  }

  setupAutoplayFallback() {
    if (this._userHasInteracted || this._autoplayFallbackAttached) return;
    this._autoplayFallbackAttached = true;

    this.showAutoplayBanner();

    const unlock = (e) => {
      const isControl = e && e.target && e.target.closest && (
        e.target.closest('#btnNext') ||
        e.target.closest('#btnPrev') ||
        e.target.closest('#btnVoice') ||
        e.target.closest('#btnSound') ||
        e.target.closest('#btnNotes') ||
        e.target.closest('#btnOverview') ||
        e.target.closest('.nav-btn') ||
        e.target.closest('.nav-btn-arrow')
      );

      this.dismissAutoplayBanner();
      this.cleanupAutoplayFallback(unlock);

      if (!isControl && this.audioEnabled && this.audioPlayer && this.audioPlayer.paused) {
        this.audioPlayer.play().then(() => {
          if (this.btnSound) this.btnSound.classList.add('playing');
        }).catch(() => {});
      }
    };

    this._unlockHandler = unlock;

    window.addEventListener('click', unlock, true);
    window.addEventListener('touchstart', unlock, true);
    window.addEventListener('pointerdown', unlock, true);
  }

  showAutoplayBanner() {
    if (document.getElementById('autoplayBanner') || this._userHasInteracted) return;
    this._autoplayBannerActive = true;

    if (this.btnSound) this.btnSound.classList.add('needs-activation');

    const viewport = document.querySelector('.presentation-viewport') || document.body;
    const banner = document.createElement('div');
    banner.id = 'autoplayBanner';
    banner.className = 'autoplay-banner';
    banner.setAttribute('title', 'Нажмите в любом месте или клавишу Пробел');
    banner.innerHTML = `
      <div class="autoplay-banner-icon">▶</div>
      <div class="autoplay-banner-text">
        <span class="autoplay-banner-title">Нажмите для запуска озвучки</span>
        <span class="autoplay-banner-sub">или кликните в любом месте экрана (Пробел)</span>
      </div>
    `;

    banner.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.dismissAutoplayBanner();
      if (this._unlockHandler) this.cleanupAutoplayFallback(this._unlockHandler);
      if (this.audioEnabled && this.audioPlayer) {
        this.audioPlayer.play().then(() => {
          if (this.btnSound) this.btnSound.classList.add('playing');
        }).catch(() => {});
      }
    });

    document.body.appendChild(banner);
  }

  dismissAutoplayBanner() {
    this._userHasInteracted = true;
    this._autoplayBannerActive = false;
    if (this.btnSound) this.btnSound.classList.remove('needs-activation');
    const banner = document.getElementById('autoplayBanner');
    if (banner) {
      banner.classList.add('dismissed');
      setTimeout(() => { if (banner.parentNode) banner.remove(); }, 250);
    }
  }

  cleanupAutoplayFallback(handler) {
    this._autoplayFallbackAttached = false;
    window.removeEventListener('click', handler, true);
    window.removeEventListener('keydown', handler, true);
    window.removeEventListener('touchstart', handler, true);
    window.removeEventListener('pointerdown', handler, true);
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
    if (this._autoplayBannerActive || this._autoplayFallbackAttached) {
      this.dismissAutoplayBanner();
      if (this._unlockHandler) this.cleanupAutoplayFallback(this._unlockHandler);
      this.audioEnabled = true;
      this.audioPlayer.play().then(() => {
        if (this.btnSound) {
          this.btnSound.classList.add('playing');
          this.btnSound.classList.add('active');
          this.btnSound.innerHTML = '🔊';
        }
      }).catch(() => {});
      return;
    }

    if (this.audioEnabled && this.audioPlayer && this.audioPlayer.paused) {
      this.audioPlayer.play().then(() => {
        if (this.btnSound) {
          this.btnSound.classList.add('playing');
          this.btnSound.classList.add('active');
          this.btnSound.innerHTML = '🔊';
        }
      }).catch(() => {});
      return;
    }

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
  window.DeckCoreEngine = DeckCoreEngine;
}
