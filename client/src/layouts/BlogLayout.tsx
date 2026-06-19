import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Outlet, useNavigate } from 'react-router-dom'
export default function BlogLayout() {
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-[#C53F56] transition-colors mb-4 p-3 sm:p-5">
                    <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Volver
                </button>
            </nav>
            <main className="max-w-5xl mx-auto pt-3 sm:pt-5 px-4 sm:px-6 lg:px-0">
                <Outlet />
            </main>
        </>
    )
}