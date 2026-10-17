// Módulo: menú hamburguesa responsivo (móvil y tablet) con atributos ARIA

const CONSULTA_ESCRITORIO = '(min-width: 1025px)';

export function inicializarMenu() {
  const boton = document.getElementById('boton_menu');
  const menu = document.getElementById('menu_principal');
  if (!boton || !menu) return;

  const estaAbierto = () => boton.getAttribute('aria-expanded') === 'true';

  const establecerEstado = (abierto) => {
    menu.classList.toggle('abierto', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  };

  boton.addEventListener('click', () => establecerEstado(!estaAbierto()));

  // Delegación de eventos: un único listener para todos los enlaces del menú
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      establecerEstado(false);
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && estaAbierto()) {
      establecerEstado(false);
      boton.focus();
    }
  });

  // Al llegar a escritorio el menú es visible siempre: se reinicia el estado
  window.matchMedia(CONSULTA_ESCRITORIO).addEventListener('change', (evento) => {
    if (evento.matches) {
      establecerEstado(false);
    }
  });
}
