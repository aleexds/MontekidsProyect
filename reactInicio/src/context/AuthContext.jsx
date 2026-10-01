import { useState, useEffect } from 'react';
import { AuthContext } from '../context/authContextObject';

export function AuthProvider({ children }) {
  // Inicializamos activeUser inmediatamente desde localStorage para evitar parpadeos
  const [activeUser, setActiveUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('activeUser');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.warn('Error al parsear activeUser de localStorage:', e);
    }
    return null;
  });

  // Inicializamos el loading solo si hay ID guardado y aún no tenemos el activeUser cargado
  const [loading, setLoading] = useState(() => {
    return !!localStorage.getItem('currentUserId') && !localStorage.getItem('activeUser');
  });

  useEffect(() => {
    const savedUserId = localStorage.getItem('currentUserId') || (activeUser?.id ? activeUser.id : null);
    
    if (savedUserId) {
      fetch(`http://localhost:3000/users/${savedUserId}`)
        .then(res => {
          if (!res.ok) throw new Error('Usuario no encontrado');
          return res.json();
        })
        .then(data => {
          setActiveUser(data);
          localStorage.setItem('activeUser', JSON.stringify(data));
          localStorage.setItem('currentUserId', data.id);
          setLoading(false);
        })
        .catch((err) => {
          console.warn('No se pudo sincronizar usuario con el servidor:', err);
          setLoading(false);
        });
    }
  }, [activeUser?.id]);

  const login = async (emailInput, passwordInput) => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) throw new Error('Error al conectar con json-server');
      const users = await response.json();

      const matchedUser = users.find(
        (u) =>
          u.email?.trim().toLowerCase() === emailInput?.trim().toLowerCase() &&
          u.password === passwordInput
      );

      if (matchedUser) {
        setActiveUser(matchedUser);
        localStorage.setItem('activeUser', JSON.stringify(matchedUser));
        localStorage.setItem('currentUserId', matchedUser.id);
        return { success: true, user: matchedUser };
      } else {
        const emailExists = users.some(
          (u) => u.email?.trim().toLowerCase() === emailInput?.trim().toLowerCase()
        );
        if (emailExists) {
          return { success: false, error: 'Contraseña incorrecta' };
        } else {
          return { success: false, error: 'Correo no registrado' };
        }
      }
    } catch (error) {
      console.warn('Error al iniciar sesión:', error);
      return { success: false, error: 'Error de conexión con el servidor (json-server)' };
    }
  };

  const logout = () => {
    setActiveUser(null);
    localStorage.removeItem('activeUser');
    localStorage.removeItem('currentUserId');
  };

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}