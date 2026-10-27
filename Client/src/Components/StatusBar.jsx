import { useState } from "react";

function StatusBar(user) {
  const statuses = ["alloted", "complete", "working", "overdue"];
  const statusColors = {
    alloted: "bg-blue-50 text-blue-700 border-blue-200",
    working: "bg-amber-50 text-amber-700 border-amber-200",
    complete: "bg-green-50 text-green-700 border-green-200",
    overdue: "bg-red-50 text-red-700 border-red-200",
  };
  function ass_colr(status) {
    switch (status) {
      case "alloted":
        return "bg-slate-100 text-slate-700 border-slate-200 border-b-2 border-b-slate-500";

      case "working":
        return "bg-amber-50 text-amber-700 border-amber-200 border-b-2 border-b-amber-500";

      case "complete":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 border-b-2 border-b-emerald-500";

      case "overdue":
        return "bg-red-50 text-red-700 border-red-200 border-b-2 border-b-red-500";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200 border-b-2 border-b-gray-500";
    }
  }
  // console.log(user);
  // console.log(user.user.complete);
  return (
    <div className="rounded-2xl border border-zinc-200 p-4">
      <div className="grid grid-cols-2 gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            className={`py-2 rounded-2xl ${ass_colr(status)}`}
          >
            {status} : {user.user[status]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusBar;
