// ── DNI DEL ALUMNO DEMO ──
const DNI_VALIDO = '12345678';

// ── DATOS DEL ALUMNO ──
const alumno = {
  nombre: 'Rick Pepino García',
  dni: DNI_VALIDO,
  grado: '5° Secundaria · Sección B',
  año: '2025',
  foto: 'rick pepino.png',
  promedioGeneral: '15.4'
};

// ── NOTAS POR BIMESTRE ──
// Cada bimestre tiene: participacion, trabajos, examen
const notas = [
  // Bimestre I
  [
    { curso: 'Matemática',         participacion: 14, trabajos: 16, examen: 13 },
    { curso: 'Comunicación',       participacion: 17, trabajos: 18, examen: 16 },
    { curso: 'Historia',           participacion: 15, trabajos: 14, examen: 12 },
    { curso: 'Ciencia y Tecnología',participacion: 16, trabajos: 15, examen: 17 },
    { curso: 'Inglés',             participacion: 18, trabajos: 17, examen: 19 },
    { curso: 'Arte',               participacion: 19, trabajos: 20, examen: 18 },
    { curso: 'Educación Física',   participacion: 16, trabajos: 15, examen: 14 },
    { curso: 'DPCC',               participacion: 13, trabajos: 12, examen: 11 },
  ],
  // Bimestre II
  [
    { curso: 'Matemática',         participacion: 15, trabajos: 14, examen: 16 },
    { curso: 'Comunicación',       participacion: 16, trabajos: 17, examen: 15 },
    { curso: 'Historia',           participacion: 14, trabajos: 13, examen: 10 },
    { curso: 'Ciencia y Tecnología',participacion: 17, trabajos: 18, examen: 16 },
    { curso: 'Inglés',             participacion: 19, trabajos: 18, examen: 20 },
    { curso: 'Arte',               participacion: 20, trabajos: 19, examen: 18 },
    { curso: 'Educación Física',   participacion: 15, trabajos: 16, examen: 14 },
    { curso: 'DPCC',               participacion: 12, trabajos: 11, examen: 10 },
  ],
  // Bimestre III
  [
    { curso: 'Matemática',         participacion: 13, trabajos: 15, examen: 14 },
    { curso: 'Comunicación',       participacion: 18, trabajos: 17, examen: 16 },
    { curso: 'Historia',           participacion: 15, trabajos: 16, examen: 14 },
    { curso: 'Ciencia y Tecnología',participacion: 16, trabajos: 17, examen: 15 },
    { curso: 'Inglés',             participacion: 17, trabajos: 19, examen: 18 },
    { curso: 'Arte',               participacion: 19, trabajos: 20, examen: 20 },
    { curso: 'Educación Física',   participacion: 17, trabajos: 16, examen: 15 },
    { curso: 'DPCC',               participacion: 14, trabajos: 13, examen: 12 },
  ],
  // Bimestre IV
  [
    { curso: 'Matemática',         participacion: 16, trabajos: 17, examen: 15 },
    { curso: 'Comunicación',       participacion: 19, trabajos: 18, examen: 17 },
    { curso: 'Historia',           participacion: 16, trabajos: 15, examen: 14 },
    { curso: 'Ciencia y Tecnología',participacion: 18, trabajos: 17, examen: 19 },
    { curso: 'Inglés',             participacion: 20, trabajos: 20, examen: 19 },
    { curso: 'Arte',               participacion: 20, trabajos: 19, examen: 20 },
    { curso: 'Educación Física',   participacion: 18, trabajos: 17, examen: 16 },
    { curso: 'DPCC',               participacion: 15, trabajos: 14, examen: 13 },
  ]
];

// ── BIMESTRE ACTIVO ──
let bimestreActual = 0;

// ── VERIFICAR DNI ──
function verificarDNI() {
  const input = document.getElementById('dni-input');
  const error = document.getElementById('modal-error');
  const dni   = input.value.trim();

  if (dni.length !== 8 || isNaN(dni)) {
    error.classList.add('visible');
    input.style.borderColor = '#f87171';
    return;
  }

  error.classList.remove('visible');

  // Ocultar modal y mostrar página
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('pagina-notas').classList.remove('hidden');

  // Mostrar DNI en el badge
  document.getElementById('dni-mostrado').textContent = dni;

  // Renderizar notas del bimestre I
  renderizarTabla(0);
  renderizarResumen(0);
}

// ── CALCULAR PROMEDIO ──
function calcularPromedio(fila) {
  return ((fila.participacion + fila.trabajos + fila.examen) / 3).toFixed(1);
}

// ── RENDERIZAR TABLA ──
function renderizarTabla(bimestre) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  notas[bimestre].forEach(function(fila) {
    const prom = parseFloat(calcularPromedio(fila));
    const aprobado = prom >= 11;
    const estadoClase = aprobado ? 'aprobado' : 'desaprobado';
    const estadoTexto = aprobado ? '✔ Aprobado' : '✘ Desaprobado';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-curso">${fila.curso}</td>
      <td>${fila.participacion}</td>
      <td>${fila.trabajos}</td>
      <td>${fila.examen}</td>
      <td><strong>${prom}</strong></td>
      <td><span class="estado-badge ${estadoClase}">${estadoTexto}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── RENDERIZAR RESUMEN ──
function renderizarResumen(bimestre) {
  const grid = document.getElementById('resumen-grid');
  grid.innerHTML = '';

  const cursosB = notas[bimestre];
  const promedios = cursosB.map(f => parseFloat(calcularPromedio(f)));
  const aprobados   = promedios.filter(p => p >= 11).length;
  const desaprobados = promedios.filter(p => p < 11).length;
  const promBim = (promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(1);
  const mejor = Math.max(...promedios);
  const peor  = Math.min(...promedios);

  const items = [
    { icono: '📈', num: promBim,       label: 'Promedio del Bimestre' },
    { icono: '✅', num: aprobados,     label: 'Cursos Aprobados'      },
    { icono: '❌', num: desaprobados,  label: 'Cursos Desaprobados'   },
    { icono: '⭐', num: mejor,         label: 'Nota más Alta'         },
    { icono: '📉', num: peor,          label: 'Nota más Baja'         },
    { icono: '📚', num: cursosB.length,label: 'Total de Cursos'       },
  ];

  items.forEach(function(item) {
    const card = document.createElement('div');
    card.className = 'resumen-card';
    card.innerHTML = `
      <span class="r-icon">${item.icono}</span>
      <span class="r-num">${item.num}</span>
      <span class="r-label">${item.label}</span>
    `;
    grid.appendChild(card);
  });
}

// ── CAMBIAR BIMESTRE ──
function cambiarBimestre(index, btn) {
  bimestreActual = index;

  // Actualizar botón activo
  document.querySelectorAll('.sel-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Re-renderizar
  renderizarTabla(index);
  renderizarResumen(index);
}

// ── ENTER en el input del DNI ──
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('dni-input');
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') verificarDNI();
  });
});