import Phaser from 'phaser'

import Tile from '../../assets/levels/Tilesets/Inside_A2.png'
import BuildingWall3 from '../../assets/levels/Tilesets/dungeon.png'
import BuildingWall from '../../assets/levels/Tilesets/house.png'
import BuildingWall2 from '../../assets/levels/Tilesets/castle_outside.png'
import Stair from '../../assets/levels/Tilesets/stairs.png'
import Grass from '../../assets/levels/Tilesets/treetop.png'
import Stair3 from '../../assets/levels/Tilesets/cementstair.png'
import Chair from '../../assets/levels/Tilesets/Inside_B.png'
import BuildingWall4 from '../../assets/levels/Tilesets/castlewalls.png'
import Door from '../../assets/levels/Tilesets/Inside_A4.png'
import Stair2 from '../../assets/levels/Tilesets/Inside_C.png'
import Locker from '../../assets/levels/Tilesets/cabinets.png'
import Grass2 from '../../assets/levels/Tilesets/grass.png'

import UpperUStreetMap from '../../assets/levels/UpperUStreet.json'

import george from '../../assets/players/george.png'

import Player from '../objects/Player'

export default class UpperUStreet extends Phaser.Scene {
  constructor() {
    super({ key: 'UpperUStreet' })
  }

  preload() {
    this.load.image('Tile', Tile)
    this.load.image('BuildingWall3', BuildingWall3)
    this.load.image('BuildingWall', BuildingWall)
    this.load.image('BuildingWall2', BuildingWall2)
    this.load.image('Stair', Stair)
    this.load.image('Grass', Grass)
    this.load.image('Stair3', Stair3)
    this.load.image('Chair', Chair)
    this.load.image('BuildingWall4', BuildingWall4)
    this.load.image('Door', Door)
    this.load.image('Stair2', Stair2)
    this.load.image('Locker', Locker)
    this.load.image('Grass2', Grass2)

    this.load.tilemapTiledJSON('UpperUStreetMap', UpperUStreetMap)
    this.load.spritesheet('george', george, {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    this.cameras.main.fadeIn(500)

    const map = this.make.tilemap({ key: 'UpperUStreetMap' })

    // const tiles = map.addTilesetImage('spritesheet', 'tiles')

    // const grass = map.createStaticLayer('Grass', tiles, 0, 0)

    // const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0)
    // obstacles.setCollisionByExclusion([-1])

    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    // this.physics.world.bounds.width = map.widthInPixels
    // this.physics.world.bounds.height = map.heightInPixels

    // this.npc = this.physics.add.sprite(80, 20, 'players', 3)

    // this.player = new Player(this, 50, 100)
    // this.player.create()

    // this.physics.add.collider(this.player, obstacles)

    // this.physics.add.overlap(this.player, this.npc, (player, npc) =>
    //   this.onMeetNPC(player, npc)
    // )

    // this.cameras.main.startFollow(this.player)
  }

  update() {
    this.player.update()
  }
}
