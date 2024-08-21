import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primary: string;
            secondary: string;
            background: string;
            banner: {
                background: string;
                shadow: string;
            };
            text: {
                primary: string;
                footer: string;
                link: string;
            };
            buttons: {
                primary: {
                    background: string;
                    color: string;
                    hover: string;
                    active: string;
                };
                secondary: {
                    background: string;
                    color: string;
                    hover: string;
                    active: string;
                };
                icon: {
                    background: string;
                    color: string;
                    hover: string;
                    active: string;
                };
            };
            // Add more color values here
        };
    }
}