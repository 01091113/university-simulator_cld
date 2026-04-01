const OTAKU_EVENTS = [
  {
    "id": "otaku_1",
    "title": "최애 컴백",
    "description": "알림 하나로 하루 컨디션이 바뀌었다.\n오늘은 진짜 살아볼 만할지도 모르겠다는 근거 없는 확신이 생긴다.",
    "choices": [
      {
        "text": "끝까지 달린다",
        "effect": {
          "otaku": 10,
          "stress": -8,
          "money": -2
        }
      },
      {
        "text": "적당히 즐긴다",
        "effect": {
          "otaku": 5,
          "stress": -4
        }
      },
      {
        "text": "오늘은 참는다",
        "effect": {
          "gradePoint": 1,
          "stress": 2
        }
      }
    ]
  },
  {
    "id": "otaku_2",
    "title": "굿즈 공지가 떴다",
    "description": "지갑이 위험하다는 걸 아는데도 손이 먼저 움직인다.\n행복과 파산은 생각보다 가까운 관계일 수 있다.",
    "choices": [
      {
        "text": "바로 산다",
        "effect": {
          "otaku": 8,
          "money": -8,
          "stress": -3
        }
      },
      {
        "text": "장바구니에만 담는다",
        "effect": {
          "otaku": 4,
          "stress": -1
        }
      },
      {
        "text": "참는다",
        "effect": {
          "money": 2,
          "stress": 2
        }
      }
    ]
  }
];

// ============================================================
// 추가 오타쿠 이벤트 확장팩
// ============================================================

OTAKU_EVENTS.push(
  {
    id: "otaku_goods",
    title: "굿즈를 발견했다",
    description: "한정판 굿즈를 발견했다.\n지갑이 위험하다.",
    choices: [
      { text: "산다", effect: { otaku: 6, money: -8, stress: -3 } },
      { text: "사진만 찍는다", effect: { otaku: 2 } },
      { text: "중고로 찾는다", effect: { otaku: 4, money: -3 } }
    ]
  },
  {
    id: "otaku_allnight",
    title: "밤새서 정주행했다",
    description: "한 화만 보려 했는데 아침이 됐다.",
    choices: [
      { text: "끝까지 본다", effect: { otaku: 5, health: -4, stress: -3 } },
      { text: "중간에 잔다", effect: { health: 2 } },
      { text: "다음에 보기로 한다", effect: { stress: 1 } }
    ]
  },
  {
    id: "otaku_convention",
    title: "행사/코믹월드에 갔다",
    description: "사람이 엄청 많다.\n같은 취미를 가진 사람들이 이렇게 많다.",
    choices: [
      { text: "굿즈 많이 산다", effect: { otaku: 8, money: -10 } },
      { text: "구경만 한다", effect: { otaku: 4, stress: -3 } },
      { text: "코스프레 사진 찍는다", effect: { otaku: 6, relationship: 3 } }
    ]
  },
  {
    id: "otaku_stream",
    title: "스트리밍을 시작했다",
    description: "게임/리뷰 방송을 시작했다.\n사람이 몇 명 들어왔다.",
    choices: [
      { text: "꾸준히 방송한다", effect: { otaku: 5, career: 3 } },
      { text: "취미로만 한다", effect: { otaku: 3, stress: -2 } },
      { text: "바로 접는다", effect: { stress: -1 } }
    ]
  },
  {
    id: "otaku_merch_resell",
    title: "굿즈 되팔이로 돈을 벌었다",
    description: "취미가 돈이 될 수도 있다는 걸 알았다.",
    choices: [
      { text: "계속 한다", effect: { money: 12, otaku: 3, stress: 2 } },
      { text: "한 번으로 만족", effect: { money: 5 } },
      { text: "굿즈는 소장한다", effect: { otaku: 5 } }
    ]
  }
);
