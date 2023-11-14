import axiosInstance from "./config/AxiosConfig";

export const MessageAPI = {
  getMessageAll: async function (data) {
    try {
      const response = await axiosInstance.get(`message/all`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
