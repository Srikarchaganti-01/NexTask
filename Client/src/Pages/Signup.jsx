import { useState } from "react";
import { signup } from "../API/Api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    try {
      const response = await signup(formData);

      if (!response) {
        setErrors({
          general: "Something went wrong. Please try again.",
        });
        return;
      }

      if (response.errors) {
        setErrors(response.errors);
        return;
      }

      window.location.href = "/home";
    } catch (error) {
      setErrors({
        general: "Unable to connect to the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black flex lg:px-16 py-5">
      <div className="w-full lg:w-1/2  rounded-4xl flex items-center justify-center px-6 py-12 order-2  lg:order-1">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-16">
            <p className="text-2xl font-semibold">NexTask</p>
          </div>

          <div className="mb-10">
            <h2 className="mt-3 text-4xl font-medium tracking-tight">
              Create account
            </h2>

            <p className="mt-3 text-sm text-black/50">
              Start organizing your work with NexTask.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Username</label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                placeholder="Your username"
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition
                  ${
                    errors.username
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : "border-black/10 focus:border-black"
                  }
                `}
              />

              {errors.username && (
                <p className="mt-2 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="you@example.com"
                className={`mt-2 w-full rounded-xl border bg-white px-4 py-3.5 text-sm outline-none transition
                  ${
                    errors.email
                      ? "border-red-300 bg-red-50 focus:border-red-400"
                      : "border-black/10 focus:border-black"
                  }
                `}
              />

              {errors.email && (
                <p className="mt-2 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Create a password"
                  className={`w-full rounded-xl border bg-white px-4 py-3.5 pr-16 text-sm outline-none transition
                    ${
                      errors.password
                        ? "border-red-300 bg-red-50 focus:border-red-400"
                        : "border-black/10 focus:border-black"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-xs text-black/40 hover:text-black disabled:opacity-30 "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none focus:border-black disabled:opacity-50"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {errors.general && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-black/50">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-black underline underline-offset-4"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-black/90 text-white p-16 flex-col justify-between order-1 rounded-4xl lg:order-2">
        <div>
          <div className="text-2xl font-semibold tracking-tight">NexTask</div>

          <div className="mt-32 max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Your workspace
            </p>

            <h1 className="mt-6 text-6xl font-medium leading-[1.05] tracking-tight">
              Plan less.
              <br />
              <span className="text-white/50">Do more.</span>
            </h1>

            <p className="mt-8 max-w-md text-white/60 leading-7">
              Keep your tasks, priorities and deadlines in one place. NexTask
              keeps your workflow simple and focused.
            </p>
          </div>
        </div>

        <p className="text-xs text-white/30">Built for focused work.</p>
      </div>
    </div>
  );
};

export default Signup;
