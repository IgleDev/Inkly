import { Outlet, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AccountLayout() {
    const navigate = useNavigate();

    return (
        <>
            <nav>
                <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-[#C53F56] transition-colors mb-4 p-5"><ArrowLeftIcon /> Volver</button>
            </nav>
            <main className="max-w-5xl mx-auto pt-5">
                <Outlet />
            </main>
        </>
    )
}
