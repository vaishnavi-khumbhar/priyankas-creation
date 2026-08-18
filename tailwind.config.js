export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      colors: {
        brand: {
          pink: "#E91E9B",
          magenta: "#C21886",
          purple: "#6520A8",
          violet: "#7B2CBF",
          soft: "#FFF0FA",
          cream: "#FFFDF8",
          gold: "#C89B3C",
          ink: "#30243A",
          muted: "#756A7A"
        }
      }
    }
  },
  plugins: []
}
