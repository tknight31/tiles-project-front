document.addEventListener("DOMContentLoaded", function() {

  let gameMenu = document.getElementById('game-menu')
  gameMenu.innerHTML = Game.renderMenu()

  gameMenu.addEventListener("click", App.startGame)

})


