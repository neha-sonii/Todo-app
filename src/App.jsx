import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";




function App() {
const [todo, settodo] = useState("")
const [todos, settodos] = useState([])
const [showFinished, setshowFinished] = useState(true )

const saveToLs = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString) {
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    
  }
}, [])


const toggleFinished = (e) => {
  setshowFinished(!showFinished)
}




  const handleAdd = () => {
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo(" ")
    saveToLs()
  }
 

  const handleEdit = (e, id) => {
  let t = todos.filter(i => i.id === id)
  settodo(t[0].todo)
  let newTodos = todos.filter(item => {
    return item.id!== id
  });
  settodos(newTodos)
  saveToLs()
    }

  const handleDelete = (e, id) => {
    confirm("Are you sure ?")
    let newTodos = todos.filter(item => {
      return item.id!==id
    });
    settodos(newTodos)
    saveToLs()
   } 
    

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLs()
  }


  return (
    <>
    <Navbar/>
    <div className="md:container md:mx-auto my-8 rounded-xl p-5 bg-violet-200 min-h-[75vh] md:w-2/4">
    <h1 className="text-center my-3 text-2xl">iTask - Manage Add Your todos</h1>

    <div className="addTodo my-5">
      <h2 className="text-xl font-bold">Add aTodo</h2>
      <div className="flex">
      <input onChange={handleChange} value={todo} type="text" className="rounded-xl size-7 w-full border-none" autoFocus/>
      <button onClick={handleAdd} disabled={todo.length<= 3} className="bg-violet-500 hover:bg-violet-700 p-3 disabled:bg-violet-500 border-none py-1 text-sm font-bold text-white rounded-lg mx-1">Add</button>
      </div>
    </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />&nbsp;&nbsp;Finished Task
        <br/><br/>
        <div className="h-[1px] bg-black w-3/4 mx-auto"></div>
        <br/>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to Display</div>}
          {todos.map(item => {

          
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-full justify-between my-3">
            <div className="flex gap-5 "> 
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
          
            <div className={item.isCompleted? "line-through": " "}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) => {handleEdit(e, item.id)}} className="bg-violet-500 hover:bg-violet-700 p-3 border-none py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit />
              </button>
              <button onClick={(e) => {handleDelete(e, item.id)}} className="bg-violet-500 hover:bg-violet-700 p-3 border-none py-1 text-sm font-bold text-white rounded-md mx-1"><RiDeleteBin6Fill />
              </button>
            </div>
          

          </div>
          })}
        </div>
    </div>
    </>
  );
}

export default App;
