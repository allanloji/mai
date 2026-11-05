# Shared parser reads day-first tenant dates as month-first — 379 reports

## Problem and count

379 unique reports from desk ticket #4471 belong to the parser cause across 11 tenants, received 2026-04-01 through 2026-10-04. Counted from the 2026-10-04 KB export, deduplicated by report ID, filtered to mergedInto=4471, and classified with causes.ts using the tenant locale, booking form and channel. Browser locale and intake tags are not authoritative: 356 of these reports were tagged parser and 23 were tagged hint.

The shared parser reads month first even when the tenant writes day first. The exported classifier puts day-first app/email reports and booking-v2 form reports here. Day-first booking-v3 form reports belong to the separate hint issue.

## Evidence and reproduction target

R-41201 (harbour.dental, en-GB, app) reports 4 July appearing as 7 April. Reproduction to verify against the actual product: submit 04/07/2026 through a day-first tenant's affected path; inspect the stored date and invite. Expected: 4 July. Reported failure: 7 April. This challenge includes data and a classifier, not a runnable production parser; this is a reproduction specification, not a claim that production was tested.

## Scope and uncertainty

Five desk-noted exceptions remain included in the 379: R-41202, R-41209, R-41236, R-41344, R-41620. Their one-day/timing descriptions do not independently establish this mechanism or a third bug. Preserve the source evidence and investigate original booking, timezone, and invite timestamps before changing their classification. R-41620 was still reporting a failure on the export's last day; queued does not mean fixed.

## Completion checks

- Respect the agreed input format and tenant locale on affected paths; reject impossible/ambiguous input where its format is unknown.
- Preserve intended dates in storage and generated invites. Cover day/month values both below 13, a day above 12, month-first tenants, and regression cases from the records.
- Investigate the five exceptions and document any reassignment by ID without double counting.
- Keep the booking-v3 hint fix separate; verify fresh reports after rollout.

Evidence: [full report-ID manifest](https://github.com/allanloji/mai/blob/main/evidence/parser-report-ids.txt), [computed analysis](https://github.com/allanloji/mai/blob/main/evidence/analysis.json). Run `pnpm evidence` at repository root. Signed review: `support-kb/src/routes/kb/incidents/4471-review/+page.svx`; rendered page: `rendered/kb/incidents/4471-review/index.html`.
