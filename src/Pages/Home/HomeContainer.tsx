import React from 'react';
import styled from '@emotion/styled';
import SplashPageContainer from '../SplashPage/SplashPageContainer';
import { Link } from 'react-router-dom';
import Logo from '../../Atoms/Logo';
import Button from '../../Atoms/Button';
import { selectAuthenticated } from '../../Redux/UserSlice/userSelectors';
import { useAppSelector } from '../../Redux/hooks';
import { useTheme } from '@emotion/react';

const HomeContainer = () => {
  const theme = useTheme();

  const StyledContainer = styled.div({
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  });
  
  const StyledBanner = styled.div({
    backgroundColor: theme.colors.banner.background,
    height: '80px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0px 3px 5px 4px ${theme.colors.banner.shadow}`,
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
                <Button margin="20px auto">
                  Profile
                </Button>
              </Link>

              <Button onClick={() => console.log('Would be logging out')}>
                Log out
              </Button>
              
            </StyledButtonContainer>
          </div>
        ) : (
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
        )}
        
      </StyledBanner>
      
      <SplashPageContainer/>
    </StyledContainer>
  )
};

export default HomeContainer;