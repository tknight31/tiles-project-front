class App {

	static startGame(e){

  	if (e.target.dataset.action === 'classic'){
			Game.resetClock()
			Row.resetCounter()
			let game = new Game('classic')
			game.keyHandler = game.checkKey.bind(game)
			window.addEventListener('keydown', game.keyHandler)
			game.fadeOutMenus()
		}
		else if (e.target.dataset.action === 'arcade'){
			Game.resetClock()
			Row.resetCounter()
			let game = new Game('arcade')
			game.arcadeScore = 0
			game.keyHandler = game.checkInput.bind(game)
			window.addEventListener('keydown', game.keyHandler)

			game.fadeOutMenus()
			// game.incrementSpeed()

		}
		else if (e.target.dataset.action === 'high-scores'){
			App.fetchHighScores()
		}
		else if (e.target.dataset.action === 'home-menu'){
			document.getElementById('game-menu').innerHTML = Game.renderMenu

		}
	}

	static fetchHighScores() {
	    let adapter = new UsersAdapter()
	    adapter.getHighScores().then(highScoresJson => this.renderHighScores(highScoresJson))
	}

	static renderHighScores(json){

		let gameMenu = document.getElementById('game-menu')

		let allScores = json.map(s => {
			return `<li><span>${s.name}</span> : ${s.score}</li>`
		}
		).join("")

		gameMenu.innerHTML = `
			<h1 class="highscores">High Scores</h1>
			<ol id="high-scores-list">${allScores}</ol>
			<button data-action="home-menu" class="menu-button">Main Menu</button>
		`
		let highScoresListEl = document.querySelectorAll('#high-scores-list li')

		TweenMax.staggerTo(highScoresListEl, 1.1, {autoAlpha: 1, ease: 'Power2', y: 0}, .2)
		TweenMax.to(gameMenu, .5, {autoAlpha:1})

	}

}
