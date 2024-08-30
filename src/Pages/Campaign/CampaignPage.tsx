import React, { useState } from 'react';
import styled from '@emotion/styled';
import mapTest from '../../Theme/Images/mapTest.jpg';
import PageWrapper from '../../Molecules/PageWrapper';
import MapComponent from '../../Atoms/MapComponent';
import Toolbar, { IToolbarOption } from '../../Molecules/Toolbar';
import Draggable from '../../Atoms/Draggable';
import DiceRoller from '../../Molecules/DiceRoller';
import diceRow from '../../Theme/Images/diceRow.png';
import diceRowHover from '../../Theme/Images/diceRowHover.png';
import diceRowActive from '../../Theme/Images/diceRowActive.png';
import diceRowActiveHover from '../../Theme/Images/diceRowActiveHover.png';

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

const CampaignPage = () => {
  const [displayDiceRoller, setDisplayDiceRoller] = useState(false);
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
    <PageWrapper leftElement={<Toolbar options={toolbarOptions} location="left"/>}>
      <StyledContainer>
        <MapComponent imageSource={mapTest} />
      </StyledContainer>
    </PageWrapper>
  )
};

export default CampaignPage;