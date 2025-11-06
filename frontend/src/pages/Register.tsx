import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
    interface Role {
        id_rol: number;
        rol: string;
    }

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        id_rol: ''
    } as {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        password: string;
        id_rol: string;
    });

    const [roles, setRoles] = useState<Role[]>([]);
    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any; }; }) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/roles');
                const data: Role[] = await res.json();
                const clean = (Array.isArray(data) ? data : [])
                    .filter(r => r && r.id_rol != null && r.rol != null);
                setRoles(clean);
            } catch (error) {
                console.error('Error fetching roles:', error);
                setRoles([]);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await authService.register(form);
            navigate('/login');
        } catch {
            alert('Error al registrarse');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="apellido" placeholder="Apellido" onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="telefono" placeholder="Teléfono" onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="w-full border p-2 rounded" />

                <select
                    name="id_rol"
                    value={form.id_rol}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Selecciona un rol</option>
                    {roles.map((r) => (
                        <option key={r.id_rol} value={r.id_rol}>
                            {r.rol}
                        </option>
                    ))}
                </select>


                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
