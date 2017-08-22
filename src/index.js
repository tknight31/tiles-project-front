document.addEventListener("DOMContentLoaded", function() {

  let gameMenu = document.getElementById('game-menu')
  gameMenu.innerHTML = Game.renderMenu()


  let game = new Game
  game.init()

  gameMenu.addEventListener("click", game.start.bind(game))


})
