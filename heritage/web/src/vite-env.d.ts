
/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_API_AUDIENCE: string;
  // Add any other environment variables you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}