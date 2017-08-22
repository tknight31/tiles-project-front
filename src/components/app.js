class App {
  static startGame(){
      Row.resetCounter()
      let game = new Game
      game.init()
      document.getElementById('game-menu').addEventListener("click", game.start.bind(game))
    }


}
