import Phaser from 'phaser'
import WebFont from 'webfontloader'

import Player from '../objects/Player'

import ideal_tileset from '../../assets/levels/ideal_tileset.png'
import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import george from '../../assets/players/george.png'
import betty from '../../assets/players/betty.png'
import { fontFamily } from '../constants'

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
    this.load.spritesheet('betty', betty, {
      frameWidth: 48,
      frameHeight: 48,
    })
    this.load.tilemapTiledJSON('UpperUStreetMap', UpperUStreetMap)
    WebFont.load({
      google: {
        families: ['Do Hyeon'],
      },
    })
  }

  create() {
    // const name = window.prompt('What is your name?') || 'HKU Student'

    this.cameras.main.fadeIn(200)

    const map = this.make.tilemap({ key: 'UpperUStreetMap' })
    const tiles = map.addTilesetImage('ideal_tileset', 'ideal_tileset')

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels

    const layers = ['Floor', 'Border', 'Back', 'Front', 'Door Back', 'Door Front']
    layers.forEach(layer => map.createDynamicLayer(layer, tiles, 0, 0))

    const spawnPoint = map.findObject('Players', obj => obj.name === 'Start')
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.player.create()

    map.createDynamicLayer('Player Front', tiles, 0, 0)

    const titlePoint = map.findObject('Welcome', obj => obj.name === 'Title')
    this.add
      .text(titlePoint.x, titlePoint.y, 'My Day In HKU', {
        fontFamily: fontFamily,
        fontSize: '48px',
        fill: '#fefefe',
      })
      .setOrigin(0.5, 0.5)

    const promptPoint = map.findObject('Welcome', obj => obj.name === 'Prompt')
    this.add
      .text(promptPoint.x, promptPoint.y, 'Select A Player To Start', {
        fontFamily: fontFamily,
        fontSize: '24px',
        fill: '#fefefe',
      })
      .setOrigin(0.5, 0.5)

    this.cameras.main.startFollow(this.player)

    // this.scene.start('UpperUStreet')
  }

  update() {}
}
