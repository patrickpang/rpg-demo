import Phaser from 'phaser'

import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import { createFromTilemap } from '../helpers/scene'

export default class UpperUStreet extends Phaser.Scene {
  constructor() {
    super({ key: 'UpperUStreet' })
  }

  preload() {
    this.load.tilemapTiledJSON('UpperUStreetMap', UpperUStreetMap)
  }

  create({ target }) {
    createFromTilemap(this, 'UpperUStreetMap', 'ideal_tileset', target)
  }

  update() {
    this.player.update()
  }
}
