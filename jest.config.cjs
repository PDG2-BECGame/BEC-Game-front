// jest.config.cjs
module.exports = {
  preset: 'ts-jest', // Mantén esto si estás usando ts-jest para TypeScript
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Configuración adicional para jest-dom
  moduleNameMapper: {
    // Mapear assets a mocks para evitar errores
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/fileMock.cjs',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock para estilos
  },
  transform: {
    // Procesar archivos TypeScript y JavaScript con Babel
    '^.+\\.(js|jsx|ts|tsx|cjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/', // Ignorar node_modules
  ],
};
