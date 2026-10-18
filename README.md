# CV Interactivo y Portafolio Profesional

**Valeria Raisa Rodríguez Salgado** · Ingeniería de Sistemas · Universidad Católica Boliviana "San Pablo"

Landing page personal desarrollada para el **Examen Práctico 2** de *Tecnologías Web I (SIS-214)*, Unidad II: Desarrollo de Interfaces Dinámicas con JavaScript.

- **Sitio en producción:** https://valrod-sal.github.io/SIS214_ExamenPractico2_RodriguezValeria/
- **Repositorio:** https://github.com/ValRod-Sal/hoja-vida-Rodriguez-Valeria.git

## Tecnologías utilizadas

| Capa | Tecnología |
| --- | --- |
| Estructura | HTML5 semántico + WAI-ARIA |
| Estilos | CSS3 (custom properties, Flexbox, CSS Grid, Media Queries mobile-first) |
| Lógica | JavaScript ES6+ nativo con módulos (`import` / `export`), sin frameworks ni librerías |
| Datos externos | API REST pública de GitHub (`fetch` + `async/await`) |
| Versionado y despliegue | Git, GitHub y GitHub Pages |

## Arquitectura de la solución

```
SIS214_ExamenPractico2_RodriguezValeria/
├── index.html            # Marcado semántico del CV (un único documento)
├── README.md
├── css/
│   ├── style.css         # Tokens, reset universal, estilos base y media queries
│   └── sin_js.css        # Alternativa del menú cuando JavaScript está desactivado
├── js/
│   ├── main.js           # Punto de entrada: inicializa cada módulo
│   ├── tema.js           # Modo claro/oscuro + persistencia en localStorage
│   ├── menu.js           # Menú hamburguesa responsivo con aria-expanded
│   ├── datos.js          # Catálogo de proyectos, habilidades y certificaciones (congelado)
│   ├── filtro.js         # Buscador en tiempo real (filter + map)
│   ├── formulario.js     # Formulario de contacto y validación
│   └── github.js         # Consumo de la API REST de GitHub
└── assets/
    ├── images/           # foto.jpeg, WayFinder.jpg, MercadoPopular.jpg
    ├── Audio/            # presentacion.ogg
    └── Video/            # proyecto.mp4
```

Cada módulo JavaScript expone una función `inicializarX()` y `main.js` las invoca; así cada funcionalidad queda aislada, es fácil de probar y de mantener.

### Estructura HTML5

Se emplean `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` sin contenedores `div` genéricos. Hay un único `h1` y la jerarquía de encabezados es continua (`h1 → h2 → h3`). El documento fue validado con el **validador oficial Nu Html Checker** (mismo motor de W3C) sin errores ni advertencias.

### Diseño responsivo (mobile-first)

| Rango | Media query | Comportamiento |
| --- | --- | --- |
| Móvil (< 768 px) | Estilos base | Una columna, tablas apiladas, menú hamburguesa |
| Tablet (768 px – 1024 px) | `min-width: 768px` y `(min-width: 768px) and (max-width: 1024px)` | Grids de 2 columnas, tablas completas, menú desplegable en 2 columnas |
| Escritorio (> 1024 px) | `min-width: 1025px` | Menú en línea, grids de 3 columnas, certificaciones e idiomas en paralelo |

- **Flexbox:** cabecera, menú de escritorio, enlaces profesionales, etiquetas, acciones y campos del formulario.
- **CSS Grid:** maquetación general de `main`, presentación, habilidades, buscador y repositorios.
- **Tokens de diseño** en `:root` (`--primary-color`, `--secondary-color`, `--bg-color`, `--text-color`, `--font-family-base`, `--spacing-unit`) y regla de reset universal `* { box-sizing: border-box; margin: 0; padding: 0; }`. El tema oscuro redefine los tokens mediante `html[data-theme="oscuro"]`.

## Funcionalidades JavaScript

1. **Conmutador de tema (`tema.js`):** alterna `data-theme` en `<html>`, guarda la preferencia con `JSON.stringify()` en `localStorage` y la restaura con `JSON.parse()` al recargar. Si no hay preferencia guardada usa `prefers-color-scheme`. El botón expone `aria-pressed`.
2. **Menú hamburguesa (`menu.js`):** alterna la clase `abierto` con eventos `click`, muta `aria-expanded` y `aria-label`, cierra con `Escape` o al elegir un enlace (delegación de eventos) y se reinicia al pasar a escritorio.
3. **Buscador en tiempo real (`filtro.js`):** reacciona al evento `input` y procesa el catálogo con una tubería funcional `.filter().filter().map()`. Los datos originales se congelan con `Object.freeze()`, por lo que nunca se mutan. La búsqueda ignora mayúsculas y tildes y escapa el HTML generado.
4. **Formulario de contacto (`formulario.js`):** intercepta `submit` con `event.preventDefault()`, usa la Constraint Validation API de HTML5 (`required`, `type="email"`, `minlength`, `pattern`) y valida en tiempo real con `input`. Muestra mensajes de error por campo (`aria-invalid` + `aria-describedby`) y un mensaje de éxito.
5. **API REST de GitHub (`github.js`):** `fetch` con `async/await` dentro de `try...catch`, evaluación de `response.ok`, tiempo máximo de espera con `AbortController` y mensajes específicos para los códigos HTTP 400, 403, 404 y 500 (más un mensaje genérico para otros códigos y para errores de red). La interfaz refleja los tres estados: **cargando** (indicador animado), **éxito** (tarjetas de repositorios) y **error** (mensaje + botón *Reintentar*).

## Accesibilidad

- Enlace de salto al contenido principal y foco visible en todos los controles.
- Atributos `alt` en imágenes, `label` asociado a cada campo, `aria-label`, `aria-expanded`, `aria-pressed`, `aria-live` y `role="search"` / `role="status"` donde corresponde.
- Objetivos táctiles de al menos 44 px y respeto de `prefers-reduced-motion`.
- Si JavaScript está desactivado, `sin_js.css` mantiene visible el menú de navegación.

## Ejecución local

Los módulos ES6 requieren un servidor HTTP (abrir `index.html` con `file://` bloquea los `import`). Desde la raíz del proyecto:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve .
```

Luego abre http://localhost:8000. También funciona la extensión *Live Server* de VS Code.

## Convenciones del código

- Identificadores y clases de HTML/CSS en `snake_case`; variables y funciones de JavaScript en `camelCase`.
- Commits atómicos con prefijos convencionales: `feat`, `fix`, `style`, `refactor`, `docs`.

## Autora

Valeria Raisa Rodríguez Salgado — Estudiante de Ingeniería de Sistemas, UCB "San Pablo", La Paz, Bolivia.
