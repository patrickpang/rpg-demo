import Phaser from 'phaser'

import tileset from '../../assets/levels/tileset.png'

import george from '../../assets/players/george.png'
export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('tileset', tileset)
    this.load.spritesheet('george', george, {
      frameWidth: 48,
      frameHeight: 48,
    })
  }

  create() {
    this.scene.start('UpperUStreet')
  }
}
