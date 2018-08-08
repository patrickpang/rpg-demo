import Phaser from 'phaser'
import StartScene from './scenes/StartScene'
import UpperUStreet from './scenes/UpperUStreet'
import Haking5F from './scenes/Haking5F'
import Dialog from './helpers/dialog'

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [StartScene, UpperUStreet, Haking5F, Dialog],
}

const game = new Phaser.Game(config)
