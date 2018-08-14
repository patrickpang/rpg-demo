import { app } from 'hyperapp'
import { h } from 'ijk'
import { getState } from '../helpers/state'
import { getLanguage } from '../helpers/translation'

const language = getLanguage()

const filters = ['all', 'todo', 'obtained', 'completed']
const filterFns = {
  all: () => true,
  todo: task => !task.completed,
  obtained: task => task.obtained && !task.completed,
  completed: task => task.completed,
}

const state = {
  isOpen: false,
  taskList: [],
  tasks: {},
  tasksText: {},
  selectedFilter: 'todo',
  onClose: () => null,
}

const actions = {
  close: () => state => {
    state.onClose()
    return { isOpen: false, onClose: () => null }
  },
  open: ({ tasksText, onClose }) => ({
    isOpen: true,
    taskList: getState(['taskList']),
    tasks: getState(['tasks']),
    tasksText,
    onClose,
  }),
  selectFilter: filter => ({ selectedFilter: filter }),
}

const oncreate = actions => {
  window.onclick = e => {
    if (e.target.classList.contains('modal')) {
      actions.close()
    }
  }
}

const filtersSelect = (state, actions) => [
  'div',
  { class: 'filters' },
  [
    filters.map(filter => [
      'button',
      {
        class: filter === state.selectedFilter ? 'selected-filter' : '',
        onclick: () => actions.selectFilter(filter),
      },
      filter,
    ]),
  ],
]

const taskItem = (task, taskText) => [
  'div',
  { class: 'todo-item' },
  [
    ['input', { type: 'checkbox', checked: task.completed }, ''],
    ['b', taskText.title],
    ['p', taskText.description],
  ],
]

const filteredTaskList = (filter, taskList, tasks, tasksText) => [
  'div',
  { class: 'task-list modal-inner-content' },
  taskList
    .filter(key => filterFns[filter](tasks[key]))
    .map(key => taskItem(tasks[key], tasksText[key][language])),
]

const content = (state, actions) => [
  'div',
  [
    ['h1', 'Tasks'],
    filtersSelect(state, actions),
    filteredTaskList(state.selectedFilter, state.taskList, state.tasks, state.tasksText),
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
      ['div', { class: 'modal-content' }, [close(actions.close), content(state, actions)]],
    ],
  ])

export const taskModal = app(state, actions, view, document.getElementById('modal'))
