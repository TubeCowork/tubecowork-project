import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#F41B1B",
                "primary-hover": "#ff0f0f",
                "primary-bg": "#282828", //#282828
                secondary: "#0F0F0F", //0F0F0F
                "secondary-hover": "#3F3F3F", //3F3F3F
                third: "#1f1f1f",
                highlight: "#FCB040",
                "text-color": "#FFFFFF",
                "text-color-light": "#b3b3b3",
                "text-color-2": "#000",
            },
        },
    },
    plugins: [],
}
export default config
