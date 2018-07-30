import Phaser from 'phaser'
import EasyStar from 'easystarjs'

import Player from '../objects/Player'

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' })
  }

  preload() {}

  create() {
    this.map = this.make.tilemap({ key: 'map' })

    // first parameter is the name of the tilemap in tiled
    const tiles = this.map.addTilesetImage('spritesheet', 'tiles')

    const grass = this.map.createStaticLayer('Grass', tiles, 0, 0)

    const obstacles = this.map.createStaticLayer('Obstacles', tiles, 0, 0)
    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1])

    this.createPathfinder(this.map, obstacles)

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    )

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels

    this.player = new Player(this, 50, 100)
    this.player.create()
    this.npc = this.physics.add.sprite(80, 20, 'players', 3)

    this.physics.add.collider(this.player, obstacles)

    this.physics.add.overlap(this.player, this.npc, (player, npc) =>
      this.onMeetNPC(player, npc)
    )

    this.cameras.main.startFollow(this.player)

    this.input.on('pointerdown', pointer => this.onClick(pointer))
  }

  createPathfinder(map, obstacles) {
    this.pathfinder = new EasyStar.js()

    const grid = []
    for (let y = 0; y < map.height; y++) {
      const col = []
      for (let x = 0; x < map.width; x++) {
        const tile = obstacles.getTileAt(x, y)
        col.push(tile ? tile.index : -1)
      }
      grid.push(col)
    }

    this.pathfinder.enableDiagonals()
    this.pathfinder.setGrid(grid)
    this.pathfinder.setAcceptableTiles([-1])
  }

  onMeetNPC(player, npc) {
    // TODO: avoid relocating on obstacles layer
    npc.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width)
    npc.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height)

    this.cameras.main.shake(300)
  }

  onClick(pointer) {
    const x = this.cameras.main.scrollX + pointer.x
    const y = this.cameras.main.scrollY + pointer.y
    const toX = Math.floor(x / this.map.tileWidth)
    const toY = Math.floor(y / this.map.tileHeight)
    const fromX = Math.floor(this.player.x / this.map.tileWidth)
    const fromY = Math.floor(this.player.y / this.map.tileHeight)

    this.pathfinder.findPath(fromX, fromY, toX, toY, path => {
      if (path === null) {
        console.warn('Cannot find path')
      } else {
        this.player.moveAlong(path)
      }
    })
    this.pathfinder.calculate()
  }

  update(time, delta) {}
}
