let lastStarter = sessionStorage.getItem('lastStarter') || 'O';
let turn = lastStarter === 'X' ? 'O' : 'X';
sessionStorage.setItem('lastStarter', turn);

let title = document.querySelector('.title');

// حالة انتهاء الجولة
let gameOver = false;

// تجميع الخانات
let items = [];
for (let i = 1; i <= 9; i++) {
  items[i] = document.getElementById(`item${i}`);
}

// عدادات
let countX = parseInt(sessionStorage.getItem('countX')) || 0;
let countO = parseInt(sessionStorage.getItem('countO')) || 0;

// عرض النتيجة
let scoreDisplay = document.createElement('h2');
document.body.prepend(scoreDisplay);
updateScore();

// جميع حالات الفوز
const winCases = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

function updateScore() {
  scoreDisplay.innerHTML = `X : ${countX} — O : ${countO}`;
}

function finishGame(player, a, b, c) {
  gameOver = true;

  items[a].style.background =
  items[b].style.background =
  items[c].style.background = 'green';

  if (player === 'X') {
    countX++;
    sessionStorage.setItem('countX', countX);
  } else {
    countO++;
    sessionStorage.setItem('countO', countO);
  }

  updateScore();
  title.innerHTML = `${player} هو الفائز`;
  setInterval(() => title.innerHTML += '.', 1000);
  setTimeout(() => location.reload(), 4000);
}

function winner() {
  for (let [a, b, c] of winCases) {
    if (
      items[a].innerHTML &&
      items[a].innerHTML === items[b].innerHTML &&
      items[b].innerHTML === items[c].innerHTML
    ) {
      finishGame(items[a].innerHTML, a, b, c);
      return;
    }
  }
}

function draw() {
  if (gameOver) return;

  if (items.slice(1).every(item => item.innerHTML !== '')) {
    gameOver = true;
    title.innerHTML = 'تعادل';
    setInterval(() => title.innerHTML += '.', 1000);
    setTimeout(() => location.reload(), 4000);
  }
}

function game(id) {
  if (gameOver) return;

  let ele = document.getElementById(id);
  if (ele.innerHTML !== '') return;

  ele.innerHTML = turn;
  turn = turn === 'X' ? 'O' : 'X';
  title.innerHTML = `دور ${turn}`;

  winner();
  draw();
}
