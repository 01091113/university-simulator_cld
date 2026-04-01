function startNewGame(){
  player=clone(STARTING_PLAYER);
  player.profile.name=document.getElementById('player-name').value.trim()||'플레이어';
  player.profile.gender=document.getElementById('player-gender').value;
  player.profile.collegeKey=document.getElementById('player-college').value;
  player.profile.collegeLabel=COLLEGE_DATA[player.profile.collegeKey].name;
  player.profile.majorKey=document.getElementById('player-major').value;
  player.profile.majorLabel=majorData(player.profile.collegeKey,player.profile.majorKey).name;
  player.profile.housing=document.getElementById('player-housing').value;
  player.profile.theme=document.getElementById('player-theme').value;
  player.profile.slot=document.getElementById('save-slot').value;
  applyMajorBonusOnce();
  setTheme(player.profile.theme);
  const housingLabel={selfboard:'🍳 자취',dormitory:'🛏️ 기숙사',commute:'🚇 통학'}[player.profile.housing]||'';
  addLog('새내기의 첫 장면',`${player.profile.name}는 ${player.profile.collegeLabel} ${player.profile.majorLabel}의 학생이 되었다.\n주거 유형: ${housingLabel}\n이제부터 웃기지만 가끔 꽤 아픈 대학 생활이 시작된다.`);
  showScreen('game-screen');
  renderAll();
  openMainScene();
}

function setup(){
  populateColleges();
  populateMajors();
  document.getElementById('player-college').addEventListener('change',populateMajors);
  document.getElementById('player-major').addEventListener('change',renderMajorInfo);
  document.getElementById('player-theme').addEventListener('change',e=>setTheme(e.target.value));
  document.getElementById('open-gallery-btn').addEventListener('click',()=>{renderGallery();showScreen('gallery-screen')});
  document.getElementById('close-gallery-btn').addEventListener('click',()=>showScreen('start-screen'));
  document.getElementById('back-start-btn').addEventListener('click',()=>showScreen('start-screen'));
  document.getElementById('save-now-btn').addEventListener('click',()=>{saveGame(player.profile.slot);addLog('저장 완료','현재 진행 상황을 저장했다.');renderLog()});
  document.getElementById('close-report-btn').addEventListener('click',closeReport);
  document.getElementById('modal-close-btn').addEventListener('click',closeModal);
  document.getElementById('close-shop-btn').addEventListener('click',closeShop);
  document.getElementById('close-rumor-btn').addEventListener('click',closeRumors);
  document.getElementById('shop-btn').addEventListener('click',openShop);
  document.getElementById('rumor-history-btn').addEventListener('click',openRumors);
  document.getElementById('load-slot-btn').addEventListener('click',()=>{
    const slot=document.getElementById('save-slot').value;
    const loaded=loadGame(slot);
    if(!loaded){alert('선택한 슬롯에 저장된 데이터가 없다.');return}
    player=loaded;
    if(!player.state.lastRumorId) player.state.lastRumorId=null;
    if(!player.state.blackCompanyRoute) player.state.blackCompanyRoute=false;
    if(!player.state.consecutiveAction) player.state.consecutiveAction='';
    if(!player.state.consecutiveCount) player.state.consecutiveCount=0;
    if(!player.state.specialFlags) player.state.specialFlags={};
    if(!player.state.housingEventDone) player.state.housingEventDone={};
    if(!player.profile.housing) player.profile.housing='commute';
    setTheme(player.profile.theme||'pastel-sky');
    showScreen('game-screen');
    renderAll();
    openMainScene();
  });
  document.getElementById('start-game-btn').addEventListener('click',startNewGame);
  window.buyItem=buyShopItem;
  renderGallery();
  renderMajorInfo();
  setTheme('pastel-sky');
}

window.addEventListener('DOMContentLoaded',setup);
