import React, { useState } from 'react';
import styled from '@emotion/styled';
import SplashPageContainer from '../SplashPage/SplashPageContainer';
import { Link } from 'react-router-dom';
import Logo from '../../Atoms/Logo';
import Button from '../../Atoms/Button';
import { selectAuthenticated } from '../../Redux/UserSlice/userSelectors';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import PageWrapper from '../../Molecules/PageWrapper';
import { logout } from '../../Redux/UserSlice/actions/logout';
import { CampaignList } from '../../Molecules/CampaignList';

const StyledContainer = styled.div({
    width: '65vw',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    margin: '10px 0px',
});

const StyledBanner = styled.div({
    height: '80px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
    paddingBottom: '10px',
    borderBottom: '1px solid black',
});

const StyledButtonContainer = styled.div({
    width: '300px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
});

const LogoWrapper = styled.div({
    margin: 'auto',
    marginLeft: '15px', 
});

const HomeContainer = () => {
    const authenticated = useAppSelector(selectAuthenticated);
    const dispatch = useAppDispatch();

    return (
        <PageWrapper>
            {!!authenticated ? (
                <StyledContainer>
                    <StyledBanner>
                        <LogoWrapper>
                            <Logo/>
                        </LogoWrapper>
                        <StyledButtonContainer>
                            <Link to="/profile">
                                <Button margin="20px auto">
                                    Profile
                                </Button>
                            </Link>
                            <Button height="35px" onClick={() => dispatch(logout())}>
                                Log out
                            </Button>
                        </StyledButtonContainer>
                    </StyledBanner>
                    <CampaignList/>
                </StyledContainer>
                ) : (
                <StyledContainer>
                    <StyledBanner>
                        <LogoWrapper>
                            <Logo/>
                        </LogoWrapper>
                        <StyledButtonContainer>
                            <Link to="/sign-up">
                                <Button margin="20px auto">
                                    Sign up
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button margin="20px auto">
                                    Log in
                                </Button>
                            </Link>
                        </StyledButtonContainer>
                    </StyledBanner>
                    <SplashPageContainer/>
                </StyledContainer>
            )}
        </PageWrapper>
    )
};

export default HomeContainer;