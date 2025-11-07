import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { api } from '../services/api';

function Register() {
  // Estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    id_rol: ''
  });

  const [roles, setRoles] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para el mensaje de notificación
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // 'success' o 'error'
  const [showMessage, setShowMessage] = useState(false);

  // Manejador para actualizar el estado del formulario
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  // Simular la carga de roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get('/roles');
        const data = Array.isArray(res.data) ? res.data : [];
        setRoles(data.filter((r: any) => r && (r.id_rol || r.id) != null && (r.rol || r.name)));
      } catch (err) {
        console.error('Error fetching roles', err);
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  // Manejador del envío del formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ensure id_rol is numeric if backend expects a number
      const payload = { ...form, id_rol: Number(form.id_rol) };
      await authService.register(payload);
      setMessageType('success');
      setMessage('¡Registro exitoso! Serás redirigido al inicio de sesión.');
      setShowMessage(true);
      
      // Simular la navegación después de 2 segundos
      setTimeout(() => {
        setShowMessage(false);
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      setMessageType('error');
      setMessage(`Error al registrarse: ${error?.message || 'Inténtalo de nuevo.'}`);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Componente de Mensaje de Alerta (reemplazo de alert())
  const MessageAlert = () => (
    <div 
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-out ${
        showMessage ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-xl ${
        messageType === 'success' ? 'bg-green-600 shadow-green-500/50' : 'bg-red-500 shadow-red-400/50'
      }`}>
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={messageType === 'success' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
        </svg>
        {message}
        <button onClick={() => setShowMessage(false)} className="ml-4 text-white hover:text-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans antialiased">
      <MessageAlert />
      
      <div className="w-full max-w-lg relative z-10">
        {/* Card principal con estilo de Login */}
        <div className="bg-white rounded-[32px] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100 transition-all">
          
          {/* Header Verde Sólido */}
          <div className="bg-green-600 px-8 pt-10 pb-6 relative overflow-hidden">
            
            {/* Patrones de fondo (círculos) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="relative flex flex-col items-center text-center">
              
              {/* Icono de Registro (Nuevo icono para diferenciar del login) */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/30 transform transition-transform duration-300">
                <svg className="w-14 h-14 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* Icono de Usuario y Firma (Representa Registro) */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l2 2 4-4" />
                </svg>
              </div>

              {/* Título */}
              <div className="mt-4">
                <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                  Registro
                </h1>
                <p className="text-white text-base font-medium mt-1 opacity-90">
                  Completá tus datos para unirte a Mi Cancha
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="space-y-6">
              
              {/* Fila 1: Nombre y Apellido (Agrupados) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  <input name="nombre" placeholder="Juan" onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido</label>
                  <input name="apellido" placeholder="Pérez" onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required />
                </div>
              </div>

              {/* Fila 2: Email y Teléfono (Agrupados) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input name="email" type="email" placeholder="tu@email.com"
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                  <input name="telefono" type="tel" placeholder="+54 9 11..." onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required />
                </div>
              </div>

              {/* Fila 3: Contraseña y Rol (Agrupados) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                  <input type="password" name="password" placeholder="••••••••"
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rol</label>
                  <div className="relative">
                    <select name="id_rol" value={form.id_rol} onChange={handleChange}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none bg-white hover:border-green-400 text-gray-800 shadow-sm" required>
                      <option value="" disabled>Selecciona un rol</option>
                      {roles.map((r) => (
                        <option key={r.id_rol ?? r.id} value={r.id_rol ?? r.id}>{r.rol ?? r.name}</option>
                      ))}
                    </select>
                    {/* Flecha personalizada para el select */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de envío con estilo de Login */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-extrabold text-lg py-3 rounded-xl shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:bg-green-700 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-8 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 tracking-wide focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50"
              style={{ backgroundColor: isLoading ? '#34D399' : '#059669' }} 
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  Unirse a Mi Cancha
                </>
              )}
            </button>
          </form>

          {/* Enlace de Login */}
          <div className="px-8 pb-8 pt-4">
            <div className="text-center text-sm text-gray-600 border-t border-gray-100 pt-4">
              ¿Ya tenés cuenta?{' '}
              <a href="/login" className="text-green-600 hover:text-green-700 font-bold underline decoration-2 underline-offset-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:rounded-sm">
                Iniciá sesión
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;