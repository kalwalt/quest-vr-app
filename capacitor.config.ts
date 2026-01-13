import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kalwalt.questvrapp',
  appName: 'QuestVRApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https', // Obbligatorio per VR
    hostname: 'loalhost', // <--- IL TRUCCO. Usa il tuo ID app qui.
    allowNavigation: ['*'],
    cleartext: true
  }
};

export default config;