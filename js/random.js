function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function chance(p){return Math.random()<p}
function randomRange(v){
  if(v==='RANDOM_SMALL') return rand(-3,3);
  if(v==='RANDOM_MEDIUM') return rand(-6,6);
  if(v==='RANDOM_LARGE') return rand(-10,10);
  return v;
}
