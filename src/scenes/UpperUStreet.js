import Phaser from 'phaser'

import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import Player from '../objects/Player'

export default class UpperUStreet extends Phaser.Scene {
  constructor() {
    super({ key: 'UpperUStreet' })
  }

  preload() {
    this.load.tilemapTiledJSON('UpperUStreetMap', UpperUStreetMap)
  }

  create() {
    this.cameras.main.fadeIn(200)

    const map = this.make.tilemap({ key: 'UpperUStreetMap' })

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels

    const tiles = map.addTilesetImage('tileset', 'tileset')

    map.createStaticLayer('Floor', tiles, 0, 0)

    const border = map.createStaticLayer('Border', tiles, 0, 0)
    const back = map.createStaticLayer('Back', tiles, 0, 0)
    const front = map.createStaticLayer('Front', tiles, 0, 0)

    border.setCollisionByExclusion([-1])
    back.setCollisionByExclusion([-1])
    front.setCollisionByExclusion([-1])

    map.createStaticLayer('Door Back', tiles, 0, 0)
    map.createStaticLayer('Door Front', tiles, 0, 0)

    const zones = this.physics.add.group({ classType: Phaser.GameObjects.Zone })

    map
      .getObjectLayer('Entrances')
      .objects.forEach(entrance =>
        zones
          .create(entrance.x, entrance.y, entrance.width, entrance.height)
          .setData('target', entrance.properties ? entrance.properties['target'] : undefined)
      )

    const spawnPoint = map.findObject('Players', obj => obj.name === 'Start')
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.player.create()

    const playerFront = map.createStaticLayer('Player Front', tiles, 0, 0)

    this.physics.add.collider(this.player, border)
    this.physics.add.collider(this.player, back)
    this.physics.add.collider(this.player, front)

    this.physics.add.overlap(this.player, zones, (player, entrance) =>
      console.log(entrance.getData('target'))
    )

    // this.npc = this.physics.add.sprite(80, 20, 'players', 3)

    this.cameras.main.startFollow(this.player)
  }

  update() {
    this.player.update()
  }
}
