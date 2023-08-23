const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { setToken, getToken, removeToken };
