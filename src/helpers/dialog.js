import Phaser from 'phaser'

export default class Dialog extends Phaser.Scene {
  constructor() {
    super({ key: 'Dialog' })
  }

  preload() {}

  create({ parentScene, paragraphs }) {
    this.parentScene = parentScene
    this.paragraphs = paragraphs
    this.currentIndex = 0

    this.scene.pause(this.parentScene.scene.key)

    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    const marginBottom = 50
    const padding = 50

    const width = Math.min(gameWidth * 0.8, 800)
    const x = gameWidth * 0.5
    const y = gameHeight - marginBottom

    const textStyle = {
      fontFamily: 'VT323, sans-serif',
      fontSize: '21px',
      fill: '#fefefe',
    }

    this.textBox = this.add
      .text(x, y, paragraphs[0], textStyle)
      .setWordWrapWidth(width, false)
      .setOrigin(0.5, 1)
      .setDepth(1)
      .setInteractive()

    this.dialogBox = this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRect(
        0,
        gameHeight - (this.textBox.height + padding * 2),
        gameWidth,
        this.textBox.height + padding * 2
      )
      .setInteractive(
        new Phaser.Geom.Rectangle(
          0,
          gameHeight - (this.textBox.height + padding * 2),
          gameWidth,
          this.textBox.height + padding * 2
        ),
        Phaser.Geom.Rectangle.Contains
      )

    this.input.on('pointerdown', () => this.nextParagraph())
  }

  nextParagraph() {
    this.currentIndex++
    if (this.currentIndex < this.paragraphs.length) {
      this.textBox.setText(this.paragraphs[this.currentIndex])
    } else {
      this.scene.stop()
      this.scene.resume(this.parentScene.scene.key)
    }
  }
}
