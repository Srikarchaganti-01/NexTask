import { useState } from "react";
import { login } from "../API/Api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await login(formData);

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

      window.location.href = "/Home";
    } catch (err) {
      setErrors({
        general: "Unable to connect to the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black flex lg:px-16 py-5">
      <div className="hidden rounded-4xl lg:flex lg:w-1/2 bg-black text-white p-16 flex-col justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight">NexTask</div>

          <div className="mt-32 max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Task Management
            </p>

            <h1 className="mt-6 text-6xl font-medium leading-[1.05] tracking-tight">
              Get things
              <br />
              <span className="text-white/50">done.</span>
            </h1>

            <p className="mt-8 max-w-md text-white/60 leading-7">
              A simple workspace to organize your tasks, priorities and
              deadlines without unnecessary complexity.
            </p>
          </div>
        </div>

        <p className="text-xs text-white/30">Stay focused. Stay organized.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-16">
            <p className="text-2xl font-semibold">NexTask</p>
          </div>

          <div className="mb-10">
            <p className="text-sm text-black/40 uppercase tracking-widest">
              Welcome back
            </p>

            <h2 className="mt-3 text-4xl font-medium tracking-tight">
              Sign in
            </h2>

            <p className="mt-3 text-sm text-black/50">
              Continue managing your tasks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-xs text-black/40 hover:text-black disabled:opacity-30"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">{errors.password}</p>
              )}
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-black/50">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-black underline underline-offset-4"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
