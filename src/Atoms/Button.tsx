import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useTheme, Theme } from '@emotion/react';

export interface IButtonProps {
    children?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'icon'; 
    onClick?: () => void;
    width?: number;
    height?: number;
    margin?: string;
};

interface IGeneralStyles {
    padding: string;
    borderRadius: string;
    border: string;
    cursor: string;
    width: string;
    height: string;
    margin: string;
};

interface IButtonStyleProps {
    generalStyles: IGeneralStyles; 
    theme: Theme;
};



const PrimaryButton = styled.button(({generalStyles, theme}: IButtonStyleProps) => ({
    backgroundColor: theme.colors.buttons.primary.background,
    color: theme.colors.buttons.primary.color,
    '&:hover': {
        backgroundColor: theme.colors.buttons.primary.hover,
    },
    '&:active': {
        backgroundColor: theme.colors.buttons.primary.active,
    },
    ...generalStyles,
}));

const SecondaryButton = styled.button(({generalStyles, theme}: IButtonStyleProps) => ({
    backgroundColor: theme.colors.buttons.secondary.background,
    color: theme.colors.buttons.secondary.color,
    '&:hover': {
        backgroundColor: theme.colors.buttons.secondary.hover,
    },
    '&:active': {
        backgroundColor: theme.colors.buttons.secondary.active,
    },
    ...generalStyles,
}));

const IconButton = styled.button(({generalStyles, theme}: IButtonStyleProps) => ({
    backgroundColor: theme.colors.buttons.icon.background,
    color: theme.colors.buttons.icon.color,
    '&:hover': {
        backgroundColor: theme.colors.buttons.icon.hover,
    },
    '&:active': {
        backgroundColor: theme.colors.buttons.icon.active,
    },
    ...generalStyles,
}));

const Button = ({
  children, 
  type, 
  onClick, 
  width, 
  height,
  margin,
}: IButtonProps) => {
    const theme = useTheme();

    const generalStyles = {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        margin: margin ? margin : '0',
    };

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    switch(type) {
        case 'secondary':
            return <SecondaryButton onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</SecondaryButton>;
        case 'icon':
            return <IconButton onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</IconButton>;
        case 'primary':
        default:
            return <PrimaryButton onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</PrimaryButton>;
    }
};

export default Button;