import Phaser from 'phaser'
import WebFont from 'webfontloader'

import ideal_tileset from '../../assets/levels/ideal_tileset.png'

import george from '../../assets/players/george.png'
export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('ideal_tileset', ideal_tileset)
    this.load.spritesheet('george', george, {
      frameWidth: 48,
      frameHeight: 48,
    })
    WebFont.load({
      google: {
        families: ['VT323'],
      },
    })
  }

  create() {
    this.scene.start('UpperUStreet')
  }
}
