import { merge, get } from 'lodash/fp'

const storageKey = 'my-day-in-hku'

function getSavedState() {
  return JSON.parse(window.localStorage.getItem(storageKey))
}

function saveState(newState) {
  window.localStorage.setItem(storageKey, JSON.stringify(newState))
}

export function setState(partialState) {
  const state = getSavedState()
  const newState = merge(state, partialState)
  saveState(newState)
  return newState
}

export function getState(path) {
  const state = getSavedState()
  return get(path, state)
}
