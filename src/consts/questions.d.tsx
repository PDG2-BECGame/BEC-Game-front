export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: number; // Índice de la respuesta correcta
}

export interface QuestionsByLevel {
    [level: number]: Question[];
}

// Preguntas organizadas por nivel
export const questionsByLevel: QuestionsByLevel = {
    1: [
        { id: 1, question: "1. ¿Cuál es el objetivo principal de un ataque BEC?", options: ["Obtener información financiera o realizar transferencias fraudulentas", "Mejorar la seguridad de la empresa", "Enviar publicidad a la empresa", "Ninguna de las anteriores"], answer: 0 },
        { id: 2, question: "¿Cómo protegerse contra BEC?", options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], answer: 1 },
    ],
    2: [
        { id: 1, question: "¿Qué significa phishing?", options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], answer: 2 },
        { id: 2, question: "¿Cómo identificar un correo fraudulento?", options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], answer: 3 },
    ],
    3: [
        { id: 1, question: "¿Qué es spoofing?", options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], answer: 1 },
        { id: 2, question: "¿Cómo funciona un ataque de suplantación?", options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], answer: 2 },
    ],
};
