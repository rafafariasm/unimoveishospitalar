// script.js - pronto para uso
(function(){
  // Ajusta o ano do rodapé e retorna para o topo ao carregar a página
  document.addEventListener('DOMContentLoaded', function(){
    // Retorna para o topo da página (HOME) ao carregar
    window.scrollTo(0, 0);
    
    const anoSpan = document.getElementById('ano');
    if(anoSpan) anoSpan.textContent = new Date().getFullYear();
    
    // Configuração do botão de voltar ao topo
    const btnTopo = document.getElementById('btn-topo');
    if (btnTopo) {
      // Mostra o botão quando o usuário rolar para baixo
      window.addEventListener('scroll', function() {
        // Verifica se está próximo do rodapé (300px antes do final da página)
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        // Mostra o botão quando estiver próximo do rodapé ou tiver rolado mais de 500px
        if (scrollTop > 500 || (scrollHeight - scrollTop - clientHeight) < 300) {
          btnTopo.style.display = 'block';
        } else {
          btnTopo.style.display = 'none';
        }
      });
      
      // Adiciona evento de clique para voltar ao topo
      btnTopo.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
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
  
  // Verifica se está no final do carrossel e precisa voltar ao início
  if (direcao > 0 && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
    // Está no final, volta para o início
    container.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  } 
  // Verifica se está no início do carrossel e precisa ir para o final
  else if (direcao < 0 && container.scrollLeft <= 10) {
    // Está no início, vai para o final
    container.scrollTo({
      left: container.scrollWidth,
      behavior: "smooth"
    });
  }
  // Comportamento normal de rolagem
  else {
    container.scrollBy({
      left: direcao * largura * 2, // rola 2 cards por vez
      behavior: "smooth"
    });
  }
}
