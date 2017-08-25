class Game {

  constructor(mode) {
    this.running = false
    this.currentRow = 1
    this.timeNow = 0
    this.gameWrapper = document.getElementById('game-wrapper')
    this.adapter = new UsersAdapter()
    this.song = new Song
    this.mode = mode
    this.song.generateRows(mode)
    this.gameWrapper.innerHTML = this.song.rows.slice().reverse().map(e => e.render()).join("")
    this.allSelectedBlocks = Array.prototype.slice.apply(document.querySelectorAll(".selected")).reverse()
    this.translateValue =  -150 * (this.song.rows.length-3)
    this.gameWrapper.style.transform = `translateY(${this.translateValue}px)`
    this.start = null
    this.speed = 4
    this.copy = this.allSelectedBlocks.slice()
  }

  static renderMenu() {
    return `
    <h3 id="error"></h3>
    <h1 class="title">Piano Tiles</h1>
    <button data-action="classic" class="menu-button">Classic</button>
    <button data-action="arcade" class="menu-button">Arcade</button><br>
    <button data-action="high-scores" data-mode="classic" class="menu-button">High Scores</button>`
  }

  static resetClock(mode){
    let timerEl = document.getElementById('timer')
    if (mode === 'classic') {
      timerEl.innerHTML = `0.000`
    } else {
      timerEl.innerHTML = `0`
    }
    TweenMax.to(timerEl, .6, {y: 0, color: 'red', fontSize: '2em', ease: 'Power2'})
  }

  timer(timestamp) {
    if (this.running){
    this.timeNow += 16.6
    document.getElementById('timer').innerHTML = `${(this.timeNow/1000).toFixed(3)}`
    window.requestAnimationFrame(this.timer.bind(this));
    }
  }


  moveBlocks(timestamp) {
    if (this.running) {
      let nextBlock = this.copy[0]
      if (!nextBlock.classList.contains('correct')) {
        if (nextBlock.getBoundingClientRect().top > 557) {
          this.loseArcade()
          clearInterval(this.setter)
        }
      }
      this.translateValue += this.speed
      this.gameWrapper.style.transform = `translate3d(0, ${this.translateValue}px, 0)`
      window.requestAnimationFrame(this.moveBlocks.bind(this))
    }
  }

  incrementSpeed() {
    this.setter = setInterval(function() { this.speed += 2; console.log('faster') }.bind(this), 4000)
  }

  renderScore() {
    document.getElementById('timer').innerHTML = `${this.arcadeScore}`
  }

   winGame(){
    window.removeEventListener('keydown', this.keyHandler)
    this.running = false
    let winGameEl = document.getElementById('win-game')
    let timerEl = document.getElementById('timer')
    document.getElementById('win-game').innerHTML = `<h1>You won</h1><p>Please enter your initials</p>
    <form id="initialsForm"><input type="text" maxlength="3" id="initialsInput"></form>
    `
    let adapter = this.adapter
    let timeNow = (this.timeNow/1000).toFixed(3)
    let gameType = this.mode
    document.getElementById('initialsForm').addEventListener('submit', function(e){
    let userInitials = document.getElementById('initialsInput').value.toUpperCase()
      e.preventDefault()
      adapter.createUser(userInitials, timeNow, gameType).catch((error) => {
        App.homeMenu()
        document.getElementById('error').innerHTML = "Server's not running"
      }).then(() => App.fetchHighScores(gameType))
      TweenMax.to(winGameEl, .5, {autoAlpha:0})
    })
    TweenMax.to(timerEl, .6, {y: 100, color: 'white', fontSize: '3em', ease: 'Power2'})
    TweenMax.to(winGameEl, .5, {autoAlpha: 1, ease: 'Power2'})
    document.getElementById('win-game').addEventListener('click', App.startGame)
  }

   loseGame(){
    window.removeEventListener('keydown', this.keyHandler)
    this.running = false
    let loseGameEl = document.getElementById('lose-game')
    let timerEl = document.getElementById('timer')
    loseGameEl.innerHTML = `<h1>You lost</h1>
    <button data-action="classic" class="menu-button">Play again</button>
    <button data-action="high-scores" data-mode="classic" class="menu-button">High Scores</button><br>
    <button data-action="home-menu" class="menu-button">Main Menu</button>`
    TweenMax.to(loseGameEl, .5, {autoAlpha: 1, ease: 'Power2'})
    TweenMax.to(timerEl, .6, {y: 100, color: 'white', fontSize: '3em', ease: 'Power2'})
    document.getElementById('lose-game').addEventListener('click', App.startGame)
  }

  loseArcade(){
   window.removeEventListener('keydown', this.keyHandler)
   this.running = false
   let loseGameEl = document.getElementById('lose-game')
   let timerEl = document.getElementById('timer')
   loseGameEl.innerHTML = `<h1>Game Over</h1><p>Please enter your initials</p>
   <form id="initialsForm"><input type="text" maxlength="3" id="initialsInput"></form>
   <button data-action="arcade" class="menu-button">Play again</button>
   <button data-action="high-scores" data-mode="arcade" class="menu-button">High Scores</button><br>
   <button data-action="home-menu" class="menu-button">Main Menu</button>`
    TweenMax.to(loseGameEl, .5, {autoAlpha: 1, ease: 'Power2'})
   let adapter = this.adapter
   let arcadeScore = this.arcadeScore
   let gameType = this.mode
   document.getElementById('initialsForm').addEventListener('submit', function(e){
   let userInitials = document.getElementById('initialsInput').value.toUpperCase()
     e.preventDefault()
     adapter.createUser(userInitials, arcadeScore, gameType).catch((error) => {
       App.homeMenu()
       document.getElementById('error').innerHTML = "Server's not running"
     }).then(() => App.fetchHighScores(gameType))
     TweenMax.to(loseGameEl, .5, {autoAlpha:0})
   })
   TweenMax.to(timerEl, .6, {y: 100, color: 'white', fontSize: '3em', ease: 'Power2'})
   document.getElementById('lose-game').addEventListener('click', App.startGame)
 }

  fadeOutMenus(){
      let gameMenu = document.getElementById('game-menu')
      let loseGameEl = document.getElementById('lose-game')
      let winGameEl = document.getElementById('win-game')

      TweenMax.to(gameMenu, .5, {autoAlpha: 0})
      TweenMax.to(loseGameEl, .5, {autoAlpha: 0})
      TweenMax.to(winGameEl, .5, {autoAlpha: 0})
  }

  checkKey(event) {
    let currentKey = this.song.rows[this.currentRow-1]
    let activeBlock = document.querySelector(`[data-row-id="${currentKey.id}"] .selected`)
    if (event.key == currentKey.selected && currentKey.id == this.currentRow) {
      if (this.running === false) {window.requestAnimationFrame(this.timer.bind(this))}
      this.running = true
      this.translateValue += 150
      currentKey.playSound()
      this.gameWrapper.style.transform = `translateY(${this.translateValue}px)`
      TweenMax.to(activeBlock, .15, {backgroundColor: '#78e678', ease: 'Power2'})
      if (this.currentRow === this.song.rows.length){
        this.winGame()
      }
      this.currentRow++
    } else {
      TweenMax.to(activeBlock, .3, {backgroundColor: 'red', ease: 'Power2'})
      this.loseGame()
    }

  }


  checkInput(event) {
    let currentKey = this.song.rows[this.currentRow-1]
    let activeBlock = this.allSelectedBlocks[this.currentRow-1]
    if (event.key == currentKey.selected && currentKey.id == this.currentRow) {
      if (this.running === false) {
        this.incrementSpeed()
        window.requestAnimationFrame(this.moveBlocks.bind(this))
      }
        this.arcadeScore++
        this.renderScore()
        this.running = true
        currentKey.playSound()
        activeBlock.classList.add("correct")
        this.copy.shift()
        this.currentRow++
      }
      else {
        clearInterval(this.setter)
        TweenMax.to(activeBlock, .3, {backgroundColor: 'red', ease: 'Power2'})
        this.loseArcade()
      }

  }

}
