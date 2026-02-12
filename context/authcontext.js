import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch("https://fakestoreapi.com/users");
      const users = await res.json();

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) return false;

      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      document.cookie = "token=authenticated; path=/";

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
  setUser(null);
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
