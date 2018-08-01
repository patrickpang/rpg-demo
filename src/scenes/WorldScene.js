import Phaser from 'phaser'

import Player from '../objects/Player'

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' })
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: 'map' })

    const tiles = map.addTilesetImage('spritesheet', 'tiles')

    const grass = map.createStaticLayer('Grass', tiles, 0, 0)

    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0)
    obstacles.setCollisionByExclusion([-1])

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels

    this.npc = this.physics.add.sprite(80, 20, 'players', 3)

    this.player = new Player(this, 50, 100)
    this.player.create()

    this.physics.add.collider(this.player, obstacles)

    this.physics.add.overlap(this.player, this.npc, (player, npc) =>
      this.onMeetNPC(player, npc)
    )

    this.cameras.main.startFollow(this.player)
  }

  onMeetNPC(player, npc) {
    // TODO: avoid relocating on obstacles layer
    npc.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width)
    npc.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height)

    this.cameras.main.fadeOut(200)
    this.scene.start('UpperUStreet')
  }

  update() {
    this.player.update()
  }
}
