// ── DATOS DE LOS SERVICIOS ──
const servicios = [
  {
    clase: 'c1',
    icono: '📊',
    titulo: 'Consulta de Notas',
    descripcion: 'Revisa tus calificaciones y boletines por bimestre en tiempo real.',
    enlace: 'Ver notas →',
    url: '../html/notas.html'
  },
  {
    clase: 'c2',
    icono: '📅',
    titulo: 'Horario de Clases',
    descripcion: 'Descarga tu horario semanal actualizado con aulas y docentes.',
    enlace: 'Ver horario →',
    url: '#'
  },
  {
    clase: 'c3',
    icono: '📚',
    titulo: 'Material Educativo',
    descripcion: 'Accede a guías, separatas y recursos digitales de todos los cursos.',
    enlace: 'Ver materiales →',
    url: '#'
  },
  {
    clase: 'c4',
    icono: '✅',
    titulo: 'Asistencia',
    descripcion: 'Consulta tu récord de asistencia y justifica inasistencias en línea.',
    enlace: 'Ver asistencia →',
    url: '#'
  },
  {
    clase: 'c5',
    icono: '💳',
    titulo: 'Pagos en Línea',
    descripcion: 'Realiza el pago de pensiones y consulta tu estado de cuenta.',
    enlace: 'Ir a pagos →',
    url: '#'
  },
  {
    clase: 'c6',
    icono: '📝',
    titulo: 'Solicitud de Documentos',
    descripcion: 'Pide certificados, constancias de estudios y fichas de matrícula.',
    enlace: 'Solicitar →',
    url: '#'
  },
  {
    clase: 'c7',
    icono: '💬',
    titulo: 'Mensajería',
    descripcion: 'Comunícate con tus docentes y tutores directamente desde el portal.',
    enlace: 'Abrir chat →',
    url: '#'
  },
  {
    clase: 'c8',
    icono: '🗓️',
    titulo: 'Calendario Escolar',
    descripcion: 'Consulta fechas de exámenes, eventos y días no laborables.',
    enlace: 'Ver calendario →',
    url: '#'
  }
];

// ── FUNCIÓN: CREAR UNA TARJETA ──
function crearTarjeta(servicio) {
  const card = document.createElement('div');
  card.className = `card ${servicio.clase}`;

  // Si tiene URL real, toda la tarjeta es clickeable
  if (servicio.url && servicio.url !== '#') {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      window.location.href = servicio.url;
    });
  }

  card.innerHTML = `
    <div class="card-icon">${servicio.icono}</div>
    <h3>${servicio.titulo}</h3>
    <p>${servicio.descripcion}</p>
    <span class="card-link">${servicio.enlace}</span>
  `;

  return card;
}

// ── FUNCIÓN: RENDERIZAR TODAS LAS TARJETAS ──
function renderizarServicios() {
  const grid = document.getElementById('grid-servicios');

  if (!grid) {
    console.error('No se encontró el elemento #grid-servicios en el HTML.');
    return;
  }

  servicios.forEach(function(servicio) {
    const tarjeta = crearTarjeta(servicio);
    grid.appendChild(tarjeta);
  });
}

// ── EJECUTAR AL CARGAR LA PÁGINA ──
document.addEventListener('DOMContentLoaded', renderizarServicios);