import { createStore } from 'redux'

const todoForm = document.getElementById('todoForm')
const todoInput = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: action.id }, ...state]
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}
const store = createStore(reducer)

const render = () => {
  const state = store.getState()
  todoList.innerHTML = ''
  state.forEach((todo) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    button.innerText = 'DEL'
    button.addEventListener('click', () => {
      store.dispatch({ type: DELETE_TODO, id: todo.id })
    })
    li.innerText = todo.text
    li.appendChild(button)
    todoList.appendChild(li)
  })
}

store.subscribe(render)

const onSubmit = (e) => {
  e.preventDefault()
  const todo = todoInput.value
  todoInput.value = ''
  const id = Date.now().toString() // Use the current timestamp as a unique id
  store.dispatch({ type: ADD_TODO, text: todo, id: id })
}

todoForm.addEventListener('submit', onSubmit)
