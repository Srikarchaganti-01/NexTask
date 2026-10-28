import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("The verification link is missing its token.");
      return;
    }

    fetch(
      `http://localhost:3000/verify-email?token=${encodeURIComponent(token)}`,
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Email verification failed.");
        }

        setStatus("success");
        setMessage(data.msg || "Your email has been verified successfully.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Something went wrong. Please try again.");
      });
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 text-zinc-900">
      <section className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-xl shadow-zinc-200/50 sm:p-10">
        <Link to="/" className="text-4xl tracking-tight">
          NexTask
        </Link>

        <h1 className="text-2xl mt-6 font-bold tracking-tight">
          {status === "loading" && "Verifying your email"}
          {status === "success" && "You're all set!"}
          {status === "error" && "Verification failed"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">{message}</p>

        {status === "success" && (
          <Link
            to="/login"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Continue to Login
            <span className="ml-2">&rarr;</span>
          </Link>
        )}

        {status === "error" && (
          <Link
            to="/login"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Back to Login
          </Link>
        )}

        <p className="mt-8 border-t border-zinc-100 pt-5 text-xs text-zinc-400">
          Secure account verification · NexTask © 2026
        </p>
      </section>
    </main>
  );
}

export default VerifyEmail;
