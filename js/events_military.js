const MILITARY_EVENTS = [
  {
    "id": "mil_1",
    "title": "입대 통지서가 왔다",
    "description": "이제는 더 미루기 어려운 현실이 왔다.\n친구들 사이에서도 군대 이야기가 웃기게 시작됐다가 결국 진지하게 끝난다.",
    "choices": [
      {
        "text": "받아들인다",
        "effect": {
          "stress": 10
        },
        "special": "enter_military"
      },
      {
        "text": "조금 더 미룬다",
        "effect": {
          "stress": 5,
          "career": -2
        }
      },
      {
        "text": "못 본 척한다",
        "effect": {
          "stress": 7
        }
      }
    ]
  },
  {
    "id": "mil_2",
    "title": "군대리아를 만들어 먹었다",
    "description": "이상하게도 별로일 것 같았는데, 막상 만들고 나니 또 군대식 논리가 생긴다.\n이 세계에는 이 세계만의 납득이 있다.",
    "choices": [
      {
        "text": "은근 맛있다고 인정한다",
        "effect": {
          "stress": -3,
          "relationship": 2
        }
      },
      {
        "text": "먹을 수는 있다",
        "effect": {
          "stress": 1
        }
      },
      {
        "text": "왜 이걸 먹나 싶다",
        "effect": {
          "stress": 3
        }
      }
    ]
  },
  {
    "id": "mil_3",
    "title": "사랑하는 사람 이름을 부르며 낙하했다",
    "description": "훈련은 훈련인데, 이상하게도 마음은 갑자기 아주 사적인 곳으로 튄다.\n이런 상황에서조차 누군가를 생각하는 자신이 조금 웃겼다.",
    "choices": [
      {
        "text": "웃기지만 버틴다",
        "effect": {
          "stress": 4,
          "love": 2
        }
      },
      {
        "text": "괜히 울컥했다",
        "effect": {
          "stress": 2,
          "love": 4
        }
      },
      {
        "text": "아무 생각도 안 하려 한다",
        "effect": {
          "stress": 5
        }
      }
    ]
  },
  {
    "id": "mil_4",
    "title": "사격 훈련 날",
    "description": "이상하게도 조용한 긴장감이 몸에 밴다.\n잘하고 못하고보다, 그냥 빨리 끝났으면 좋겠다는 생각이 먼저 든다.",
    "choices": [
      {
        "text": "집중해서 끝낸다",
        "effect": {
          "career": 3,
          "stress": 4
        }
      },
      {
        "text": "대충 버틴다",
        "effect": {
          "stress": 5
        }
      },
      {
        "text": "탈영 생각을 1초 해본다",
        "effect": {
          "stress": 8,
          "career": -5,
          "relationship": -2
        }
      }
    ]
  },
  {
    "id": "mil_5",
    "title": "짧은 휴가",
    "description": "짧은 자유가 이렇게 소중할 줄 몰랐다.\n집으로 가는 길이 그렇게 반갑다가도, 복귀 생각에 벌써 마음이 무거워진다.",
    "choices": [
      {
        "text": "실컷 논다",
        "effect": {
          "stress": -10,
          "love": 3,
          "money": -4
        }
      },
      {
        "text": "가족과 보낸다",
        "effect": {
          "stress": -8,
          "relationship": 5
        }
      },
      {
        "text": "혼자 조용히 쉰다",
        "effect": {
          "stress": -7
        }
      }
    ]
  }
];
