import { app } from 'hyperapp'
import { h } from 'ijk'

const state = {
  isOpen: false,
}

const actions = {
  open: () => ({ isOpen: true }),
  close: () => ({ isOpen: false }),
}

const oncreate = actions => {
  window.onclick = e => {
    if (e.target.classList.contains('modal')) {
      actions.close()
    }
  }
}

const content = ['div', [['h1', 'About Us'], ['p', 'Hello. We are CSA.']]]

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
      ['div', { class: 'modal-content' }, [close(actions.close), content]],
    ],
  ])

export const aboutModal = app(state, actions, view, document.getElementById('modal'))
