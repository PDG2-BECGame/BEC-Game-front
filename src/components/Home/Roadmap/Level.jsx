import React from "react";

const Level = () => {
    return (
        <div className="flex flex-col items-start p-6 border-2 border-red-300 rounded-lg shadow-lg max-w-md w-full bg-white">
            <h3 className="text-xl font-bold text-gray-800">Nivel 1</h3>
            <p className="text-sm text-gray-500 mb-2">
                Conciencia Crítica: Reconociendo la Amenaza del BEC
            </p>
            <p className="text-gray-700 mb-4">
                El objetivo es enfatizar la importancia de reconocer y entender el 
                Business Email Compromise (BEC) como una amenaza significativa en 
                el entorno empresarial. Se busca que los usuarios comprendan las 
                implicaciones de estos fraudes y la necesidad de estar alerta ante 
                las tácticas que usan los estafadores.
            </p>
            <div className="flex justify-between items-center w-full">
                <p className="text-sm text-gray-500">Puntos: 0/500</p>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600">
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Level;
