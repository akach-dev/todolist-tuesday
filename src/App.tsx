import React, {useState} from 'react';
import './App.css';
import TodoList from './Todolist';


//CRUD

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {
  // BLL:
  const todoListTitle = "What to learn"

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: crypto.randomUUID(), title: "HTML", isDone: true},
    {id: crypto.randomUUID(), title: "JS/TS", isDone: true},
    {id: crypto.randomUUID(), title: "REACT", isDone: false},
  ])
  const [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (taskId: string): void => {
    const filteredTasks = tasks.filter(t => t.id !== taskId)
    setTasks(filteredTasks)
  }  // D
  const addTask = (taskTitle: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isDone: false
    }
    setTasks([...tasks, newTask])
  }  // C
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
  }
  const changeTaskTitle = (taskId: string, title: string) => {


  }


  const changeFilter = (nextFilter: FilterValuesType) => {
    setFilter(nextFilter)
  }
  // UI:
  const getTasksForRender = (allTasks: Array<TaskType>, nextFilter: FilterValuesType): Array<TaskType> => {
    switch (nextFilter) {
      case "active":
        return allTasks.filter(t => !t.isDone)
      case "completed":
        return allTasks.filter(t => t.isDone)
      default:
        return allTasks
    }
  }
  const tasksForRender: Array<TaskType> = getTasksForRender(tasks, filter)
  return (
     <div className="App">
       <TodoList
          filter={filter}
          title={todoListTitle}
          tasks={tasksForRender}
          removeTask={removeTask}
          changeFilter={changeFilter}
          changeTaskStatus={changeTaskStatus}
          addTask={addTask}
       />
     </div>
  );
}

export default App;
