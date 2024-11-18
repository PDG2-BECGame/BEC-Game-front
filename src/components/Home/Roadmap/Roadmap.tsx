import Level from "./Level";

export const Roadmap = () => {
    return (
        <div className="px-20 pt-20 h-screen flex flex-col">
            <h2 className="font-poppins text-3xl mb-8 text-left">
                <b>Niveles de aprendizaje</b>
            </h2>
            <div className="flex flex-col justify-center items-center flex-grow gap-6">
                {/* Los niveles estarán centrados y ocuparán el espacio disponible */}
                <Level titulo={"Nivel 1"}/>
                <Level titulo={"Nivel 2"}/>
                <Level titulo={"Nivel 3"}/>
            </div>
        </div>
    );
};
