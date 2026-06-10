import { axiosInstance, url } from "./axiosInstance";

export const sendOtp = async (email) => {
  try {

    const response = await axiosInstance.post(
      url + "/api/otp/send-otp",
      { email }
    );

    return response.data;

  } catch (error) {

    return error.response.data;

  }
};

export const verifyOtp = async (email, otp) => {
  try {

    const response = await axiosInstance.post(
      url + "/api/otp/verify-otp",
      { email, otp }
    );

    return response.data;

  } catch (error) {

    return error.response.data;

  }
};