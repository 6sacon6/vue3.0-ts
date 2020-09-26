<template>
  <section class="todo-main">
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{
          completed: todo.completed,
          editing: todo === editedTodo,
        }">
        <div class="todo-view">
          <input class="toggle" type="checkbox" @change="toggle(todo)" :checked="todo.completed" />
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text" :value="todo.title" v-todo-focus="todo === editedTodo" @blur="doneEdit($event, todo)" @keyup.enter="doneEdit($event, todo)" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref } from 'vue'
import { InputValue } from './interface'

export default defineComponent({
  name: 'TodoSection',
  props: {
    allDone: Boolean,
    filteredTodos: Array,
    editedTodo: Object,
  },
  setup(props, { emit }) {
   
    const editTodo = (todo) => emit('editTodo', todo)
    const removeTodo = (todo) =>emit('removeTodo', todo)
    const doneEdit = ({ target }, todo) =>   emit('doneEdit', { ...todo, title: target.value })
    const toggle = (todo) => emit('toggle', todo)

    return {
      editTodo,
      removeTodo,
      doneEdit,
      toggle,
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

<style lang="scss">
.todo-main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none;
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
    &:last-child {
      border-bottom: none;
    }
    &.editing {
      border-bottom: none;
      padding: 0;
      .edit {
        display: block;
        width: calc(100% - 43px);
        padding: 12px 16px;
        margin: 0 0 0 43px;
      }
      .todo-view {
        display: none;
      }
    }
    .toggle {
      text-align: center;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none;
      z-index: 11;
    }
  }
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #4d4d4d;
}

.todo-list li.completed label {
  color: #cdcdcd;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: '×';
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}
</style>
