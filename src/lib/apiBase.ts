const LOCAL_API_BASE = "http://localhost:8000/api";
const LIVE_API_BASE =
  "https://reliable-verene-umair-digital-68123777.koyeb.app/api";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getApiBase() {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return trimTrailingSlash(LOCAL_API_BASE);
    }
  }

  return trimTrailingSlash(LIVE_API_BASE);
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBase()}${normalizedPath}`;
}
