# react-global-settings

`react-global-settings` is a lightweight React hook package for loading and globally caching typed app settings.

By default, settings are fetched from `/settings.json` and shared across consumers so they are not re-fetched on every render.

## Install

```bash
npm install react-global-settings
```

## Usage

```tsx
import { useSettings } from 'react-global-settings';

type AppSettings = {
  apiUrl: string;
  enableTelemetry: boolean;
};

export function Example() {
  const settings = useSettings<AppSettings>();

  if (!settings) return <p>Loading settings...</p>;

  return <p>API URL: {settings.apiUrl}</p>;
}
```

## More Examples

### 1) Nested settings object

```tsx
import { useSettings } from 'react-global-settings';

type AppSettings = {
  api: {
    baseUrl: string;
    timeoutMs: number;
  };
  features: {
    newDashboard: boolean;
  };
};

export function ApiInfo() {
  const settings = useSettings<AppSettings>();

  if (!settings) return <p>Loading...</p>;

  return (
    <div>
      <p>Base URL: {settings.api.baseUrl}</p>
      <p>Timeout: {settings.api.timeoutMs} ms</p>
    </div>
  );
}
```

### 2) Create a domain-specific hook

```tsx
import { useSettings } from 'react-global-settings';

type AppSettings = {
  apiUrl: string;
  enableTelemetry: boolean;
};

export function useAppSettings() {
  return useSettings<AppSettings>();
}

export function TelemetryBadge() {
  const settings = useAppSettings();

  if (!settings) return null;

  return <span>{settings.enableTelemetry ? 'Telemetry: on' : 'Telemetry: off'}</span>;
}
```

### 3) Reuse settings in multiple components

Because settings are globally cached, multiple components can read them without triggering extra fetches.

```tsx
import { useSettings } from 'react-global-settings';

type AppSettings = {
  apiUrl: string;
  appName: string;
};

function Header() {
  const settings = useSettings<AppSettings>();
  if (!settings) return null;
  return <h1>{settings.appName}</h1>;
}

function ApiStatus() {
  const settings = useSettings<AppSettings>();
  if (!settings) return null;
  return <p>Connected to: {settings.apiUrl}</p>;
}

export function AppShell() {
  return (
    <>
      <Header />
      <ApiStatus />
    </>
  );
}
```

### 4) Typical Vite setup

For Vite apps, place your settings file in `public/settings.json` so it is served as `/settings.json`.

### Expected settings file

Place a `settings.json` file in your app's public root:

```json
{
  "apiUrl": "https://api.example.com",
  "enableTelemetry": true
}
```

## API

- `useSettings<TSettings extends object>(): TSettings`
  - Loads JSON settings (from `/settings.json` by default).
  - Caches settings in shared global state.
  - Returns the settings typed as `TSettings`.

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```