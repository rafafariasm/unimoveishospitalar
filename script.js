// script.js - abra o WhatsApp com a mensagem pronta
(function(){
  // Ajusta o ano do rodapé
  document.addEventListener('DOMContentLoaded', function(){
    const anoSpan = document.getElementById('ano');
    if(anoSpan) anoSpan.textContent = new Date().getFullYear();
  });
})();

function abrirWhatsApp(produto) {
  // Substitua aqui pelo número da empresa (com DDI e DDD) sem sinais.
  // Exemplo: 5511999999999
  const numero = "558187075549";
  const mensagem = produto && produto.length
    ? `Olá! Tenho interesse no produto: ${produto}`
    : `Olá! Gostaria de mais informações sobre os produtos.`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
