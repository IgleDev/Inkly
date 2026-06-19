import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { acceptTeamInvitation } from '@/api/TeamAPI';
export default function TeamInvitationPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Procesando a túa invitación...');
    const isProcessing = useRef(false);
    
    useEffect(() => {
        const handleAccept = async () => {
            if (!token) return;
        
            if (isProcessing.current) return; 
            isProcessing.current = true; 
            const data = await acceptTeamInvitation(token);
            if (data) {
                setStatus('success');
                setMessage(data.message || '¡Te uniste al equipo correctamente!');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setStatus('error');
                setMessage('La invitación caducó, ya fue usada o tu usuario no coincide.');
                isProcessing.current = false; 
            }
        };
        handleAccept();
    }, [token, navigate]);
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 font-sans">
            <div className="w-full max-w-sm sm:max-w-md mx-auto p-6 sm:p-8 rounded-xl shadow-md">
                {status === 'loading' && <h2 className="text-xl sm:text-2xl font-bold text-center">Procesando... ⏳</h2>}
                {status === 'success' && <h2 className="text-xl sm:text-2xl font-bold text-center text-green-600">🎉 Bienvenido/a al equipo!</h2>}
                {status === 'error' && <h2 className="text-xl sm:text-2xl font-bold text-center text-red-600">❌ Error en la invitación</h2>}
                <p className="mt-3 text-sm sm:text-base text-center text-gray-500">{message}</p>
            </div>
        </div>
    );
}