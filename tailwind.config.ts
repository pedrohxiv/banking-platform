import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0179FE",
        black: {
          primary: "#00214F",
          secondary: "#344054",
        },
      },
      backgroundImage: {
        "gradient-mesh": "url('/icons/gradient-mesh.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
