import React from 'react';
import styled from '@emotion/styled';
import Backdrop from '../Atoms/Backdrop';
import Parchment from '../Atoms/Parchment';

export interface IPageWrapperProps {
    leftElement?: React.ReactNode;
    children?: React.ReactNode;
    rightElement?: React.ReactNode;
};

const StyledLeftWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90vh',
    width: '14vw',
    marginRight: '1vw',
});

const StyledRightWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    width: '14vw',
});

const StyledPageWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100vh',
    width: '100%',
});

const StyledContainer = styled.div({
    width: '65vw',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    margin: '10px 0px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarColor: '#aaaaaa transparent',
    scrollbarWidth: 'thin',
});

const PageWrapper = ({
    leftElement,
    children,
    rightElement,
}: IPageWrapperProps) => {

    return (
        <Backdrop>
            <StyledPageWrapper>
                <StyledLeftWrapper>
                    {leftElement}
                </StyledLeftWrapper>
                <Parchment>
                    <StyledContainer>
                        {children}
                    </StyledContainer>
                </Parchment>
                <StyledRightWrapper>
                    {rightElement}
                </StyledRightWrapper>
            </StyledPageWrapper>
        </Backdrop>
    );
};

export default PageWrapper;