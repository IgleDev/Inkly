import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

export default function AccountLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const isPerfilPage = /^\/perfil\/[^/]+$/.test(location.pathname);
        if (isPerfilPage) {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    return (
        <>
            <nav>
                <button onClick={handleBack} className="text-sm text-gray-500 hover:text-[#C53F56] transition-colors mb-4 p-5">
                    <ArrowLeftIcon /> Volver
                </button>
            </nav>
            <main className="max-w-5xl mx-auto pt-5">
                <Outlet />
            </main>
        </>
    )
}