import React, { useState } from 'react';
import styled from '@emotion/styled';
import SplashPageContainer from '../SplashPage/SplashPageContainer';
import { Link } from 'react-router-dom';
import Logo from '../../Atoms/Logo';
import Button from '../../Atoms/Button';
import { selectAuthenticated } from '../../Redux/UserSlice/userSelectors';
import { useAppSelector } from '../../Redux/hooks';
import PageWrapper from '../../Molecules/PageWrapper';
import Toolbar, { IToolbarOption } from '../../Molecules/Toolbar';
import Draggable from '../../Atoms/Draggable';
import DiceRoller from '../../Molecules/DiceRoller';
import diceRow from '../../Theme/Images/diceRow.png';
import diceRowHover from '../../Theme/Images/diceRowHover.png';
import diceRowActive from '../../Theme/Images/diceRowActive.png';
import diceRowActiveHover from '../../Theme/Images/diceRowActiveHover.png';

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

const StyledWidgetWrapper = styled.div({
  zIndex: 100,
});

const HomeContainer = () => {
  const [displayDiceRoller, setDisplayDiceRoller] = useState(false);

  const authenticated = useAppSelector(selectAuthenticated);
  console.log('CUSTOM LOG authenticated', authenticated);

  const toolbarOptions: IToolbarOption[] = [
    {
      text: 'Dice Roller',
      id: 'dice',
      component: (
        <Draggable key={'dice'} onClose={() => setDisplayDiceRoller(false)} defaultPosition={{x: 300, y: 0, width: 320, height: 200}}>
          <DiceRoller/>
        </Draggable>
      ),
      onClick: () => setDisplayDiceRoller(!displayDiceRoller),
      visible: displayDiceRoller,
      imageSource: displayDiceRoller ? diceRowActive : diceRow,
      hoverSource: displayDiceRoller ? diceRowActiveHover : diceRowHover,
    },
  ]; 

  return (
    <>
      <PageWrapper leftElement={<Toolbar options={toolbarOptions} location="left"/>}>
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
        <StyledWidgetWrapper>
      </StyledWidgetWrapper>
      </PageWrapper>


    </>
  )
};

export default HomeContainer;