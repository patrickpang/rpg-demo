import { app } from 'hyperapp'
import { h } from 'ijk'
import { getLanguage } from '../helpers/translation'

const language = getLanguage()

const state = {
  isOpen: false,
  translations: {},
  onClose: () => null,
}

const actions = {
  open: ({ translations, onClose }) => ({ isOpen: true, translations, onClose }),
  close: () => state => {
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

const content = translations => [
  'div',
  [
    ['h1', translations['about-us'] && translations['about-us'][language]],
    [
      'p',
      { class: 'modal-inner-content' },
      translations['about-us-content'] && translations['about-us-content'][language],
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
      ['div', { class: 'modal-content' }, [close(actions.close), content(state.translations)]],
    ],
  ])

export const aboutModal = app(state, actions, view, document.getElementById('modal'))
