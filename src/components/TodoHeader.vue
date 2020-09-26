<template>
  <div class="header">
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" @keyup.enter="addTodo" v-model="defaultValue" />
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref } from 'vue'
import { InputValue } from './interface'

export default defineComponent({
  name: 'TodoHeader',
  props: {},
  setup(props, { emit }) {
    const defaultValue: any = ref('')
    const addTodo = ({ target: { value } }: InputValue) => {
      emit('fn', value as string)
      defaultValue.value = ''
    }
    return {
      addTodo,
      defaultValue,
    }
  },
})
</script>

<style lang="scss">
.header {
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0px 2px 3px 2px #00000045;
  padding: 12px;
  .new-todo {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
    color: #4d4d4d;
    width: 98%;
    box-sizing: border-box;
  }
}
</style>
