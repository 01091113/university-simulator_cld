const MESSAGE_EVENTS = [
  {id:'msg_1',title:'[오늘 건축이랑 번개팅 3:3 님오출]',body:'갑자기 과팅 공지가 떴다. 분명 남의 일인데 이상하게 한 번쯤 보게 된다.',category:'love'},
  {id:'msg_2',title:'야 지금 도서관 자리 있음? 급 공지 떴다',body:'중간고사 기간엔 자리 하나가 생사를 가른다. 단톡이 전쟁터가 됐다.',category:'study'},
  {id:'msg_3',title:'최애 컴백 티저 나왔다 ㄹㅇ 미침',body:'지갑은 말리는데 손은 이미 링크를 누르고 있다.',category:'otaku'},
  {id:'msg_4',title:'ㅋㅋㅋ 교수님 ppt에 밈 삽입하심',body:'강의실 전체가 웃었다. 이런 날은 수업이 조금 덜 길게 느껴진다.',category:'campus'},
  {id:'msg_5',title:'오늘도 수업 째고 싶다 ㄹㅇ',body:'누군가 단톡에 진심 반 농담 반으로 남긴 말인데, 이상하게 다들 공감하고 있다.',category:'campus'},
  {id:'msg_6',title:'편의점 1+1 품목 알려드림',body:'이 정보 하나가 일주일 식비를 바꾼다. 대학생의 정보력이란 이런 것이다.',category:'life'},
  {id:'msg_7',title:'지금 릴스보다가 인생 40분 증발함',body:'짧은 영상 하나가 이렇게 위험할 줄은 다들 알지만, 또 계속 본다.',category:'campus'},
  {id:'msg_8',title:'야 너 과제 진짜 시작 안 했냐?',body:'읽는 순간 가슴이 철렁한다. 문제는 아직도 시작하지 않았다는 점이다.',category:'campus'},
  {id:'msg_9',title:'학식 오늘 돈까스래 ㅇㅇ 빨리 와',body:'이 한 문장 하나가 발걸음을 빠르게 만든다. 학식 돈까스는 특별하다.',category:'life'},
  {id:'msg_10',title:'오빠 오늘 뭐해',body:'이 세 글자의 무게가 생각보다 무거울 수 있다.',category:'love'},
  {id:'msg_11',title:'족보 공유방 들어와',body:'링크 하나가 도착했다. 진짜인지 아닌지 알 수 없지만 일단 들어가본다.',category:'study'},
  {id:'msg_12',title:'아 진짜 팀플 ㅆ...',body:'욕이 자동완성되는 순간이 있다. 조별과제가 바로 그 순간이다.',category:'campus'},
  {id:'msg_13',title:'나 방금 면접 합격했어!!!',body:'친구의 합격 소식에 진심으로 기뻐야 하는데 동시에 묘한 자극도 온다.',category:'career'},
  {id:'msg_14',title:'혹시 이번 주말 알바 대타 가능해?',body:'돈이 필요하긴 한데, 주말도 필요하다. 이 갈등은 매번 온다.',category:'life'},
  {id:'msg_15',title:'ㅋㅋㅋ 교수님이 수업 취소하셨대',body:'이 소식이 기쁜 건 맞는데 과제는 어떻게 된다는 건지 아직 공지가 없다.',category:'campus'},
  {id:'msg_16',title:'클럽 가자 이번 주 금요일',body:'성인이 된 후 이 메시지가 올 줄은 알았는데 막상 오니까 고민된다.',category:'social'},
  {id:'msg_17',title:'혹시 자소서 봐줄 수 있어?',body:'부탁을 받는 건 신뢰의 표현이기도 하다. 내 자소서도 못 썼지만 일단 봐주기로 한다.',category:'career'},
  {id:'msg_18',title:'오늘 학교 축제 뭐함?',body:'축제가 열렸다. 공부하러 온 건데 어느새 부스 앞에 줄을 서고 있다.',category:'campus'},
  {id:'msg_19',title:'너 요즘 왜 연락 안 해',body:'이 메시지를 보고 잠깐 멈췄다. 바쁘다는 말이 변명이 되는 순간이 있다.',category:'relationship'},
  {id:'msg_20',title:'방학 때 뭐 할 거야?',body:'이 질문에 멋진 답을 하고 싶었는데 아직 아무것도 안 정했다.',category:'campus'}
];

function randomMessagePool(){return MESSAGE_EVENTS[Math.floor(Math.random()*MESSAGE_EVENTS.length)];}

function shouldTriggerMessageEvent(){
  if(player?.state?.messageBlocked) return false;
  let p=0.12;
  const lastAction=player?.state?.lastAction||'';
  if(['rest','sleep'].includes(lastAction)) p+=0.25;
  if(['play','club','date'].includes(lastAction)) p+=0.10;
  if(player.stats.relationship>=60) p+=0.05;
  return Math.random()<p;
}

function showMessageToast(message){
  removeMessageToast();
  const wrap=document.createElement('div');
  wrap.id='phone-toast';
  wrap.className='phone-toast';
  wrap.innerHTML=`
    <div class="phone-toast-head">📱 카카오톡 알림</div>
    <div class="phone-toast-title">${message.title}</div>
    <div class="phone-toast-body">${message.body}</div>
    <div class="phone-toast-actions">
      <button class="secondary-btn small" id="phone-close-btn">읽음</button>
      <button class="secondary-btn small danger-soft" id="phone-block-btn">알림 끄기</button>
    </div>`;
  document.body.appendChild(wrap);
  document.getElementById('phone-close-btn').onclick=()=>{
    addLog('카톡 알림',`${message.title}\n${message.body}`);
    removeMessageToast();renderLog();
  };
  document.getElementById('phone-block-btn').onclick=()=>{
    player.state.messageBlocked=true;
    addLog('알림 차단','카톡 알림을 껐다. 당분간 방해받지 않는다.');
    removeMessageToast();renderLog();
  };
  setTimeout(()=>removeMessageToast(),8000);
}

function removeMessageToast(){const ex=document.getElementById('phone-toast');if(ex)ex.remove();}
