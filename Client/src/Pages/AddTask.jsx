import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../API/Api";

import Footer from "../Components/Footer";
function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "nil",
    category: "self",
    access: "all",
    deadline: "",
    status: "working",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createTask(formData);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const priorities = [
    { value: "nil", label: "No priority" },
    { value: "low", label: "Low" },
    { value: "med", label: "Medium" },
    { value: "top", label: "High" },
    { value: "imp", label: "Important" },
  ];

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
              Task Creation<span className="text-gray-400">.</span>
            </h1>

            <p className="mt-2 mb-5 text-sm text-gray-500 sm:text-base">
              Create the task here.
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2 text-lg text-gray-500 transition hover:text-black"
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
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      The essentials
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      What are we working on?
                    </h2>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600">
                      Task title
                    </label>
                    <span className="text-xs text-gray-400">
                      {formData.title.length}/20
                    </span>
                  </div>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Give the task a title"
                    maxLength={20}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base font-medium outline-none transition placeholder:font-normal focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-600">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add context, notes, or the next steps..."
                    rows={6}
                    className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
                <h2 className="mb-5 mt-2 text-xl font-semibold">
                  Time and Progress !
                </h2>

                <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Deadline
                    </label>

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Initial status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    >
                      <option value="alloted">Alloted</option>
                      <option value="working">Working</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-5 lg:col-span-5">
              <section className="relative overflow-hidden rounded-3xl bg-[#171717] p-6 text-white shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:p-7">
                <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/6 blur-2xl" />

                <div className="relative">
                  <h2 className="mt-2 text-2xl font-semibold">
                    How important is it?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Choose a priority that matches the task.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2.5">
                    {priorities.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: item.value,
                          }))
                        }
                        className={`rounded-xl border px-3 py-3 text-sm transition ${
                          formData.priority === item.value
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
                      value={formData.category}
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
                      value={formData.access}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 outline-none transition focus:border-gray-400 focus:bg-white"
                    >
                      <option value="all">Everyone</option>
                      <option value="self">Only me</option>
                      <option value="user">Users</option>
                      <option value="admin">Admins</option>
                      <option value="top_ord">Top order</option>
                      <option value="level_ord">Level order</option>
                      <option value="low_ord">Low order</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <p className="text-sm leading-6 text-gray-500">
                  One step at a time. Your task will be ready once you create
                  it.
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Creating task..." : "Create task  →"}
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

export default AddTask;
