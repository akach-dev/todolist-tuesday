import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  const todoListId_1 = v1()
  const todoListId_2 = v1()

  const [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todoListId_1, title: 'What to learn', filter: 'all'},
    {id: todoListId_2, title: 'What to buy', filter: 'completed'},
  ])

  let [tasks, setTasks] = useState({
    [todoListId_1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListId_2]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ]
  })

  const removeTask = (id: string, todolistId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(todo => todo.id !== id)})
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {id: v1(), title, isDone: true}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  };

  const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(todo => todo.id === taskId ? {...todo, isDone} : todo)})
  };


  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodoLists(todoLists.map(todoList => todoList.id === todolistId ? {...todoList, filter: value} : todoList))
  };


  return (
     <div className="App">
       {
         todoLists.map(todoList => {
           let tasksForTodolist = tasks[todoList.id]

           switch (todoList.filter) {
             case "active":
               tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
               break
             case "completed":
               tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
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
