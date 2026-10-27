import StatusBar from "./StatusBar";

function UserOverview({ user }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Dashboard / Overview
          </p>

          <h2 className="mt-3 text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
            Hey, <span className="italic">{user.username}</span>
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Here's how your tasks are looking.
          </p>
        </div>

        <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium capitalize text-zinc-600">
          {user.role}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            User ID
          </p>

          <p
            className="mt-3 truncate font-mono text-sm text-zinc-700"
            title={user.userId}
          >
            {user.userId}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-950 p-5 text-white">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            Total Tasks
          </p>

          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {user.totalTasks ?? 0}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Tasks associated with your account
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-zinc-900">Task Status</h3>

            <p className="mt-1 text-sm text-zinc-500">
              Your current task distribution
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 md:p-5">
          <StatusBar user={user} />
        </div>
      </div>
    </section>
  );
}

export default UserOverview;
