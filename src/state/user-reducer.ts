import {FilterValuesType} from "../App";
import {v1} from "uuid";


type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type AddTodoListActionType = {
  type: 'ADD-TODOLIST'
  title: string
}
type RemoveTodoListActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}

type ChangeTodoListTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

type ChangeTodoListFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}

type ActionsType =
   AddTodoListActionType
   | RemoveTodoListActionType
   | ChangeTodoListTitleActionType
   | ChangeTodoListFilterActionType

export const todoListsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(todo => todo.id !== action.id)
    case 'ADD-TODOLIST':
      const newTodo: TodolistType = {title: action.title, id: v1(), filter: "all"}
      return [...state, newTodo]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
    default:
      throw new Error("I don't understand this type")
  }
}
