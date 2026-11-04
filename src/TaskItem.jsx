import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  function save() {
    if (value.trim() !== "") onEdit(task.id, value.trim());
    else setValue(task.text);
    setEditing(false);
  }

  return (
    <li className="bg-white rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 accent-green-600"
      />

      {editing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="flex-1 border-b border-slate-400 outline-none"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={"flex-1 " + (task.done ? "line-through text-stone-400" : "")}
        >
          {task.text}
        </span>
      )}

      <button onClick={() => onDelete(task.id)} className="text-stone-400 hover:text-red-500">
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
