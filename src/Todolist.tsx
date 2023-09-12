import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import Task from "./Task";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTask: (taskId: string) => void;
    changeFilter: (nextFilter: FilterValuesType) => void;
    changeTaskStatus:(taskId: string, isDone: boolean) => void
    addTask: (taskTitle: string) => void;
};

const TodoList: React.FC<TodoListPropsType> = ({
    title,
    tasks,
    filter,
    removeTask,
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
                {...t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
            />)}
        </ul>
        : <span>Your taskslist is empty</span>

    const changeFilterOnClickHandlerCreator =
        (nextFilter: FilterValuesType): (() => void) => () => changeFilter(nextFilter);

    const onClickAddTaskHandler = () => {
        if (isAddTaskPossible) {
            const trimmedTitle = newTaskTitle.trim()
            if(trimmedTitle){
                addTask(trimmedTitle)
            } else {
                setEmptyValueError(true)
            }
            setNewTaskTitle("")
        } 
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(!newTaskTitle.trim()){
            setEmptyValueError(true)
        } else {
            emptyValueError && setEmptyValueError(false)
        }
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTaskHandler()
    }
    
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={emptyValueError ? "empty-value-error" : "" }
                />
                <button
                    disabled={!isAddTaskPossible}
                    onClick={onClickAddTaskHandler}>+</button>
               <div style={{color: emptyValueError ? "red" : "black"}}>Please, enter title</div>
            </div>
            {tasksComponents}
            <div>
                <button
                    className={filter === "all" ? "btn-filter-active" : "btn-filter"}
                    onClick={() => changeFilter("all")}>
                    All
                </button>
                <button
                    className={filter === "active" ? "btn-filter-active" : "btn-filter"}
                    onClick={changeFilterOnClickHandlerCreator("active")}>
                    Active
                </button>
                <button
                    className={filter === "completed" ? "btn-filter-active" : "btn-filter"}
                    onClick={changeFilterOnClickHandlerCreator("completed")}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
