const HeaderSection = () => {
    return (
        <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl">
            <h1 className="text-xl font-bold">Nivel 1</h1>
            <button className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Ir al quiz
            </button>
        </div>
    );
};

export default HeaderSection;
