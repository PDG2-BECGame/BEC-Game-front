import VideoPlayer from "../../components/Videos/VideoPlayer"

export const WelcomeSection = () => {
    return (
        <div className="flex gap-8 px-20">
            <div className="flex flex-col items-center pt-20" >
                <h1 className="font-poppins text-4xl">
                    <b>¡Te damos la bienvenida!</b>
                </h1>
                <p className="font-poppins pt-4">
                    BEPRO es una plataforma interactiva diseñado para capacitar a empleados en la detección
                    de técnicas de ingeniería social y reducir ataques de compromiso de correo electrónico empresarial (BEC). 
                    Descubre más sobre cómo BEPRO puede transformar la seguridad en una empresa en el siguiente video.
                </p>
            </div>
            <div className="flex items-center pt-14">
                <VideoPlayer videoId="vwVALKT0Bwc" /> {/* ID del video de YouTube ajustado */}
            </div>
        </div>
    )
}