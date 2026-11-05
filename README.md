# MEGA.dev S01E03 — what it shows

Review of the support desk's #4471 using the supplied KB export of 2026-10-04.

- **379** unique parser reports across 11 tenants.
- **33** unique booking-v3 form-hint reports across 3 tenants.
- **412** unique reports from 427 exported rows; 15 repeated rows counted once.
- Five desk-noted timing exceptions remain in the parser count pending investigation.

## Deliverables

- [Signed review source](support-kb/src/routes/kb/incidents/4471-review/+page.svx)
- [Rendered review HTML](rendered/kb/incidents/4471-review/index.html) — download/open locally; GitHub's source viewer displays HTML as code.
- [Screenshot of the rendered review](evidence/kb-review.png)
- [Parser issue #1](https://github.com/allanloji/mai/issues/1) and [form-hint issue #2](https://github.com/allanloji/mai/issues/2); local bodies in `issues/`
- [Revised triage procedure](support-kb/src/routes/kb/triage/dedupe/+page.svx)
- [Replacement decision 0002](support-kb/src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx); accepted decision 0001 is unchanged.
- [Computed evidence](evidence/analysis.json) and complete [parser](evidence/parser-report-ids.txt) / [hint](evidence/hint-report-ids.txt) ID manifests.

Signature: `Allan Loji / Codex / S01E03`. The original RenderStamp component derives the desk reference from that signature.

## Reproduce

Requires Node 22.12+ and pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm evidence
pnpm render
pnpm dev --port 4173
```

Open `http://127.0.0.1:4173/kb/incidents/4471-review`. The Svelte app preserves the interactive deduplication explorer. `rendered/` holds self-contained HTML snapshots with inline CSS, tables, chart, and signature; their form controls are snapshots, while live interaction is in the app. `dist/` is the browser build, served with an SPA fallback for `/kb` routes.

`pnpm evidence` executes the export's original classifier using the actual tenant directory and Intl locale data. It verifies unique-ID coverage, all five dedupe examples, matching duplicate rows, and cause counts. `pnpm render` compiles the original Svelte/mdsvex components into the readable snapshots. Counts, chart bars, staleness and signature are computed, not copied into HTML by hand.

## Evidence limits

This is a course simulation. The original export, tenant settings and classification functions are preserved. The old incident prose is marked superseded; current instructions lead to the review and decision 0002. The export does not include production application code or a live ticket feed. Reproduction steps are specifications inferred from the evidence, not claims of testing production. The later course engineering update closes #4471 on 2026-10-05: parser fixed; hint not planned because booking-v3 was retired. That update supplies the closure evidence; no independent production test is asserted. The five exceptions remain documented uncertainty in the export.

Validated: build; report-ID coverage; source/export integrity; static links; browser-rendered counts and stamp; interactive transition between same-cause and different-cause verdicts.

## Engineering disposition

The [course desk update](https://hq.mega.dev/challenges/what-it-shows) says #4471 closed on 2026-10-05: parser fixed (`fix(dates): parse dd/mm for eu locales`), hint won't fix (`booking-v3 form retired`). Issue #1 is completed; issue #2 is not planned. See [recorded update](evidence/engineering-update.json).
