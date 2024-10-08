/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'], 
            }, 
        },
     },
    daisyui: {
        themes: ["light", "dark", "lofi", "synthwave", "forest" ],
        base: true,
        styled: true,
        logs: true,
        // themeRoot: ":root"
    },

    plugins: [require('daisyui'), ]
}
