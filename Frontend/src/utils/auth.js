export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const login = () => {
  localStorage.setItem("isAuthenticated", "true");
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};
