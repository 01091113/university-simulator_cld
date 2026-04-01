
const RIVAL_EVENTS = [
{
  id:"rival_1",
  title:"라이벌을 만났다",
  description:`${player.state.rivalName}와 도서관에서 마주쳤다.`,
  choices:[
    {text:"인사한다",effect:{relationship:3,love:2}},
    {text:"무시한다",effect:{stress:2}},
    {text:"공부로 승부한다",effect:{gradePoint:4,stress:3}}
  ]
},
{
  id:"rival_2",
  title:"시험 성적 경쟁",
  description:"성적 게시판에서 라이벌과 점수를 비교했다.",
  choices:[
    {text:"더 공부한다",effect:{gradePoint:5,stress:3}},
    {text:"밥 사달라고 한다",effect:{relationship:4,love:2}},
    {text:"아무 말 안 한다",effect:{stress:-1}}
  ]
}
];
