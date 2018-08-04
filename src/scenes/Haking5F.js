import Phaser from 'phaser'

import Haking5FMap from '../../assets/levels/Haking5F.json'

import { createFromTilemap } from '../helpers/scene'

export default class Haking5F extends Phaser.Scene {
  constructor() {
    super({ key: 'Haking5F' })
  }

  preload() {
    this.load.tilemapTiledJSON('Haking5FMap', Haking5FMap)
  }

  create(data) {
    createFromTilemap(this, 'Haking5FMap', 'ideal_tileset', data.target)
  }

  update() {
    this.player.update()
  }
}
