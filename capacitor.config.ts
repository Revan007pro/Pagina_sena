import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proyecto_sena.app',
  appName: 'proyecto_web',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;