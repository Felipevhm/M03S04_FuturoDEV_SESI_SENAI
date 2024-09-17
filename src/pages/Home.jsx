import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import CountdownTimer from "../components/CountdownTimer"; // Importa o componente de temporizador

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <div>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={logout}>Sair</button>
          {/* Adiciona o componente de temporizador com um valor inicial de 5 minutos */}
          <CountdownTimer initialMinutes={1} />
        </div>
      ) : (
        <p>Você não está logado.</p>
      )}
    </div>
  );
};

export default Home;
