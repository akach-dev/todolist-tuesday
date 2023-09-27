import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, todoListReducer} from "./todoList-reducer";
import {changeFilterAC, filterReducer} from "./filter-reducer";

export type FilterValuesType = "all" | "active" | "completed";

function App() {


  let [filter, dispatchToFilter] = useReducer(filterReducer, "all");
  let [tasks, dispatchToTasks] = useReducer(todoListReducer, [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);


  function removeTask(id: string) {
    dispatchToTasks(removeTaskAC(id))
  }

  function addTask(title: string) {
    dispatchToTasks(addTaskAC(title))
  }

  const changeStatus = (id: string, isDone: boolean) => {
    dispatchToTasks(changeTaskStatusAC(id, isDone))
  }


  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  function changeFilter(value: FilterValuesType) {
    dispatchToFilter(changeFilterAC(value))
  }


  return (
     <div className="App">
       <Todolist title="What to learn"
                 tasks={tasksForTodolist}
                 changeStatus={changeStatus}
                 removeTask={removeTask}
                 changeFilter={changeFilter}
                 addTask={addTask}/>
     </div>
  );
}

export default App;
