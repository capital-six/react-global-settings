import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

interface IApiSettings {
  apiUrl: string;
}

describe('useSettings', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
    vi.unstubAllGlobals?.();
  });

  test('loads settings from settings.json and returns typed settings', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ apiUrl: 'https://api.example.com' }),
    } as unknown as Response);

    vi.stubGlobal('fetch', fetchMock);

    const { useSettings } = await import('./useSettings');

    const { result } = renderHook(() => useSettings<IApiSettings>());

    await waitFor(() => {
      expect(result.current).toEqual({ apiUrl: 'https://api.example.com' });
    });

    expect(fetchMock).toHaveBeenCalledWith('/settings.json');
  });

  test('caches settings globally between consumers', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({ apiUrl: 'https://api.example.com' }),
    } as unknown as Response);

    vi.stubGlobal('fetch', fetchMock);

    const { useSettings } = await import('./useSettings');

    const { result: firstResult } = renderHook(() => useSettings<IApiSettings>());

    await waitFor(() => {
      expect(firstResult.current).toEqual({ apiUrl: 'https://api.example.com' });
    });

    const { result: secondResult } = renderHook(() => useSettings<IApiSettings>());

    await waitFor(() => {
      expect(secondResult.current).toEqual({ apiUrl: 'https://api.example.com' });
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
