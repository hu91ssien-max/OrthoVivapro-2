import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const storedUser = localStorage.getItem("ortho_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("ortho_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Simulated auth delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple credential check (In a real app, this would be an API call)
    // admin / admin123
    // user / user123
    if (
      (username === "admin" && password === "admin123") ||
      (username === "user" && password === "user123")
    ) {
      const userData: User = {
        username,
        role: username === "admin" ? "admin" : "user",
      };

      setUser(userData);
      
      if (rememberMe) {
        localStorage.setItem("ortho_user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("ortho_user", JSON.stringify(userData));
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ortho_user");
    sessionStorage.removeItem("ortho_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
