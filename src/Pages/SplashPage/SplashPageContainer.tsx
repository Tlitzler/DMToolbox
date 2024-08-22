import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';


const SplashPageContainer = () => {
  const theme = useTheme();
  
  const StyledContainer = styled.div({
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return (
    <StyledContainer>
      Splash page goes here
      {/* <Backdrop>
        <Parchment>
          Splash page goes here in the future :)
        </Parchment>
      </Backdrop> */}
    </StyledContainer>
  )
};

export default SplashPageContainer;