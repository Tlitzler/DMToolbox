import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';



const SplashPageContainer = () => {
  const theme = useTheme();
  
  const StyledContainer = styled.div({
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  });

  return (
    <StyledContainer>
      Splash page goes here in the future :)
    </StyledContainer>
  )
};

export default SplashPageContainer;