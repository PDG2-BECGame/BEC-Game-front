export interface VideoData {
    headerTitle: string;
    title: string;
    videoId: string;
    descriptionTitle: string;
    date: string;
    description: string;
}

export const videoData: { [key: string]: VideoData } = {
    '1': {
        headerTitle: 'Nivel 1',
        title: 'Clase 1',
        videoId: '3uWaWLwgYtk', // Reemplaza con el ID real del video del nivel 1
        descriptionTitle: 'Introducción a los conceptos fundamentales del BEC',
        date: '20/11/2024',
        description:
            'Este nivel tiene como objetivo construir una base teórica sobre el BEC en los empleados, incluyendo la definición, objetivos y técnicas comunes, como la suplantación de identidad y el uso de ingeniería social. A través de un video introductorio y un cuestionario de diez preguntas, el usuario se familiariza con los conceptos básicos y entiende el impacto de estos ataques en el entorno corporativo.',
    },
    '2': {
        headerTitle: 'Nivel 2',
        title: 'Clase 2',
        videoId: 'ar9kd_yKMMc', // Reemplaza con el ID real del video del nivel 2
        descriptionTitle: 'Identificación de señales de advertencia en correos sospechosos',
        date: '20/11/2024',
        description:
            'El fin de este nivel es desarrollar habilidades analíticas que permitan a los empleados identificar señales de advertencia en correos electrónicos sospechosos y reforzar su sentido crítico para el análisis de comunicaciones potencialmente peligrosas. Además, se presentan elementos clave que pueden indicar un ataque BEC, como dominios sospechosos, tonos de urgencia y solicitudes inusuales. Este nivel incluye otro video educativo y un cuestionario de diez preguntas diseñado para evaluar la capacidad del usuario de reconocer patrones de fraude.',
    },
    '3': {
        headerTitle: 'Nivel 3',
        title: 'Clase 3',
        videoId: 'y_rhWHL_kFM', // Reemplaza con el ID real del video del nivel 3
        descriptionTitle: 'Respuesta y Recuperación ante un Ataque de BEC',
        date: '20/11/2024',
        description:
            'El fin de este nivel es consolidar el conocimiento y las habilidades adquiridas en los niveles anteriores mediante la práctica en un entorno seguro, permitiendo que los empleados se sientan preparados para actuar en situaciones reales de BEC. Este nivel es de aplicación práctica y consiste en una serie de escenarios simulados donde el usuario debe decidir si un correo electrónico es legítimo o presenta características de un ataque BEC. Los escenarios están diseñados para reflejar situaciones reales en las que los empleados deben tomar decisiones rápidas basadas en su análisis de los correos electrónicos. Se presenta el último vídeo de capacitación, con el objetivo de dar los consejos finales para que los usuarios del juego logren responder satisfactoriamente la simulación.',
    },
};
