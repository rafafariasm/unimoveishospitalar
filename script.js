function abrirWhatsApp(produto) {
  const numero = "55SEUNUMERO"; // substitua pelo número com DDD
  const mensagem = `Olá, tenho interesse no produto ${produto}. Poderia me enviar mais informações?`;
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
