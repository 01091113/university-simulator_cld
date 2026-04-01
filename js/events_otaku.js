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
