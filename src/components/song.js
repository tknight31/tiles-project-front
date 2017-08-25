class Song {

  constructor(){
    this.rows = []
    // Song Key: ['Happy Birthday', 'barney', 'twinkle', 'itsy-bitsy', 'row your boat']
    this.songSequences = [['c', 'c', 'd', 'c', 'f', 'e', 'c', 'c', 'd', 'c', 'g', 'f', 'c', 'c', 'cc', 'a', 'f', 'e', 'd', 'a-', 'a-', 'a', 'f', 'g', 'f', 'c', 'c', 'd', 'c', 'f', 'e', 'c', 'c', 'd', 'c', 'g', 'f', 'c', 'c', 'cc', 'a', 'f', 'e', 'd', 'a-', 'a-', 'a', 'f', 'g', 'f'], ['g', 'e', 'g', 'g', 'e', 'g', 'a', 'g', 'f', 'e', 'd', 'e', 'f', 'e', 'f', 'g', 'c', 'c', 'c', 'c', 'c', 'd', 'e', 'f', 'g', 'g', 'd', 'd', 'f', 'e', 'd', 'c', 'g', 'e', 'g', 'g', 'e', 'g', 'a', 'g', 'f', 'e', 'd', 'e', 'f', 'e', 'f', 'g', 'c', 'c', 'c', 'c', 'c', 'd', 'e', 'f', 'g', 'g', 'd', 'd', 'f', 'e', 'd', 'c'], ['d', 'd', 'a', 'a', 'b', 'b', 'a', 'g', 'g', 'f-', 'f-', 'e', 'e', 'd', 'a', 'a', 'g', 'g', 'f-', 'f-', 'e', 'a', 'a', 'g', 'g', 'f-', 'f-', 'e', 'd', 'd', 'a', 'a', 'b', 'b', 'a', 'g', 'g', 'f-', 'f-', 'e', 'e', 'd'], ['c', 'f', 'f', 'f', 'g', 'a', 'a', 'a', 'g', 'f', 'g', 'a', 'f', 'a', 'a', 'a-', 'cc', 'cc', 'a-', 'a', 'a-', 'cc', 'a', 'f', 'f', 'g', 'a', 'a', 'g', 'f', 'g', 'a', 'f', 'c', 'f', 'f', 'f', 'g', 'a', 'a', 'a', 'g', 'f', 'g', 'a', 'f'], ['c', 'c', 'c', 'd', 'e', 'e', 'd', 'e', 'f', 'g', 'cc', 'cc', 'cc', 'g', 'g', 'g', 'e', 'e', 'e', 'c', 'c', 'c', 'g', 'f', 'e', 'd', 'c', 'c', 'c', 'c', 'd', 'e', 'e', 'd', 'e', 'f', 'g', 'cc', 'cc', 'cc', 'g', 'g', 'g', 'e', 'e', 'e', 'c', 'c', 'c', 'g', 'f', 'e', 'd', 'c']]
  }

  generateRows(mode){
    if (mode === 'classic') {
      let selectedSong = this.songSequences[Math.round((Math.random() * (this.songSequences.length - 1)))]
      for (let i = 0; i < 30; i++) {
        this.rows.push(new Row(selectedSong[i]))
      }
    }
    else if (mode === 'arcade') {
      let selectedSong = this.songSequences[Math.round((Math.random() * (this.songSequences.length - 1)))]
      let j = 0
      for (let i = 0; i < 100; i++) {
        if (j === selectedSong.length-1) j = 0;
        this.rows.push(new Row(selectedSong[j]))
        j++
      }

    }
  }


}
