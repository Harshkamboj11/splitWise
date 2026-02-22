import axios from 'axios';

// Auth Service
export const authAxios = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // REQUIRED for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ledger Service
export const ledgerAxios = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Notification Service
export const notificationAxios = axios.create({
  baseURL: 'http://localhost:3002/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// OTP Service
export const otpAxios = axios.create({
  baseURL: 'http://localhost:3003/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PURE error handler (NO side effects)
const handleError = (error) => {
  if (error.response) {
    return Promise.reject({
      status: error.response.status,
      message: error.response.data?.message || 'Request failed',
    });
  }

  return Promise.reject({
    status: 0,
    message: 'Network error',
  });
};

// Attach interceptor
[authAxios, ledgerAxios, notificationAxios, otpAxios].forEach((instance) => {
  instance.interceptors.response.use((response) => response, handleError);
});
