import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonAppBar from "./ButtonAppBar";
import {Container} from "@mui/material";


export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}


function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });


  function removeTask(id: string, todolistId: string) {
    setTasks({
      ...tasks, [todolistId]: tasks[todolistId].filter(task =>
         task.id !== id
      )
    })
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})

  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todoLists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists])
    }
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.title = newTitle;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }

  function removeTodolist(id: string) {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodoLists(todoLists.filter(tl => tl.id != id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  function changeTodolistTitle(id: string, title: string) {
    // найдём нужный todolist
    const todolist = todoLists.find(tl => tl.id === id);
    if (todolist) {
      // если нашёлся - изменим ему заголовок
      todolist.title = title;
      setTodoLists([...todoLists]);
    }
  }


  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
    setTodoLists([newTodolist, ...todoLists]);
    setTasks({
      ...tasks,
      [newTodolistId]: []
    })
  }

  return (
     <div className="App">
       <ButtonAppBar/>
       <Container>
         <AddItemForm addItem={addTodolist}/>
         {
           todoLists.map(tl => {
             let allTodolistTasks = tasks[tl.id];
             let tasksForTodolist = allTodolistTasks;

             if (tl.filter === "active") {
               tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
             }
             if (tl.filter === "completed") {
               tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
             }

             return <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
             />
           })
         }
       </Container>

     </div>
  );
}

export default App;
