import { Theme } from "@emotion/react";

const themeList: Theme[] = [
    {
        colors: {
            primary: '#007bff',
            secondary: '#6c757d',
            background: '#fff5e7',
            banner: {
                background: '#ecdac0',
                shadow: '#5d554a',
            },
            text: {
                primary: '#000000',
                footer: 'gray',
                link: '#007bff',
            },
            buttons: {
                primary: {
                    background: '#303030',
                    color: '#ffffff',
                    hover: '#1f1f1f',
                    active: '#000000',
                },
                secondary: {
                    background: '#6c757d',
                    color: '#ffffff',
                    hover: '#5a6268',
                    active: '#7b8288',
                },
                icon: {
                    background: 'transparent',
                    color: '#000000',
                    hover: '#e0e0e0',
                    active: '#f5f5f5',
                },
            },
            // Add more color values here
        },
    },
];

export default themeList;