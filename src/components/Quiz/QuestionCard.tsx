import React, { useState } from 'react';
import { FiZoomIn } from 'react-icons/fi'; // Importamos el icono de lupa

interface QuestionCardProps {
  questionText: string;
  image?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{questionText}</h2>
      {image && (
        <div className="relative flex justify-center items-center">
          <img
            src={image}
            alt="Question Image"
            className="w-full max-w-xl max-h-96 rounded-md object-contain"
          />
          <button
            onClick={openModal}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            aria-label="Ampliar imagen"
          >
            <FiZoomIn className="text-xl text-gray-700" />
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
              aria-label="Cerrar"
            >
              &times;
            </button>
            <img
              src={image}
              alt="Question Image Enlarged"
              className="max-w-full max-h-screen rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;