
const EXPANSION_EVENTS = [
{
  id:"lotto",
  title:"복권에 당첨됐다",
  description:"소소한 당첨이지만 기분이 좋다.",
  choices:[
    {text:"저축한다",effect:{money:20}},
    {text:"놀러 간다",effect:{money:-10,stress:-5}},
    {text:"투자한다",effect:{money:'RANDOM_LARGE'}}
  ]
}
];
