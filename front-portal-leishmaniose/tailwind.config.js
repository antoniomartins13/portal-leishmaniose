module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
            },
            colors: {
                teal: {
                    50: '#f0f9f8',
                    100: '#d1ebe8',
                    200: '#aee0dc',
                    300: '#6db5ae',
                    400: '#4a9a93',
                    500: '#2d8178',
                    600: '#1a6b6a',
                    700: '#0f766e',
                    800: '#0d5f5a',
                    900: '#0a4643',
                },
                primary: '#0f766e',
                secondary: '#134e4a',
                danger: '#EF4444',
                warning: '#F59E0B',
                info: '#06B6D4'
            },
            spacing: {
                'safe': 'var(--safe-area-inset-left)',
            }
        },
    },
    plugins: [],
}
