import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type AddTodoListType = ReturnType<typeof addTodoListAC>
type ChangeTodoListTitleType = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterType = ReturnType<typeof changeTodoListFilterAC>

type ActionType = RemoveTodolistType | AddTodoListType | ChangeTodoListTitleType | ChangeTodoListFilterType

export const todoListReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(todo => todo.id !== action.id)
    case "ADD-TODOLIST":
      return [...state, {id: v1(), filter: "all", title: action.title}]
    case "CHANGE-TODOLIST-TITLE":
      return state.map(todo => todo.id === action.todolistId ? {...todo, title: action.title} : todo)
    case "CHANGE-TODOLIST-FILTER":
      return state.map(todo => todo.id === action.todolistId ? {...todo, filter: action.filter} : todo)
    default:
      return state
  }
}

export const removeTodolistAC = (id: string) => {
  return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodoListAC = (title: string) => {
  return {type: 'ADD-TODOLIST', title} as const
}
export const changeTodoListTitleAC = (todolistId: string, title: string) => {
  return {type: 'CHANGE-TODOLIST-TITLE', title, todolistId} as const
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}