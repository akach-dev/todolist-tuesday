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
export type TasksObjType = {
  [key: string]: TaskType[]
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])
  let [tasks, setTasks] = useState<TasksObjType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  });

  const removeTodoList = (id: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== id))
    delete tasks[id]

    setTasks({...tasks})
  }

  const removeTask = (id: string, todolistId: string) => {
    let todolist = tasks[todolistId]
    tasks[todolistId] = todolist.filter(todo => todo.id !== id)
    setTasks({...tasks})
  }
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodoLists(todoLists.map(todo => todo.id === todolistId ? {...todo, filter: value} : todo))
  }
  const addTask = (title: string, todolistId: string) => {
    let todolist = tasks[todolistId]
    tasks[todolistId] = [{id: v1(), title, isDone: false}, ...todolist]
    setTasks({...tasks})
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    let todolist = tasks[todolistId]
    tasks[todolistId] = todolist.map(todo => todo.id === taskId ? {...todo, isDone} : todo)
    setTasks({...tasks})
  }

  return (
     <div className="App">
       {
         todoLists.map(todolist => {
           let allTodoListTasks = tasks[todolist.id]
           let tasksForTodolist = allTodoListTasks
           switch (todolist.filter) {
             case "active":
               tasksForTodolist = allTodoListTasks.filter(t => !t.isDone)
               break
             case "completed":
               tasksForTodolist = allTodoListTasks.filter(t => t.isDone)
               break

           }
           return (
              <Todolist
                 key={todolist.id}
                 id={todolist.id}
                 title={todolist.title}
                 tasks={tasksForTodolist}
                 removeTask={removeTask}
                 changeFilter={changeFilter}
                 addTask={addTask}
                 changeTaskStatus={changeTaskStatus}
                 filter={todolist.filter}
                 removeTodoList={removeTodoList}
              />
           )
         })
       }

     </div>
  );
}

export default App;
