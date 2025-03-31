// src/api/users.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/users';


export const getUserByEmail = async (email: string) => {
  const response = await axios.get(API_URL, { params: { email } });
  return response.data.length ? response.data[0] : null; // Return first matching user or null
};


export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const createUser = async (user: { email: string; password: string }) => {
  const dateJoined = new Date().toISOString(); // ISO string format for universal compatibility
  const userWithDate = { ...user, dateJoined };
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: string, updates: object) => {
  const response = await axios.patch(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
export const getUserById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };
  