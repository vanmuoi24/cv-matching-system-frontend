import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Cho phép gửi cookie với request
});

// 🧩 Interceptor để đính kèm token vào headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Interceptor xử lý lỗi 401 (hết hạn token)
instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Gọi API refresh token (nếu có)
        await axios.get("http://localhost:8081/auth/refresh", {
          withCredentials: true,
        });

        // Sau khi refresh, lấy lại access token mới
        const newAccessToken = localStorage.getItem("token");
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return instance(originalRequest);
      } catch (err) {
        console.error("Refresh token failed, redirecting to login...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user"); // Nếu bạn có lưu user
  
      }
    }

    return Promise.reject(error);
  }
);

export default instance;