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
      frameWidth: 48,
      frameHeight: 48,
    })
  }

  create() {
    this.cameras.main.fadeIn(200)

    const map = this.make.tilemap({ key: 'UpperUStreetMap' })

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.world.bounds.width = map.widthInPixels
    this.physics.world.bounds.height = map.heightInPixels

    const tiles = map.addTilesetImage('Grass2', 'Grass2')
    const outside = map.createStaticLayer('Background', tiles, 0, 0)

    const floorTiles = map.addTilesetImage('Tile', 'Tile')
    const floor = map.createStaticLayer('Floor', floorTiles, 0, 0)

    // const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0)
    outside.setCollisionByExclusion([-1])

    // this.npc = this.physics.add.sprite(80, 20, 'players', 3)

    const spawnPoint = map.findObject('Players', obj => obj.name === 'Player')
    this.player = new Player(this, spawnPoint.x, spawnPoint.y)
    this.player.create()

    this.physics.add.collider(this.player, outside)

    // this.physics.add.overlap(this.player, this.npc, (player, npc) =>
    //   this.onMeetNPC(player, npc)
    // )

    this.cameras.main.startFollow(this.player)
  }

  update() {
    this.player.update()
  }
}
