export const tokens = {
  colors: {
    brand: {
      primary: '#4f46e5', // Indigo 600
      secondary: '#8b5cf6', // Violet 500
      accent: '#f59e0b', // Amber 500
    },
    ui: {
      background: '#000000',
      surface: '#09090b', // Zinc 950
      surfaceHighlight: '#18181b', // Zinc 900
      border: 'rgba(255, 255, 255, 0.1)',
      text: {
        primary: '#ffffff',
        secondary: '#a1a1aa', // Zinc 400
        muted: '#52525b', // Zinc 600
      }
    },
    status: {
      success: '#10b981', // Emerald 500
      warning: '#f59e0b', // Amber 500
      error: '#ef4444', // Red 500
      info: '#3b82f6', // Blue 500
    }
  },
  spacing: {
    pagePad: 'clamp(1rem, 5vw, 2rem)', // Responsive padding
    sectionGap: '4rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem', // Modern standard
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    glow: '0 0 20px rgba(79, 70, 229, 0.15)', // Futuristic Glow
    float: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
  }
};

// Helper for consistency
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

################################################################################