import Phaser from 'phaser'

import tiles from '../../assets/map/spritesheet.png'
import map from '../../assets/map/map.json'
import players from '../../assets/RPG_assets.png'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.image('tiles', tiles)
    this.load.tilemapTiledJSON('map', map)
    this.load.spritesheet('players', players, {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create() {
    this.scene.start('WorldScene')
  }
}
