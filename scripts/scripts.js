
const numeroWhatsApp = "5565981038426";

// BOTÕES COMPRAR
const botoesComprar = document.querySelectorAll(".btn-buy");

botoesComprar.forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.parentElement.querySelector("h3").innerText;

    const mensagem = `Olá! Tenho interesse no produto: ${produto}. Pode me passar mais informações?`;

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, "_blank");
  });
});

// FORMULÁRIO CONTATO
const formContato = document.querySelector(".contact-form");

if (formContato) {
  formContato.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;

    alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve entraremos em contato pelo e-mail: ${email}`);

    formContato.reset();
  });
}