'use strict';
(() => {
  const { epochs, works } = window.WOMEN_DATA;
  const people = window.WOMEN_STORIES;
  const personById = id => people.find(person => person.id === id);
  const $ = id => document.getElementById(id);
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const workById = id => works.find(work => work.id === id);
  const epochById = id => epochs.find(epoch => epoch.id === id);
  const compactLayout = matchMedia('(max-width: 700px)');
  const storageKey = 'women-stories-saved-v1';
  let saved = new Set();
  try { const stored = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(stored)) saved = new Set(stored.filter(id => personById(id))); } catch (_) { /* Reading remains available when storage is blocked. */ }
  const state = { savedOnly:false, era:'all', scene:'all', search:'', work:null, epoch:null, view:0, scale:1 };
  let toastTimer;
  function notify(message) { $('toast').textContent = message; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 2300); }
  function save(id) {
    if (saved.has(id)) saved.delete(id); else saved.add(id);
    try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch (_) { notify('浏览器未允许保存；本次浏览仍可收藏。'); }
    updateSaved(); renderCatalog(); if (state.epoch) renderEpochWorks();
  }
  function updateSaved() {
    $('savedCount').textContent = String(saved.size).padStart(2,'0');
    document.querySelectorAll('[data-save]').forEach(button => { const active = saved.has(button.dataset.save); button.classList.toggle('favorited', active); button.setAttribute('aria-pressed', active); button.textContent = active ? '♥' : '♡'; });
  }
  function personCard(person) {
    return `<article class="card person-card"><button class="person-open" data-person="${person.id}" aria-label="阅读${escape(person.name)}的故事"><div class="person-card-meta"><span>${epochById(person.era).name}</span><span>${escape(person.role)}</span></div><h3><span class="person-name">${escape(person.cardTitle || person.name)}</span><small>${escape(person.years)}</small></h3><h4>${escape(person.headline)}</h4><p>${escape(person.summary)}</p><span class="person-read">读她的故事 <span>↗</span></span></button><button class="save-card" data-save="${person.id}" aria-label="收藏${escape(person.name)}的故事" aria-pressed="${saved.has(person.id)}">♡</button></article>`;
  }
  function renderCatalog() {
    const query = state.search.trim().toLocaleLowerCase();
    const results = people.filter(p => (!state.savedOnly || saved.has(p.id)) && (state.era === 'all' || p.era===state.era) && (state.scene === 'all' || p.roles.includes(state.scene)) && (!query || [p.name,p.cardTitle || '',p.years,...p.roles,p.place,p.headline,p.summary,...p.sections.flatMap(x=>[x.title,x.body])].join(' ').toLocaleLowerCase().includes(query)));
    $('catalogGrid').innerHTML=results.length?results.map(personCard).join(''):'<div class="empty-state"><p>暂时没有符合这些条件的人物。</p><button class="ink-button" data-reset>清除筛选，浏览全部人物</button></div>';
    $('filterCount').textContent=`${results.length} / ${people.length} 则故事 · 人物、群像与文献传述`;
    document.querySelectorAll('[data-role]').forEach(b=>{const active=b.dataset.role===state.scene;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $('allFilter').classList.toggle('active',!state.savedOnly);$('savedFilter').classList.toggle('active',state.savedOnly);
    $('allFilter').setAttribute('aria-pressed',!state.savedOnly);$('savedFilter').setAttribute('aria-pressed',state.savedOnly);updateSaved();
  }
  function openPerson(id){
    const p=personById(id);if(!p)return;
    $('personKicker').textContent=`${epochById(p.era).name} / ${p.roles.join(" · ")}`;
    $('personTitle').textContent=p.name;
    $('personMeta').textContent=`${p.years} · ${p.place}`;
    $('personHeadline').textContent=p.headline;
    $('personSummary').textContent=p.summary;
    $('personBody').innerHTML=p.sections.map((x,i)=>`<section class="reading-section"><div class="reading-section-head"><span>${String(i+1).padStart(2,'0')}</span><h3>${escape(x.title)}</h3></div><p>${escape(x.body)}</p></section>`).join('');
    $('personEvents').innerHTML=p.events.map(x=>`<li><strong>${escape(x.date)}</strong><span>${escape(x.text)}</span></li>`).join('');
    $('personReferences').innerHTML=p.references.map(x=>`<a href="${escape(x.url)}" target="_blank" rel="noopener">${escape(x.title)} ↗</a>`).join('');
    $('personMaterials').innerHTML=p.works.length?`<h3>${p.kind==='group'?'故事中的图像':'与她有关的图像'}</h3><div class="related-row">${p.works.map(id=>`<button data-work="${id}">${escape(workById(id).title)} · ${p.kind==='group'?'原作细看':'后世纪念图'} ↗</button>`).join('')}</div>`:'';
    $('personSave').dataset.save=p.id;$('personSave').setAttribute('aria-label',`收藏${p.name}的故事`);$('personMilestones').open=!compactLayout.matches;updateSaved();$('personDialog').showModal();$('personDialog').scrollTop=0;
  }
  function resetFilters() { state.savedOnly=false; state.era='all'; state.scene='all'; state.search=''; $('eraFilter').value='all'; $('sceneFilter').value='all'; $('catalogSearchInput').value=''; renderCatalog(); }
  const viewport = $('scrollViewport');
function landscape() {
  return '<svg class="scroll-landscape" viewBox="0 0 4600 500" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#8a9274" stroke-width="1"><path d="M0 419Q140 365 290 415T610 404T940 422T1250 402T1580 416T1930 398T2240 420T2540 400T2880 415T3220 401T3540 420T3840 401T4170 417T4600 398"/><path d="M0 432Q200 407 360 436T700 425T1060 437T1430 422T1830 440T2220 423T2590 440T3000 422T3400 443T3810 424T4210 440T4600 421"/><path d="M0 446Q370 432 580 450T1150 451T1700 450T2300 451T2870 450T3500 453T4070 450T4600 447"/></g><g fill="#9ea98b" opacity=".25"><path d="M0 372L78 330L115 346L163 304L226 344L283 312L348 363L420 349L502 391L602 416H0Z"/><path d="M760 395L810 365L840 382L902 306L939 329L992 265L1040 299L1073 282L1154 370L1260 397L1350 428H720Z"/><path d="M1550 405L1610 360L1660 380L1720 310L1762 346L1790 330L1870 375L1970 418H1550Z"/><path d="M2390 415L2450 360L2490 380L2550 310L2615 267L2660 319L2710 300L2790 370L2890 400L2950 425H2360Z"/><path d="M3470 412L3535 330L3580 352L3640 281L3690 315L3730 303L3820 386L3920 410L4030 434H3430Z"/></g></svg>';
}
  $('epochSlotsWrapper').innerHTML = landscape() + '<div class="scroll-preface"><h2>她的千年</h2><p>循着她的足迹<br>读见千年故事</p><span class="small-seal">读她</span></div>' + epochs.map((epoch, index) => {
    const work=workById(epoch.representative), count=people.filter(p=>p.era===epoch.id).length;
    return `<article class="scroll-scene" data-era="${epoch.id}"><div class="scene-era"><strong>${epoch.name}</strong><span>${epoch.range}</span></div><button class="scene-painting" data-epoch="${epoch.id}" data-hint="${count} 则故事 ↗" aria-label="打开${epoch.name}专题，${count}则女性故事"><img style="--crop:${work.crop}" src="${epoch.figure}" data-figure="${epoch.figure}" data-original="${work.thumb}" data-title="${escape(work.title)}" alt="据${escape(work.title)}制作的人物重绘展示图" ${index>2?'loading="lazy"':''} draggable="false"></button><div class="scene-caption"><div><button data-epoch="${epoch.id}" aria-label="进入${epoch.name}专题"><h3>${epoch.title}</h3></button><p>${people.filter(p=>p.era===epoch.id).map(p=>p.cardTitle || p.name).slice(0,3).join(" · ")}<br>${count} 则故事 · 点击读她们的故事</p><p class="scene-origin">画中人出自《${escape(work.title)}》</p></div><span class="scene-index">${String(index+1).padStart(2,'0')}</span></div></article>`;
  }).join('') + '<div class="scroll-ending"><h2>她的故事未完</h2><p>姓名有来处<br>故事有回声</p><span class="small-seal">续</span></div>';
  $('timelineEpochsBar').innerHTML=epochs.map(e=>`<button data-jump="${e.id}" aria-controls="scrollViewport">${e.name}<small>${e.range}</small></button>`).join('');
  let activeEpoch = epochs[0].id;
  function scrollToEpoch(id, behavior='smooth') { const slot = document.querySelector(`[data-era="${id}"]`); viewport.scrollTo({left:Math.max(0,slot.offsetLeft-(viewport.clientWidth-slot.offsetWidth)/2),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':behavior}); }
  function syncScroll() {
    let current=epochs[0].id, distance=Infinity;
    document.querySelectorAll('.scroll-scene').forEach(slot => { const d=Math.abs(slot.offsetLeft+slot.offsetWidth/2-viewport.scrollLeft-viewport.clientWidth/2);if(d<distance){distance=d;current=slot.dataset.era;} });
    const changed=current!==activeEpoch;activeEpoch=current;
    document.querySelectorAll('[data-jump]').forEach(button => { const active=button.dataset.jump===current;button.classList.toggle('active',active); if(active)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current'); });
    if(changed && compactLayout.matches){const bar=$('timelineEpochsBar'),button=bar.querySelector('[aria-current]');bar.scrollTo({left:button.offsetLeft-(bar.clientWidth-button.offsetWidth)/2,behavior:'auto'});}
  }
  viewport.addEventListener('scroll',syncScroll,{passive:true});
  let scrollDrag=null, suppressClick=false;
  viewport.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;scrollDrag={x:event.clientX,left:viewport.scrollLeft,moved:false};suppressClick=false;});
  viewport.addEventListener('pointermove',event=>{if(!scrollDrag)return;const dx=event.clientX-scrollDrag.x;if(Math.abs(dx)>5){scrollDrag.moved=true;viewport.classList.add('dragging');viewport.setPointerCapture(event.pointerId);}if(scrollDrag.moved){event.preventDefault();viewport.scrollLeft=scrollDrag.left-dx;}});
  function endScrollDrag(){if(scrollDrag)suppressClick=scrollDrag.moved;scrollDrag=null;viewport.classList.remove('dragging');}
  ['pointerup','pointercancel','lostpointercapture'].forEach(type=>viewport.addEventListener(type,endScrollDrag));
  viewport.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);

  viewport.addEventListener('keydown',event=>{if(event.target!==viewport)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const index=epochs.findIndex(e=>e.id===activeEpoch),next=Math.min(epochs.length-1,Math.max(0,index+(event.key==='ArrowRight'?1:-1)));scrollToEpoch(epochs[next].id);}});
  function mode(whole){viewport.querySelectorAll('.scene-painting img').forEach(img=>{img.src=whole?img.dataset.original:img.dataset.figure;img.alt=whole?`${img.dataset.title} · 馆方公开原图`:`据${img.dataset.title}制作的人物重绘展示图`;img.closest('.scroll-scene').querySelector('.scene-origin').textContent=`${whole?'馆方原作':'画中人出自'}《${img.dataset.title}》`;});viewport.classList.toggle('whole-view',whole);viewport.querySelectorAll('.scroll-scene').forEach(scene=>scene.classList.toggle('original-mode',whole));$('wholeMode').classList.toggle('active',whole);$('cropMode').classList.toggle('active',!whole);$('wholeMode').setAttribute('aria-pressed',whole);$('cropMode').setAttribute('aria-pressed',!whole);}
  $('wholeMode').addEventListener('click',()=>mode(true));$('cropMode').addEventListener('click',()=>mode(false));
  function renderEpochWorks(){const results=people.filter(p=>p.era===state.epoch);$('epochGrid').innerHTML=results.map(personCard).join('');$('epochCount').textContent=`${results.length} 则故事 · 阅读经历、转折与留下的作品`;updateSaved();}
  function openEpoch(id){const e=epochById(id);state.epoch=id;$('epochKicker').textContent=`时代人物 / ${e.range}`;$('epochTitle').textContent=`${e.name} · ${e.title}`;$('epochIntro').textContent=e.intro;renderEpochWorks();$('epochDialog').showModal();$('epochDialog').scrollTop=0;}
  function views(){return state.work.views || [{label:'馆方公开图',image:state.work.image}];}
  function setView(index){state.view=index;const view=views()[index];$('workImage').alt=`${state.work.title} · ${view.label}`;$('workImage').src=view.image;$('imageCaption').textContent=view.caption||'点击图片可放大查看 · 馆藏公开图像';$('albumControls').innerHTML=views().length>1?views().map((v,i)=>`<button data-view="${i}" class="${i===index?'active':''}" aria-pressed="${i===index}">${escape(v.label)}</button>`).join(''):'';}
  function tab(name){document.querySelectorAll('.work-tabs [data-tab]').forEach(button=>{const active=button.dataset.tab===name;button.setAttribute('aria-selected',active);button.tabIndex=active?0:-1;$(`panel-${button.dataset.tab}`).hidden=!active;});}
  function openWork(id){const work=workById(id);if(!work)return;state.work=work;$('workKicker').textContent=`作品档案 / ${epochById(work.era).name}`;$('workTitle').textContent=work.title;$('workMeta').textContent=`${work.artist} · ${work.museum}`;$('workSummary').textContent=work.summary;$('workFacts').innerHTML=[['现存作品年代',work.date],['画中题材',work.subject],['材质与形制',work.material]].map(([label,value])=>`<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('');$('workSource').href=work.source;
    const related=works.filter(w=>w.id!==id&&w.tags.some(t=>work.tags.includes(t))).slice(0,4);
    const chapters = work.chaptersText || [];
    const section = (item, index) => `<section class="reading-section" id="reading-${index}"><div class="reading-section-head"><span>${String(index+1).padStart(2,'0')}</span><div><h3>${escape(item.title)}</h3></div></div><p>${escape(item.body)}</p></section>`;
    $('panel-life').innerHTML=`<div class="reading-intro"><div class="eyebrow">人物 · 器物 · 身体 · 空间</div><p>从一个动作，读进她的生活。</p></div>${chapters.slice(0,3).map(section).join('')}<section class="looking-notes"><h3>带着线索再看原画</h3><ol>${work.look.map(point=>`<li>${escape(point)}</li>`).join('')}</ol><button class="ink-button" data-tab="image">返回原作细看 ↗</button></section><div class="scene-tags">${work.tags.map(tag=>`<span>${tag}</span>`).join('')}</div><h3>循同一场景，继续看</h3><div class="related-row">${related.map(w=>`<button data-work="${w.id}">${escape(w.title)} ↗</button>`).join('')}</div>`;
    $('panel-research').innerHTML=`<div class="eyebrow">作品的时间，与它讲述的时间</div><dl class="research-timeline"><div><dt>现存作品</dt><dd>${escape(work.date)}</dd></div><div><dt>作者归属</dt><dd>${escape(work.artist)}</dd></div><div><dt>题材线索</dt><dd>${escape(work.subject)}</dd></div></dl>${chapters.slice(3).map((item,i)=>section(item,i+3)).join('')}<h3>编目说明</h3><p>${escape(work.note)}</p><h3>资料与延伸阅读</h3><div class="reference-list">${work.references.map((r,i)=>`<article><span>${String(i+1).padStart(2,'0')}</span><div><a href="${escape(r.url)}" target="_blank" rel="noopener">${escape(r.title)} ↗</a><p>${escape(r.description)}</p></div></article>`).join('')}${work.imageSource?`<a href="${work.imageSource}" target="_blank" rel="noopener">图像副本出处 ↗</a>`:''}</div>`;
    tab('image');setView(work.id==='months'?4:0);updateSaved();if(!$('workDialog').open)$('workDialog').showModal();$('workDialog').scrollTop=0;
  }
  function setScale(scale){state.scale=Math.min(6,Math.max(1,scale));const area=$('zoomViewport'),img=$('zoomImage');if(!img.naturalWidth)return;const ratio=Math.min((area.clientWidth-32)/img.naturalWidth,(area.clientHeight-32)/img.naturalHeight);const oldW=img.width||1,oldH=img.height||1;const cx=(area.scrollLeft+area.clientWidth/2)/Math.max(oldW,area.clientWidth),cy=(area.scrollTop+area.clientHeight/2)/Math.max(oldH,area.clientHeight);img.style.width=`${Math.max(1,img.naturalWidth*ratio*state.scale)}px`;img.style.height=`${Math.max(1,img.naturalHeight*ratio*state.scale)}px`;$('zoomStage').style.width=`${Math.max(area.clientWidth,img.naturalWidth*ratio*state.scale)}px`;$('zoomStage').style.height=`${Math.max(area.clientHeight,img.naturalHeight*ratio*state.scale)}px`;$('zoomScale').textContent=`${Math.round(state.scale*100)}%`;$('zoomOut').disabled=state.scale===1;$('zoomIn').disabled=state.scale===6;area.scrollLeft=cx*area.scrollWidth-area.clientWidth/2;area.scrollTop=cy*area.scrollHeight-area.clientHeight/2;}
  function openZoom(){const view=views()[state.view];$('zoomTitle').textContent=`${state.work.title} · ${view.label}`;const img=$('zoomImage');img.alt=$('workImage').alt;img.onload=()=>{$('zoomResolution').textContent=`原图 ${img.naturalWidth} × ${img.naturalHeight} 像素 · 放大不增加细节`;setScale(1);};img.src=view.image;$('zoomDialog').showModal();if(img.complete&&img.naturalWidth){$('zoomResolution').textContent=`原图 ${img.naturalWidth} × ${img.naturalHeight} 像素 · 放大不增加细节`;setScale(1);}}
  $('openZoom').addEventListener('click',openZoom);$('zoomIn').addEventListener('click',()=>setScale(state.scale+.5));$('zoomOut').addEventListener('click',()=>setScale(state.scale-.5));$('zoomReset').addEventListener('click',()=>setScale(1));
  $('zoomDialog').addEventListener('keydown',event=>{if(event.key==='+'||event.key==='='){event.preventDefault();setScale(state.scale+.5);}if(event.key==='-'){event.preventDefault();setScale(state.scale-.5);}});
  let drag=null;
  const zoomArea=$('zoomViewport');zoomArea.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;drag={x:event.clientX,y:event.clientY,left:zoomArea.scrollLeft,top:zoomArea.scrollTop};zoomArea.setPointerCapture(event.pointerId);});zoomArea.addEventListener('pointermove',event=>{if(!drag)return;zoomArea.scrollLeft=drag.left+drag.x-event.clientX;zoomArea.scrollTop=drag.top+drag.y-event.clientY;});['pointerup','pointercancel','lostpointercapture'].forEach(type=>zoomArea.addEventListener(type,()=>drag=null));
  let pinch=null;
  const touchDistance=touches=>Math.hypot(touches[0].clientX-touches[1].clientX,touches[0].clientY-touches[1].clientY);
  zoomArea.addEventListener('touchstart',event=>{if(event.touches.length!==2)return;event.preventDefault();pinch={distance:touchDistance(event.touches),scale:state.scale};},{passive:false});
  zoomArea.addEventListener('touchmove',event=>{if(!pinch||event.touches.length!==2)return;event.preventDefault();if(pinch.distance>0)setScale(pinch.scale*touchDistance(event.touches)/pinch.distance);},{passive:false});
  ['touchend','touchcancel'].forEach(type=>zoomArea.addEventListener(type,()=>pinch=null,{passive:true}));
  $('eraFilter').innerHTML+=epochs.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');$('sceneFilter').innerHTML+=[...new Set(people.flatMap(p=>p.roles))].map(t=>`<option>${t}</option>`).join('');
  $('eraFilter').addEventListener('change',e=>{state.era=e.target.value;renderCatalog();});$('sceneFilter').addEventListener('change',e=>{state.scene=e.target.value;renderCatalog();});$('catalogSearchInput').addEventListener('input',e=>{state.search=e.target.value;renderCatalog();});$('clearFilters').addEventListener('click',resetFilters);
  $('savedNav').addEventListener('click',()=>{resetFilters();state.savedOnly=true;renderCatalog();$('section-catalog').scrollIntoView({behavior:'smooth'});});$('savedFilter').addEventListener('click',()=>{state.savedOnly=true;renderCatalog();});$('allFilter').addEventListener('click',()=>{state.savedOnly=false;renderCatalog();});
  document.addEventListener('click',event=>{const target=event.target.closest('button');if(!target)return;if(target.dataset.person)openPerson(target.dataset.person);if(target.dataset.work)openWork(target.dataset.work);if(target.dataset.epoch)openEpoch(target.dataset.epoch);if(target.dataset.jump)scrollToEpoch(target.dataset.jump);if(target.dataset.save)save(target.dataset.save);if(target.dataset.close)$(target.dataset.close).close();if(target.dataset.tab)tab(target.dataset.tab);if(target.dataset.view!==undefined)setView(Number(target.dataset.view));if(target.hasAttribute('data-reset'))resetFilters();});
  document.querySelector('.work-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const buttons=[...document.querySelectorAll('.work-tabs [data-tab]')];let index=buttons.indexOf(document.activeElement);index=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[index].focus();tab(buttons[index].dataset.tab);});
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}));
  $('epochDialog').addEventListener('close',()=>state.epoch=null);
  window.addEventListener('resize',()=>{const current=activeEpoch;requestAnimationFrame(()=>{scrollToEpoch(current,'auto');syncScroll();if($('zoomDialog').open)setScale(state.scale);});});
  const roles=[...new Set(people.flatMap(p=>p.roles))];
  $('identityGrid').innerHTML=roles.map(role=>`<button data-role="${escape(role)}" aria-pressed="false"><span>${escape(role)}</span><small>${people.filter(p=>p.roles.includes(role)).length}</small></button>`).join('');
  $('identityCount').textContent=`${roles.length} 个入口 · 同一人物可有多种身份`;
  $('storyStats').textContent=`八段时代 · ${people.length} 则故事 · ${roles.length} 种身份与经历`;
  document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>{state.scene=state.scene===button.dataset.role?'all':button.dataset.role;state.era='all';state.search='';state.savedOnly=false;$('sceneFilter').value=state.scene;$('eraFilter').value='all';$('catalogSearchInput').value='';renderCatalog();$('filterCount').scrollIntoView({behavior:'smooth',block:'center'});}));
  if(compactLayout.matches)document.querySelector('.identity-atlas').open=false;
  renderCatalog();syncScroll();
  if(compactLayout.matches)requestAnimationFrame(()=>scrollToEpoch(epochs[0].id,'auto'));
  const params=new URLSearchParams(location.search);
  if(params.has('person')&&personById(params.get('person')))openPerson(params.get('person'));
  else if(params.has('work')&&workById(params.get('work')))openWork(params.get('work'));

})();
