const players = ['❌','⭕️'];
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
  
    // let check = checkBoard();
    // if (check !== false) {
    //   gameEnd(check);
    // }
    checkBoard();
  
  } else {
    document.getElementById('info').innerHTML = 'Cell has been taken! Try another cell.<br>Player: ' + players[play];
  }
}


function checkBoard() {
  console.log('\ncheckboard()');

  
  // all winning cell combinations listed
  winningLines = [['cell1', 'cell2', 'cell3'], ['cell4', 'cell5', 'cell6'], ['cell7', 'cell8', 'cell9'],
                  ['cell1', 'cell4', 'cell7'], ['cell2', 'cell5', 'cell8'], ['cell3', 'cell6', 'cell9'],
                  ['cell1', 'cell5', 'cell9'], ['cell3', 'cell5', 'cell7']];


  // check if we have a winner
  let foundWinner = false;
  let winningLine = undefined;
  winningLines.forEach((line) => {
    if (document.getElementById(line[0]).innerHTML === players[0] || document.getElementById(line[0]).innerHTML === players[1]) {
      if (line.every(value => document.getElementById(value).innerHTML === document.getElementById(line[0]).innerHTML)) {
        foundWinner = true;
        winningLine = line;
      }
    }
  });


  // check if we have a draw
  let finished = true;
  if (foundWinner === false) {
    winningLines.forEach((line) => {
      if (line.some(cell => document.getElementById(cell).innerHTML === ' ')) {
        finished = false;
      }
    });
  }

  if (finished) {
    gameEnd(foundWinner, winningLine);
  }

  // return foundWinner;
}

function gameEnd(foundWinner, winningLine) {

  document.getElementById('reset-button').style.visibility = 'visible';

  cellIds.forEach((cell) => {
    document.getElementById(cell).disabled = true;
  })

  if (foundWinner === false) {
    document.getElementById('info').innerHTML = 'DRAW!';
    cellIds.forEach((cell) => {
      document.getElementById(cell).style.backgroundColor = '#FFFF85';
    })
  } else {
    document.getElementById('info').innerHTML = 'WINNER:  ' + document.getElementById(winningLine[0]).innerHTML + '!';
    console.log(winningLine);
    // document.body.style.backgroundColor = '#9EE493';
    winningLine.forEach((cell) => {
      document.getElementById(cell).style.backgroundColor = '#9EE493';
    })
  }

}


function resetGame() {

  document.body.style.backgroundColor = '#FFFFFF';

  document.getElementById('heading').innerHTML = 'Tic Tac Toe';

  cellIds.forEach((cell) => {
    document.getElementById(cell).disabled = false;
    document.getElementById(cell).innerHTML = ' ';
    document.getElementById(cell).style.backgroundColor = '#FFFFFF'; 
  })

  document.getElementById('info').innerHTML = 'Welcome!<br>Player 1: Click a square for your first move!';
  document.getElementById('reset-button').style.visibility = 'hidden';
  document.getElementById('reset-button').innerHTML = 'Reset Game';
  
  let copyright = document.getElementById('copyright');
  if (copyright.innerHTML === '') {
    copyright.appendChild(document.createTextNode(new Date().getFullYear()))
  }
  

}

resetGame();