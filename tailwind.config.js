
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',  // Small screens, like smartphones (640px and up)
        'md': '768px',  // Medium screens, like tablets (768px and up)
        'lg': '1024px', // Large screens, like laptops/desktops (1024px and up)
        'xl': '1280px', // Extra large screens, like large desktops (1280px and up)
      },
    },
  },
  plugins: [],
};
