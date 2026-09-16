import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black">
      <nav className="flex items-center justify-between px-6 py-6 lg:px-12">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          NexTask
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl px-5 py-2.5 text-sm font-medium transition shadow-xl hover:shadow-2xs"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-black/85 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/80"
          >
            Get started
          </Link>
        </div>
      </nav>

      <main className="px-6 pt-10 lg:px-12 lg:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-black/40">
              Simple task management
            </p>
            <h1 className="mt-7 text-6xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              Your work.
              <br />
              <span className="text-black/30">Under control.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-black/50">
              NexTask gives you a focused place to manage tasks, priorities and
              deadlines without getting in your way.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-xl bg-black/85 px-6 py-3.5 text-sm font-medium shadow-xl text-white transition hover:bg-black/80"
              >
                Start organizing
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-black/10 bg-white px-6 py-3.5 text-sm shadow-xl font-medium transition hover:border-black/30"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl  bg-black/10 sm:grid-cols-3 mt-24">
            <div className="bg-[#f7f7f5] p-8">
              <p className="text-xl text-black/30">01</p>
              <h3 className="mt-5 text-lg font-medium">Stay organized</h3>
              <p className="mt-3 text-sm leading-6 text-black/50">
                Keep everything you need to do in one focused workspace.
              </p>
            </div>

            <div className="bg-[#f7f7f5] p-8">
              <p className="text-xl text-black/30">02</p>
              <h3 className="mt-5 text-lg font-medium">Prioritize</h3>
              <p className="mt-3 text-sm leading-6 text-black/50">
                Quickly identify what needs your attention first.
              </p>
            </div>

            <div className="bg-[#f7f7f5] p-8">
              <p className="text-xl text-black/30">03</p>
              <h3 className="mt-5 text-lg font-medium">Get things done</h3>
              <p className="mt-3 text-sm leading-6 text-black/50">
                Track progress and turn pending work into completed work.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-black/10 px-6 py-8 lg:px-12">
        <div className="flex flex-col gap-3 text-xs text-black/30 sm:flex-row sm:items-center sm:justify-between">
          <span>NexTask</span>
          <span>Srikar Chaganti @2026 all rights Reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
