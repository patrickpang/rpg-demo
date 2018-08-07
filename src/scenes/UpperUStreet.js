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
    setTimeout(() => {
      this.scene.run('Dialog', {
        parentScene: this,
        paragraphs: [
          'The University of Hong Kong 香港大學 (often abbreviated as HKU) is a public research university located in Pokfulam, Hong Kong.',
          'Today, the University of Hong Kong is organised into 10 academic faculties with English as the language of instruction.',
        ],
      })
    }, 2000)
  }

  update() {
    this.player.update()
  }
}
