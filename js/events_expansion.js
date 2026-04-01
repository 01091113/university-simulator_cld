
LOVE_EVENTS.push(
  {id:'love_cafe_date',title:'카페 데이트를 했다',description:'조용한 카페에서 오래 이야기했다.
시간이 생각보다 빨리 지나갔다.',choices:[
    {text:'다음 데이트를 약속한다',effect:{love:6,stress:-3}},
    {text:'집에 바래다준다',effect:{love:4,relationship:2}},
    {text:'각자 집에 간다',effect:{love:2}}
  ]},
  {id:'love_movie',title:'영화를 같이 봤다',description:'영화보다 옆자리에 앉은 사람이 더 신경 쓰였다.',choices:[
    {text:'팝콘을 같이 먹는다',effect:{love:4,stress:-2}},
    {text:'영화 끝나고 밥 먹는다',effect:{love:5,money:-4}},
    {text:'그냥 헤어진다',effect:{love:1}}
  ]},
  {id:'love_trip',title:'당일치기 여행을 갔다',description:'멀리 가진 않았지만 이상하게 오래 기억에 남을 하루였다.',choices:[
    {text:'사진을 많이 찍는다',effect:{love:6,stress:-4}},
    {text:'맛집을 찾아다닌다',effect:{love:5,money:-6}},
    {text:'막차 직전까지 논다',effect:{love:7,health:-2,stress:-2}}
  ]},
  {id:'love_future',title:'미래 이야기를 했다',description:'졸업 이후 얘기를 하다가 잠깐 조용해졌다.',choices:[
    {text:'같이 미래를 상상해본다',effect:{love:7,stress:2}},
    {text:'농담으로 넘긴다',effect:{love:2}},
    {text:'이야기를 피한다',effect:{love:-3,stress:3}}
  ]},
  {id:'love_fight',title:'사소한 걸로 싸웠다',description:'별거 아닌 말이었는데 분위기가 틀어졌다.',choices:[
    {text:'먼저 사과한다',effect:{love:3,stress:-2}},
    {text:'대화로 푼다',effect:{love:5,relationship:3}},
    {text:'시간이 지나길 기다린다',effect:{love:-3,stress:4}}
  ]}
);

OTAKU_EVENTS.push(
  {id:'otaku_allnight',title:'밤새 정주행했다',description:'한 화만 볼 생각이었는데 아침이 됐다.',choices:[
    {text:'끝까지 본다',effect:{otaku:5,health:-4,stress:-3}},
    {text:'중간에 잔다',effect:{health:2}},
    {text:'다음에 보기로 한다',effect:{stress:1}}
  ]},
  {id:'otaku_convention',title:'행사장에 갔다',description:'같은 취향의 사람들이 이렇게 많다는 사실이 조금 감동적이다.',choices:[
    {text:'굿즈를 산다',effect:{otaku:8,money:-10}},
    {text:'구경만 한다',effect:{otaku:4,stress:-3}},
    {text:'사진을 왕창 찍는다',effect:{otaku:6,relationship:3}}
  ]},
  {id:'otaku_stream',title:'덕질 방송을 켰다',description:'처음인데도 이상하게 할 말이 계속 나왔다.',choices:[
    {text:'꾸준히 해본다',effect:{otaku:5,career:3}},
    {text:'취미로만 한다',effect:{otaku:3,stress:-2}},
    {text:'바로 끈다',effect:{stress:-1}}
  ]},
  {id:'otaku_goods_trade',title:'최애 굿즈 교환 성사',description:'정말 원하던 굿즈를 드디어 손에 넣을 기회가 왔다.',choices:[
    {text:'교환한다',effect:{otaku:7,stress:-2}},
    {text:'돈 주고 산다',effect:{otaku:6,money:-7}},
    {text:'참는다',effect:{money:2,stress:2}}
  ]},
  {id:'otaku_merch_resell',title:'굿즈를 되팔아 돈을 벌었다',description:'취미가 생활비에 조금 도움이 됐다.',choices:[
    {text:'계속 해본다',effect:{money:12,otaku:3,stress:2}},
    {text:'한 번으로 만족한다',effect:{money:5}},
    {text:'소장한다',effect:{otaku:5}}
  ]},
  {id:'otaku_collab',title:'같이 덕질할 사람이 생겼다',description:'혼자 좋아할 때와 둘이 좋아할 때의 재미는 다르다.',choices:[
    {text:'오프라인 성지순례를 간다',effect:{otaku:6,relationship:4,money:-4}},
    {text:'온라인만 같이 판다',effect:{otaku:4,relationship:2}},
    {text:'혼덕이 편하다고 한다',effect:{stress:-1}}
  ]}
);
