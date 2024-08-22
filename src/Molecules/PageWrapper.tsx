import React from 'react';
import styled from '@emotion/styled';
import Backdrop from '../Atoms/Backdrop';
import Parchment from '../Atoms/Parchment';

export interface IPageWrapperProps {
    leftElement?: React.ReactNode;
    children?: React.ReactNode;
    rightElement?: React.ReactNode;
};

const PageWrapper = ({
    leftElement,
    children,
    rightElement,
}: IPageWrapperProps) => {
    const StyledLeftWrapper = styled.div({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90vh',
        width: '15vw',
    });

    const StyledRightWrapper = styled.div({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90vh',
        width: '15vw',
    });

    const StyledPageWrapper = styled.div({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '90vh',
        width: '100%',
    });

    const StyledContainer = styled.div({
        width: '65vw',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        margin: '10px 0px',
      });

    return (
        <Backdrop>
            <StyledPageWrapper>
                <div>
                    {leftElement}
                </div>
                <Parchment>
                    <StyledContainer>
                        {children}
                    </StyledContainer>
                </Parchment>
                <div>
                    {rightElement}
                </div>
            </StyledPageWrapper>
        </Backdrop>
    );
};

export default PageWrapper;