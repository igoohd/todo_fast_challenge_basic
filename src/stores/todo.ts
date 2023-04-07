import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface ITodoList {
  id: number
  name: String
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todoList = ref<ITodoList[]>([])

  const updateCookieValue = () => {
    window.localStorage.setItem('todoListStorage', JSON.stringify(todoList.value))
  }
  
  const addTodo = (todoName: String) => {
    const todoValue = {
      id: todoList.value.length + 1,
      name: todoName,
      completed: false
    }

    todoList.value = [...todoList.value, todoValue]
    updateCookieValue()
  }

  const addTodoList = (todoListValue: ITodoList[]) => {
    todoList.value = todoListValue
  }

  const saveEdit = (id: number, name: String) => {
    const matchedItemIndex = todoList.value.findIndex((todoItem) => todoItem.id == id)
    todoList.value[matchedItemIndex].name = name
    updateCookieValue()
  }

  const removeTodo = (id: number) => {
    const newTodoList = todoList.value.filter((todoItem) => todoItem.id !== id)
    addTodoList(newTodoList)
    updateCookieValue()
  }

  const markAsCompleted = (id: number) => {
    const matchedItemIndex = todoList.value.findIndex((todoItem) => todoItem.id == id)
    todoList.value[matchedItemIndex].completed = true
    updateCookieValue()
  }

  const markAsIncomplete = (id: number) => {
    const matchedItemIndex = todoList.value.findIndex((todoItem) => todoItem.id == id)
    todoList.value[matchedItemIndex].completed = false
    updateCookieValue()
  }

  return { todoList, addTodo, addTodoList, removeTodo, markAsCompleted, markAsIncomplete, saveEdit }
})
