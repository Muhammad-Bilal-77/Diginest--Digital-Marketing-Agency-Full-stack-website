const DEFAULT_API_BASE =
  "https://reliable-verene-umair-digital-68123777.koyeb.app/api";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getApiBase() {
  const configuredApiBase = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredApiBase) {
    return trimTrailingSlash(configuredApiBase);
  }

  return DEFAULT_API_BASE;
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBase()}${normalizedPath}`;
}
