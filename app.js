'use strict';
const preDefinitions=[
 ['Repository URL submitted on Canvas', 'Open the submitted link and confirm it points to the intended GitLab project. If missing or invalid, mark Not met to issue an advisory warning in Canvas (does not trigger an immediate 0/10).', true],
 ['Video submitted on Canvas', 'Confirm the video is available and playable. Any failure triggers an immediate 0/10.', false],
 ['Student explains their own work', 'The narrated checklist walkthrough connects each feature to its script or method. No separate line-by-line code presentation is required. Any failure triggers an immediate 0/10.', false]
];
const $=id=>document.getElementById(id);
const blank=([,,warningOnly])=>({status:'pending',note:'',warningOnly:Boolean(warningOnly)});
const blankItem=()=>({status:'pending',note:''});
const newState=r=>({pre:preDefinitions.map(blank),items:r.features.map(blankItem),hardware:'',overall:'',manual:'',manualReason:''});
const states=Object.fromEntries(RUBRICS.map(r=>[r.id,newState(r)]));
function getSavedId(){
 const hash=window.location.hash.slice(1);
 if(RUBRICS.some(r=>r.id===hash))return hash;
 try{
  const saved=localStorage.getItem('getxr_assignment');
  if(RUBRICS.some(r=>r.id===saved))return saved;
 }catch{}
 return RUBRICS[0].id;
}
let active=RUBRICS.find(r=>r.id===getSavedId())||RUBRICS[0],state=states[active.id],copyEpoch=0;
function selectAssignment(r){
 active=r;state=states[r.id];
 try{localStorage.setItem('getxr_assignment',r.id);}catch{}
 if(window.location.hash.slice(1)!==r.id)history.replaceState(null,'','#'+r.id);
 render();
}
function el(tag,text,className){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e;}
function makeAssessment(container,entry,key,index){
 const choices=el('div',undefined,'choices');
 const label=el('label',undefined,'check-label');const checkbox=el('input');checkbox.type='checkbox';checkbox.checked=entry.status==='pass';checkbox.id=`${key}-${index}-pass`;label.append(checkbox,document.createTextNode('Meets'));
 checkbox.setAttribute('aria-label',`Meets: ${key==='pre'?preDefinitions[index][0]:active.features[index].title}`);
 const fail=el('button','Not met','fail-toggle');fail.type='button';fail.setAttribute('aria-pressed',entry.status==='fail');
 const status=el('span',undefined,'state-text');
 fail.setAttribute('aria-label',`Not met: ${key==='pre'?preDefinitions[index][0]:active.features[index].title}`);
 const noteWrap=el('div',undefined,'feedback-wrap');const noteLabel=el('label','Feedback','field-label');noteLabel.htmlFor=`${key}-${index}-note`;const note=el('textarea');note.id=noteLabel.htmlFor;note.rows=2;note.value=entry.note;note.placeholder='What is missing or not working?';
 noteWrap.append(noteLabel,note);choices.append(label,fail,status);container.append(choices,noteWrap);
 function sync(){checkbox.checked=entry.status==='pass';fail.setAttribute('aria-pressed',entry.status==='fail');status.textContent=entry.status==='pending'?'Not reviewed':entry.status==='pass'?'Verified':'Feedback required';noteWrap.hidden=entry.status!=='fail';note.required=entry.status==='fail';container.dataset.status=entry.status;}
 function change(next){entry.status=next;state.manual='';state.manualReason='';$('manual').value='';$('manual-reason').value='';sync();update();if(next==='fail')note.focus();}
 checkbox.addEventListener('change',()=>change(checkbox.checked?'pass':'pending'));
 fail.addEventListener('click',()=>change(entry.status==='fail'?'pending':'fail'));
 note.addEventListener('input',()=>{entry.note=note.value;update();});sync();
}
function render(){
 $('assignment-number').textContent=`${active.id} / FOUNDATION ASSIGNMENT`;$('assignment-title').textContent=active.title;$('source').href=active.url;$('draft-notice').hidden=!active.workInProgress;
 document.querySelectorAll('.assignment-nav').forEach(b=>b.setAttribute('aria-current',b.dataset.id===active.id?'true':'false'));
 $('prerequisites').replaceChildren();preDefinitions.forEach(([title,guide,warningOnly],i)=>{const card=el('div',undefined,'requirement');const info=el('details',undefined,'requirement-info');const summary=el('summary',undefined,'requirement-title');if(warningOnly)summary.append(el('span','Warning only','tier support'));summary.append(document.createTextNode(title));info.append(summary,el('p',guide,'hint'));card.append(info);makeAssessment(card,state.pre[i],'pre',i);$('prerequisites').append(card);});
 $('checklist').replaceChildren();active.features.forEach((f,i)=>{const card=el('article',undefined,'criterion');const head=el('div',undefined,'criterion-head');head.append(el('span',String(f.number),'number'));const heading=el('div');heading.append(el('span',f.core?'Core':'Supporting',f.core?'tier':'tier support'),el('h4',f.title,'criterion-title'));head.append(heading);card.append(head);makeAssessment(card,state.items[i],'feature',i);const details=el('details',undefined,'evaluation-guide');details.append(el('summary','How to evaluate'));const evidence=el('div',undefined,'evidence');const [video,code]=GUIDANCE[active.id][i];for(const [label,text] of [['Video',video],['Code / setup',code]]){const p=el('p');p.append(el('strong',label),document.createTextNode(text));evidence.append(p);}details.append(evidence);card.append(details);$('checklist').append(card);});
 $('guidance-toggle').textContent='Expand guidance';$('guidance-toggle').setAttribute('aria-pressed','false');
 for(const [id,key] of [['hardware','hardware'],['overall','overall'],['manual','manual'],['manual-reason','manualReason']])$(id).value=state[key];
 $('hardware-wrap').hidden=active.id!=='A6';
 function populateScale(scId,noteId){
  const sc=$(scId);if(!sc)return;
  sc.replaceChildren();
  active.scale.forEach(s=>{
   const p=el('p');
   p.dataset.score=String(s.score);
   p.append(el('strong',`${s.score}/10: `),document.createTextNode(s.text));
   sc.append(p);
  });
  const sn=$(noteId);if(!sn)return;
  sn.textContent=active.id==='A1'?'Implementation note: A1 uses named-item ceilings. Where conditions overlap, this helper applies the lowest ceiling; “several” missing Supporting items means 3 or 4.':(['A2','A3'].includes(active.id)?'Undefined combinations are sent for instructor review. Record the instructor-confirmed score and rationale to continue.':(active.id==='A6'?'Simulator ceiling: a submission demonstrated only in the XR Device Simulator scores whichever is lower, the scale above or 8/10.':'The published assignment scale applies directly.'));
 }
 populateScale('scale','scale-note');
 populateScale('main-scale','main-scale-note');
 update();
}
function update(){
 copyEpoch++;$('copy-status').textContent='';
 const base=Grading.calculate(active,state),r=Grading.result(active,state);
 $('manual-wrap').hidden=!base.ambiguous;
 const reviewed=state.items.filter(x=>x.status!=='pending').length;
 $('progress-label').textContent=`${reviewed} / ${state.items.length} reviewed`;$('progress').max=state.items.length;$('progress').value=reviewed;
 const relevant=base.automaticZero?[...state.pre,...state.items.filter(x=>x.status!=='pending')]:[...state.pre,...state.items];
 const missingNotes=relevant.filter(x=>x.status==='fail'&&!x.note.trim()).length;
 const ready=r.score!==null&&!missingNotes;
 $('score').textContent=r.score===null?'—':String(r.score);
 $('grade-state').textContent=ready?'Ready to copy':base.ambiguous?'Review decision':'In review';$('grade-state').classList.toggle('ready',ready);
 $('score-reason').textContent=r.reason;
 $('caps').replaceChildren();(r.caps||[]).forEach(x=>$('caps').append(el('p',x)));
 document.querySelectorAll('.calc-scale p').forEach(p=>{
  const isMatch=r.score!==null && p.dataset.score===String(r.score);
  p.classList.toggle('active-tier',isMatch);
 });
 $('readiness').textContent=missingNotes?`Add feedback for ${missingNotes} unmet requirement${missingNotes===1?'':'s'}.`:ready?'Review complete. Check the comment before copying.':r.reason;
 $('copy').disabled=!ready;
 const lines=[];
 lines.push(`Grade: ${r.score!==null?r.score:'—'}/10`);
 preDefinitions.forEach(([t,,warningOnly],i)=>{
  const s=state.pre[i];
  if(!warningOnly && s.status==='fail')lines.push(`❌ ${t}: ${s.note.trim()||'[feedback needed]'}`);
 });
 preDefinitions.forEach(([t,,warningOnly],i)=>{
  const s=state.pre[i];
  if(warningOnly && s.status==='fail')lines.push(`⚠️ ${t}: ${s.note.trim()||'[feedback needed]'}`);
 });
 if(active.id==='A6' && state.hardware==='simulator')lines.push('XR Device Simulator only (capped at 8/10)');
 if(base.ambiguous && state.manual && state.manualReason.trim())lines.push(`Instructor decision: ${state.manualReason.trim()}`);
 const reviewedItems=state.items.filter(x=>x.status!=='pending');
 if(!base.automaticZero || reviewedItems.length>0){
  lines.push('');
  active.features.forEach((f,i)=>{
   const s=state.items[i];
   const name=f.short||f.title;
   if(s.status==='pass')lines.push(`✅ ${f.number}. ${name}`);
   else if(s.status==='fail')lines.push(`❌ ${f.number}. ${name}: ${s.note.trim()||'[feedback needed]'}`);
   else lines.push(`— ${f.number}. ${name}`);
  });
 }
 if(state.overall.trim())lines.push('',state.overall.trim());
 $('output').value=lines.join('\n');
}
RUBRICS.forEach(r=>{const b=el('button',undefined,'assignment-nav');b.dataset.id=r.id;b.append(el('span',r.id,'nav-id'),el('span',r.title));b.addEventListener('click',()=>selectAssignment(r));$('assignments').append(b);});
for(const [id,key] of [['hardware','hardware'],['overall','overall'],['manual','manual'],['manual-reason','manualReason']]){const el=$(id),fn=()=>{state[key]=el.value;update();};el.addEventListener('input',fn);if(el.tagName==='SELECT')el.addEventListener('change',fn);}
$('reset').addEventListener('click',()=>{if(!confirm(`Clear all checks and feedback for ${active.id} and start a new submission?`))return;state=states[active.id]=newState(active);render();$('review').focus();window.scrollTo({top:0,behavior:'instant'});});
$('guidance-toggle').addEventListener('click',()=>{const expand=$('guidance-toggle').getAttribute('aria-pressed')!=='true';document.querySelectorAll('.evaluation-guide').forEach(d=>d.open=expand);$('guidance-toggle').setAttribute('aria-pressed',String(expand));$('guidance-toggle').textContent=expand?'Collapse guidance':'Expand guidance';});
$('copy').addEventListener('click',async()=>{
 if($('copy').disabled)return;
 const epoch=copyEpoch,text=$('output').value;
 try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);if(epoch===copyEpoch)$('copy-status').textContent='Copied. Paste into Canvas.';}
 catch{if(epoch!==copyEpoch)return;$('output').focus();$('output').select();$('output').setSelectionRange?.(0,text.length);$('copy-status').textContent='Text selected. Press Ctrl+C (Windows) or ⌘C (Mac), then paste into Canvas.';}
});
window.addEventListener('hashchange',()=>{
 const hash=window.location.hash.slice(1);
 const found=RUBRICS.find(r=>r.id===hash);
 if(found && found.id!==active.id)selectAssignment(found);
});
try{localStorage.setItem('getxr_assignment',active.id);}catch{}
if(window.location.hash.slice(1)!==active.id && window.location.hash!=='#review'){
 history.replaceState(null,'','#'+active.id);
}
render();
