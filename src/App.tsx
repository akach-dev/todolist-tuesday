import React, {FC, useState} from 'react';
import './App.css';
import TodoList from './Todolist';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
  todoListId: string
  todoListTitle: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: TaskType[]
}

const App: FC = () => {

  const todoListId_1 = crypto.randomUUID()
  const todoListId_2 = crypto.randomUUID()

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
    {todoListId: todoListId_1, todoListTitle: "What to learn", filter: 'all'},
    {todoListId: todoListId_2, todoListTitle: "What to buy", filter: 'active'},

  ])

  const [tasks, setTasks] = useState<TaskStateType>({

    [todoListId_1]: [
      {id: crypto.randomUUID(), title: "HTML", isDone: true},
      {id: crypto.randomUUID(), title: "JS/TS", isDone: true},
      {id: crypto.randomUUID(), title: "REACT", isDone: false},
    ],
    [todoListId_2]: [
      {id: crypto.randomUUID(), title: "Milk", isDone: true},
      {id: crypto.randomUUID(), title: "Bread", isDone: true},
    ],
  })

  const removeTask = (todoListId: string, taskId: string): void =>
     setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})


  const addTask = (todoListId: string, title: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title,
      isDone: false
    }
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  }
  const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) =>
     setTasks({
       ...tasks, [todoListId]: tasks[todoListId].map(task =>
          task.id === taskId ? {...task, isDone} : task
       )
     })
  const changeTaskTitle = (taskId: string, title: string) => {
  }

  const changeFilter = (todoListId: string, filter: FilterValuesType) =>
     setTodoLists(todoLists.map(todoList =>
        todoList.todoListId === todoListId ? {...todoList, filter} : todoList
     ))

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.todoListId !== todoListId))
    delete tasks[todoListId]
    setTasks({...tasks})
  }


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
  return (
     <div className="App">
       {
         todoLists.map(todoList => {

           const tasksForRender: Array<TaskType> = getTasksForRender(tasks[todoList.todoListId], todoList.filter)

           return (
              <TodoList
                 key={todoList.todoListId}
                 id={todoList.todoListId}
                 filter={todoList.filter}
                 title={todoList.todoListTitle}
                 tasks={tasksForRender}
                 removeTask={removeTask}
                 removeTodoList={removeTodoList}
                 changeFilter={changeFilter}
                 changeTaskStatus={changeTaskStatus}
                 addTask={addTask}
              />
           )
         })
       }


     </div>
  );
};

export default App;
