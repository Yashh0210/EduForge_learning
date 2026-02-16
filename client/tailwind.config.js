/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          ink:     '#0F1117',
          slate:   '#1E293B',
          mist:    '#F0F4FF',
          surface: '#FFFFFF',
          border:  '#E2E8F0',
          signal:  '#4F46E5',
          'signal-light': '#EEF2FF',
          success: '#10B981',
          warning: '#F59E0B',
          danger:  '#EF4444',
          muted:   '#94A3B8',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '8px',
        badge: '6px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(79,70,229,0.12), 0 2px 6px rgba(0,0,0,0.06)',
        'custom-card': '0px 4px 15px 2px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #EEF2FF 0%, #F0F4FF 50%, #F8FAFC 100%)',
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      spacing: {
        'section-height': '500px',
      },
      fontSize: {
        'default': ['15px', '21px'],
        'course-deatails-heading-small': ['26px', '36px'],
        'course-deatails-heading-large': ['36px', '44px'],
        'home-heading-small': ['28px', '34px'],
        'home-heading-large': ['48px', '56px'],
      },
      maxWidth: {
        'course-card': '424px',
      },
    },
  },
  plugins: [],
}