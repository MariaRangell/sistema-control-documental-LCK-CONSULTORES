import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();

  const API_URL = (import.meta as any)?.env?.VITE_API_URL || 'http://localhost:3003'

  useEffect(() => {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isEmail = username.includes('@');
      const payload: Record<string, string> = {
        password: password,
      };
      if (isEmail) {
        payload.correo = username;
      } else {
        payload.nombre_usuario = username;
      }

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = {
          nombre: data.user.nombre_completo,
          rol: data.user.rol,
          correo: data.user.correo,
          nombre_usuario: data.user.nombre_usuario,
          id: data.user.id,
          empresa_asignada: data.user.empresa_asignada
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', data.token);

        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 500);
      } else {
        setLoading(false);
        setError(data.error || 'Error al iniciar sesión');
        setPassword('');
      }
    } catch (error) {
      setLoading(false);
      setError('Error de conexión. Verifica que el servidor esté funcionando.');
      setPassword('');
      console.error('Error de conexión:', error);
    }
  };

  async function handleForgotPassword() {
    if (!username.trim()) {
      setError('Por favor ingresa tu nombre de usuario primero');
      return;
    }

    setLoading(true);
    setError('');
    setForgotPasswordMessage('');

    setTimeout(() => {
      setLoading(false);
      setForgotPasswordMessage(
        `Se ha enviado una solicitud de recuperación para el usuario "${username}" al administrador.`
      );
    }, 2000);
  }

  const bodyStyle: React.CSSProperties = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: 0,
  };

  const containerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const,
    border: '2px solid rgba(220, 20, 60, 0.2)',
  };

  const logoStyle: React.CSSProperties = {
    maxWidth: '180px',
    maxHeight: '80px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 20px',
  };

  const titleStyle: React.CSSProperties = {
    color: '#1a1a1a',
    fontSize: '28px',
    marginBottom: '10px',
    fontWeight: 600,
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#555',
    marginBottom: '30px',
    fontSize: '16px',
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: '20px',
    textAlign: 'left' as const,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#1a1a1a',
    fontWeight: 500,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    background: '#f8f8f8',
    color: '#333',
    boxSizing: 'border-box' as const,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #dc143c, #8b0000)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    boxShadow: '0 4px 15px rgba(220, 20, 60, 0.3)',
  };

  const errorStyle: React.CSSProperties = {
    background: '#ffe6e6',
    color: '#dc143c',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    border: '1px solid #ffb3b3',
    display: error ? 'block' : 'none',
  };

  const successStyle: React.CSSProperties = {
    background: '#f0f0f0',
    color: '#141414',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    border: '1px solid #ddd',
    display: loading ? 'block' : 'none',
  };

  const forgotStyle: React.CSSProperties = {
    marginTop: '20px',
  };

  const forgotPasswordSuccessStyle: React.CSSProperties = {
    background: '#e6ffe6',
    color: '#2d5a2d',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    border: '1px solid #b3ffb3',
    display: forgotPasswordMessage ? 'block' : 'none',
  };

  const forgotLinkStyle: React.CSSProperties = {
    color: '#dc143c',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <div style={{ width: '100%', margin: '0 auto 20px', textAlign: 'center' as const }}>
          <img
            src="/logo1.png"
            alt="Logo LCK Consultores"
            style={logoStyle} />
        </div>

        <h1 style={titleStyle}>Control Documental</h1>
        <p style={subtitleStyle}>Ingresa tus credenciales para acceder</p>

        <div style={errorStyle}>
          {error}
        </div>

        <div style={successStyle}>
          Iniciando sesión...
        </div>

        <div style={forgotPasswordSuccessStyle}>{forgotPasswordMessage}</div>
        
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="username" style={labelStyle}>
              Usuario o Correo
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="password" style={labelStyle}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={forgotStyle}>
          <button
            type="button"
            onClick={handleForgotPassword}
            style={forgotLinkStyle}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
