/** @type {import('tailwindcss').Config} */
import  { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import  { join } from 'path';

module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],

  content: [
    "./src/**/*.{html,ts}",
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

