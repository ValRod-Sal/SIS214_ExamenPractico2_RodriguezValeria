// Módulo: conmutador de tema claro/oscuro con persistencia en localStorage (JSON)

const CLAVE_PREFERENCIAS = 'cvPreferencias';
const TEMAS = Object.freeze({ CLARO: 'claro', OSCURO: 'oscuro' });
const ICONOS = Object.freeze({ [TEMAS.CLARO]: '🌙', [TEMAS.OSCURO]: '☀️' });

export function leerPreferencias() {
  try {
    const guardado = localStorage.getItem(CLAVE_PREFERENCIAS);
    return guardado ? JSON.parse(guardado) : {};
  } catch (error) {
    console.warn('No se pudieron leer las preferencias guardadas:', error);
    return {};
  }
}

export function guardarPreferencias(preferencias) {
  try {
    localStorage.setItem(CLAVE_PREFERENCIAS, JSON.stringify(preferencias));
  } catch (error) {
    console.warn('No se pudieron guardar las preferencias:', error);
  }
}

function aplicarTema(tema, boton) {
  const esOscuro = tema === TEMAS.OSCURO;
  document.documentElement.dataset.theme = tema;
  boton.setAttribute('aria-pressed', String(esOscuro));
  boton.querySelector('[aria-hidden="true"]').textContent = ICONOS[tema];
}

function obtenerTemaInicial() {
  const { tema } = leerPreferencias();
  if (Object.values(TEMAS).includes(tema)) {
    return tema;
  }
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefiereOscuro ? TEMAS.OSCURO : TEMAS.CLARO;
}

export function inicializarTema() {
  const boton = document.getElementById('boton_tema');
  if (!boton) return;

  aplicarTema(obtenerTemaInicial(), boton);

  boton.addEventListener('click', () => {
    const temaActual = document.documentElement.dataset.theme;
    const temaSiguiente = temaActual === TEMAS.OSCURO ? TEMAS.CLARO : TEMAS.OSCURO;
    aplicarTema(temaSiguiente, boton);
    guardarPreferencias({ ...leerPreferencias(), tema: temaSiguiente });
  });
}
