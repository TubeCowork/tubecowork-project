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
                primary: "#F41B1B", //pink-500
                "primary-hover": "#F41B1F", //pink-500
                "primary-bg": "#282828", //#09162e
                secondary: "rgb(147 51 234)", //
                "secondary-hover": "#a64ef5", //
                highlight: "#FCB040",
                "text-color": "#FFFFFF",
                "text-color-2": "#000",
            },
        },
    },
    plugins: [],
}
export default config
