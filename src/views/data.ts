/* eslint-disable */
import { Todo } from './interface'

export const STORAGE_KEY = 'todos-vuejs-3.x'

export const pageMethods = {
  l_get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  l_set(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}
