import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResendEmail = async () => {
        if (auth.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser);
                setMessage('El correo de verificación ha sido reenviado.');
            } catch (error) {
                console.error('Error al reenviar el correo de verificación:', error);
                setMessage('Hubo un problema al reenviar el correo. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    const handleCheckVerification = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                navigate('/');
            } else {
                setMessage('Tu correo electrónico aún no ha sido verificado.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">Verifica tu Correo Electrónico</h1>
            <p className="mb-6 text-center">
                Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
            </p>
            {message && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                    <p>{message}</p>
                </div>
            )}
            <button
                onClick={handleResendEmail}
                className="bg-customBlue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
            >
                Reenviar Correo de Verificación
            </button>
            <button
                onClick={handleCheckVerification}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
                Ya He Verificado Mi Correo
            </button>
        </div>
    );
};

export default VerifyEmail;
