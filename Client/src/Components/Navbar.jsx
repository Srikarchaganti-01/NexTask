import { logout } from "../API/Api";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const logout_get = async () => {
    try {
      const response = await logout();
    } catch (err) {
      console.log(err.message);
    }
    window.location.href = "/Login";
  };
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between rounded-2xl shadow-md bg-white px-6 py-4">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
        NexTask
      </h1>

      <div className="flex items-center gap-8 text-sm font-medium text-zinc-500">
        <button
          onClick={() => navigate("/tasks")}
          className="transition hover:text-black"
        >
          Tasks
        </button>

        <button
          onClick={() => navigate("/addtask")}
          className="transition hover:text-black"
        >
          Add
        </button>

        <button
          onClick={logout_get}
          className="transition text-white hover:text-black hover:bg-white bg-black/95 px-3 py-2 rounded-4xl cursor-pointer border-black/90 border-b-2 "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
