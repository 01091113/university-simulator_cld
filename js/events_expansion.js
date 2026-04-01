const EXPANSION_EVENTS = [
{
  id:"lotto",
  title:"복권을 샀다",
  description:"왠지 오늘은 느낌이 좋다.",
  choices:[
    {text:"긁는다",effect:{money:20}},
    {text:"버린다",effect:{stress:-1}},
    {text:"다음에 긁는다",effect:{stress:0}}
  ]
},
{
  id:"invest",
  title:"투자 기회",
  description:"친구가 투자하자고 한다.",
  choices:[
    {text:"투자한다",effect:{money:15,stress:2}},
    {text:"안 한다",effect:{stress:-1}},
    {text:"조금만 한다",effect:{money:5}}
  ]
}
];
