import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksObjType = {
  [key: string]: TaskType[]
}

function App() {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todolistId1, title: "What to learn", filter: 'all'},
    {id: todolistId2, title: "What to buy", filter: 'completed'},
  ])

  const [tasks, setTasks] = useState<TasksObjType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Bread", isDone: true},
    ]
  })


  const removeTask = (id: string, todoListId: string) => {
    let todolist = tasks[todoListId]
    tasks[todoListId] = todolist.filter(todo => todo.id !== id)

    setTasks({...tasks})


  };

  const addTask = (title: string, todoListId: string) => {
    let todolist = tasks[todoListId]
    tasks[todoListId] = [{id: v1(), title, isDone: false}, ...todolist]

    setTasks({...tasks})
  };

  const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    let todolist = tasks[todoListId]
    tasks[todoListId] = todolist.map(todo => todo.id === taskId ? {...todo, isDone} : todo)

    setTasks({...tasks})
  };


  function changeFilter(value: FilterValuesType, todoListId: string) {
    setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {...todoList, filter: value} : todoList))
  }


  return (
     <div className="App">
       {
         todoLists.map(todoList => {

           let tasksForTodolist = tasks[todoList.id]
           console.log(tasksForTodolist)

           switch (todoList.filter) {
             case "completed":
               tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
               break
             case "active":
               tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
               break
           }

           return (
              <Todolist title={todoList.title}
                        id={todoList.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todoList.filter}
                        key={todoList.id}
              />
           )
         })
       }

     </div>
  );
}

export default App;
