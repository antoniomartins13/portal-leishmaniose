module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                secondary: '#10B981',
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
