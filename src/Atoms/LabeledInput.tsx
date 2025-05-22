import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';

export interface ILabeledInputProps {
    label?: string;
    value: string | number;
    onChange: (event: any) => void;
    width?: string;
    height?: string;
    type?: 'text' | 'password' | 'number' | 'longtext' | 'file';
    min?: number;
    max?: number;
    submitForm?: () => void;
    error?: string;
    disabled?: boolean;
};

interface IWrapperProps {
    width?: string;
    height: string;
}

const StyledInputWrapper = styled.div(({width, height}: IWrapperProps) => ({
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'column',
}));

const StyledInputLabel = styled.label({
    height: '20px',
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

interface IStyledInputProps {
    disabled?: boolean;
};

const StyledInput = styled.input(({disabled}: IStyledInputProps) => ({
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    height: '100%',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'default' : 'text',
    ":focus": {
    outline: '2px solid #C4A484',
    },
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
}));

const StyledTextArea = styled.textarea({
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    height: '100%',
    ":focus": {
    outline: '2px solid #C4A484',
    },
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
    resize: 'none',
});

const StyledErrorText = styled.label({
    color: '#ff3632',
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

const LabeledInput = ({
    label,
    value,
    onChange,
    width,
    height = '50px',
    type,
    min,
    max,
    submitForm,
    error,
    disabled,
}: ILabeledInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (disabled) return;
        onChange(event);
    }

    return (
        <StyledInputWrapper 
            height={height}
            width={width}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && submitForm) {
                    submitForm();
                }
            }}>
            {label && (
                <StyledInputLabel>
                    {label}
                </StyledInputLabel>
            )}
            {type === 'longtext' ? (
                <StyledTextArea 
                    value={value}
                    onChange={handleChange}/>
            ) : (
                <StyledInput 
                    disabled={disabled}
                    value={value}
                    onChange={handleChange}
                    type={type}
                    min={min}
                    max={max}/>
            )}
            {error && (
                <StyledErrorText>
                    {error}
                </StyledErrorText>
            )}
        </StyledInputWrapper>
    )
};

export default LabeledInput;