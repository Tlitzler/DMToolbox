import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

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

const SplashPageContainer = () => {
  const theme = useTheme();

  return (
    <StyledContainer>
      Splash page goes here
    </StyledContainer>
  )
};

export default SplashPageContainer;