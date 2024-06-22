/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1240px',
                '2xl': '1496px',
            },
        },
        extend: {
            colors: {
                primary: '#e83c7e',
                greenHome: '#D2B4DE',
                grayLine: '#747474',
                textPrimary: 'pink-500',
                //   blueAnt: '#1890FF',
                pinkAnt: '#e83c7e',
            },
        },
    },
    extend: {
        transitionProperty: {
            height: 'height',
        },
        color: {
            primary: 'white',
        },
    },
    plugins: [],
};
