// src/components/Login.jsx
import React, { useState } from 'react';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password && role) {
      onLogin({ username, password, role });
    } else {
      alert("Por favor, completa todos los campos.");
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
              className="form-control bg-dark  text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu usuario"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white ">Contraseña</label>
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
      </div>
      
    </div>
  );
};
export default Login;
