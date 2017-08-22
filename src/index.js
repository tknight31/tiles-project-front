document.addEventListener("DOMContentLoaded", function() {

  const gameWrapper = document.getElementById('game-wrapper')

  let allRows = []
  let currentRow = 1

  for (let i = 0; i < 30; i++) {
    allRows.push(new Row())
  }
  gameWrapper.innerHTML = allRows.slice().reverse().map(e => e.render()).join("")


  let allDivs = gameWrapper.querySelectorAll(".grid")
  let translateValue = -150 * (allDivs.length-3)
  gameWrapper.style.transform = `translateY(${translateValue}px)`


  // allRows.reverse().forEach(row => {

    window.addEventListener('keydown', function(event) {
      let currentKey = allRows[currentRow-1]
      // debugger
      if (event.key == currentKey.selected && currentKey.id == currentRow) {
        translateValue += 150
        gameWrapper.style.transform = `translateY(${translateValue}px)`
        currentRow++
        // setTimeout(function() {currentRow++}, 0)
      } else {
        console.log("asdfasdfass");
      }

    })

  // })


  // window.addEventListener('keyup', function(e) {
  //   if (e.which == "32") {
  //     translateValue += 150
  //     gameWrapper.style.transform = `translateY(${translateValue}px)`
  //   }
  // })

})
