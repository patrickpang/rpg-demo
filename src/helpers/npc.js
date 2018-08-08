import { sample, random, filter } from 'lodash/fp'
import { minFrames } from '../constants'
import { getState } from './state'

export function randomNPCName() {
  const player = getState(['player', 'gender']) === 'M' ? 'george' : 'betty'

  return sample(
    filter(character => character !== player, [
      'betty',
      'george',
      'jeremy-blonde',
      'jeremy-green',
      'jeremy-pink',
      'martha-blonde',
      'martha-green',
      'martha-pink',
    ])
  )
}

export function randomFrame() {
  return random(0, minFrames)
}
