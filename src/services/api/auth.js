import api, { clearAuth, setAccessToken } from "./axios";

const handleError = (error) => {
  throw error.response?.data || error;
};

export const loginApi = async (credentials) => {
  try {
    const loginData = {
      emailOrPhone: credentials.email,
      password: credentials.password
    };

    const response = await api.post("/api/auth/login", loginData, {
      withCredentials: true
    });

    const { accessToken } = response.data.data;
    setAccessToken(accessToken);

    return {
      accessToken,
      user: response.data.user
    };
  } catch (error) {
    handleError(error);
  }
};

export const logoutApi = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    clearAuth();
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createAdminApi = async (adminData) => {
  try {
    const response = await api.post("/api/auth/create_admin", adminData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// export const verifySession = async () => {
//   try {
//     const response = await api.get("/api/auth/verify-session");
//     const { accessToken, user } = response.data;

//     setAccessToken(accessToken); // ✅ store fresh token if returned
//     return { user };
//   } catch (error) {
//     clearAuth();
//     handleError(error);
//   }
// };
