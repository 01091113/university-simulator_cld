const ENDINGS = {
  expelled: {title:'📛 제적 엔딩',variants:['버티려 했지만 흐름은 너무 많이 무너져 있었다. 학교는 더 이상 기다려주지 않았다.','몇 번이고 다시 해보려 했지만 대학 생활은 생각보다 냉정하게 결론을 내렸다.','학점이 바닥을 쳤고 경고가 쌓였다. 결국 퇴학 통보가 왔다. 문은 닫혔지만 다른 문이 어딘가에 있을 것이다.']},
  burnout: {title:'🔥 번아웃 엔딩',variants:['끝까지 가보려 했지만 몸과 마음 중 하나가 먼저 멈춰섰다.','해낼 수 있을 줄 알았지만 회복 없이 버티는 데에도 한계는 있었다.','모든 걸 잘하려다 결국 아무것도 못하게 됐다. 쉬는 것도 기술이라는 걸 너무 늦게 배웠다.']},
  graduate: {title:'🎓 졸업 엔딩',variants:['완벽하진 않았지만 무너지지도 않았다. 그 자체로 꽤 괜찮은 대학 생활이었다.','빛나는 순간만 있었던 건 아니지만 그래도 끝까지 걸어와 졸업장을 손에 쥐었다.','4년이 꿈처럼 지나갔다. 졸업식 날, 처음으로 뭔가를 제대로 해낸 기분이 들었다.']},
  employment: {title:'💼 취업 엔딩',variants:['준비해온 시간은 생각보다 단단했다. 결국 원하는 방향으로 한 걸음을 내디뎠다.','불안과 준비의 시간을 지나 결국 자리를 얻었다.','수많은 이력서와 면접 끝에 합격 문자가 왔다. 이게 끝이 아니라 시작이라는 게 묘하게 설렜다.']},
  graduateSchool: {title:'🔬 대학원 엔딩',variants:['대학은 끝났지만 공부는 끝나지 않았다. 더 오래, 더 깊게 파고들기로 했다.','교수님의 권유는 결국 현실이 되었다. 석사생의 첫날은 생각보다 설레고 무거웠다.']},
  unemployed: {title:'🛋️ 백수 엔딩',variants:['졸업은 했지만 다음 장은 아직 비어 있었다. 그래도 이야기가 끝난 건 아니다.','조금 늦었을 뿐이다. 아직 선택지는 남아 있다. 집에서 보내는 시간이 생각보다 길어졌다.']},
  otaku: {title:'🎮 오타쿠 엔딩',variants:['사회보다 최애를 택했다. 의외로 그 선택은 꽤 오래 당신을 웃게 만들었다.','남들이 보기엔 현실도피였을지 몰라도 당신에겐 분명한 행복이었다.','덕질이 직업이 됐다. 유튜브 구독자가 늘어나는 속도가 취업보다 빨랐다.']},
  marriage: {title:'💒 결혼 엔딩',variants:['수많은 선택 끝에 남은 건 사람 하나였다.','대학생활은 끝났지만 둘의 이야기는 이제부터가 시작이었다. 청첩장은 이미 쪽지에 적혀 있었다.']},
  earlyEmployment: {title:'⚡ 조기취업 엔딩',variants:['누구보다 빠르게 현실로 뛰어들었다.','대학 생활의 끝은 곧바로 사회의 시작이었다. 동기들이 졸업할 때 이미 대리가 돼 있을지도 모른다.']},
  blackCompany: {title:'😰 블랙기업 엔딩',variants:['교수님이 꽂아준 자리는 들어가긴 했는데, 출근 첫 주 만에 모든 걸 깨달았다.','취업은 했지만 행복과는 거리가 있었다. 현실은 늘 설명보다 자세하다.']},
  lottoRich: {title:'🎰 로또 인생역전 엔딩',variants:['이 모든 고생이 숫자 여섯 개 앞에서 갑자기 다른 의미를 띠기 시작했다.','대학생활의 엔딩이 취업도 사랑도 아닌 로또라니, 인생은 종종 서사를 배신한다.']},
  sports_pro: {title:'🏆 프로선수 엔딩',variants:['체대생의 꿈이 현실이 됐다. 드래프트 연락이 왔을 때 믿을 수 없었다.','경기장이 캠퍼스가 된 날, 4년의 모든 훈련이 의미 있게 느껴졌다.']},
  streamer: {title:'📱 크리에이터 엔딩',variants:['구독자 10만 명이 넘었다. 어느 순간 유튜브가 부업이 아닌 본업이 됐다.','콘텐츠 하나로 인생이 바뀌었다. 대학 생활이 전부 콘텐츠 소재가 됐다.']},
  dropout_success: {title:'🚀 자퇴 창업 엔딩',variants:['중퇴가 맞는 선택이었는지는 모른다. 하지만 지금 이 회사가 있다.','스티브 잡스 같은 얘기는 아니었지만, 어쨌든 해냈다는 건 사실이다.']}
};

function checkImmediateEnding(){
  const g=Number(convertGrade(player.stats.gradePoint));
  if(g<=0.3) return 'expelled';
  if(player.state.burnoutCount>=3) return 'burnout';
  return null;
}

function checkFinalEnding(){
  if(player.progress.currentTurn<=player.progress.totalTurns) return null;
  if(player.stats.money>=150) return 'lottoRich';
  if(player.stats.otaku>=95&&player.stats.career<=25&&player.stats.stress<=20) return 'otaku';
  if(player.stats.love>=95&&player.state.hasRing) return 'marriage';
  if(player.state.graduateOffer&&player.stats.gradePoint>=80) return 'graduateSchool';
  if(player.state.blackCompanyRoute) return 'blackCompany';
  // 체대 프로 선수 엔딩
  if(player.profile.collegeKey==='sports'&&player.stats.health>=90&&player.stats.career>=60) return 'sports_pro';
  // 크리에이터 엔딩
  if(player.stats.otaku>=80&&player.stats.relationship>=60&&player.stats.money>=40) return 'streamer';
  if(player.stats.career>=88) return 'earlyEmployment';
  if(player.stats.career>=65) return 'employment';
  if(player.stats.gradePoint>=42) return 'graduate';
  return 'unemployed';
}
