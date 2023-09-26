import {TaskType} from "./Todolist";
import {v1} from "uuid";

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>

type ActionType = RemoveTaskAC | AddTaskAC


export const TodoListReducer = (state: TaskType[], action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return state.filter(task => task.id !== action.id)
    case "ADD-TASK":
      const task = {id: v1(), title: action.title, isDone: false}
      return [task, ...state]
    default:
      return new Error('I don"t have this type')
  }
};

export const removeTaskAC = (id: string) => {
  return {type: 'REMOVE-TASK', id} as const
}
export const addTaskAC = (title: string) => {
  return {type: 'ADD-TASK', title} as const
}
