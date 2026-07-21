import { createGlobalState } from 'capitalsix-react-global-state';

/**
 * Load the application settings JSON from disk.
 *
 * If a filename is provided it loads from that path; otherwise it
 * defaults to `/settings.json`.
 */
const loadSettingsAsync = async <TSettings>(filename?: string): Promise<TSettings> => {
  const response = await fetch(filename || '/settings.json');
  return await response.json() as TSettings;
};

/**
 * Shared global settings state hook.
 *
 * Caches the loaded settings at the application level and makes them
 * available to any consumer without re-fetching on every render.
 */
export const useGlobalSettings = createGlobalState<object | undefined>(
  undefined,
  loadSettingsAsync,
);

/**
 * Hook for consuming typed application settings.
 *
 * This returns the global settings state cast to the requested type.
 */
export const useSettings = <TSettings extends object>(): TSettings => {
  const { state: settings } = useGlobalSettings();
  return settings as TSettings;
};
