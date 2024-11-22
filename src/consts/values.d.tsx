// Importamos los logos
import logo1 from '../assets/icon-problem.svg';
import logo2 from '../assets/icon-solution.svg';
import logo3 from '../assets/logo-game.svg';

export const levels = [
    {
        id: 1,
        nivel: "Nivel 1",
        titulo: "Conciencia Crítica: Reconociendo la Amenaza del BEC",
        puntaje: 4,
        descripcion: "El objetivo es enfatizar la importancia de reconocer y entender el Business Email Compromise (BEC) como una amenaza significativa en el entorno empresarial. Se busca que los usuarios comprendan las implicaciones de estos fraudes y la necesidad de estar alerta ante las tácticas que usan los estafadores.",
        logo: logo1, // Ruta del logo para el nivel 1
    },
    {
        id: 2,
        nivel: "Nivel 2",
        titulo: "Protegiendo tu Organización contra el BEC",
        puntaje: 250,
        descripcion: "En esta clase, exploraremos estrategias y mejores prácticas para proteger a tu organización de los ataques de BEC. Aprenderás sobre las medidas preventivas y cómo implementar políticas de seguridad efectivas.",
        logo: logo2, // Ruta del logo para el nivel 2
    },
    {
        id: 3,
        nivel: "Nivel 3",
        titulo: "Respuesta y Recuperación ante un Ataque de BEC",
        puntaje: 500,
        descripcion: "Esta sesión se enfoca en cómo responder de manera eficiente a un ataque de BEC. Discutiremos los pasos para mitigar el impacto y las acciones necesarias para recuperar la seguridad.",
        logo: logo3, // Ruta del logo para el nivel 3
    }
];
