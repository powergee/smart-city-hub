import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "uos-signiture-blue": "#004094",
        "uos-blue": "#005EB8",
        "uos-blue-light": "#0077C8",
        "uos-blue-soft": "#9BCBEB",
        "uos-emerald": "#00B398",
        "uos-emerald-light": "#2CD5C4",
        "uos-emerald-soft": "#9CDBD9",
        "uos-emerald-mist": "#DCEBEC",
        "uos-gray": "#63666A",
        "uos-gray-light": "#BBBCBC",
        "uos-gray-soft": "#D9D9D6",
        "uos-gray-mist": "#E7E7E0",
        "global-gray-light": "#F5F6FA",
        "global-gray-soft": "#F9F9FB",
      },
    },
  },
  plugins: [],
};
export default config;
