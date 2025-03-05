import React, { useState } from 'react';
import Login from '../../components/LogIncomp';

const LogIn = () => {
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setUserData(data);
    alert(`Bienvenido ${data.username}, Rol: ${data.role}`);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
      {userData && <p>Bienvenido, {userData.username}!</p>}
    </div>
  );
};

export default LogIn ;
