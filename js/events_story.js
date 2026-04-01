
const STORY_ROUTE_EVENTS = {
  council:[
    {id:'story_council_1',title:'학생회 제안이 왔다',description:'행사 진행을 도와달라는 연락이 왔다.
귀찮은데 이상하게 이름이 계속 불린다.',choices:[
      {text:'한 번 해본다',effect:{relationship:6,stress:3,career:2},resultText:'생각보다 잘 맞았다. 사람들이 자꾸 너를 찾기 시작했다.'},
      {text:'뒤에서만 돕는다',effect:{relationship:3,stress:1},resultText:'티는 덜 났지만 연결은 생겼다.'},
      {text:'정중히 거절한다',effect:{stress:-2},resultText:'편해졌지만 뭔가 하나 지나간 기분이 들었다.'}
    ]},
    {id:'story_council_2',title:'행사 당일 대형 사고',description:'사회자도 늦고 음향도 꼬였다.
누군가는 지금 수습해야 한다.',choices:[
      {text:'앞에 나가 직접 수습한다',effect:{relationship:7,career:4,stress:5},resultText:'엉망이던 분위기를 어떻게든 살려냈다.'},
      {text:'사람 배치부터 정리한다',effect:{relationship:5,career:3,stress:3},resultText:'덕분에 행사가 굴러갔다. 조용한 실세가 됐다.'},
      {text:'눈에 띄지 않게 빠진다',effect:{stress:-1,relationship:-3},resultText:'편했지만 사람들 기억에도 남았다.'}
    ]},
    {id:'story_council_3',title:'다음 학기 대표 제안',description:'너한테 맡기면 잘할 것 같다는 말이 나왔다.
이제 장난처럼 넘길 수 없는 단계다.',choices:[
      {text:'수락한다',effect:{relationship:8,career:6,stress:6},resultText:'학교 안에서 이름이 꽤 알려지기 시작했다.'},
      {text:'조건부로 수락한다',effect:{relationship:5,career:4,stress:3},resultText:'선은 그었지만 기회는 잡았다.'},
      {text:'거절하고 내 생활을 챙긴다',effect:{stress:-4,gradePoint:2},resultText:'남의 기대 대신 내 리듬을 택했다.'}
    ]}
  ],
  investment:[
    {id:'story_invest_1',title:'동기가 코인방 링크를 보냈다',description:'말투는 다들 확신에 차 있다.
이런 확신은 보통 위험하지만 묘하게 흔들린다.',choices:[
      {text:'소액만 넣어본다',effect:{money:-5,stress:2},resultText:'넣었다. 이제 차트를 보기 시작했다.'},
      {text:'정보만 본다',effect:{career:1,stress:1},resultText:'안 넣었는데도 마음은 출렁였다.'},
      {text:'위험하니 무시한다',effect:{stress:-2},resultText:'현명했을지도 모른다. 아직은.'}
    ]},
    {id:'story_invest_2',title:'갑자기 두 배가 됐다',description:'작게 넣은 돈이 생각보다 많이 불었다.
이럴 때 사람이 망가지기 시작한다.',choices:[
      {text:'바로 뺀다',effect:{money:12,stress:-2},resultText:'수익 실현. 짜릿하지만 더 넣고 싶은 마음이 남았다.'},
      {text:'더 넣는다',effect:{money:-6,stress:4},resultText:'지금부터는 투자보다 욕망에 가깝다.'},
      {text:'반만 뺀다',effect:{money:6,stress:1},resultText:'적당히 챙겼다고 생각했지만 계속 차트를 보게 됐다.'}
    ]},
    {id:'story_invest_3',title:'폭락 또는 생환',description:'새벽에 알림이 연달아 울렸다.
이 순간이 인생 역전일 수도, 흑역사일 수도 있다.',choices:[
      {text:'이번엔 진짜 손절한다',effect:{money:8,stress:3},resultText:'크게 먹진 못했지만 크게 잃지도 않았다. 이 정도면 생환이다.'},
      {text:'존버한다',effect:{money:'RANDOM_LARGE',stress:6},resultText:'결과는 차트만 안다. 인생은 늘 이런 식으로 사람을 시험한다.'},
      {text:'앱을 지운다',effect:{stress:-5,health:2},resultText:'마음은 편해졌다. 돈보다 수명이 먼저 중요하다는 걸 배웠다.'}
    ]}
  ],
  legend:[
    {id:'story_legend_1',title:'익명 커뮤니티의 전설이 됐다',description:'올린 글 하나가 학내 커뮤니티에서 터졌다.
다들 누군지 찾는 분위기다.',choices:[
      {text:'계속 떡밥을 던진다',effect:{relationship:5,otaku:4,stress:3},resultText:'조회수와 반응이 미쳤다. 묘하게 중독적이다.'},
      {text:'적당히 끊는다',effect:{stress:-1,relationship:2},resultText:'불은 줄었지만 이름은 남았다.'},
      {text:'내가 쓴 거 아니라고 한다',effect:{stress:1},resultText:'부정할수록 더 수상해졌다.'}
    ]},
    {id:'story_legend_2',title:'정체를 아는 사람이 생겼다',description:'한 명이 눈치챘다.
근데 폭로 대신 같이 하자고 한다.',choices:[
      {text:'공동 운영한다',effect:{relationship:6,career:2,stress:2},resultText:'의외로 합이 좋았다. 둘이서 더 크게 놀기 시작했다.'},
      {text:'비밀을 지켜달라 부탁한다',effect:{relationship:4,stress:1},resultText:'묘한 공범 의식이 생겼다.'},
      {text:'계정을 접는다',effect:{stress:-3},resultText:'조용해졌지만 한동안 아쉬웠다.'}
    ]},
    {id:'story_legend_3',title:'오프라인에서 마주쳤다',description:'다들 그 전설의 글쓴이를 모르는 상태로 얘기한다.
너만 그 비밀을 알고 있다.',choices:[
      {text:'끝까지 비밀로 간다',effect:{otaku:4,stress:-2},resultText:'비밀을 가진 사람만의 이상한 만족감이 있었다.'},
      {text:'한 사람에게만 밝힌다',effect:{relationship:5,love:2},resultText:'비밀을 공유하는 순간 관계의 온도가 바뀌었다.'},
      {text:'내가 썼다고 깐다',effect:{relationship:3,stress:4},resultText:'순간 조용해졌다가 다 같이 웃었다. 생각보다 나쁘지 않았다.'}
    ]}
  ]
};

function getStoryRouteEvents(routeKey){
  return STORY_ROUTE_EVENTS[routeKey]||[];
}

function triggerStoryRoute(routeKey){
  const steps=getStoryRouteEvents(routeKey);
  if(!steps.length) return false;
  player.state.activeChain={type:'story',routeKey,step:1};
  popupEvent(steps[0],'special');
  return true;
}

function maybeTriggerStoryEvent(){
  const flags=player.state.specialFlags||{};
  if(player.stats.relationship>=68 && !flags.council_started && chance(0.22)){
    flags.council_started=true;
    return triggerStoryRoute('council');
  }
  if(player.stats.money>=18 && player.stats.stress>=45 && !flags.investment_started && chance(0.2)){
    flags.investment_started=true;
    return triggerStoryRoute('investment');
  }
  if(player.stats.otaku>=40 && player.stats.relationship>=50 && !flags.legend_started && chance(0.18)){
    flags.legend_started=true;
    return triggerStoryRoute('legend');
  }
  return false;
}
