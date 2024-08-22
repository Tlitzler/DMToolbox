import React from 'react';

import styled from '@emotion/styled';

import tabletop from '../Theme/Images/BlackYellowWood.jpg';

export interface IBackdropProps {
    children?: React.ReactNode;
};

const Backdrop = ({
    children,
}: IBackdropProps) => {
    const StyledBackdrop = styled.div({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundImage: `url(${tabletop})`,
        backgroundSize: 'cover',
    });

    return (
        <StyledBackdrop>
            {children}
        </StyledBackdrop>
    );
};

export default Backdrop;