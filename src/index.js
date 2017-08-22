document.addEventListener("DOMContentLoaded", function() {
  let allRows = []
  const gameWrapper = document.getElementById('game-wrapper')
  for (let i = 0; i < 30; i++) {
    allRows.push(new Row())
  }
  gameWrapper.innerHTML = allRows.slice().reverse().map(e => e.render()).join("")

  let gameMenu = document.getElementById('game-menu')

  let inGame = false
  let currentRow = 1
  let timeNow = 0

  gameMenu.addEventListener("click", function(e) {
    if (e.target.dataset.action === 'start-game'){


        function step(timestamp) {
          if (inGame){
          timeNow += 16.6
          document.getElementById('timer').innerHTML = `${(timeNow/1000).toFixed(3)}`
          window.requestAnimationFrame(step);
          }
        }



      // for (let i = 0; i < 30; i++) {
      //   allRows.push(new Row())
      // }
      // gameWrapper.innerHTML = allRows.slice().reverse().map(e => e.render()).join("")


      let allDivs = gameWrapper.querySelectorAll(".grid")
      let translateValue = -150 * (allDivs.length-3)
      gameWrapper.style.transform = `translateY(${translateValue}px)`

      gameMenu.innerHTML = ""
      gameMenu.style.backgroundColor = "rgba(255, 255, 255, 0)"
      setTimeout(function(){
        gameMenu.style.display = "none"
      }, 1500)


        window.addEventListener('keydown', function(event) {
          let currentKey = allRows[currentRow-1]
          if (event.key == currentKey.selected && currentKey.id == currentRow) {
            if (inGame === false) {window.requestAnimationFrame(step)}
            inGame = true
            translateValue += 150
            gameWrapper.style.transform = `translateY(${translateValue}px)`
            if (currentRow === allRows.length){
              winGame()
            }
            currentRow++
          } else {
            console.log(timeNow);
              loseGame()
          }

        })
    }
  })

  function winGame(){
    inGame = false
    document.getElementById('win-game').innerHTML = `<div id='game-menu'"><h1>You won</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button></div>`
  }

  function loseGame(){
    inGame = false
    document.getElementById('lose-game').innerHTML = `<div id="game-menu"><h1>You lost</h1>
    <button data-action="start-game">Start Game</button>
    <button data-action="high-scores">High Scores</button></div>`
  }
})
