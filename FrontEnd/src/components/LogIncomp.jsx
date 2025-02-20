import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { getUsers } from '../models/UserModel';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await getUsers();
      const user = users.find(u => u.email === email);

      if (user) {
        // Aquí harías la verificación de la contraseña con el backend
        // Por ahora solo verificamos que el usuario existe
        login(user);
        navigate('/');
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#fff' }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#121212' }}>
        <h2 className="text-center mb-4 text-white fw-bold">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
            <input
              type="email"
              id="email"
              className="form-control bg-dark text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@gmail.com"
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

          <button type="submit" className="btn btn-danger w-100 fw-bold">
            Iniciar Sesión
          </button>
        </form>

        {error && <div className="text-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default Login;