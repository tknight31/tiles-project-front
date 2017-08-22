class Game {

  init(){

  }

  constructor() {
    this.running = false
    this.rows = []
  }

  renderMenu() {
    `<h1>Piano Tiles</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button>`
  }


}
