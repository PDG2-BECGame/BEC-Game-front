import React from "react";
import Level from "./Level";
import useLevels from "../../../hooks/useFetchLevels";

export const Roadmap = () => {
  const { levels, isLoading, error } = useLevels();

  return (
    <div className="px-20 pt-20 h-screen flex flex-col">
      <h2 className="font-poppins text-3xl mb-8 text-left">
        <b>Niveles de aprendizaje</b>
      </h2>
      <div className="flex flex-col flex-grow gap-6 pb-24">
        {isLoading ? (
          <div>Loading levels...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          levels.map((level) => (
            <Level
              key={level.id}
              id={level.id}
              nivel={level.nivel}
              titulo={level.titulo}
              descripcion={level.descripcion}
              logo={level.logo}
            />
          ))
        )}
      </div>
    </div>
  );
};
