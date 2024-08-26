// 게임 상태를 저장하는 변수들
let board = ["", "", "", "", "", "", "", "", ""]; // 3x3 틱택토 보드를 나타내는 배열입니다. 각각의 빈 문자열("")은 아직 클릭되지 않은 상태를 의미합니다.
let currentPlayer = "X"; // 현재 턴을 진행 중인 플레이어를 나타냅니다. 초기값은 "X"로 설정되어 있습니다.
let isGameActive = true; // 게임이 활성화 상태인지 여부를 나타냅니다. 게임이 끝나면 false로 설정됩니다.

// 게임에서 승리할 수 있는 모든 조건을 정의한 배열입니다.
// 각각의 배열은 보드의 인덱스 위치를 나타냅니다.
const winningConditions = [
  [0, 1, 2], // 첫 번째 행이 동일한 경우
  [3, 4, 5], // 두 번째 행이 동일한 경우
  [6, 7, 8], // 세 번째 행이 동일한 경우
  [0, 3, 6], // 첫 번째 열이 동일한 경우
  [1, 4, 7], // 두 번째 열이 동일한 경우
  [2, 5, 8], // 세 번째 열이 동일한 경우
  [0, 4, 8], // 왼쪽 상단에서 오른쪽 하단으로 대각선이 동일한 경우
  [2, 4, 6], // 오른쪽 상단에서 왼쪽 하단으로 대각선이 동일한 경우
];

// HTML에서 각각의 셀(칸) 요소를 가져와서 변수에 저장합니다.
// querySelectorAll을 사용하여 모든 .cell 클래스를 가진 요소를 선택합니다.
const cells = document.querySelectorAll(".cell");

// 게임 메시지를 표시할 HTML 요소를 가져옵니다.
// 이 요소는 승리나 무승부 메시지를 표시하는 데 사용됩니다.
const messageElement = document.getElementById("message");

// 게임을 다시 시작하는 버튼 요소를 가져옵니다.
// 사용자가 이 버튼을 클릭하면 게임이 초기화됩니다.
const restartButton = document.getElementById("restart");

// 메시지를 업데이트하는 함수입니다.
// 매개변수로 전달된 문자열을 HTML 요소에 텍스트로 설정하여 사용자에게 보여줍니다.
function updateMessage(msg) {
  messageElement.textContent = msg;
}

// 승리 조건을 확인하는 함수입니다.
function checkWinner() {
  // 모든 승리 조건을 하나씩 확인합니다.
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i]; // 승리 조건 배열의 각 요소를 가져옵니다.

    // 보드의 해당 위치(a, b, c)에 값이 존재하고, 이 값들이 모두 동일한지 확인합니다.
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // 만약 동일하다면 현재 플레이어가 승리한 것입니다.
      updateMessage(`Player ${board[a]} has won!`); // 승리 메시지를 업데이트합니다.
      isGameActive = false; // 게임을 비활성화합니다. 더 이상 클릭이 발생하지 않습니다.
      return; // 함수를 종료합니다.
    }
  }

  // 무승부를 확인합니다. 보드에 빈 문자열("")이 없으면 무승부입니다.
  if (!board.includes("")) {
    updateMessage("It's a draw!"); // 무승부 메시지를 업데이트합니다.
    isGameActive = false; // 게임을 비활성화합니다.
  }
}

// 사용자가 칸을 클릭했을 때 실행되는 함수입니다.
function handleCellClick(e) {
  const clickedCell = e.target; // 사용자가 클릭한 셀(칸)을 가져옵니다.
  const cellIndex = clickedCell.getAttribute("data-index"); // 클릭한 셀의 인덱스를 가져옵니다.

  // 이미 클릭된 칸이거나 게임이 종료된 상태라면 클릭을 무시합니다.
  if (board[cellIndex] !== "" || !isGameActive) {
    return;
  }

  // 보드의 해당 위치에 현재 플레이어의 표시("X" 또는 "O")를 저장합니다.
  board[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer; // 클릭한 셀에 플레이어의 표시를 추가합니다.

  checkWinner(); // 승리 조건을 확인합니다.

  // 현재 플레이어를 전환합니다.
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // "X"라면 "O"로, "O"라면 "X"로 전환됩니다.
  if (isGameActive) {
    updateMessage(`It's ${currentPlayer}'s turn`); // 다음 플레이어의 턴임을 알려줍니다.
  }
}

// 게임을 다시 시작하는 함수입니다.
function handleRestartGame() {
  board = ["", "", "", "", "", "", "", "", ""]; // 보드를 초기화합니다.
  isGameActive = true; // 게임을 활성화 상태로 만듭니다.
  currentPlayer = "X"; // 첫 번째 플레이어를 "X"로 설정합니다.
  cells.forEach((cell) => (cell.textContent = "")); // 모든 셀의 텍스트를 초기화합니다.
  updateMessage(`It's ${currentPlayer}'s turn`); // 메시지를 초기화합니다.
}

// 각 셀에 클릭 이벤트 리스너를 추가합니다.
// 사용자가 셀을 클릭할 때마다 handleCellClick 함수가 실행됩니다.
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// "Restart Game" 버튼에 클릭 이벤트 리스너를 추가합니다.
// 사용자가 이 버튼을 클릭하면 handleRestartGame 함수가 실행됩니다.
restartButton.addEventListener("click", handleRestartGame);

// 게임이 시작될 때 초기 메시지를 설정합니다.
updateMessage(`It's ${currentPlayer}'s turn`);
