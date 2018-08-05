import Phaser from 'phaser'

import Haking5FMap from '../../assets/levels/Haking5F.json'

import { createFromTilemap } from '../helpers/scene'

export default class Haking5F extends Phaser.Scene {
  constructor() {
    super({ key: 'Haking5F' })
  }

  preload() {
    this.load.tilemapTiledJSON('Haking5FMap', Haking5FMap)
  }

  create(data) {
    createFromTilemap(this, 'Haking5FMap', 'ideal_tileset', data.target)
    this.scene.run('Dialog', {
      paragraphs: [
        'The University of Hong Kong (often abbreviated as HKU) is a public research university located in Pokfulam, Hong Kong. Founded in 1911, its origins can be traced back to the Hong Kong College of Medicine for Chinese which was founded in 1887, it is the oldest tertiary institution in Hong Kong.[5] It is often cited as one of the most prestigious universities in Asia.[6]',
        'Today, the University of Hong Kong is organised into 10 academic faculties with English as the language of instruction. It exhibits strength in scholarly research and education of science, biomedicine,[7] dentistry, education,[8] humanities, law,[9] linguistics,[10] political sciences,[11][12] and social sciences. The University of Hong Kong was also the first team in the world which successfully isolated the corona virus, the causative agent of SARS.[13]',
      ],
    })
  }

  update() {
    this.player.update()
  }
}
