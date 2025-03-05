import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import { useUsers } from '../hook/UseUsers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { users } = useUsers(); // Usamos el hook existente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Buscar el usuario con el email proporcionado
      const user = users.find(u => u.email === email);

      if (user) {
        // Comprobar que el usuario está activo
        if (!user.activo) {
          setError('Usuario inactivo');
          return;
        }

        // Aquí iría la verificación de la contraseña hasheada
        // Como está en el backend, necesitaríamos una ruta específica para esto
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          login(user);
          navigate('/');
        } else {
          setError('Contraseña incorrecta');
        }
      } else {
        setError('Usuario no encontrado');
      }
    } catch (err) {
      setError('Error al intentar iniciar sesión');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url(/Fondo1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: 'rgba(18, 18, 18, 0.9)' }}>
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
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control bg-dark text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
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