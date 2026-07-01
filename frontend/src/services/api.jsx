const API_BASE = import.meta.env.VITE_API_URL||'http://localhost:5000/api';

export const api = {
  // ---- PARTS ----
  getParts: () => fetch(`${API_BASE}/parts`).then(res => res.json()),
  createPart: (data) =>
    fetch(`${API_BASE}/parts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
  updatePartPrice: (id, currentPrice, reason) =>
    fetch(`${API_BASE}/parts/${id}/price`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPrice, reason }),
    }).then(res => res.json()),

  // ---- CYCLES ----
  getCycles: () => fetch(`${API_BASE}/cycles`).then(res => res.json()),
  createCycle: (data) =>
    fetch(`${API_BASE}/cycles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
  getCyclePrice: (id) =>
    fetch(`${API_BASE}/cycles/${id}/price`).then(res => res.json()),

  // ---- QUOTES ----
  getQuotes: () => fetch(`${API_BASE}/quotes`).then(res => res.json()),
  createQuote: (cycleId, customerName) =>
    fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cycleId, customerName }),
    }).then(res => res.json()),
};
