// store.js

import { createStore } from 'redux'
import { createAction } from '@reduxjs/toolkit'

const addToDo = createAction('ADD')
const deleteToDo = createAction('DELETE')

const initialState = JSON.parse(localStorage.getItem('todos')) || []

const reducer = (state = initialState, action) => {
  let newState
  switch (action.type) {
    case addToDo.type:
      newState = [{ text: action.payload, id: Date.now() }, ...state]
      break
    case deleteToDo.type:
      newState = state.filter((toDo) => toDo.id !== action.payload)
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
