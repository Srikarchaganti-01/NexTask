import TaskCard from "./TaskCard";

function TaskPreview({ tasks }) {
  const tasksPage = () => {
    window.location.href = "/tasks";
  };
  return (
    <section className="">
      <div className="mb-5 flex items-end justify-between ">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Recent
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-zinc-900">
            Your Tasks
          </h2>
        </div>

        <span className="text-sm text-zinc-400">{tasks.length} tasks</span>
      </div>

      <div className="space-y-4">
        {[...tasks]
          .reverse()
          .slice(0, 3)
          .map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
      </div>

      <button
        onClick={tasksPage}
        className="group mt-6 flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-black"
      >
        View all tasks
        <span className="transition-transform group-hover:translate-x-5">
          →
        </span>
      </button>
    </section>
  );
}

export default TaskPreview;
