const players = ['X','O'];
let play = 0;

function cellClicked(id) {
  document.getElementById(id).innerHTML = players[play];
  
  if(play === 0) {
    play = 1;
  } else {
    play  = 0;
  }

  // update info panel to next plater
  document.getElementById('info').innerHTML = 'Next Player: ' + players[play];

  let check = checkBoard();
  if (check !== false) {
    if (check === 'DRAW!') {
      document.getElementById('info').innerHTML = 'DRAW!';
    } else {
      document.getElementById('info').innerHTML = 'WINNER:  ' + check + '!';
    }
  }
  
}


function checkBoard() {

  const cell1 = document.getElementById('cell1').innerHTML;
  const cell2 = document.getElementById('cell2').innerHTML;
  const cell3 = document.getElementById('cell3').innerHTML;
  const cell4 = document.getElementById('cell4').innerHTML;
  const cell5 = document.getElementById('cell5').innerHTML;
  const cell6 = document.getElementById('cell6').innerHTML;
  const cell7 = document.getElementById('cell7').innerHTML;
  const cell8 = document.getElementById('cell8').innerHTML;
  const cell9 = document.getElementById('cell9').innerHTML;
  
  // all winning cell combinations listed
  winningLines = [[cell1, cell2, cell3], [cell4, cell5, cell6], [cell7, cell8, cell9],
                  [cell1, cell4, cell7], [cell2, cell5, cell8], [cell3, cell6, cell9],
                  [cell1, cell5, cell9], [cell3, cell5, cell7]];


  // check if we have a winner
  let foundWinner = false;
  winningLines.forEach((line) => {
    if (line[0] === players[0] || line[0] === players[1]) {
      if (line.every(value => value === line[0])) {
        foundWinner = line[0];
      }
    }
  });


  // check if we have a draw
  let finished = true;
  if (foundWinner === false) {
    winningLines.forEach((line) => {
      if (line.some(cell => cell === "")) {
        finished = false;
      }
    });
  }

  if (finished && foundWinner === false) {
    foundWinner = "DRAW!"
  }

  return foundWinner;
}