export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface StateProps  {
  todos:Todo[],
  editedTodo:null | Todo,
  remaining:Number,
  filteredTodos:Todo[],
  allDone:any,
  [propName: string]: any
}

export type EnterValueProps = any
