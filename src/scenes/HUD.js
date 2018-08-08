import Phaser from 'phaser'
import { fontFamily } from '../constants'
import { getState } from '../helpers/state'

const fontColor = '#fefefe'

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD' })
  }

  preload() {}

  create({ sceneKey }) {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    this.add
      .text(20, 20, getState(['player', 'name']), {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    this.add
      .text(20, gameHeight - 20, sceneKey, {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(0, 1)
      .setScrollFactor(0, 0)

    this.add
      .text(gameWidth - 20, 20, 'Tasks', {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)

    this.add
      .text(gameWidth - 20, gameHeight - 20, '?', {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(1, 1)
      .setScrollFactor(0, 0)
    //   .setInteractive()

    // button.on('pointerdown', () => {
    //   this.scene.start(scene, { target: 'Lift' })
    // })
  }

  update() {}
}
