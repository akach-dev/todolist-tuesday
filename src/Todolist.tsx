import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button} from "@mui/material";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  updateTodoListTitle: (todolistId: string, title: string) => void
  filter: FilterValuesType
}

export const Todolist: FC<PropsType> = ({
                                          removeTodolist,
                                          removeTask,
                                          filter,
                                          tasks,
                                          changeFilter,
                                          addTask,
                                          changeTaskStatus,
                                          title,
                                          id,
                                          updateTaskTitle,
                                          updateTodoListTitle
                                        }) => {


  const removeTodolistHandler = () => removeTodolist(id)

  const onAllClickHandler = () => changeFilter("all", id);
  const onActiveClickHandler = () => changeFilter("active", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);

  const addTaskHandler = (title: string) => addTask(title, id)

  const updateTodoListTitleHandler = (title: string) => updateTodoListTitle(id, title)

  const updateTaskTitleHandler = (title: string, taskId: string) => updateTaskTitle(id, taskId, title)

  return <div>
    <h3>
      <EditableSpan oldTitle={title} callback={updateTodoListTitleHandler}/>
      <button onClick={removeTodolistHandler}>x</button>
    </h3>
    <AddItemForm addItem={addTaskHandler}/>

    <ul>
      {
        tasks.map(t => {
          const onClickHandler = () => removeTask(t.id, id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(t.id, newIsDoneValue, id);
          }


          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan oldTitle={t.title} callback={(title) => updateTaskTitleHandler(title, t.id)}/>

            <Button
               onClick={onClickHandler}
               size="small"
               variant="contained"
               color={"error"}
            >x</Button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All
      </button>
      <button className={filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
};


