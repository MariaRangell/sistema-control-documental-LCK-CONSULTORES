import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type ValidUsers = {
  [key: string]: string;
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //CAMBIO 1: Agregue nuevo estado para manejar mensajes de recuperacion de contraseña
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Efecto de enfoque automático
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Datos de ejemplo (en un sistema real, esto se validaría en el servidor)
    const validUsers: ValidUsers = {
      'admin': 'admin123',
      'usuario': 'password123',
      'rh': 'doc2024'
    };

    if (validUsers[username] && validUsers[username] === password) {
      // Asignar rol y nombre según el usuario
      let userData = {};
      if (username === 'admin') {
        userData = { nombre: 'Administrador', rol: 'admin' };
      } else if (username === 'usuario') {
        userData = { nombre: 'Usuario', rol: 'user' };
      } else if (username === 'rh') {
        userData = { nombre: 'RH', rol: 'viewer' };
      }
      localStorage.setItem('user', JSON.stringify(userData));
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
    } else {
      setLoading(false);
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }
  };
  // CAMBIO 2: Reemplacé la función handleForgotPassword
  async function handleForgotPassword() {
    if (!username.trim()) {
      setError('Por favor ingresa tu nombre de usuario primero');
      return;
    }

    setLoading(true);
    setError('');
    setForgotPasswordMessage('');

     // Simula el envío de recuperación (no retorna JSX)
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
        // ERROR CORREGIDO
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

      const inputFocusStyle: React.CSSProperties = {
        ...inputStyle,
        outline: 'none',
        borderColor: '#dc143c',
        background: 'white',
        boxShadow: '0 0 0 3px rgba(220, 20, 60, 0.1)',
        transform: 'translateY(-2px)',
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

      // CAMBIO 6: Agregué nuevos estilos para el mensaje de éxito de recuperación de contraseña
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



      // CAMBIO 7: Modifiqué el estilo del botón para que se vea como un botón real
      // agregando background: 'none', border: 'none', padding: 0
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

            {/* CAMBIO 8: Agregué un nuevo div para mostrar el mensaje de éxito
                            cuando se envía la notificación al administrador */}
            <div style={forgotPasswordSuccessStyle}>{forgotPasswordMessage}</div>
            

            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label htmlFor="username" style={labelStyle}>
                  Nombre de Usuario
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
              {/* CAMBIO 9: Cambié de un elemento <button> con onClick a handleForgotPassword
                            en lugar de showForgotPassword para usar la nueva funcionalidad */}
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
