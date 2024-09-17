import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60); // Converte minutos em segundos
  const [isActive, setIsActive] = useState(false); // Estado para controlar o início e a pausa do temporizador

  // Função para iniciar ou pausar o temporizador
  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  // Função para reiniciar o temporizador
  const handleReset = () => {
    setIsActive(false);
    setSecondsRemaining(initialMinutes * 60);
  };

  // useEffect para controlar o temporizador
  useEffect(() => {
    let interval;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsActive(false); // Pausa o temporizador ao chegar a zero
    }

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado ou quando o temporizador é pausado
  }, [isActive, secondsRemaining]);

  // Converte o tempo restante em minutos e segundos
  const formatTime = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h2>Temporizador</h2>
      <div>
        <p>{formatTime()}</p>
        <button onClick={handleStartPause}>
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
