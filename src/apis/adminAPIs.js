import axiosInstance from "./config/AxiosConfig";

export const AdminAPI = {
  getInfoBoard: async function (data) {
    try {
      const response = await axiosInstance.get(`admin/info-board`, {
        withCredentials: true,
        proxy: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  updateOrder: async function (data) {
    try {
      const response = await axiosInstance.post(`admin/order/update`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getOrderDetails: async function (productId) {
    try {
      const response = await axiosInstance.get(`admin/order/${productId}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
