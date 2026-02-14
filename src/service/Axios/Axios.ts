import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const publicEndpoints = ["/users/login", "/users/register", "/users/refresh"];
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    if (token && !isPublicEndpoint) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get("http://localhost:8080/auth/refresh", {
          withCredentials: true,
        });

        const newAccessToken = localStorage.getItem("token");
        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return instance(originalRequest);
      } catch (err) {
        console.error("Refresh token failed, redirecting to login...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

      }
    }

    return Promise.reject(error);
  }
);

export default instance;