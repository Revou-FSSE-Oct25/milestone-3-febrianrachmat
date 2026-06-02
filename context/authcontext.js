import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { isAdminUsername } from "../lib/admin-users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isCancelled = false;
    fetch("/api/auth/session")
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem("user");
          if (!isCancelled) setUser(null);
          return;
        }

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        if (!isCancelled) setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("user");
        if (!isCancelled) setUser(null);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const isAdmin = useMemo(
    () => (user ? user.role === "admin" || isAdminUsername(user.username) : false),
    [user]
  );

  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
