const LOVE_EVENTS = [
  {
    "id": "love_chain_start",
    "title": "같이 밥을 먹게 됐다",
    "description": "특별한 일은 아닌데 이상하게 특별하게 느껴졌다.\n사실 별말 안 했는데도 자꾸 다음 장면을 상상하게 된다.",
    "choices": [
      {
        "text": "대화를 길게 이어간다",
        "effect": {
          "love": 6,
          "stress": -2
        }
      },
      {
        "text": "적당히만 반응한다",
        "effect": {
          "love": 3
        }
      },
      {
        "text": "괜히 어색해서 빨리 끝낸다",
        "effect": {
          "love": -2,
          "stress": 2
        }
      }
    ]
  },
  {
    "id": "love_text_delay",
    "title": "답장이 늦다",
    "description": "두 시간쯤 지나면 사람은 별의별 상상을 다 하게 된다.\n사실 아무 일 아닐 수도 있는데, 그게 더 괜히 신경 쓰인다.",
    "choices": [
      {
        "text": "솔직하게 물어본다",
        "effect": {
          "love": 4,
          "stress": 2
        }
      },
      {
        "text": "아무렇지 않은 척한다",
        "effect": {
          "love": -1,
          "stress": 4
        }
      },
      {
        "text": "나도 늦게 답한다",
        "effect": {
          "love": -4,
          "stress": 1
        }
      }
    ]
  },
  {
    "id": "love_confess",
    "title": "고백 타이밍이 왔다",
    "description": "이 정도면 마음을 말해도 될 것 같은데, 문제는 결과가 늘 상상처럼 되진 않는다는 점이다.\n게다가 빈손으로 고백하면 왠지 너무 허전하다.",
    "choices": [
      {
        "text": "반지를 준비하고 고백한다",
        "effect": {
          "love": 12,
          "stress": 3
        },
        "requires": "ring"
      },
      {
        "text": "그냥 고백한다",
        "effect": {
          "love": "RANDOM_MEDIUM",
          "stress": 6
        }
      },
      {
        "text": "조금 더 미룬다",
        "effect": {
          "love": 4,
          "stress": 2
        }
      }
    ]
  },
  {
    "id": "love_date_chain",
    "title": "학교 밖 데이트",
    "description": "학교 밖에서 만나는 순간 관계는 조금 다른 온도를 띤다.\n돈도 들고, 생각도 들고, 기대도 든다.",
    "choices": [
      {
        "text": "카페+밥 풀코스",
        "effect": {
          "love": 8,
          "money": -10,
          "stress": -4
        }
      },
      {
        "text": "산책만 한다",
        "effect": {
          "love": 5,
          "money": -1,
          "stress": -3
        }
      },
      {
        "text": "돈이 없어서 취소한다",
        "effect": {
          "love": -5,
          "stress": 5
        }
      }
    ]
  },
  {
    "id": "love_conflict_chain",
    "title": "시험기간 서운함",
    "description": "바쁠수록 말은 짧아지고 해석은 길어진다.\n연애는 늘 타이밍이 안 좋을 때 더 섬세해진다.",
    "choices": [
      {
        "text": "솔직하게 말한다",
        "effect": {
          "love": 6,
          "stress": 2
        }
      },
      {
        "text": "무조건 사과한다",
        "effect": {
          "love": 3,
          "stress": 3
        }
      },
      {
        "text": "연락을 피한다",
        "effect": {
          "love": -8,
          "stress": -1
        }
      }
    ]
  }
];
