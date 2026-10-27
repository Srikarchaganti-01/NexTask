import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "../API/Api";

function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);

        console.log(response);

        setTask(response.task);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const delResp = await deleteTask(id);

      navigate("/home");
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    } finally {
      setDeleting(false);
    }
  };
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "top":
        return "bg-red-50 text-red-700 ring-red-100";

      case "imp":
        return "bg-orange-50 text-orange-700 ring-orange-100";

      case "med":
        return "bg-amber-50 text-amber-700 ring-amber-100";

      case "low":
        return "bg-blue-50 text-blue-700 ring-blue-100";

      case "nil":
        return "bg-zinc-100 text-zinc-600 ring-zinc-200";

      default:
        return "bg-zinc-100 text-zinc-600 ring-zinc-200";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "alloted":
        return "bg-zinc-100 text-zinc-700 ring-zinc-200";

      case "working":
        return "bg-amber-50 text-amber-700 ring-amber-100";

      case "completed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-100";

      case "overdue":
        return "bg-red-50 text-red-700 ring-red-100";

      default:
        return "bg-zinc-100 text-zinc-700 ring-zinc-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="mt-12 h-10 w-2/3 animate-pulse rounded bg-zinc-200" />
          <div className="mt-5 h-5 w-1/2 animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Task not found
          </h1>

          <button
            onClick={() => navigate("/home")}
            className="mt-4 text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            ← Back to tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/tasks/${id}/update`)}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-black"
            >
              Edit task
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Main */}
        <main className="mt-14">
          {/* Task heading */}
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ${getStatusStyle(
                  task.status,
                )}`}
              >
                {task.status}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ${getPriorityStyle(
                  task.priority,
                )}`}
              >
                {task.priority} priority
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.035em] text-zinc-950 md:text-5xl">
              {task.title}
            </h1>

            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-zinc-500">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Details */}
            <section className="rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <div className="border-b border-zinc-100 px-6 py-5">
                <h2 className="text-sm font-semibold text-zinc-900">
                  Task details
                </h2>

                <p className="mt-1 text-xs text-zinc-400">
                  Information about this task
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <InfoItem label="Category" value={task.category} />

                <InfoItem label="Access" value={task.access} />

                <InfoItem
                  label="Deadline"
                  value={task.deadline || "No deadline"}
                />

                <InfoItem
                  label="Assigned user"
                  value={task?.user?.username || "Unknown"}
                  breakText
                />

                <InfoItem
                  label="Created"
                  value={new Date(task.createdAt).toLocaleString()}
                />

                <InfoItem
                  label="Last updated"
                  value={new Date(task.updatedAt).toLocaleString()}
                />
              </div>
            </section>

            {/* Side information */}
            <aside className="space-y-6">
              {/* Status card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Current status
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      task.status === "completed"
                        ? "bg-emerald-500"
                        : task.status === "overdue"
                          ? "bg-red-500"
                          : task.status === "working"
                            ? "bg-amber-500"
                            : "bg-zinc-400"
                    }`}
                  />

                  <span className="text-sm font-semibold capitalize text-zinc-900">
                    {task.status}
                  </span>
                </div>
              </div>

              {/* Task ID */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Task ID
                </p>

                <p className="mt-3 break-all font-mono text-[11px] leading-5 text-zinc-500">
                  {task._id}
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function InfoItem({ label, value, breakText = false }) {
  return (
    <div className="border-b border-zinc-100 px-6 py-5 last:border-b-0 sm:odd:border-r">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-medium text-zinc-800 ${
          breakText ? "break-all" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default ViewTask;
