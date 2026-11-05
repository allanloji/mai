# Booking-v3 date format hint contradicts day-first input — 33 reports

## Problem and count

33 unique reports from desk ticket #4471 belong to the form-hint cause across three tenants, received 2026-04-17 through 2026-09-22. Counted from the 2026-10-04 KB export, deduplicated by report ID, filtered to mergedInto=4471, and classified with causes.ts using tenant settings and channel. The intake tag is only a guess; classification uses the tenant locale and form version.

Affected form submissions are for alder.physio (de-DE), copper.studio (es-ES), and pale.harbour (pt-PT), all on booking-v3. The hint prints MM/DD/YYYY but the form interprets entered dates according to the day-first tenant locale. Only form submissions through booking-v3 belong to this issue; app/email submissions are outside its scope.

## Evidence and reproduction target

R-41241 (alder.physio, form) describes 6 August appearing as 8 June. Reproduction to verify against the actual product: with that tenant's booking-v3 form, follow its MM/DD/YYYY hint and enter 08/06/2026 for 6 August. Expected: 6 August. Reported failure: 8 June because the field reads day first. R-41230 and R-41251 provide additional examples. This is a reproduction specification from the export, not a production test result.

## Completion checks

- Make the displayed hint, input format, validation and parsing agree with the tenant's date convention.
- Check all three affected locales and protect booking-v2 behavior and month-first tenants.
- Cover ambiguous numeric dates as well as days above 12, and verify the final booked date and invite.
- Route new reports by verified cause, not subject line. Monitor this issue independently after the hint fix.

The signed KB review reconciles the full export across separate tickets. This ticket covers only the 33 form-hint reports listed in its manifest.

Evidence: [full report-ID manifest](https://github.com/allanloji/mai/blob/main/evidence/hint-report-ids.txt), [computed analysis](https://github.com/allanloji/mai/blob/main/evidence/analysis.json). Run `pnpm evidence` at repository root. Signed review: `support-kb/src/routes/kb/incidents/4471-review/+page.svx`; rendered page: `rendered/kb/incidents/4471-review/index.html`.

## Engineering disposition

The course engineering update reports #4471 closed on 2026-10-05 and this problem marked won't fix because the booking-v3 form was retired. Closed as not planned; no fix to the hint is claimed. This supersedes the earlier administrative closure rationale. Source: [course desk update](https://hq.mega.dev/challenges/what-it-shows).
