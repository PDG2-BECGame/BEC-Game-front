import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Desplaza la ventana al principio
        window.scrollTo(0, 0);
    }, [pathname]); // Se ejecuta cada vez que cambia la ruta

    return null; // No renderiza nada
};

export default ScrollToTop;
