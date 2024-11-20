import React from "react";

interface HeaderSectionProps {
    title: string;
    onButtonClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, onButtonClick }) => {
    return (
        <div className="w-full flex justify-between items-center py-4 px-6 bg-gradient-to-r from-customBlue to-customPurple text-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold">{title}</h1>
            <button
                className="bg-white text-customPurple px-4 py-2 rounded-md hover:bg-gray-100 transition"
                onClick={onButtonClick}
            >
                Ir al quiz
            </button>
        </div>
    );
};

export default HeaderSection;
