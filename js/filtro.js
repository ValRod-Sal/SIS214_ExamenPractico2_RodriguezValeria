// Módulo: buscador en tiempo real del portafolio (filtrado inmutable con filter + map)
import { CATALOGO } from './datos.js';

const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const escaparHtml = (texto) =>
  texto.replace(/[&<>"']/g, (caracter) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[caracter]);

export const coincideCategoria = (item, categoria) =>
  categoria === 'todas' || item.categoria === categoria;

export const coincideTexto = (item, consulta) =>
  normalizar([item.titulo, item.descripcion, item.categoria, ...item.etiquetas].join(' ')).includes(consulta);

export const plantillaTarjeta = ({ titulo, categoria, descripcion, etiquetas }) => `
  <li class="tarjeta">
    <p class="tarjeta_categoria">${escaparHtml(categoria)}</p>
    <h3>${escaparHtml(titulo)}</h3>
    <p>${escaparHtml(descripcion)}</p>
    <ul class="etiquetas">${etiquetas.map((etiqueta) => `<li>${escaparHtml(etiqueta)}</li>`).join('')}</ul>
  </li>`;

// Tubería funcional: no modifica CATALOGO, siempre genera nuevas colecciones
export const construirTarjetas = (catalogo, termino, categoria) => {
  const consulta = normalizar(termino);
  return catalogo
    .filter((item) => coincideCategoria(item, categoria))
    .filter((item) => coincideTexto(item, consulta))
    .map(plantillaTarjeta);
};

export function inicializarBuscador() {
  const formulario = document.getElementById('formulario_busqueda');
  const campoBusqueda = document.getElementById('campo_busqueda');
  const campoCategoria = document.getElementById('campo_categoria');
  const lista = document.getElementById('catalogo_lista');
  const contador = document.getElementById('catalogo_contador');
  if (!formulario || !campoBusqueda || !campoCategoria || !lista || !contador) return;

  const actualizar = () => {
    const tarjetas = construirTarjetas(CATALOGO, campoBusqueda.value, campoCategoria.value);
    lista.innerHTML = tarjetas.join('');
    contador.textContent = tarjetas.length === 0
      ? 'No se encontraron resultados para tu búsqueda.'
      : `Mostrando ${tarjetas.length} de ${CATALOGO.length} elementos.`;
  };

  formulario.addEventListener('submit', (evento) => evento.preventDefault());
  campoBusqueda.addEventListener('input', actualizar);
  campoCategoria.addEventListener('change', actualizar);

  actualizar();
}
