<template>
  <div class="todoapp-box">
    <section class="todoapp">
      <h1>vue3 todos</h1>
      <TodoHeader @fn="addTodo" />
      <TodoSection
        @editTodo="editTodo"
        @removeTodo="removeTodo"
        @toggle="toggle"
        @doneEdit="doneEdit"
        :editedTodo="state.editedTodo"
        :filteredTodos="state.filteredTodos"
        :allDone="state.allDone"
      />
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ state.remaining }} items</strong>
        </span>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="state.todos.length > state.remaining"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
} from 'vue'
import TodoHeader from '@/components/TodoHeader.vue'
import TodoSection from '@/components/TodoSection.vue'
import { STORAGE_KEY, pageMethods } from './data'
import { Todo, EnterValueProps,StateProps } from './interface'

const todoStorage: any = {
  fetch() {
    const todos = pageMethods.l_get()
    todos.forEach((todo: Todo, index: number) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save(todos: Todo[]) {
    pageMethods.l_set(todos)
  },
}

const filters: any = {
  all(todos: Todo[]) {
    return todos
  },
  active(todos: Todo[]) {
    return todos.filter((todo: Todo) => !todo.completed)
  },
  completed(todos: Todo[]) {
    return todos.filter((todo: Todo) => todo.completed)
  },
}

export default defineComponent({
  name: 'to do list',
  components: {
    TodoHeader,
    TodoSection,
  },
  props: {
   
  },
  setup(props: any) {
    const enterValue: EnterValueProps = ref('')
    const state: StateProps = reactive({
      todos: todoStorage.fetch(),
      editedTodo: null,
      remaining: computed(() => {
        return filters.active(state.todos).length
      }),
      filteredTodos: computed(() => {
        return filters['all'](state.todos)
      }),
      allDone: computed({
        get: function () {
          return state.remaining === 0
        },
        set: function (value: boolean) {
          state.todos.forEach((todo: Todo) => {
            todo.completed = value
          })
        },
      }),
    })

    function addTodo(value) {
      if (!value) {
        return
      }
      state.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false,
      })
    }
    function removeTodo(todo: Todo) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    }
    function editTodo(todo: Todo) {
      state.editedTodo = todo
    }
    function doneEdit(todo: Todo) {
      if (!state.editedTodo) {
        return
      }
      state.editedTodo = null
      state.todos = state.todos.map((item) => {
        if (item.id === todo.id) return todo
        return item
      })
    }
    function removeCompleted() {
      state.todos = filters.active(state.todos)
    }
    function toggle(todo: Todo) {
      state.todos = state.todos.map((item) => {
        if (item.id === todo.id) return { ...todo, completed: !todo.completed }
        return item
      })
    }

    watchEffect(() => {
      todoStorage.save(state.todos)
    })

    onMounted(() => {})

    onUnmounted(() => {})

    return {
      state,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      toggle,
      removeCompleted,
      enterValue,
    }
  },
  directives: {
    'todo-focus': (el, { value }) => {
      if (value) {
        el.focus()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.todoapp-box {
  position: relative;
  background: #f5f5f5;
  color: #111111;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.todoapp {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  //   margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
  input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
  input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
  h1 {
    width: 100%;
    font-size: 80px;
    font-weight: 200;
    padding: 0;
    margin: 0;
    text-align: center;
    color: #b83f45;
    text-rendering: optimizeLegibility;
  }
}

.footer {
  padding: 10px 15px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}
</style>
