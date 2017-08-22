class Song {

  constructor(){
    this.rows = []
  }

  generateRows(){
    for (let i = 0; i < 30; i++) {
      this.rows.push(new Row())
    }
  }


}
