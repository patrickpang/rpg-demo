import Phaser from 'phaser'

import { tileWidth, tileHeight } from '../constants'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'players', 6)
    this.scene = scene
  }

  preload() {}

  create() {
    this.scene.physics.world.enable(this)
    this.scene.add.existing(this)

    this.setCollideWorldBounds(true)

    this.createAnimations()
  }

  createAnimations() {
    const animationManager = this.anims.animationManager

    animationManager.create({
      key: 'left',
      frames: animationManager.generateFrameNumbers('players', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    })

    animationManager.create({
      key: 'right',
      frames: animationManager.generateFrameNumbers('players', {
        frames: [1, 7, 1, 13],
      }),
      frameRate: 10,
      repeat: -1,
    })
    animationManager.create({
      key: 'up',
      frames: animationManager.generateFrameNumbers('players', {
        frames: [2, 8, 2, 14],
      }),
      frameRate: 10,
      repeat: -1,
    })
    animationManager.create({
      key: 'down',
      frames: animationManager.generateFrameNumbers('players', {
        frames: [0, 6, 0, 12],
      }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update() {
    const pointer = this.scene.input.activePointer
    const targetX = this.scene.cameras.main.scrollX + pointer.x
    const targetY = this.scene.cameras.main.scrollY + pointer.y

    if (pointer.isDown && !this.getBounds().contains(targetX, targetY)) {
      this.moveTowards(targetX, targetY)
    } else {
      this.stopMovement()
    }
  }

  moveTowards(targetX, targetY) {
    this.scene.physics.moveTo(this, targetX, targetY, 80)

    const offsetX = Math.round((targetX - this.x) / tileWidth)
    const offsetY = Math.round((targetY - this.y) / tileHeight)

    if (offsetX < 0) {
      this.animateMove('left')
    } else if (offsetX > 0) {
      this.animateMove('right')
    } else if (offsetY < 0) {
      this.animateMove('up')
    } else if (offsetY > 0) {
      this.animateMove('down')
    } else {
      this.animateMove()
    }
  }

  stopMovement() {
    if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
      this.setVelocity(0, 0)
      this.anims.stop()
    }
  }

  animateMove(direction) {
    switch (direction) {
      case 'left':
        this.anims.play('left', true)
        this.flipX = true
        break
      case 'right':
        this.anims.play('right', true)
        this.flipX = false
        break
      case 'up':
        this.anims.play('up', true)
        break
      case 'down':
        this.anims.play('down', true)
        break
      default:
        this.anims.stop()
    }
  }
}
