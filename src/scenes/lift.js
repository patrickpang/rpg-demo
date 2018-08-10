import Phaser from 'phaser'
import { fontFamily } from '../constants'
import liftsFile from '../../assets/lifts.json'
import backgroundFile from '../../assets/background/lift-background.png'
import { reverse } from 'lodash/fp'

const fontColor = '#333333'

export default class Lift extends Phaser.Scene {
  constructor() {
    super({ key: 'Lift' })
  }

  preload() {
    this.load.json('lifts', liftsFile)
    this.load.image('background', backgroundFile)
  }

  create({ key }) {
    const levels = reverse(this.cache.json.get('lifts')[key])

    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    const background = this.add.image(gameWidth * 0.5, gameHeight * 0.5, 'background')
    const scale = Math.max(gameWidth / background.width, gameHeight / background.height)
    background.setScale(scale, scale)

    const buttons = this.add.container(
      gameWidth * 0.5,
      gameHeight * 0.5,
      levels.map(([label, scene], i) => {
        const button = this.add
          .text(0, i * 100, label, {
            fontFamily: fontFamily,
            fontSize: '36px',
            fill: fontColor,
          })
          .setOrigin(0.5, 0.5)
          .setInteractive()

        button.on('pointerdown', () => {
          this.scene.start(scene, { target: 'Lift' })
        })

        return button
      })
    )
  }

  update() {}
}
