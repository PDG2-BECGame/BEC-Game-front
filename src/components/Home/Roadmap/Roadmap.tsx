import React from 'react';
import Level from "./Level";
import { levels } from "../../../consts/values.d";

export const Roadmap = () => {
    return (
        <div className="px-20 pt-20 h-screen flex flex-col">
            <h2 className="font-poppins text-3xl mb-8 text-left">
                <b>Niveles de aprendizaje</b>
            </h2>
            <div className="flex flex-col flex-grow gap-6 pb-24">
                {levels.map(level => 
                    <Level key={level.id} 
                        nivel={level.nivel} 
                        titulo={level.titulo} 
                        puntaje={level.puntaje}
                        descripcion={level.descripcion}
                        logo={level.logo} // Pasamos la propiedad logo
                    />
                )}
            </div>
        </div>
    );
};
