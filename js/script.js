const players = ['X','O'];
let play = 0;

const cellIds = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6', 'cell7', 'cell8', 'cell9'];

function cellClicked(id) {
  // check selected cell is empty
  console.log(id);
  if (document.getElementById(id).innerHTML === ' ') {
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
      gameEnd(check);
    }
  
  } else {
    document.getElementById('info').innerHTML = 'Cell has been taken! Try another cell.<br>Player: ' + players[play];
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

  console.log('\ncheckBoard()');
  console.log(winningLines);
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
      if (line.some(cell => cell === ' ')) {
        finished = false;
      }
    });
  }

  if (finished && foundWinner === false) {
    foundWinner = 'DRAW!'
  }

  return foundWinner;
}

function gameEnd(winner) {
  document.getElementById('reset-button').style.visibility = 'visible';

  cellIds.forEach((cell) => {
    document.getElementById(cell).disabled = true;
  })

  if (winner === 'DRAW!') {
    document.getElementById('info').innerHTML = 'DRAW!';
    document.body.style.backgroundColor = '#FFFF85';
  } else {
    document.getElementById('info').innerHTML = 'WINNER:  ' + winner + '!';
    document.body.style.backgroundColor = '#9EE493';
  }

}


function resetGame() {

  document.body.style.backgroundColor = '#FFFFFF';

  document.getElementById('heading').innerHTML = 'Tic Tac Toe';

  cellIds.forEach((cell) => {
    document.getElementById(cell).disabled = false;
    document.getElementById(cell).innerHTML = ' ';
  })

  document.getElementById('info').innerHTML = 'Welcome!<br>Player 1: Click a square for your first move!';
  document.getElementById('reset-button').style.visibility = 'hidden';
  document.getElementById('reset-button').innerHTML = 'Reset Game';

}

resetGame();