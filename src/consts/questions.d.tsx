// src/consts/questions.d.ts

export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: number; // Índice de la respuesta correcta
    image?: string; // Propiedad opcional para la imagen
  }
  
  export interface QuestionsByLevel {
    [level: number]: Question[];
  }
  
  // Importa las imágenes (asegúrate de que las rutas sean correctas)
  import image1 from '../assets/Correo.png';
  import image2 from '../assets/BePRO_logo.svg';
  
  // Preguntas organizadas por nivel
  export const questionsByLevel: QuestionsByLevel = {
    1: [
      { id: 1, question: "1. ¿Cuál es el objetivo principal de un ataque BEC?", options: ["Obtener información financiera o realizar transferencias fraudulentas", "Mejorar la seguridad de la empresa", "Enviar publicidad a la empresa", "Ninguna de las anteriores"], answer: 0 },
      { id: 2, question: "2. ¿Cuál es la mejor manera de verificar una solicitud sospechosa de transferencia de fondos?", options: ["Responder al correo electrónico directamente", "Llamar al remitente utilizando un número conocido", "Ignorar la solicitud", "Reenviar el correo a todos los contactos"], answer: 1 },
    ],
    2: [
      { id: 1, question: "1. ¿Cuál de las siguientes frases podría indicar urgencia sospechosa en un correo BEC?", options: ["“Por favor, verifica cuando tengas tiempo”", "“Necesito que hagas esto de inmediato, es urgente”", "“Recuerda revisar esto cuando puedas”", "“Consulta el documento cuando sea conveniente”"], answer: 1 },
      { id: 2, question: "2. ¿Qué debes hacer si recibes un correo sospechoso de tu jefe solicitando información confidencial?", options: ["Proporcionar la información inmediatamente", "Reenviar el correo a todos", "Verificar la solicitud a través de una llamada o reunión", "Publicar la solicitud en redes sociales"], answer: 2 },
    ],
    3: [
      {
        id: 1,
        question: "Observa la siguiente imagen y responde:",
        image: image1, // Asegúrate de que la ruta sea correcta
        options: ["Es un correo legítimo", "Es un correo fraudulento"],
        answer: 1,
      },
      {
        id: 2,
        question: "Analiza la imagen y determina:",
        image: image2,
        options: ["La URL es segura", "La URL es sospechosa"],
        answer: 1,
      },
    ],
  };
  