const Row = (function createRowClass() {

  let id = 0

  return class Row {

    constructor(note) {
      this.id = ++id
      this.notes = ["A", "S", "D", "F"]
      this.num = Math.round(Math.random() * 3)
      this.selected = (this.notes[this.num]).toLowerCase()
      this.sound = note + '.wav'
    }


    render() {
      return `
      <div class="grid" data-row-id="${this.id}">${this.generateNotes()}</div>
      `
    }

    generateNotes() {
      let row = this.notes.map((e, i) => {
        if (i == this.num) {
          return `<div class="block selected">${e}</div>`
        } else {
          return `<div class="block">${e}</div>`
        }
      }).join("")

      return row
    }

    static resetCounter(){
      id = 0
    }

    playSound() {
        var nowAudio = new Audio
        nowAudio.src = `./src/audio/${this.sound}`
        nowAudio.play()
  }


  }


})()
