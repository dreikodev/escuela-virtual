// ── HORAS ──
const horas = [
  '7:30 - 8:15',
  '8:15 - 9:00',
  '9:00 - 9:45',
  '9:45 - 10:00',  // recreo
  '10:00 - 10:45',
  '10:45 - 11:30',
  '11:30 - 12:15',
  '12:15 - 13:00',
  '13:00 - 13:45',
];

// ── DÍAS ──
const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// ── CURSOS CON COLOR ──
const cursos = {
  'Matemática':          { color: 'color-mat',  abrev: 'MAT' },
  'Comunicación':        { color: 'color-com',  abrev: 'COM' },
  'Historia':            { color: 'color-his',  abrev: 'HIS' },
  'Ciencia y Tec.':      { color: 'color-cie',  abrev: 'CIE' },
  'Inglés':              { color: 'color-ing',  abrev: 'ING' },
  'Arte':                { color: 'color-art',  abrev: 'ART' },
  'Educación Física':    { color: 'color-ef',   abrev: 'EF'  },
  'DPCC':                { color: 'color-dpc',  abrev: 'DPC' },
  'RECREO':              { color: '',           abrev: ''    },
};

// ── HORARIO (filas = horas, columnas = días) ──
// null = libre
const horario = [
  // 7:30-8:15
  ['Matemática',       'Comunicación',   'Historia',        'Inglés',          'Ciencia y Tec.'  ],
  // 8:15-9:00
  ['Matemática',       'Comunicación',   'Historia',        'Inglés',          'Ciencia y Tec.'  ],
  // 9:00-9:45
  ['Comunicación',     'Matemática',     'Inglés',          'Ciencia y Tec.',  'Historia'        ],
  // 9:45-10:00 RECREO
  ['RECREO',           'RECREO',         'RECREO',          'RECREO',          'RECREO'          ],
  // 10:00-10:45
  ['Historia',         'Ciencia y Tec.', 'Matemática',      'Arte',            'DPCC'            ],
  // 10:45-11:30
  ['Historia',         'Ciencia y Tec.', 'Matemática',      'Arte',            'DPCC'            ],
  // 11:30-12:15
  ['Inglés',           'Arte',           'Educación Física', 'DPCC',           'Matemática'      ],
  // 12:15-13:00
  ['Arte',             'Educación Física','DPCC',            'Comunicación',   'Comunicación'    ],
  // 13:00-13:45
  ['Educación Física', 'DPCC',           'Arte',            'Comunicación',    'Educación Física'],
];

// ── DÍA FILTRADO ACTIVO ──
let diaActivo = 'todos';

// ── RENDERIZAR TABLA ──
function renderizarTabla() {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  horario.forEach(function(fila, i) {
    const tr = document.createElement('tr');
    const esRecreo = fila[0] === 'RECREO';

    // columna hora
    const tdHora = document.createElement('td');
    tdHora.textContent = horas[i];
    tr.appendChild(tdHora);

    // columnas por día
    dias.forEach(function(dia, j) {
      const td = document.createElement('td');

      // ocultar columna si hay filtro de día
      if (diaActivo !== 'todos' && dia !== diaActivo) {
        td.classList.add('col-oculta');
        td.style.display = 'none';
        tr.appendChild(td);
        return;
      }

      const curso = fila[j];

      if (esRecreo) {
        td.innerHTML = '<span class="celda-recreo">☕ Recreo</span>';
        td.colSpan = diaActivo === 'todos' ? 1 : 1;
      } else if (curso) {
        const info = cursos[curso] || { color: '', abrev: '' };
        td.innerHTML = `<span class="celda-curso ${info.color}">${curso}</span>`;
      } else {
        td.innerHTML = '<span style="opacity:.3; font-size:.8rem">—</span>';
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  // ocultar encabezados de días si hay filtro
  actualizarEncabezados();
}

// ── ACTUALIZAR ENCABEZADOS ──
function actualizarEncabezados() {
  const ths = document.querySelectorAll('.tabla-horario thead th');
  // th[0] = Hora, th[1..5] = días
  ths.forEach(function(th, i) {
    if (i === 0) return;
    const dia = dias[i - 1];
    if (diaActivo !== 'todos' && dia !== diaActivo) {
      th.style.display = 'none';
    } else {
      th.style.display = '';
    }
  });
}

// ── FILTRAR DÍA ──
function filtrarDia(dia, btn) {
  diaActivo = dia;

  document.querySelectorAll('.sel-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  renderizarTabla();
}

// ── RENDERIZAR LEYENDA ──
function renderizarLeyenda() {
  const leyenda = document.getElementById('leyenda');
  leyenda.innerHTML = '<span class="leyenda-titulo">Leyenda:</span>';

  const colores = {
    'color-mat': '#93c5fd',
    'color-com': '#6ee7b7',
    'color-his': '#fdba74',
    'color-cie': '#c4b5fd',
    'color-ing': '#f9a8d4',
    'color-art': '#fde68a',
    'color-ef':  '#86efac',
    'color-dpc': '#e9d5ff',
  };

  Object.entries(cursos).forEach(function([nombre, info]) {
    if (nombre === 'RECREO') return;
    const item = document.createElement('div');
    item.className = 'leyenda-item';
    item.innerHTML = `
      <span class="leyenda-dot" style="background:${colores[info.color]}"></span>
      <span>${nombre}</span>
    `;
    leyenda.appendChild(item);
  });
}

// ── IMPRIMIR ──
document.addEventListener('DOMContentLoaded', function() {
  renderizarTabla();
  renderizarLeyenda();

  document.querySelector('.btn-pdf').addEventListener('click', function() {
    window.print();
  });
});