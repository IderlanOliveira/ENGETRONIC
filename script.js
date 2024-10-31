// Seleciona os botões usando IDs
const quemSomosButton = document.getElementById('quem-somos-button');
const nossaMissaoButton = document.getElementById('nossa-missao-button');
const nossoObjetivoButton = document.getElementById('nosso-objetivo-button');

// Função para rolar suavemente até a seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Adiciona eventos de clique aos botões
quemSomosButton.addEventListener('click', () => scrollToSection('quem-somos'));
nossaMissaoButton.addEventListener('click', () => scrollToSection('nossa-missao'));
nossoObjetivoButton.addEventListener('click', () => scrollToSection('nosso-objetivo'));

function redirecionarParaWhatsApp() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let telefone = this.getAttribute("data-phone");
    let mensagem = encodeURIComponent(this.getAttribute("data-mensagem"));

    if (/android|ipad|iphone|ipod/.test(userAgent.toLowerCase())) {
        window.location.href = "whatsapp://send?phone=" + telefone + "&text=" + mensagem;
    } else {
        window.open("https://web.whatsapp.com/send?phone=" + telefone + "&text=" + mensagem, "_blank");
    }
}

// Adiciona o evento de clique aos botões do WhatsApp
let buttons = document.querySelectorAll(".btn-whatsapp");
buttons.forEach(function(button) {
    button.addEventListener("click", redirecionarParaWhatsApp);
});

// Adiciona o evento de clique ao botão que rola para a seção "planos"
document.getElementById('button').addEventListener('click', function() {
    var elemento = document.getElementById('planos');
    elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
