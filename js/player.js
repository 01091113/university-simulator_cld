const STARTING_PLAYER = {
  profile:{
    name:"", gender:"female",
    collegeKey:"", collegeLabel:"",
    majorKey:"", majorLabel:"",
    theme:"pastel-sky", slot:"slot1",
    housing:"dormitory"   // "selfboard" | "dormitory" | "commute"
  },
  progress:{currentGrade:1,currentTurn:1,totalTurns:28,currentMonthIndex:0,turnType:"semester_start",gameEnded:false},
  stats:{health:72,stress:20,gradePoint:48,relationship:50,career:0,otaku:25,love:0,money:20},
  state:{
    some:false,dating:false,conflict:false,brokenUp:false,
    military:false,intern:false,graduateOffer:false,
    warningCount:0,burnoutCount:0,pinnedWarning:"",
    oversleptBoost:false,hasRing:false,partTimeJob:false,
    majorEvent2Done:false,majorEvent3Done:false,
    activeChain:null,rumors:[],messageBlocked:false,
    lastAction:"",lastRumorId:null,blackCompanyRoute:false,
    consecutiveAction:"",consecutiveCount:0,specialFlags:{},
    housingEventDone:{}   // 주거 특수 이벤트 중복 방지
  },
  achievements:[],logs:[]
};
let player = JSON.parse(JSON.stringify(STARTING_PLAYER));
