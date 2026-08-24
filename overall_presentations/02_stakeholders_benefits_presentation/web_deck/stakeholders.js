/**
 * Interactive Presentation Controller for Stakeholder Benefits Deck
 */

const speakerNotes = {
  1: "Здравствуйте! Мы представляем платформу «Турбаза» — принципиально новую архитектуру национального цифрового пространства. Платформа объединяет государственные интересы, потребности бизнеса и права граждан на владение собственной информацией. В этой презентации мы подробно раскроем, какие измеримые выгоды получает каждый участник экосистемы — от отдельного жителя и малого предприятия до банков, силовых структур и органов государственной власти.",
  2: "Традиционная модель централизованных супер-ЦОД и платформенных монополий зашла в тупик. Во-первых, санкционный дефицит серверных процессоров делает бесконечное наращивание дата-центров непосильным бременем для бюджета. Во-вторых, концентрация миллионов персональных данных в корпоративных базах неизбежно приводит к массовым утечкам и разгулу телефонного мошенничества. В-третьих, цифровые гиганты взимают до тридцати пяти процентов комиссий, монополизируя рекламные доходы и подавляя отечественный бизнес.",
  3: "Турбаза решает эти вызовы через смену парадигмы. Вся бизнес-логика, хранение и реляционные индексы переносятся на конечные устройства пользователей — так называемые «Листья». Серверы районных «Веток» служат исключительно защищенными брокерами маршрутизации и не имеют доступа к содержимому данных. Приложения обмениваются информацией напрямую по протоколу P2P, используя открытые сквозные схемы данных. Это превращает сто сорок миллионов пользовательских устройств в единый, колоссальный по мощности суперкомпьютер.",
  4: "Главный бенефициар платформы — гражданин. Личные файлы и документы отправляются на Ветку для зашифрованного хранения, расшифровываются исключительно на устройствах пользователя и помещаются в локальную базу данных для работы приложений. Трехуровневая верификация и механизм «Землячество» исключают спам-звонки и мошенников: на районных форумах гарантированно общаются только реальные соседи. При покупках адрес не передается магазинам, а доход от персонализированной рекламы справедливо делится между операторами инфраструктуры, разработчиками приложений и пользователем, автоматически покрывая затраты на хранение данных и принося токены на оплату связи и цифровых сервисов.",
  5: "Малый и средний бизнес получает фундаментальное конкурентное преимущество. Затраты на серверную инфраструктуру снижаются до нуля — все вычисления выполняются на процессорах клиентов. Предприниматели освобождаются от кабальных комиссий маркетплейсов в двадцать-тридцать процентов и получают мгновенный доступ к жителям своего района через локальный каталог. А так как бизнес больше не хранит чужие персональные данные, риски штрафов по закону о защите персональных данных полностью исчезают.",
  6: "Для АйТи-индустрии «Турбаза» открывает рынок кооперативной разработки. Создавая узкоспециализированный модуль или схему данных, независимый программист подключается к общей экосистеме. Доходы платформы от рекламы и подписок справедливо распределяются с разработчиками. Смарт-контракты фиксируют стек выполнения и делят вознаграждение между создателем экранного интерфейса и авторами всех вызванных модулей и схем логики. При этом математическая модель теории игр защищает разработчиков от ценового диктата и попыток рейдерского захвата их решений крупными игроками.",
  7: "Рекламный рынок избавляется от главной проблемы современного интернета — скликивания и бот-трафика. Каждый показ криптографически заверяется реальным устройством живого пользователя. Локальный искусственный интеллект на смартфоне сопоставляет предложения рекламодателей со 100% точностью контекста, не раскрывая персональные данные в сеть. Рекламодатель платит только за подтвержденный контакт с целевой аудиторией, получая криптографическое доказательство реального показа живому человеку без накруток ботами.",
  8: "Банковский сектор резко сокращает операционные расходы и риски мошенничества. Кредитный скоринг с нулевым разглашением позволяет одобрить заявку за одну секунду: устройство заемщика подтверждает уровень дохода криптографической подписью ФНС без передачи выписок по счетам. Платформа нативно поддерживает стандарты открытого банкинга и смарт-контракты Цифрового рубля, автоматизируя факторинг, безопасные B2B-сделки с эскроу и прямые P2P-платежи без посредников.",
  9: "Правоохранительные органы и службы безопасности получают мощный превентивный щит. Зарубежные мошеннические кол-центры физически не способны сымитировать локальное присутствие на районной Ветке. В системе отсутствует централизованная база данных — украсть все данные разом невозможно. Ведомственные контуры МВД, ФСБ и ФНС изолированы в суверенных блокчейн-репозиториях по принципу «герметичных отсеков», а неизменяемый журнал транзакций формирует безупречную доказательную базу.",
  10: "Для государства «Турбаза» — это преодоление санкционного дефицита оборудования и колоссальная бюджетная экономия. Совокупные затраты на закупку серверного оборудования и содержание ЦОД снижаются более чем в восемь раз. Уникальный механизм федеративной аналитики позволяет руководству страны и губернаторам получать точные сводки по ценам, запасам лекарств и занятости за три секунды, суммируя компактные стодвадцативосьмибайтные отчеты напрямую с устройств граждан.",
  11: "Развертывание платформы дает измеримый результат с первого же дня благодаря флагманской триаде сервисов. Социальная сеть «Забота» предоставляет жителям доверенные домовые и районные форумы взаимопомощи без спама. Муниципальный каталог позволяет вызвать проверенного мастера или заказать доставку без наценок. А система «КубГолос» обеспечивает прямую обратную связь с жителями района, гарантируя объективность каждого опроса и достоверность мнения граждан без накруток ботами.",
  12: "На следующем этапе подключаются государственные реестры и отраслевые ведомства. Цифровой паспорт и медицинская карта загружаются в зашифрованную базу на телефоне гражданина. Врач скорой помощи считывает историю болезни через P2P-канал даже при полном отсутствии связи в отдаленном районе. В электронной коммерции реализуется слепое разделение: магазин принимает оплату, а домашний адрес передается напрямую службе доставки, гарантируя стопроцентную защиту тайны частной жизни.",
  13: "Платформа демонстрирует исключительную физическую и энергетическую живучесть. Рассеянные микровычисления разгружают энергосети мегаполисов, устраняя необходимость строительства мегаваттных дата-центров. В перспективе в труднодоступных районах Крайнего Севера или в зоне чрезвычайных ситуаций устройства платформы будут формировать автономные локальные Mesh-сети, обеспечивая связь даже при отсутствии интернета. А оптимизированное ядро стабильно работает даже на ультрабюджетных смартфонах с двумя гигабайтами оперативной памяти.",
  14: "Архитектура «Турбазы» спроектирована с запасом прочности на десятилетия вперед. В перспективе внедрение постквантовой криптографии на базе математических решеток защитит государственные тайны от будущих квантовых суперкомпьютеров на тридцать лет вперед. Персональные AI-агенты будут безопасно автоматизировать рутину граждан, а микроузлы интернета вещей обеспечат управление умным транспортом. В дальнейшем объединение суверенных Стволов создаст независимый контур внешнеторгового клиринга в пространстве БРИКС без использования SWIFT.",
  15: "Платформа «Турбаза» закладывает основу новой цифровой модели: Она не забирает данные у граждан, а закрепляет за ними статус полноправных владельцев собственной информации. Она не требует триллионов на закупку дефицитных серверов, а объединяет вычислительную мощь миллионов устройств. Архитектура проекта математически выверена и готова к стадии опытно-конструкторской разработки, пилотному внедрению в регионе и последующему масштабированию. Благодарим за внимание."
};

let currentSlide = 1;
const totalSlides = 15;
let isPlaying = false;
let isNotesOpen = false;
let isOverviewOpen = false;

const slideCards = document.querySelectorAll('.slide-card');
const slideIndicator = document.getElementById('slideIndicator');
const notesDrawer = document.getElementById('notesDrawer');
const notesContent = document.getElementById('notesContent');
const overviewModal = document.getElementById('overviewModal');
const overviewGrid = document.getElementById('overviewGrid');
const slideAudio = document.getElementById('slideAudio');

const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnPlayPause = document.getElementById('btnPlayPause');
const btnVoice = document.getElementById('btnVoice');
const btnNotes = document.getElementById('btnNotes');
const btnOverview = document.getElementById('btnOverview');
const btnCloseOverview = document.getElementById('btnCloseOverview');
const btnFullscreen = document.getElementById('btnFullscreen');
const btnPrint = document.getElementById('btnPrint');

function showSlide(num) {
  if (num < 1) num = 1;
  if (num > totalSlides) num = totalSlides;
  currentSlide = num;

  slideCards.forEach(card => card.classList.remove('active'));
  const activeCard = document.querySelector(`.slide-card[data-slide="${currentSlide}"]`);
  if (activeCard) activeCard.classList.add('active');

  slideIndicator.textContent = `Слайд ${currentSlide} / ${totalSlides}`;
  notesContent.textContent = speakerNotes[currentSlide] || "Заметки отсутствуют.";

  // Update audio source
  const padded = String(currentSlide).padStart(2, '0');
  slideAudio.src = `../audio/slide_${padded}.mp3`;

  if (isPlaying) {
    slideAudio.play().catch(() => {});
  } else {
    slideAudio.pause();
  }

  updateThumbnails();
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 1) {
    showSlide(currentSlide - 1);
  }
}

function toggleVoice() {
  if (isPlaying) {
    slideAudio.pause();
    isPlaying = false;
    btnVoice.classList.remove('playing');
    btnPlayPause.textContent = "▶ Воспроизвести слайд";
    btnPlayPause.style.background = "var(--gold-primary)";
    btnPlayPause.style.color = "#000";
  } else {
    slideAudio.play().then(() => {
      isPlaying = true;
      btnVoice.classList.add('playing');
      btnPlayPause.textContent = "⏸ Пауза";
      btnPlayPause.style.background = "var(--emerald-primary)";
      btnPlayPause.style.color = "#000";
    }).catch(err => {
      console.warn("Audio play blocked or file not ready:", err);
    });
  }
}

slideAudio.addEventListener('ended', () => {
  if (currentSlide < totalSlides) {
    // 4.0s pause on closing slide
    setTimeout(() => {
      nextSlide();
      if (isPlaying) {
        // 1.0s pause on coming slide before speech starts
        setTimeout(() => {
          if (isPlaying) {
            slideAudio.play().catch(() => {});
          }
        }, 1000);
      }
    }, 4000);
  } else {
    isPlaying = false;
    btnVoice.classList.remove('playing');
    btnPlayPause.textContent = "▶ Воспроизвести сначала";
    btnPlayPause.style.background = "var(--gold-primary)";
    btnPlayPause.style.color = "#000";
  }
});

function toggleNotes() {
  isNotesOpen = !isNotesOpen;
  notesDrawer.classList.toggle('open', isNotesOpen);
}

function toggleOverview() {
  isOverviewOpen = !isOverviewOpen;
  overviewModal.classList.toggle('open', isOverviewOpen);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

function buildOverviewGrid() {
  overviewGrid.innerHTML = '';
  slideCards.forEach((card, idx) => {
    const num = idx + 1;
    const titleEl = card.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.textContent : `Слайд ${num}`;

    const thumb = document.createElement('div');
    thumb.className = `overview-thumb ${num === currentSlide ? 'active' : ''}`;
    thumb.innerHTML = `
      <div class="thumb-num">СЛАЙД ${num}</div>
      <div class="thumb-title">${titleText}</div>
    `;
    thumb.addEventListener('click', () => {
      showSlide(num);
      toggleOverview();
    });
    overviewGrid.appendChild(thumb);
  });
}

function updateThumbnails() {
  const thumbs = document.querySelectorAll('.overview-thumb');
  thumbs.forEach((thumb, idx) => {
    thumb.classList.toggle('active', (idx + 1) === currentSlide);
  });
}

// Event Listeners
btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);
btnVoice.addEventListener('click', toggleVoice);
btnPlayPause.addEventListener('click', toggleVoice);
btnNotes.addEventListener('click', toggleNotes);
btnOverview.addEventListener('click', toggleOverview);
btnCloseOverview.addEventListener('click', toggleOverview);
btnFullscreen.addEventListener('click', toggleFullscreen);
btnPrint.addEventListener('click', () => window.print());

document.addEventListener('keydown', (e) => {
  if (isOverviewOpen && e.key === 'Escape') {
    toggleOverview();
    return;
  }
  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault();
      prevSlide();
      break;
    case 'v':
    case 'V':
    case 'м':
    case 'М':
      toggleVoice();
      break;
    case 'n':
    case 'N':
    case 'т':
    case 'Т':
      toggleNotes();
      break;
    case 'o':
    case 'O':
    case 'щ':
    case 'Щ':
      toggleOverview();
      break;
    case 'f':
    case 'F':
    case 'а':
    case 'А':
      toggleFullscreen();
      break;
  }
});

// Initialize
buildOverviewGrid();
showSlide(1);
