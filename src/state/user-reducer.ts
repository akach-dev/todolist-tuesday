import {FilterValuesType} from "../App";
import {v1} from "uuid";

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type ActionType = {
  type: string
  [key: string]: string
}

type ChangeTodoListTitleType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string
}

type ChangeTodoListFilterType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

export const todoListsReducer = (state: TodolistType[], action: ActionType | ChangeTodoListTitleType | ChangeTodoListFilterType): TodolistType[] => {
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
