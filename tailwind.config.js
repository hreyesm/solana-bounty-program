/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');
const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                // Primary
                primary: '#e37542',
                'primary-focus': '#ffffff',

                // Secondary
                secondary: '#F64B62',

                // Miscelaneous
                neutral: '#1B1817',
                base: '#26262B',
                'base-content': '#ffffff',
                line: '#666666',
            },
            textColor: {
                secondary: '#999999',
                danger: '#F64B62'
            },
            width: {
                98: '28rem',
            },
            borderWidth: {
                1.5: '1.5px',
                3: '3px',
            },
            screens: {
                '2lg': '1111px',
            },
        },
        fontFamily: {
            sans: ['Rubik'],
        },
        screens: { ...defaultTheme.screens },
    },
    plugins: [
        typography, require('daisyui'),
        plugin(function ({ addVariant, e, postcss }) {
            addVariant('firefox', ({ container, separator }) => {
                const isFirefoxRule = postcss.atRule({
                    name: '-moz-document',
                    params: 'url-prefix()',
                });
                isFirefoxRule.append(container.nodes);
                container.append(isFirefoxRule);
                isFirefoxRule.walkRules((rule) => {
                    rule.selector = `.${e(
                        `firefox${separator}${rule.selector.slice(1)}`
                    )}`;
                });
            });
        }),
    ],
};
