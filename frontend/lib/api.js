const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong");
    if (data.errors) error.errors = data.errors;
    throw error;
  }
  return data;
};

export const getAllJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.status) params.append("status", filters.status);
  if (filters.search) params.append("search", filters.search);

  const res = await fetch(`${BASE_URL}/api/jobs?${params.toString()}`);
  return handleResponse(res);
};

export const getJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`);
  return handleResponse(res);
};

export const createJob = async (jobData, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  return handleResponse(res);
};

export const updateJob = async (id, jobData, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });
  return handleResponse(res);
};

export const updateJobStatus = async (id, status, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
};
export const deleteJob = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};
