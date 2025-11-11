import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import pelota from "../assets/pelota.png";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e : any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      alert("Por favor completá todos los campos.");
      return;
    }

    try {
      const loggedUser = await login(credentials);
      const isAdmin = loggedUser && (loggedUser.role === "admin" || (Array.isArray(loggedUser.roles) && loggedUser.roles.some((r : any) => r.name === "admin")));
      navigate(isAdmin ? "/admin" : "/canchas");
    } catch {
      alert("Error al iniciar sesión. Verificá tus datos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Contenedor principal */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        
        {/* Pelota */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full shadow-md flex items-center justify-center bg-gray-50 border border-gray-200">
            <img src={pelota} alt="Pelota" className="w-10 h-10" />
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Iniciar Sesión
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Accedé a tu cuenta para gestionar tus reservas
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="jugador@club.com"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-400 focus:border-green-400 
                         bg-gray-50 text-gray-800 placeholder-gray-400 transition"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-400 focus:border-green-400 
                         bg-gray-50 text-gray-800 placeholder-gray-400 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-500 hover:text-green-600 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white 
                       font-semibold py-3 rounded-xl shadow-md hover:shadow-lg 
                       transition transform hover:scale-[1.01]"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline hover:text-green-700"
          >
            Registrate acá
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
