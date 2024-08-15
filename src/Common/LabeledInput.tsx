import React from 'react';
import styled from '@emotion/styled';

export interface LabeledInputProps {
  label?: string;
  value: string;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
  width?: number;
  height?: number;
  hideText?: boolean;
};

interface WrapperProps {
  width?: number;
  height: number;
}

const StyledInputWrapper = styled.div((props: WrapperProps) => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledInputLabel = styled.label({
  height: '20px',
});

const StyledInput = styled.input({
  height: '100%',
});

const LabeledInput = ({
  label,
  value,
  handleChange,
  width,
  height = 50,
  hideText,
}: LabeledInputProps) => {
  return (
    <StyledInputWrapper 
      height={height}
      width={width}>
        {label && (
          <StyledInputLabel>
            {label}
          </StyledInputLabel>
        )}
        <StyledInput 
          value={value}
          onChange={handleChange}
          type={hideText ? 'password' : 'false'}/>
    </StyledInputWrapper>
  )
};

export default LabeledInput;