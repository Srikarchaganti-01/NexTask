export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/tasks?${params.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.message || "Failed to fetch tasks");
  }

  return data.tasks;
};

export const getTaskById = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return data.task || data;
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.errors?.message || "Failed to update task",
    );
  }

  return data;
};
