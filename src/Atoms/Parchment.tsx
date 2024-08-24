import React from 'react';

import styled from '@emotion/styled';
import ParchmentBorder from '../Theme/Images/ParchmentBorder.svg';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';

export interface IParchmentProps {
    children?: React.ReactNode;
    margin?: string;
};

const StyledParchmentWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
});

interface IStyledParchmentProps {
    margin?: string;
};

const StyledParchment = styled.div(({margin}: IStyledParchmentProps) => ({
    position: 'fixed',
    left: '15%',
    width: '70%',
    height: '99%',
    backgroundColor: '#fffef0',
    borderRadius: '5px',
    overflow: 'auto',
    boxShadow: '2px 3px 20px black, 0 0 125px #8f5922 inset', 
    filter: `url(${ParchmentBorder}#waves)`,
    backgroundImage: `url(${ParchmentTexture})`,
    margin: margin ? margin : '0',
    zIndex: -1,
}));

const Parchment = ({
    children,
    margin,
}: IParchmentProps) => {

    return (
        <StyledParchmentWrapper>
            <StyledParchment margin={margin}/>
            {children}
        </StyledParchmentWrapper>
    );
};

export default Parchment;