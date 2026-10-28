import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SmallTaskCard from "./../Components/SmallTaskCard";
import { getTasks } from "../API/Api";

import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const priority = searchParams.get("priority") || "";
  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "otn";

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError("");

      try {
        const data = await getTasks(Object.fromEntries(searchParams.entries()));

        setTasks(data || []);
      } catch (err) {
        setError(err.message || "Unable to fetch tasks");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [searchParams]);

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams({});
  }

  return (
    <main className="min-h-screen bg-white px-5 py-10 text-black sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-end">
          <div>
            <p
              onClick={() => navigate(`/home`)}
              className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-500  hover:text-gray-950 cursor-pointer"
            >
              🏠︎ NexTask / Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage and track your assigned work.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black mt-5"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              Back
            </button>
          </div>

          <p className="text-sm text-gray-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>

        {/* Filters */}
        <section className="my-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <select
            value={priority}
            onChange={(e) => updateFilter("priority", e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
          >
            <option value="">All priorities</option>
            <option value="imp">Important</option>
            <option value="top">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
            <option value="nil">None</option>
          </select>

          <select
            value={status}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
          >
            <option value="">All statuses</option>
            <option value="alloted">Allotted</option>
            <option value="working">Working</option>
            <option value="complete">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
          >
            <option value="">All categories</option>
            <option value="self">Self</option>
            <option value="assigned_to">Assigned</option>
          </select>

          <select
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
          >
            <option value="nto">Newest first</option>
            <option value="otn">Oldest first</option>
          </select>

          <button
            onClick={clearFilters}
            className="rounded-lg px-4 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            Clear filters
          </button>
        </section>

        {/* Tasks */}
        {loading ? (
          <p className="py-16 text-center text-sm text-gray-500">
            Loading tasks...
          </p>
        ) : error ? (
          <div className="rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-sm font-medium">Unable to load tasks</p>
            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <button
              onClick={() => {
                setSearchParams(new URLSearchParams(searchParams));
              }}
              className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Retry
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 py-20 text-center">
            <h2 className="text-lg font-medium">No tasks found</h2>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <SmallTaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
