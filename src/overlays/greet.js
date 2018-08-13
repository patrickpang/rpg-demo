import { app } from 'hyperapp'
import { h } from 'ijk'
import { setState } from '../helpers/state'

const state = {
  visible: false,
  callback: () => null,
}

const actions = {
  show: callback => ({ callback, visible: true }),
  submit: () => state => {
    const nameInput = document.querySelector('input[name="player-name"]')
    if (nameInput.value !== '') {
      setState({ player: { name: nameInput.value } })
      state.callback()
      return { visible: false }
    } else {
      return {}
    }
  },
}

const view = (state, actions) =>
  h('nodeName', 'attributes', 'children')([
    'div',
    { class: 'greet' + (state.visible ? ' active' : '') },
    [
      [
        ['h1', 'My Day In HKU'],
        ['h2', 'made by CSA with ❤️'],
        [
          'form',
          {
            onsubmit: e => {
              e.preventDefault()
              actions.submit()
            },
          },
          [
            [
              'input',
              {
                type: 'text',
                name: 'player-name',
                placeholder: 'What is your name?',
                autofocus: true,
              },
            ],
            ['button', { type: 'submit' }, 'Submit'],
          ],
        ],
      ],
    ],
  ])

export const greetOverlay = app(state, actions, view, document.getElementById('overlay'))
