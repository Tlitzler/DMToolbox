import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useTheme, Theme } from '@emotion/react';

export interface IButtonProps {
    children?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'icon' | 'text' | 'image'; 
    onClick?: () => void;
    width?: string;
    height?: string;
    margin?: string;
    imageSource?: string;
    hoverSource?: string;
    disabled?: boolean;
};

interface IGeneralStyles {
    padding: string;
    borderRadius: string;
    border: string;
    cursor: string;
    width: string;
    height: string;
    margin: string;
    fontFamily?: string;
};

interface IButtonStyleProps {
    generalStyles: IGeneralStyles; 
    theme: Theme;
    imageSource?: string;
    hoverSource?: string;
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

const TextButton = styled.button(({generalStyles, theme}: IButtonStyleProps) => ({
    background: 'transparent',
    '&:hover': {
        color: theme.colors.buttons.icon.hover,
    },
    '&:active': {
        backgroundColor: theme.colors.buttons.icon.active,
    },
    fontSize: '150%',
    ...generalStyles,
}));

const ImageButton = styled.button(({generalStyles, theme, imageSource, hoverSource}: IButtonStyleProps) => ({
    backgroundColor: 'transparent',
    backgroundImage: `url(${imageSource})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:hover': {
        backgroundImage: `url(${hoverSource})`,
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
    imageSource,
    hoverSource,
    disabled,
}: IButtonProps) => {
    const theme = useTheme();

    const generalStyles = {
        padding: type === 'text' ? '0' : '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        width: width ? width : 'auto',
        height: height ? height : 'auto',
        margin: margin ? margin : '0',
        fontFamily: 'KingthingsPetrock',
    };

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    switch(type) {
        case 'secondary':
            return <SecondaryButton disabled={disabled} onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</SecondaryButton>;
        case 'icon':
            return <IconButton disabled={disabled} onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</IconButton>;
        case 'text':
            return <TextButton disabled={disabled} onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</TextButton>;
        case 'image':
            return <ImageButton disabled={disabled} onClick={handleClick} generalStyles={generalStyles} theme={theme} imageSource={imageSource} hoverSource={hoverSource}>{children}</ImageButton>;
        case 'primary':
        default:
            return <PrimaryButton disabled={disabled} onClick={handleClick} generalStyles={generalStyles} theme={theme}>{children}</PrimaryButton>;
    }
};

export default Button;