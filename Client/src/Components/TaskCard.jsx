import { useNavigate } from "react-router-dom";
function TaskCard({ task }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="rounded-2xl shadow-xl bg-white p-5 transition-all hover:border-zinc-400 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-medium text-zinc-900">{task.title}</h3>

        <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs capitalize text-zinc-600">
          {task.priority}
        </span>
      </div>

      <div className="mt-7 flex items-center justify-between text-xs text-zinc-400">
        <span className="capitalize">{task.status}</span>

        <button
          onClick={() => navigate(`/tasks/${task._id}`)}
          className="text-zinc-500 transition hover:text-black"
        >
          View →
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
