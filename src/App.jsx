import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks([newTask, ...tasks]);
    setText("");
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function editTask(id, newText) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  }

  function clearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  const visible = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const leftCount = tasks.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen bg-violet-400 flex justify-center px-4 py-10">
      <div className="w-full max-w-md mt-12">
        <h1 className="text-3xl font-bold text-purple-950 mb-6">Task Manager</h1>

        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-stone-300 rounded-lg px-3 py-2 outline-none focus:border-purple-900 text-purple-950 font-bold font-mono"
          />
          <button className="bg-purple-950 text-white px-4 rounded-lg hover:bg-fuchsia-400">
            Add
          </button>
        </form>

        <div className="flex gap-2 mb-4">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "px-3 py-1 rounded-full text-sm border " +
                (filter === f
                  ? "bg-purple-950 text-white border-stone-300"
                  : "bg-white text-stone-600 border-stone-300")
              }
            >
              {f}
            </button>
          ))}
        </div>
          <div className='scroll max-h-60 overflow-auto'>
        <ul className="space-y-2">
          {visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </ul>
          </div>
        {visible.length === 0 && (
          <p className="text-stone-400 text-center py-6">Nothing here yet</p>
        )}

        <div className="flex justify-between items-center mt-5 text-sm text-stone-500">
          <span>{leftCount} left</span>
          <button onClick={clearDone} className="hover:text-pink-500">
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
