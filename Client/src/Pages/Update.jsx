import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../API/Api";

import Footer from "../Components/Footer";
function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "nil",
    category: "self",
    access: "all",
    deadline: "",
    status: "alloted",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Read existing task and prefill the form
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);

        setTask({
          title: data.title || "",
          description: data.description || "",
          priority: data.priority || "nil",
          category: data.category || "self",
          access: data.access || "all",
          deadline: data.deadline ? data.deadline.slice(0, 10) : "",
          status: data.status || "alloted",
        });
      } catch (err) {
        setError(err.message || "Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await updateTask(id, task);
      navigate(`/tasks/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading task...</p>;

  return (
    <div className="min-h-screen bg-[#f5f6f8] px-4 py-8 text-gray-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p
              onClick={() => navigate(`/home`)}
              className="text-sm b-4 font-semibold uppercase tracking-[0.2em] text-gray-400"
            >
              🏠︎ NexTask workspace
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Update Task <span className="text-gray-400">.</span>
            </h1>
            <p className="mt-2 text-gray-500">
              Make it Better and call it a day
            </p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-4 flex items-center gap-2 text-lg text-gray-500 transition hover:text-black"
            >
              <span>←</span> Back
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      The essentials
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      What are we working on?
                    </h2>
                  </div>
                  <span className="rounded-xl bg-gray-100 px-3 py-2 text-lg">
                    01
                  </span>
                </div>

                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Task title
                </label>
                <input
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  maxLength={20}
                  required
                  placeholder="Give your task a name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-lg font-medium outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Add some context, notes, or the next steps..."
                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 leading-6 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Time & progress
                </p>
                <h2 className="mb-5 mt-2 text-xl font-semibold">
                  Keep things moving.
                </h2>

                <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={task.deadline}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <select
                      name="status"
                      value={task.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    >
                      {["alloted", "working", "completed", "overdue"].map(
                        (value) => (
                          <option key={value} value={value}>
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-5 lg:col-span-5">
              <section className="relative overflow-hidden rounded-3xl bg-[#171717] p-6 text-white shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:p-7">
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/6 blur-2xl" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Set your focus
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Priority level
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Decide how much attention this task needs.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {[
                      { value: "nil", label: "No priority" },
                      { value: "low", label: "Low" },
                      { value: "med", label: "Medium" },
                      { value: "top", label: "High" },
                      { value: "imp", label: "Important" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setTask((prev) => ({ ...prev, priority: item.value }))
                        }
                        className={`rounded-xl border px-3 py-3 text-sm transition ${
                          task.priority === item.value
                            ? "border-white bg-white font-semibold text-black shadow-lg"
                            : "border-white/10 bg-white/4 text-gray-300 hover:bg-white/10"
                        } ${item.value === "imp" ? "col-span-2" : ""}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Organisation
                </p>
                <h2 className="mb-5 mt-2 text-xl font-semibold">
                  Where does it belong?
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <select
                      name="category"
                      value={task.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    >
                      <option value="self">Personal task</option>
                      <option value="assigned_to">Assigned to me</option>
                      <option value="assigned_by">Assigned by me</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Access permissions
                    </label>
                    <select
                      name="access"
                      value={task.access}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    >
                      {[
                        ["all", "Everyone"],
                        ["self", "Only me"],
                        ["top_ord", "Top order"],
                        ["level_ord", "Same level"],
                        ["low_ord", "Lower order"],
                        ["user", "Users"],
                        ["admin", "Admins"],
                      ].map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <p className="text-sm text-gray-500">
                  All set? Save your changes when you're ready.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving changes..." : "Save changes  →"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-medium transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Update;
