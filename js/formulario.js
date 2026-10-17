// Módulo: formulario de contacto con validación nativa HTML5 (Constraint Validation API)
// y validación en tiempo real mediante el evento input

const MENSAJES_REQUERIDO = Object.freeze({
  nombre: 'Ingresa tu nombre completo.',
  email: 'Ingresa tu correo electrónico.',
  motivo: 'Selecciona un motivo de contacto.',
  mensaje: 'Escribe tu mensaje.',
  privacidad: 'Debes aceptar el tratamiento de tus datos.'
});

const MENSAJES_FORMATO = Object.freeze({
  email: 'Ingresa un correo electrónico válido (ej. nombre@dominio.com).',
  telefono: 'Ingresa un teléfono válido (8 a 15 dígitos, puede incluir + y guiones).'
});

function obtenerMensajeNativo(campo) {
  const { validity } = campo;
  if (validity.valid) return '';
  if (validity.valueMissing) return MENSAJES_REQUERIDO[campo.name] ?? 'Este campo es obligatorio.';
  if (validity.typeMismatch || validity.patternMismatch) {
    return MENSAJES_FORMATO[campo.name] ?? 'El formato ingresado no es válido.';
  }
  if (validity.tooShort) return `Debe tener al menos ${campo.minLength} caracteres.`;
  return campo.validationMessage;
}

// Complementa la validación nativa: los espacios en blanco no cuentan como contenido
function obtenerMensajeAdicional(campo) {
  const esTexto = ['text', 'textarea'].includes(campo.type);
  if (!esTexto) return '';
  const contenido = campo.value.trim();
  if (campo.required && contenido === '') return MENSAJES_REQUERIDO[campo.name];
  if (contenido !== '' && campo.minLength > 0 && contenido.length < campo.minLength) {
    return `Debe tener al menos ${campo.minLength} caracteres.`;
  }
  return '';
}

function mostrarError(campo, mensaje) {
  const contenedor = document.getElementById(`${campo.id}_error`);
  if (contenedor) contenedor.textContent = mensaje;
  campo.setAttribute('aria-invalid', String(mensaje !== ''));
}

function evaluarCampo(campo) {
  campo.setCustomValidity('');
  const mensaje = obtenerMensajeNativo(campo) || obtenerMensajeAdicional(campo);
  if (mensaje) campo.setCustomValidity(mensaje);
  mostrarError(campo, mensaje);
  return mensaje === '';
}

export function inicializarFormulario() {
  const formulario = document.getElementById('formulario_contacto');
  const estado = document.getElementById('mensaje_estado');
  if (!formulario || !estado) return;

  const campos = [...formulario.elements].filter((elemento) => elemento.name && elemento.willValidate);

  const mostrarEstado = (texto, claseEstado) => {
    estado.textContent = texto;
    estado.className = `mensaje_estado ${claseEstado}`.trim();
  };

  // Validación en tiempo real
  campos.forEach((campo) => {
    campo.addEventListener('input', () => evaluarCampo(campo));
    campo.addEventListener('change', () => evaluarCampo(campo));
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const resultados = campos.map(evaluarCampo);
    if (resultados.includes(false)) {
      const primerInvalido = campos.find((campo) => !campo.validity.valid);
      mostrarEstado('Revisa los campos marcados antes de enviar el formulario.', 'mensaje_fallo');
      primerInvalido?.focus();
      return;
    }

    const nombre = formulario.elements.nombre.value.trim();
    formulario.reset();
    mostrarEstado(`Mensaje validado correctamente. ¡Gracias por escribir, ${nombre}!`, 'mensaje_exito');
  });

  formulario.addEventListener('reset', () => {
    campos.forEach((campo) => {
      campo.setCustomValidity('');
      mostrarError(campo, '');
      campo.removeAttribute('aria-invalid');
    });
    mostrarEstado('', '');
  });
}
