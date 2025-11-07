import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setMessage('Por favor, ingresa tu email y contraseña.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const loggedUser: any = await login(credentials);
      setIsLoading(false);
      setMessage('¡Bienvenido al sistema!');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);

      const isAdmin = !!(
        loggedUser && (
          loggedUser.role === 'admin' ||
          loggedUser.rol === 'admin' ||
          (Array.isArray(loggedUser.roles) && loggedUser.roles.some((r: any) => r.nombre === 'admin' || r.name === 'admin'))
        )
      );

      if (isAdmin) navigate('/admin');
      else navigate('/canchas');
    } catch (err) {
      setIsLoading(false);
      setMessage('Error al iniciar sesión');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .login-card-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .login-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .login-header {
          background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
          padding: 50px 20px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header-decoration-1,
        .header-decoration-2 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .header-decoration-1 {
          top: -100px;
          right: -50px;
        }

        .header-decoration-2 {
          bottom: -80px;
          left: -60px;
          width: 150px;
          height: 150px;
        }

        .ball-container {
          position: relative;
          z-index: 1;
          margin-bottom: 24px;
        }

        .ball-wrapper {
          width: 90px;
          height: 90px;
          margin: 0 auto;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .ball-svg {
          width: 55px;
          height: 55px;
          color: #28a745;
        }

        .login-title {
          position: relative;
          z-index: 1;
          color: white;
        }

        .login-title h2 {
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 10px 0;
        }

        .login-title p {
          margin: 0;
          font-size: 15px;
          opacity: 0.95;
          font-weight: 400;
        }

        .login-form-wrapper {
          padding: 40px 36px 36px;
        }

        .login-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .label-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
          font-weight: bold;
        }

        .email-icon {
          background: #28a745;
          color: white;
        }

        .lock-icon {
          width: 18px;
          height: 18px;
          color: #28a745;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 16px 18px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input-with-icon {
          padding-right: 50px;
        }

        .form-input:focus {
          outline: none;
          border-color: #28a745;
          box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
        }

        .form-input::placeholder {
          color: #999;
        }

        .toggle-password {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-password:hover {
          opacity: 0.7;
        }

        .eye-icon {
          width: 22px;
          height: 22px;
          color: #666;
        }

        .submit-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #1e7e34 0%, #28a745 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(40, 167, 69, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button::after {
          content: '→';
          font-size: 22px;
          transition: transform 0.3s ease;
        }

        .submit-button:hover:not(:disabled)::after {
          transform: translateX(4px);
        }

        .register-link {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid #e0e0e0;
        }

        .register-link p {
          margin: 0;
          font-size: 15px;
          color: #666;
        }

        .register-link a {
          color: #28a745;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .register-link a:hover {
          color: #1e7e34;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-card-wrapper {
            max-width: 100%;
          }

          .login-header {
            padding: 40px 16px 32px;
          }

          .login-title h2 {
            font-size: 28px;
          }

          .login-form-wrapper {
            padding: 32px 24px 24px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card-wrapper">
          <div className="login-card">
            <div className="login-header">
              <div className="header-decoration header-decoration-1" />
              <div className="header-decoration header-decoration-2" />

              <div className="ball-container">
                <div className="ball-wrapper">
                  <svg className="ball-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2L9 8l3 2 3-2-3-6zM4 8l2 8 6 4 6-4 2-8H4z" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
              </div>

              <div className="login-title">
                <h2>Mi Cancha</h2>
                <p>Sistema de Reservas</p>
              </div>
            </div>

            <div className="login-form-wrapper">
              <div className="login-form">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon email-icon">@</span>
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <svg className="lock-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm3 8H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3z"/>
                    </svg>
                    Contraseña
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      className="form-input form-input-with-icon"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? (
                        <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      ) : (
                        <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="button" onClick={handleSubmit} className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Procesando...' : 'Ingresar al Sistema'}
                </button>
              </div>

              <div className="register-link">
                <p>
                  ¿No tenés cuenta?{' '}
                  <Link to="/register">Registrate acá</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;