# AGENTS.md — architecture_presentations

## 🎯 Purpose & Scope
This directory contains the complete technical presentation suite **«Архитектура платформы Турбаза»** (Architecture Presentations) — a deep-dive 7-part engineering presentation track covering the inner workings of Leaf, Branch, Parent Branch, Trunk, storage engines, application framework, developer libraries, data pipelines, P2P network topology, TreeSearch, and cryptographic / API economic models.

---

## 🧭 Directory Structure & Sub-Tracks
```
architecture_presentations/
├── turbase_architecture_presentations_master_plan.md # Master plan and 7-part curriculum
├── AGENTS.md                                         # This agent context and guideline document
├── 01_topology_and_sovereignty/                      # 1. 3-tier topology, edge paradigm, trunk gateway
├── 02_leaf_storage_engine/                           # 2. Leaf storage, 3-ID columns, composite FKs
├── 03_app_framework_and_sdk/                         # 3. Framework, SQL sandbox, APIs, DI/ORM/Decorators
├── 04_branch_pipeline_and_storage/                   # 4. Branch pipeline: Queue -> ConcurrentMap -> Storage
├── 05_routing_p2p_and_passthrough/                   # 5. P2P links, passthrough tunnels, tree routing
├── 06_tree_search_and_analytics/                     # 6. TreeSearch indices, distributed queries, DR
└── 07_cryptography_and_api_economy/                  # 7. GOST/PQC, Zero-PII, ZK, FSM Smart Contracts, Keyring & API economy
```

---

## 📋 Architectural Standards & Conventions
1. **Author Notes as Source of Intent**: All technical concepts, terminology, and topological models must strictly reflect the human-written author notes in [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) (especially [`2026/09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md) and [`2026/09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).
2. **Strict Style Isolation**: All slide styles must be isolated and decoupled to prevent style regression or bleed into other tracks (`overall_presentations/`, `platform_overview/`, etc.).
3. **Billboard Typography**: Ensure mobile readability on 1920x1080 canvas (titles $\ge 50$px, body $\ge 24$px, cards $\ge 28$px).
4. **Zero Vertical Overflow**: All slides must fit strictly within 1920x1080 without scrolling (`scrollHeight <= clientHeight`).
5. **Standard Output Structure**:
   - `generated/artifacts/audio/` (pre-synthesized voice tracks)
   - `generated/artifacts/slides_png/` (slide captures)
   - `generated/outputs/web_deck/` (interactive player)
   - `generated/outputs/pdf/` (handouts)
   - `generated/outputs/video/` (master/email/10mb videos)
