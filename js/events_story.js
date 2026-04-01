
const STORY_EVENTS = [
{
  id:"story_parttime",
  title:"알바에서 기회가 왔다",
  description:"사장님이 정직원 제안을 했다.",
  choices:[
    {text:"계속 일한다",effect:{money:15,career:5,stress:5}},
    {text:"학교에 집중한다",effect:{gradePoint:4}},
    {text:"그만둔다",effect:{stress:-3}}
  ]
},

{
  id:"story1",
  title:"동아리 제안",
  description:"동아리에서 같이 활동하자고 한다.",
  choices:[
    {text:"가입한다",effect:{relationship:5,stress:-2}},
    {text:"거절한다",effect:{stress:1}},
    {text:"나중에 생각한다",effect:{stress:0}}
  ]
},
{
  id:"story2",
  title:"여행 제안",
  description:"친구들이 여행 가자고 한다.",
  choices:[
    {text:"간다",effect:{stress:-5,money:-5}},
    {text:"안 간다",effect:{gradePoint:3}},
    {text:"당일치기만 간다",effect:{stress:-3,money:-2}}
  ]
}
];
