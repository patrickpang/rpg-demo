import { app } from 'hyperapp'
import { h } from 'ijk'

const onsubmit = e => {
  e.preventDefault()
  const nameInput = document.querySelector('input[name="player-name"]')
}

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

const content = [
  'form',
  { onsubmit: onsubmit },
  [
    ['input', { type: 'text', name: 'player-name', placeholder: 'What is your name?' }],
    ['input', { type: 'submit', value: 'Start' }],
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
      ['div', { class: 'modal-content' }, [close(actions.close), content]],
    ],
  ])

export const setNameModal = app(state, actions, view, document.getElementById('modal'))
