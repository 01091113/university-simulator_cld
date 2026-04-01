대학 시뮬레이터 패치 v1

포함 파일
- index.html
- js/player.js
- js/main.js
- js/engine.js
- js/events_rival.js (신규)
- js/events_story.js (신규)
- js/events_expansion.js (신규)

적용 방법
1. 압축을 푼다.
2. 압축 안의 파일/폴더 구조 그대로 기존 저장소 루트에 덮어쓴다.
3. GitHub 업로드 시 js 폴더 안 신규 파일 3개가 함께 올라가야 한다.
4. 강력 새로고침(Ctrl+Shift+R) 후 테스트한다.

무엇이 추가됐는가
1) 라이벌 이름 입력
- 게임 시작 직전에 prompt 팝업으로 라이벌 이름을 입력한다.
- 입력이 없으면 기본값은 '서윤'이다.
- 저장 불러오기 세이브에는 rivalName 기본값이 자동 보정된다.

2) 라이벌 시스템
- 초반에 라이벌 첫 조우 이벤트가 확률적으로 등장한다.
- 이후 발표/경쟁 이벤트가 추가로 뜰 수 있다.
- 친밀도(rivalAffinity)가 높아지면 라이벌 연애 루트가 열린다.

3) 라이벌 연애 체인 10개
- events_rival.js 안 getRivalLoveChainEvents()에 10개 연결 이벤트가 들어 있다.
- 라이벌 스파크 이벤트에서 감정을 인정하면 체인이 시작된다.
- 체인은 finishTurn 후 continueChainIfNeeded()를 통해 이어진다.

4) 스토리 체인 3종
- 학생회/행사 루트
- 투자/코인 루트
- 학내 커뮤니티 전설 루트
- 조건 충족 시 maybeTriggerStoryEvent()가 랜덤 이벤트보다 먼저 트리거한다.

5) 기존 연애/오타쿠 확장
- 기존 LOVE_EVENTS는 유지하고 뒤에 추가 push 방식으로만 확장했다.
- events_expansion.js에서 연애 5개, 오타쿠 6개 추가된다.

6) 엔진 최소 수정 내용
- popupEvent(): resultText, onChoose 지원 추가
- randomEventStep(): maybeSpecialRouteEvent / maybeTriggerRivalEvent / maybeTriggerStoryEvent 호출 추가
- chooseMain(): 휴식 시 주거 이벤트 확률 호출, 라이벌 스파크 보조 호출 추가
- continueChainIfNeeded(): rivalLove / story 체인 타입 추가

주의
- index.html에 신규 script 3개가 추가되어 있어야 한다.
- 기존 파일 전체를 크게 뜯지 않고 hook 형태로만 확장했다.
- 라이벌 연애 체인은 activeChain을 사용하므로 다른 체인과 동시에 겹치지 않도록 설계되어 있다.
