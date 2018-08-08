import { sample, random } from 'lodash'
import { minFrames } from '../constants'

export function randomNPCName() {
  return sample([
    'betty',
    'george',
    'jeremy-blonde',
    'jeremy-green',
    'jeremy-pink',
    'martha-blonde',
    'martha-green',
    'martha-pink',
  ])
}

export function randomFrame() {
  return random(0, minFrames)
}
