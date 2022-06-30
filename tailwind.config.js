/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                'sol-orange': '#e37542',
                'sol-red': '#e64b61',

                // Primary
                "primary": "#e37542",
                "primary-focus": "#ffffff",
                
                // Secondary
                "secondary": "#F1DDB4",

                // Miscelaneous
                "neutral": "#1B1817",
                "base": "#26262B",
                "base-content": "#ffffff",
            },
        },
        fontFamily: {
            sans: ['Rubik'],
        },
        screens: { ...defaultTheme.screens },
    },
    plugins: [typography],
};
