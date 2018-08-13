import Phaser from 'phaser'
import WebFont from 'webfontloader'

import Player from '../objects/Player'

import ideal_tileset from '../../assets/levels/ideal_tileset.png'
import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import george from '../../assets/players/george.png'
import betty from '../../assets/players/betty.png'
import { fontFamily, mainFont } from '../constants'
import { setState, getState } from '../helpers/state'

import jeremy_blonde from '../../assets/players/jeremy-blonde.png'
import jeremy_green from '../../assets/players/jeremy-green.png'
import jeremy_pink from '../../assets/players/jeremy-pink.png'
import martha_blonde from '../../assets/players/martha-blonde.png'
import martha_green from '../../assets/players/martha-green.png'
import martha_pink from '../../assets/players/martha-pink.png'
import { greetOverlay } from '../overlays/greet'

const fontColor = '#fefefe'

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
        families: [mainFont],
      },
    })

    this.load.spritesheet('jeremy-blonde', jeremy_blonde, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('jeremy-green', jeremy_green, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('jeremy-pink', jeremy_pink, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('martha-blonde', martha_blonde, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('martha-green', martha_green, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('martha-pink', martha_pink, {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    const playerState = getState(['player'])
    if (playerState && playerState['name'] && playerState['gender']) {
      this.startGame()
      return
    }

    this.cameras.main.fadeIn(200)

    this.map = this.make.tilemap({ key: 'UpperUStreetMap' })
    const tiles = this.map.addTilesetImage('ideal_tileset', 'ideal_tileset')

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels

    const layers = ['Floor', 'Border', 'Back', 'Front', 'Door Back', 'Door Front']
    layers.forEach(layer => this.map.createDynamicLayer(layer, tiles, 0, 0))

    const spawnPoint = this.map.findObject('Players', obj => obj.name === 'Start')
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, 'george')
    this.player.create()
    this.player.setVisible(false)

    this.map.createDynamicLayer('Player Front', tiles, 0, 0)

    greetOverlay.show(() => this.choosePlayer())

    this.cameras.main.startFollow(this.player)
  }

  choosePlayer() {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    const placeholder = this.add
      .text(gameWidth * 0.5, gameHeight * 0.5, 'Select Player To Start', {
        fontFamily: fontFamily,
        fontSize: '24px',
        fill: fontColor,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    const boyPoint = this.map.findObject('Welcome', obj => obj.name === 'Boy')
    this.boy = new Player(this, boyPoint.x, boyPoint.y, 'george')
    this.boy.create()
    this.boy.setInteractive()
    this.boy.on('pointerdown', () => {
      setState({ player: { gender: 'M' } })
      this.startGame()
    })

    const girlPoint = this.map.findObject('Welcome', obj => obj.name === 'Girl')
    this.girl = new Player(this, girlPoint.x, girlPoint.y, 'betty')
    this.girl.create()
    this.girl.setInteractive()
    this.girl.on('pointerdown', () => {
      setState({ player: { gender: 'F' } })
      this.startGame()
    })
  }

  startGame() {
    this.scene.start(getState(['location', 'scene']) || 'UpperUStreet')
  }

  update() {}
}
