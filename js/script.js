
function inicializar_tema() {
  const boton_tema = document.getElementById('theme_toggle');
  const tema_guardado = localStorage.getItem('tema_preferido');

  if (tema_guardado === 'claro') {
    document.body.classList.add('light_mode');
    boton_tema.textContent = ' Modo Oscuro';
    boton_tema.setAttribute('aria-pressed', 'true');
  }

  boton_tema.addEventListener('click', function () {
    const modo_claro_activo = document.body.classList.toggle('light_mode');

    if (modo_claro_activo) {
      boton_tema.textContent = ' Modo Oscuro';
      boton_tema.setAttribute('aria-pressed', 'true');
      localStorage.setItem('tema_preferido', 'claro');
    } else {
      boton_tema.textContent = ' Modo Claro';
      boton_tema.setAttribute('aria-pressed', 'false');
      localStorage.setItem('tema_preferido', 'oscuro');
    }
  });
}

function mostrar_error(campo_id, mensaje) {
  const contenedor_error = document.getElementById(campo_id + '_error');
  if (contenedor_error) {
    contenedor_error.textContent = mensaje;
  }
}

function limpiar_error(campo_id) {
  mostrar_error(campo_id, '');
}

function validar_nombre(valor) {
  if (valor.trim().length < 3) {
    mostrar_error('nombre', 'El nombre debe tener al menos 3 caracteres.');
    return false;
  }
  limpiar_error('nombre');
  return true;
}

function validar_email(valor) {
  const patron_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron_email.test(valor.trim())) {
    mostrar_error('email', 'Ingresa un correo electrónico válido.');
    return false;
  }
  limpiar_error('email');
  return true;
}

function validar_telefono(valor) {
  const patron_telefono = /^[+0-9\s-]{8,15}$/;
  if (valor.trim() !== '' && !patron_telefono.test(valor.trim())) {
    mostrar_error('telefono', 'Ingresa un teléfono válido (8 a 15 dígitos).');
    return false;
  }
  limpiar_error('telefono');
  return true;
}

function validar_motivo(valor) {
  if (valor === '') {
    mostrar_error('motivo', 'Selecciona un motivo de contacto.');
    return false;
  }
  limpiar_error('motivo');
  return true;
}

function validar_mensaje(valor) {
  if (valor.trim().length < 10) {
    mostrar_error('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
    return false;
  }
  limpiar_error('mensaje');
  return true;
}

function validar_privacidad(marcado) {
  if (!marcado) {
    mostrar_error('privacidad', 'Debes aceptar el tratamiento de tus datos.');
    return false;
  }
  limpiar_error('privacidad');
  return true;
}

function inicializar_validacion_formulario() {
  const formulario = document.getElementById('formulario_contacto');
  if (!formulario) return;

  const campo_nombre = document.getElementById('nombre');
  const campo_email = document.getElementById('email');
  const campo_telefono = document.getElementById('telefono');
  const campo_motivo = document.getElementById('motivo');
  const campo_mensaje = document.getElementById('mensaje');
  const campo_privacidad = document.getElementById('privacidad');
  const mensaje_estado = document.getElementById('mensaje_estado');

  campo_nombre.addEventListener('input', function () {
    validar_nombre(campo_nombre.value);
  });
  campo_email.addEventListener('input', function () {
    validar_email(campo_email.value);
  });
  campo_telefono.addEventListener('input', function () {
    validar_telefono(campo_telefono.value);
  });
  campo_motivo.addEventListener('change', function () {
    validar_motivo(campo_motivo.value);
  });
  campo_mensaje.addEventListener('input', function () {
    validar_mensaje(campo_mensaje.value);
  });
  campo_privacidad.addEventListener('change', function () {
    validar_privacidad(campo_privacidad.checked);
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre_valido = validar_nombre(campo_nombre.value);
    const email_valido = validar_email(campo_email.value);
    const telefono_valido = validar_telefono(campo_telefono.value);
    const motivo_valido = validar_motivo(campo_motivo.value);
    const mensaje_valido = validar_mensaje(campo_mensaje.value);
    const privacidad_valida = validar_privacidad(campo_privacidad.checked);

    const formulario_valido =
      nombre_valido &&
      email_valido &&
      telefono_valido &&
      motivo_valido &&
      mensaje_valido &&
      privacidad_valida;

    if (formulario_valido) {
      const nombre_enviado = campo_nombre.value.trim();
      formulario.reset();
      mensaje_estado.textContent = ' Mensaje validado correctamente. ¡Gracias por escribir, ' + nombre_enviado + '!';
      mensaje_estado.className = 'mensaje_estado mensaje_exito';
    } else {
      mensaje_estado.textContent = ' Revisa los campos marcados antes de enviar el formulario.';
      mensaje_estado.className = 'mensaje_estado mensaje_fallo';
    }
  });

  formulario.addEventListener('reset', function () {
    ['nombre', 'email', 'telefono', 'motivo', 'mensaje', 'privacidad'].forEach(limpiar_error);
    mensaje_estado.textContent = '';
    mensaje_estado.className = 'mensaje_estado';
  });
}

// ==========================================================
// Inicialización general
// ==========================================================
document.addEventListener('DOMContentLoaded', function () {
  inicializar_tema();
  inicializar_validacion_formulario();
});
