import { createRequire } from 'module'
const require = createRequire(import.meta.url)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/preline/preline.{js,ts,jsx,tsx}'
  ],
  plugins: [require('preline/plugin')]
}
