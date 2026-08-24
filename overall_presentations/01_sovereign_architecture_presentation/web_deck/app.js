/**
 * Платформа «Турбаза» — Presentation Engine & Speaker Notes
 */

// Speaker Notes Data mapped to Slides 1..15
const speakerNotes = {
  1: `<h3>Слайд 1: Слайд 1</h3>
      <blockquote>
        <p>«Уважаемые коллеги! Представляем платформу "Турбаза" — отечественное решение для построения суверенной, экономичной и безопасной государственной инфраструктуры данных.</p>
        <p>В условиях санкционных ограничений и дефицита серверного оборудования централизованные дата-центры становятся уязвимыми и непомерно дорогими для бюджета. "Турбаза" предлагает принципиально иной подход: перенос вычислений на устройства самих граждан и древовидную организацию национальной сети.</p>
        <p>Все научные первоисточники и стандарты указаны непосредственно на слайдах презентации и собраны в единый реестр в заключительной части доклада».</p>
      </blockquote>`,

  2: `<h3>Слайд 2: Слайд 2</h3>
      <blockquote>
        <p>«Сегодня традиционная облачная архитектура зашла в тройной тупик:</p>
        <p><strong>Первое — Аппаратный кризис.</strong> Ограничения на поставку зарубежных серверных процессоров делают расширение центральных супер-ЦОД крайне затратным для государства.</p>
        <p><strong>Второе — Перегрузка магистралей.</strong> Когда каждый клик гражданина передается в Москву, каналы связи задыхаются от рутинного локального трафика.</p>
        <p><strong>Третье — Риск масштабных утечек.</strong> Сбор персональных данных ста сорока миллионов граждан в едином монолитном хранилище создает критическую уязвимость для всей национальной безопасности».</p>
      </blockquote>`,

  3: `<h3>Слайд 3: Слайд 3</h3>
      <blockquote>
        <p>«"Турбаза" решает эти проблемы переносом вычислений на периферию — на устройства самих пользователей, создавая ячейку <strong>"Лист"</strong>.</p>
        <p>Это дает три фундаментальных преимущества:</p>
        <p><strong>Колоссальная экономия бюджета:</strong> мы задействуем мощные процессоры, которые уже находятся в карманах ста сорока миллионов жителей, распределяя нагрузку вместо закупки дефицитных серверных чипов.</p>
        <p><strong>Разгрузка серверов на девяносто процентов:</strong> сервер больше не тратит ресурсы на выполнение чужих программ, выступая лишь легким защищенным шлюзом.</p>
        <p><strong>Полная автономность:</strong> врач или инспектор могут работать в тайге и на выезде без связи — при появлении сети данные синхронизируются автоматически».</p>
      </blockquote>`,

  4: `<h3>Слайд 4: Слайд 4</h3>
      <blockquote>
        <p>«Сеть платформы строится по <strong>принципу государственной почтовой службы: письмо соседу не нужно везти через Москву</strong>. Районные Ветки объединяются в областные Ветви, а те сходятся в федеральный Ствол.</p>
        <p><strong>Восемьдесят пять процентов сетевого трафика локализуется в районе:</strong> рутинные вопросы ЖКХ, поликлиник и домовых чатов замыкаются на местном уровне, полностью освобождая федеральные магистрали.</p>
        <p><strong>Мгновенный поиск без нагрузки на серверы:</strong> телефон скачивает легкую адресную книгу района и находит контакты в своей памяти за две миллисекунды. Для серверов и бюджета стоимость поиска равна нулю».</p>
      </blockquote>`,

  5: `<h3>Слайд 5: Слайд 5</h3>
      <blockquote>
        <p>«Сбор государственной аналитики в "Турбазе" разделен на два уровня по <strong>принципу сводного протокола</strong>:</p>
        <p><strong>Личные и корпоративные отчеты</strong> по ЖКХ, налогам или балансам предприятий рассчитываются на процессорах самих пользователей. Нагрузка на серверы равна нулю, а персональные данные не покидают устройство.</p>
        <p><strong>Общенациональная статистика</strong> собирается иерархическим сложением: каждый смартфон передает наверх лишь <strong>одну короткую числовую строчку в сто двадцать восемь байт</strong>. Районные и региональные узлы складывают показатели за доли секунды.</p>
        <p>Государство получает макростатистику в реальном времени, сокращая расходы на серверы аналитики на <strong>девяносто семь процентов</strong>».</p>
      </blockquote>`,

  6: `<h3>Слайд 6: Слайд 6</h3>
      <blockquote>
        <p>«Расчеты на масштабе в сто миллионов активных пользователей подтверждают многократную экономию государственных ресурсов:</p>
        <p><strong>Процессорная нагрузка серверов</strong> снижается со ста процентов до <strong>восьми процентов</strong> — экономия более девяноста двух процентов.</p>
        <p><strong>Оперативная память</strong> сокращается со ста процентов до <strong>двенадцати процентов</strong>.</p>
        <p><strong>Дисковые хранилища аналитики</strong> уменьшаются со ста процентов до <strong>трех процентов</strong> за счет ликвидации сырых централизованных баз.</p>
        <p><strong>Магистральный трафик</strong> падает на <strong>восемьдесят два процента</strong>.</p>
        <p>В итоге совокупная стоимость владения серверной инфраструктурой снижается более чем <strong>в восемь раз</strong>».</p>
      </blockquote>`,

  7: `<h3>Слайд 7: Слайд 7</h3>
      <blockquote>
        <p>«Главная причина массовых утечек — копирование паспортов и адресов граждан в базы десятков коммерческих сервисов.</p>
        <p>В "Турбазе" эта угроза ликвидирована <strong>разделением заказа и доставки</strong>:</p>
        <p>Интернет-магазин получает оплату и номер заказа, но <strong>вообще не знает домашнего адреса покупателя</strong>. Телефон гражданина сам передает адрес напрямую Почте для доставки посылки по номеру заказа.</p>
        <p>При взломе магазина утечка адресов равна <strong>нулю</strong>. Государственные реестры защищены от изменения сторонними программами, а дисковое пространство экономится на <strong>шестидесяти — восьмидесяти процентах</strong>».</p>
      </blockquote>`,

  8: `<h3>Слайд 8: Слайд 8</h3>
      <blockquote>
        <p>«Для защиты от кибермошенников и экстремистских угроз "Турбаза" реализует трехуровневый периметр безопасности:</p>
        <p><strong>Прозрачная карта связей для органов безопасности:</strong> районные узлы фиксируют журнал соединений (кто, с кем и когда связывался), позволяя аналитическим системам пресекать работу зарубежных колл-центров без нарушения тайны переписки.</p>
        <p><strong>Заслон от ботов и дипфейков:</strong> очная жеребьевка в группах по двадцать пять человек дает стопроцентную гарантию живого земляка без раскрытия паспорта в сети.</p>
        <p><strong>Личный фильтр гражданина:</strong> каждый пользователь может принимать звонки только от проверенных жителей своего района, блокируя спам и фишинг».</p>
      </blockquote>`,

  9: `<h3>Слайд 9: Слайд 9</h3>
      <blockquote>
        <p>«Доверие граждан к платформе опирается на три гарантии защиты личной информации:</p>
        <p><strong>Слепая прямая доставка:</strong> обращения в ФНС или Минздрав шифруются ключом ведомства — администраторы серверов физически не могут прочитать содержимое.</p>
        <p><strong>Прозрачная реклама без слежки:</strong> по умолчанию рекламодатель видит только общий географический район. Анонимные категории интересов передаются только по добровольному согласию гражданина, а сквозной шпионаж исключен.</p>
        <p><strong>Надежное шифрование групповых чатов:</strong> серверы оперируют только зашифрованным текстом, исключая утечки при взломе хостинга».</p>
      </blockquote>`,

  10: `<h3>Слайд 10: Слайд 10</h3>
      <blockquote>
        <p>«Древовидная структура обеспечивает государственную безопасность по <strong>принципу герметичных отсеков подводной лодки</strong>:</p>
        <p><strong>Межведомственная изоляция:</strong> базы данных МВД, ФНС, Минздрава и Минобороны физически разделены. Взлом гражданского сайта или ЖКХ не дает доступа к контурам силовых ведомств. Взаимодействие идет строго по разовым цифровым пропускам.</p>
        <p><strong>Стандарт для стран БРИКС и ЕАЭС:</strong> архитектура готова к равноправному объединению со Стволами Китая, Индии и Бразилии при сохранении стопроцентного суверенитета над своими серверами и данными».</p>
      </blockquote>`,

  11: `<h3>Слайд 11: Слайд 11</h3>
      <blockquote>
        <p>«Внедрение платформы рассчитано на четыре последовательных этапа:</p>
        <p><strong>Этап 1:</strong> Пилотное развертывание в отдельном регионе и запуск базовых сервисов ЖКХ и землячества.</p>
        <p><strong>Этап 2:</strong> Интеграция с ведомственными контурами (ЕСИА, ФНС, Минздрав) и включение локального анализа данных.</p>
        <p><strong>Этап 3:</strong> Федеральное масштабирование на всю территорию страны и достижение восьмикратной экономии бюджета.</p>
        <p><strong>Этап 4:</strong> Развертывание трансграничных шлюзов и экспорт технологического стандарта в страны БРИКС и ЕАЭС».</p>
      </blockquote>`,

  12: `<h3>Слайд 12: Слайд 12</h3>
      <blockquote>
        <p>«В заключение отметим главное: платформа "Турбаза" объединяет три ключевых государственных приоритета:</p>
        <p><strong>Экономический суверенитет:</strong> восьмикратная экономия бюджета и независимость от поставок импортных чипов.</p>
        <p><strong>Национальная безопасность:</strong> изоляция ведомств, защита от киберпреступности и стандарт для БРИКС.</p>
        <p><strong>Социальное доверие:</strong> государство как цифровой поверенный гражданина и защита от коммерческой слежки.</p>
        <p>Фундамент платформы опирается на двадцать научных публикаций, представленных на следующих слайдах».</p>
      </blockquote>`,

  13: `<h3>Слайд 13: Слайд 13</h3>
      <blockquote>
        <p>«Первый блок академического реестра подтверждает математическую состоятельность локальных вычислений и топологии. Работы Сатьянараянана, Клеппмана и Шапиро в IEEE и ACM обосновывают разгрузку серверов на девяносто процентов и бесконфликтную автономную работу без связи».</p>
      </blockquote>`,

  14: `<h3>Слайд 14: Слайд 14</h3>
      <blockquote>
        <p>«Второй блок источников закрепляет модели данных и сетевую безопасность. Публикации Вейсмана, Левина и стандарты Zero-Trust подтверждают архитектуру единого эталонного источника, превентивный анализ сетевых цепочек и математическую защиту от ботов».</p>
      </blockquote>`,

  15: `<h3>Слайд 15: Слайд 15</h3>
      <blockquote>
        <p>«Заключительный блок фиксирует стандарты сквозной криптографии и суверенной федерации. Протоколы интернет-комитета IETF RFC 9420 и труды по защите личных данных подтверждают надежность группового шифрования и межведомственной изоляции».</p>
      </blockquote>`
};

document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 1;
  const totalSlides = 15;

  const slides = document.querySelectorAll('.slide-card');
  const slideIndicator = document.getElementById('slideIndicator');
  const dotsContainer = document.getElementById('dotsContainer');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  
  const notesModal = document.getElementById('notesModal');
  const notesBody = document.getElementById('notesBody');
  const notesSlideNumber = document.getElementById('notesSlideNumber');
  const btnNotes = document.getElementById('btnNotes');
  const btnCloseNotes = document.getElementById('btnCloseNotes');

  const overviewModal = document.getElementById('overviewModal');
  const overviewGrid = document.getElementById('overviewGrid');
  const btnOverview = document.getElementById('btnOverview');
  const btnCloseOverview = document.getElementById('btnCloseOverview');
  
  const btnFullscreen = document.getElementById('btnFullscreen');
  const btnPrint = document.getElementById('btnPrint');
  const btnVoice = document.getElementById('btnVoice');
  const btnPlayNotesAudio = document.getElementById('btnPlayNotesAudio');
  const slideAudioPlayer = document.getElementById('slideAudioPlayer');
  let isAudioPlaying = false;

  function getAudioSrcForSlide(slideNum) {
    const padded = String(slideNum).padStart(2, '0');
    return `../audio/slide_${padded}.mp3`;
  }

  function setAudioPlayingState(playing) {
    isAudioPlaying = playing;
    if (btnVoice) {
      btnVoice.classList.toggle('playing', playing);
      btnVoice.innerHTML = playing ? '<span class="btn-icon">⏸️</span> Пауза' : '<span class="btn-icon">🔊</span> Озвучка';
    }
    if (btnPlayNotesAudio) {
      btnPlayNotesAudio.classList.toggle('playing', playing);
      btnPlayNotesAudio.innerHTML = playing ? '⏸ Остановить' : '▶ Слушать озвучку';
    }
  }

  function toggleSlideAudio() {
    if (!slideAudioPlayer) return;
    const targetSrc = getAudioSrcForSlide(currentSlide);

    if (isAudioPlaying) {
      slideAudioPlayer.pause();
      setAudioPlayingState(false);
    } else {
      if (!slideAudioPlayer.src.includes(targetSrc)) {
        slideAudioPlayer.src = targetSrc;
      }
      slideAudioPlayer.play().then(() => {
        setAudioPlayingState(true);
      }).catch(err => {
        console.warn('Audio play error:', err);
        setAudioPlayingState(false);
      });
    }
  }

  if (slideAudioPlayer) {
    slideAudioPlayer.addEventListener('ended', () => {
      setAudioPlayingState(false);
    });
    slideAudioPlayer.addEventListener('pause', () => {
      setAudioPlayingState(false);
    });
    slideAudioPlayer.addEventListener('play', () => {
      setAudioPlayingState(true);
    });
  }

  if (btnVoice) btnVoice.addEventListener('click', toggleSlideAudio);
  if (btnPlayNotesAudio) btnPlayNotesAudio.addEventListener('click', toggleSlideAudio);

  // Generate Navigation Dots
  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `slide-dot ${i === 1 ? 'active' : ''}`;
    dot.title = `Перейти к слайду ${i}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Generate Overview Grid Items
  slides.forEach((slide, index) => {
    const slideNum = index + 1;
    const titleEl = slide.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.innerText : `Слайд ${slideNum}`;

    const thumb = document.createElement('div');
    thumb.className = `overview-thumb ${slideNum === 1 ? 'active' : ''}`;
    thumb.innerHTML = `
      <span class="overview-thumb-num">СЛАЙД ${slideNum}</span>
      <span class="overview-thumb-title">${titleText}</span>
    `;
    thumb.addEventListener('click', () => {
      goToSlide(slideNum);
      overviewModal.classList.remove('open');
    });
    overviewGrid.appendChild(thumb);
  });

  function updateUI() {
    slides.forEach((slide, index) => {
      const slideNum = index + 1;
      if (slideNum === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Dots
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index + 1 === currentSlide);
    });

    // Update Overview Thumbs
    const thumbs = document.querySelectorAll('.overview-thumb');
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle('active', index + 1 === currentSlide);
    });

    // Update Header Indicator
    slideIndicator.innerText = `Слайд ${currentSlide} / ${totalSlides}`;

    // Update Buttons
    btnPrev.disabled = currentSlide === 1;
    btnNext.innerText = currentSlide === totalSlides ? 'Завершить 🏁' : 'Вперед ▶';

    // Update Notes Content if Modal is Open
    updateNotesContent();
  }

  function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;
    const wasPlaying = isAudioPlaying;
    if (slideAudioPlayer) {
      slideAudioPlayer.pause();
      setAudioPlayingState(false);
    }
    currentSlide = slideNum;
    updateUI();
    if (slideAudioPlayer) {
      slideAudioPlayer.src = getAudioSrcForSlide(currentSlide);
      if (wasPlaying) {
        slideAudioPlayer.play().then(() => {
          setAudioPlayingState(true);
        }).catch(err => {
          console.warn(err);
          setAudioPlayingState(false);
        });
      }
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  // Expose globally for API / Playwright export automation
  window.goToSlide = goToSlide;
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.toggleSlideAudio = toggleSlideAudio;

  function updateNotesContent() {
    notesSlideNumber.innerText = `Слайд ${currentSlide}`;
    notesBody.innerHTML = speakerNotes[currentSlide] || '<p>Заметки для этого слайда отсутствуют.</p>';
  }

  // Button Listeners
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);

  btnNotes.addEventListener('click', () => {
    updateNotesContent();
    notesModal.classList.add('open');
  });

  btnCloseNotes.addEventListener('click', () => {
    notesModal.classList.remove('open');
  });

  btnOverview.addEventListener('click', () => {
    overviewModal.classList.add('open');
  });

  btnCloseOverview.addEventListener('click', () => {
    overviewModal.classList.remove('open');
  });

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Modal Backdrop Click to Close
  window.addEventListener('click', (e) => {
    if (e.target === notesModal) notesModal.classList.remove('open');
    if (e.target === overviewModal) overviewModal.classList.remove('open');
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    // If modal is open, Escape closes it
    if (e.key === 'Escape') {
      notesModal.classList.remove('open');
      overviewModal.classList.remove('open');
      return;
    }

    // Toggle Voice Audio with 'V'
    if (e.key === 'v' || e.key === 'V' || e.key === 'м' || e.key === 'М') {
      toggleSlideAudio();
      return;
    }

    // Toggle Notes with 'N'
    if (e.key === 'n' || e.key === 'N') {
      if (notesModal.classList.contains('open')) {
        notesModal.classList.remove('open');
      } else {
        updateNotesContent();
        notesModal.classList.add('open');
      }
      return;
    }

    // Toggle Overview with 'O'
    if (e.key === 'o' || e.key === 'O') {
      overviewModal.classList.toggle('open');
      return;
    }

    // Fullscreen with 'F'
    if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      return;
    }

    // Print with 'P' (without Ctrl)
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey) {
      window.print();
      return;
    }

    // Slide navigation keys
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(1);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides);
    }
  });

  // Initial render
  updateUI();
});


