'use strict';
const preDefinitions=[
 ['Repository URL submitted on Canvas', 'Open the submitted link and confirm it points to the intended GitLab project.'],
 ['Video submitted on Canvas', 'Confirm the video is available and playable.'],
 ['Working Unity project available in the repository', 'Confirm staff access and that the submitted project compiles and runs. If access or runtime status is uncertain, leave unreviewed while resolving it.'],
 ['Student explains their own work', 'The narrated checklist walkthrough connects each feature to its script or method. No separate line-by-line code presentation is required.']
];
const $=id=>document.getElementById(id);
const blank=()=>({status:'pending',note:''});
const newState=r=>({pre:preDefinitions.map(blank),items:r.features.map(blank),hardware:'',overall:'',manual:'',manualReason:''});
const states=Object.fromEntries(RUBRICS.map(r=>[r.id,newState(r)]));
let active=RUBRICS[0],state=states[active.id],copyEpoch=0;
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
 $('prerequisites').replaceChildren();preDefinitions.forEach(([title,guide],i)=>{const card=el('div',undefined,'requirement');const info=el('details',undefined,'requirement-info');info.append(el('summary',title,'requirement-title'),el('p',guide,'hint'));card.append(info);makeAssessment(card,state.pre[i],'pre',i);$('prerequisites').append(card);});
 $('checklist').replaceChildren();active.features.forEach((f,i)=>{const card=el('article',undefined,'criterion');const head=el('div',undefined,'criterion-head');head.append(el('span',String(f.number),'number'));const heading=el('div');heading.append(el('span',f.core?'Core':'Supporting',f.core?'tier':'tier support'),el('h4',f.title,'criterion-title'));head.append(heading);card.append(head);makeAssessment(card,state.items[i],'feature',i);const details=el('details',undefined,'evaluation-guide');details.append(el('summary','How to evaluate'));const evidence=el('div',undefined,'evidence');const [video,code]=GUIDANCE[active.id][i];for(const [label,text] of [['Video',video],['Code / setup',code]]){const p=el('p');p.append(el('strong',label),document.createTextNode(text));evidence.append(p);}details.append(evidence);card.append(details);$('checklist').append(card);});
 $('guidance-toggle').textContent='Expand guidance';$('guidance-toggle').setAttribute('aria-pressed','false');
 for(const [id,key] of [['hardware','hardware'],['overall','overall'],['manual','manual'],['manual-reason','manualReason']])$(id).value=state[key];
 $('hardware-wrap').hidden=active.id!=='A6';$('scale').replaceChildren();active.scale.forEach(s=>{const p=el('p');p.append(el('strong',`${s.score}/10: `),document.createTextNode(s.text));$('scale').append(p);});
 $('scale-note').textContent=active.id==='A1'?'Implementation note: A1 uses named-item ceilings. Where conditions overlap, this helper applies the lowest ceiling; “several” missing Supporting items means 3 or 4.':(['A2','A3'].includes(active.id)?'Undefined combinations are sent for instructor review. Record the instructor-confirmed score and rationale to continue.':'The published assignment scale is applied with the A6 simulator ceiling where applicable.');
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
 $('readiness').textContent=missingNotes?`Add feedback for ${missingNotes} unmet requirement${missingNotes===1?'':'s'}.`:ready?'Review complete. Check the comment before copying.':r.reason;
 $('copy').disabled=!ready;
 const lines=[
  `${active.id}: ${active.title}`,
  ready?`Grade: ${r.score}/10`:'DRAFT — assessment not finalized',
  ...(r.score!==null&&!ready?[`Calculated grade: ${r.score}/10`]:[]),
  '',
  `Grade rationale: ${r.reason}`,
  ...(r.caps||[]),
  '',
  'Submission requirements:'
 ];
 preDefinitions.forEach(([t],i)=>{const s=state.pre[i];lines.push(`${s.status==='pass'?'✓':s.status==='fail'?'✗':'—'} ${t}${s.status==='pending'?' — not reviewed':''}${s.status==='fail'?`: ${s.note.trim()||'[feedback needed]'}`:''}`);});
 lines.push('','Feature checklist (criteria determine a grade band, not separate point awards):');
 active.features.forEach((f,i)=>{const s=state.items[i];lines.push(`${s.status==='pass'?'✓':s.status==='fail'?'✗':'—'} ${f.number}. ${f.title} [${f.core?'Core':'Supporting'}]${s.status==='pending'?' — not reviewed':''}${s.status==='fail'?`\n   Feedback: ${s.note.trim()||'[feedback needed]'}`:''}`);});
 if(state.overall.trim())lines.push('','Overall feedback:',state.overall.trim());
 $('output').value=lines.join('\n');
}
RUBRICS.forEach(r=>{const b=el('button',undefined,'assignment-nav');b.dataset.id=r.id;b.append(el('span',r.id,'nav-id'),el('span',r.title));b.addEventListener('click',()=>{active=r;state=states[r.id];render();});$('assignments').append(b);});
for(const [id,key] of [['hardware','hardware'],['overall','overall'],['manual','manual'],['manual-reason','manualReason']]){const el=$(id),fn=()=>{state[key]=el.value;update();};el.addEventListener('input',fn);if(el.tagName==='SELECT')el.addEventListener('change',fn);}
$('reset').addEventListener('click',()=>{if(!confirm(`Clear all checks and feedback for ${active.id} and start a new submission?`))return;state=states[active.id]=newState(active);render();$('review').focus();window.scrollTo({top:0,behavior:'instant'});});
$('guidance-toggle').addEventListener('click',()=>{const expand=$('guidance-toggle').getAttribute('aria-pressed')!=='true';document.querySelectorAll('.evaluation-guide').forEach(d=>d.open=expand);$('guidance-toggle').setAttribute('aria-pressed',String(expand));$('guidance-toggle').textContent=expand?'Collapse guidance':'Expand guidance';});
$('copy').addEventListener('click',async()=>{
 if($('copy').disabled)return;
 const epoch=copyEpoch,text=$('output').value;
 try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);if(epoch===copyEpoch)$('copy-status').textContent='Copied. Paste into Canvas.';}
 catch{if(epoch!==copyEpoch)return;$('output').focus();$('output').select();$('output').setSelectionRange?.(0,text.length);$('copy-status').textContent='Text selected. Press Ctrl+C (Windows) or ⌘C (Mac), then paste into Canvas.';}
});
render();
