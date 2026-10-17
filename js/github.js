// Módulo asíncrono: consumo de la API REST pública de GitHub con Fetch API (async/await)

const USUARIO_GITHUB = 'ValRod-Sal';
const URL_REPOSITORIOS = `https://api.github.com/users/${USUARIO_GITHUB}/repos?sort=updated&per_page=6`;
const TIEMPO_MAXIMO_MS = 10000;

const MENSAJES_HTTP = Object.freeze({
  400: 'Solicitud incorrecta (400): la petición enviada a GitHub no es válida.',
  403: 'Acceso limitado (403): se alcanzó el límite de peticiones de la API de GitHub. Intenta más tarde.',
  404: 'No encontrado (404): el usuario de GitHub no existe.',
  500: 'Error del servidor (500): GitHub tuvo un problema interno. Intenta nuevamente.'
});

class ErrorHttp extends Error {
  constructor(estado) {
    super(`Respuesta HTTP ${estado}`);
    this.name = 'ErrorHttp';
    this.estado = estado;
  }
}

const escaparHtml = (texto) =>
  String(texto).replace(/[&<>"']/g, (caracter) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[caracter]);

export const describirError = (error) => {
  if (error instanceof ErrorHttp) {
    return MENSAJES_HTTP[error.estado] ?? `Error inesperado del servicio (HTTP ${error.estado}).`;
  }
  if (error.name === 'AbortError') {
    return 'La solicitud tardó demasiado en responder. Intenta nuevamente.';
  }
  if (error instanceof SyntaxError) {
    return 'GitHub devolvió una respuesta con formato inválido.';
  }
  return 'No se pudo conectar con GitHub. Revisa tu conexión a internet.';
};

export const plantillaRepositorio = (repositorio) => {
  const descripcion = repositorio.description ?? 'Sin descripción.';
  const lenguaje = repositorio.language ?? 'Sin lenguaje definido';
  const actualizado = new Date(repositorio.updated_at).toLocaleDateString('es-BO');
  return `
    <li class="tarjeta">
      <h3><a href="${escaparHtml(repositorio.html_url)}" target="_blank" rel="noopener noreferrer">${escaparHtml(repositorio.name)}</a></h3>
      <p>${escaparHtml(descripcion)}</p>
      <p class="repo_meta">${escaparHtml(lenguaje)} · ★ ${repositorio.stargazers_count} · Actualizado: ${actualizado}</p>
    </li>`;
};

export function inicializarGithub() {
  const seccion = document.getElementById('github');
  const estado = document.getElementById('github_estado');
  const lista = document.getElementById('repos_lista');
  const botonReintentar = document.getElementById('boton_reintentar');
  if (!seccion || !estado || !lista || !botonReintentar) return;

  // Estados de la petición: cargando | exito | error
  const establecerEstado = (nombre, mensaje) => {
    seccion.dataset.estado = nombre;
    seccion.setAttribute('aria-busy', String(nombre === 'cargando'));
    estado.textContent = mensaje;
    botonReintentar.hidden = nombre !== 'error';
  };

  const cargarRepositorios = async () => {
    establecerEstado('cargando', 'Cargando repositorios...');
    lista.innerHTML = '';

    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

    try {
      const respuesta = await fetch(URL_REPOSITORIOS, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controlador.signal
      });

      if (!respuesta.ok) {
        throw new ErrorHttp(respuesta.status);
      }

      const repositorios = await respuesta.json();
      lista.innerHTML = repositorios.map(plantillaRepositorio).join('');

      establecerEstado(
        'exito',
        repositorios.length === 0
          ? 'El usuario no tiene repositorios públicos todavía.'
          : `Se cargaron ${repositorios.length} repositorios públicos de ${USUARIO_GITHUB}.`
      );
    } catch (error) {
      console.error('Error al consultar la API de GitHub:', error);
      establecerEstado('error', describirError(error));
    } finally {
      clearTimeout(temporizador);
    }
  };

  botonReintentar.addEventListener('click', cargarRepositorios);
  cargarRepositorios();
}
