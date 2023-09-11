import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
      <IconButton aria-label="delete" onClick={removeTodolistHandler}>
        <DeleteIcon/>
      </IconButton>
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

            <Checkbox onChange={onChangeHandler} checked={t.isDone} color={"primary"}/>

            <EditableSpan oldTitle={t.title} callback={(title) => updateTaskTitleHandler(title, t.id)}/>

            <IconButton aria-label="delete"
                        onClick={onClickHandler}
                        style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
            >
              <DeleteIcon/>
            </IconButton>
          </li>
        })
      }
    </ul>
    <div>
      <Button
         variant={filter === 'all' ? "outlined" : "text"}
         color={'inherit'}
         onClick={onAllClickHandler}>All
      </Button>
      <Button
         variant={filter === 'active' ? "outlined" : "text"}
         color={'primary'}
         onClick={onActiveClickHandler}>Active
      </Button>
      <Button
         variant={filter === 'completed' ? "outlined" : "text"}
         color={'secondary'}
         onClick={onCompletedClickHandler}>Completed
      </Button>
    </div>
  </div>
};


