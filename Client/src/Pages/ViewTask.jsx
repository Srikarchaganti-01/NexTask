import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "../API/Api";

import Footer from "../Components/Footer";
function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.task);
      } catch (err) {
        setError(err.message || "Failed to load task");
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
      await deleteTask(id);
      navigate("/home");
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "top":
        return "bg-red-50 text-red-700";
      case "imp":
        return "bg-orange-50 text-orange-700";
      case "med":
        return "bg-amber-50 text-amber-700";
      case "low":
        return "bg-blue-50 text-blue-700";
      default:
        return "bg-zinc-100 text-zinc-600";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700";
      case "working":
        return "bg-amber-50 text-amber-700";
      case "overdue":
        return "bg-red-50 text-red-700";
      default:
        return "bg-zinc-100 text-zinc-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] px-5 py-10">
        <div className="mx-auto max-w-6xl animate-pulse space-y-5">
          <div className="h-5 w-28 rounded-lg bg-zinc-200" />
          <div className="h-12 w-2/3 rounded-xl bg-zinc-200" />
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="h-72 rounded-3xl bg-white shadow-sm lg:col-span-7" />
            <div className="h-72 rounded-3xl bg-white shadow-sm lg:col-span-5" />
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-4">
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold">Task not found</h1>
          <p className="mt-2 text-sm text-gray-500">
            {error || "This task may have been deleted or is unavailable."}
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-4 py-7 text-gray-900 sm:px-8 sm:py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p
              onClick={() => navigate(`/home`)}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400"
            >
              🏠︎ NexTask workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Task overview<span className="text-gray-400">.</span>
            </h1>

            <button
              onClick={() => navigate(-1)}
              className="mt-4 flex items-center gap-2 text-lg text-gray-500 transition hover:text-black"
            >
              <span>←</span> Back
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/tasks/${task._id}/update`)}
              className="rounded-xl border border-white bg-white px-4 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Edit task
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
        <section className="mb-6 rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-9">
          <div className="mb-5 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(task.status)}`}
            >
              {task.status}
            </span>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getPriorityStyle(task.priority)}`}
            >
              {task.priority === "imp" ? "Important" : task.priority} priority
            </span>
          </div>

          <h2 className="max-w-4xl wrap-break-word text-3xl font-bold tracking-tight sm:text-5xl">
            {task.title}
          </h2>

          <p className="mt-5 max-w-3xl whitespace-pre-wrap wrap-break-word text-sm leading-7 text-gray-500 sm:text-base">
            {task.description ||
              "No description provided. Add some details to make this task easier to follow."}
          </p>
        </section>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <section className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] lg:col-span-7">
            <div className="px-6 pb-5 pt-7 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                The essentials
              </p>
              <h3 className="mt-2 text-xl font-semibold">Task details</h3>
              <p className="mt-1 text-sm text-gray-500">
                Everything you need to know about this task.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 px-5 pb-6 sm:grid-cols-2 sm:px-6">
              <InfoItem label="Category" value={task.category} />
              <InfoItem label="Access" value={task.access} />
              <InfoItem
                label="Deadline"
                value={task.deadline || "No deadline"}
              />
              <InfoItem
                label="Created by"
                value={task.user?.username || "Unknown"}
              />
              <InfoItem
                label="Created"
                value={
                  task.createdAt
                    ? new Date(task.createdAt).toLocaleString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Unknown"
                }
              />
              <InfoItem
                label="Last updated"
                value={
                  task.updatedAt
                    ? new Date(task.updatedAt).toLocaleString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Unknown"
                }
              />
            </div>
          </section>

          <aside className="space-y-5 lg:col-span-5">
            <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-lg font-bold">
                  {(task.user?.username || "?").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {task.user?.username || "Unknown user"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Created this task
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Reference
              </p>
              <h3 className="mt-2 font-semibold">Task ID</h3>

              <p className="mt-3 break-all rounded-xl bg-gray-50 p-3 font-mono text-xs leading-5 text-gray-500">
                {task._id}
              </p>
            </section>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-gray-100 bg-[#fafafa] p-4 transition hover:border-gray-200 hover:bg-white">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 wrap-break-word text-sm font-medium capitalize leading-6 text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default ViewTask;
