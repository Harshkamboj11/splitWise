import { authAxios } from './axios';

export const authAPI = {
  login: async (credentials) => {
    const res = await authAxios.post('/user/login', credentials);
    return res.data;
  },

  logout: async () => {
    await authAxios.post('/user/logout');
  },

  me: async () => {
    const res = await authAxios.get('/user/me');
    return res.data.user;
  },

  register: async (userData) => {
    const response = await authAxios.post('/user/signup', userData);
    return response.data;
  },
};

export default authAPI;
