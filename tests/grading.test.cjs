const assert=require('node:assert/strict');
require('../rubrics.js');require('../guidance.js');
const {calculate,result}=require('../grading.js');
const rubric=id=>globalThis.RUBRICS.find(r=>r.id===id);
const fixture=(id,fail=[])=>({pre:[{status:'pass',note:'',warningOnly:true},{status:'pass',note:'',warningOnly:false},{status:'pass',note:'',warningOnly:false}],items:rubric(id).features.map((_,i)=>({status:fail.includes(i+1)?'fail':'pass',note:'Observed issue'})),hardware:'headset',manual:'',manualReason:''});
const grade=(id,fail=[],overrides={})=>result(rubric(id),Object.assign(fixture(id,fail),overrides));
const cases=[
 ['A1',[],10],['A1',[4],8],['A1',[4,5],6],['A1',[4,5,6],4],['A1',[3],6],['A1',[1],4],['A1',[1,2],2],['A1',[3,4,5,6,7],4],
 ['A2',[],10],['A2',[6],8],['A2',[6,7],6],['A2',[1],6],['A2',[1,6,7],4],['A2',[1,2],4],['A2',[1,2,3],2],['A2',[6,7,8],null],['A2',[1,6],null],
 ['A3',[],10],['A3',[6],8],['A3',[1],6],['A3',[1,6],6],['A3',[1,2],4],['A3',[1,2,3],2],['A3',[6,7],null],['A3',[1,6,7],null],
 ['A4',[],10],['A4',[6,7],8],['A4',[1],6],['A4',[1,6],4],['A4',[1,2],4],['A4',[1,2,3],2],
 ['A5',[],10],['A5',[5],8],['A5',[4,5],6],['A5',[1,2],4],['A5',[1,2,3],2],
 ['A6',[],10],['A6',[4],8],['A6',[1,4],6],['A6',[1,2],4],['A6',[1,2,3],2]
];
for(const [id,fail,expected] of cases)assert.equal(grade(id,fail).score,expected,`${id}: failed ${fail}`);
assert.equal(grade('A6',[],{hardware:'simulator'}).score,8);
assert.equal(grade('A6',[1,2],{hardware:'simulator'}).score,4);
assert.equal(grade('A6',[],{hardware:''}).score,null);
assert.equal(grade('A3',[6,7],{manual:'6',manualReason:'Instructor confirmed'}).score,6);
assert.equal(grade('A3',[6,7],{manual:'6',manualReason:' '}).score,null);
assert.equal(grade('A3',[6,7],{manual:'7',manualReason:'Invalid band'}).score,null);
for(const r of globalThis.RUBRICS){
 assert.equal(r.features.length,globalThis.GUIDANCE[r.id].length);
 assert.equal(r.scale.length,6);
 // Every binary checklist state either yields a published band or an explicit review case.
 for(let bits=0;bits<2**r.features.length;bits++){
  const fail=r.features.filter((_,i)=>bits&(1<<i)).map(x=>x.number);
  const g=grade(r.id,fail);
  assert.ok(g.ambiguous || [0,2,4,6,8,10].includes(g.score));
  if(g.ambiguous)assert.ok(['A2','A3'].includes(r.id));
 }
 for(const i of [1,2]){
  const s=fixture(r.id);s.pre[i].status='fail';s.items.forEach(x=>x.status='pending');
  assert.equal(calculate(r,s).score,0,'Confirmed fatal prerequisite failures override an unfinished checklist');
  s.pre[i].status='pending';assert.equal(calculate(r,s).score,null);
 }
 const sWarnPending=fixture(r.id);sWarnPending.pre[0].status='fail';sWarnPending.items.forEach(x=>x.status='pending');
 assert.equal(calculate(r,sWarnPending).score,null,'Repo URL warning does not trigger automatic 0 while checklist is pending');
 const sWarnPass=fixture(r.id);sWarnPass.pre[0].status='fail';
 const gWarn=result(r,sWarnPass);
 assert.equal(gWarn.score,10,'Repo URL warning does not reduce passing score to 0');
 assert.ok(gWarn.caps.some(c=>c.includes('Repository URL')));
 const unfinished=fixture(r.id);unfinished.items[0].status='pending';assert.equal(calculate(r,unfinished).score,null);
}
console.log(`${cases.length} explicit score-band cases; simulator caps, review decisions, prerequisites and all 688 binary checklist combinations passed.`);
