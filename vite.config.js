import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        industry: resolve(__dirname, 'industry.html'),
        schools: resolve(__dirname, 'schools.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        contactIndustry: resolve(__dirname, 'contact-industry.html'),
        contactSchool: resolve(__dirname, 'contact-school.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        security: resolve(__dirname, 'security.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  }
});
