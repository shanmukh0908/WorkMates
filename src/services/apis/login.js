import api from './axios';

const logIn = async function (userData) {

  if (userData.email && userData.password) {
    const credentials = {
      email: userData.email,
      password: userData.password,
    };

    try {
      const res = await api.post('/users/login', credentials);
      return res;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  } else {
    throw new Error("Email and password are required");
  }
};

export default logIn;