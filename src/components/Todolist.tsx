import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
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
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  filter: FilterValuesType
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  updateTodoListTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {


  const removeTodolist = () => props.removeTodolist(props.id)

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const addTaskHandler = (title: string) => props.addTask(title, props.id)

  const updateTodoListTitleHandler = (title: string) => {
    props.updateTodoListTitle(props.id, title)
  };


  const updateTaskTitleHandler = (taskId: string, title: string) =>
     props.updateTaskTitle(props.id, taskId, title)


  return <div>
    <h3>
      <EditableSpan oldTitle={props.title} onChangeOldTitle={updateTodoListTitleHandler}/>
      <button onClick={removeTodolist}>x</button>
    </h3>
    <AddItemForm addItem={addTaskHandler}/>

    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          }


          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
            <EditableSpan oldTitle={t.title} onChangeOldTitle={(title) => updateTaskTitleHandler(t.id, title)}/>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}


