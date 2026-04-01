# 대학 시뮬레이터 v5 — 업데이트 노트

## 수정된 버그
- index.html CSS 링크 오류 수정 (style_additions.css → style.css 통합)
- populateMajors() 단과대 미선택 시 오류 → null 체크 추가
- player.js 누락 state 필드 추가 (lastRumorId, blackCompanyRoute 등)
- 구 저장 슬롯 호환 마이그레이션 코드 추가 (main.js)
- 모달 오버플로우 수정 (max-height + overflow-y:auto)
- 엔딩 키 없을 때 endGame 오류 방어 처리
- random.js RANDOM_LARGE 범위 오류 수정 (-80~80 → -10~10)

## 신규/변경 내용
### style.css
- 기본 테마를 밝은 파스텔 스카이로 변경
- 테마 5종으로 통일 (파스텔 스카이/민트/라벤더/다크/초코바나나)
- 스탯 바 색상 동적 변화 (체력=파랑, 스트레스=빨강↔초록, 연애=핑크)
- 선택지 hover 개선, special-unlock 선택지 점선 표시

### events.js
- 기존 150개 중복 이벤트 → 고유 50개 이벤트로 교체
- 모든 이벤트에 3개 선택지 포함
- RUMOR_EVENTS 15개 별도 분리 (고유 내용)

### engine.js
- 연속 행동 감지 시스템 (3턴 연속 동일 행동 → 특수 이벤트)
- 찌라시 → 후속 이벤트 연계 (족보, 커플 목격, 콘서트)
- 엔딩 힌트 시스템 (현재 스탯 기반 방향 제시)
- 체대 전용 선택지/이벤트
- 덕질 이벤트 자동 트리거
- 스탯 조건부 특수 선택지 3종

### majors.js
- 체육대학 추가 (6개 학과)
- 기존 학과 desc 개선 (현실적 디테일 추가)
- 경영대 창업학과 추가

### endings.js
- 새 엔딩 4개 추가: sports_pro, streamer, dropout_success
- 기존 엔딩 variant 3개로 확장

### achievements.js
- 업적 17개로 확장

### messages.js
- 20개 고유 메시지 (중복 0개)
- 8초 후 자동 사라짐

### gallery.js
- 해금 카운터 표시

### shop (ui.js + engine.js)
- 상점 아이템 8종으로 확장 (커피, 비타민, 수험생 패키지 추가)
