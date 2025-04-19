import api from "../api"

const login = async (data) => {
  const response = await api.post("/user/login", data);

  return response;
}

const register = async (data) => {
  const response = await api.post("/user/register", data);

  return response;
}

const sendOtp = async (data) => {
  const response = await api.post("/user/send-otp", data);

  return response;
}

const logout = async () => {
  localStorage.removeItem("userInfo");

  const response = await api.delete('/user/logout');

  return response;
}

const refresh_token = async (refreshToken) => {
  const response = await api.put('/user/refresh-token', {
    refreshToken: refreshToken
  });

  return response;
}

const forgetPassword = async (data) => {
  const response = await api.post("/user/forget-password", data);

  return response;
}

const userService = {
  login,
  register,
  sendOtp,
  logout,
  refresh_token,
  forgetPassword
}

export default userService