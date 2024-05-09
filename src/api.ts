import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const register = async (email: string, password: string, name?: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, { email, password, name });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
    return response;
  } catch (error) {
    console.error((error as any).response.data);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/logout`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/resetPassword`, { email });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePasswordWithToken = async (email: string, newPassword: string, resetToken: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/updatePasswordWithToken`, { email, newPassword, resetToken });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// *******************************************************************
// import axios from 'axios';

// export const register = async (email: string, password: string, name?: string) => {
//   try {
//     const response = await axios.post('https://lotusbackendserver.org/auth/register', { email, password, name });
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await axios.post('https://lotusbackendserver.org/auth/login', { email, password });
//     return response;
//   } catch (error) {
//     console.error((error as any).response.data);
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     const response = await axios.post('https://lotusbackendserver.org/auth/logout');
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const resetPassword = async (email: string) => {
//   try {
//     const response = await axios.post('https://lotusbackendserver.org/auth/resetPassword', { email });
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const updatePasswordWithToken = async (email: string, newPassword: string, resetToken: string) => {
//   try {
//     const response = await axios.post('https://lotusbackendserver.org/auth/updatePasswordWithToken', { email, newPassword, resetToken });
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };