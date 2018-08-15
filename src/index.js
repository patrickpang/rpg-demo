import Phaser from 'phaser'
import StartScene from './scenes/StartScene'
import Dialog from './scenes/dialog'
import Lift from './scenes/lift'
import HUD from './scenes/HUD'

import { createFromTilemap } from './helpers/scene'

import UpperUStreetMap from '../assets/levels/UpperUStreet.json'
import LowerUStreetMap from '../assets/levels/LowerUStreet.json'
import Haking3FMap from '../assets/levels/Haking3F.json'
import Haking5FMap from '../assets/levels/Haking5F.json'
import HakingTunnelMap from '../assets/levels/HakingTunnel.json'
import HappyParkMap from '../assets/levels/HappyPark.json'
import LEPlatformMap from '../assets/levels/LEPlatform.json'
import CBGFMap from '../assets/levels/CBGF.json'
import CBLG1Map from '../assets/levels/CBLG1.json'
import ChiWahGFMap from '../assets/levels/ChiWahGF.json'
import KKGFMap from '../assets/levels/KKGF.json'
import KK1FMap from '../assets/levels/KK1F.json'
import Knowles1FMap from '../assets/levels/Knowles1F.json'
import KnowlesGFMap from '../assets/levels/KnowlesGF.json'
import KnowlesKKTunnelMap from '../assets/levels/KnowlesKKTunnel.json'
import SUBuilding1FMap from '../assets/levels/SUBuilding1F.json'
import SUBuildingGFMap from '../assets/levels/SUBuildingGF.json'
import CentenLGMap from '../assets/levels/CentenLG.json'
import MainBuilding1FMap from '../assets/levels/MainBuilding1F.json'

const scenesData = [
  ['UpperUStreet', UpperUStreetMap],
  ['LowerUStreet', LowerUStreetMap],
  ['Haking3F', Haking3FMap],
  ['Haking5F', Haking5FMap],
  ['HakingTunnel', HakingTunnelMap],
  ['HappyPark', HappyParkMap],
  ['LEPlatform', LEPlatformMap],
  ['CBGF', CBGFMap],
  ['CBLG1', CBLG1Map],
  ['ChiWahGF', ChiWahGFMap],
  ['KKGF', KKGFMap],
  ['KK1F', KK1FMap],
  ['Knowles1F', Knowles1FMap],
  ['KnowlesGF', KnowlesGFMap],
  ['KnowlesKKTunnel', KnowlesKKTunnelMap],
  ['SUBuilding1F', SUBuilding1FMap],
  ['SUBuildingGF', SUBuildingGFMap],
  ['CentenLG', CentenLGMap],
  ['MainBuilding1F', MainBuilding1FMap],
]

const scenes = scenesData.map(([sceneKey, map]) => {
  const scene = new Phaser.Scene(sceneKey)

  scene.preload = function() {
    scene.load.tilemapTiledJSON(sceneKey + 'Map', map)
  }

  scene.create = function({ target }) {
    createFromTilemap(scene, sceneKey + 'Map', 'ideal_tileset', target)
  }

  scene.update = function() {
    scene.player.update()
  }

  return scene
})

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
      debug: false,
    },
  },
  scene: [StartScene, Dialog, Lift, HUD].concat(scenes),
}

const game = new Phaser.Game(config)

window.addEventListener('orientationchange', () => location.reload())
