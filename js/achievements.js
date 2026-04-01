function checkAchievements(){
  const g=Number(convertGrade(player.stats.gradePoint));
  const s=player.stats;
  if(g>=4.0) unlockAchievement('성적 장인');
  if(g>=3.5) unlockAchievement('우등생의 맛');
  if(s.love>=70&&player.state.hasRing) unlockAchievement('캠퍼스 커플');
  if(s.love>=50) unlockAchievement('썸의 전문가');
  if(s.otaku>=70) unlockAchievement('깊어진 덕심');
  if(s.otaku>=95) unlockAchievement('덕업일치 경지');
  if(s.career>=50) unlockAchievement('스펙의 맛');
  if(s.career>=80) unlockAchievement('취준 전사');
  if(s.money>=80) unlockAchievement('통장에 봄이 옴');
  if(s.health>=90) unlockAchievement('철벽 체력');
  if(s.stress>=90) unlockAchievement('번아웃 직전 생존자');
  if(s.relationship>=85) unlockAchievement('인싸 오브 인싸');
  if(player.state.partTimeJob) unlockAchievement('알바의 세계');
  if(player.state.military) unlockAchievement('국방의 의무');
  if(player.state.hasRing) unlockAchievement('반지 수집가');
  if(player.progress.currentGrade>=4&&player.progress.currentTurn>=25) unlockAchievement('4학년 생존기');
  if(s.stress<=10&&player.progress.currentTurn>=7) unlockAchievement('평온의 경지');
  if(s.gradePoint<=10) unlockAchievement('학점 바닥을 봤다');
}
