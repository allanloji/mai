import fs from 'node:fs';
import assert from 'node:assert/strict';
import {uniqueById,groupByCause,readAs,sameCause} from '../support-kb/src/lib/kb/causes.ts';
import {deskRef} from '../support-kb/src/lib/kb/desk-ref.ts';
import {DEDUPE_CASES} from '../support-kb/src/lib/kb/dedupe-cases.ts';
const base='support-kb/src/lib/data/';
const signature=fs.readFileSync('support-kb/src/routes/kb/incidents/4471-review/+page.svx','utf8').match(/^signature: (.+)$/m)[1];
const raw=JSON.parse(fs.readFileSync(base+'reports-4471.json'));
const notes=JSON.parse(fs.readFileSync(base+'desk-notes.json'));
const tenants=fs.readdirSync(base+'tenants').map(n=>JSON.parse(fs.readFileSync(base+'tenants/'+n)));
const tenantOf=r=>tenants.find(t=>t.handle===r.tenant);
const reports=uniqueById(raw).filter(r=>r.mergedInto===4471);
const groups=groupByCause(reports,tenantOf);
const weeks = new Map();
const weekOf=s=>{const d=new Date(s.slice(0,10));d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);return d.toISOString().slice(0,10);};
for(const r of reports){for(const [field,value] of [['received',r.receivedAt],['merged',r.mergedAt]]){if(!value)continue;const w=weekOf(value);const row=weeks.get(w)||{week:w,received:0,merged:0};row[field]++;weeks.set(w,row);}}
const summary={exportDate:'2026-10-04',rawRows:raw.length,uniqueReports:reports.length,duplicateRows:raw.length-uniqueById(raw).length,groups:groups.map(({reports,...g})=>({...g,count:reports.length,oneDayNotes:readAs({...g,reports},notes.oneDayMove),reportIds:reports.map(r=>r.id)})),weeks:[...weeks.values()].sort((a,b)=>a.week.localeCompare(b.week)),cases:DEDUPE_CASES.map(c=>({case:c.why,sameSubject:c.a.subject===c.b.subject,sameCause:sameCause(c.a,tenantOf(c.a),c.b,tenantOf(c.b))})),signature,deskRef:deskRef(signature)};
assert.equal(summary.uniqueReports,412); assert.equal(summary.duplicateRows,15);
assert.deepEqual(groups.map(g=>[g.cause,g.reports.length]),[['parser',379],['hint',33]]);
assert.equal(groups.reduce((n,g)=>n+g.reports.length,0),reports.length);
assert.equal(new Set(groups.flatMap(g=>g.reports.map(r=>r.id))).size,reports.length);
assert.deepEqual(summary.cases.map(c=>c.sameCause),[true,false,false,true,false]);
for(const r of raw){assert.deepEqual(r,raw.find(x=>x.id===r.id));}
fs.writeFileSync('evidence/analysis.json',JSON.stringify(summary,null,2)+'\n');
for(const g of groups)fs.writeFileSync(`evidence/${g.cause}-report-ids.txt`,g.reports.map(r=>r.id).join('\n')+'\n');
console.log(JSON.stringify({...summary,groups:summary.groups.map(({reportIds,...g})=>g)},null,2));
