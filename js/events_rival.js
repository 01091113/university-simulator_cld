
function rivalName(){
  return (player && player.profile && player.profile.rivalName) ? player.profile.rivalName : '서윤';
}

function maybeTriggerRivalEvent(){
  const flags=player.state.specialFlags||{};
  if(!player.state.rivalMet && player.progress.currentTurn<=6 && chance(0.42)){
    player.state.rivalMet=true;
    return popupEvent({
      title:`🧩 ${rivalName()}을 처음 제대로 의식했다`,
      description:`강의실 앞자리에 늘 먼저 앉아 있던 ${rivalName()}이 오늘따라 유난히 눈에 들어왔다.
교수님 질문에도 먼저 손을 들고, 발표도 이상하게 잘한다.
기분 나쁜데 자꾸 신경 쓰인다.`,
      choices:[
        {text:'괜히 경쟁심이 생긴다',effect:{stress:2,gradePoint:3},resultText:`그날부터 ${rivalName()}의 이름을 볼 때마다 괜히 자세가 바로 잡혔다.`,onChoose:()=>{player.state.rivalAffinity+=1;}},
        {text:'먼저 말을 걸어본다',effect:{relationship:4,stress:-1},resultText:`생각보다 말이 잘 통했다. 더 신경 쓰이기 시작했다.`,onChoose:()=>{player.state.rivalAffinity+=2;}},
        {text:'모른 척하지만 계속 본다',effect:{stress:1,love:1},resultText:`모른 척했지만 이미 신경 쓰고 있다는 건 들켜버린 상태였다.`,onChoose:()=>{player.state.rivalAffinity+=1;}}
      ]
    },'special');
  }
  if(player.state.rivalMet && !flags.rival_duel && player.stats.gradePoint>=62 && chance(0.18)){
    flags.rival_duel=true;
    return popupEvent({
      title:`📚 ${rivalName()}과 예상치 못한 승부`,
      description:`같은 조 발표가 잡혔다.
묘하게 서로 지기 싫어하는 분위기가 생겼다.`,
      choices:[
        {text:'정면승부한다',effect:{gradePoint:5,stress:4},resultText:`둘 다 진심이 되어버렸다. 발표는 이상하게 뜨거워졌다.`,onChoose:()=>{player.state.rivalAffinity+=1;}},
        {text:'팀으로 잘 맞춰본다',effect:{relationship:4,gradePoint:3},resultText:`경쟁보다 합이 좋았다. 생각보다 같이 있을 때 편했다.`,onChoose:()=>{player.state.rivalAffinity+=2;}},
        {text:'이번엔 져주는 척한다',effect:{stress:-1,love:2},resultText:`져주는 척했는데 오히려 더 복잡한 감정이 남았다.`,onChoose:()=>{player.state.rivalAffinity+=2;}}
      ]
    },'special');
  }
  return false;
}

function triggerRivalSparkEvent(){
  if(player.state.rivalRouteUnlocked||!player.state.rivalMet) return false;
  if(player.state.rivalAffinity<3) return false;
  player.state.rivalRouteUnlocked=true;
  return popupEvent({
    title:`💘 ${rivalName()}이 웃는 게 이상하게 오래 남았다`,
    description:`동아리방에서 다 같이 웃다가, 유독 ${rivalName()}의 표정만 오래 남았다.
경쟁심이라고 넘기기엔 이제 좀 이상하다.`,
    choices:[
      {text:'이 감정을 인정해본다',effect:{love:5,stress:2},resultText:`인정하는 순간부터 모든 장면의 온도가 달라졌다.`,onChoose:()=>{player.state.activeChain={type:'rivalLove',step:1};player.state.rivalRomance=true;}},
      {text:'아직은 경쟁이라고 우긴다',effect:{gradePoint:2,stress:1},resultText:`우겼다. 하지만 스스로도 안 믿긴다.`,onChoose:()=>{player.state.rivalAffinity+=1;}},
      {text:'적당히 거리를 둔다',effect:{stress:-1,love:-1},resultText:`거리를 뒀지만 이상하게 더 신경 쓰였다.`}
    ]
  },'love');
}

function getRivalLoveChainEvents(){
  const n=rivalName();
  return [
    {id:'rival_love_1',title:`${n}과 둘만 남았다`,description:`발표 준비가 늦게 끝나서 강의실엔 너와 ${n}만 남았다.
어색한 정적이 생각보다 편했다.`,choices:[
      {text:'농담을 던진다',effect:{love:4,relationship:3},resultText:`${n}이 처음으로 크게 웃었다.`},
      {text:'집 같이 갈래? 하고 묻는다',effect:{love:5,stress:1},resultText:`같이 걸어가는 길이 짧았다.`},
      {text:'자료만 정리하고 나온다',effect:{love:2},resultText:`아무 일도 없었지만 마음은 조용하지 않았다.`}
    ]},
    {id:'rival_love_2',title:`${n}의 메시지`,description:`새벽에 메시지가 왔다.
'너 오늘 발표 때 괜찮더라.'`,choices:[
      {text:'쿨한 척 답장한다',effect:{love:3,stress:-1},resultText:`쿨한 척했지만 보낸 뒤 계속 읽어봤다.`},
      {text:'장난스럽게 받아친다',effect:{love:5,relationship:2},resultText:`대화가 생각보다 오래 이어졌다.`},
      {text:'한참 뒤에 답장한다',effect:{love:1,stress:2},resultText:`일부러 늦게 보냈지만 티가 났다.`}
    ]},
    {id:'rival_love_3',title:`${n}과 같이 공부하기로 했다`,description:`둘 다 성적에 진심인데, 이상하게 같이 공부하자는 말은 데이트처럼 들렸다.`,choices:[
      {text:'도서관에서 진짜 공부한다',effect:{gradePoint:4,love:3},resultText:`공부도 되고 집중도 안 됐다.`},
      {text:'카페로 간다',effect:{love:5,money:-4},resultText:`문제집보다 표정이 더 기억난다.`},
      {text:'중간에 산책하자고 한다',effect:{love:6,stress:-2},resultText:`이제 이건 그냥 공부가 아니다.`}
    ]},
    {id:'rival_love_4',title:`질투가 났다`,description:`${n}이 다른 사람과 웃으며 이야기하는 걸 봤다.
별 관계도 아닌데 기분이 미묘하게 가라앉았다.`,choices:[
      {text:'아무렇지 않은 척한다',effect:{love:2,stress:2},resultText:`아무렇지 않은 척이 제일 힘들었다.`},
      {text:'괜히 장난처럼 떠본다',effect:{love:4,relationship:2},resultText:`${n}도 네 반응을 눈치챈 것 같았다.`},
      {text:'티 나게 삐친다',effect:{love:-1,stress:4},resultText:`유치했지만 감정은 숨겨지지 않았다.`}
    ]},
    {id:'rival_love_5',title:`비 오는 날 우산`,description:`갑자기 비가 쏟아졌다. ${n}이 우산을 조금 기울여줬다.`,choices:[
      {text:'같이 쓰고 걷는다',effect:{love:6,stress:-2},resultText:`어깨가 닿을 때마다 심장이 괜히 바빴다.`},
      {text:'편의점에서 우산을 하나 더 산다',effect:{money:-4,love:3},resultText:`괜히 아쉬웠다. 그래도 같이 웃었다.`},
      {text:'뛰어간다',effect:{health:-1,love:1},resultText:`둘 다 젖었고, 둘 다 웃었다.`}
    ]},
    {id:'rival_love_6',title:`첫 번째 둘만의 약속`,description:`굳이 말하지 않아도 둘만 보기로 한 약속이었다.`,choices:[
      {text:'영화를 본다',effect:{love:5,money:-5},resultText:`영화 내용보다 옆자리가 더 또렷했다.`},
      {text:'야식 먹으러 간다',effect:{love:4,stress:-3,money:-3},resultText:`대화가 술술 풀렸다.`},
      {text:'캠퍼스를 걷기만 한다',effect:{love:6,stress:-2},resultText:`걷는 것만으로도 충분히 좋았다.`}
    ]},
    {id:'rival_love_7',title:`솔직한 얘기를 했다`,description:`성적, 불안, 집 얘기.
서로가 생각보다 비슷한 방식으로 버티고 있다는 걸 알게 됐다.`,choices:[
      {text:'너한테만 하는 말이라고 한다',effect:{love:7,relationship:3},resultText:`그 말이 둘 사이의 공기를 바꿨다.`},
      {text:'장난으로 분위기를 푼다',effect:{love:3,stress:-1},resultText:`가볍게 넘겼지만 마음은 더 깊어졌다.`},
      {text:'듣기만 한다',effect:{love:4,relationship:2},resultText:`말보다 조용한 공감이 더 크게 남았다.`}
    ]},
    {id:'rival_love_8',title:`주변이 눈치채기 시작했다`,description:`친구들이 둘이 분위기 이상하다고 웃었다.
부정하기엔 이미 늦은 것 같다.`,choices:[
      {text:'부정한다',effect:{stress:2,love:2},resultText:`부정하는 쪽이 더 수상했다.`},
      {text:'적당히 인정한다',effect:{love:5,relationship:2},resultText:`괜히 얼굴이 뜨거워졌다.`},
      {text:'${n} 반응을 먼저 본다',effect:{love:4,stress:1},resultText:`${n}도 너만큼 당황한 것 같았다.`}
    ]},
    {id:'rival_love_9',title:`고백 직전`,description:`이쯤 되면 누가 먼저 말하느냐의 문제다.
지금 아니면 계속 어중간할 것 같다.`,choices:[
      {text:'내가 먼저 말한다',effect:{love:9,stress:4},resultText:`말해버렸다. 이제 물러날 수 없다.`},
      {text:'분위기를 만든다',effect:{love:6,stress:2},resultText:`말은 못 했지만 이미 다 보였다.`},
      {text:'이번에도 미룬다',effect:{love:2,stress:3},resultText:`미뤘다. 다음엔 진짜 해야 한다.`}
    ]},
    {id:'rival_love_10',title:`경쟁심이 사랑이 되는 순간`,description:`${n}이 먼저 말했다.
'너랑 있으면 자꾸 지기 싫다가도, 이상하게 편해.'
이제 대답만 남았다.`,choices:[
      {text:'좋아한다고 말한다',effect:{love:12,relationship:5,stress:-4},resultText:`이상하게 길었던 긴장이 끝났다. 이제는 경쟁보다 더 복잡하고 좋은 관계다.`},
      {text:'웃으면서 손을 잡는다',effect:{love:10,stress:-3},resultText:`말보다 빠른 대답이었다.`},
      {text:'조금만 더 시간을 달라고 한다',effect:{love:4,stress:1},resultText:`끝은 미뤄졌지만 방향은 이미 정해져 있었다.`}
    ]}
  ];
}
