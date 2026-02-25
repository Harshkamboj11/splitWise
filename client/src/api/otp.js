import { otpAxios } from './axios';

export const otpAPI = {
  // Request OTP
  requestOTP: async (data) => {
    const response = await otpAxios.post('/otp/request', data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data) => {
    const response = await otpAxios.post('/otp/verify', data);
    return response.data;
  },

  // Resend OTP
  resendOTP: async (data) => {
    const response = await otpAxios.post('/otp/resend', data);
    return response.data;
  },
};

export default otpAPI;
