<script lang="ts">
  import raw from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import {uniqueById, groupByCause, type Report} from '#lib/kb/causes';
  import {tenantOf} from '#lib/kb/locales';
  const reports = uniqueById(raw as Report[]).filter(r=>r.mergedInto===4471);
  const groups = groupByCause(reports,tenantOf);
  const disagreements = groups.reduce((n,g)=>n+Object.entries(g.taggedAs).reduce((n,[tag,count])=>n+(tag===g.cause?0:count),0),0);
  const from=Date.parse('2026-06-29'); const to=Date.parse('2026-07-06');
  const inWeek=(s:string|null)=>s!==null&&Date.parse(s.slice(0,10))>=from&&Date.parse(s.slice(0,10))<to;
  const received=reports.filter(r=>inWeek(r.receivedAt)).length;
  const merged=reports.filter(r=>inWeek(r.mergedAt)).length;
  const anomalies=reports.filter(r=>notes.oneDayMove.includes(r.id));
</script>
<p><strong>{raw.length}</strong> export rows contain <strong>{reports.length}</strong> unique reports for #4471; <strong>{raw.length-reports.length}</strong> repeated rows are counted once by report ID. <strong>{disagreements}</strong> intake tags disagree with the tenant-based classification.</p>
<p>In the week starting 2026-06-29, <strong>{received}</strong> reports arrived and <strong>{merged}</strong> were merged. The merge spike records desk activity. It does not measure incident onset; reports had already arrived in April.</p>
<p><strong>{anomalies.length}</strong> desk-noted exceptions remain within the parser count: {anomalies.map(r=>r.id).join(', ')}. One-day shifts, differing recipient dates and an invite reported before booking require follow-up; these records alone do not establish a third cause.</p>
