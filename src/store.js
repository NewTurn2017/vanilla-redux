// store.js

import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: JSON.parse(localStorage.getItem('todos')) || [],
  reducers: {
    addToDo: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() })
    },
    deleteToDo: (state, action) => {
      return state.filter((toDo) => toDo.id !== action.payload)
    },
  },
})

const store = createStore(todosSlice.reducer)

// 스토어의 상태가 변경될 때마다 localStorage에 저장
store.subscribe(() => {
  localStorage.setItem('todos', JSON.stringify(store.getState()))
})

export const { addToDo, deleteToDo } = todosSlice.actions

export default store
