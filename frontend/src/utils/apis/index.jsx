import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

// Get All Data
export const getDataTask = (limit, page, search) =>
  API.get(`/task?limit=${limit}&page=${page}&search=${search}`);

// Get Data By Id
export const getDataById = (id) => API.get(`/task/${id}`);

// Post Data
export const postDataTask = (data) => API.post("/task", data);

// Update Data API
export const updateDataTask = (id, data) => API.put(`/task/${id}`, data);

// Delete Data API
export const deleteDataTask = (id) => API.delete(`/task/${id}`);
