// ============================================================
// events_housing.js — 주거 유형별 특수 이벤트
// housing: "selfboard"(자취) | "dormitory"(기숙사) | "commute"(통학)
// 모든 이벤트는 popupEvent()로 호출됨
// ============================================================

// ── 자취 이벤트 ──────────────────────────────────────────────
const SELFBOARD_EVENTS = [
  {
    id: "sb_fridge_rotten",
    title: "냉장고에서 정체불명의 냄새가 난다",
    description: "열어보니 3주 전에 산 두부가 형태를 잃었다.\n그 옆에는 언제 샀는지도 모르는 무언가가 있다.\n자취의 낭만은 냉장고를 열었을 때 끝난다.",
    category: "life",
    choices: [
      { text: "전부 버리고 대청소한다", effect: { stress: -4, health: 4, money: -2 } },
      { text: "썩은 것만 골라 버린다", effect: { stress: -1, health: 1 } },
      { text: "냉장고 문을 닫는다(내일의 나에게 맡김)", effect: { stress: 2, health: -2 } }
    ],
    result: {
      "전부 버리고 대청소한다": "두 시간의 대청소 끝에 냉장고가 텅 비었다. 개운하지만 이제 뭘 사야 하는지 막막하다.",
      "썩은 것만 골라 버린다": "최소한의 처리를 했다. 냄새는 약간 줄었다. 근본적인 해결은 아니지만 오늘 하루는 넘긴다.",
      "냉장고 문을 닫는다(내일의 나에게 맡김)": "닫자마자 잊었다. 내일의 나는 오늘의 나를 원망하게 될 것이다."
    }
  },
  {
    id: "sb_fridge_empty",
    title: "냉장고가 텅 비었다",
    description: "문을 열었더니 물 한 병과 케첩만 남아 있다.\n마지막 라면도 어제 먹었다. 자취생의 한계가 왔다.",
    category: "life",
    choices: [
      { text: "마트에 장을 보러 간다", effect: { money: -12, health: 4, stress: -3 } },
      { text: "편의점으로 급하게 간다", effect: { money: -6, health: 1, stress: -1 } },
      { text: "배달을 시킨다", effect: { money: -10, stress: -4 } },
      { text: "부모님한테 전화해서 용돈 요청한다", effect: { money: 8, stress: 3, relationship: -1 } }
    ],
    result: {
      "마트에 장을 보러 간다": "장을 보고 왔다. 냉장고가 가득 찼다. 이 상태가 2주는 갈 것 같다(는 희망).",
      "편의점으로 급하게 간다": "편의점 삼각김밥과 컵라면으로 오늘을 버텼다. 이게 자취의 현실이다.",
      "배달을 시킨다": "배달비 포함 2만 원이 나갔다. 맛은 있었다. 후회는 없다.",
      "부모님한테 전화해서 용돈 요청한다": "전화하자마자 '밥은 먹고 다니냐'는 말을 들었다. 용돈은 받았다."
    }
  },
  {
    id: "sb_laundry",
    title: "이불 빨래를 해야 할 때가 됐다",
    description: "마지막으로 이불을 뺐던 게 언제인지 기억이 안 난다.\n이불에서 나는 냄새를 맡았을 때 결심했다. 오늘이다.",
    category: "life",
    choices: [
      { text: "코인빨래방에 간다", effect: { money: -5, health: 3, stress: -4 } },
      { text: "직접 손빨래한다", effect: { health: 1, stress: 3, money: 0 } },
      { text: "일주일 더 미룬다", effect: { stress: 1, health: -2 } }
    ],
    result: {
      "코인빨래방에 간다": "기다리는 40분 동안 카페인을 마셨다. 깨끗한 이불에 눕는 그 순간이 자취 생활 최고의 순간이다.",
      "직접 손빨래한다": "허리가 아프다. 두 번 다시 안 한다. 다음엔 코인빨래방을 가겠다고 다짐했다.",
      "일주일 더 미룬다": "미뤘다. 아직 버틸 수 있다는 결론을 내렸다. 코가 적응했다."
    }
  },
  {
    id: "sb_clothes_pile",
    title: "옷이 산처럼 쌓였다",
    description: "의자가 제2의 옷장이 된 지 오래다.\n바닥도 점령당했다. 어디서부터 시작해야 할지 모르겠다.",
    category: "life",
    choices: [
      { text: "전부 정리한다", effect: { stress: -5, health: 2 } },
      { text: "필요한 것만 꺼내 쓴다", effect: { stress: -1 } },
      { text: "새 옷을 산다(해결책)", effect: { money: -8, stress: -3 } }
    ],
    result: {
      "전부 정리한다": "세 시간 만에 방이 달라 보인다. 잃어버린 줄 알았던 물건도 두 개나 찾았다.",
      "필요한 것만 꺼내 쓴다": "오늘 입을 것만 꺼냈다. 나머지는 그대로다. 이게 반복되고 있다는 걸 안다.",
      "새 옷을 산다(해결책)": "옷이 더 늘었다. 문제가 해결된 건지 아닌지 모르겠다. 기분은 좋다."
    }
  },
  {
    id: "sb_gas_fee",
    title: "관리비 고지서가 왔다",
    description: "이번 달 관리비가 예상보다 많이 나왔다.\n전기세, 가스비, 수도세. 숫자를 보고 잠깐 멍해졌다.",
    category: "money",
    choices: [
      { text: "그냥 낸다", effect: { money: -8, stress: 2 } },
      { text: "절약 계획을 세운다", effect: { money: -5, stress: 1 } },
      { text: "부모님께 SOS를 친다", effect: { money: 3, stress: 4, relationship: -1 } }
    ],
    result: {
      "그냥 낸다": "낸다. 어쩔 수 없다. 다음 달엔 아껴 써야지라고 매달 다짐한다.",
      "절약 계획을 세운다": "핸드폰 메모에 절약 계획을 적었다. 지킬 수 있을지는 모른다.",
      "부모님께 SOS를 친다": "'자취 그만하고 집에 와라'는 말과 함께 용돈이 왔다."
    }
  },
  {
    id: "sb_midnight_hunger",
    title: "새벽 1시, 갑자기 배가 고프다",
    description: "분명 저녁을 먹었는데 배가 고프다.\n냉장고에는 아무것도 없다. 편의점은 5분 거리다.",
    category: "life",
    choices: [
      { text: "편의점에 간다", effect: { money: -4, health: -1, stress: -3 } },
      { text: "참고 잔다", effect: { stress: 2, health: 1 } },
      { text: "라면을 끓인다(마지막 라면)", effect: { money: -1, health: -2, stress: -4 } }
    ],
    result: {
      "편의점에 간다": "야식을 사왔다. 혼자 먹는 새벽 편의점 음식엔 이상한 자유가 있다.",
      "참고 잔다": "배고픔을 무시하고 잠들었다. 꿈에서 밥을 먹었다. 일어나니 더 배고프다.",
      "라면을 끓인다(마지막 라면)": "마지막 라면을 썼다. 내일 사야지. 그 라면은 세상에서 제일 맛있었다."
    }
  },
  {
    id: "sb_cockroach",
    title: "벌레가 나왔다",
    description: "자려고 불을 끄는 순간, 뭔가가 움직였다.\n자취생이라면 한 번쯤 겪는 공포의 순간이 왔다.",
    category: "life",
    choices: [
      { text: "직접 잡는다", effect: { stress: 5, health: 2 } },
      { text: "살충제를 뿌리고 도망간다", effect: { money: -2, stress: 3 } },
      { text: "그 방에서 자지 않는다", effect: { stress: 8, health: -1, relationship: 2 } }
    ],
    result: {
      "직접 잡는다": "잡았다. 무섭지 않다는 걸 증명했다. 하지만 손이 아직도 떨린다.",
      "살충제를 뿌리고 도망간다": "살충제를 한 캔 다 썼다. 냄새가 심하다. 효과는 있을 것이다.",
      "그 방에서 자지 않는다": "친구 집에서 잤다. 아침에 돌아오니 흔적이 없었다. 어디 간 건지 모른다."
    }
  },
  {
    id: "sb_delivery_wrong",
    title: "배달이 잘못 왔다",
    description: "분명 치킨을 시켰는데 피자가 왔다.\n다시 전화해보니 이미 연결이 안 된다.",
    category: "life",
    choices: [
      { text: "그냥 먹는다", effect: { stress: -2, health: 1 } },
      { text: "리뷰에 상황을 남긴다", effect: { stress: -1, relationship: 1 } },
      { text: "환불 요청을 한다", effect: { money: 5, stress: 4 } }
    ],
    result: {
      "그냥 먹는다": "피자도 맛있었다. 이게 된다면 치킨은 다음에 시키면 된다.",
      "리뷰에 상황을 남긴다": "별점 2점짜리 리뷰를 남겼다. 속이 조금 풀렸다.",
      "환불 요청을 한다": "30분 통화 끝에 부분 환불을 받았다. 그 시간이 아까웠다."
    }
  }
];

// ── 기숙사 이벤트 ──────────────────────────────────────────
const DORMITORY_EVENTS = [
  {
    id: "dorm_roommate",
    title: "룸메이트랑 생활 패턴이 충돌한다",
    description: "나는 새벽에 자는데 룸메이트는 아침 6시에 일어난다.\n조용히 살고 싶었는데 현실은 그렇지 않다.",
    category: "relationship",
    choices: [
      { text: "솔직하게 대화한다", effect: { relationship: 5, stress: 2 } },
      { text: "그냥 참는다", effect: { stress: 5, relationship: 0 } },
      { text: "방 이동 신청을 한다", effect: { stress: 3, money: -2 } }
    ],
    result: {
      "솔직하게 대화한다": "서로 맞춰보기로 했다. 어색했지만 생각보다 잘 됐다. 관계가 오히려 나아졌다.",
      "그냥 참는다": "참는다. 스트레스가 쌓인다. 언제까지 버틸 수 있을지 모른다.",
      "방 이동 신청을 한다": "신청을 냈다. 처리되기까지 2주가 걸린다고 한다. 그때까지 버텨야 한다."
    }
  },
  {
    id: "dorm_curfew",
    title: "기숙사 귀가 시간을 넘겼다",
    description: "친구 집에서 놀다가 시간을 놓쳤다.\n기숙사 문이 잠겨 있다. 경비실 눈치가 보인다.",
    category: "life",
    choices: [
      { text: "경비원에게 솔직하게 말한다", effect: { stress: 3, relationship: -1 } },
      { text: "몰래 들어갈 방법을 찾는다", effect: { stress: 6, health: -1 } },
      { text: "편의점에서 밤을 샌다", effect: { stress: 4, health: -2, money: -3 } }
    ],
    result: {
      "경비원에게 솔직하게 말한다": "경위서를 썼다. 창피했지만 들어갈 수 있었다. 다음엔 조심해야 한다.",
      "몰래 들어갈 방법을 찾는다": "룸메이트가 문을 열어줬다. 빚진 기분이다.",
      "편의점에서 밤을 샌다": "밤새 편의점에 있었다. 아침이 되자 바로 들어갔다. 몸이 찌뿌둥하다."
    }
  },
  {
    id: "dorm_shower",
    title: "샤워실 줄이 너무 길다",
    description: "시험 기간엔 다들 비슷한 시간에 씻으러 온다.\n30분을 기다렸는데 또 앞에 사람이 있다.",
    category: "life",
    choices: [
      { text: "계속 기다린다", effect: { stress: 4, health: 2 } },
      { text: "새벽에 다시 온다", effect: { stress: 1, health: 2, gradePoint: -1 } },
      { text: "그냥 안 씻는다(오늘만)", effect: { stress: -3, health: -1 } }
    ],
    result: {
      "계속 기다린다": "40분을 기다렸다. 씻고 나니 기분이 좋아졌다. 기다린 보람이 있다.",
      "새벽에 다시 온다": "새벽 2시에 씻었다. 줄이 없었다. 이 전략을 앞으로도 쓸 것 같다.",
      "그냥 안 씻는다(오늘만)": "오늘은 그냥 잔다. 내일 씻는다. 룸메이트가 창문을 열었다."
    }
  },
  {
    id: "dorm_noise",
    title: "옆 방이 너무 시끄럽다",
    description: "시험 기간인데 옆 방에서 노래방 수준의 소리가 난다.\n벽이 얇다. 참아야 할지 말해야 할지.",
    category: "relationship",
    choices: [
      { text: "직접 가서 말한다", effect: { relationship: 3, stress: 2 } },
      { text: "기숙사 사감에게 신고한다", effect: { relationship: -3, stress: -2 } },
      { text: "이어폰으로 막는다", effect: { stress: 2, gradePoint: -1 } }
    ],
    result: {
      "직접 가서 말한다": "미안하다고 했다. 조용해졌다. 다음날 인사를 먼저 해줬다.",
      "기숙사 사감에게 신고한다": "사감이 경고를 줬다. 조용해졌지만 마주칠 때마다 어색하다.",
      "이어폰으로 막는다": "노이즈 캔슬링 이어폰의 위력을 믿었다. 어느 정도 됐다."
    }
  },
  {
    id: "dorm_food_stolen",
    title: "냉장고에 넣어둔 음식이 사라졌다",
    description: "공용 냉장고에 넣어둔 내 음식이 없어졌다.\n이름을 적어뒀는데도 없다. 기숙사의 어두운 현실이다.",
    category: "relationship",
    choices: [
      { text: "공지에 글을 올린다", effect: { relationship: -2, stress: 3 } },
      { text: "그냥 포기한다", effect: { stress: 2, money: -3 } },
      { text: "CCTV 확인을 요청한다", effect: { stress: 4, relationship: -3 } }
    ],
    result: {
      "공지에 글을 올린다": "글을 올렸다. 범인은 나타나지 않았다. 대신 다들 조심하게 됐다.",
      "그냥 포기한다": "포기했다. 다음부터는 방 냉장고를 쓰기로 했다.",
      "CCTV 확인을 요청한다": "사감이 확인해줬다. 범인을 찾았다. 어색함이 생겼다."
    }
  },
  {
    id: "dorm_fire_drill",
    title: "새벽 3시에 화재 대피 훈련이 있다",
    description: "다들 잠들었을 시간에 알람이 울렸다.\n훈련이지만 실제처럼 해야 한다고 한다. 눈이 반쯤 감겼다.",
    category: "life",
    choices: [
      { text: "성실하게 참여한다", effect: { relationship: 2, stress: 3 } },
      { text: "졸면서 나간다", effect: { stress: 1 } },
      { text: "모른 척 잔다", effect: { stress: -2, relationship: -2 } }
    ],
    result: {
      "성실하게 참여한다": "완전히 깼다. 훈련이 끝나고 다시 자려니 1시간이 걸렸다.",
      "졸면서 나간다": "반쯤 걷다가 끝났다. 대충 했지만 아무도 신경 쓰지 않았다.",
      "모른 척 잔다": "자다가 사감이 문을 두드렸다. 경위서를 썼다."
    }
  }
];

// ── 통학 이벤트 ────────────────────────────────────────────
const COMMUTE_EVENTS = [
  {
    id: "comm_rush",
    title: "지하철이 미어터진다",
    description: "출근 시간대 지하철. 몸이 끼어들어간다기보다 밀려 들어간다.\n책을 펼 공간도 없고 폰을 볼 공간도 없다.",
    category: "life",
    choices: [
      { text: "그냥 참고 간다", effect: { stress: 4, health: -1 } },
      { text: "한 칸 기다려서 탄다", effect: { stress: 2, gradePoint: -1 } },
      { text: "버스로 바꾼다", effect: { stress: 3, money: -1 } }
    ],
    result: {
      "그냥 참고 간다": "도착했다. 몸이 찌그러진 느낌이다. 앞으로 30분을 어떻게 버텼는지 기억이 없다.",
      "한 칸 기다려서 탄다": "다음 칸을 탔다. 그나마 숨은 쉬었다. 수업엔 5분 늦었다.",
      "버스로 바꾼다": "버스는 지하철보다 덜 막혔다. 앉지는 못했지만 덜 힘들었다."
    }
  },
  {
    id: "comm_late",
    title: "첫차를 놓쳤다",
    description: "알람이 울렸는데 눈이 안 떠졌다.\n다음 차를 타면 수업 시작 20분 후에 도착한다.",
    category: "life",
    choices: [
      { text: "택시를 탄다", effect: { money: -12, gradePoint: 2, stress: 3 } },
      { text: "늦게 들어가는 척 자연스럽게 간다", effect: { gradePoint: -1, stress: 2 } },
      { text: "결석 처리하고 집에 있는다", effect: { gradePoint: -4, stress: -5, health: 3 } }
    ],
    result: {
      "택시를 탄다": "택시비가 아까웠다. 하지만 지각은 면했다. 교수님이 봤는지는 모르겠다.",
      "늦게 들어가는 척 자연스럽게 간다": "들어갔다. 교수님이 힐끗 봤다. 모른 척했다.",
      "결석 처리하고 집에 있는다": "잤다. 진짜 잘 잤다. 후회는 오후에 온다."
    }
  },
  {
    id: "comm_parents",
    title: "부모님이 공부 얘기를 꺼냈다",
    description: "밥 먹다가 갑자기 '요즘 공부는 잘 돼?'라는 말이 나왔다.\n이 질문은 꼭 밥 먹을 때 나온다.",
    category: "relationship",
    choices: [
      { text: "솔직하게 말한다", effect: { relationship: 4, stress: 3 } },
      { text: "잘 된다고 말한다", effect: { relationship: 1, stress: 2 } },
      { text: "화제를 돌린다", effect: { relationship: -1, stress: -1 } }
    ],
    result: {
      "솔직하게 말한다": "생각보다 부모님이 많이 들어줬다. 조금 가벼워진 느낌이다.",
      "잘 된다고 말한다": "거짓말이 쌓인다. 나중에 성적표가 나오면 어떻게 할지 모르겠다.",
      "화제를 돌린다": "자연스럽게 넘어갔다. 오늘 하루 넘긴 것이다."
    }
  },
  {
    id: "comm_curfew",
    title: "집에 귀가 시간이 있다",
    description: "대학생인데 아직도 귀가 시간이 있다.\n오늘 친구들 모임이 늦게 끝날 것 같다.",
    category: "relationship",
    choices: [
      { text: "일찍 나온다", effect: { relationship: -3, stress: 3 } },
      { text: "부모님께 연락하고 늦게 간다", effect: { relationship: 2, stress: 2 } },
      { text: "몰래 늦게 들어간다", effect: { relationship: -4, stress: 5 } }
    ],
    result: {
      "일찍 나온다": "먼저 나왔다. 친구들이 아쉬워했다. 집에 오니 10시였다.",
      "부모님께 연락하고 늦게 간다": "이해해줬다. 12시까지 허락받았다. 자취가 하고 싶어졌다.",
      "몰래 늦게 들어간다": "들켰다. 다음 주 귀가 시간이 한 시간 당겨졌다."
    }
  },
  {
    id: "comm_commute_time",
    title: "통학 시간이 너무 아깝다",
    description: "편도 1시간 반. 하루 3시간을 지하철에서 보낸다.\n이 시간을 어떻게 쓰느냐가 갑자기 중요하게 느껴졌다.",
    category: "life",
    choices: [
      { text: "공부한다", effect: { gradePoint: 4, stress: 2 } },
      { text: "자거나 음악을 듣는다", effect: { stress: -4, health: 2 } },
      { text: "웹소설을 읽는다", effect: { otaku: 3, stress: -3 } }
    ],
    result: {
      "공부한다": "흔들리는 지하철에서 공부했다. 집중이 잘 됐다. 이게 꽤 효율적이다.",
      "자거나 음악을 듣는다": "학교에 도착하니 컨디션이 좋다. 이게 맞는 방법이었다.",
      "웹소설을 읽는다": "환승역을 지나쳤다. 10분 늦었다. 그래도 재밌었다."
    }
  },
  {
    id: "comm_friend_question",
    title: "친구가 자취 안 하냐고 물었다",
    description: "통학이라고 하니 '집이 가까워서 좋겠다'고 한다.\n사실 좋기도 하고 불편하기도 하다.",
    category: "relationship",
    choices: [
      { text: "통학의 장점을 어필한다", effect: { relationship: 2, stress: -1 } },
      { text: "솔직하게 불편함을 말한다", effect: { relationship: 3, stress: -2 } },
      { text: "자취하고 싶다고 한다", effect: { relationship: 2, stress: 3, money: -1 } }
    ],
    result: {
      "통학의 장점을 어필한다": "밥이 나오고 돈이 안 든다고 했다. 친구가 부럽다고 했다.",
      "솔직하게 불편함을 말한다": "공감해줬다. 서로의 상황을 이해하게 됐다.",
      "자취하고 싶다고 한다": "자취 얘기를 한 시간 했다. 현실적으로는 아직 멀었다."
    }
  }
];

// ── 주거 공통 이벤트 (모든 유형) ────────────────────────────
const HOUSING_COMMON_EVENTS = [
  {
    id: "hc_sick_alone",
    title: "아파서 혼자 누워 있다",
    description: "열이 38도다. 병원은 가야 할 것 같은데 몸이 안 움직인다.\n자취/기숙사/통학 가릴 것 없이 아픈 건 혼자다.",
    category: "life",
    choices: [
      { text: "억지로 병원을 간다", effect: { health: 6, money: -8, stress: -2 } },
      { text: "약국에서 약만 산다", effect: { health: 3, money: -3, stress: 1 } },
      { text: "그냥 자고 나으려 한다", effect: { health: -2, stress: -3 } }
    ],
    result: {
      "억지로 병원을 간다": "주사 한 대 맞고 약 봉지를 들고 왔다. 이틀 후엔 나았다. 역시 병원이다.",
      "약국에서 약만 산다": "약이 조금 들었다. 3일쯤 지나니 좋아졌다.",
      "그냥 자고 나으려 한다": "이틀을 꼬박 잤다. 나았는지 더 심해진 건지 모르겠다."
    }
  }
];

// ── 특수 이벤트 루트 ─────────────────────────────────────────
// 조건: player.state.specialFlags 로 트리거 관리

const SPECIAL_ROUTE_EVENTS = {
  // 학점 회복 루트
  grade_comeback: [
    {
      id: "sp_grade_1",
      title: "학사경고 직전, 교수님이 불렀다",
      description: "성적이 낮다는 걸 교수님도 알고 있었다.\n'지금이라도 제출하면 반영해줄 수 있다'고 했다.",
      choices: [
        { text: "감사합니다, 지금 바로 합니다", effect: { gradePoint: 8, stress: 6, relationship: 3 } },
        { text: "고민한다", effect: { gradePoint: 3, stress: 2 } },
        { text: "이미 늦은 것 같아서 포기한다", effect: { gradePoint: -2, stress: -2 } }
      ],
      result: {
        "감사합니다, 지금 바로 합니다": "밤새 과제를 완성했다. 교수님이 인상이 좋아졌다. 학점이 살아났다.",
        "고민한다": "고민하다가 제출했다. 완벽하진 않았지만 반영됐다.",
        "이미 늦은 것 같아서 포기한다": "포기했다. 다음 학기에 보충하면 된다고 생각했다."
      }
    },
    {
      id: "sp_grade_2",
      title: "반전의 중간고사",
      description: "이번 시험만큼은 제대로 준비했다.\n모든 걸 쏟아부었다. 결과는 시험지가 말해줄 것이다.",
      choices: [
        { text: "최선을 다해 시험을 본다", effect: { gradePoint: "RANDOM_LARGE", stress: 5 } },
        { text: "아는 것만 확실히 쓴다", effect: { gradePoint: 6, stress: 3 } },
        { text: "백지로 낸다", effect: { gradePoint: -8, stress: -5 } }
      ],
      result: {
        "최선을 다해 시험을 본다": "결과가 나왔다. 이번엔 달랐다. 공부한 게 의미 있었다.",
        "아는 것만 확실히 쓴다": "확실한 것만 적었다. 점수는 높지 않지만 안정적이었다.",
        "백지로 낸다": "냈다. 아무것도 없는 시험지를 냈다. 교수님이 찾아올 것 같다."
      }
    }
  ],
  // 갑작스러운 부업 루트
  side_hustle: [
    {
      id: "sp_hustle_1",
      title: "SNS 팔로워가 갑자기 늘었다",
      description: "올린 게시물 하나가 터졌다.\n팔로워가 하루에 1000명씩 늘고 있다.",
      choices: [
        { text: "콘텐츠 제작을 늘린다", effect: { otaku: 5, career: 4, stress: 5, money: 3 } },
        { text: "일단 지켜본다", effect: { otaku: 2, career: 2 } },
        { text: "부담스러워서 비공개로 전환한다", effect: { stress: -3 } }
      ],
      result: {
        "콘텐츠 제작을 늘린다": "구독자가 계속 늘었다. 협찬 문의가 처음으로 왔다. 이게 진짜 된다면?",
        "일단 지켜본다": "자연스럽게 성장 중이다. 아직 수익화 단계는 아니다.",
        "부담스러워서 비공개로 전환한다": "조용해졌다. 편하다. 기회를 날린 건지도 모른다."
      }
    },
    {
      id: "sp_hustle_2",
      title: "협찬 제안이 왔다",
      description: "처음 받아보는 협찬 메시지다.\n금액은 작지만 진짜 제안이다.",
      choices: [
        { text: "수락한다", effect: { money: 15, career: 6, stress: 4 } },
        { text: "조건을 협상한다", effect: { money: 10, career: 4, stress: 3 } },
        { text: "거절한다", effect: { stress: -1 } }
      ],
      result: {
        "수락한다": "처음으로 콘텐츠로 돈을 벌었다. 금액이 작아도 의미가 달랐다.",
        "조건을 협상한다": "조건을 올려서 계약했다. 이게 비즈니스구나 싶었다.",
        "거절한다": "아직은 때가 아닌 것 같았다. 더 키우고 나서 하기로 했다."
      }
    }
  ],
  // 연인 위기 루트
  love_crisis: [
    {
      id: "sp_love_crisis_1",
      title: "연인이 갑자기 거리를 두기 시작했다",
      description: "답장이 점점 늦어지고 만남도 줄었다.\n뭔가 달라진 것 같은데 물어보기가 무섭다.",
      choices: [
        { text: "직접 물어본다", effect: { love: 5, stress: 5 } },
        { text: "기다려본다", effect: { love: -3, stress: 6 } },
        { text: "나도 거리를 둔다", effect: { love: -6, stress: -2 } }
      ],
      result: {
        "직접 물어본다": "얘기를 나눴다. 서로 힘들었던 것들을 말했다. 오히려 가까워졌다.",
        "기다려본다": "일주일을 기다렸다. 상대방도 뭔가 기다리고 있었다.",
        "나도 거리를 둔다": "둘 다 거리를 두고 있다. 이 관계가 어디로 가는지 모르겠다."
      }
    },
    {
      id: "sp_love_crisis_2",
      title: "이별 얘기가 나왔다",
      description: "그 말이 갑자기 나올 줄은 몰랐다.\n예상은 했지만 막상 들으니 다르다.",
      choices: [
        { text: "받아들인다", effect: { love: -20, stress: 8, relationship: 2 } },
        { text: "다시 생각해달라고 한다", effect: { love: -8, stress: 10 } },
        { text: "감정적으로 반응한다", effect: { love: -25, stress: 12, relationship: -4 } }
      ],
      result: {
        "받아들인다": "끝났다. 슬프지만 담담하게 마무리했다. 어른이 된 것 같았다.",
        "다시 생각해달라고 한다": "보류가 됐다. 시간이 필요하다고 했다. 답은 아직 없다.",
        "감정적으로 반응한다": "후회할 말을 했다. 끝나는 방식이 좋지 않았다."
      }
    }
  ],
  // 취업 패닉 루트
  job_panic: [
    {
      id: "sp_job_1",
      title: "친한 친구가 대기업에 합격했다",
      description: "진심으로 축하한다. 그리고 동시에 무너지는 게 있다.\n이 감정이 뭔지 정확히 알지만 인정하기 싫다.",
      choices: [
        { text: "진심으로 축하하고 자극을 받는다", effect: { career: 6, stress: 5, relationship: 4 } },
        { text: "축하는 하지만 혼자 마음을 추스른다", effect: { career: 3, stress: 3, relationship: 3 } },
        { text: "연락을 잠시 멀리한다", effect: { career: 1, stress: -2, relationship: -3 } }
      ],
      result: {
        "진심으로 축하하고 자극을 받는다": "친구의 합격이 나를 움직이게 했다. 이런 자극이 필요했다.",
        "축하는 하지만 혼자 마음을 추스른다": "감정을 정리했다. 내 페이스대로 가면 된다.",
        "연락을 잠시 멀리한다": "멀어지는 것 같아서 불안하다. 하지만 지금은 혼자가 필요하다."
      }
    },
    {
      id: "sp_job_2",
      title: "면접에서 탈락했다",
      description: "불합격 문자가 왔다. 준비를 많이 했는데.\n지금 어떤 감정인지 정확하게 말하기 어렵다.",
      choices: [
        { text: "원인을 분석하고 다시 준비한다", effect: { career: 7, stress: 5 } },
        { text: "잠깐 쉬고 다음을 준비한다", effect: { career: 4, stress: -3 } },
        { text: "며칠 아무것도 안 한다", effect: { stress: -5, career: -1 } }
      ],
      result: {
        "원인을 분석하고 다시 준비한다": "복기를 했다. 뭐가 부족했는지 보였다. 다음엔 다를 것 같다.",
        "잠깐 쉬고 다음을 준비한다": "이틀 쉬고 다시 시작했다. 컨디션이 돌아왔다.",
        "며칠 아무것도 안 한다": "나흘 동안 아무것도 안 했다. 충분히 쉬었다. 이제 해야 한다."
      }
    }
  ]
};

// ── 주거 유형별 이벤트 풀 선택 함수 ──────────────────────────
function getHousingEventPool(){
  const h = player.profile.housing;
  if(h === 'selfboard')  return SELFBOARD_EVENTS;
  if(h === 'dormitory')  return DORMITORY_EVENTS;
  if(h === 'commute')    return COMMUTE_EVENTS;
  return HOUSING_COMMON_EVENTS;
}

// ── 주거 이벤트 트리거 (30% 확률, rest 선택 시 추가 20%) ────
function maybeHousingEvent(){
  const pool = getHousingEventPool();
  if(!pool || pool.length === 0) return false;
  // 아직 안 본 이벤트 우선
  const unseen = pool.filter(e => !player.state.housingEventDone[e.id]);
  const target = unseen.length > 0 ? sample(unseen) : sample(pool);
  player.state.housingEventDone[target.id] = true;
  popupEvent(target, 'housing');
  return true;
}

// ── 특수 루트 이벤트 트리거 ────────────────────────────────
function maybeSpecialRouteEvent(){
  const flags = player.state.specialFlags;
  // 학점 회복 루트: 학점이 20 이하이고 아직 시작 안 함
  if(player.stats.gradePoint <= 20 && !flags.grade_comeback_started && chance(0.6)){
    flags.grade_comeback_started = true;
    flags.grade_comeback_step = 0;
    return triggerSpecialRoute('grade_comeback');
  }
  // 부업 루트: otaku 50 이상 + relationship 60 이상
  if(player.stats.otaku >= 50 && player.stats.relationship >= 60 && !flags.side_hustle_started && chance(0.3)){
    flags.side_hustle_started = true;
    flags.side_hustle_step = 0;
    return triggerSpecialRoute('side_hustle');
  }
  // 연인 위기 루트: 연애 중이고 스트레스 75 이상
  if(player.state.dating && player.stats.stress >= 75 && !flags.love_crisis_started && chance(0.5)){
    flags.love_crisis_started = true;
    flags.love_crisis_step = 0;
    return triggerSpecialRoute('love_crisis');
  }
  // 취업 패닉 루트: 4학년 + career 40 이하
  if(player.progress.currentGrade === 4 && player.stats.career <= 40 && !flags.job_panic_started && chance(0.55)){
    flags.job_panic_started = true;
    flags.job_panic_step = 0;
    return triggerSpecialRoute('job_panic');
  }
  return false;
}

function triggerSpecialRoute(routeKey){
  const events = SPECIAL_ROUTE_EVENTS[routeKey];
  if(!events || events.length === 0) return false;
  const stepKey = routeKey + '_step';
  const step = player.state.specialFlags[stepKey] || 0;
  if(step >= events.length) return false;
  player.state.specialFlags[stepKey] = step + 1;
  const ev = events[step];
  // result 텍스트 처리: choices onClick에 결과 로그 추가
  const enrichedEv = {
    ...ev,
    choices: ev.choices.map(ch => ({
      ...ch,
      resultText: ev.result ? ev.result[ch.text] : null
    }))
  };
  popupEvent(enrichedEv, 'special');
  return true;
}
