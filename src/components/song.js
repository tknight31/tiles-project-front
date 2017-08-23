class Song {

  constructor(){
    this.rows = []
    // Song Key: ['Itsy Bitsy Spider', 'Happy Birthday', 'Row Row Row Your Boat']
    this.songSequences = [['g','c','c','c','d','e','e','e','d','c','d','e','c','e','e','f','g','g','f','e','f','g','e','c','c','d','e','e','d','c'],['a','a','b','a','d','c-','a','a','b','a','e','d','a','a','a','f-','d','c-','b','g','g','f-','d','e','d','a','a','b','a','d'],['d','d','d','e','f-','f-','e','f-','g','a','d','d','d','a','a','a','f-','f-','f-','d','d','d','a','g','f-','e','d','d','d','d']]
  }

  generateRows(mode){
    if (mode === 'classic') {
      let selectedSong = this.songSequences[Math.round((Math.random() * (this.songSequences.length - 1)))]
      for (let i = 0; i < 30; i++) {
        this.rows.push(new Row(selectedSong[i]))
      }
    }
    else if (mode === 'arcade') {
      for (let i = 0; i < 100; i++) {
        this.rows.push(new Row())
      }

    }
  }


}
