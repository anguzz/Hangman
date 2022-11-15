window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var gameList;         
  var chooseGame;   
  var gameWord;              
  var guess;           
  var guesses = [ ];   
  var health ;             
  var counter ;          
  var space;              


  var showHealth = document.getElementById("health");

  var buttons = function () {
  Buttons = document.getElementById('buttons');
    letters = document.createElement('ul');
    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      Buttons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectGame = function () {
    chooseGame === gameList[0];
   
  }


   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < gameWord.length; i++) {
      correct.setAttribute('id', 'guessedLetter');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (gameWord[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  

   comments = function () {
    showHealth.innerHTML =   "💙"+ health;
    if (health < 1) {
      showHealth.innerHTML = "Game Over <br><br> The game was " + gameWord;
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showHealth.innerHTML = "You Win!";
      }
    }
  }

      
  var animate = function () {
    var drawHealth = health ;
    drawArray[drawHealth]();
  }

  canvas =  function(){
    Stickman = document.getElementById("stickman");
    context = Stickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      Stickman = document.getElementById("stickman");
      context = Stickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  drawPiece = function($path_fr_x, $path_fr_y, $path_to_x, $path_to_y) {
    
    context.moveTo($path_fr_x, $path_fr_y);
    context.lineTo($path_to_x, $path_to_y);
    context.stroke(); 
}

   frame1 = function() {
    drawPiece (0, 150, 150, 150);
   };
   
   frame2 = function() {
    drawPiece (10, 0, 10, 600);
   };
  
   frame3 = function() {
    drawPiece (0, 5, 70, 5);
   };
  
   frame4 = function() {
    drawPiece (60, 5, 60, 15);
   };
  
   torso = function() {
    drawPiece (60, 36, 60, 70);
   };
  
   rightArm = function() {
    drawPiece (60, 46, 100, 50);
   };
  
   leftArm = function() {
    drawPiece (60, 46, 20, 50);
   };
  
   rightLeg = function() {
    drawPiece (60, 70, 100, 100);
   };
  
   leftLeg = function() {
    drawPiece (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


   check = function () {
    list.onclick = function () {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        } 
      }
      var j = (gameWord.indexOf(guess));
      if (j === -1) {
        health -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    

  playGame = function () {
    gameList = [
      ["halo", "skyrim", "call of duty", "fallout", "pokemon","minecraft","grand theft auto", "league of legends","rocket league","tetris","asteroids","roblox","counter strike",
      "street fighter","overwatch","fortnite","among us","team fortress","destiny","the sims","red dead","mario","super smash bros"]
    ];

    chooseGame = gameList[Math.floor(Math.random() * gameList.length)];
    gameWord = chooseGame[Math.floor(Math.random() * chooseGame.length)];
    gameWord = gameWord.replace(/\s/g, "-");
    console.log(gameWord);
    buttons();

    guesses = [ ];
    health = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectGame();
    canvas();
  }

  playGame();
  
 
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    context.clearRect(0, 0, 400, 400);
    playGame();
  }
}


