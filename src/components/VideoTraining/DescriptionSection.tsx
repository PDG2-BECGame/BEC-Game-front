import React from "react";

interface DescriptionSectionProps {
    title: string;
    date: string;
    description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ title, date, description }) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-2xl mt-12 mb-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 font-poppins mb-2">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">Publicado el {date}</p>
            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Descripción:</h4>
                <p className="text-gray-700 text-base leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default DescriptionSection;
