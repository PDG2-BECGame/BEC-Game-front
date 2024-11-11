import VideoPlayer from '../components/Videos/VideoPlayer'; // Ruta corregida según tu estructura de carpetas

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido a Home</h1>
      <p className="text-gray-600 mt-4">
        Esta es la página de inicio de tu aplicación.
      </p>
      <div className="mt-8">
        <VideoPlayer videoId="xnj9qymch8I" /> {/* ID del video de YouTube ajustado */}
      </div>
    </div>
  );
}

export default Home;