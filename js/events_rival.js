const RIVAL_EVENTS = [
{
  id:"rv1",
  title:"라이벌을 만났다",
  description:`${player.state.rivalName}라는 사람이 나타났다. 왠지 계속 엮일 것 같다.`,
  choices:[
    {text:"인사한다",effect:{relationship:2}},
    {text:"무시한다",effect:{stress:1}},
    {text:"경쟁심을 느낀다",effect:{career:2}}
  ]
},
{
  id:"rv2",
  title:"시험 성적 경쟁",
  description:"라이벌과 성적을 비교하게 됐다.",
  choices:[
    {text:"더 열심히 공부한다",effect:{gradePoint:5,stress:2}},
    {text:"신경 안 쓴다",effect:{stress:-2}},
    {text:"정보를 얻는다",effect:{relationship:2}}
  ]
},
{
  id:"rv3",
  title:"같은 팀 프로젝트",
  description:"라이벌과 같은 팀이 됐다.",
  choices:[
    {text:"협력한다",effect:{relationship:3,career:3}},
    {text:"혼자 한다",effect:{career:4,stress:3}},
    {text:"라이벌에게 맡긴다",effect:{stress:-2}}
  ]
},
{
  id:"rv4",
  title:"술자리에서 속 이야기",
  description:"술을 마시다가 서로 속 이야기를 했다.",
  choices:[
    {text:"친해진다",effect:{relationship:5,love:2}},
    {text:"경쟁 이야기 한다",effect:{career:3}},
    {text:"먼저 간다",effect:{stress:-2}}
  ]
},
{
  id:"rv5",
  title:"라이벌이 고백했다",
  description:"예상 못 한 상황이다.",
  choices:[
    {text:"받아들인다",effect:{love:8}},
    {text:"거절한다",effect:{stress:3}},
    {text:"생각해본다",effect:{love:3}}
  ]
}
];
