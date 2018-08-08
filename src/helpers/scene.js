import Player from '../objects/Player'
import { getState, setState } from './state'
import { randomNPCName, randomFrame } from './npc'

export function createFromTilemap(scene, mapKey, tilesetKey, from) {
  scene.cameras.main.fadeIn(200)

  setState({ location: { scene: scene.scene.key } })

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
      .setData(
        'target',
        entrance.properties && entrance.properties['target']
          ? entrance.properties['target']
          : scene.scene.key
      )
      .setData('key', entrance.properties && entrance.properties['key'])
  )

  const dialogZones = scene.physics.add.group({ classType: Phaser.GameObjects.Zone })
  const dialogLayer = map.getObjectLayer('Dialogs')
  if (dialogLayer) {
    dialogLayer.objects.forEach(dialog =>
      dialogZones
        .create(dialog.x, dialog.y, dialog.width, dialog.height)
        .setData('key', dialog.name)
    )
  }

  const taskZones = scene.physics.add.group({ classType: Phaser.GameObjects.Zone })
  const taskLayer = map.getObjectLayer('Tasks')
  if (taskLayer) {
    taskLayer.objects.forEach(task =>
      taskZones
        .create(task.x, task.y, task.width, task.height)
        .setData('key', task.name)
        .setData(
          'completed',
          task.properties && task.properties['completed'] ? task.properties['completed'] : false
        )
        .setData(
          'obtained',
          task.properties && task.properties['obtained'] ? task.properties['obtained'] : false
        )
    )
  }

  const npcLayer = map.getObjectLayer('NPCs')
  if (npcLayer) {
    npcLayer.objects.forEach(npc =>
      scene.physics.add.sprite(npc.x, npc.y, randomNPCName(), randomFrame())
    )
  }

  const spawnPoint =
    map.findObject('Players', obj => obj.name === (from || 'Start')) ||
    map.getObjectLayer('Players').objects[0]

  scene.player = new Player(
    scene,
    spawnPoint.x,
    spawnPoint.y,
    getState(['player', 'gender']) === 'M' ? 'george' : 'betty'
  )
  scene.player.create()

  const playerFront = map.createDynamicLayer('Player Front', tiles, 0, 0)

  scene.physics.add.collider(scene.player, border)
  scene.physics.add.collider(scene.player, back)
  scene.physics.add.collider(scene.player, front)

  scene.physics.add.overlap(scene.player, zones, (_, entrance) => {
    const name = entrance.getData('name')

    if (name === 'Lift') {
      scene.scene.start('Lift', { key: entrance.getData('key') })
    } else if (scene.scene.get(name)) {
      scene.scene.start(name, { target: entrance.getData('target') })
    } else {
      scene.scene.run('Dialog', {
        parentScene: scene,
        paragraphs: ['Temporarily Unavailable'],
      })
    }
  })

  scene.physics.add.overlap(scene.player, dialogZones, (_, dialog) => {
    const key = dialog.getData('key')
    const shown = getState(['history', 'dialogs', key])
    if (!shown) {
      setState({ history: { dialogs: { [key]: true } } })

      scene.scene.run('Dialog', {
        parentScene: scene,
        key,
      })
    }
  })

  scene.physics.add.overlap(scene.player, taskZones, (_, task) => {
    const key = task.getData('key')
    const taskState = getState(['tasks', key])

    if (taskState && taskState.completed) {
      return
    }

    const completed = task.getData('completed')
    const obtained = task.getData('obtained')

    if (!taskState) {
      setState({ tasks: { [key]: { completed, obtained } } })
    } else if (!taskState.obtained && obtained) {
      setState({ tasks: { [key]: { obtained: true } } })
    } else if (taskState.obtained && !obtained) {
      setState({ tasks: { [key]: { completed: true } } })

      scene.scene.run('Dialog', {
        parentScene: scene,
        key: 'thank-you',
      })
    } else if (!taskState.completed && completed) {
      setState({ tasks: { [key]: { completed: true } } })
    }
  })

  scene.scene.run('HUD', { sceneKey: scene.scene.key })
  scene.scene.bringToTop('HUD')
  scene.events.on('shutdown', () => scene.scene.stop('HUD'))

  scene.cameras.main.startFollow(scene.player)
}
