import Phaser from 'phaser'
import StartScene from './scenes/StartScene'
import WorldScene from './scenes/WorldScene'

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: window.innerWidth / 3,
  height: window.innerHeight / 3,
  zoom: 3,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [StartScene, WorldScene],
}

const game = new Phaser.Game(config)

// https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/

// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Sprite.html
// https://github.com/simiancraft/create-phaser-app/blob/master/src/sprites/player/index.js

// https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.ArcadePhysics.html#moveToObject__anchor

// https://phaser.io/news
// https://twitter.com/phaser_
// https://phaser.io/phaser3/devlog
// https://phaser.io/community/backissues

// https://github.com/rblopes/phaser-3-snake-game/tree/master/app/scripts/scenes -> embedded scenes & objects
// https://gamedevacademy.org/how-to-make-tower-defense-game-with-phaser-3/ -> GameObjects
// https://www.emanueleferonato.com/category/phaser/
// https://github.com/Jerenaux/phaserquest -> classic RPG

// https://github.com/simiancraft/create-phaser-app
// https://github.com/nkholski/phaser3-es6-webpack
// http://labs.phaser.io/index.html

// background layer
// level tilemap layer (obstacles)

// objects: sprites / atlas

// bgm

// TODO: DSL -> phaser

// https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-2/
