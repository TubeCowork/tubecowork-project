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
                primary: "#ff3333", //pink-500
                "primary-hover": "#ff0000", //pink-500
                "primary-bg": "#010220", //#09162e
                secondary: "rgb(147 51 234)", //
                "secondary-hover": "#a64ef5", //
                third: "#5E17EB",
                highlight: "#FCB040",
                "text-color": "#FFFFFF",
                "text-color-2": "#000",
            },
        },
    },
    plugins: [],
}
export default config
