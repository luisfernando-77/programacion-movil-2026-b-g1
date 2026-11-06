
const API_URL = 'https://dummyjson.com';

export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface LoginResponse extends AuthUser {
  accessToken: string;
  refreshToken: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (response.status === 401) {
    throw new ApiError(
      'Unauthorized. Please log in again.',
      401
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      options
    );

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      'Network error. Check your internet connection.'
    );
  }
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });
}

export async function getProfile(
  token: string
): Promise<AuthUser> {
  return request<AuthUser>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
