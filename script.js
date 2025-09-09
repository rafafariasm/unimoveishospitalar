function abrirWhatsApp(produto) {
  const numero = "5581999999999"; // <-- Troque para o número da empresa
  const mensagem = `Olá! Gostaria de mais informações sobre: ${produto}`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
