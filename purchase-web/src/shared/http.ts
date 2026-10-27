const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object") {
      const { errors } = body as { errors?: unknown };
      if (Array.isArray(errors) && errors.length > 0) {
        return errors.map(String).join(" ");
      }
    }
  } catch {
    // corpo vazio ou não-JSON: cai na mensagem padrão
  }
  return `Erro ${response.status}`;
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: init?.body
        ? { "Content-Type": "application/json", ...init.headers }
        : init?.headers,
    });
  } catch {
    throw new ApiError("Falha de conexão com a API.", 0);
  }

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}