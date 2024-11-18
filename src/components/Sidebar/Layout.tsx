import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen"> {/* Agregado h-screen para ocupar toda la altura */}
      <Sidebar />
      <main className="flex-grow p-4 bg-white pl-64">
        {children} {/* Aquí se renderiza el contenido de cada página */}
      </main>
    </div>
  );
};

export default Layout;