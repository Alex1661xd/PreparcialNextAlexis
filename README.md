# PreparcialNextAlexis

Proyecto Next.js con TypeScript y Tailwind CSS.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.17 o superior)
- **npm** o **yarn** o **pnpm**

Para verificar las versiones instaladas:

```bash
node --version
npm --version
```

## 🚀 Instalación

1. **Clonar el repositorio** (si es aplicable):
```bash
git clone <url-del-repositorio>
cd preparcial-next
```

2. **Instalar las dependencias**:
```bash
npm install
```

O si prefieres usar yarn:
```bash
yarn install
```

O con pnpm:
```bash
pnpm install
```

## 🛠️ Comandos Disponibles

### Desarrollo
Ejecuta el servidor de desarrollo:
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Construcción
Crea una versión optimizada para producción:
```bash
npm run build
```

### Producción
Inicia el servidor de producción (requiere ejecutar `build` primero):
```bash
npm run start
```

### Linting
Ejecuta el linter para verificar errores de código:
```bash
npm run lint
```

## 🆕 Crear un Proyecto Next.js desde Cero

Si quieres crear un nuevo proyecto Next.js desde cero, sigue estos pasos:

### Opción 1: Usando create-next-app (Recomendado)

```bash
# Crear un nuevo proyecto Next.js con TypeScript
npx create-next-app@latest mi-proyecto --typescript --tailwind --eslint --app

# O con opciones interactivas
npx create-next-app@latest mi-proyecto
```

Durante la instalación, se te preguntará:
- ¿Usar TypeScript? → **Sí**
- ¿Usar ESLint? → **Sí**
- ¿Usar Tailwind CSS? → **Sí**
- ¿Usar `src/` directory? → Opcional
- ¿Usar App Router? → **Sí** (recomendado)
- ¿Personalizar el import alias por defecto? → Opcional

### Opción 2: Instalación Manual

1. **Crear el directorio del proyecto**:
```bash
mkdir mi-proyecto
cd mi-proyecto
```

2. **Inicializar npm**:
```bash
npm init -y
```

3. **Instalar Next.js, React y React DOM**:
```bash
npm install next@latest react@latest react-dom@latest
```

4. **Instalar TypeScript y tipos**:
```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

5. **Instalar Tailwind CSS** (opcional):
```bash
npm install --save-dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

6. **Agregar scripts al package.json**:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

7. **Crear la estructura de carpetas**:
```bash
mkdir app
mkdir components
mkdir lib
mkdir public
```

8. **Crear archivos básicos**:
   - `app/layout.tsx` - Layout principal
   - `app/page.tsx` - Página de inicio
   - `tsconfig.json` - Configuración de TypeScript
   - `next.config.js` - Configuración de Next.js

## 📁 Estructura del Proyecto

```
preparcial-next/
├── app/                    # Directorio de la aplicación (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── globals.css        # Estilos globales
│   ├── login/             # Ruta de login
│   └── feed/              # Ruta de feed
├── components/            # Componentes React
│   ├── CreatePost.tsx
│   └── PostList.tsx
├── lib/                   # Utilidades y helpers
│   ├── api.ts
│   └── auth.ts
├── public/                # Archivos estáticos
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
└── next.config.ts         # Configuración de Next.js
```

## 🎨 Tecnologías Utilizadas

- **Next.js** 16.0.1 - Framework de React
- **React** 19.2.0 - Biblioteca de UI
- **TypeScript** 5 - Superset tipado de JavaScript
- **Tailwind CSS** 4 - Framework de CSS utility-first
- **ESLint** - Linter para JavaScript/TypeScript

## 📝 Notas Adicionales

- Este proyecto usa el **App Router** de Next.js (carpeta `app/`)
- Las rutas se crean automáticamente basándose en la estructura de carpetas en `app/`
- Los componentes se encuentran en la carpeta `components/`
- Los archivos estáticos (imágenes, fuentes, etc.) van en la carpeta `public/`

## 🔗 Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
