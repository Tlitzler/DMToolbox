import React, { useState } from 'react';
import styled from '@emotion/styled';
import SplashPageContainer from '../SplashPage/SplashPageContainer';
import { Link } from 'react-router-dom';
import Logo from '../../Atoms/Logo';
import Button from '../../Atoms/Button';
import { selectAuthenticated } from '../../Redux/UserSlice/userSelectors';
import { useAppSelector } from '../../Redux/hooks';
import PageWrapper from '../../Molecules/PageWrapper';

const StyledContainer = styled.div({
  width: '65vw',
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
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
});

const StyledButtonContainer = styled.div({
  width: '300px',
  display: 'flex',
  justifyContent: 'space-around',
});

const LogoWrapper = styled.div({
  margin: 'auto',
  marginLeft: '15px', 
});

const HomeContainer = () => {
  const authenticated = useAppSelector(selectAuthenticated);
  console.log('CUSTOM LOG authenticated', authenticated);

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
                <Button onClick={() => console.log('Would be logging out')}>
                  Log out
                </Button>
              </StyledButtonContainer>
            </StyledBanner>
            <Link to="/campaign">
              <Button>
                Create a new campaign
              </Button>
            </Link>
            Your Campaigns: 
            <div>
              Campaigns go here
              <Link to="/campaign">
                <Button>
                  This is a dummy campaign, click to view
                </Button>
              </Link>
            </div>
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