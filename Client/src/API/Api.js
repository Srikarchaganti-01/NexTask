const API_URL = "http://localhost:3000";

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

export const home_get = async () => {
  const response = await fetch(`${API_URL}/home`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Home request failed: ${response.status}`);
  }
  const data = await response.json();
  // console.log("Dash DAta:", data);
  return data;
};

export const all_tasks = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Task request failed: ${response.status}`);
  }
  const data = await response.json();
  // console.log("Tasks DAta:", data);
  return data;
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/addtask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.errors?.general || "Failed to create task");
  }

  return data;
};

export const getTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || data.errors?.delmsg || "Failed to delete task");
  }

  return data;
};

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
