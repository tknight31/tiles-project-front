class UsersAdapter {

  constructor() {
    this.baseURL = "https://tiles-game-back.herokuapp.com/api/v1/users"
  }

  createUser(name, score, mode) {
    const userParams = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, score: score, mode: mode })
    }
    return fetch(this.baseURL, userParams).then(res => res.json())

  }

  getHighScores(mode){
    const highScores = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
    return fetch(this.baseURL + '?mode=' + mode, highScores).then(res => res.json())
  }

}
