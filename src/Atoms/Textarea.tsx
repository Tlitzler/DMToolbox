import React from 'react';

import styled from '@emotion/styled';

export interface ITextAreaProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
};

interface IStyledTextAreaProps {
    width?: string;
    height?: string;
};

const StyledTextArea = styled.div(({width, height}: IStyledTextAreaProps) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: width,
    height: height,
    padding: '10px',
    fontFamily: 'KingthingsPetrock',
    fontSize: '1rem',
    border: '1px solid #000',
    resize: 'none',
    overflow: 'auto',
    scrollbarColor: '#aaaaaa transparent',
    scrollbarWidth: 'thin',
    backgroundColor: 'transparent',
    color: 'inherit',
    '&:focus': {
        outline: 'none',
    },
}));

const TextArea = ({
    children,
    width,
    height,
}: ITextAreaProps) => {
    return (
        <StyledTextArea width={width} height={height}>
            {children}
        </StyledTextArea>
    );
};

export default TextArea;