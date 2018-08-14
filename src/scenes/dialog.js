import Phaser from 'phaser'
import { fontFamily } from '../constants'
import { getLanguage, wrappedZhText } from '../helpers/translation'
import dialogsFile from '../../assets/dialogs.json'

// Usages

// this.scene.run('Dialog', {
//   parentScene: this,
//   paragraphs: [
//     'The University of Hong Kong 香港大學 (often abbreviated as HKU) is a public research university located in Pokfulam, Hong Kong.',
//     'Today, the University of Hong Kong is organised into 10 academic faculties with English as the language of instruction.',
//   ],
// })

export default class Dialog extends Phaser.Scene {
  constructor() {
    super({ key: 'Dialog' })
  }

  preload() {
    this.load.json('dialogs', dialogsFile)
  }

  create({ parentScene, paragraphs, key }) {
    this.parentScene = parentScene

    this.language = getLanguage()

    if (key) {
      const dialog = this.cache.json.get('dialogs')[key]
      if (dialog) {
        this.paragraphs = dialog[this.language]
      } else {
        this.paragraphs = paragraphs || []
      }
    } else {
      this.paragraphs = paragraphs || []
    }

    this.currentIndex = 0

    this.scene.pause(this.parentScene.scene.key)
    this.scene.bringToTop(this.scene.key)

    this.gameWidth = this.sys.game.config.width
    this.gameHeight = this.sys.game.config.height

    this.padding = 30

    const width = Math.min(this.gameWidth * 0.8, 800)
    const x = this.gameWidth * 0.5
    const y = this.gameHeight - this.padding

    const textStyle = {
      fontFamily: fontFamily,
      fontSize: '24px',
      fill: '#fefefe',
    }

    this.textBox = this.add
      .text(
        x,
        y,
        this.language === 'zh' ? wrappedZhText(this.paragraphs[0]) : this.paragraphs[0],
        textStyle
      )
      .setWordWrapWidth(width, false)
      .setOrigin(0.5, 1)
      .setDepth(1)
      .setInteractive()

    this.dialogBox = this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRect(
        0,
        this.gameHeight - (this.textBox.height + this.padding * 2),
        this.gameWidth,
        this.textBox.height + this.padding * 2
      )
      .setInteractive()

    this.input.on('pointerdown', () => this.renderNextParagraph())
  }

  renderNextParagraph() {
    this.currentIndex++
    if (this.currentIndex < this.paragraphs.length) {
      this.textBox.setText(
        this.language === 'zh'
          ? wrappedZhText(this.paragraphs[this.currentIndex])
          : this.paragraphs[this.currentIndex]
      )
      this.dialogBox
        .clear()
        .fillStyle(0x000000, 0.5)
        .fillRect(
          0,
          this.gameHeight - (this.textBox.height + this.padding * 2),
          this.gameWidth,
          this.textBox.height + this.padding * 2
        )
    } else {
      this.scene.stop('Dialog')
      this.scene.resume(this.parentScene.scene.key)
    }
  }
}
