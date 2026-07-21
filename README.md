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