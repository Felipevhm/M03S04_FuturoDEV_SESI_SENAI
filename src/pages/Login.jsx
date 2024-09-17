import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext); // Pega a função de login do contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Hook para navegação

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa o erro anterior
    setLoading(true); // Inicia o estado de carregamento

    // Valida se o email e a senha foram preenchidos
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      // Simula uma chamada de autenticação (pode ser uma requisição de API real)
      const response = await fakeAuthRequest(email, password);

      if (response.success) {
        // Se a autenticação for bem-sucedida, salva os dados do usuário e navega para a home
        login(response.user);
        navigate("/home");
      } else {
        // Se a autenticação falhar, exibe a mensagem de erro
        setError("Credenciais inválidas.");
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Função simulada de autenticação
  const fakeAuthRequest = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Exemplo de verificação de credenciais (pode ser substituído por uma lógica real)
        if (email === "user@example.com" && password === "password") {
          resolve({
            success: true,
            user: { name: "Usuário Exemplo", email: "user@example.com" },
          });
        } else {
          resolve({ success: false });
        }
      }, 1000); // Simula um atraso de 1 segundo
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
