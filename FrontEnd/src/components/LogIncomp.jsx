import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../core/loginUsers';
import { useAuth } from '../context/UserContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = verifyUser(username, password);

    if (user) {
      login(user);
      navigate('/'); // Redirigimos al inicio
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#fff' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#121212' }}>
        <h2 className="text-center mb-4 text-white fw-bold">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              className="form-control bg-dark text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu usuario"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control bg-dark text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 fw-bold">Iniciar Sesión</button>
        </form>

        {error && <div className="text-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Login;