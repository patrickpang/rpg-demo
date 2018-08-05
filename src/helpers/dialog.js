import Phaser from 'phaser'

export default class Dialog extends Phaser.Scene {
  constructor() {
    super({ key: 'Dialog' })
  }

  preload() {}

  create({ paragraphs }) {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    const marginBottom = 50
    const padding = 50

    const width = Math.min(gameWidth * 0.8, 800)
    const x = gameWidth * 0.5
    const y = gameHeight - marginBottom

    const textStyle = {
      fontFamily: 'VT323, monospace',
      fontSize: '21px',
      fill: '#fefefe',
    }

    const textBox = this.add
      .text(x, y, paragraphs[0], textStyle)
      .setWordWrapWidth(width, false)
      .setOrigin(0.5, 1)
      .setDepth(1)
      .setInteractive()

    const dialogBox = this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRect(
        0,
        gameHeight - (textBox.height + padding * 2),
        gameWidth,
        textBox.height + padding * 2
      )
      .setInteractive(
        new Phaser.Geom.Rectangle(
          0,
          gameHeight - (textBox.height + padding * 2),
          gameWidth,
          textBox.height + padding * 2
        ),
        Phaser.Geom.Rectangle.Contains
      )

    textBox.on('pointerdown', () => {
      console.log('hi from text')
    })

    dialogBox.on('pointerdown', () => {
      console.log('hi from dialog')
    })
  }
}
