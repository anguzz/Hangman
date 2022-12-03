window.onload = function () {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z']
  
  //moved this up here because of my initilizeGame() function
  const gameList = [
    ["halo", "skyrim", "call of duty", "fallout", "pokemon","minecraft","grand theft auto", "league of legends","rocket league","tetris","asteroids","roblox","counter strike",
      "street fighter","overwatch","fortnite","among us","team fortress","destiny","the sims","red dead","super mario","super smash bros", "god of war","bioshock","portal","bloodborne",
    "dark souls","world of warcraft","stardew valley","terraria","undertale","pac man","borderlands","mortal kombat","crash bandicoot","metal gear solid","resident evil","mass effect","tekken",
    "half life","uncharted","elden ring","tony hawk pro skater", "diablo","the legend of zelda","space invaders","metroid","metal slug","fallout new vegas","the witcher","max payne","cuphead",
    "path of exile","dead cells","starbound","rust","ark survival evolved","final fantasy","angry birds","need for speed","valorant","apex legends",
    ]
  ]

  let chooseGame
  let gameWord
  let guess
  let guesses = []
  let health
  let counter
  let space
  //had to move these up here or else i'd get errors that they weren't defined
  // I don't know why
  Stickman = document.getElementById('stickman')
  context = Stickman.getContext('2d')
  //-----Local Storage variables-----//
  //array that keeps track of keys that have been pressed, in other words,
  //which letters have been selected / guessed
  let keyPressed = []
  //counter for drawing stickman on game continuation
  let wrong = 8

  let showHealth = document.getElementById("health");

  const buttons = function () {
    Buttons = document.getElementById('buttons')
    letters = document.createElement('ul')
      for (let i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet'
        list = document.createElement('li')
        list.id = 'letter'
        list.innerHTML = alphabet[i]
        check()
        Buttons.appendChild(letters)
        letters.appendChild(list)
      }
  }
  
  // Select Catagory
  const selectGame = function () {
    chooseGame === gameList[0]
  }

  result = function () {
    wordHolder = document.getElementById('hold')
    correct = document.createElement('ul')

    for (let i = 0; i < gameWord.length; i++) {
      correct.setAttribute('id', 'guessedLetter')
      guess = document.createElement('li')
      guess.setAttribute('class', 'guess')
      if (gameWord[i] === '-') {
        guess.innerHTML = '-'
        space += 1
      } else {
        guess.innerHTML = '_'
      }

      guesses.push(guess)
      wordHolder.appendChild(correct)
      correct.appendChild(guess)
    }
  }

  comments = function () {
    Buttons = document.getElementById('buttons')
    showHealth.innerHTML = '💙' + health
    if (health < 1) {
      showHealth.innerHTML = 'Game Over <br><br> The game was ' + gameWord
      Buttons.style.display = 'none'
    }
    for (let i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showHealth.innerHTML = 'You Win!'
        Buttons.style.display = 'none'
      }
    }
  }
  //changed the function to recieve an argument 
  //instead of directly setting drawhealth equal to health
  //did this for local storage functionality -- Michael
  let animate = function (wGuesses) {
    let drawHealth = wGuesses;
    drawArray[drawHealth]();
  }

  canvas =  function(){
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
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
    //to see if a key was previously pressed before continuing the game
    let press = 'false'
    //all this code before the click event is to update the display
    //with all the previous information from the game before it was continued
    //
    //so far this is the best way I could think of to implement game continuation
    //if you guys have any better implementations feel free to change the code --Micheal
    if (localStorage.keyPressed) {
      for (let i = 0; i < keyPressed.length; ++i) {
        if (keyPressed[i] === list.innerHTML) {
          list.setAttribute('class', 'active')
          press = 'true'
          for (let k = 0; k < gameWord.length; k++) {
            if (gameWord[k] === keyPressed[i]) {
              guesses[k].innerHTML = keyPressed[i]
            }
          }
          const l = (gameWord.indexOf(keyPressed[i]))
          if (l === -1) {
            wrong -= 1
            comments()
            animate(wrong)
          } else {
            comments()
          }
        }
      }
    }
    list.onclick = function () {
      if (press === 'false') {
        const guess = (this.innerHTML)
        this.setAttribute('class', 'active')
        //local storage
        keyPressed.push(guess)
        localStorage.setItem('keyPressed', JSON.stringify(keyPressed))
        //debug purposes
        console.log(keyPressed)
        for (let i = 0; i < gameWord.length; i++) {
          if (gameWord[i] === guess) {
            guesses[i].innerHTML = guess
            counter += 1
            // local storage
            localStorage.setItem('counter', counter)
          }
        }
        const j = (gameWord.indexOf(guess))
        if (j === -1) {
          health -= 1
          comments()
          animate(health)
          // local storage
          localStorage.setItem('health', health)
        } else {
            comments()
        }
      }
      this.onclick = null
    }
  }

  setLocalStorage = function () {
    localStorage.setItem('chooseGame', chooseGame)
    localStorage.setItem('gameWord', gameWord)
    localStorage.setItem('health', health)
    localStorage.setItem('counter', counter)
    localStorage.setItem('space', space)
  }

  //this function is used to setup a new game
  initializeGame = function () {
    chooseGame = gameList[Math.floor(Math.random() * gameList.length)]
    gameWord = chooseGame[Math.floor(Math.random() * chooseGame.length)]
    gameWord = gameWord.replace(/\s/g, '-')
    guesses = []
    keyPressed = []
    health = 8
    counter = 0
    space = 0
    wrong = health
    setLocalStorage();
  }

  function playGame() {
    //if game is being continued, use local storage
    //to set variables to previous values and continue the game
    if (localStorage.chooseGame) {
      chooseGame = localStorage.getItem('chooseGame')
      gameWord = localStorage.getItem('gameWord')
      health = parseInt(localStorage.getItem('health'))
      counter = parseInt(localStorage.getItem('counter'))
      space = 0
      //if checks if localStorage.keyPressed exists before assigning
      //it to the variable, to avoid potential errors
      if (localStorage.keyPressed) {
        keyPressed = JSON.parse(localStorage.getItem('keyPressed'))
      }
      //debug purposes
      console.log(keyPressed)
    } else { // else setup a new game
      initializeGame()
    }
    //debug purposes
    console.log(gameWord)
    result()
    buttons()
    comments()
    selectGame()
    canvas()
  }

  playGame()

  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct)
    letters.parentNode.removeChild(letters)
    context.clearRect(0, 0, 400, 400)
    Buttons.style.display = 'block'
    //clear the local storage
    localStorage.clear()
    playGame()
  }
}


