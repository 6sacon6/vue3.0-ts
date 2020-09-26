export interface InputValue {
  target: {
    value: string
    [propName: string]: any
  }
  [propName: string]: any
}
export interface Todo {
  id: number
  title: string
  completed: boolean
}