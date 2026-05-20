<!-- forge:meta
     generated_by: planning-and-task-breakdown
     generated_at: 2026-05-20T00:00:00Z
     depends_on: [CLAUDE.md]
     generated_from:
       CLAUDE.md: fac47250
-->

# MindShop – Task Summary

## Ship View (estimated by session)

| Session | Tasks | What you'll see |
|---------|-------|-----------------|
| 1 | T001, T002, T003 | App boots, 3 tabs navigate, design system wired |
| 2 | T004, T005 | Product cards and filter pills render with sample data |
| 3 | T006 | Full Saves screen with header, list, empty state |
| 4 | T007, T008 | Pin modal + New List modal working |
| 5 | T009 | Item Detail modal, verdicts + notes save |
| 6 | T010 | Review screen, step through items, verdicts flow |
| 7 | T011 | Recap screen with live stats |
| 8 | T012 | Custom SVG icons in tab bar |

## Critical Path

T001 → T002/T003 → T004/T005 → T006 → T007/T008/T009 → T010 → T011

The Saves screen (T006) is the bottleneck — everything downstream depends on it. T012 (icons) is independent and can slot in any time after T001.

## Risk Areas

- **T006** — integrates header, filter pills, cards, and empty state in one pass. Most integration surface of any task.
- **T010** — verdict state needs to flow correctly back to Saves badges and forward to Recap. Cross-screen state is the highest-risk wiring point.

## Parallel Opportunities

Once T006 is done, T007, T008, and T009 are fully independent and could be built simultaneously.

## Status Tracker

| ID | Title | Size | Status |
|----|-------|------|--------|
| T001 | Scaffold Expo project with tab navigator | S | pending |
| T002 | Design system constants | XS | pending |
| T003 | Sample data and data model | XS | pending |
| T004 | Product card component | S | pending |
| T005 | List filter pills | S | pending |
| T006 | Saves screen with header and empty state | M | pending |
| T007 | Pin a Product modal | M | pending |
| T008 | New List modal with symbol picker | M | pending |
| T009 | Item Detail modal | M | pending |
| T010 | Review screen | M | pending |
| T011 | Recap screen | M | pending |
| T012 | Custom SVG tab icons | S | pending |

**12 tasks · 0 done · 0 in progress · 12 pending**
