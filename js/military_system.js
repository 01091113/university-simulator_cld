
function militaryTurn(){
  renderEvent(
    "군 복무 중",
    "군대에서 시간이 흐르고 있다. 대학 생활은 잠시 멈췄다.",
    [
      {text:"훈련 받는다", onClick:()=>{applyEffect({health:3,stress:2});finishTurn();}},
      {text:"PX 간다", onClick:()=>{applyEffect({stress:-3,money:-2});finishTurn();}},
      {text:"휴가 기다린다", onClick:()=>{applyEffect({stress:-5});finishTurn();}}
    ]
  );
}
