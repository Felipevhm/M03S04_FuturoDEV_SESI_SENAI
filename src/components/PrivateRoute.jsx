import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Template para páginas privadas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Obtém o estado de autenticação do contexto

  // Exibe um indicador de carregamento enquanto verifica o estado de autenticação
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver autenticado, renderiza o componente filho
  return children;
};

export default PrivateRoute;
