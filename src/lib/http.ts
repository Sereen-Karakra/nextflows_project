const ALLOWED_HOSTS = new Set(["api.open-meteo.com"]);

export async function fetchJson(
  url: string,
  { timeoutMs = 8000 }: { timeoutMs?: number } = {},
) {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("Invalid URL.");
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error("Only HTTPS URLs are allowed.");
  }

  if (!ALLOWED_HOSTS.has(parsedUrl.hostname)) {
    throw new Error(`Host "${parsedUrl.hostname}" is not allowed.`);
  }

  try {
    const response = await fetch(parsedUrl, {
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      throw new Error(
        `Request to ${parsedUrl.hostname} failed with status ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new Error("Request timed out.");
    }

    throw error;
  }
}