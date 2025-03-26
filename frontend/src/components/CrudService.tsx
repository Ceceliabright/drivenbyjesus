// crudService.tsx
import axios from 'axios';

const API_URL = 'HTTP://localhost:5000/users';  // Adjust the URL to match your backend


// Function to handle user sign-up
export const signUpUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data; // This could be a success message or user data
  } catch (error) {
    throw new Error('Error during sign-up');
  }
};

// Function to handle user sign-in
export const signInUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data; // This could be a success message or JWT token
  } catch (error) {
    throw new Error('Error during sign-in');
  }
};



export const fetchData = async (resource: string) => {
    try {
      const response = await fetch(`http://localhost:5000/${resource}`);
      if (!response.ok) throw new Error('Error fetching data');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching ${resource}`);
    }
  };
  
  export const saveData = async (resource: string, data: any) => {
    try {
      const response = await fetch(`http://localhost:5000/${resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error saving data');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Error saving ${resource}`);
    }
  };
  
  export const updateData = async (resource: string, id: number, data: any) => {
    try {
      const response = await fetch(`http://localhost:5000/${resource}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error updating data');
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error(`Error updating ${resource}`);
    }
  };
  
  export const deleteData = async (resource: string, id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/${resource}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting data');
      return id; // Return deleted id
    } catch (error) {
      console.error(error);
      throw new Error(`Error deleting ${resource}`);
    }
  };
  