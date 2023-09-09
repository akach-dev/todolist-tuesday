import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';
import {FilterValuesType} from './App';

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
  filter: FilterValuesType
}

export const Todolist: FC<PropsType> = ({
                                          removeTodolist, removeTask, filter, tasks, changeFilter, addTask, changeTaskStatus, title, id
                                        }) => {
  let [inputTitle, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (inputTitle.trim()) {
      addTask(inputTitle.trim(), id);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === 'Enter') {
      addTaskHandler();
    }
  }

  const removeTodolistHandler = () => removeTodolist(id)

  const onAllClickHandler = () => changeFilter("all", id);
  const onActiveClickHandler = () => changeFilter("active", id);
  const onCompletedClickHandler = () => changeFilter("completed", id);

  return <div>
    <h3> {title}
      <button onClick={removeTodolistHandler}>x</button>
    </h3>
    <div>
      <input value={inputTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
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
};


