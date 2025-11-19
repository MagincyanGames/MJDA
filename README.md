# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## MJDA - Premios de Videojuegos (Proyecto)

Esta es una versión inicial que añade:
 - Una página de inicio moderna con tema oscuro azul.

Archivos JSON:

 - Añadida página de detalle para cada juego: `/games/:id` muestra nombre, cover (carrusel o imágenes), icono, tags y premios donde está nominado.
 
Imagenes locales y externas:
- Puedes apuntar covers o icons a URLs externas usando `http://...` o `https://...`.
- También puedes referenciar imágenes que estén en la carpeta `public/` usando `./`: por ejemplo, `./images/neon.svg` se resuelve a `/images/neon.svg` y se sirve desde `public/images/neon.svg`.
Nota: "MJDA" significa "Melhores Jogos Do Ano" — el nombre original del proyecto en portugués. En la aplicación se muestra tanto la sigla como el nombre completo para mayor claridad.

Cómo ejecutar:
```pwsh
npm install
npm run dev
```

Dev server URL: http://localhost:3000/ (configurado en `vite.config.ts`)

La información se guarda en JSON de forma provisional. Si deseas gestionar datos con un backend o permitir modificaciones en producción, se puede añadir un API que edite estos JSON o migrarlos a una base de datos más robusta.

## Mobile compatibility

Se añadieron mejoras de estilo y un menú responsivo para dispositivos móviles:

- Ajustes globales de `box-sizing` y `overflow-x` para evitar scroll horizontal en pantallas pequeñas.
- Menú de navegación móvil con botón hamburguesa (`NavBar`) y cierre automático al navegar.
- Ajustes en `GameCard`, `GameTile` y `Games` para eliminar `min-width` que provocaban overflow y para usar `max-width` o `width: 100%`.
- Cambios en `GameDetail` y `Home` para reducir tamaños y adaptarse mejor a pantallas pequeñas.

Pruebas recomendadas:

1. Ejecuta el servidor de desarrollo y abre el proyecto en el teléfono o en una ventana de navegador con ancho reducido:

```pwsh
npm install
npm run host
```

2. Accede desde un móvil en la misma LAN (usa `--host` para exponer el servidor) y prueba:
  - Abrir la página principal y navegar hacia una lista de juegos y detalle de juego.
  - Verificar que el menú se despliega con el botón hamburguesa y que la navegación cierra el menú.
  - Comprobar que no existe scroll horizontal inesperado y que las cartas/tiles escalan correctamente.

Si encuentras problemas con un componente específico, indícamelo y puedo afinar los estilos para ese caso concreto.

