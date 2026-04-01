function militaryTurn(){
  return popupEvent({
    title:"군 복무 중",
    description:"시간이 흐르고 있다. 대학 생활은 잠시 멈췄다.",
    choices:[
      {text:"훈련 받는다",effect:{health:3,stress:2}},
      {text:"PX 간다",effect:{stress:-3,money:-2}},
      {text:"휴가 기다린다",effect:{stress:-5}}
    ]
  },'military');
}
