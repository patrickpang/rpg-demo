import Phaser from 'phaser'
import WebFont from 'webfontloader'

import Player from '../objects/Player'

import ideal_tileset from '../../assets/levels/ideal_tileset.png'
import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import george from '../../assets/players/george.png'
import betty from '../../assets/players/betty.png'
import { fontFamily, mainFont } from '../constants'
import { setState, getState } from '../helpers/state'

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
  }

  create() {
    if (getState(['player'])) {
      this.startGame()
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

    const titlePoint = this.map.findObject('Welcome', obj => obj.name === 'Title')
    this.add
      .text(titlePoint.x, titlePoint.y, 'My Day In HKU', {
        fontFamily: fontFamily,
        fontSize: '48px',
        fill: fontColor,
      })
      .setOrigin(0.5, 0.5)

    const brandPoint = this.map.findObject('Welcome', obj => obj.name === 'MadeByCSA')
    this.add
      .text(brandPoint.x, brandPoint.y, 'made by CSA with ❤️', {
        fontFamily: fontFamily,
        fontSize: '24px',
        fill: fontColor,
      })
      .setOrigin(0.5, 0.5)

    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    const placeholder = this.add
      .text(gameWidth * 0.5, gameHeight * 0.5, 'What is your name?', {
        fontFamily: fontFamily,
        fontSize: '24px',
        fill: fontColor,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    const padding = 10
    const graphics = this.add.graphics()

    this.inputBorder = graphics
      .lineStyle(5, 0xffffff, 1)
      .strokeRoundedRect(
        placeholder.x - placeholder.width / 2 - padding,
        placeholder.y - placeholder.height / 2 - padding,
        placeholder.width + padding * 2,
        placeholder.height + padding * 2,
        10
      )
      .setScrollFactor(0, 0)

    graphics.setInteractive(
      new Phaser.Geom.Rectangle(
        placeholder.x - placeholder.width / 2,
        placeholder.y - placeholder.height / 2,
        placeholder.width + padding * 2,
        placeholder.height + padding * 2
      ),
      Phaser.Geom.Rectangle.Contains
    )

    graphics.on('pointerdown', () => {
      placeholder.setVisible(false)
      this.inputName(
        placeholder.x - placeholder.width / 2 - padding,
        placeholder.y - placeholder.height / 2 - padding,
        placeholder.width + padding * 2,
        placeholder.height + padding * 2,
        padding
      )
    })

    this.cameras.main.startFollow(this.player)

    // set body size for larger surface area
  }

  inputName(x, y, width, height, padding) {
    const inputBox = document.createElement('input')
    inputBox.style.position = 'fixed'
    inputBox.style.left = x
    inputBox.style.top = y
    inputBox.style.width = width
    inputBox.style.height = height
    inputBox.style.padding = padding
    inputBox.style.background = 'none'
    inputBox.style.border = 'none'
    inputBox.style.outline = 'none'
    inputBox.style.color = fontColor
    inputBox.style.fontSize = '24px'
    inputBox.style.fontFamily = fontFamily

    const form = document.createElement('form')
    form.onsubmit = e => {
      e.preventDefault()
      setState({ player: { name: inputBox.value } })

      this.inputBorder.destroy()
      document.getElementById('overlay').removeChild(form)

      this.choosePlayer()
    }

    form.appendChild(inputBox)
    document.getElementById('overlay').appendChild(form)
    inputBox.focus()
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
    this.scene.start('UpperUStreet')
  }

  update() {}
}
