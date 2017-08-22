class Game {

  init(){
    this.song = new Song
    this.song.generateRows()
    this.gameWrapper.innerHTML = this.song.rows.slice().reverse().map(e => e.render()).join("")
    window.addEventListener('keydown', this.checkKey.bind(this))
    this.translateValue =  -150 * (this.song.rows.length-3)
  }

  constructor() {
    this.running = false
    this.rows = []
    this.currentRow = 1
    this.timeNow = 0
    this.gameWrapper = document.getElementById('game-wrapper')
    this.adapter = new UsersAdapter()
  }

  static renderMenu() {
    return `<h1>Piano Tiles</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button>`
  }

  timer(timestamp) {
    if (this.running){
    this.timeNow += 16.6
    document.getElementById('timer').innerHTML = `${(this.timeNow/1000).toFixed(3)}`
    window.requestAnimationFrame(this.timer.bind(this));
    }
  }

   winGame(){
    this.running = false
    document.getElementById('win-game').innerHTML = `<div id='game-menu'><h1>You won</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button></div>`
    this.adapter.createUser("nsdfs", this.timeNow)
    document.getElementById('win-game').addEventListener('click', function(e){
      if (e.target.dataset.action === 'start-game'){
        Row.resetCounter()
        let game = new Game
        game.init()
        game.start.bind(game)
      }
    })
  }

   loseGame(){
    this.running = false
    document.getElementById('lose-game').innerHTML = `<div id="game-menu"><h1>You lost</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button></div>`
    document.getElementById('lose-game').addEventListener('click', function(e){
      if (e.target.dataset.action === 'start-game'){
        Row.resetCounter()
        let game = new Game
        game.init()
        game.start.bind(game)
      }
    })
  }

  start(e){
      if (e.target.dataset.action === 'start-game'){

        let allDivs = this.gameWrapper.querySelectorAll(".grid")
        this.gameWrapper.style.transform = `translateY(${this.translateValue}px)`

        let gameMenu = document.getElementById('game-menu')

        gameMenu.innerHTML = ""
        gameMenu.style.backgroundColor = "rgba(255, 255, 255, 0)"
        setTimeout(function(){
          gameMenu.style.display = "none"
        }, 1500)
      }
  }

  checkKey(event) {
    let currentKey = this.song.rows[this.currentRow-1]
    if (event.key == currentKey.selected && currentKey.id == this.currentRow) {
      if (this.running === false) {window.requestAnimationFrame(this.timer.bind(this))}
      this.running = true
      this.translateValue += 150
      this.gameWrapper.style.transform = `translateY(${this.translateValue}px)`
      if (this.currentRow === this.song.rows.length){
        this.winGame()
      }
      this.currentRow++
    } else {
        this.loseGame()
    }

  }

}
