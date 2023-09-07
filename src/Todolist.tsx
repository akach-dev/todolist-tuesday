import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (id: string, title: string, todolistId: string) => void
  onChangeTodoListTitle: (id: string, title: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
}

export function Todolist({
                           addTask,
                           id,
                           changeTaskStatus,
                           tasks,
                           removeTodolist,
                           changeFilter,
                           changeTaskTitle,
                           filter,
                           removeTask,
                           onChangeTodoListTitle,
                           title
                         }: PropsType) {

  const addTaskHandler = (title: string) => {
    addTask(title, id)
  }

  const removeTodolistHandler = () => removeTodolist(id)

  const onAllClickHandler = () => changeFilter("all", id);
  const onActiveClickHandler = () => changeFilter("active", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);


  const onChangeTodoListTitleHandler = (title: string) => {
    onChangeTodoListTitle(id, title)
  };
  return <div>
    <h3><EditableSpan title={title} onChangeCallback={onChangeTodoListTitleHandler}/>
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
          const onChangeCallback = (title: string) => {
            changeTaskTitle(t.id, title, id)
          };
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} onChangeCallback={onChangeCallback}/>
            <button onClick={onClickHandler}>x</button>
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
}


