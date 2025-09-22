const emojiRules = {
  "😡": -99,
  "😠": -20,
  "😊": +20,
  "😄": +20,
  "😞": -10,
  "😎": +10,
  "😘": +10,
  "🤗": +10,
  "👿": -20,
  "🤬": -30,
  "🥳": +30
};

const boardLayout = [
  "😀", "😡", "😊", "😞", "😎", "😁", "🤬", "🥳", "🙈", "😊",   // row10 (bottom)
  "😄", "🙊", "😘", "😠", "😐", "😋", "😍", "🥰", "🤩", "😇",   // row9
  "😞", "😎", "😁", "🙄", "😥", "😫", "🫠", "😲", "😖", "😱",   // row8
  "😡", "😄", "😉", "😋", "😍", "🥰", "🤩", "😐", "🙄", "😥",   // row7
  "😘", "😎", "🥳", "🙊", "🙈", "🤗", "😞", "👿", "😎", "😋",   // row6
  "😡", "🤬", "😊", "😄", "😞", "😁", "😋", "😍", "🥰", "🤩",   // row5
  "😇", "🥹", "🤠", "🥸", "🙈", "🙉", "🙊", "🤗", "😘", "😎",   // row4
  "👿", "😫", "🫠", "😲", "😖", "😱", "😄", "🙄", "😥", "🤬",   // row3 
  "🤗", "😡", "😎", "😠", "😎", "😘", "😞", "😁", "🙊", "🙉",   // row2 
  "😀", "😞", "🤩", "😍", "😇", "😡", "😍", "😋", "🥰", "😄"    // row1 
];

const board = document.getElementById("board");
let playerPos = -1;
let started = false;

function renderBoard() {
  board.innerHTML = "";
  for (let i = 99; i >= 0; i -= 10) {
    let rowCells = [];
    for (let j = 0; j < 10; j++) {
      let index = (Math.floor(i / 10) % 2 === 0) ? (i - j) : (i - (9 - j));
      const cell = document.createElement("div");
      cell.classList.add("cell");

      let emoji = boardLayout[index];

      // Corner label for ladders/snakes
      if (emojiRules[emoji]) {
        const moveValue = emojiRules[emoji];
        const label = document.createElement("div");
        label.classList.add("corner-label");
        label.textContent = moveValue > 0 ? `+${moveValue}` : `${moveValue}`;
        cell.appendChild(label);

        if (moveValue > 0) cell.classList.add("ladder");
        if (moveValue < 0) cell.classList.add("snake");
      }

      // Emoji itself
      const emojiSpan = document.createElement("span");
      emojiSpan.textContent = emoji;
      cell.appendChild(emojiSpan);

      // Player marker
      if (index === playerPos) {
        cell.classList.add("player");
      }

      rowCells.push(cell);
    }
    rowCells.forEach(c => board.appendChild(c));
  }
}

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("status").textContent = `🎲 You rolled: ${dice}`;

  if (!started) {
    if (dice === 6) {
      playerPos = 0;
      started = true;
    }
    renderBoard();
    return;
  }

  playerPos += dice;
  if (playerPos >= 99) {
    playerPos = 99;
    document.getElementById("status").textContent = "🎉 You won!";
  } else {
    let emoji = boardLayout[playerPos];
    if (emojiRules[emoji]) {
      playerPos += emojiRules[emoji];
      if (playerPos < 0) playerPos = 0;
      if (playerPos > 99) playerPos = 99;
    }
  }
  renderBoard();
}

document.getElementById("rollBtn").addEventListener("click", rollDice);

renderBoard();
