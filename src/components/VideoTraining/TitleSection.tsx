import React from "react";

interface TitleSectionProps {
    title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 font-poppins">{title}</h2>
            <div className="h-1 w-24 bg-customBlue mt-2"></div> {/* Línea decorativa simple */}
        </div>
    );
};

export default TitleSection;
