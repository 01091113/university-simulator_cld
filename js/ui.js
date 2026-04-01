function clone(obj){return JSON.parse(JSON.stringify(obj))}
function clamp(v,min=0,max=100){return Math.max(min,Math.min(max,v))}
function convertGrade(v){return((v/100)*4.5).toFixed(2)}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)]}
function showScreen(id){document.querySelectorAll('.screen').forEach(el=>el.classList.remove('active'));document.getElementById(id).classList.add('active')}
function collegeEntries(){return Object.entries(COLLEGE_DATA)}
function majorEntries(collegeKey){return Object.entries(COLLEGE_DATA[collegeKey].departments)}
function majorData(collegeKey,majorKey){return COLLEGE_DATA[collegeKey].departments[majorKey]}
function translateStat(k){return{health:'체력',stress:'스트레스',gradePoint:'학점',relationship:'인간관계',career:'취업역량',otaku:'덕질',love:'연애',money:'돈'}[k]||k}
function getStressBadge(stress){if(stress<30)return{text:'😌 평온',cls:''};if(stress<55)return{text:'😅 약간 긴장',cls:''};if(stress<70)return{text:'😰 스트레스 주의',cls:'warning'};if(stress<88)return{text:'🤯 과부하',cls:'warning'};return{text:'💀 사망 직전',cls:'danger'}}

function syncTurnMeta(){
  const labels=['겨울방학','개강','일반','중간고사','축제/팀플','기말고사','여름방학'];
  const idx=(player.progress.currentTurn-1)%7;
  player.progress.currentMonthIndex=idx;
  player.progress.turnType=['vacation','semester_start','normal','midterm','festival','final','vacation'][idx];
  document.getElementById('month-pill').textContent=labels[idx];
}

function populateColleges(){
  const college=document.getElementById('player-college');
  college.innerHTML='';
  collegeEntries().forEach(([key,value])=>{
    const o=document.createElement('option');
    o.value=key;o.textContent=value.name;
    college.appendChild(o);
  });
}

function populateMajors(){
  const collegeKey=document.getElementById('player-college').value;
  const major=document.getElementById('player-major');
  major.innerHTML='';
  if(!COLLEGE_DATA[collegeKey]) return;
  majorEntries(collegeKey).forEach(([key,value])=>{
    const o=document.createElement('option');
    o.value=key;o.textContent=value.name;
    major.appendChild(o);
  });
  renderMajorInfo();
}

function renderMajorInfo(){
  const college=document.getElementById('player-college').value;
  const major=document.getElementById('player-major').value;
  if(!COLLEGE_DATA[college]||!COLLEGE_DATA[college].departments[major]) return;
  const data=majorData(college,major);
  const bonus=Object.entries(data.bonus).map(([k,v])=>`${translateStat(k)} ${v>=0?'+':''}${v}`).join(' / ');
  document.getElementById('major-info-box').innerHTML=`<strong style="font-size:17px">${data.name}</strong><br><span style="color:var(--sub);font-size:15px">${data.desc}</span><br><br><strong>보정치:</strong> ${bonus}`;
}

function bar(v,color){
  const pct=clamp(v);
  const c=color||'var(--accent)';
  return `<div class="bar-row"><span>0</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${c}"></div></div><span>100</span></div>`;
}
function stressColor(v){if(v<50)return'#4ade80';if(v<75)return'#facc15';return'#f87171';}

function renderStatus(){
  document.getElementById('status-title').textContent=`${player.profile.name}의 상태`;
  const g=Number(convertGrade(player.stats.gradePoint));
  const gradeColor=g>=3.5?'#16a34a':g>=2.5?'#d97706':'#dc2626';
  document.getElementById('status-list').innerHTML=`
    <div class="status-grid">
      <div class="status-card"><div class="status-head"><span>💪 체력</span><span>${player.stats.health}</span></div>${bar(player.stats.health,'#60a5fa')}</div>
      <div class="status-card"><div class="status-head"><span>😵 스트레스</span><span>${player.stats.stress}</span></div>${bar(player.stats.stress,stressColor(player.stats.stress))}</div>
      <div class="status-card"><div class="status-head"><span>📚 학점</span><span style="color:${gradeColor};font-size:17px;font-weight:900">${g} / 4.5</span></div></div>
      <div class="status-two-col">
        <div class="status-card"><div class="status-head"><span>🫂 인간관계</span><span>${player.stats.relationship}</span></div></div>
        <div class="status-card"><div class="status-head"><span>💼 취업역량</span><span>${player.stats.career}</span></div></div>
      </div>
      <div class="status-card"><div class="status-head"><span>🎧 덕질</span><span>${player.stats.otaku}</span></div>${bar(player.stats.otaku,'#c084fc')}</div>
      <div class="status-card"><div class="status-head"><span>💘 연애</span><span>${player.stats.love}</span></div>${bar(player.stats.love,'#f472b6')}</div>
    </div>`;

  const stressBadge=getStressBadge(player.stats.stress);
  const badges=[`<span class="badge ${stressBadge.cls}">${stressBadge.text}</span>`];
  if(player.state.some) badges.push(`<span class="badge love">💞 썸</span>`);
  if(player.state.dating) badges.push(`<span class="badge love">❤️ 연애중</span>`);
  if(player.state.conflict) badges.push(`<span class="badge warning">💢 갈등중</span>`);
  if(player.state.military) badges.push(`<span class="badge special">🪖 군복무중</span>`);
  if(player.state.partTimeJob) badges.push(`<span class="badge special">💼 알바중</span>`);
  if(player.state.hasRing) badges.push(`<span class="badge love">💍 반지 보유</span>`);
  if(player.state.graduateOffer) badges.push(`<span class="badge special">🎓 대학원 권유</span>`);
  document.getElementById('state-badges').innerHTML=`<div class="badge-wrap">${badges.join('')}</div>`;

  const warns=[];
  if(g<=1.5) warns.push('❗ 학사경고 위험');
  if(player.stats.stress>=70) warns.push('⚠️ 스트레스가 상당히 높다');
  if(player.state.burnoutCount>=2) warns.push('⚠️ 번아웃 직전');
  document.getElementById('warning-box').innerHTML=warns.length?warns.map(w=>`<div class="warning-card">${w}</div>`).join(''):`<span class="badge">현재 큰 경고 없음 ✅</span>`;

  const ach=getAchievements();
  document.getElementById('achievement-box').innerHTML=`<div class="achievement-wrap">${ach.length?ach.map(a=>`<span class="badge achievement">🏆 ${a}</span>`).join(''):`<span class="badge">아직 해금된 업적 없음</span>`}</div>`;
}

function renderTop(){
  document.getElementById('profile-line').textContent=`${player.profile.name} / ${player.profile.gender==='male'?'남성':player.profile.gender==='female'?'여성':'기타'} / ${player.profile.collegeLabel} ${player.profile.majorLabel}`;
  document.getElementById('grade-pill').textContent=`${player.progress.currentGrade}학년`;
  document.getElementById('turn-pill').textContent=`${Math.min(player.progress.currentTurn,player.progress.totalTurns)} / ${player.progress.totalTurns}턴`;
  document.getElementById('slot-pill').textContent=player.profile.slot.replace('slot','슬롯 ');
  document.getElementById('money-pill').textContent=`💸 ${player.stats.money}`;
  // 주거 유형 필
  const hp=document.getElementById('housing-pill');
  if(hp){
    const hMap={selfboard:'🍳 자취',dormitory:'🛏️ 기숙사',commute:'🚇 통학'};
    const hCls={selfboard:'housing-pill-selfboard',dormitory:'housing-pill-dormitory',commute:'housing-pill-commute'};
    hp.textContent=hMap[player.profile.housing]||'';
    hp.className='meta-pill '+(hCls[player.profile.housing]||'');
  }
  syncTurnMeta();
}

function renderLog(){
  document.getElementById('log-warning-pin').innerHTML=player.state.pinnedWarning?`<div class="warning-card">${player.state.pinnedWarning}</div>`:'';
  document.getElementById('story-log').innerHTML=player.logs.map(log=>`<div class="log-card"><div class="log-title"><span class="log-dot"></span>${log.title}</div><div class="log-body">${log.body}</div></div>`).join('');
}

function renderEvent(title,description,choices){
  document.getElementById('event-title').textContent=title;
  document.getElementById('event-description').textContent=description;
  const box=document.getElementById('choice-buttons');
  box.innerHTML='';
  choices.forEach(c=>{
    const b=document.createElement('button');
    b.className='choice-btn';
    if(c.special) b.classList.add('special-unlock');
    b.textContent=c.text;
    b.onclick=c.onClick;
    box.appendChild(b);
  });
}

function openModal(title,text,choices,variant='general'){
  document.getElementById('modal-title').textContent=title;
  document.getElementById('modal-text').textContent=text;
  modalVariant(variant);
  const box=document.getElementById('modal-choices');
  box.innerHTML='';
  choices.forEach(c=>{
    const b=document.createElement('button');
    b.className='choice-btn';
    b.textContent=c.text;
    b.onclick=c.onClick;
    box.appendChild(b);
  });
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal(){document.getElementById('modal').classList.add('hidden')}
function openReport(content){document.getElementById('report-content').textContent=content;document.getElementById('report-modal').classList.remove('hidden')}
function closeReport(){document.getElementById('report-modal').classList.add('hidden')}

function openShop(){
  document.getElementById('shop-money-text').textContent=`현재 돈: ${player.stats.money}`;
  const items=[
    {id:'energyDrink',name:'⚡ 에너지드링크',price:5,desc:'스트레스 -4, 체력 +2'},
    {id:'meal',name:'🍚 든든한 밥',price:8,desc:'체력 +8, 스트레스 -2'},
    {id:'plush',name:'🧸 작은 인형',price:12,desc:'스트레스 -6'},
    {id:'coffee',name:'☕ 프리미엄 커피',price:6,desc:'스트레스 -3, 취업역량 +2'},
    {id:'ring',name:'💍 반지',price:25,desc:'연애 루트 고백 성공에 필요'},
    {id:'lotto',name:'🎰 로또',price:3,desc:'낮은 확률로 돈 +150'},
    {id:'vitaminPack',name:'💊 비타민 세트',price:10,desc:'체력 +5, 스트레스 -3'},
    {id:'study_kit',name:'📦 수험생 패키지',price:15,desc:'학점 +3, 스트레스 -5'}
  ];
  document.getElementById('shop-list').innerHTML=items.map(item=>`
    <div class="shop-item">
      <div class="row"><strong>${item.name}</strong><button class="secondary-btn small" onclick="buyItem('${item.id}')">구매 (💸${item.price})</button></div>
      <p>${item.desc}</p>
    </div>`).join('');
  document.getElementById('shop-modal').classList.remove('hidden');
}

function closeShop(){document.getElementById('shop-modal').classList.add('hidden')}
function renderRumors(){document.getElementById('rumor-list').innerHTML=(player.state.rumors||[]).map(r=>`<div class="rumor-item"><strong>📱 ${r.title}</strong><br><span style="font-size:15px;color:var(--sub)">${r.body}</span></div>`).join('')||'<div class="rumor-item">아직 쌓인 찌라시가 없다.</div>';}
function openRumors(){renderRumors();document.getElementById('rumor-modal').classList.remove('hidden')}
function closeRumors(){document.getElementById('rumor-modal').classList.add('hidden')}
function renderAll(){renderTop();renderStatus();renderLog()}
