import Player from '../objects/Player'

export function createFromTilemap(scene, mapKey, tilesetKey) {
  scene.cameras.main.fadeIn(200)

  const map = scene.make.tilemap({ key: mapKey })

  scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
  scene.physics.world.bounds.width = map.widthInPixels
  scene.physics.world.bounds.height = map.heightInPixels

  const tiles = map.addTilesetImage(tilesetKey, tilesetKey)

  map.createDynamicLayer('Floor', tiles, 0, 0)

  const border = map.createDynamicLayer('Border', tiles, 0, 0)
  const back = map.createDynamicLayer('Back', tiles, 0, 0)
  const front = map.createDynamicLayer('Front', tiles, 0, 0)

  border.setCollisionByExclusion([-1])
  back.setCollisionByExclusion([-1])
  front.setCollisionByExclusion([-1])

  map.createDynamicLayer('Door Back', tiles, 0, 0)
  map.createDynamicLayer('Door Front', tiles, 0, 0)

  const zones = scene.physics.add.group({ classType: Phaser.GameObjects.Zone })

  map.getObjectLayer('Entrances').objects.forEach(entrance =>
    zones
      .create(entrance.x, entrance.y, entrance.width, entrance.height)
      .setData('name', entrance.name)
      .setData('target', entrance.properties ? entrance.properties['target'] : undefined)
  )

  const spawnPoint = map.findObject('Players', obj => obj.name === 'Start')
  scene.player = new Player(scene, spawnPoint.x, spawnPoint.y)
  scene.player.create()

  const playerFront = map.createDynamicLayer('Player Front', tiles, 0, 0)

  scene.physics.add.collider(scene.player, border)
  scene.physics.add.collider(scene.player, back)
  scene.physics.add.collider(scene.player, front)

  scene.physics.add.overlap(scene.player, zones, (player, entrance) => {
    console.log(entrance.getData('target'))
    scene.scene.start(entrance.getData('name'))
  })

  // scene.npc = scene.physics.add.sprite(80, 20, 'players', 3)

  scene.cameras.main.startFollow(scene.player)
}
