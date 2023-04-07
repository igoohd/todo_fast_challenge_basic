<template>
  <main>
    <h1>To-do list</h1>
    <input type="text" v-model="todoText">
    <button @click="addTodo()">Add</button>
    <ul>
      <li v-for="todo in todoList">
        {{ todo.name }}
        <button @click="removeTodo(todo.id)">Remove</button>
        <button
          v-if="!todo.completed"
          @click="markAsCompleted(todo.id)">
          Mark as completed
        </button>
        <button
          v-else
          @click="markAsIncomplete(todo.id)">
          Mark as incomplete
        </button>
        <button
          @click="openEdit(todo.id)">
          Edit
        </button>
      </li>
    </ul>
    <div v-if="isEditEnable">
      <input type="text" v-model="editTodoText">
      <button
          @click="saveEdit()">
          Save
        </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import  { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const { todoList } = storeToRefs(todoStore)

const todoText = ref('')
const activeEditItem = ref<number | undefined>(undefined)
const editTodoText = ref('')
const isEditEnable = ref(false)

onMounted(() => {
  checkTodoLocalStorage()
})

const checkTodoLocalStorage = () => {
  const todoLocalStorage = window.localStorage.getItem('todoListStorage')
  
  if (todoLocalStorage) {
    todoStore.addTodoList(JSON.parse(todoLocalStorage))
  }
}

const addTodo = () => {
  todoStore.addTodo(todoText.value)
  todoText.value = ''
}

const removeTodo = (id: number) => {
  todoStore.removeTodo(id)
}

const markAsCompleted = (id: number) => {
  todoStore.markAsCompleted(id)
}

const markAsIncomplete = (id: number) => {
  todoStore.markAsIncomplete(id)
}

const openEdit = (id: number) => {
  isEditEnable.value = true
  activeEditItem.value = id
  const matchedEditItem = todoList.value.find((todoItem) => todoItem.id == id) || '' as any
  editTodoText.value = matchedEditItem.name
}

const saveEdit = () => {
  todoStore.saveEdit(Number(activeEditItem.value), editTodoText.value)
  isEditEnable.value = false
  editTodoText.value = ''
}

</script>
