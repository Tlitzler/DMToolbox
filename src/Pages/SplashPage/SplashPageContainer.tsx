import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import mapTest from '../../Theme/Images/mapTest.jpg';

const StyledContainer = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  fontFamily: 'KingthingsPetrock',
});

const StyledTestContent = styled.div({
  width: '60vw',
  height: '70vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SplashPageContainer = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
      <StyledTestContent>
        Nothing goes here yet! Hooray for splash pages! 🥳
      </StyledTestContent>
    </StyledContainer>
  )
};

export default SplashPageContainer;