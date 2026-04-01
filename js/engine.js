// engine.js — 패치 v2 (주거 이벤트 + 결과 텍스트 + 특수 루트)

function clamp(v,min=0,max=100){return Math.max(min,Math.min(max,v));}
function chance(p){return Math.random()<p;}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)];}

function randomRange(v){
  if(v==='RANDOM_SMALL')  return Math.floor(Math.random()*7)-3;
  if(v==='RANDOM_MEDIUM') return Math.floor(Math.random()*13)-6;
  if(v==='RANDOM_LARGE')  return Math.floor(Math.random()*21)-10;
  return typeof v==='number'?v:0;
}

// ── 플로팅 피드백 ────────────────────────────────────────────
function showStatFeedback(feedbacks){
  const container=document.getElementById('stat-feedback');
  if(!container||!feedbacks.length) return;
  const labels={gradePoint:'📚학점',stress:'💢스트레스',health:'💪체력',relationship:'👥관계',career:'💼취업',otaku:'🎮덕질',love:'💕연애',money:'💰돈'};
  feedbacks.forEach(({key,delta})=>{
    const el=document.createElement('div');
    el.className=`stat-float ${delta>0?'positive':'negative'}`;
    el.textContent=`${labels[key]||key} ${delta>0?'+':''}${delta}`;
    container.appendChild(el);
    setTimeout(()=>el.remove(),1800);
  });
}

// ── 스탯 적용 ────────────────────────────────────────────────
function applyEffect(effect){
  if(!effect) return;
  const fb=[];
  Object.entries(effect).forEach(([k,rawV])=>{
    const v=randomRange(rawV);
    if(player.stats[k]!==undefined){
      const before=player.stats[k];
      player.stats[k]=clamp(player.stats[k]+v);
      const d=player.stats[k]-before;
      if(d!==0) fb.push({key:k,delta:d});
    }
  });
  showStatFeedback(fb);
}

function applyMajorBonusOnce(){
  const bonus=majorData(player.profile.collegeKey,player.profile.majorKey).bonus;
  Object.entries(bonus).forEach(([k,v])=>{if(player.stats[k]!==undefined)player.stats[k]=clamp(player.stats[k]+v);});
  // 주거 유형 초기 보정
  const h=player.profile.housing;
  if(h==='selfboard'){player.stats.money=clamp(player.stats.money-8);player.stats.stress=clamp(player.stats.stress+3);}
  if(h==='dormitory'){player.stats.relationship=clamp(player.stats.relationship+4);}
  if(h==='commute'){player.stats.money=clamp(player.stats.money+6);player.stats.health=clamp(player.stats.health-3);}
}

function examTurn(){return['midterm','final'].includes(player.progress.turnType);}

// ── 연속 행동 추적 ────────────────────────────────────────────
function trackConsecutive(id){
  if(player.state.consecutiveAction===id) player.state.consecutiveCount=(player.state.consecutiveCount||0)+1;
  else{player.state.consecutiveAction=id;player.state.consecutiveCount=1;}
}

// ── 스탯 조건부 선택지 ──────────────────────────────────────
function getConditionalChoices(){
  const extra=[];
  if(player.stats.relationship>=65)
    extra.push({id:'askFriend',text:'👥 인맥을 동원한다',effect:{relationship:-3,stress:-5},special:true});
  if(player.stats.career>=55)
    extra.push({id:'useCareer',text:'💼 쌓은 스펙으로 해결한다',effect:{career:2,stress:-4},special:true});
  if(player.stats.health>=80)
    extra.push({id:'grind',text:'💪 체력으로 밀어붙인다',effect:{health:-5,gradePoint:4,career:3},special:true});
  return extra;
}

// ── 메인 선택지 ──────────────────────────────────────────────
function getMainChoices(){
  if(examTurn()) return [
    {id:'cram',text:'📚 벼락치기한다',effect:{gradePoint:8,stress:12,health:-4}},
    {id:'borrow',text:'📝 친구 필기를 빌린다',effect:{gradePoint:5,relationship:4,stress:3}},
    {id:'library',text:'🏛️ 도서관에 박힌다',effect:{gradePoint:7,stress:8,health:-2}},
    {id:'guess',text:'🎯 감으로 찍는다',effect:{gradePoint:'RANDOM_LARGE',stress:4}},
    {id:'sleep',text:'😪 시험 포기하고 잔다',effect:{stress:-8,gradePoint:-10,health:5}}
  ];
  const byGrade={
    1:[
      {id:'study',text:'📚 공부한다',effect:{gradePoint:4,stress:7,health:-2}},
      {id:'play',text:'🎉 논다',effect:{relationship:8,stress:-5,money:-3}},
      {id:'club',text:'🍻 동아리 간다',effect:{relationship:10,love:2,stress:-3,gradePoint:-2,money:-2}},
      {id:'rest',text:'🛋️ 쉰다',effect:{stress:-9,health:5}},
      {id:'partTime',text:'💸 알바한다',effect:{money:12,stress:4,health:-2}}
    ],
    2:[
      {id:'study',text:'📚 전공 공부한다',effect:{gradePoint:4,stress:8,health:-2}},
      {id:'team',text:'🤝 팀플에 집중한다',effect:{relationship:5,gradePoint:3,stress:8,career:3}},
      {id:'toeic',text:'📝 토익/어학 준비',effect:{career:6,stress:6,gradePoint:-1}},
      {id:'rest',text:'🛋️ 쉰다',effect:{stress:-9,health:5}},
      {id:'partTime',text:'💸 알바한다',effect:{money:12,stress:4,health:-2}}
    ],
    3:[
      {id:'intern',text:'💼 인턴 지원',effect:{career:10,stress:9,love:-2,money:2}},
      {id:'contest',text:'🏆 공모전 준비',effect:{career:8,relationship:4,stress:8,money:-3}},
      {id:'cert',text:'📑 자격증 공부',effect:{career:6,stress:6,gradePoint:2}},
      {id:'rest',text:'🛋️ 쉰다',effect:{stress:-9,health:5}},
      {id:'date',text:'💘 데이트한다',effect:{love:5,money:-6,stress:-4}}
    ],
    4:[
      {id:'job',text:'💼 취업 준비',effect:{career:9,stress:8,money:-2}},
      {id:'interview',text:'🗣️ 면접 준비',effect:{career:10,stress:9,love:-2}},
      {id:'grad',text:'🎓 대학원 준비',effect:{gradePoint:5,career:3,stress:7}},
      {id:'rest',text:'🛋️ 쉰다',effect:{stress:-9,health:5}},
      {id:'partTime',text:'💸 알바한다',effect:{money:12,stress:4,health:-2}}
    ]
  };
  let choices=byGrade[player.progress.currentGrade]||byGrade[1];
  if(player.profile.gender==='male'&&(player.progress.currentGrade===2||player.progress.currentGrade===3)&&!player.state.military){
    choices=[...choices.slice(0,4),{id:'military',text:'🪖 입대를 고민한다',effect:{stress:4}}];
  }
  if(player.profile.collegeKey==='sports'){
    choices=[...choices.slice(0,3),{id:'training',text:'🏃 훈련에 집중한다',effect:{health:6,stress:3,career:4}},choices[3]];
  }
  const conditionals=getConditionalChoices();
  if(conditionals.length>0&&chance(0.35)){
    choices=[...choices.slice(0,4),conditionals[Math.floor(Math.random()*conditionals.length)]];
  }
  return choices.slice(0,5);
}

// ── 씬 텍스트 ────────────────────────────────────────────────
function mainSceneText(){
  const pool={
    vacation:['방학이다. 쉬고 싶고 돈도 벌어야 하고, 남들은 다 뭔가 하는 것 같아서 괜히 마음이 급해진다.','학교에서 한 발 떨어지면 살 것 같다가도 갑자기 미래가 걱정된다.','방학이 시작된 지 사흘 만에 루틴이 무너졌다. 이게 맞는 건지.'],
    semester_start:['새 학기가 시작됐다. 시간표를 보면 이번엔 진짜 잘 살아보겠다고 다짐하게 된다.','개강 첫 주. 아직은 다들 멀끔하고 아직은 다들 희망이 있다.','새 강의실, 새 교수님, 새 다짐. 이 설렘이 언제까지 갈지는 모른다.'],
    normal:['평범한 한 달 같지만 대학생의 평범함은 늘 뭔가 하나씩 터질 준비를 하고 있다.','수업, 과제, 연락, 약속. 특별한 일은 없어도 마음은 늘 바쁘다.','오늘도 그냥저냥인 하루다. 그런 날들이 사실 제일 많다.'],
    midterm:['중간고사 시즌이다. 이제부터는 선택 하나가 성적표로 돌아온다.','도서관과 단톡방 공기가 전부 예민해지는 시기다.','카페인과 불안감이 공존하는 시즌. 이번엔 준비가 됐을까?'],
    festival:['축제, 팀플, 공모전, 과제가 동시에 몰려온다. 재미있을 수도 있지만 피곤할 확률이 더 높다.','사람을 만나기 좋은 시기이자 지치기 좋은 시기다.','학교 잔디밭에 사람이 넘친다. 봄인지 가을인지, 어쨌든 기분은 나쁘지 않다.'],
    final:['기말고사가 다가왔다. 끝이 보이기 시작하면 오히려 더 조급해진다.','종강이 멀지 않았지만 그 전에 넘어야 할 산은 여전히 크다.','마지막 스퍼트. 여기서 포기하면 한 학기가 아깝다는 걸 알면서도.']
  };
  return sample(pool[player.progress.turnType]||['이번 달에는 무엇을 할까?']);
}

// ── 엔딩 힌트 ────────────────────────────────────────────────
function getEndingHint(){
  if(player.stats.stress>=88) return '⚠️ 번아웃이 매우 가깝다. 지금 당장 회복이 필요하다.';
  if(player.stats.otaku>=80&&player.stats.career<=25) return '🎮 이 흐름이라면 덕업일치 엔딩이 보인다.';
  if(player.stats.love>=65&&player.state.hasRing) return '💍 결혼 엔딩 루트가 열리고 있다.';
  if(player.stats.career>=72) return '💼 취업 가능성이 높아지고 있다.';
  if(player.state.graduateOffer&&player.stats.gradePoint>=75) return '🔬 대학원 진학 루트가 열려 있다.';
  if(player.stats.money>=130) return '🎰 인생 역전의 냄새가 난다.';
  if(player.profile.collegeKey==='sports'&&player.stats.health>=85) return '🏆 프로 선수 엔딩이 보인다.';
  if(player.stats.otaku>=75&&player.stats.relationship>=55) return '📱 크리에이터 엔딩 루트가 열리고 있다.';
  const g=Number(convertGrade(player.stats.gradePoint));
  if(g<=0.5) return '❗ 제적 위험. 학점 회복이 최우선이다.';
  return null;
}

// ── 메인 씬 열기 ────────────────────────────────────────────
function openMainScene(){
  const hint=getEndingHint();
  const hintHtml=hint?`\n\n${hint}`:'';
  renderEvent(
    `${player.progress.currentGrade}학년 ${document.getElementById('month-pill').textContent}`,
    `${mainSceneText()}\n\n이번 달에는 무엇을 할까?${hintHtml}`,
    getMainChoices().map(ch=>({text:ch.text,onClick:()=>chooseMain(ch),special:ch.special||false}))
  );
}

// ── 행동 텍스트 ──────────────────────────────────────────────
function actionStory(id){
  const m={
    study:'하기 싫다는 마음과 해내야 한다는 마음이 부딪혔지만, 오늘은 도망치지 않기로 했다.',
    play:'잠시라도 숨을 돌리기로 했다. 대학 생활은 생각보다 길고 사람은 계속 긴장만 한 채로 버틸 수 없다.',
    club:'동아리방의 어수선한 분위기 속으로 들어갔다. 웃고 떠드는 동안 학교가 조금 덜 낯설게 느껴졌다.',
    rest:'침대에 몸을 던졌다. 쉬는 건 게으름이 아니라 생존 기술이라는 생각이 들었다.',
    partTime:'돈은 있어야 하고 시간은 없고 몸은 피곤하다. 대학생의 알바는 늘 그런 종류의 선택이다.',
    team:'조별과제 채팅방을 열어보며 한숨을 쉬었다. 인간관계는 대개 이런 식으로 단련된다.',
    toeic:'미래에 대한 막연한 불안을 점수와 표로 바꾸어보려 했다.',
    intern:'아직은 부족해 보여도 지금이 아니면 시작조차 못 할 것 같았다.',
    contest:'잘될지 아닐지는 모르지만 이 시도 하나가 자신을 조금 더 앞으로 밀어줄 것 같았다.',
    cert:'자격증 공부는 재미보다 불안이 더 크지만 미래를 붙잡는 손잡이처럼 느껴진다.',
    date:'학교 밖으로 잠깐 걸어나온 시간은 의외로 오래 기억에 남는다.',
    job:'마감이 있는 인생처럼 여러 공고를 열어보고 닫았다.',
    interview:'예상 질문을 되뇌며 표정과 목소리 톤을 연습했다.',
    grad:'공부를 더 한다는 건 낭만 같기도 하고 압박 같기도 했다.',
    military:'언젠가는 결론을 내려야 하는 문제였고 그 시기가 생각보다 빨리 다가오고 있었다.',
    cram:'벼락치기 특유의 절망과 이상한 집중력이 동시에 찾아왔다.',
    borrow:'친구 필기 하나가 오늘의 생존 키트처럼 느껴졌다.',
    library:'자리를 잡고 앉자마자 현실감이 몰려왔다.',
    guess:'망한 것 같지만 완전히 망한 건 아닐 수도 있다는 이상한 희망만 붙들었다.',
    sleep:'모든 걸 잠시 내려놓고 잤다. 잠은 버틸 힘은 남겨준다.',
    askFriend:'친구한테 솔직하게 도움을 요청했다. 의외로 흔쾌히 도와줬다.',
    useCareer:'지금까지 쌓아온 경험이 여기서 쓸모가 있었다.',
    grind:'체력 하나로 밀어붙였다. 몸은 힘들지만 해냈다는 기분이 남았다.',
    training:'오늘도 훈련했다. 운동장을 달리는 동안만큼은 다른 생각이 없었다.'
  };
  return m[id]||'이번 달도 선택의 결과로 조용히 흘러갔다.';
}

function actionTitle(id){
  return{study:'공부했다',play:'놀았다',club:'동아리 방에 갔다',rest:'쉬었다',partTime:'알바를 했다',team:'팀플을 붙들었다',toeic:'어학 준비를 했다',intern:'인턴 지원서를 열었다',contest:'공모전에 집중했다',cert:'자격증 공부를 했다',date:'데이트를 했다',job:'취업 준비를 했다',interview:'면접을 상상했다',grad:'대학원을 고민했다',military:'입대를 고민했다',cram:'벼락치기를 했다',borrow:'친구 필기를 빌렸다',library:'도서관에 박혔다',guess:'시험을 감으로 봤다',sleep:'시험 날 잤다',askFriend:'인맥을 동원했다',useCareer:'경험을 활용했다',grind:'체력으로 밀어붙였다',training:'훈련에 집중했다'}[id]||'이번 달을 보냈다';
}

// ── 연속 행동 특수 이벤트 ────────────────────────────────────
function checkConsecutiveEvent(id){
  if(player.state.consecutiveCount>=3){
    if(id==='study') return{title:'📚 공부 기계가 됐다',description:'3달 연속 공부만 했다. 성적은 올랐지만 사람이 그리워진다.',choices:[{text:'이대로 간다',effect:{gradePoint:6,relationship:-4,stress:5}},{text:'적당히 쉰다',effect:{stress:-5,relationship:3}},{text:'친구에게 연락한다',effect:{relationship:6,gradePoint:-1,stress:-3}}]};
    if(id==='rest') return{title:'🛋️ 완전 방전 모드',description:'3달 내내 쉬었더니 지루함이 새 스트레스가 됐다.',choices:[{text:'뭔가 시작한다',effect:{career:4,stress:3}},{text:'더 쉰다',effect:{stress:2,health:3,gradePoint:-3}},{text:'이참에 여행 간다',effect:{money:-8,stress:-8,relationship:4}}]};
    if(id==='partTime') return{title:'💸 알바 장인이 됐다',description:'3달 연속 알바. 사장님이 매니저 얘기를 꺼냈다.',choices:[{text:'수락한다',effect:{career:6,money:10,stress:5}},{text:'거절하고 학교에 집중',effect:{gradePoint:4,stress:2}},{text:'일단 보류한다',effect:{money:3}}]};
  }
  return null;
}

// ── 행동 선택 ────────────────────────────────────────────────
function chooseMain(choice){
  player.state.lastAction=choice.id;
  trackConsecutive(choice.id);
  applyEffect(choice.effect);
  addLog(actionTitle(choice.id),actionStory(choice.id));
  const consEv=checkConsecutiveEvent(choice.id);
  if(consEv&&chance(0.7)){player.state.consecutiveCount=0;return popupEvent(consEv,'general');}
  if(choice.id==='rest'||choice.id==='sleep'){
    player.state.oversleptBoost=true;
    maybeRumorPopup();
    // 주거 이벤트 트리거 (쉬는 날 40% 확률)
    if(chance(0.40) && typeof maybeHousingEvent==='function'){
      if(maybeHousingEvent()) return;
    }
  } else {
    player.state.oversleptBoost=false;
  }
  if(choice.id==='partTime') player.state.partTimeJob=true;
  if(choice.id==='date'&&player.stats.love>=20) startLoveChain();
  if(choice.id==='military'&&player.profile.gender==='male') return popupEvent(sample(MILITARY_EVENTS),'military');
  if(choice.id==='partTime'&&chance(0.18)) startJobChain('parttime');
  if(choice.id==='job'&&chance(0.2)) startJobChain('randomhire');
  if(choice.id==='grad'&&player.stats.gradePoint>=76&&chance(0.35)) player.state.graduateOffer=true;
  if((choice.id==='rest'||choice.id==='play')&&player.stats.otaku>=30&&chance(0.25)){
    return popupEvent(sample(OTAKU_EVENTS),'general');
  }
  randomEventStep();
}

// ── 찌라시 팝업 ──────────────────────────────────────────────
function maybeRumorPopup(){
  if(!chance(0.45)) return;
  const rumor=sample(RUMOR_EVENTS);
  player.state.lastRumorId=rumor.id;
  player.state.rumors.unshift({title:rumor.title,body:rumor.description});
  if(player.state.rumors.length>30) player.state.rumors.pop();
  return popupEvent({
    title:`📱 찌라시: ${rumor.title}`,
    description:`휴대폰에서 이런 내용이 떴다.\n${rumor.description}`,
    choices:[
      {text:'피식 웃고 넘긴다',effect:rumor.effect},
      {text:'친구에게 공유한다',effect:{...rumor.effect,relationship:2}},
      {text:'댓글까지 다 읽는다',effect:{...rumor.effect,stress:-2}}
    ]
  },'general');
}

// ── 이벤트 팝업 (결과 텍스트 지원) ──────────────────────────
function popupEvent(eventObj,variant){
  let rawChoices=eventObj.choices;
  if(!rawChoices||!rawChoices.length) rawChoices=getDefaultChoicesForCategory(eventObj.category);
  const choices=rawChoices.slice(0,4).map(ch=>({
    text:ch.text,
    onClick:()=>{
      closeModal();
      if(ch.requires==='ring'&&!player.state.hasRing){
        addLog('고백 준비 실패','반지 없이 고백하려다 괜히 타이밍만 어색해졌다.');
        applyEffect({love:-2,stress:4});
      } else {
        applyEffect(ch.effect||{});
        // 결과 텍스트가 있으면 로그에 추가
        const resultText = ch.resultText || null;
        const logBody = resultText
          ? `${eventObj.description}\n\n▶ ${resultText}`
          : eventObj.description;
        addLog(`이벤트: ${eventObj.title}`, logBody);
        if(ch.special==='enter_military'){player.state.military=true;player.state.activeChain={type:'military',step:0};}
        if(ch.special==='black_company') player.state.blackCompanyRoute=true;
        if(ch.special==='start_parttime') player.state.partTimeJob=true;
        if(ch.special==='lotto_win') player.stats.money=clamp(player.stats.money+150);
        if(ch.special==='buy_ring') player.state.hasRing=true;
      }
      updateRelationshipState();updateWarnings();checkAchievements();finishTurn();
    }
  }));
  // variant에 따라 모달 스타일 분기
  const modalVariantMap={love:'love',military:'military',housing:'housing',special:'special',general:'general'};
  openModal(`✨ 이벤트: ${eventObj.title}`,eventObj.description,choices,modalVariantMap[variant]||'general');
}

function getDefaultChoicesForCategory(category){
  const d={
    study:[{text:'열심히 대응한다',effect:{gradePoint:3,stress:3}},{text:'적당히 넘긴다',effect:{stress:-1}},{text:'포기한다',effect:{gradePoint:-2,stress:-3}}],
    life:[{text:'잘 해결한다',effect:{stress:-2,health:2}},{text:'그냥 버틴다',effect:{stress:1}},{text:'친구한테 털어놓는다',effect:{relationship:2,stress:-3}}],
    career:[{text:'적극적으로 임한다',effect:{career:4,stress:4}},{text:'일단 알아본다',effect:{career:2,stress:1}},{text:'다음에 하기로 한다',effect:{stress:-1}}],
    relationship:[{text:'적극적으로 반응한다',effect:{relationship:4,stress:2}},{text:'흘려듣는다',effect:{relationship:1}},{text:'자리를 피한다',effect:{relationship:-1,stress:-1}}],
    money:[{text:'절약하기로 한다',effect:{money:3,stress:1}},{text:'어쩔 수 없다',effect:{stress:-1}},{text:'알바를 알아본다',effect:{money:5,stress:3}}]
  };
  return d[category]||[{text:'확인',effect:{}}];
}

// ── 랜덤 이벤트 발생 ─────────────────────────────────────────
function randomEventStep(){
  let p=0.32;
  if(player.state.oversleptBoost) p+=0.22;
  if(chance(p)){
    // 특수 루트 우선 체크
    if(typeof maybeSpecialRouteEvent==='function'&&maybeSpecialRouteEvent()) return;
    if(player.state.oversleptBoost){
      player.state.oversleptBoost=false;
      return popupEvent({
        title:'😴 늦잠을 잤다',
        description:'알람을 몇 번이나 껐는지도 기억 안 난다. 눈 떠 보니 이미 수업 시작 시간이다.',
        choices:[
          {text:'그냥 오늘은 버린다',effect:{stress:-4,gradePoint:-8,health:2},resultText:'결석 처리됐다. 오늘 하루를 날렸다. 기분은 묘하게 후련하다.'},
          {text:'늦었지만 간다',effect:{stress:5,gradePoint:2,health:-2},resultText:'헐레벌떡 들어갔다. 교수님 눈이 마주쳤다. 모른 척했다.'},
          {text:'공강이라 합리화한다',effect:{stress:-1,gradePoint:-5,relationship:-1},resultText:'그렇게 합리화하고 다시 잤다. 내일은 꼭 간다.'},
          {text:'친구에게 출석 부탁한다',effect:{relationship:3,stress:2,gradePoint:-3},resultText:'친구가 대신 불러줬다. 빚진 기분이다. 언제 갚을지 모른다.'}
        ]
      },'general');
    }
    // 찌라시 연계 이벤트
    if(player.state.lastRumorId==='r6'&&chance(0.6)){
      player.state.lastRumorId=null;
      return popupEvent({title:'📄 족보를 직접 받았다',description:'소문이 사실이었다. 누군가 카톡으로 파일을 보내줬다.',choices:[
        {text:'믿고 공부한다',effect:{gradePoint:6,stress:-3},resultText:'맞는 내용이었다. 이번 시험은 잘 봤다.'},
        {text:'반신반의하며 본다',effect:{gradePoint:2,stress:1},resultText:'반쯤만 믿었는데, 반쯤은 맞았다.'},
        {text:'쓰레기통에 버린다',effect:{gradePoint:-1},resultText:'버렸다. 나중에 맞는 내용이었다는 걸 알았다.'}
      ]},'general');
    }
    if(player.state.lastRumorId==='r4'&&chance(0.5)){
      player.state.lastRumorId=null;
      return popupEvent({title:'💘 소문의 당사자를 마주쳤다',description:'소문이 사실이었다. 생각보다 잘 어울렸다.',choices:[
        {text:'축하해준다',effect:{relationship:4,love:2},resultText:'진심으로 축하했다. 나도 모르게 설레는 기분이 들었다.'},
        {text:'괜히 묘한 기분',effect:{love:3,stress:2},resultText:'이 감정이 뭔지 잘 모르겠다.'},
        {text:'모른 척한다',effect:{stress:-1},resultText:'못 본 척 지나쳤다. 그게 더 어색했다.'}
      ]},'general');
    }
    if(player.state.lastRumorId==='r10'&&chance(0.55)){
      player.state.lastRumorId=null;
      return popupEvent({title:'🎤 콘서트 티켓팅에 성공했다',description:'기적이 일어났다. 손이 떨렸다.',choices:[
        {text:'간다!!',effect:{otaku:8,money:-8,stress:-8},resultText:'갔다. 현장에서 울었다. 인생 최고의 날 중 하나였다.'},
        {text:'공부 때문에 판다',effect:{money:10,stress:2},resultText:'팔았다. 웃돈을 받았다. 아쉽지만 어쩔 수 없었다.'},
        {text:'친구와 같이 간다',effect:{otaku:6,relationship:5,money:-8},resultText:'친구와 함께 갔다. 더 행복했다. 이런 기억이 남는다.'}
      ]},'general');
    }
    // 주거 이벤트 (일반 랜덤 30% 확률로도 트리거)
    if(typeof maybeHousingEvent==='function'&&chance(0.30)){
      if(maybeHousingEvent()) return;
    }
    return popupEvent(sample(GENERAL_EVENTS),'general');
  }
  finishTurn();
}

function startLoveChain(){if(!player.state.activeChain)player.state.activeChain={type:'love',step:0};}
function startJobChain(kind){player.state.activeChain={type:'job',step:0,kind};}

// ── 학과 의무 이벤트 ──────────────────────────────────────────
function mandatoryMajorEvent(){
  const grade=player.progress.currentGrade;
  const college=player.profile.collegeKey||'';
  let domain='general';
  if(['engineering','itfusion'].includes(college)) domain='engineering';
  else if(college==='arts') domain='art';
  else if(['nursing','science'].includes(college)) domain='medical';
  else if(['business','law'].includes(college)) domain='business';
  else if(['humanities','education','social'].includes(college)) domain='humanities';
  else if(college==='sports') domain='sports';
  const domainEvents={
    engineering:{2:{title:'⚙️ 설계 과제 지옥 시작',desc:`${player.profile.majorLabel} 2학년, 드디어 실전 설계가 시작됐다.\n밤을 새워도 뭔가 항상 부족하다. CAD와 친해지는 시간.`},3:{title:'🔧 캡스톤 디자인 킥오프',desc:`졸업작품이 현실이 됐다. 팀을 꾸리고, 주제를 정하고.\n이게 끝나면 진짜 어른이 되는 느낌이다.`}},
    art:{2:{title:'🎨 포트폴리오 첫 리뷰',desc:`교수님 앞에서 작품 리뷰. 칭찬인지 비판인지 모를 피드백이 돌아왔다.\n예술가는 비판에 단단해져야 한다고 한다.`},3:{title:'🖼️ 전시 준비가 시작됐다',desc:`아이디어는 있는데 재료비와 시간이 문제다.\n예술은 낭만이고 현실은 예산이다.`}},
    medical:{2:{title:'🔬 첫 실습이 시작됐다',desc:`이론으로만 배운 걸 직접 마주하게 됐다.\n생각보다 담담했고, 또 생각보다 무거웠다.`},3:{title:'🏥 현장 실습 배정',desc:`드디어 현장이다. 아는 것과 할 수 있는 것 사이의 거리를 몸으로 배우는 시간.`}},
    business:{2:{title:'📊 케이스 스터디 발표',desc:`실제 기업 케이스를 분석해서 발표한다.\n정답이 없는 게 더 어렵다.`},3:{title:'🚀 창업 경진대회 권유',desc:`교수님이 팀을 꾸려서 나가보라 했다.\n기회인지 짐인지 아직 모르겠다.`}},
    humanities:{2:{title:'📚 논문 읽기 과제 폭탄',desc:`A4 30장짜리 영문 논문 5편이 숙제다.\n학문의 세계는 넓고 내 시간은 짧다.`},3:{title:'🎓 학회 발표 제안',desc:`교수님이 학회에서 발표해보겠냐고 했다.\n영광인데 긴장된다.`}},
    sports:{2:{title:'🏃 전국 대회 출전 기회',desc:`${player.profile.majorLabel} 2학년, 처음으로 전국 대회 출전 기회가 왔다.\n훈련한 만큼 나온다는 걸 이번에 확인하게 된다.`},3:{title:'🏆 스포츠 에이전트와 면담',desc:`드래프트 전 에이전트 미팅이 잡혔다.\n진로가 구체적으로 보이기 시작했다.`}},
    general:{2:{title:`${player.profile.majorLabel} 2학년 이벤트`,desc:`${player.profile.majorLabel}다운 사건이 찾아왔다.\n전공이 이제 진짜 자기 얼굴을 드러내기 시작했다.`},3:{title:`${player.profile.majorLabel} 3학년 이벤트`,desc:`이제는 전공이 곧 진로처럼 느껴지는 순간이다.\n잘하면 기회가 되고, 못하면 그냥 피곤한 추억이 된다.`}}
  };
  const ev=(domainEvents[domain]||domainEvents.general)[grade];
  if(!ev) return null;
  if(grade===2&&!player.state.majorEvent2Done){
    player.state.majorEvent2Done=true;
    return{title:ev.title,description:ev.desc,choices:[{text:'정면으로 부딪힌다',effect:{career:7,gradePoint:2,stress:5},resultText:'정면으로 했다. 힘들었지만 뭔가를 얻은 것 같다.'},{text:'조심스럽게 참여한다',effect:{career:4,stress:2},resultText:'조심스럽게 참여했다. 무난하게 넘겼다.'},{text:'무리하지 않는다',effect:{stress:-3,career:-1},resultText:'무리하지 않았다. 편했다. 조금 아쉬웠다.'}],variant:'general'};
  }
  if(grade===3&&!player.state.majorEvent3Done){
    player.state.majorEvent3Done=true;
    return{title:ev.title,description:ev.desc,choices:[{text:'성과를 만든다',effect:{career:8,stress:5,money:-2},resultText:'결과물이 나왔다. 뿌듯하다. 이게 포트폴리오가 된다.'},{text:'사람과 같이 해본다',effect:{career:5,relationship:5,stress:3},resultText:'팀으로 했다. 혼자보다 느리지만 훨씬 재밌었다.'},{text:'일단 배운다',effect:{gradePoint:3,career:3,stress:2},resultText:'배웠다. 지식이 쌓였다. 언젠가 쓸 날이 온다.'}],variant:'general'};
  }
  return null;
}

// ── 체인 계속 ─────────────────────────────────────────────────
function continueChainIfNeeded(){
  if(!player.state.activeChain) return false;
  const chain=player.state.activeChain;
  if(chain.type==='love'){
    const steps=[LOVE_EVENTS[1],LOVE_EVENTS[2],LOVE_EVENTS[3],LOVE_EVENTS[4]];
    if(chain.step<steps.length){chain.step+=1;popupEvent(steps[chain.step-1],'love');return true;}
    player.state.activeChain=null;return false;
  }
  if(chain.type==='military'){
    const idx=Math.min(chain.step,MILITARY_EVENTS.length-1);chain.step+=1;
    if(chain.step<5){popupEvent(MILITARY_EVENTS[idx],'military');return true;}
    player.state.activeChain=null;return false;
  }
  if(chain.type==='job'){
    const paths={
      parttime:[
        {title:'알바 매니저 제안',description:'사장님이 오래 해볼 생각 없냐고 진지하게 물었다.',choices:[{text:'계속 해본다',effect:{career:4,money:8},special:'start_parttime',resultText:'매니저가 됐다. 책임이 생겼다. 돈도 늘었다.'},{text:'일단 넘긴다',effect:{money:2},resultText:'보류했다. 사장님이 아쉬워했다.'},{text:'그만둔다',effect:{stress:-2},resultText:'그만뒀다. 홀가분하다. 다음 알바를 찾아야 한다.'}]},
        {title:'정직원 제안',description:'점장이 정직원 얘기를 꺼냈다. 이상하게 현실감이 확 든다.',choices:[{text:'받아들인다',effect:{career:12,money:15,stress:8},resultText:'정직원이 됐다. 대학 다니면서 직장인이 된 기분이다.'},{text:'조건을 더 본다',effect:{career:6,money:4},resultText:'협상했다. 조건이 조금 나아졌다.'},{text:'공부를 택한다',effect:{gradePoint:3,career:-2},resultText:'거절했다. 공부를 선택했다. 학점이 올랐다.'}]}
      ],
      randomhire:[
        {title:'아무 데나 넣었는데 연락이 왔다',description:'진짜 될 줄은 몰랐는데 갑자기 면접 연락이 와버렸다.',choices:[{text:'일단 가본다',effect:{career:8,stress:5},resultText:'갔다. 생각보다 분위기가 좋았다.'},{text:'무섭지만 준비한다',effect:{career:10,stress:7},resultText:'준비했다. 자신감이 생겼다.'},{text:'그냥 포기한다',effect:{stress:-1,career:-3},resultText:'포기했다. 아쉽지만 지금은 때가 아니라고 생각했다.'}]},
        {title:'갑자기 합격 통보',description:'정말 예상 못 한 곳에서 합격 문자가 왔다.',choices:[{text:'입사한다',effect:{career:14,money:12},resultText:'입사했다. 대학생이면서 직장인이다. 피곤하지만 설렌다.'},{text:'조금 더 고민한다',effect:{stress:4},resultText:'고민 중이다. 기회는 기다려주지 않는다는 걸 안다.'},{text:'더 좋은 곳을 본다',effect:{career:4},resultText:'더 알아보기로 했다. 이 결정이 맞는지는 모른다.'}]}
      ]
    };
    const arr=chain.kind==='parttime'?paths.parttime:paths.randomhire;
    if(chain.step<arr.length){chain.step+=1;popupEvent(arr[chain.step-1],'general');return true;}
    player.state.activeChain=null;return false;
  }
  return false;
}

// ── 경고 갱신 ─────────────────────────────────────────────────
function updateWarnings(){
  const g=Number(convertGrade(player.stats.gradePoint));
  player.state.pinnedWarning='';
  if(g<=1.5){player.state.warningCount+=1;player.state.pinnedWarning='❗ 학사경고 위험. 학점 회복이 최우선이다.';}
  if(player.stats.stress>=95){player.state.burnoutCount+=1;player.state.pinnedWarning='⚠️ 한계치. 버티는 것보다 회복이 더 중요하다.';}
  else if(player.stats.stress>=72&&!player.state.pinnedWarning) player.state.pinnedWarning='⚠️ 스트레스가 매우 높다. 회복 선택지를 고려해야 한다.';
  if(player.stats.gradePoint>=80&&player.progress.currentGrade===4) player.state.graduateOffer=true;
}

// ── 학년 종료 리포트 ───────────────────────────────────────────
function maybeOpenReport(prevGrade){
  if(player.progress.currentTurn>1&&player.progress.currentGrade!==prevGrade){
    const g=convertGrade(player.stats.gradePoint);
    const emoji=Number(g)>=3.5?'🏅':Number(g)>=2.5?'📘':'📉';
    const housingLabel={selfboard:'자취',dormitory:'기숙사',commute:'통학'}[player.profile.housing]||'';
    let comment='';
    if(player.stats.stress>=80) comment='살아남은 것만으로도 대단하다.';
    else if(player.stats.career>=60) comment='스펙은 제법 쌓였다. 문제는 멘탈이다.';
    else if(player.stats.love>=65) comment='학년은 끝났고 감정선은 꽤 깊어졌다.';
    else if(player.stats.otaku>=60) comment='공부보다 덕질이 더 진심이었던 학년이었다.';
    else comment='어떻게든 버텨냈다. 그 자체로 대학생답다.';
    openReport(`${prevGrade}학년 종료 ${emoji} (${housingLabel} 생활)\n\n📚 학점: ${g} / 4.5\n💪 체력: ${player.stats.health}\n💢 스트레스: ${player.stats.stress}\n🫂 인간관계: ${player.stats.relationship}\n💼 취업역량: ${player.stats.career}\n🎧 덕질: ${player.stats.otaku}\n💘 연애: ${player.stats.love}\n💰 돈: ${player.stats.money}\n\n총평: ${comment}`);
  }
}

// ── 턴 종료 ──────────────────────────────────────────────────
function finishTurn(){
  updateRelationshipState();updateWarnings();checkAchievements();
  const immediate=checkImmediateEnding();
  if(immediate) return endGame(immediate);
  const prevGrade=player.progress.currentGrade;
  player.progress.currentTurn+=1;
  player.progress.currentGrade=Math.min(4,Math.ceil(player.progress.currentTurn/7));
  renderAll();
  maybeOpenReport(prevGrade);
  if(player.progress.currentTurn>player.progress.totalTurns) return endGame(checkFinalEnding());
  const majorEvent=mandatoryMajorEvent();
  if(majorEvent){popupEvent(majorEvent,majorEvent.variant||'general');return;}
  if(continueChainIfNeeded()) return;
  if(shouldTriggerMessageEvent()) showMessageToast(randomMessagePool());
  saveGame(player.profile.slot);
  openMainScene();
}

// ── 상점 ─────────────────────────────────────────────────────
function buyShopItem(id){
  const items={
    energyDrink:{price:5,effect:{stress:-4,health:2}},
    meal:{price:8,effect:{health:8,stress:-2}},
    plush:{price:12,effect:{stress:-6}},
    coffee:{price:6,effect:{stress:-3,career:2}},
    ring:{price:25,effect:{},special:'ring'},
    lotto:{price:3,effect:{},special:'lotto'},
    vitaminPack:{price:10,effect:{health:5,stress:-3}},
    study_kit:{price:15,effect:{gradePoint:3,stress:-5}}
  };
  const item=items[id];
  if(!item) return;
  if(player.stats.money<item.price){addLog('상점 실패','돈이 부족해서 구매하지 못했다.');renderLog();return;}
  player.stats.money-=item.price;
  if(item.special==='ring'){player.state.hasRing=true;addLog('상점 구매','반지를 샀다. 이제야 고백이 조금 현실감 있게 느껴진다.');}
  else if(item.special==='lotto'){
    if(chance(0.03)){player.stats.money=clamp(player.stats.money+150);addLog('🎰 로또 당첨!','말이 안 되지만 진짜 당첨됐다. 순간 모든 계획이 흔들렸다.');}
    else addLog('로또 실패','역시 인생은 그렇게 쉽게 풀리지 않는다.');
  } else {applyEffect(item.effect);addLog('상점 구매','작은 소비가 의외로 큰 회복이 되기도 한다.');}
  renderAll();openShop();
}

// ── 게임 종료 ─────────────────────────────────────────────────
function endGame(key){
  player.progress.gameEnded=true;
  unlockEnding(key);
  const ending=ENDINGS[key];
  if(!ending){console.error('엔딩 없음:',key);return;}
  renderEvent(ending.title,sample(ending.variants),[{text:'처음 화면으로',onClick:()=>{showScreen('start-screen');renderGallery();}}]);
  renderAll();
}
