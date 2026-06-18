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
                setMessage(data.message || '¡Unícheste ao equipo correctamente!');
                setTimeout(() => navigate('/'), 3000);
            } else {
                setStatus('error');
                setMessage('A invitación caducou, xa foi usada ou o teu usuario non coincide.');
                isProcessing.current = false; 
            }
        };

        handleAccept();
    }, [token, navigate]);

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                {status === 'loading' && <h2>Procesando... ⏳</h2>}
                {status === 'success' && <h2 style={{ color: '#28a745' }}>🎉 ¡Benvido/a ao equipo!</h2>}
                {status === 'error' && <h2 style={{ color: '#dc3545' }}>❌ Erro na invitación</h2>}
                <p style={{ marginTop: '10px', color: '#555' }}>{message}</p>
            </div>
        </div>
    );
}