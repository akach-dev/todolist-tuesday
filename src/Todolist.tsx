import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type TodoListPropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (todoListId: string, taskId: string) => void;
  removeTodoList: (todoListId: string) => void
  changeFilter: (todoListId: string, filter: FilterValuesType) => void;
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  addTask: (todoListId: string, taskTitle: string) => void;
};

const TodoList: FC<TodoListPropsType> = ({
                                           id,
                                           title,
                                           tasks,
                                           filter,
                                           removeTask,
                                           removeTodoList,
                                           changeFilter,
                                           addTask,
                                           changeTaskStatus
                                         }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [emptyValueError, setEmptyValueError] = useState(false)
  const isAddTaskPossible = Boolean(newTaskTitle)
  const tasksComponents: JSX.Element = tasks.length
     ? <ul>
       {tasks.map((t) => <Task
          key={t.id}
          {...t}
          todoListId={id}
          removeTask={removeTask}
          changeTaskStatus={changeTaskStatus}
       />)}
     </ul>
     : <span>Your tasksList is empty</span>

  const onClickAddTaskHandler = () => {
    if (isAddTaskPossible) {
      const trimmedTitle = newTaskTitle.trim()
      if (trimmedTitle) {
        addTask(id, trimmedTitle)
      } else {
        setEmptyValueError(true)
      }
      setNewTaskTitle("")
    }
  }
  const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!newTaskTitle.trim()) {
      setEmptyValueError(true)
    } else {
      emptyValueError && setEmptyValueError(false)
    }
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && onClickAddTaskHandler()
  }


  const removeTodoListHandler = () => {
    removeTodoList(id)
  };
  return (
     <div className="todolist">
       <h3>{title}
         <button onClick={removeTodoListHandler}>x</button>
       </h3>
       <div>
         <input
            value={newTaskTitle}
            onChange={onChangeSetLocalTitleHandler}
            onKeyDown={onKeyDownAddTaskHandler}
            className={emptyValueError ? "empty-value-error" : ""}
         />
         <button
            disabled={!isAddTaskPossible}
            onClick={onClickAddTaskHandler}>+
         </button>
         <div style={{color: emptyValueError ? "red" : "black"}}>Please, enter title</div>
       </div>
       {tasksComponents}
       <div>
         <button
            className={filter === "all" ? "btn-filter-active" : "btn-filter"}
            onClick={() => changeFilter(id, "all")}>
           All
         </button>
         <button
            className={filter === "active" ? "btn-filter-active" : "btn-filter"}
            onClick={() => changeFilter(id, "active")}>
           Active
         </button>
         <button
            className={filter === "completed" ? "btn-filter-active" : "btn-filter"}
            onClick={() => changeFilter(id, "completed")}>
           Completed
         </button>
       </div>
     </div>
  );
};

export default TodoList;
