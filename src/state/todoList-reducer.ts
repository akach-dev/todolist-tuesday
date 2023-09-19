import {TodolistType} from "../App";
import {useId} from "react";
import {v1} from "uuid";

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type AddTodoListType = ReturnType<typeof addTodoListAC>

type ActionType = RemoveTodolistType | AddTodoListType

export const todoListReducer = (state: TodolistType[], action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(todo => todo.id !== action.id)
    case "ADD-TODOLIST":
      return [...state, {id: v1(), filter: "all", title: action.title}]
    default:
      throw new Error("i don't understand this type")
  }
}

export const removeTodolistAC = (id: string) => {
  return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodoListAC = (title: string) => {
  return {type: 'ADD-TODOLIST', title} as const
}