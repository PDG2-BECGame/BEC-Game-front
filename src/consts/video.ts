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
        videoId: 'xEg1KR3Dy44', // Reemplaza con el ID real del video del nivel 1
        descriptionTitle: 'Conciencia Crítica: Reconociendo la Amenaza del BEC',
        date: '10/10/2024',
        description:
            'El objetivo es enfatizar la importancia de reconocer y entender el Business Email Compromise (BEC) como una amenaza significativa en el entorno empresarial. Se busca que los usuarios comprendan las implicaciones de estos fraudes y la necesidad de estar alerta ante las tácticas que usan los estafadores.',
    },
    '2': {
        headerTitle: 'Nivel 2',
        title: 'Clase 2',
        videoId: 'GfFcHAtsstE', // Reemplaza con el ID real del video del nivel 2
        descriptionTitle: 'Protegiendo tu Organización contra el BEC',
        date: '11/10/2024',
        description:
            'En esta clase, exploraremos estrategias y mejores prácticas para proteger a tu organización de los ataques de BEC. Aprenderás sobre las medidas preventivas y cómo implementar políticas de seguridad efectivas.',
    },
    '3': {
        headerTitle: 'Nivel 3',
        title: 'Clase 3',
        videoId: '4cLCnHCLnJ8', // Reemplaza con el ID real del video del nivel 3
        descriptionTitle: 'Respuesta y Recuperación ante un Ataque de BEC',
        date: '12/10/2024',
        description:
            'Esta sesión se enfoca en cómo responder de manera eficiente a un ataque de BEC. Discutiremos los pasos para mitigar el impacto y las acciones necesarias para recuperar la seguridad.',
    },
};
