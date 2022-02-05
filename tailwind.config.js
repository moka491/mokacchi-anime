module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      primary: "#6ABEFB",
      secondary: "#3879D5",
      bgPrimary: "#182B47",
      bgSecondary: "#1F385C",
      textPrimary: "#BED4F4",
      textSecondary: "#6E89AF",
      error: "#D54238",
      success: "#61D538",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "10px",
      4: "16px",
      5: "18px",
      6: "24px",
      7: "32px",
      8: "48px",
      9: "64px",
    },
    extends: {
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  variants: {},
  plugins: [],
};
