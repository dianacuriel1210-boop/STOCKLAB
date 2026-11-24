# StockLab

Panel de administración de inventario desarrollado con HTML, JavaScript, Bootstrap 5.3, Sass y Vite.

## Descripción

StockLab es una interfaz web para administrar productos de inventario. Permite visualizar indicadores, consultar productos, buscar registros, agregar productos y cambiar entre tema claro y oscuro.

## Tecnologías

- HTML5
- JavaScript
- Bootstrap 5.3
- Sass / SCSS
- Vite
- Stylelint

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/dianacuriel1210-boop/STOCKLAB.git
cd STOCKLAB
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Compilar para producción:

```bash
npm run build
```

Visualizar la versión de producción:

```bash
npm run preview
```

Comprobar los estilos:

```bash
npm run lint:css
```

## Enlaces

- **Repositorio:** https://github.com/dianacuriel1210-boop/STOCKLAB
- **Página desplegada:** Pendiente de publicación.

## Estructura del proyecto

```text
stocklab/
├── docs/
├── src/
│   ├── js/
│   ├── scss/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   └── vendor/
│   └── main.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Comparación de CSS - Reto 2

| Archivo | Tamaño |
|---|---:|
| CSS de StockLab | 186.03 kB |
| CSS de StockLab comprimido (gzip) | 26.09 kB |
| Bootstrap completo | Pendiente de medición |
| Ahorro de CSS | Pendiente de cálculo |

La comparación final se realizará utilizando el mismo criterio de medición para ambas versiones.


## Reflexiones

### 1. ¿Por qué las variables de Bootstrap deben sobrescribirse antes de importar variables.scss? ¿Qué papel cumple !default?

Bootstrap utiliza !default para asignar valores predeterminados cuando una variable todavía no tiene valor. Por eso se sobrescriben antes de importar sus variables, permitiendo personalizar los colores y estilos del framework.

### 2. ¿Qué diferencia hay entre @use y @import?

@use carga módulos con un espacio de nombres y evita conflictos entre variables. Cada módulo se carga una sola vez por compilación. @import comparte contenido en el ámbito global y puede generar duplicaciones y conflictos.

### 3. Da un ejemplo de una variable CSS indispensable y otro donde Sass fue la mejor opción.

Las variables CSS de Bootstrap, como --bs-body-bg, permiten cambiar los colores al activar el tema claro u oscuro. En Sass, el mapa $brand centraliza los colores para reutilizarlos durante la compilación.

### 4. ¿Qué problema de mantenimiento resuelve @extend %pill y qué riesgo tiene usar @extend con clases normales?

@extend %pill permite compartir estilos entre etiquetas de estado sin repetir propiedades. Usar @extend con clases normales puede agrupar selectores inesperadamente y generar CSS difícil de mantener.

### 5. Según tu tabla del Reto 2, ¿cuánto CSS ahorraste? ¿Qué riesgo introduce quitar componentes de Bootstrap en un equipo grande?

El ahorro se calcula restando el tamaño del CSS final de StockLab al de Bootstrap completo. Quitar componentes reduce el tamaño, pero puede dejar fuera estilos o funcionalidades que otros integrantes del equipo necesitan.
