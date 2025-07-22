/**
 * Simple API client for JoyToTrip frontend.
 * Expects VITE_API_URL (e.g., https://cms.joytotrip.com) pointing to Strapi backend.
 * Provides helper to fetch routes collection.
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export async function fetchRoutes(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `${API_URL}/api/routes${qs ? `?${qs}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch routes: ${res.status}`);
  const json = await res.json();
  // Strapi v5 returns { data: [...], meta: {...} }
  return json.data?.map(mapRoute) ?? [];
}

export async function fetchRoute(idOrSlug) {
  // Accept numeric id or slug string
  const isNum = /^[0-9]+$/.test(String(idOrSlug));
  if (isNum) {
    const url = `${API_URL}/api/routes/${idOrSlug}?populate=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Route ${idOrSlug} not found`);
    const json = await res.json();
    return mapRoute(json.data);
  } else {
    // filter by slug
    const url = `${API_URL}/api/routes?filters[slug][$eq]=${encodeURIComponent(idOrSlug)}&populate=*`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Route slug ${idOrSlug} not found`);
    const json = await res.json();
    return mapRoute(json.data?.[0]);
  }
}

function mapRoute(item) {
  if (!item) return null;
  const attrs = item.attributes || {};
  return {
    id: item.id,
    title: attrs.title,
    desc: attrs.description,
    price: attrs.price,
    tags: attrs.tags,
    itinerary: attrs.itinerary,
    image: attrs.image?.data?.attributes?.url
      ? new URL(attrs.image.data.attributes.url, API_URL).href
      : null,
  };
}
