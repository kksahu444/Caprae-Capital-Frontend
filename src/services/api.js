/**
 * Centralized API Service for Lead Intelligence Dashboard
 * Connects to FastAPI backend at configurable base URL
 * Falls back to mock data when backend is unreachable
 */

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:9000";

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call failed (${path}):`, err.message);
    return null;
  }
}

// ─── Analytics ───────────────────────────────────────────────
export async function fetchSummaryStats() {
  return apiFetch("/analytics/summary");
}

export async function fetchTierDistribution(category, location) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (location) params.set("location", location);
  const qs = params.toString();
  return apiFetch(`/analytics/tier_distribution${qs ? `?${qs}` : ""}`);
}

export async function fetchTopLeads(limit = 10, tier, category) {
  const params = new URLSearchParams({ limit });
  if (tier) params.set("tier", tier);
  if (category) params.set("category", category);
  return apiFetch(`/analytics/top_leads?${params}`);
}

export async function fetchCounts() {
  return apiFetch("/analytics/counts");
}

export async function fetchCompletenessStats() {
  return apiFetch("/analytics/completeness_stats");
}

// ─── Companies ───────────────────────────────────────────────
export async function fetchCompanies({
  query,
  location,
  category,
  ratingMin,
  hasWebsite,
  hasPhone,
  sortBy = "created_at",
  order = "desc",
  limit = 20,
  offset = 0,
} = {}) {
  const params = new URLSearchParams({ sort_by: sortBy, order, limit, offset });
  if (query) params.set("query", query);
  if (location) params.set("location", location);
  if (category) params.set("category", category);
  if (ratingMin != null) params.set("rating_min", ratingMin);
  if (hasWebsite != null) params.set("has_website", hasWebsite);
  if (hasPhone != null) params.set("has_phone", hasPhone);
  return apiFetch(`/companies/?${params}`);
}

export async function fetchCompanyDetail(id) {
  return apiFetch(`/companies/${id}/detail`);
}

export async function fetchCategories(limit = 100) {
  return apiFetch(`/companies/meta/categories?limit=${limit}`);
}

export async function fetchLocations(limit = 100) {
  return apiFetch(`/companies/meta/locations?limit=${limit}`);
}

export async function fetchCompanyStats() {
  return apiFetch("/companies/stats/summary");
}

export function getExportCSVUrl(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return `${API_BASE}/companies/export/csv${qs ? `?${qs}` : ""}`;
}

// ─── Scraper ─────────────────────────────────────────────────
export async function startGoogleMapsScrape({ query, location, maxResults = 20, headless = true }) {
  return apiFetch("/scrape/google_maps/async", {
    method: "POST",
    body: JSON.stringify({
      query,
      location,
      max_results: maxResults,
      headless,
    }),
  });
}

export async function startCrawleeScrape({ query, location, maxResults = 20, headless = true }) {
  return apiFetch("/scrape/crawlee/async", {
    method: "POST",
    body: JSON.stringify({
      query,
      location,
      max_results: maxResults,
      headless,
    }),
  });
}

export async function getScraperTaskStatus(taskId) {
  return apiFetch(`/scrape/google_maps/task/${taskId}`);
}

export async function getCrawleeTaskStatus(taskId) {
  return apiFetch(`/scrape/crawlee/task/${taskId}`);
}

export async function getDatabaseLeads(limit = 100, offset = 0) {
  return apiFetch(`/scrape/database/leads?limit=${limit}&offset=${offset}`);
}

// ─── Enrichment ──────────────────────────────────────────────
export async function triggerEmailEnrichment(companyId) {
  return apiFetch(`/api/v1/enrichment/companies/${companyId}/enrich-email`, {
    method: "POST",
  });
}

export async function getEnrichedEmails(companyId) {
  return apiFetch(`/api/v1/enrichment/companies/${companyId}/emails`);
}

export async function getEnrichmentStatus(companyId) {
  return apiFetch(`/api/v1/enrichment/companies/${companyId}/status`);
}

export async function triggerBatchEnrichment(limit = 100) {
  return apiFetch(`/api/v1/enrichment/admin/batch-enrich?limit=${limit}`, {
    method: "POST",
  });
}

export async function getEnrichmentTaskStatus(taskId) {
  return apiFetch(`/api/v1/enrichment/task/${taskId}/status`);
}
