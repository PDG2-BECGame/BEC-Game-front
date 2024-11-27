import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BePROLogo from '../../assets/BePRO_logo.svg'; // Asegúrate de importar correctamente tu logo

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(60); // 60 segundos
  const navigate = useNavigate();

  useEffect(() => {
    // Iniciar el temporizador al montar el componente
    setCanResend(false);
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleResendEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setMessage('El correo de verificación ha sido reenviado.');
        setMessageType('success');

        // Reiniciar temporizador
        setCanResend(false);
        setTimer(60);
        const countdown = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 1) {
              return prevTimer - 1;
            } else {
              clearInterval(countdown);
              setCanResend(true);
              return 0;
            }
          });
        }, 1000);
      } catch (error) {
        console.error('Error al reenviar el correo de verificación:', error);
        setMessage('Hubo un problema al reenviar el correo. Por favor, inténtalo de nuevo más tarde.');
        setMessageType('error');
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
        setMessageType('error');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Logo y Título */}
      <div className="flex items-center mb-6">
        <img src={BePROLogo} alt="BePRO Logo" className="h-12 w-12 mr-4" />
        <h1 className="text-4xl font-bold">BEPRO</h1>
      </div>

      <h2 className="text-3xl font-bold mb-4">Verifica tu Correo Electrónico</h2>
      <p className="mb-6 text-center max-w-md">
        Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu cuenta.
      </p>
      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <button
        onClick={handleResendEmail}
        className={`w-full max-w-xs bg-customBlue text-white py-2 px-4 rounded-lg transition duration-300 mb-4 ${
          canResend ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!canResend}
      >
        {canResend ? 'Reenviar Correo de Verificación' : `Reenviar en ${timer}s`}
      </button>
      <button
        onClick={handleCheckVerification}
        className="w-full max-w-xs bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
      >
        Ya He Verificado Mi Correo
      </button>
    </div>
  );
};

export default VerifyEmail;
