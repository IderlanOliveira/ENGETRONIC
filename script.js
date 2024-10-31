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

console.log("Testando se ta ok");