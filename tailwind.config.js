/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
            extend: {
              colors: {
                'mint-green': '#A2E4B8',
                'coral-pink': '#FF9B85',
                'light-yellow': '#FFE66D',
                'cream': '#FFF8E1',
              },
              fontFamily: {
                'nunito': ['"Nunito"', 'sans-serif'],
                'geist-mono': ['"Geist Mono"', 'monospace'],
                'source-sans-3': ['"Source Sans 3"', 'sans-serif'],
                'rethink-sans': ['"Rethink Sans"', 'sans-serif'],
              },
            },
          },
  plugins: [],
}
