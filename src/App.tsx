import React, {useRef, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {


  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);


  function removeTask(id: string) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function addTask(title: string) {
    let task = {id: v1(), title: title, isDone: false};
    setTasks([task, ...tasks]);
  }


  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }


  return (
     <div className="App">
       <Todolist title="What to learn"
                 tasks={tasksForTodolist}
                 removeTask={removeTask}
                 changeFilter={changeFilter}
                 addTask={addTask}/>
     </div>
  );
}

export default App;
