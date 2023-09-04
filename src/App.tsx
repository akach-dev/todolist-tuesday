import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type  TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TodoListIdType = {
  [key: string]: TaskType[]
}


function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TodoListIdType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })


  function removeTask(todolistId: string, id: string) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
  }

  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
    })
  }


  function changeFilter(todolistId: string, filter: FilterValuesType) {
    setTodoLists(todoLists.map(todoList =>
       todoList.id === todolistId ? {...todoList, filter} : todoList))
  }


  return (
     <div className="App">
       {
         todoLists.map((todolist => {

           let tasksForTodolist = tasks[todolist.id];

           switch (todolist.filter) {
             case "active":
               tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
               break
             case "completed":
               tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
               break
           }


           return (
              <Todolist title={todolist.title}
                        id={todolist.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todolist.filter}
                        key={todolist.id}
              />
           )
         }))
       }

     </div>
  );
}

export default App;
