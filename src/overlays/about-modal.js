import { app } from 'hyperapp'
import { h } from 'ijk'
import { take } from 'lodash/fp'
import { getLanguage } from '../helpers/translation'
import { getState, setState } from '../helpers/state'

const language = getLanguage()

const state = {
  isOpen: false,
  translations: null,
  onClose: () => null,
  changelog: [],
  lastSeen: 0,
}

const actions = {
  open: ({ translations, onClose, changelog }) => ({
    isOpen: true,
    translations,
    onClose,
    changelog,
    lastSeen: getState(['history', 'changelog']) || 0,
  }),
  close: () => state => {
    setState({ history: { changelog: state.changelog.length } })
    state.onClose()
    return { isOpen: false, onClose: () => null }
  },
}

const oncreate = actions => {
  window.onclick = e => {
    if (e.target.classList.contains('modal')) {
      actions.close()
    }
  }
}

const featuresList = ({ translations, changelog, updates }) => [
  'div',
  [
    ['h1', translations['changelog'][language]],
    ['ul', take(updates, changelog).map(feature => ['li', feature[language]])],
  ],
]

const content = ({ translations, lastSeen, changelog }) => [
  'div',
  { class: 'modal-long-content' },
  [
    lastSeen !== changelog.length &&
      featuresList({ translations, changelog, updates: changelog.length - lastSeen }),
    ['h1', translations['about-us'][language]],
    ['p', translations['about-us-content'][language]],
    lastSeen === changelog.length && featuresList({ translations, changelog, updates: 5 }),
    ['h1', translations['feedback'][language]],
    [
      'a',
      { class: 'feedback-link', href: 'https://m.me/CSA.ENS.HKUSU', target: '_blank' },
      translations['inbox-us'][language],
    ],
  ],
]

const close = closeAction => ['button', { onclick: closeAction, class: 'modal-close' }, 'x']

const view = (state, actions) =>
  h('nodeName', 'attributes', 'children')([
    'div',
    {
      class: ['modal', state.isOpen ? 'active' : ''].join(' '),
      oncreate: () => oncreate(actions),
    },
    [
      ['div', { class: 'modal-overlay' }],
      [
        'div',
        { class: 'modal-content' },
        [close(actions.close), state.translations && content(state)],
      ],
    ],
  ])

export const aboutModal = app(state, actions, view, document.getElementById('modal'))
