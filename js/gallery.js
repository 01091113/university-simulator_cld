function renderGallery(){
  const unlocked=getUnlockedEndings();
  const total=Object.keys(ENDINGS).length;
  document.getElementById('gallery-list').innerHTML=
    `<div style="margin-bottom:14px;color:var(--sub);font-size:14px">해금 ${unlocked.length} / ${total}</div>`+
    Object.entries(ENDINGS).map(([key,ending])=>`
      <div class="gallery-item ${unlocked.includes(key)?'unlocked':'locked'}">
        <strong>${unlocked.includes(key)?ending.title:'??? 잠긴 엔딩'}</strong><br/>
        <span style="font-size:14px;color:var(--sub)">${unlocked.includes(key)?ending.variants[0]:'아직 해금하지 못한 엔딩이다.'}</span>
      </div>`).join('');
}
