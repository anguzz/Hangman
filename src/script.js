window.onload = function () {

  var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
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
    for (var i = 0; i < alph.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alph[i];
      check();
      Buttons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
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

   base = function() {
    drawPiece (0, 150, 150, 150);
    drawPiece (10, 0, 10, 600);
   };
   
   knott = function() {
    drawPiece (0, 5, 70, 5);
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
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, knott, base]; 


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
  
    
//currently not using numbers/capitalized letters since input is from declared 1-26 lowercase alphabet
  playGame = function () {
    gameList = [
      ["halo", "skyrim", "call of duty", "fallout", "pokemon","minecraft","grand theft auto", "league of legends","rocket league","tetris","asteroids","roblox","counter strike",
      "street fighter","overwatch","fortnite","among us","team fortress","destiny","the sims","red dead","super mario","super smash bros", "god of war","bioshock","portal","bloodborne",
    "dark souls","world of warcraft","stardew valley","terraria","undertale","pac man","borderlands","mortal kombat","crash bandicoot","metal gear solid","resident evil","mass effect","tekken",
    "half life","uncharted","elden ring","tony hawk pro skater", "diablo","the legend of zelda","space invaders","metroid","metal slug","fallout new vegas","the witcher","max payne","cuphead",
    "path of exile","dead cells","starbound","rust","ark survival evolved","final fantasy","angry birds","need for speed","valorant","apex legends",
    ]
    ];

    chooseGame = gameList[Math.floor(Math.random() * gameList.length)];
    gameWord = chooseGame[Math.floor(Math.random() * chooseGame.length)];
    gameWord = gameWord.replace(/\s/g, "-");
    console.log(gameWord);
    buttons();

    guesses = [ ];
    health = 8;
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


