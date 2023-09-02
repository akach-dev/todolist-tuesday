import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  id: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(
   {removeTask, tasks, changeTaskStatus, changeFilter, filter, addTask, title, id}: PropsType) {

  let [taskTitle, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (taskTitle) {
      addTask(taskTitle.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === 'Enter') {
      addTaskHandler();
    }
  }

  const onAllClickHandler = () => changeFilter("all", id);
  const onActiveClickHandler = () => changeFilter("active", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);


  return <div>
    <h3>{title}</h3>
    <div>
      <input value={taskTitle}
             onChange={onChangeHandler}
             onKeyDown={onKeyDownHandler}
             className={error ? "error" : ""}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {
        tasks.map(t => {
          const onClickHandler = () => removeTask(t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(t.id, e.currentTarget.checked);
          }

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
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
