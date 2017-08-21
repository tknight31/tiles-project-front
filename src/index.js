document.addEventListener("DOMContentLoaded", function() {

  const gameWrapper = document.getElementById('game-wrapper')
  let allDivs = gameWrapper.querySelectorAll(".grid")
  let translateValue = -150 * (allDivs.length-3)
  gameWrapper.style.transform = `translateY(${translateValue}px)`

  window.addEventListener('keyup', function(e) {
    if (e.which == "32") {
      translateValue += 150
      gameWrapper.style.transform = `translateY(${translateValue}px)`
    }
  })

})
