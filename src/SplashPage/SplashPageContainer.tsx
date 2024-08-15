import styled from '@emotion/styled';

const StyledContainer = styled.div({
  backgroundColor: '#ecdbc1',
  width: '100%',
  height: '100%',
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

const SplashPageContainer = () => {
  return (
    <StyledContainer>
      Splash page goes here in the future :)
    </StyledContainer>
  )
};

export default SplashPageContainer;