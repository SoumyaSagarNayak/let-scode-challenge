const API_BASE_URL = '/api';

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE_URL}/dashboard`);
  if (!res.ok) throw new Error('Failed to fetch dashboard summary');
  const data = await res.json();
  return data.data;
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.data;
}

export async function fetchCategoryById(id) {
  const res = await fetch(`${API_BASE_URL}/category/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch category ${id}`);
  const data = await res.json();
  return data.data;
}

export async function fetchCountries() {
  const res = await fetch(`${API_BASE_URL}/countries`);
  if (!res.ok) throw new Error('Failed to fetch countries');
  const data = await res.json();
  return data.data;
}

export async function fetchCountryByName(name) {
  const res = await fetch(`${API_BASE_URL}/country/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch profile for ${name}`);
  const data = await res.json();
  return data.data;
}

export async function fetchComparison(targetCountry) {
  const res = await fetch(`${API_BASE_URL}/compare?country=${encodeURIComponent(targetCountry)}`);
  if (!res.ok) throw new Error(`Failed to compare with ${targetCountry}`);
  const data = await res.json();
  return data.data;
}

export async function searchGlobal(query) {
  const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  const data = await res.json();
  return data.data;
}

export async function fetchAiSummary(payload) {
  const res = await fetch(`${API_BASE_URL}/ai-summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to generate AI summary');
  return res.json();
}
