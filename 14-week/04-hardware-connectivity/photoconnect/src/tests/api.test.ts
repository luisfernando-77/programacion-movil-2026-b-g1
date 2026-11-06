
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from 'vitest';

import {
  getProfile,
  ApiError,
} from '../services/api';

describe('PhotoConnect API Tests', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should handle 401 Unauthorized errors', async () => {
    // Simulate an API response with status 401.
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    vi.stubGlobal('fetch', mockFetch);

    // Verify that an invalid token is rejected.
    await expect(
      getProfile('invalid-token')
    ).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
      message: 'Unauthorized. Please log in again.',
    });

    // Verify that the request included the token.
    expect(mockFetch).toHaveBeenCalledWith(
      'https://dummyjson.com/auth/me',
      {
        headers: {
          Authorization: 'Bearer invalid-token',
        },
      }
    );
  });

  it('should handle network errors', async () => {
    // Simulate a lost internet connection.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(
        new TypeError('Failed to fetch')
      )
    );

    await expect(
      getProfile('test-token')
    ).rejects.toThrow(
      'Network error. Check your internet connection.'
    );
  });

  it('should retrieve protected user data', async () => {
    // Simulate a successful API response.
    const mockUser = {
      id: 1,
      username: 'emilys',
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.johnson@x.dummyjson.com',
    };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockUser,
      })
    );

    const result = await getProfile('valid-token');

    expect(result.username).toBe('emilys');
    expect(result.id).toBe(1);
    expect(result.firstName).toBe('Emily');
  });
});
