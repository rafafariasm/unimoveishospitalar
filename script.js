// script.js - pronto para uso
(function(){
  // Ajusta o ano do rodapé
  document.addEventListener('DOMContentLoaded', function(){
    const anoSpan = document.getElementById('ano');
    if(anoSpan) anoSpan.textContent = new Date().getFullYear();
  });

  // Habilita swipe/drag nativo para carrossel (melhora UX mobile)
  document.addEventListener('DOMContentLoaded', function(){
    const carrossels = document.querySelectorAll('.carrossel');
    carrossels.forEach(track => {
      let isDown = false;
      let startX;
      let scrollLeft;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('active');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });
      track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('active'); });
      track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('active'); });
      track.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1; // scroll-fast
        track.scrollLeft = scrollLeft - walk;
      });

      // touch events for mobile
      let touchStartX = 0;
      let touchScrollLeft = 0;
      track.addEventListener('touchstart', function(e){
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = track.scrollLeft;
      }, {passive: true});
      track.addEventListener('touchmove', function(e){
        const touchX = e.touches[0].pageX;
        const walk = (touchX - touchStartX) * 1;
        track.scrollLeft = touchScrollLeft - walk;
      }, {passive: true});
    });
  });
})();

function abrirWhatsApp(produto) {
  // Substitua pelo número da empresa (DDI + DDD + número) sem sinais e espaços.
  // Exemplo: 5511999999999
  const numero = "558187075549";
  const mensagem = produto && produto.length
    ? `Olá! Tenho interesse no produto: ${produto}`
    : `Olá! Gostaria de mais informações sobre os produtos.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

function rolarCarrossel(botao, direcao) {
  const container = botao.parentElement.querySelector(".carrossel");
  if(!container) return;
  const card = container.querySelector(".card");
  if(!card) return;
  const style = getComputedStyle(container);
  const gap = parseInt(style.columnGap || 16, 10) || 16;
  const largura = card.offsetWidth + gap;
  container.scrollBy({
    left: direcao * largura * 2, // rola 2 cards por vez
    behavior: "smooth"
  });
}
