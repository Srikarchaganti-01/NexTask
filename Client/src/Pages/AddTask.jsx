import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../API/Api";
import Navbar from "../Components/Navbar";

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

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 shadow-2xl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            NexTask
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Create a new task
          </h1>

          <p className="mt-2 text-gray-500">
            Add the details of your task below.
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

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl shadow-md bg-white p-7 "
        >
          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Task title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              maxLength={20}
              required
              className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {formData.title.length}/20
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what needs to be done..."
              rows={5}
              className="w-full resize-none rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {/* Priority + Status */}
          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none focus:border-black focus:bg-white"
              >
                <option value="nil">No Priority</option>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="top">High</option>
                <option value="imp">Important</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none focus:border-black focus:bg-white"
              >
                <option value="working">Working</option>
                <option value="alloted">Alloted</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Category + Access */}
          <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none focus:border-black focus:bg-white"
              >
                <option value="self">Self</option>
                <option value="assigned_to">Assigned To</option>
                <option value="assigned_by">Assigned By</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Access</label>

              <select
                name="access"
                value={formData.access}
                onChange={handleChange}
                className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none focus:border-black focus:bg-white"
              >
                <option value="all">Everyone</option>
                <option value="self">Only Me</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
                <option value="top_ord">Top Order</option>
                <option value="level_ord">Level Order</option>
                <option value="low_ord">Low Order</option>
              </select>
            </div>
          </div>

          {/* Deadline */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="text"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="e.g. today, tomorrow, 25 Sept 2026"
              required
              className="w-full rounded-xl shadow-md bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl shadow-md px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
