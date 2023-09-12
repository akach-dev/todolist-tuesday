import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import {Container, Paper} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';


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


  const removeTask = (id: string, todolistId: string) => setTasks({
    ...tasks,
    [todolistId]: tasks[todolistId].filter(task => task.id !== id)
  })
  const addTask = (title: string, todolistId: string) => {
    let task = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [...tasks[todolistId], task]});
  };
  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    setTasks({
      ...tasks, [todolistId]: tasks[todolistId].map(task =>
         task.id === id ? {...task, isDone} : task
      )
    })
  };
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    setTodoLists(todoLists.map(todoList =>
       todoList.id === todolistId ? {...todoList, filter} : todoList
    ))
  };
  const removeTodolist = (id: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== id))
    delete tasks[id]
  };
  const addTodoList = (title: string) => {
    let newTodolistId = v1()
    let newTodo = {id: newTodolistId, title, filter: "all" as FilterValuesType}
    setTodoLists([newTodo, ...todoLists])
    setTasks({...tasks, [newTodolistId]: []})
  }
  const updateTaskTitle = (todolistId: string, taskId: string, title: string) =>
     setTasks({
       ...tasks, [todolistId]: tasks[todolistId].map(task =>
          task.id === taskId ? {...task, title} : task
       )
     })

  const updateTodoListTitle = (todolistId: string, title: string) =>
     setTodoLists(todoLists.map(todoList =>
        todoList.id === todolistId ? {...todoList, title} : todoList
     ))

  return (
     <div className="App">
       <Header/>
       <Container fixed>
         <Grid container style={{
           padding: '2rem'
         }}>
           <AddItemForm addItem={addTodoList}/>
         </Grid>
         <Grid container spacing={5}>
           {
             todoLists.map(tl => {
               let allTodolistTasks = tasks[tl.id];
               
               switch (tl.filter) {
                 case "completed":
                   allTodolistTasks = allTodolistTasks.filter(t => t.isDone);
                   break
                 case "active":
                   allTodolistTasks = allTodolistTasks.filter(t => !t.isDone);
                   break
               }

               return <Grid key={tl.id}>
                 <Paper elevation={4} style={{
                   padding: '1rem'
                 }}>
                   <Todolist
                      id={tl.id}
                      title={tl.title}
                      tasks={allTodolistTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      updateTaskTitle={updateTaskTitle}
                      updateTodoListTitle={updateTodoListTitle}
                   />
                 </Paper>
               </Grid>
             })
           }
         </Grid>
       </Container>
     </div>
  );

}

export default App;
