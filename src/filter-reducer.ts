import {FilterValuesType} from "./App";
import {changeTaskStatusAC} from "./todoList-reducer";

type ChangeFilterAC = ReturnType<typeof changeFilterAC>
type ActionType = ChangeFilterAC

export const filterReducer = (state: FilterValuesType, action: ActionType) => {
  switch (action.type) {
    case "CHANGE-FILTER":
      return action.value
    default:
      return state
  }
};

export const changeFilterAC = (value: FilterValuesType) => {
  return {type: 'CHANGE-FILTER', value}
}
