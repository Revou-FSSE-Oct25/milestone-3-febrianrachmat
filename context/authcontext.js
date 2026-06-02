import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { isAdminUsername } from "../lib/admin-users";
import { API_URLS } from "../lib/api-config";
import { normalizeUserFromApi } from "../lib/normalize-api";

export const AuthContext = createContext();

function setAuthCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
}

function clearAuthCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

function getAuthCookie(name) {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);

    if (!getAuthCookie("token")) {
      setAuthCookie("token", "authenticated");
      setAuthCookie("username", parsedUser.username);
    }

    setUser(parsedUser);
  }, []);

  const isAdmin = useMemo(
    () => (user ? isAdminUsername(user.username) : false),
    [user]
  );

  const login = async (email, password) => {
    try {
      const res = await fetch(API_URLS.users);
      const users = await res.json();

      const foundUser = users.find(
        (candidate) => candidate.email === email && candidate.password === password
      );

      if (!foundUser) return false;

      const normalizedUser = normalizeUserFromApi(foundUser);

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      setAuthCookie("token", "authenticated");
      setAuthCookie("username", normalizedUser.username);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    clearAuthCookie("token");
    clearAuthCookie("username");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
