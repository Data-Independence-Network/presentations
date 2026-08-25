#!/usr/bin/env bash
# Запуск локального сервера презентаций платформы «Турбаза»

PORT=8080
echo "========================================================="
echo "  Платформа «Турбаза» — Презентационный комплекс"
echo "========================================================="
echo " [Общие презентации / Overall Presentations]:"
echo " 1. Архитектура Цифрового Суверенитета:"
echo "    http://localhost:$PORT/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/"
echo ""
echo " 2. Матрица Ценности для Стейкхолдеров (15 слайдов):"
echo "    http://localhost:$PORT/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/"
echo ""
echo " [Детальные презентации по стейкхолдерам / Detailed Series]:"
echo " 3. Граждане и Домохозяйства:"
echo "    http://localhost:$PORT/detailed_overall_impact_presentations/01_citizens_presentation/generated/outputs/web_deck/"
echo "========================================================="
echo " Нажмите Ctrl+C для остановки сервера."
echo "========================================================="

python3 -m http.server $PORT
