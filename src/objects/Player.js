import Phaser from 'phaser'

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

  moveAlong(path) {
    const tweens = []
    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i + 1].x
      const ey = path[i + 1].y
      tweens.push({
        targets: this,
        x: { value: ex * this.scene.map.tileWidth, duration: 200 },
        y: { value: ey * this.scene.map.tileHeight, duration: 200 },
        onStart: () =>
          this.updateOnTween(
            path[i + 1].x - path[i].x,
            path[i + 1].y - path[i].y
          ),
      })
    }

    this.scene.tweens.timeline({
      tweens: tweens,
      onComplete: () => this.animateMove(),
    })
  }

  update(time, delta) {}

  updateOnTween(offsetX, offsetY) {
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
