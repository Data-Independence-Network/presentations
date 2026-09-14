#!/usr/bin/env bash
# Запуск локального веб-сервера презентационного комплекса платформы «Турбаза»

PORT=${1:-8080}

# 1. Автоматическая проверка занятости порта и освобождение от предыдущего экземпляра
if command -v lsof >/dev/null 2>&1; then
  OCCUPIED_PIDS=$(lsof -ti :$PORT 2>/dev/null)
  if [ -n "$OCCUPIED_PIDS" ]; then
    for P in $OCCUPIED_PIDS; do
      CMD_LINE=$(ps -p "$P" -o args= 2>/dev/null)
      if echo "$CMD_LINE" | grep -E -q "(http\.server|start_presentation)"; then
        echo "  [🔄] Остановка предыдущего экземпляра сервера (PID $P)..."
        kill -15 "$P" 2>/dev/null || kill -9 "$P" 2>/dev/null
      fi
    done
    sleep 0.5
  fi

  # Если порт всё ещё занят другим процессом — подбираем следующий свободный
  while lsof -ti :$PORT >/dev/null 2>&1; do
    echo "  [⚠️] Порт $PORT занят сторонним приложением. Пробуем следующий..."
    PORT=$((PORT + 1))
  done
fi

# 2. Автоматическая актуализация каталога презентаций (index.html)
if command -v node >/dev/null 2>&1; then
  node scripts/generate_portal.js >/dev/null 2>&1
fi

echo "=========================================================================="
echo "  🏔️  ПЛАТФОРМА «ТУРБАЗА» — ПРЕЗЕНТАЦИОННЫЙ КОМПЛЕКС ЦИФРОВОГО СУВЕРЕНИТЕТА"
echo "=========================================================================="
echo ""
echo "  🌟 ЕДИНЫЙ ПОРТАЛ ВСЕХ ПРЕЗЕНТАЦИЙ (ГЛАВНАЯ СТРАНИЦА):"
echo "  👉 http://localhost:$PORT/"
echo ""
echo "  🎙️  ГОТОВЫЕ ПРЕЗЕНТАЦИИ С НЕЙРООЗВУЧКОЙ (5 ЗАВЕРШЁННЫХ ТРЕКОВ):"
echo "  1. Эксплейнер 1: Парадигмальный сдвиг и суверенитет данных"
echo "     http://localhost:$PORT/platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/"
echo ""
echo "  2. Эксплейнер 2: Анатомия и Архитектура платформы"
echo "     http://localhost:$PORT/platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/"
echo ""
echo "  3. Эксплейнер 3: Суверенная экономика и смарт-контракты"
echo "     http://localhost:$PORT/platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/"
echo ""
echo "  4. Мастер-обзор: Архитектура Цифрового Суверенитета"
echo "     http://localhost:$PORT/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/"
echo ""
echo "  5. Мастер-обзор: Матрица Ценности для Стейкхолдеров"
echo "     http://localhost:$PORT/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/"
echo ""
echo "=========================================================================="
echo "  💡 УПРАВЛЕНИЕ ОЗВУЧКОЙ:"
echo "  В браузерах Safari / Chrome на macOS для запуска звука на первой"
echo "  странице достаточно кликнуть в любом месте слайда или нажать Пробел."
echo "  Чтобы звук запускался всегда без кликов:"
echo "  Safari -> Меню Safari -> Настройки для этого веб-сайта -> Автовоспроизведение: Разрешить все."
echo "=========================================================================="
echo "  Сервер запущен на http://localhost:$PORT/"
echo "  Нажмите Ctrl+C для остановки сервера."
echo "=========================================================================="

# Автоматическое открытие в браузере по умолчанию на macOS
if command -v open >/dev/null 2>&1; then
  (sleep 0.4 && open "http://localhost:$PORT/") &
fi

python3 -m http.server $PORT
