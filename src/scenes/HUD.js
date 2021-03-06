import Phaser from 'phaser'
import { fontFamily } from '../constants'
import { getState } from '../helpers/state'
import { throttle } from 'lodash/fp'
import { aboutModal } from '../overlays/about-modal'
import { taskModal } from '../overlays/task-modal'

import tasksFile from '../../assets/tasks.json'

const fontColor = '#fefefe'

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'HUD' })
  }

  preload() {
    this.load.json('tasks', tasksFile)
  }

  create({ parentSceneKey }) {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    this.add
      .text(20, 20, getState(['player', 'name']), {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    this.add
      .text(20, gameHeight - 20, parentSceneKey, {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(0, 1)
      .setScrollFactor(0, 0)

    const taskButton = this.add
      .text(gameWidth - 20, 20, 'Tasks', {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)

    taskButton.setInteractive(
      new Phaser.Geom.Rectangle(
        -taskButton.width / 2,
        -taskButton.height / 2,
        taskButton.width + 20 * 2,
        taskButton.height + 20 * 2
      ),
      Phaser.Geom.Rectangle.Contains
    )

    const aboutButton = this.add
      .text(gameWidth - 20, gameHeight - 20, '?', {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(1, 1)
      .setScrollFactor(0, 0)

    aboutButton.setInteractive(
      new Phaser.Geom.Rectangle(
        -aboutButton.width / 2,
        -aboutButton.height / 2,
        aboutButton.width + 20 * 2,
        aboutButton.height + 20 * 2
      ),
      Phaser.Geom.Rectangle.Contains
    )

    taskButton.on('pointerdown', () => {
      this.scene.pause(parentSceneKey)
      taskModal.open({
        tasksText: this.cache.json.get('tasks'),
        onClose: () => this.scene.resume(parentSceneKey),
      })
    })

    aboutButton.on('pointerdown', () => {
      this.scene.pause(parentSceneKey)
      aboutModal.open({
        translations: this.cache.json.get('translations'),
        changelog: this.cache.json.get('changelog')['changelog'],
        onClose: () => this.scene.resume(parentSceneKey),
      })
    })

    this.sys.game.events.on('unavailable', throttle(1000, () => this.showMiddleText('Coming soon')))
    this.sys.game.events.on(
      'task-discovered',
      throttle(1000, () => {
        const dot = this.showTasksNotification()
        window.setTimeout(() => this.clearTasksNotification(dot), 5000)
        this.showMiddleText('Task discovered')
      })
    )
    this.sys.game.events.on(
      'task-completed',
      throttle(1000, () => {
        this.showMiddleText('Task completed')
      })
    )
    this.sys.game.events.on(
      'item-obtained',
      throttle(1000, () => {
        const dot = this.showTasksNotification()
        window.setTimeout(() => this.clearTasksNotification(dot), 5000)
        this.showMiddleText('Item obtained.')
      })
    )
  }

  update() {}

  showMiddleText(text) {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    if (this.middleText) {
      this.middleText.destroy()
    }

    this.middleText = this.add
      .text(gameWidth * 0.5, gameHeight * 0.5, text, {
        fontFamily: fontFamily,
        fontSize: '16px',
        fill: fontColor,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    window.setTimeout(() => this.middleText.destroy(), 1000)
  }

  showTasksNotification() {
    const gameWidth = this.sys.game.config.width
    const gameHeight = this.sys.game.config.height

    return this.add
      .graphics()
      .fillStyle(0x2ecc40, 1.0)
      .fillCircle(gameWidth - 15, 20, 4)
  }

  clearTasksNotification(dot) {
    dot.clear()
  }
}
