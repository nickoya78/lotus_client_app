import axios from 'axios';

export const register = async (email: string, password: string, name?: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', { email, password, name });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    return response;
  } catch (error) {
    console.error((error as any).response.data);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/logout');
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/resetPassword', { email });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePasswordWithToken = async (email: string, newPassword: string, resetToken: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/updatePasswordWithToken', { email, newPassword, resetToken });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};