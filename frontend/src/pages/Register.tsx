
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import api from '../services/api';

function Register() {
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get('/roles');
        const data = Array.isArray(res.data) ? res.data : [];
        setRoles(data.filter((r: any) => r && (r.id_rol || r.id) && (r.rol || r.name)));
      } catch {
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { ...form, id_rol: Number(form.id_rol) };
      await authService.register(payload);
      navigate('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header verde igual al login */}
        <div className="bg-green-600 px-8 py-8 text-center relative">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <svg
              className="w-8 h-8 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M15 19l2 2 4-4"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-white">Registro</h1>
          <p className="text-white/90 text-sm mt-1">
            Creá tu cuenta para acceder a Mi Cancha
          </p>
        </div>

        {/* Formulario compacto */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {/* Fila 1: Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nombre
              </label>
              <input
                name="nombre"
                placeholder="Juan"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Apellido
              </label>
              <input
                name="apellido"
                placeholder="Pérez"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Fila 2: Email y Teléfono */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="tu@email.com"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                name="telefono"
                type="tel"
                placeholder="+54 9 11..."
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all"
              />
            </div>
          </div>

          {/* Fila 3: Contraseña y Rol */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rol
              </label>
              <select
                name="id_rol"
                value={form.id_rol}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 outline-none transition-all appearance-none"
              >
                <option value="" disabled>
                  Seleccioná un rol
                </option>
                {roles.map((r) => (
                  <option key={r.id_rol ?? r.id} value={r.id_rol ?? r.id}>
                    {r.rol ?? r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-bold text-lg py-2.5 rounded-lg shadow-md hover:bg-green-700 hover:shadow-green-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        {/* Enlace al login */}
        <div className="text-center text-sm text-gray-600 border-t border-gray-100 py-4">
          ¿Ya tenés cuenta?{' '}
          <a
            href="/login"
            className="text-green-600 hover:text-green-700 font-semibold underline underline-offset-2"
          >
            Iniciá sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
