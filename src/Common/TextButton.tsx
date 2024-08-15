import React from 'react';
import styled from '@emotion/styled';

interface StyleProps {
  width: number;
  height: number;
  margin?: string;
};

const StyledButton = styled.button((props: StyleProps) => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  margin: props.margin || '20px 15px 20px 15px',
}));

export interface TextButtonProps {
  width?: number;
  height?: number;
  margin?: string;
  text?: string;
  onClick?: () => void;
};

const TextButton = ({
  width = 100,
  height = 40,
  text = '',
  margin,
  onClick = () => {},
}: TextButtonProps) => {
  return (
    <StyledButton
      width={width}
      height={height}
      margin={margin}
      onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default TextButton