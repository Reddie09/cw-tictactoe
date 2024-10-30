const CLASSE_X = 'x';
const CLASSE_O = 'o';
const COMBINACOES_VITORIA = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const elementosCelula = document.querySelectorAll('[data-celula]');
const tabuleiro = document.getElementById('tabuleiro');
const mensagemVitoriaElemento = document.getElementById('mensagem-vitoria');
const mensagemVitoriaTextoElemento = document.querySelector('[data-mensagem-vitoria-texto]');
const botaoReiniciar = document.getElementById('botaoReiniciar');
let turnoO;

iniciarJogo();

botaoReiniciar.addEventListener('click', reiniciarJogo);

function iniciarJogo() {
  turnoO = false;
  elementosCelula.forEach(celula => {
    celula.classList.remove(CLASSE_X, CLASSE_O);
    celula.innerText = ''; 
    celula.removeEventListener('click', lidarClique);
    celula.addEventListener('click', lidarClique, { once: true });
  });
  setClasseHoverTabuleiro();
  mensagemVitoriaElemento.classList.add('esconder');
}

function reiniciarJogo() {
  mensagemVitoriaElemento.classList.add('esconder');
  iniciarJogo();
}

function lidarClique(e) {
  const celula = e.target;
  const classeAtual = turnoO ? CLASSE_O : CLASSE_X;
  marcar(celula, classeAtual);
  if (verificarVitoria(classeAtual)) {
    finalizarJogo(false);
  } else if (empate()) {
    finalizarJogo(true);
  } else {
    trocarTurno();
    setClasseHoverTabuleiro();
  }
}

function finalizarJogo(empate) {
  if (empate) {
    mensagemVitoriaTextoElemento.innerText = "Empate!";
  } else {
    mensagemVitoriaTextoElemento.innerText = `${turnoO ? "O" : "X"} venceu!`;
  }
  mensagemVitoriaElemento.classList.remove('esconder');
}

function empate() {
  return [...elementosCelula].every(celula => {
    return celula.classList.contains(CLASSE_X) || celula.classList.contains(CLASSE_O);
  });
}

function marcar(celula, classeAtual) {
  celula.classList.add(classeAtual);
  celula.innerText = classeAtual.toUpperCase();
}

function trocarTurno() {
  turnoO = !turnoO;
}

function setClasseHoverTabuleiro() {
  tabuleiro.classList.remove(CLASSE_X, CLASSE_O);
  if (turnoO) {
    tabuleiro.classList.add(CLASSE_O);
  } else {
    tabuleiro.classList.add(CLASSE_X);
  }
}

function verificarVitoria(classeAtual) {
  return COMBINACOES_VITORIA.some(combinacao => {
    return combinacao.every(indice => {
      return elementosCelula[indice].classList.contains(classeAtual);
    });
  });
}
