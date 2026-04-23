/* ============================
   PedAntibióticos — App Logic
   ============================ */

const D = ANTIBIOTICS_DATA;

// ─── STATE ────────────────────────────────────────
const state = {
  view: 'spectrum',
  spectrumClassFilter: '',
  spectrumPathogenFilter: '',
  highlightedPathogen: null,
  dosingClass: '',
  dosingRoute: '',
  calcWeight: null,
  calcAgeYears: 0,
  calcAgeMonths: 0,
  calcDrug: null,
  calcIndicationIdx: 0,
};

// ─── NAVIGATION ───────────────────────────────────
function switchView(view) {
  state.view = view;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(`view-${view}`).classList.add('active');
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

// ─── SPECTRUM TABLE ───────────────────────────────
function buildSpectrumTable() {
  const table = document.getElementById('spectrumTable');
  const thead = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');

  // Populate class filter
  const classes = [...new Set(D.antibiotics.map(a => a.class))].sort();
  const classSelect = document.getElementById('filterClass');
  classes.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    classSelect.appendChild(opt);
  });

  // Populate pathogen filter
  const pathSelect = document.getElementById('filterPathogen');
  D.pathogens.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    pathSelect.appendChild(opt);
  });

  // Build header columns (pathogens)
  D.pathogens.forEach((p, i) => {
    const th = document.createElement('th');
    th.className = 'pathogen-header';
    th.textContent = p;
    th.dataset.pathogen = p;
    th.dataset.index = i;
    th.title = `Filtrar por ${p}`;
    th.addEventListener('click', () => togglePathogenHighlight(p));
    thead.appendChild(th);
  });

  renderSpectrumRows();

  // Filters
  classSelect.addEventListener('change', e => {
    state.spectrumClassFilter = e.target.value;
    renderSpectrumRows();
  });

  pathSelect.addEventListener('change', e => {
    state.spectrumPathogenFilter = e.target.value;
    renderSpectrumRows();
  });

  document.getElementById('resetFilters').addEventListener('click', () => {
    state.spectrumClassFilter = '';
    state.spectrumPathogenFilter = '';
    state.highlightedPathogen = null;
    classSelect.value = '';
    pathSelect.value = '';
    document.querySelectorAll('.pathogen-header').forEach(h => h.classList.remove('highlight'));
    renderSpectrumRows();
  });
}

function togglePathogenHighlight(p) {
  if (state.highlightedPathogen === p) {
    state.highlightedPathogen = null;
    document.querySelectorAll('.pathogen-header').forEach(h => h.classList.remove('highlight'));
    document.querySelectorAll('#spectrumTable tbody tr').forEach(r => r.classList.remove('highlight-row', 'fade-hidden'));
  } else {
    state.highlightedPathogen = p;
    document.querySelectorAll('.pathogen-header').forEach(h => {
      h.classList.toggle('highlight', h.dataset.pathogen === p);
    });

    const pathIdx = D.pathogens.indexOf(p);
    document.querySelectorAll('#spectrumTable tbody tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      // cell 0=sticky, 1=class, 2+= pathogens
      const specCell = cells[pathIdx + 2];
      if (specCell) {
        const val = specCell.dataset.value;
        if (val === 'S' || val === 'I') {
          row.classList.add('highlight-row');
          row.classList.remove('fade-hidden');
        } else {
          row.classList.remove('highlight-row');
          row.classList.add('fade-hidden');
        }
      }
    });
  }
}

function renderSpectrumRows() {
  const tbody = document.querySelector('#spectrumTable tbody');
  tbody.innerHTML = '';

  let drugs = D.antibiotics;

  if (state.spectrumClassFilter) {
    drugs = drugs.filter(a => a.class === state.spectrumClassFilter);
  }

  if (state.spectrumPathogenFilter) {
    drugs = drugs.filter(a => {
      const s = a.spectrum[state.spectrumPathogenFilter];
      return s === 'S' || s === 'I';
    });
  }

  if (drugs.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="${D.pathogens.length + 2}" class="no-results-msg">Ningún antibiótico coincide con los filtros aplicados</td>`;
    tbody.appendChild(tr);
    return;
  }

  drugs.forEach(drug => {
    const tr = document.createElement('tr');

    // Drug name cell
    const tdName = document.createElement('td');
    tdName.className = 'sticky-col';
    tdName.innerHTML = `
      <div class="drug-cell" data-drug="${drug.id}" title="Ver detalles de ${drug.name}">
        <span class="drug-dot" style="background:${drug.color}"></span>
        <div>
          <span class="drug-name">${drug.name}</span>
          <span class="drug-class-tag">${drug.route.join(' · ')}</span>
        </div>
      </div>`;
    tdName.querySelector('.drug-cell').addEventListener('click', () => openDrugModal(drug.id));
    tr.appendChild(tdName);

    // Class cell
    const tdClass = document.createElement('td');
    tdClass.style.cssText = 'font-size:11px;color:var(--text-muted);white-space:nowrap;';
    tdClass.textContent = drug.class;
    tr.appendChild(tdClass);

    // Pathogen cells
    D.pathogens.forEach(p => {
      const td = document.createElement('td');
      const val = drug.spectrum[p] || '—';
      td.dataset.value = val;
      td.innerHTML = `<span class="cell-${val === '—' ? 'N' : val}">${val}</span>`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// ─── INFECTIONS VIEW ──────────────────────────────
function buildInfectionsView() {
  const grid = document.getElementById('infectionGrid');

  D.infections.forEach(inf => {
    const card = document.createElement('div');
    card.className = 'infection-card';

    const firstDrugs = inf.firstLine.map(d => `
      <div class="drug-row first-line">
        <div>
          <div class="dr-drug">${getDrugName(d.drug)}</div>
          <div class="dr-note">${d.notes}</div>
        </div>
        <div class="dr-dose">${d.dose}</div>
        <div class="dr-duration">${d.duration}</div>
      </div>`).join('');

    const altDrugs = inf.alternatives.map(d => `
      <div class="drug-row alternative">
        <div>
          <div class="dr-drug">${getDrugName(d.drug)}</div>
          <div class="dr-note">${d.notes}</div>
        </div>
        <div class="dr-dose">${d.dose}</div>
        <div class="dr-duration">${d.duration}</div>
      </div>`).join('');

    card.innerHTML = `
      <div class="inf-header">
        <span class="inf-icon">${inf.icon}</span>
        <div class="inf-title-area">
          <div class="inf-title">${inf.name}</div>
          <div class="inf-pathogens">Patógenos: ${inf.pathogens.join(' · ')}</div>
        </div>
        <span class="inf-toggle">▾</span>
      </div>
      <div class="inf-body">
        <div class="inf-section-title">Primera línea</div>
        ${firstDrugs}
        <div class="inf-section-title">Alternativas</div>
        ${altDrugs}
        <div class="inf-section-title">Criterios diagnósticos</div>
        <div class="criteria-box">${inf.criteria}</div>
        <div class="inf-section-title">⚠ Consideraciones clínicas</div>
        <div class="warning-box">${inf.watchout}</div>
        <span class="guideline-tag">📋 ${inf.guidelines}</span>
      </div>`;

    card.querySelector('.inf-header').addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      // Close all
      document.querySelectorAll('.infection-card.expanded').forEach(c => c.classList.remove('expanded'));
      if (!wasExpanded) card.classList.add('expanded');
    });

    grid.appendChild(card);
  });
}

// ─── DOSING TABLE ─────────────────────────────────
function buildDosingView() {
  const classes = [...new Set(D.antibiotics.map(a => a.class))].sort();
  const classSelect = document.getElementById('dosingClassFilter');
  classes.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    classSelect.appendChild(opt);
  });

  classSelect.addEventListener('change', e => {
    state.dosingClass = e.target.value;
    renderDosingCards();
  });

  document.getElementById('routeFilter').addEventListener('change', e => {
    state.dosingRoute = e.target.value;
    renderDosingCards();
  });

  renderDosingCards();
}

function renderDosingCards() {
  const container = document.getElementById('dosingCards');
  container.innerHTML = '';

  let drugs = D.antibiotics;
  if (state.dosingClass) drugs = drugs.filter(a => a.class === state.dosingClass);
  if (state.dosingRoute) drugs = drugs.filter(a => a.route.includes(state.dosingRoute));

  if (drugs.length === 0) {
    container.innerHTML = '<div class="no-results-msg">No hay antibióticos con los filtros seleccionados.</div>';
    return;
  }

  drugs.forEach(drug => {
    const card = document.createElement('div');
    card.className = 'dosing-card';

    const rows = drug.dosing.map(d => `
      <tr>
        <td>${d.indication}</td>
        <td>${d.neonates || '<span style="color:var(--text-dim)">—</span>'}</td>
        <td>${d.infant_child}</td>
        <td>${d.max_dose}</td>
        <td>${d.notes}</td>
      </tr>`).join('');

    card.innerHTML = `
      <div class="dc-header">
        <span class="dc-dot" style="background:${drug.color}"></span>
        <span class="dc-title">${drug.name}</span>
        <span class="dc-class">${drug.class}</span>
        <div class="dc-routes">${drug.route.map(r => `<span class="route-tag">${r}</span>`).join('')}</div>
      </div>
      <div style="overflow-x:auto">
        <table class="dc-table">
          <thead>
            <tr>
              <th>Indicación</th>
              <th>Neonatos</th>
              <th>Lactante/Niño</th>
              <th>Dosis máxima</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    container.appendChild(card);
  });
}

// ─── CALCULATOR ───────────────────────────────────
function buildCalculator() {
  const drugSelect = document.getElementById('calcDrug');
  D.antibiotics.forEach(drug => {
    const opt = document.createElement('option');
    opt.value = drug.id;
    opt.textContent = drug.name;
    drugSelect.appendChild(opt);
  });

  drugSelect.addEventListener('change', () => {
    const drugId = drugSelect.value;
    if (!drugId) {
      document.getElementById('calcIndicationGroup').style.display = 'none';
      return;
    }
    const drug = D.antibiotics.find(a => a.id === drugId);
    const indSelect = document.getElementById('calcIndication');
    indSelect.innerHTML = '';
    drug.dosing.forEach((d, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = d.indication;
      indSelect.appendChild(opt);
    });
    document.getElementById('calcIndicationGroup').style.display = 'block';
  });

  document.getElementById('calcBtn').addEventListener('click', calculateDose);
}

function calculateDose() {
  const weight = parseFloat(document.getElementById('calcWeight').value);
  const years = parseInt(document.getElementById('calcAgeYears').value) || 0;
  const months = parseInt(document.getElementById('calcAgeMonths').value) || 0;
  const drugId = document.getElementById('calcDrug').value;
  const indicationIdx = parseInt(document.getElementById('calcIndication').value) || 0;

  const resultPanel = document.getElementById('calcResult');

  if (!weight || weight <= 0) {
    resultPanel.innerHTML = `<div class="result-empty"><p style="color:var(--red)">⚠ Ingrese un peso válido (kg)</p></div>`;
    return;
  }

  if (!drugId) {
    resultPanel.innerHTML = `<div class="result-empty"><p style="color:var(--red)">⚠ Seleccione un antibiótico</p></div>`;
    return;
  }

  const drug = D.antibiotics.find(a => a.id === drugId);
  const dosing = drug.dosing[indicationIdx];

  if (!dosing) return;

  const totalMonths = years * 12 + months;

  // Parse dose range from string like "40-90 mg/kg/día" or "10 mg/kg/día"
  const doseText = dosing.infant_child;

  // Try to extract numbers and frequency
  const rangeMatch = doseText.match(/(\d+(?:\.\d+)?)[–\-](\d+(?:\.\d+)?)\s*mg\/kg\/día/);
  const singleMatch = doseText.match(/(\d+(?:\.\d+)?)\s*mg\/kg\/día/);
  const freqMatch = doseText.match(/c\/([\d]+)h/);
  const divMatch = doseText.match(/÷\s*c\/([\d]+)h/);
  const dayMatch = doseText.match(/x(\d+)\s*días/);

  let minDose = null, maxDose = null, dosePerKg = null;
  let freqHours = null;

  if (rangeMatch) {
    minDose = parseFloat(rangeMatch[1]) * weight;
    maxDose = parseFloat(rangeMatch[2]) * weight;
  } else if (singleMatch) {
    dosePerKg = parseFloat(singleMatch[1]);
    minDose = dosePerKg * weight;
    maxDose = minDose;
  }

  if (freqMatch) freqHours = parseInt(freqMatch[1]);
  else if (divMatch) freqHours = parseInt(divMatch[1]);

  // Parse max dose
  const maxDoseText = dosing.max_dose;
  const maxDoseMgMatch = maxDoseText.match(/(\d+(?:[\.,]\d+)?)\s*mg/);
  let maxDoseCap = maxDoseMgMatch ? parseFloat(maxDoseMgMatch[1].replace(',', '.')) : null;

  // Calculate per-dose amount
  let dailyMin = minDose;
  let dailyMax = maxDose;
  let perDoseMin = null, perDoseMax = null;
  let dosesPerDay = null;

  if (freqHours) {
    dosesPerDay = Math.round(24 / freqHours);
    perDoseMin = dailyMin / dosesPerDay;
    perDoseMax = dailyMax / dosesPerDay;
  }

  // Check if exceeds max
  let cappedDaily = null;
  let cappedPerDose = null;

  if (maxDoseCap && perDoseMax && perDoseMax > maxDoseCap) {
    cappedPerDose = maxDoseCap;
    cappedDaily = maxDoseCap * (dosesPerDay || 1);
  }

  const ageStr = totalMonths < 12
    ? `${totalMonths} meses`
    : `${years} años${months > 0 ? ` ${months} m` : ''}`;

  const freqStr = freqHours ? `c/${freqHours}h (${dosesPerDay}x/día)` : '';

  resultPanel.innerHTML = `
    <div class="result-content">
      <div class="result-drug-header">
        <span class="result-dot" style="background:${drug.color}"></span>
        <div>
          <div class="result-drug-name">${drug.name}</div>
          <div class="result-drug-class">${drug.class} · ${drug.route.join('/')}</div>
        </div>
      </div>

      <div class="result-patient">
        <div class="result-stat">
          <span class="rs-value">${weight} kg</span>
          <div class="rs-label">Peso</div>
        </div>
        <div class="result-stat">
          <span class="rs-value">${ageStr}</span>
          <div class="rs-label">Edad</div>
        </div>
        <div class="result-stat">
          <span class="rs-value">${freqStr || '—'}</span>
          <div class="rs-label">Frecuencia</div>
        </div>
      </div>

      <div class="result-indication">
        <strong>Indicación:</strong> ${dosing.indication}
      </div>

      <div class="dose-highlight-box">
        <div class="dose-main-label">Dosis diaria calculada</div>
        ${minDose !== null ? `
          <div>
            <span class="dose-main-value">${
              minDose === maxDose
                ? round1(cappedDaily || minDose)
                : `${round1(minDose)} – ${round1(cappedDaily || maxDose)}`
            }</span>
            <span class="dose-main-unit">mg/día</span>
          </div>
          ${perDoseMin !== null ? `
            <div class="dose-divided">
              → ${
                perDoseMin === perDoseMax
                  ? `${round1(cappedPerDose || perDoseMin)} mg/dosis`
                  : `${round1(perDoseMin)} – ${round1(cappedPerDose || perDoseMax)} mg/dosis`
              } ${freqStr}
            </div>` : ''}
        ` : `<div class="dose-main-value" style="font-size:16px">${doseText}</div>`}
      </div>

      ${cappedPerDose ? `
        <div class="dose-max-warn">
          ⚠ Dosis ajustada al máximo: ${dosing.max_dose}
        </div>` : ''}

      ${maxDoseCap ? `
        <div class="dose-notes">
          <strong>Dosis máxima:</strong> ${dosing.max_dose}
        </div>` : ''}

      <div class="dose-notes">
        <strong>Notas:</strong> ${dosing.notes}
      </div>

      ${totalMonths < 3 ? `
        <div class="dose-max-warn" style="margin-top:12px">
          ⚠ Paciente <3 meses: consultar dosis neonatal específica y valorar hospitalización
        </div>` : ''}
    </div>`;
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

// ─── DRUG MODAL ───────────────────────────────────
function openDrugModal(drugId) {
  const drug = D.antibiotics.find(a => a.id === drugId);
  if (!drug) return;

  const spectrumHtml = Object.entries(drug.spectrum).map(([org, val]) => `
    <div class="modal-spec-item">
      <span class="modal-spec-org">${org}</span>
      <span class="cell-${val}">${val}</span>
    </div>`).join('');

  const dosingHtml = drug.dosing.map(d => `
    <div class="modal-dosing-item">
      <div class="mdi-indication">${d.indication}</div>
      <div class="mdi-grid">
        <div class="mdi-field"><label>Neonatos</label><span>${d.neonates || '—'}</span></div>
        <div class="mdi-field"><label>Lactante/Niño</label><span>${d.infant_child}</span></div>
        <div class="mdi-field"><label>Dosis máxima</label><span>${d.max_dose}</span></div>
      </div>
      <div class="mdi-note">${d.notes}</div>
    </div>`).join('');

  const routesHtml = drug.route.map(r => `<span class="route-tag">${r}</span>`).join(' ');

  document.getElementById('modalContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
      <span style="width:14px;height:14px;border-radius:50%;background:${drug.color};display:inline-block;flex-shrink:0"></span>
      <h2 class="modal-drug-title">${drug.name}</h2>
    </div>
    <p class="modal-drug-meta">${drug.class} · ${routesHtml}</p>

    <div class="modal-section-head">Espectro de actividad</div>
    <div class="modal-spectrum-grid">${spectrumHtml}</div>

    <div class="modal-section-head">Dosificación pediátrica</div>
    ${dosingHtml}`;

  document.getElementById('drugModal').classList.remove('hidden');
}

document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('drugModal').classList.add('hidden');
});

document.getElementById('drugModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('drugModal').classList.add('hidden');
});

// ─── GLOBAL SEARCH ────────────────────────────────
function buildSearch() {
  const input = document.getElementById('globalSearch');
  const dropdown = document.getElementById('searchDropdown');

  const searchItems = [
    ...D.antibiotics.map(a => ({ type: 'Antibiótico', label: a.name, sub: a.class, action: () => { switchView('spectrum'); setTimeout(() => openDrugModal(a.id), 100); } })),
    ...D.pathogens.map(p => ({ type: 'Patógeno', label: p, sub: 'Ver cobertura', action: () => { switchView('spectrum'); state.spectrumPathogenFilter = p; document.getElementById('filterPathogen').value = p; renderSpectrumRows(); } })),
    ...D.infections.map(i => ({ type: 'Infección', label: i.name, sub: i.guidelines, action: () => { switchView('infections'); setTimeout(() => { const cards = document.querySelectorAll('.infection-card'); cards.forEach(c => { if (c.querySelector('.inf-title').textContent === i.name) c.classList.add('expanded'); }); }, 100); } })),
  ];

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    dropdown.innerHTML = '';

    if (q.length < 2) { dropdown.classList.add('hidden'); return; }

    const results = searchItems.filter(s => s.label.toLowerCase().includes(q) || s.sub.toLowerCase().includes(q)).slice(0, 8);

    if (results.length === 0) {
      dropdown.innerHTML = '<div class="search-no-results">Sin resultados para "' + input.value + '"</div>';
    } else {
      results.forEach(r => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.innerHTML = `<span class="si-type">${r.type}</span><div><strong>${r.label}</strong><br><span style="color:var(--text-dim);font-size:11px">${r.sub}</span></div>`;
        item.addEventListener('click', () => {
          r.action();
          input.value = r.label;
          dropdown.classList.add('hidden');
        });
        dropdown.appendChild(item);
      });
    }

    dropdown.classList.remove('hidden');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) dropdown.classList.add('hidden');
  });
}

// ─── HELPERS ──────────────────────────────────────
function getDrugName(id) {
  const drug = D.antibiotics.find(a => a.id === id);
  return drug ? drug.name : id;
}

// ─── INIT ─────────────────────────────────────────
function init() {
  buildSpectrumTable();
  buildInfectionsView();
  buildDosingView();
  buildCalculator();
  buildSearch();
}

document.addEventListener('DOMContentLoaded', init);
