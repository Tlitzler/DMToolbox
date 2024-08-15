import React from 'react';
import styled from '@emotion/styled';
import SplashPageContainer from '../SplashPage/SplashPageContainer';
import { Link } from 'react-router-dom';
import Logo from '../Common/Logo';
import TextButton from '../Common/TextButton';
import { selectAuthenticated } from '../Redux/UserSlice/userSelectors';
import { useAppSelector } from '../Redux/hooks';

const StyledContainer = styled.div({
  backgroundColor: '#f6efe4',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const StyledBanner = styled.div({
  backgroundColor: '#d9bb8c',
  height: '80px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0px 3px 5px 6px #543e1c',
  position: 'relative',
  zIndex: 10,
});

const StyledButtonContainer = styled.div({
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
});

const LogoWrapper = styled.div({
  margin: 'auto',
  marginLeft: '15px', 
});

const HomeContainer = () => {
  const authenticated = useAppSelector(selectAuthenticated);
  console.log('CUSTOM LOG authenticated', authenticated);

  return (
    <StyledContainer>
      <StyledBanner>
        <LogoWrapper>
          <Logo/>
        </LogoWrapper>

        {!!authenticated ? (
          <div>
            <StyledButtonContainer>
              <Link to="/profile">
                <TextButton text="Profile"/>
              </Link>
              
              <TextButton 
                text="Log out"
                onClick={() => console.log('Would be logging out')}/>
              
            </StyledButtonContainer>
          </div>
        ) : (
          <StyledButtonContainer>
            <Link to="/sign-up">
              <TextButton text="Sign up"/>
            </Link>
            
            
            <Link to="/login">
              <TextButton text="Log in"/>
            </Link>
            
          </StyledButtonContainer>
        )}
          
        
      </StyledBanner>
      
      <SplashPageContainer/>
    </StyledContainer>
  )
};

export default HomeContainer;