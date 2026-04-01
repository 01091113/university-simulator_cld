function setTheme(theme){
  player.profile.theme=theme;
  document.body.setAttribute('data-theme',theme);
}
function modalVariant(type){
  const card=document.getElementById('modal-card');
  card.className='modal-card';
  if(type==='love') card.classList.add('variant-love');
  else if(type==='military') card.classList.add('variant-military');
  else if(type==='housing') card.classList.add('variant-housing');
  else if(type==='special') card.classList.add('variant-special');
  else card.classList.add('variant-general');
}
