import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UserOverview from "../Components/UserOverview";
import TaskPreview from "../Components/TaskPreview";
import { all_tasks, home_get } from "../API/Api";

function Home() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const dashdata = await home_get();
        // console.log("dashdata);
        const userData = {
          username: dashdata.username,
          userId: dashdata.userid,
          role: dashdata.role,
          totalTasks: dashdata.total,
          working: dashdata.working,
          complete: dashdata.complete,
          overdue: dashdata.overdue,
          alloted: dashdata.alloted,
          priority: dashdata.priority,
        };
        const taskData = await all_tasks();
        setTasks(taskData.tasks);
        setUser(userData);
      } catch (err) {
        console.error("HOME ERROR:", err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    window.location.href = "/Login";
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-full px-5 py-6 md:px-8" e>
        <Navbar />

        <main className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {user && <UserOverview user={user} />}

          <TaskPreview tasks={tasks} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
