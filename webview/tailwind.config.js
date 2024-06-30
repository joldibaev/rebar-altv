/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '../src/plugins/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            display: 'Jost',
            sans: 'Roboto',
        },
        colors: {
            transparent: 'transparent',
            primary: '#45f882',
            secondary: '#ffbe18',
            danger: '#ED5050',
            success: '#3FCA90',
            warning: '#EDCB50',
            info: '#3F7FCA',
            muted: '#adb0bc',
            dark: {
                1: '#0f161b',
                2: '#201f2a',
                3: '#0b0e13',
                4: '#10181f',
                5: '#090d10',
                6: '#050506',
                7: '#040608',
                8: '#0d141b',
                9: '#111922',
            },
            white: '#fff',
        },
        extend: {
            animation: {
                fadein: 'fadeIn .5s ease-in-out',
                fadeout: 'fadeOut .5s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                fadeOut: {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
            },
        },
    },
    plugins: [
        function ({ addBase, theme }) {
            // Function to convert hex color to RGB
            const hexToRgb = (hex) => {
                const bigint = parseInt(hex.replace('#', ''), 16);
                const r = (bigint >> 16) & 255;
                const g = (bigint >> 8) & 255;
                const b = bigint & 255;

                return `${r}, ${g}, ${b}`;
            };

            // Get all theme colors
            const colors = theme('colors');

            // Create CSS variables for each color
            const colorVariables = Object.entries(colors).reduce((vars, [name, color]) => {
                if (typeof color === 'string') {
                    vars[`--color-${name}-rgb`] = hexToRgb(color);
                    vars[`--color-${name}`] = color;
                } else {
                    Object.entries(color).forEach(([shade, shadeColor]) => {
                        vars[`--color-${name}-${shade}-rgb`] = hexToRgb(shadeColor);
                        vars[`--color-${name}-${shade}`] = shadeColor;
                    });
                }
                return vars;
            }, {});

            addBase({
                ':root': colorVariables,
            });
        },
    ],
};
