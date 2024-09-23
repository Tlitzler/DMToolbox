import React from 'react';
import styled from '@emotion/styled';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';

export interface ILabeledInputProps {
    label?: string;
    value: string | number;
    onChange: (event: any) => void;
    width?: string;
    height?: string;
    type?: 'text' | 'password' | 'number' | 'longtext';
    min?: number;
    max?: number;
    submitForm?: () => void;
    error?: string;
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

const StyledInput = styled.input({
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    height: '100%',
    ":focus": {
    outline: '2px solid #C4A484',
    },
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

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
}: ILabeledInputProps) => {
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
                    onChange={onChange}/>
            ) : (
                <StyledInput 
                    value={value}
                    onChange={onChange}
                    type={type}
                    min={min}
                    max={max}/>
            )}
        </StyledInputWrapper>
    )
};

export default LabeledInput;