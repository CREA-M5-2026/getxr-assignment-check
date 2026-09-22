(function (root) {
 'use strict';
 function calculate(rubric, state) {
  const prerequisites = state.pre;
  if (prerequisites.some(x => x.status === 'fail')) return {score:0, reason:'A submission prerequisite or code explanation requirement is not met.', automaticZero:true};
  if (prerequisites.some(x => x.status === 'pending') || state.items.some(x => x.status === 'pending')) return {score:null, pending:true, reason:'Review the submission requirements and every checklist item.'};
  const failed = state.items.map(x => x.status === 'fail');
  const core = rubric.features.filter((x,i)=>x.core && failed[i]).length;
  const support = rubric.features.filter((x,i)=>!x.core && failed[i]).length;
  let score=null, reason='';
  if (rubric.id === 'A1') {
   // A1 uses named items, not the shared core-count scale. Apply its lowest applicable ceiling.
   const ceilings=[10];
   if (failed[0] && failed[1]) ceilings.push(2);
   else if (failed[0] || failed[1]) ceilings.push(4);
   if (failed[2]) ceilings.push(6);
   if (support===1) ceilings.push(8);
   if (support===2) ceilings.push(6);
   if (support>=3) ceilings.push(4);
   score=Math.min(...ceilings);
   reason='A1 named-item scale; the lowest applicable ceiling is used (3–4 missing Supporting items = “several”).';
  } else if (rubric.id === 'A2') {
   if(core>=3) score=2;
   else if(core===2 || (core===1 && support>=2)) score=4;
   else if((core===1 && support===0) || (core===0 && support===2)) score=6;
   else if(core===0 && support===1) score=8;
   else if(core===0 && support===0) score=10;
  } else if (rubric.id === 'A3') {
   if(core>=3) score=2;
   else if(core===2) score=4;
   else if(core===1 && support<=1) score=6;
   else if(core===0 && support===1) score=8;
   else if(core===0 && support===0) score=10;
  } else if (rubric.id === 'A4') {
   score=core>=3?2:core===2?4:core===1?(support?4:6):support?8:10;
  } else {
   score=core>=3?2:core===2?4:core===1?6:support?8:10;
  }
  if(score===null) return {score:null, ambiguous:true, core, support, reason:`The published ${rubric.id} scale does not assign a score for ${core} failed Core and ${support} failed Supporting item(s). Instructor review required.`};
  return {score, core, support, reason:reason || `${core} Core and ${support} Supporting item(s) not met; ${rubric.id} published grading scale.`};
 }
 function result(rubric,state) {
  const base=calculate(rubric,state);
  if(base.pending) return base;
  let score=base.score, reason=base.reason;
  if(base.ambiguous) {
   if(![0,2,4,6,8,10].includes(Number(state.manual)) || state.manual==='' || !state.manualReason?.trim()) return base;
   score=Number(state.manual); reason+=` Instructor decision: ${state.manualReason.trim()} (rubric grade ${score}/10).`;
  }
  if(rubric.id==='A6' && !base.automaticZero && !state.hardware) return {...base,score:null,pending:true,reason:'Confirm whether the demonstration uses a headset or only the simulator.'};
  const raw=score, caps=[];
  if(rubric.id==='A6' && state.hardware==='simulator') {score=Math.min(score,8);caps.push('Simulator ceiling: 8/10');}
  return {...base,score,raw,reason,caps};
 }
 root.Grading={calculate,result};
 if(typeof module!=='undefined') module.exports=root.Grading;
})(globalThis);
