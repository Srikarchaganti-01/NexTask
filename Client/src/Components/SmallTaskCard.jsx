import { useNavigate } from "react-router-dom";

const priorityStyles = {
  imp: "bg-red-50 text-red-700",
  top: "bg-orange-50 text-orange-700",
  med: "bg-yellow-50 text-yellow-800",
  low: "bg-blue-50 text-blue-700",
  nil: "bg-gray-100 text-gray-600",
};

const statusStyles = {
  alloted: "bg-gray-100 text-gray-700",
  working: "bg-blue-50 text-blue-700",
  complete: "bg-green-50 text-green-700",
  overdue: "bg-red-50 text-red-700",
};

const priorityLabels = {
  imp: "Important",
  top: "High",
  med: "Medium",
  low: "Low",
  nil: "None",
};

const statusLabels = {
  alloted: "Allotted",
  working: "Working",
  complete: "Completed",
  overdue: "Overdue",
};

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

export default function SmallTaskCard({ task }) {
  const navigate = useNavigate();
  console.log(task);
  return (
    <article
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="rounded-xl border border-gray-200 bg-white p-5 transition duration-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold leading-6">{task.title}</h2>

        <Badge className={priorityStyles[task.priority] || priorityStyles.nil}>
          {priorityLabels[task.priority] || task.priority}
        </Badge>
      </div>

      <p className="mt-3 min-h-10 text-sm leading-6 text-gray-600">
        {task.description || "No description provided."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge
          className={statusStyles[task.status] || "bg-gray-100 text-gray-600"}
        >
          {statusLabels[task.status] || task.status}
        </Badge>

        <Badge className="border border-gray-200 text-gray-600">
          {task.category === "assigned_to" ? "Assigned task" : "Personal task"}
        </Badge>

        <Badge className="border border-gray-200 text-gray-600">
          Access: {task.access}
        </Badge>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Deadline</p>
          <p className="mt-1 text-sm font-medium">
            {task.deadline || "Not set"}
          </p>
        </div>

        <p className="text-xs text-gray-400">ID: {task._id.slice(-6)}</p>
      </div>
    </article>
  );
}
