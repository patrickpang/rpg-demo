import { getState, setState } from './state'
import LineBreaker from 'linebreak/src/linebreaker'

export function getLanguage() {
  const currentLanguage = getState(['player', 'language'])
  if (!currentLanguage) {
    const fullLanguage =
      window.navigator.language ||
      window.navigator.userLanguage ||
      window.navigator.browserLanguage ||
      window.navigator.systemLanguage
    const language = fullLanguage.includes('en') ? 'en' : 'zh'
    setState({ player: { language } })
    return language
  } else {
    return currentLanguage
  }
}

export function wrappedZhText(text) {
  let words = []
  let breaker = new LineBreaker(text)
  let last = 0
  let bk

  while ((bk = breaker.nextBreak())) {
    const word = text.slice(last, bk.position)
    words.push(word.trim())
    last = bk.position
  }

  return words.join(' ')
}
