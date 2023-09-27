import {TaskType} from "./Todolist";
import {v1} from "uuid";

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

type ActionType = RemoveTaskAC | AddTaskAC | ChangeTaskStatusAC


export const todoListReducer = (state: TaskType[], action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return state.filter(task => task.id !== action.id)
    case "ADD-TASK":
      const task = {id: v1(), title: action.title, isDone: false}
      return [task, ...state]
    case "CHANGE-TASK-STATUS":
      return state.map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)
    default:
      return state
  }
};

export const removeTaskAC = (id: string) => {
  return {type: 'REMOVE-TASK', id} as const
}
export const addTaskAC = (title: string) => {
  return {type: 'ADD-TASK', title} as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean) => {
  return {type: 'CHANGE-TASK-STATUS', id, isDone} as const
}

