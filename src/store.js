// store.js

import { createStore } from 'redux'
import { createAction, createReducer } from '@reduxjs/toolkit'

const addToDo = createAction('ADD')
const deleteToDo = createAction('DELETE')

const initialState = JSON.parse(localStorage.getItem('todos')) || []

const reducer = createReducer(initialState, {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() })
  },
  [deleteToDo]: (state, action) => {
    return state.filter((toDo) => toDo.id !== action.payload)
  },
})

const store = createStore(reducer)

// 스토어의 상태가 변경될 때마다 localStorage에 저장
store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()))
})

export const actionCreators = {
  addToDo,
  deleteToDo,
}

export default store
