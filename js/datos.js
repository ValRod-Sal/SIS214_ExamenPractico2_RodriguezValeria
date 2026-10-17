// Datos originales del portafolio. Se congelan para garantizar su inmutabilidad.

const congelar = (item) => Object.freeze({ ...item, etiquetas: Object.freeze([...item.etiquetas]) });

export const CATALOGO = Object.freeze([
  {
    id: 'proy_wayfinder',
    categoria: 'Proyecto',
    titulo: 'WayFinder – Sistema de Recomendación de Viajes',
    descripcion: 'Aplicación de escritorio que recomienda destinos y rutas según los gustos, presupuesto y preferencias del usuario. Presentada en el Workshop UCB.',
    etiquetas: ['Java', 'JavaFX', 'Estructuras de Datos']
  },
  {
    id: 'proy_mercado_popular',
    categoria: 'Proyecto',
    titulo: 'Mercado Popular – Sistema de Gestión e Inventario',
    descripcion: 'Sistema de base de datos para administrar mercados populares: ingreso de mercancía, registro de productos y gestión de vendedores. Presentado en el Workshop UCB.',
    etiquetas: ['MySQL', 'SQL', 'Modelo Entidad-Relación', 'Java']
  },
  {
    id: 'proy_cv_interactivo',
    categoria: 'Proyecto',
    titulo: 'CV Interactivo y Portafolio Profesional',
    descripcion: 'Landing page personal con tema claro/oscuro, menú responsivo, buscador, formulario validado y consumo de la API de GitHub.',
    etiquetas: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages']
  },
  {
    id: 'hab_java',
    categoria: 'Habilidad',
    titulo: 'Java',
    descripcion: 'Nivel autoevaluado: 80%. Programación orientada a objetos y backend.',
    etiquetas: ['Programación', 'POO']
  },
  {
    id: 'hab_cpp',
    categoria: 'Habilidad',
    titulo: 'C++',
    descripcion: 'Nivel autoevaluado: 75%. Lógica algorítmica y estructuras de datos.',
    etiquetas: ['Programación', 'Estructuras de Datos']
  },
  {
    id: 'hab_html5',
    categoria: 'Habilidad',
    titulo: 'HTML5 Semántico',
    descripcion: 'Nivel autoevaluado: 70%. Maquetación web semántica y accesible.',
    etiquetas: ['Web', 'Accesibilidad']
  },
  {
    id: 'hab_mysql',
    categoria: 'Habilidad',
    titulo: 'MySQL / SQL',
    descripcion: 'Nivel autoevaluado: 70%. Modelado, consultas y administración de bases de datos.',
    etiquetas: ['Bases de Datos', 'Consultas']
  },
  {
    id: 'hab_javafx',
    categoria: 'Habilidad',
    titulo: 'JavaFX',
    descripcion: 'Nivel autoevaluado: 65%. Interfaces gráficas de escritorio.',
    etiquetas: ['Java', 'Interfaces']
  },
  {
    id: 'cert_google_ia',
    categoria: 'Certificación',
    titulo: 'Seminario de Inteligencia Artificial (Google IA)',
    descripcion: 'Asistente. Evento tecnológico organizado por Google, enero 2025.',
    etiquetas: ['Inteligencia Artificial', 'Seminario']
  },
  {
    id: 'cert_cpp',
    categoria: 'Certificación',
    titulo: 'Programación en C++ y Estructuras de Datos',
    descripcion: 'Curso completo, modalidad autodidacta, 2024.',
    etiquetas: ['C++', 'Curso']
  },
  {
    id: 'cert_poo_java',
    categoria: 'Certificación',
    titulo: 'Fundamentos de Programación Orientada a Objetos en Java',
    descripcion: 'Curso en modalidad autodidacta, 2024.',
    etiquetas: ['Java', 'Curso']
  },
  {
    id: 'cert_html_css',
    categoria: 'Certificación',
    titulo: 'Maquetación Web Semántica con HTML5 y CSS3',
    descripcion: 'Curso en modalidad autodidacta, 2025.',
    etiquetas: ['HTML5', 'CSS3', 'Curso']
  },
  {
    id: 'cert_mysql',
    categoria: 'Certificación',
    titulo: 'Administración y Consultas Básicas en MySQL',
    descripcion: 'Curso en modalidad autodidacta, 2025.',
    etiquetas: ['MySQL', 'Curso']
  },
  {
    id: 'cert_workshop',
    categoria: 'Certificación',
    titulo: 'Presentación de Proyectos WayFinder y Mercado Popular',
    descripcion: 'Workshop Universitario UCB, noviembre 2025 (en proceso de certificación).',
    etiquetas: ['Workshop', 'UCB']
  }
].map(congelar));
