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

function App() {
  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'},
  ])
  let [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id != id));
  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodoLists(todoLists.map(todo => todo.id === todolistId ? {...todo, filter: value} : todo))
  }
  const addTask = (title: string) => setTasks([{id: v1(), title, isDone: false}, ...tasks]);
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(task =>
       task.id === taskId ?
          {
            ...task,
            isDone
          }
          : task))
  }

  return (
     <div className="App">
       {
         todoLists.map(todolist => {
           let tasksForTodolist = tasks;
           switch (todolist.filter) {
             case "active":
               tasksForTodolist = tasks.filter(t => !t.isDone)
               break
             case "completed":
               tasksForTodolist = tasks.filter(t => t.isDone)
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
              />
           )
         })
       }

     </div>
  );
}

export default App;
