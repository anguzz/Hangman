window.onload = function () {
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z']

  let gameList = [
    ['halo', 'skyrim', 'call of duty', 'fallout', 'pokemon', 'minecraft', 'grand theft auto', 'league of legends', 'rocket league', 'tetris', 'asteroids', 'roblox', 'counter strike',
      'street fighter', 'overwatch', 'fortnite', 'among us', 'team fortress', 'destiny', 'the sims', 'red dead', 'mario', 'super smash bros']
  ]
  let isPlaying = "false"
  let chooseGame
  let gameWord
  let guess
  let guesses = []
  let health
  let counter
  let space
  let btnNull = new Array()
  Stickman = document.getElementById('stickman')
  context = Stickman.getContext('2d')

  const showHealth = document.getElementById('health')


  const buttons = function () {
    Buttons = document.getElementById('buttons')
    letters = document.createElement('ul')
      for (let i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet'
        list = document.createElement('li')
        list.id = 'letter'
        list.innerHTML = alphabet[i]
        if (localStorage.btnNull) {
          for (let k = 0; k < btnNull.length; ++k) {
            if (btnNull[k] === list.innerHTML) {
              list.setAttribute("disabled", "")
              list.setAttribute("class", "active")
            }
          }
        }
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
        space = 1
      } else {
        guess.innerHTML = '_'
      }

      guesses.push(guess)
      wordHolder.appendChild(correct)
      correct.appendChild(guess)
    }
    // local storage
    localStorage.setItem('guesses', JSON.stringify(guesses))
  }

  comments = function () {
    showHealth.innerHTML = '💙' + health
    if (health < 1) {
      showHealth.innerHTML = 'Game Over <br><br> The game was ' + gameWord
    }
    for (let i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showHealth.innerHTML = 'You Win!'
      }
    }
  }

  const animate = function () {
    const drawHealth = health
    drawArray[drawHealth]()
  }

  canvas = function () {
    //Stickman = document.getElementById('stickman')
    //context = Stickman.getContext('2d')
    context.beginPath()
    context.strokeStyle = '#fff'
    context.lineWidth = 2
  }

  head = function () {
    //Stickman = document.getElementById('stickman')
    //context = Stickman.getContext('2d')
    context.beginPath()
    context.arc(60, 25, 10, 0, Math.PI * 2, true)
    context.stroke()
  }

  drawPiece = function ($path_fr_x, $path_fr_y, $path_to_x, $path_to_y) {
    //Stickman = document.getElementById('stickman')
    //context = Stickman.getContext('2d')
    context.moveTo($path_fr_x, $path_fr_y)
    context.lineTo($path_to_x, $path_to_y)
    context.stroke()
  }

  frame1 = function () {
    drawPiece(0, 150, 150, 150)
  }

  frame2 = function () {
    drawPiece(10, 0, 10, 600)
  }

  frame3 = function () {
    drawPiece(0, 5, 70, 5)
  }

  frame4 = function () {
    drawPiece(60, 5, 60, 15)
  }

  torso = function () {
    drawPiece(60, 36, 60, 70)
  }

  rightArm = function () {
    drawPiece(60, 46, 100, 50)
  }

  leftArm = function () {
    drawPiece(60, 46, 20, 50)
  }

  rightLeg = function () {
    drawPiece(60, 70, 100, 100)
  }

  leftLeg = function () {
    drawPiece(60, 70, 20, 100)
  }

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1]

  test = function () {
    if (localStorage.btnNull) {
      showHealth.innerHTML = '💙' + health
      for (let i = 0; i < btnNull.length; i++) {
        for (let k = 0; k < gameWord.length; k++) {
          if (gameWord[k] === btnNull[i]) {
            guesses[k].innerHTML = btnNull[i]
          }
      
          const j = (gameWord.indexOf(guess))
          if (j === -1) {
            animate()
          }
        }
      }
    }
  }

  check = function () {
    var test = 'false'
    if (localStorage.btnNull) {
      for(let i = 0; i < btnNull.length; ++i) {
        if (btnNull[i] === list.innerHTML) {
          list.setAttribute('class', 'active')
          test = 'true'
          for (let k = 0; k < gameWord.length; k++) {
            if (gameWord[k] === btnNull[i]) {
              guesses[k].innerHTML = btnNull[i]
            }
          }
          const l = (gameWord.indexOf(guess))
          if (l === -1) {
          comments()
          animate()
        } else {
          comments()
        }
        }
      }
    }
    list.onclick = function () {
      if (test === 'false') {
        const guess = (this.innerHTML)
        this.setAttribute('class', 'active')
        this.onclick = null
        //local storage
        btnNull.push(guess)
        localStorage.setItem('btnNull', JSON.stringify(btnNull))
        console.log(btnNull)
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
          animate()
          // local storage
          localStorage.setItem('health', health)
        } else {
            comments()
        }
      } else {
        this.onclick = null

      }
    }
  }

  setLocalStorage = function () {
    localStorage.setItem('isPlaying', isPlaying)
    localStorage.setItem('chooseGame', chooseGame)
    localStorage.setItem('gameWord', gameWord)
    localStorage.setItem('guesses', JSON.stringify(guesses))
    localStorage.setItem('health', health)
    localStorage.setItem('counter', counter)
  }

  initializeGame = function () {
    isPlaying = 'true'
    chooseGame = gameList[Math.floor(Math.random() * gameList.length)]
    gameWord = chooseGame[Math.floor(Math.random() * chooseGame.length)]
    gameWord = gameWord.replace(/\s/g, '-')
    guesses = []
    btnNull = new Array()
    health = 10
    counter = 0
    space = 0
    setLocalStorage();
  }

  function playGame() {
    if (localStorage.isPlaying) {
      isPlaying = localStorage.getItem("isPlaying")
      if (isPlaying === 'true') {
        chooseGame = localStorage.getItem('chooseGame')
        gameWord = localStorage.getItem('gameWord')
        health = parseInt(localStorage.getItem('health'))
        counter = parseInt(localStorage.getItem('counter'))
        space = localStorage.getItem('space')
        btnNull = JSON.parse(localStorage.getItem('btnNull'))
        console.log(btnNull)
        context.clearRect(0, 0, 400, 400)
      }
    } else {
      initializeGame()
    }
    //initializeGame()
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
    localStorage.clear()
    isPlaying = "false"
    playGame()
  }
}
