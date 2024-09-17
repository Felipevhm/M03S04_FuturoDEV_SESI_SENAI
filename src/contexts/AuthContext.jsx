import React, { createContext, useState, useEffect } from "react";

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Provider de autenticação
export const AuthProvider = ({ children }) => {
  // Estado de autenticação
  const [user, setUser] = useState(null); // Armazena informações do usuário autenticado
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  // Função para simular login
  const login = (userData) => {
    // Simula uma requisição de login, armazenando um token de exemplo
    const token = "fakeToken123";
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Função para logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Função de verificação de autenticação
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Simulação de recuperação de dados do usuário autenticado
      setUser({ name: "Usuário", email: "user@example.com" });
    }
    setLoading(false);
  };

  // Verificação da autenticação quando o componente é montado
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Valores fornecidos pelo contexto
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
