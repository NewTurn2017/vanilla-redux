// store.js

import { createStore } from 'redux'

const ADD = 'ADD'
const DELETE = 'DELETE'

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  }
}

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  }
}

const initialState = JSON.parse(localStorage.getItem('todos')) || []

const reducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case ADD:
      newState = [{ text: action.text, id: Date.now() }, ...state]
      break
    case DELETE:
      newState = state.filter((toDo) => toDo.id !== action.id)
      break
    default:
      newState = state
  }
  localStorage.setItem('todos', JSON.stringify(newState))
  return newState
}

const store = createStore(reducer)

export const actionCreators = {
  addToDo,
  deleteToDo,
}

export default store
