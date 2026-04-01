const COLLEGE_DATA = {
  "humanities": {
    "name": "인문대학",
    "departments": {
      "korean": {"name":"국어국문학과","bonus":{"gradePoint":4,"relationship":2},"desc":"문장과 감정, 해석과 상상에 강하다. 리포트 체력이 다른 학과 두 배."},
      "english": {"name":"영어영문학과","bonus":{"career":4,"relationship":4},"desc":"언어와 교류에 유리하다. 원서 수업이 생각보다 많다."},
      "history": {"name":"사학과","bonus":{"gradePoint":5,"stress":1},"desc":"끈기와 탐구심이 강점이다. 리포트를 쓰다 보면 밤이 사라진다."},
      "philosophy": {"name":"철학과","bonus":{"gradePoint":3,"stress":2,"love":2},"desc":"깊게 고민하고 오래 생각한다. 취업 방향이 넓어서 더 고민된다."},
      "chinese": {"name":"중어중문학과","bonus":{"relationship":3,"career":3},"desc":"언어와 문화 교류에 강하다. 원어민 교수님의 발음이 충격적이다."},
      "japanese": {"name":"일어일문학과","bonus":{"otaku":4,"career":3},"desc":"문화 소비와 언어 능력이 함께 오른다. 덕후 비율이 상당히 높다."}
    }
  },
  "social": {
    "name": "사회과학대학",
    "departments": {
      "psychology": {"name":"심리학과","bonus":{"relationship":6,"love":4,"stress":-2},"desc":"상담 이벤트에 유리하다. 사람들이 고민을 먼저 털어놓는다."},
      "sociology": {"name":"사회학과","bonus":{"relationship":4,"career":4},"desc":"사람과 구조를 읽는 시야가 넓다. 통계와 보고서의 연속이다."},
      "media": {"name":"미디어커뮤니케이션학과","bonus":{"career":6,"relationship":4},"desc":"콘텐츠와 발표 루트에 강하다. 유튜브가 전공이 된 기분."},
      "politics": {"name":"정치외교학과","bonus":{"career":5,"relationship":4},"desc":"토론과 리더십 중심이다. 토론 과제에서 갑자기 진심이 된다."},
      "admin": {"name":"행정학과","bonus":{"career":5,"gradePoint":3},"desc":"공공 분야 진로와 안정성이 높다. 공무원 시험이 은근히 당긴다."},
      "socialwork": {"name":"사회복지학과","bonus":{"relationship":7,"career":2},"desc":"돌봄과 공동체 루트에 유리하다. 봉사가 학점이 된다."}
    }
  },
  "business": {
    "name": "경영대학",
    "departments": {
      "businessAdmin": {"name":"경영학과","bonus":{"career":7,"relationship":2},"desc":"공모전, 인턴, 취업 루트에 강하다. 조별과제가 삶의 일부가 된다."},
      "economics": {"name":"경제학과","bonus":{"career":6,"gradePoint":3},"desc":"현실 감각과 분석력 중심이다. 그래프를 보면 세상이 보인다(는 착각)."},
      "accounting": {"name":"회계학과","bonus":{"career":6,"gradePoint":4,"stress":2},"desc":"성실형 플레이에 유리하다. 자격증 공부가 선택이 아닌 필수."},
      "marketing": {"name":"마케팅학과","bonus":{"career":6,"relationship":4},"desc":"대외활동과 발표 루트에 강하다. 트렌드에 민감해진다."},
      "finance": {"name":"금융학과","bonus":{"career":7,"gradePoint":3},"desc":"취업 준비의 압박이 있지만 보상도 크다. 주식앱을 자주 켜게 된다."},
      "startup": {"name":"창업학과","bonus":{"career":5,"relationship":5,"money":-3},"desc":"아이디어와 도전이 공존하는 학과. 사업계획서를 매학기 쓴다."}
    }
  },
  "engineering": {
    "name": "공과대학",
    "departments": {
      "computer": {"name":"컴퓨터공학과","bonus":{"career":8,"gradePoint":2,"stress":4},"desc":"해커톤, 프로젝트, 인턴 루트에 강하다. 밤샘 코딩이 일상이다."},
      "mechanical": {"name":"기계공학과","bonus":{"career":6,"stress":4},"desc":"실험과 설계 중심이다. 공돌이 문화를 몸으로 익힌다."},
      "electronic": {"name":"전자공학과","bonus":{"career":7,"gradePoint":2,"stress":4},"desc":"실무형 프로젝트에 유리하다. 회로도를 꿈에서 본다."},
      "chemical": {"name":"화학공학과","bonus":{"gradePoint":4,"career":5,"stress":3},"desc":"실험과 리포트의 연속이다. 안전복이 일상 아이템이 된다."},
      "civil": {"name":"토목공학과","bonus":{"career":5,"stress":3},"desc":"꾸준하고 현실적인 루트에 강하다. 현장 실습이 인생을 바꾼다."},
      "architecture": {"name":"건축학과","bonus":{"career":5,"stress":7},"desc":"야작과 포트폴리오가 따라온다. 수면시간이 스탯이다."}
    }
  },
  "science": {
    "name": "자연과학대학",
    "departments": {
      "physics": {"name":"물리학과","bonus":{"gradePoint":5,"stress":3},"desc":"이해되는 순간과 안 되는 순간의 온도차가 크다."},
      "chemistry": {"name":"화학과","bonus":{"gradePoint":4,"stress":3},"desc":"실험과 보고서가 많다. 가운이 제2의 교복이다."},
      "biology": {"name":"생명과학과","bonus":{"gradePoint":5,"career":2},"desc":"성실함이 곧 생존력이다. 대학원이 선택이 아닌 코스가 된다."},
      "math": {"name":"수학과","bonus":{"gradePoint":6,"stress":2},"desc":"조용하지만 무서운 집중력을 발휘한다. 증명이 시작되면 세상이 멈춘다."},
      "stats": {"name":"통계학과","bonus":{"career":6,"gradePoint":3},"desc":"데이터와 현실적 진로가 강점이다. R과 Python이 친구가 된다."},
      "astronomy": {"name":"천문학과","bonus":{"gradePoint":4,"love":2},"desc":"새벽과 낭만, 보고서가 함께 온다. 별 보는 실습이 힐링이다."}
    }
  },
  "arts": {
    "name": "예술대학",
    "departments": {
      "visualDesign": {"name":"시각디자인학과","bonus":{"career":6,"stress":5},"desc":"포트폴리오와 전시 루트에 강하다. 밤샘 작업이 낭만처럼 느껴진다."},
      "film": {"name":"영화영상학과","bonus":{"relationship":5,"career":5,"stress":3},"desc":"창작과 협업 중심이다. 찍는 것보다 편집이 더 오래 걸린다."},
      "acting": {"name":"연기예술학과","bonus":{"love":6,"relationship":6},"desc":"감정과 발표 루트에 강하다. 수업이 매번 즉흥극이다."},
      "music": {"name":"실용음악학과","bonus":{"love":4,"relationship":5,"otaku":3},"desc":"공연과 합주 루트에 강하다. 새벽 연습이 일상이 된다."},
      "animation": {"name":"애니메이션과","bonus":{"otaku":7,"career":4},"desc":"덕질과 창작의 경계가 흐려진다. 최애 캐릭터가 졸업작품이 된다."},
      "fashion": {"name":"패션디자인과","bonus":{"career":5,"stress":4},"desc":"감각과 마감이 같이 온다. 트렌드를 공부로 인정받는다."}
    }
  },
  "sports": {
    "name": "체육대학",
    "departments": {
      "physicalEd": {"name":"체육교육과","bonus":{"health":10,"stress":-3,"career":3},"desc":"체력이 곧 스탯이다. 교생 실습에서 진짜 실력이 드러난다."},
      "sportsScience": {"name":"스포츠과학과","bonus":{"health":8,"career":4,"stress":-2},"desc":"운동과 학문의 사이. 데이터로 스포츠를 분석한다."},
      "leisure": {"name":"레저스포츠학과","bonus":{"health":7,"relationship":5,"money":-2},"desc":"즐기는 것이 전공이다. 현장 실습이 여행처럼 느껴진다."},
      "martialArts": {"name":"무도학과","bonus":{"health":9,"stress":-4,"relationship":2},"desc":"심신 단련이 일상이다. 체력 스탯이 압도적으로 올라간다."},
      "sports_management": {"name":"스포츠경영학과","bonus":{"career":6,"relationship":4,"health":3},"desc":"스포츠와 비즈니스의 교차점. 에이전트가 꿈이 된다."},
      "coaching": {"name":"코칭학과","bonus":{"relationship":6,"career":4,"health":4},"desc":"사람을 키우는 기술을 배운다. 선후배 관계가 두터워진다."}
    }
  },
  "education": {
    "name": "사범대학",
    "departments": {
      "koreanEdu": {"name":"국어교육과","bonus":{"gradePoint":5,"relationship":2},"desc":"학점과 성실형 루트가 안정적이다."},
      "englishEdu": {"name":"영어교육과","bonus":{"gradePoint":4,"career":3},"desc":"학업과 글로벌 감각이 공존한다."},
      "mathEdu": {"name":"수학교육과","bonus":{"gradePoint":6,"stress":2},"desc":"꾸준함으로 버틴다. 임용고사가 최종보스다."},
      "historyEdu": {"name":"역사교육과","bonus":{"gradePoint":5,"career":2},"desc":"교직 루트가 자연스럽게 연결된다."},
      "scienceEdu": {"name":"과학교육과","bonus":{"gradePoint":5,"career":2},"desc":"실험과 교육이 함께 간다."},
      "earlyChildhood": {"name":"유아교육과","bonus":{"relationship":6,"career":2},"desc":"돌봄과 인간관계형 플레이에 강하다."}
    }
  },
  "nursing": {
    "name": "간호대학",
    "departments": {
      "nursing": {"name":"간호학과","bonus":{"career":7,"stress":5,"gradePoint":3},"desc":"피곤하지만 취업 강점이 큰 학과다. 임상 실습이 세계관을 바꾼다."},
      "emergency": {"name":"응급구조학과","bonus":{"career":6,"stress":5,"health":2},"desc":"긴장감과 실무가 함께 온다."},
      "healthAdmin": {"name":"보건행정학과","bonus":{"career":5,"relationship":2},"desc":"안정적인 보건 분야 진로와 잘 맞는다."},
      "physicalTherapy": {"name":"물리치료학과","bonus":{"career":6,"relationship":3,"stress":3},"desc":"관계와 실무가 함께 움직인다."},
      "occupationalTherapy": {"name":"작업치료학과","bonus":{"career":5,"relationship":4},"desc":"재활과 일상 회복을 돕는 따뜻한 학과다."},
      "radiology": {"name":"방사선학과","bonus":{"career":6,"stress":4},"desc":"안정적이지만 피로가 있다."}
    }
  },
  "law": {
    "name": "법과대학",
    "departments": {
      "law": {"name":"법학과","bonus":{"gradePoint":7,"career":3,"stress":3},"desc":"학점과 논리형 플레이의 끝판왕."},
      "police": {"name":"경찰행정학과","bonus":{"career":5,"stress":2,"health":2},"desc":"공무원·공공 루트에 유리하다."},
      "crimPsych": {"name":"범죄심리학과","bonus":{"relationship":4,"career":3},"desc":"심리와 법의 중간 지점이다."},
      "intlLaw": {"name":"국제법학과","bonus":{"career":5,"gradePoint":3},"desc":"글로벌 지향 진로에 잘 맞는다."},
      "forensic": {"name":"과학수사학과","bonus":{"career":5,"stress":3},"desc":"실무와 학문이 함께 간다."},
      "intlRelations": {"name":"국제관계학과","bonus":{"career":5,"relationship":4},"desc":"외교와 국제 무대를 꿈꾼다."}
    }
  },
  "itfusion": {
    "name": "IT융합대학",
    "departments": {
      "ai": {"name":"AI학과","bonus":{"career":8,"stress":3},"desc":"미래 유망하지만 과제도 유망하게 많다."},
      "gameDev": {"name":"게임개발학과","bonus":{"otaku":8,"career":5,"stress":3},"desc":"덕질과 개발이 이어질 수 있다. 졸업작품이 출시까지 가기도 한다."},
      "dataSci": {"name":"데이터사이언스학과","bonus":{"career":7,"gradePoint":3},"desc":"현실적인 데이터 진로에 강하다."},
      "security": {"name":"정보보안학과","bonus":{"career":7,"stress":4},"desc":"긴장감과 실무 능력이 같이 올라간다. CTF 대회가 삶이 된다."},
      "software": {"name":"소프트웨어학과","bonus":{"career":8,"gradePoint":2,"stress":3},"desc":"프로젝트와 실무의 균형형."},
      "ux": {"name":"UXUI학과","bonus":{"career":5,"relationship":3},"desc":"사람 보는 감각이 중요하다. 피그마가 제2의 언어가 된다."}
    }
  }
};
