import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';
import { definePreset } from "@primeuix/themes";

const Neutral = definePreset(Aura, {
  semantic: {
      colorScheme: {
          light: {
              primary: {
                  50: '{noir.50}',
                  100: '{noir.100}',
                  200: '{noir.200}',
                  300: '{noir.300}',
                  400: '{noir.400}',
                  500: '{noir.500}',
                  600: '{noir.600}',
                  700: '{noir.700}',
                  800: '{noir.800}',
                  900: '{noir.900}',
                  950: '{noir.950}'
              },
              surface: {
                  50: '{slate.50}',
                  100: '{slate.100}',
                  200: '{slate.200}',
                  300: '{slate.300}',
                  400: '{slate.400}',
                  500: '{slate.500}',
                  600: '{slate.600}',
                  700: '{slate.700}',
                  800: '{slate.800}',
                  900: '{slate.900}',
                  950: '{slate.950}'
              }
          },
          dark: {
              primary: {
                  50: '{noir.50}',
                  100: '{noir.100}',
                  200: '{noir.200}',
                  300: '{noir.300}',
                  400: '{noir.400}',
                  500: '{noir.500}',
                  600: '{noir.600}',
                  700: '{noir.700}',
                  800: '{noir.800}',
                  900: '{noir.900}',
                  950: '{noir.950}'
              },
              surface: {
                  50: '{zinc.50}',
                  100: '{zinc.100}',
                  200: '{zinc.200}',
                  300: '{zinc.300}',
                  400: '{zinc.400}',
                  500: '{zinc.500}',
                  600: '{zinc.600}',
                  700: '{zinc.700}',
                  800: '{zinc.800}',
                  900: '{zinc.900}',
                  950: '{zinc.950}'
              }
          }
      }
  }
});

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],
  modules: [
    '@primevue/nuxt-module',
    "@pinia/nuxt",
    'pinia-plugin-persistedstate/nuxt',
  ],
  piniaPluginPersistedstate: {
    storage: 'localStorage'
  },
  primevue: {
    options: {
      theme: {
          prefix: 'p',
          preset: Neutral,
          darkModeSelector: '.dark-mode-selector',
          cssLayer: {
            name: 'primevue',
            order: 'primevue, base'
          }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
