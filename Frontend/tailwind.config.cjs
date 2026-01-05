module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      body: ["var(--font-body)"],
      heading: ["var(--font-heading)"],
      caption: ["var(--font-caption)"],
      data: ["var(--font-data)"],
    },
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",

        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },

        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },

        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },

        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },

        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },

        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },

        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },

        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },

        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },

        info: {
          DEFAULT: "var(--color-info)",
          foreground: "var(--color-info-foreground)",
        },

        cta: {
          DEFAULT: "var(--color-cta)",
          foreground: "var(--color-cta-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
