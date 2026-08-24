# План суверенной презентации платформы «Турбаза» (15 Слайдов)

> **Целевое назначение:** Презентация архитектуры и преимуществ платформы «Турбаза» для государственных органов и национальных регуляторов.  
> **Ключевой фокус:** **Абсолютная безопасность, превентивная аналитика и защита частной информации** + **Сверхэффективность и 10-кратное снижение затрат на серверную инфраструктуру (ЦОД)**.  
> **Формат адаптации:** Готов для прямой конвертации в Google Slides (визуалы, графики, дикторский текст, научно-технический базис).

---

## Структура презентации (15 Слайдов)

* **Слайд 1: Титульный:** Платформа «Турбаза» — Национальная суверенная инфраструктура данных и защищенных вычислений.
* **Слайд 2: Стратегические вызовы:** Кризис облачных платформ и открытых мессенджеров (дефицит чипов, кибермошенники без IP-проверок, рекламные сливы).
* **Слайд 3: Архитектурный сдвиг:** Edge & Local-First вычисления: «Лист» вместо супер-ЦОД `[1, 2, 3]`.
* **Слайд 4: Древовидная топология и локальный поиск (OLTP):** Логарифмическая масштабируемость $O(\log N)$ и клиентский поиск `[4, 5]`.
* **Слайд 5: Федеративный OLAP:** 100% личных отчетов на клиенте + Древовидный MapReduce `[6, 7, 8]`.
* **Слайд 6: Графики сравнительной эффективности ресурсов:** Сокращение аппаратных затрат ЦОД на 85–99% `[1, 2, 6, 7, 8]`.
* **Слайд 7: Межприкладные схемы данных:** Single Source of Truth и принцип «Write-Self» `[9, 10, 11]`.
* **Слайд 8: Периметр безопасности и 3 уровня локальной регистрации:** Превентивная аналитика графов и Proof-of-Personhood `[12, 13, 14, 15, 16]`.
* **Слайд 9: Восстановление доверия граждан:** Землячество, «слепая» маршрутизация и защита частной информации `[17, 18, 19, 20]`.
* **Слайд 10: Межведомственная изоляция и международная федерация:** Микросегментация и суверенные Стволы БРИКС `[12, 14]`.
* **Слайд 11: Дорожная карта внедрения и экономический эффект:** 3-летний план (разработка стека `beyond-decentralized`, пилот, масштаб) + перспектива БРИКС `[1, 2, 7]`.
* **Слайд 12: Стратегическое заключение и переход к реестру источников:** Итоги архитектуры и введение к приложению первоисточников.
* **Слайд 13: Реестр первоисточников (Часть 1/3):** Топология, Edge Compute и Федеративный OLAP `[1]–[7]`.
* **Слайд 14: Реестр первоисточников (Часть 2/3):** Схемы данных, Zero-Trust и Безопасность `[8]–[14]`.
* **Слайд 15: Реестр первоисточников (Часть 3/3):** Идентичность, Криптография и Стек `[15]–[20]` + репозиторий `beyond-decentralized`.

---

## Полный реестр академических и нормативных первоисточников [1] – [20]

1. **[Satyanarayanan, M. (2017)](https://ieeexplore.ieee.org/document/7839739)** — *The Emergence of Edge Computing*. IEEE Computer, 50(1), 30–39. *(Снижение нагрузки на серверы и магистральные каналы на 80–90% за счет вычислений на периферии).*
2. **[Kleppmann, M. et al. (2019)](https://dl.acm.org/doi/10.1145/3359591.3359737)** — *Local-First Software: You own your data, in spite of the cloud*. ACM Onward!, 154–178. *(Концепция автономного исполнения логики и хранения данных на клиентских устройствах).*
3. **[Shapiro, M. et al. (2011)](https://hal.inria.fr/inria-00609399/)** — *Conflict-Free Replicated Data Types*. INRIA Research Report RR-7687. *(Математический аппарат бесконфликтной синхронизации данных при оффлайн-работе).*
4. **[Bayer, R. & McCreight, E. (1972)](https://link.springer.com/article/10.1007/BF00288683)** — *Organization and Maintenance of Large Ordered Indexes*. Acta Informatica, 1(3), 173–189. *(B-деревья, логарифмическая сложность $O(\log N)$ и иерархическая маршрутизация).*
5. **[Lamport, L. (1978)](https://dl.acm.org/doi/10.1145/359545.359563)** — *Time, Clocks, and the Ordering of Events in a Distributed System*. CACM, 21(7), 558–565. *(Логические часы и упорядочивание неизменяемых лог-записей транзакций).*
6. **[Raasveldt, M. & Mühleisen, H. (2019)](https://dl.acm.org/doi/10.1145/3299869.3320212)** — *DuckDB: an Embeddable Analytical Database*. ACM SIGMOD, 1981–1984. *(Встраиваемый векторизованный OLAP-движок внутри процесса клиента).*
7. **[McMahan, B., Ramage, D. et al. (2020)](https://arxiv.org/abs/2006.07466)** — *Advances and Open Problems in Federated Analytics*. Google Research / arXiv:2006.07466. *(Федеративная аналитика на клиентах без сбора сырых персональных данных).*
8. **[Dean, J. & Ghemawat, S. (2004)](https://dl.acm.org/doi/10.1145/1327452.1327492)** — *MapReduce: Simplified Data Processing on Large Clusters*. CACM, 51(1), 107–113. *(Иерархическая древовидная редукция метрик госстатистики).*
9. **[Codd, E.F. (1970)](https://dl.acm.org/doi/10.1145/362384.362685)** — *A Relational Model of Data for Large Shared Data Banks*. CACM, 13(6), 377–387. *(Реляционная нормализация, внешние ключи и исключение дублирования данных).*
10. **[Saltzer, J.H. & Schroeder, M.D. (1975)](https://ieeexplore.ieee.org/document/1451869)** — *The Protection of Information in Computer Systems*. Proceedings of the IEEE, 63(9), 1278–1308. *(Принцип наименьших привилегий и модель «Read-Anywhere, Write-Self»).*
11. **[Buneman, P., Khanna, S., & Tan, W.C. (2001)](https://link.springer.com/chapter/10.1007/3-540-44503-X_20)** — *Why and Where: A Characterization of Data Provenance*. ICDT / Springer, 316–330. *(Происхождение данных, криптографический аудит и отслеживание источников транзакций).*
12. **[NIST Special Publication 800-207 (2020)](https://csrc.nist.gov/publications/detail/sp/800-207/final)** — *Zero Trust Architecture*. National Institute of Standards and Technology. *(Микросегментация ведомств и ликвидация горизонтального распространения атак).*
13. **[Dennis, J.B. & Van Horn, E.C. (1966)](https://dl.acm.org/doi/10.1145/365230.365252)** — *Programming Semantics for Multiprogrammed Computations*. CACM, 9(3), 143–155. *(Capability-based изоляция и запрет прямого сетевого ввода-вывода).*
14. **[Albert, R., Jeong, H., & Barabási, A.-L. (2000)](https://www.nature.com/articles/35019019)** — *Error and attack tolerance of complex networks*. Nature, 406, 378–382. *(Топологическая устойчивость сетей и защита скрытого ядра Dark Core).*
15. **[Douceur, J.R. (2002)](https://www.microsoft.com/en-us/research/publication/the-sybil-attack/)** — *The Sybil Attack*. IPTPS / Springer LNCS 2429, 251–260. *(Математическое обоснование уязвимости открытых сетей перед ботнетами).*
16. **[Ford, B. & Strauss, J. (2008)](https://bford.info/pub/soc/pop-abs/)** — *An Offline Foundation for Online Accountable Pseudonyms (Pseudonym Parties)*. MIT / SIGCOMM. *(Академическая основа Proof-of-Personhood и оффлайн-жеребьевки групп).*
17. **[Goldschlag, D., Reed, M., & Syverson, P. (1999)](https://dl.acm.org/doi/10.1145/310889.310900)** — *Onion Routing for Anonymous and Private Internet Connections*. CACM, 42(2), 39–41. *(Многоуровневая «слепая» маршрутизация обращений в ведомства).*
18. **[Erlingsson, Ú., Pihur, V., & Korolova, A. (2014)](https://dl.acm.org/doi/10.1145/2660267.2660348)** — *RAPPOR: Randomized Aggregable Privacy-Preserving Ordinal Response*. ACM CCS, 1054–1067. *(Локальная дифференциальная приватность и защита данных при аналитике).*
19. **[IETF RFC 9420 (2023)](https://www.rfc-editor.org/rfc/rfc9420.html)** — *The Messaging Layer Security (MLS) Protocol & TreeKEM*. IETF. *(Стандарт сквозного шифрования групповых коммуникаций с Forward Secrecy).*
20. **[Merkle, R.C. (1987)](https://link.springer.com/chapter/10.1007/3-540-48184-2_32)** — *A Digital Signature Based on a Conventional Encryption Function*. CRYPTO '87 / Springer. *(Хэш-деревья Merkle для неизменяемых, верифицируемых журналов транзакций).*

---
