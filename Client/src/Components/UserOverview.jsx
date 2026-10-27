import StatusBar from "./StatusBar";

function UserOverview({ user }) {
  // console.log(user);
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-10 shadow-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
        Dashboard
      </p>

      <h2 className="mt-3 text-4xl  italic  tracking-tight text-zinc-900 md:text-5xl">
        Hey, {user.username}
      </h2>

      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-5">
          <p className="text-md uppercase tracking-wider text-zinc-400">
            User ID
          </p>

          <p className=" truncate text-sm text-zinc-600">{user.userId}</p>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-md uppercase tracking-wider text-zinc-400">Role</p>

          <p className="text-sm capitalize text-zinc-700">{user.role}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">
            Total Tasks Online For {user.username}
          </p>

          <p className="mt-1 text-4xl font-semibold text-zinc-900">
            {user.totalTasks}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-3 text-mb uppercase tracking-wider text-zinc-400">
          Task Status
        </p>

        <StatusBar user={user} />
      </div>
    </section>
  );
}

export default UserOverview;
