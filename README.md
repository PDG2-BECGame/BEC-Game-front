# BEC Game — Frontend

Cliente web de **BEC Game** (BePRO): aplicación educativa gamificada con rutas de aprendizaje por niveles, cuestionarios, vídeos de formación, clasificación y perfil de usuario. El front está construido con **React 18**, **TypeScript**, **Vite** y **Firebase** (autenticación y Firestore).

---

## Tabla de contenidos

1. [Características principales](#características-principales)
2. [Stack tecnológico](#stack-tecnológico)
3. [Requisitos previos](#requisitos-previos)
4. [Instalación y ejecución](#instalación-y-ejecución)
5. [Variables de entorno](#variables-de-entorno)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Pruebas unitarias y de componentes (Jest)](#pruebas-unitarias-y-de-componentes-jest)
8. [Calidad de código](#calidad-de-código)
9. [Despliegue](#despliegue)

---

## Características principales

- **Autenticación**: registro, inicio de sesión y verificación de correo (Firebase Auth).
- **Rutas protegidas**: `PrivateRoute` para contenido que requiere usuario autenticado.
- **Home y roadmap**: niveles de progresión con puntuaciones enlazadas al contexto de usuario.
- **Quiz por nivel**: preguntas con soporte de texto e imagen (`QuestionCard`, opciones, feedback).
- **Formación en vídeo**: reproductor integrado (YouTube) por nivel.
- **Clasificación y perfil**: vistas dedicadas dentro del layout común.
- **Navegación SPA**: React Router v6 con layout lateral (`Sidebar` / `Layout`) y `ScrollToTop`.

---

## Stack tecnológico

| Área | Tecnología |
|------|------------|
| Runtime / UI | React 18 |
| Lenguaje | TypeScript 5.6 |
| Bundler / dev server | Vite 5 |
| Estilos | Tailwind CSS 3, PostCSS |
| Enrutamiento | react-router-dom 6 |
| Backend BaaS | Firebase (Auth, Firestore) |
| HTTP | Axios |
| Métricas | web-vitals |
| **Pruebas** | **Jest 29**, **jest-environment-jsdom**, **@testing-library/react**, **@testing-library/jest-dom**, **@testing-library/user-event** |
| Lint | ESLint 9 (flat config) |

---

## Requisitos previos

- **Node.js** (LTS recomendado, p. ej. 20.x) y **npm**.
- Proyecto Firebase con app web configurada (para variables `VITE_*`).

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (HMR)
npm run dev

# Compilación de producción (tsc + vite build)
npm run build

# Vista previa del build
npm run preview
```

La aplicación asume rutas del lado cliente; en despliegue estático suele usarse una regla de fallback al `index.html` (p. ej. en Vercel, ver [Despliegue](#despliegue)).

---

## Variables de entorno

Crear un archivo `.env` (o `.env.local`) en la raíz con el prefijo `VITE_` para que Vite las exponga al cliente:

| Variable | Uso |
|----------|-----|
| `VITE_FIREBASE_API_KEY` | API key de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de Auth |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de Storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |

**Nota de seguridad**: las variables `VITE_*` se incluyen en el bundle del navegador. No almacenar secretos que deban permanecer solo en servidor; las reglas de Firestore y Auth deben proteger los datos.

---

## Estructura del proyecto

```
BEC-Game-front/
├── public/                 # Estáticos públicos
├── src/
│   ├── assets/             # SVG e imágenes
│   ├── components/         # UI reutilizable (Quiz, Home, Sidebar, VideoTraining, …)
│   │   └── tests/          # Pruebas Jest colocalizadas por dominio
│   ├── consts/             # Datos y constantes (niveles, preguntas, etc.)
│   ├── context/            # AuthContext, UserContext
│   ├── firebase/           # Inicialización Firebase y helpers
│   ├── hooks/              # useLogin, useRegister, useFetch*, …
│   ├── pages/              # Pantallas por ruta
│   ├── routes/             # PrivateRoute
│   ├── App.tsx             # Definición de rutas
│   └── main.tsx
├── jest.config.cjs         # Configuración de Jest
├── jest.setup.js           # setupFilesAfterEnv (jest-dom)
├── fileMock.cjs            # Mock de imports de imágenes en tests
├── vite.config.ts
└── vercel.json             # Rewrites SPA (opcional según hosting)
```

---

## Pruebas unitarias y de componentes (Jest)

> **Nota terminológica**: En backends **Java** es habitual usar **JUnit** para pruebas unitarias. En este repositorio (frontend **TypeScript/React**) el equivalente práctico son las pruebas ejecutadas con **Jest** y **React Testing Library**: validan unidades de comportamiento (componentes, props, eventos, accesibilidad básica) y fragmentos de UI de forma automatizada y repetible.

### Por qué importan estas pruebas

- **Regresión**: cambios en `QuestionCard`, `Sidebar`, `Level`, etc. se detectan al romper contratos de UI o de rutas.
- **Documentación viva**: los tests describen el comportamiento esperado (p. ej. texto de pregunta, `href` de enlaces, mocks de `useNavigate`).
- **Refactors seguros**: al ajustar estilos o estructura del DOM, los matchers de Testing Library (`getByRole`, `getByText`, `toBeInTheDocument`) mantienen el foco en lo que percibe el usuario.

### Herramientas

| Herramienta | Rol |
|-------------|-----|
| **Jest** | Runner, matchers, mocks (`jest.mock`), entorno `jsdom` |
| **ts-jest / babel-jest** | El proyecto transpila TS/JSX con **Babel** en Jest (`jest.config.cjs`) |
| **@testing-library/react** | `render`, `screen`, `fireEvent`, consultas al DOM |
| **@testing-library/jest-dom** | Matchers extra (`toBeInTheDocument`, `toHaveAttribute`, …) cargados en `jest.setup.js` |
| **@testing-library/user-event** | Simulación de interacción de usuario (donde se use) |
| **react-router-dom** | `MemoryRouter` / `BrowserRouter` en tests que dependen de rutas o `useNavigate` |

### Configuración relevante

- **`jest.config.cjs`**: `testEnvironment: 'jsdom'`, `setupFilesAfterEnv: ['<rootDir>/jest.setup.js']`, `moduleNameMapper` para **SVG/imágenes** → `fileMock.cjs` y **CSS** → `identity-obj-proxy` (evita fallos al importar assets en tests).
- **`jest.setup.js`**: importa `@testing-library/jest-dom` una vez para todos los archivos de test.
- **`.babelrc`**: presets `env`, `react` (runtime automático), `typescript` para alinear JSX/TS con lo que espera `babel-jest`.

### Ubicación y convenciones

- Los archivos viven en **`src/components/tests/`** con sufijo **`.test.tsx`**.
- Los tests que necesitan router envuelven el componente en **`MemoryRouter`** o **`BrowserRouter`** según el caso.
- Cuando un componente usa **`useNavigate`** u otros hooks del router, se aplica **`jest.mock('react-router-dom', …)`** parcialmente (véase `Level.test.tsx`) para aislar la navegación.
- Los componentes que consumen **contexto** (`UserContext`) se prueban con **`Provider`** y valores de prueba explícitos.

### Cobertura funcional actual (por archivo)

| Archivo de test | Componente / área |
|-----------------|-------------------|
| `QuestionCard.test.tsx` | Texto de pregunta, imagen opcional, caso sin texto |
| `Option.test.tsx` | Opciones del quiz |
| `Feedback.test.tsx` | Mensajes de feedback |
| `Footer.test.tsx` | Pie del quiz |
| `WelcomeSection.test.tsx` | Sección de bienvenida |
| `Level.test.tsx` | Nivel del roadmap, contexto de usuario, navegación |
| `Sidebar.test.tsx` | Enlaces, rutas (`href`), logo |
| `VideoPlayer.test.tsx` | Props de vídeo (id, dimensiones) |
| `ScrollToTop.test.tsx` | Comportamiento de scroll en cambio de ruta |

### Comandos

```bash
# Ejecutar toda la suite
npm test

# Modo observador (re-ejecutar al guardar)
npm test -- --watch

# Un archivo concreto
npm test -- QuestionCard.test.tsx

# Cobertura (añadir en jest.config.cjs collectCoverage si se desea por defecto)
npm test -- --coverage
```

Para **CI**, el comando habitual es `npm test -- --ci --coverage` (ajustar según política del pipeline).

### Buenas prácticas recomendadas al añadir tests

1. Preferir consultas **accesibles** (`getByRole`, `getByLabelText`) cuando sea posible; `getByText` es aceptable para copy fijo.
2. No probar detalles de implementación interna; centrarse en **salida visible** y **efectos observables**.
3. Mantener **mocks mínimos**: solo externos (router, módulos pesados), no toda la app.
4. Nuevos componentes compartidos deberían incluir al menos un test de **renderizado básico** y un caso **límite** (props vacías, error, etc.).

---

## Calidad de código

```bash
npm run lint
```

ESLint está configurado con TypeScript ESLint y reglas para React Hooks y React Refresh.

---

## Despliegue

- **Build**: `npm run build` genera artefactos en `dist/`.
- **Vercel**: el repositorio incluye `vercel.json` con **rewrites** tipo SPA (`/(.*)` → `/`) para que el enrutamiento del cliente funcione al refrescar rutas profundas.

---

## Licencia y contribución

Proyecto privado (`"private": true` en `package.json`). Para contribuir, acordar flujo de ramas, revisión de PR y ejecución obligatoria de **`npm run lint`** y **`npm test`** antes de fusionar.
