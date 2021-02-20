
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls the dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- IF if the rolled dices were 6 twice in a row, the player LOSES all his acumulated GLOBAL score and it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach the Limit Score points on GLOBAL score wins the game
*/



var scores, roundScore, activePlayer, changePlayer,newGame, init, disBtns, idSelec, btnSelec, gameStarted, prevDice,prevDice2, funcScore, maxScore;

	init = function(){
		prevDice=0;
		prevDice2=0;
		gameStarted = true;
		scores = [0,0];
		roundScore = 0;
		activePlayer = 0;
		newGame();
	};

	changePlayer = function(){

		activePlayer === 0 ? activePlayer = 1: activePlayer=0;
		document.querySelector(`.player-0-panel`).classList.toggle('active');
		document.querySelector(`.player-1-panel`).classList.toggle('active');
		prevDice = 0;
		prevDice2 = 0;
	};

	idSelec = document.querySelectorAll("#btn3,#btn2");
	btnSelec = document.querySelectorAll(".btn-roll, .btn-hold");

	newGame = function(){

		document.getElementById(`name-${activePlayer}`).innerHTML = `Player ${activePlayer + 1}`;
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.dice-2').style.display = 'none';

		for(i=0;i<2;i++){

			document.querySelector(`.player-${i}-panel`).classList.remove('active');
			document.querySelector(`.player-${i}-panel`).classList.remove('winner');
			document.getElementById(`score-${i}`).textContent = '0';
			document.getElementById(`current-${i}`).textContent = '0';
			idSelec[i].style.color = '#EB4D4D';
			btnSelec[i].disabled = false;
		};

		document.querySelector(`.player-0-panel`).classList.add('active');
		scores = [0,0];
		roundScore = 0;
		activePlayer = 0;
		gameStarted = true;
		funcScore();

	};
	disBtns = function(){

		if (idSelec[0].style.color === '#808080'){
			for (var i = 0; i < idSelec.length; i++){
				idSelec[i].style.color = '#EB4D4D';
			}
		}else {
			for (var i = 0; i < idSelec.length; i++){
				idSelec[i].style.color = '#808080';
			}
		}
	}
	funcScore = function(scores_1, scores_2){

		maxScore = parseFloat(document.querySelector('#maxScore').value);
		scores_1 = parseInt(this.scores[0]);
		scores_2 = parseInt(this.scores[1]);

		if(scores_1===0 && scores_2===0){
			document.querySelector('#maxScore').disabled = false;
		} else{
			document.querySelector('#maxScore').disabled = true;
		};
	};
// Initiate game;
init()


//roll button
	document.querySelector('.btn-roll').addEventListener('click',function(){
		if(gameStarted === true) {

			//1. Random number.
			var dice = Math.floor(Math.random()*6)+1;
			var dice2 = Math.floor(Math.random()*6)+1;


			//2. Display the result
			var diceDOM = document.querySelector('.dice');
			diceDOM.style.display = 'block';
			diceDOM.src = `dice-${dice}.png`;

			var diceDOM2 = document.querySelector('.dice-2');
			diceDOM2.style.display = 'block';
			diceDOM2.src = `dice-${dice2}.png`;

			//3. Update the round score IF the rolled number was not 1 or if the rolled dices were not 6 twice in a row
			if (prevDice + dice === 12||prevDice2 + dice === 12||prevDice2 + dice === 12||prevDice2 + dice2 === 12) {
				roundScore = 0;
				scores[activePlayer]=0;
				document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
				document.querySelector("#score-" + activePlayer).innerHTML = roundScore;
				changePlayer();
			}
			else if (dice !== 1&&dice2 !== 1){
				roundScore += dice + dice2;
				document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
				prevDice = dice;
				prevDice2= dice2;
			}
			else {

				roundScore = 0;
				document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
				changePlayer();
			}
		}
	});

	//hold button

		document.querySelector('.btn-hold').addEventListener('click',function(){

			if(gameStarted === true) {

				//1. Hide dice

				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.dice-2').style.display = 'none';

				//1. Save current score to player score and set score to 0

				scores[activePlayer] += roundScore;
				document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
				funcScore();
				roundScore = 0;
				document.querySelector("#current-" + activePlayer).innerHTML = roundScore;

				// check for winner

				if (scores[activePlayer]>=maxScore){
					document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
					document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
					document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
					roundScore = 0;
					gameStarted = false;
					disBtns();
				}

				//change current player

				else {
					changePlayer();
				};
			}
		});

	//new game button

		document.querySelector('.btn-new').addEventListener('click',function(){

			newGame();

		});

