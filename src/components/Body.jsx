// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// function Body() {
//   const [todo, setTodo] = useState("");
//   const [todos, setTodos] = useState([]);
//   // New state to track if the filter checkbox is checked
//   const [showCompletedOnly, setShowCompletedOnly] = useState(false);

//   // 1. Load todos from localStorage on initial render
//   useEffect(() => {
//     const todosString = localStorage.getItem("todos");
//     if (todosString) {
//       try {
//         const savedTodos = JSON.parse(todosString);
//         setTodos(savedTodos);
//       } catch (error) {
//         console.error("Error parsing localStorage todos:", error);
//       }
//     }
//   }, []);

//   // 2. Automatically save to localStorage whenever the todos state updates
//   useEffect(() => {
//     if (todos.length > 0) {
//       localStorage.setItem("todos", JSON.stringify(todos));
//     }
//   }, [todos]);

//   const handleEdit = (e, id) => {
//     const targetTodo = todos.find(item => item.id === id);
//     if (targetTodo) {
//       setTodo(targetTodo.todo);
//       const newTodo = todos.filter(item => item.id !== id);
//       setTodos(newTodo);

//       if (newTodo.length === 0) {
//         localStorage.removeItem("todos");
//       }
//     }
//   };

//   const handleDelete = (e, id) => {

//     const isConfirmed = window.confirm("Are you sure you want to delete this todo?");

//     if(isConfirmed)
//     {
//     const newTodo = todos.filter(item => item.id !== id);
//     setTodos(newTodo);

//     if (newTodo.length === 0) {
//       localStorage.removeItem("todos");
//     }
//     }
//   };

//   const handleAdd = () => {
//     if (todo.trim() === "") return;
//     setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
//     setTodo("");
//   };

//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   const handleCheckbox = (e) => {
//     const id = e.target.name;
//     const index = todos.findIndex(item => item.id === id);
//     if (index !== -1) {
//       const newTodo = [...todos];
//       newTodo[index].isCompleted = !newTodo[index].isCompleted;
//       setTodos(newTodo);
//     }
//   };

//   // Filter the list based on the user's selection
//   const displayedTodos = showCompletedOnly 
//     ? todos.filter(item => item.isCompleted) 
//     : todos;

//   return (
//     <div className="container flex flex-col items-center w-full max-w-6xl mx-auto p-5 rounded-xl bg-violet-200 my-5 min-h-[70vh]">
//       <div className="title font-bold text-[20px]">My Todo App ✅</div>
//       <div className='my-15'>
//         <div className="addtodo">
//           <h2 className='font-bold text-xl '>Add Todo</h2>
//           <input 
//             onChange={handleChange} 
//             value={todo} 
//             type="text" 
//             className='bg-white w-90 rounded-[5px] p-1 my-3' 
//           />
//           <button 
//             onClick={handleAdd} 
//             className='mx-3 bg-violet-600 text-white rounded-[5px] px-3 py-1 font-medium '
//           >
//             Save
//           </button>
//         </div>


//         <div className="filter-section flex items-center gap-2 my-4 bg-violet-300 p-2 rounded-[5px]">
//           <input 
//             type="checkbox" 
//             checked={showCompletedOnly}
//             onChange={(e) => setShowCompletedOnly(e.target.checked)}
//             className="w-4 h-4 cursor-pointer"
//           />
//           <label className="font-medium text-sm text-gray-800 cursor-pointer select-none">
//             Show Completed Only
//           </label>
//         </div>

//         <h2 className='font-bold text-xl my-5'>Your Todos</h2>
//         <div className="todos">
//           {displayedTodos.length === 0 && (
//             <div className='text-sm px-2 text-gray-700 font-bold'>
//               {showCompletedOnly ? "No Completed Todos Found" : "No Todo Available"}
//             </div>
//           )}

//           {displayedTodos.map(item => {
//             return (
//               <div key={item.id} className="todo flex flex-row my-5 justify-between">
//                 <div className='flex flex-row gap-5'>
//                   <input 
//                     type="checkbox" 
//                     onChange={handleCheckbox} 
//                     name={item.id} 
//                     checked={item.isCompleted} 
//                   />
//                   <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
//                     {item.todo}
//                   </div>
//                 </div>
//                 <div className="buttons mx-5 flex">
//                   <button 
//                     onClick={(e) => handleEdit(e, item.id)} 
//                     className='mx-1 bg-violet-600 text-white rounded-[5px] px-3 py-1 font-medium'
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={(e) => handleDelete(e, item.id)} 
//                     className='mx-1 bg-violet-600 text-white rounded-[5px] px-3 py-1 font-medium'
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Body;


import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Body() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  // Custom Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // 1. Load todos from localStorage on initial render
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      try {
        const savedTodos = JSON.parse(todosString);
        setTodos(savedTodos);
      } catch (error) {
        console.error("Error parsing localStorage todos:", error);
      }
    }
  }, []);

  // 2. Automatically save to localStorage whenever the todos state updates
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleEdit = (e, id) => {
    const targetTodo = todos.find(item => item.id === id);
    if (targetTodo) {
      setTodo(targetTodo.todo);
      const newTodo = todos.filter(item => item.id !== id);
      setTodos(newTodo);

      if (newTodo.length === 0) {
        localStorage.removeItem("todos");
      }
    }
  };

  // Trigger Custom Modal instead of window.confirm
  const openDeleteModal = (id) => {
    setTodoToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      const newTodo = todos.filter(item => item.id !== todoToDelete);
      setTodos(newTodo);

      if (newTodo.length === 0) {
        localStorage.removeItem("todos");
      }
    }
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      const newTodo = [...todos];
      newTodo[index].isCompleted = !newTodo[index].isCompleted;
      setTodos(newTodo);
    }
  };

  // Math Counters
  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;

  const displayedTodos = showCompletedOnly
    ? todos.filter(item => item.isCompleted)
    : todos;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-violet-800 py-10 px-4 flex justify-center items-start font-sans antialiased">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/50">

        {/* App Title Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-200 via-pink-200 to-white flex items-center gap-2 tracking-tight">
            TaskMaster <span className="animate-pulse text-2xl">⚡</span>
          </h1>
          <div className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-200 uppercase ">
            Done: {completedCount}/{totalCount}
          </div>
        </div>

        {/* Input Add Field Design */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-purple-200 mb-2 tracking-wide">Create New Task</label>
          <div className="flex gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="What needs to be done?"
              className="bg-transparent flex-1 px-4 py-3 text-white placeholder-purple-300/50 outline-none text-base"
            />
            <button
              onClick={handleAdd}
              className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 active:scale-95 transition duration-200 ease-out"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Toggle Custom Filter Row */}
        <label className="flex items-center gap-3 cursor-pointer group w-max mb-6 select-none bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 transition-all duration-200">
          <input
            type="checkbox"
            checked={showCompletedOnly}
            onChange={(e) => setShowCompletedOnly(e.target.checked)}
            className="w-4 h-4 accent-violet-500 rounded cursor-pointer transition-all"
          />
          <span className="text-sm font-medium text-purple-100 group-hover:text-white transition">
            Show Completed Only
          </span>
        </label>

        {/* Tasks Container Frame */}
        <div className="space-y-3">
          {displayedTodos.length === 0 ? (
            <div className="text-center py-12 px-4 bg-black/10 rounded-2xl border border-dashed border-white/10">
              <p className="text-purple-300 font-medium text-sm">
                {showCompletedOnly ? "No matching completed tasks found" : "Your list is empty"}
              </p>
            </div>
          ) : (
            displayedTodos.map(item => (
              <div
                key={item.id}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${item.isCompleted
                    ? "bg-black/20 border-white/5 opacity-60 line-through"
                    : "bg-white/5 border-white/10 hover:border-violet-500/40 hover:bg-white/10"
                  }`}
              >
                <label className="flex items-center gap-4 flex-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    onChange={handleCheckbox}
                    name={item.id}
                    checked={item.isCompleted}
                    className="w-5 h-5 rounded-md accent-emerald-500 cursor-pointer"
                  />
                  <span className={`text-base font-medium tracking-wide transition-all ${item.isCompleted ? "text-purple-300/70" : "text-white"
                    }`}>
                    {item.todo}
                  </span>
                </label>

                {/* Action Operational Buttons */}
                <div className="flex gap-2 ml-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-white/10 hover:bg-violet-600 hover:text-white border border-white/10 p-2 rounded-xl text-purple-200 text-xs font-semibold tracking-wide transition duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-red-600 p-2 rounded-xl text-red-300 hover:text-white text-xs font-semibold tracking-wide transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl transform scale-100 transition-transform">
            <h3 className="text-lg font-bold text-white mb-2">Delete Task?</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove this item? This action cannot be reversed.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-600/20 transition"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
