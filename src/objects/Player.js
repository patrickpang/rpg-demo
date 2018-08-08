import Phaser from 'phaser'

import { tileWidth, tileHeight } from '../constants'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, character) {
    super(scene, x, y, character, 0)
    this.scene = scene
    this.character = character
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
      key: this.character + '-left',
      frames: animationManager.generateFrameNumbers(this.character, {
        frames: [1, 5, 9, 13],
      }),
      frameRate: 10,
      repeat: -1,
    })

    animationManager.create({
      key: this.character + '-right',
      frames: animationManager.generateFrameNumbers(this.character, {
        frames: [3, 7, 11, 15],
      }),
      frameRate: 10,
      repeat: -1,
    })
    animationManager.create({
      key: this.character + '-up',
      frames: animationManager.generateFrameNumbers(this.character, {
        frames: [2, 6, 10, 14],
      }),
      frameRate: 10,
      repeat: -1,
    })
    animationManager.create({
      key: this.character + '-down',
      frames: animationManager.generateFrameNumbers(this.character, {
        frames: [0, 4, 8, 12],
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
    this.scene.physics.moveTo(
      this,
      targetX,
      targetY,
      Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY) + 50
    )

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
        this.anims.play(this.character + '-left', true)
        break
      case 'right':
        this.anims.play(this.character + '-right', true)
        break
      case 'up':
        this.anims.play(this.character + '-up', true)
        break
      case 'down':
        this.anims.play(this.character + '-down', true)
        break
      default:
        this.anims.stop()
    }
  }
}
