/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        card: '#111111',
        primary: '#2563EB',
        'light-blue': '#60A5FA',
        success: '#22C55E',
        'text-main': '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '12': '12px',
        '16': '16px',
      },
      animation: {
        'gradient-shift': 'gradientShift 12s ease infinite',
        'scroll-x': 'scrollX 30s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.7)' },
        },
      },
    },
  },
  plugins: [],
};
