import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PageWrapper from '../../Molecules/PageWrapper';
import MapComponent from '../../Atoms/MapComponent';
import Toolbar, { IToolbarOption } from '../../Molecules/Toolbar';
import Draggable from '../../Atoms/Draggable';
import DiceRoller from '../../Molecules/DiceRoller';
import diceRow from '../../Theme/Images/diceRow.png';
import diceRowHover from '../../Theme/Images/diceRowHover.png';
import diceRowActive from '../../Theme/Images/diceRowActive.png';
import diceRowActiveHover from '../../Theme/Images/diceRowActiveHover.png';
import { useAppSelector } from '../../Redux/hooks';
import { selectSelectedCampaign, selectSelectedMap } from '../../Redux/CampaignSlice/campaignSelectors';
import Button from '../../Atoms/Button';
import MapEditor from '../../Molecules/MapEditor';
import { IMapObject } from '../../Redux/Types/campaign';
import Tabs, { ITabOption } from '../../Molecules/Tabs';
import MapSelector from '../../Molecules/MapSelector';

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

const StyledNoMapWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '10px',
});

const CampaignPage = () => {
    const campaign = useAppSelector(selectSelectedCampaign);
    const selectedMap = useAppSelector(selectSelectedMap);
    const [displayDiceRoller, setDisplayDiceRoller] = useState(false);
    const [displayMapEditor, setDisplayMapEditor] = useState(false);
    const [editingMap, setEditingMap] = useState<IMapObject | undefined>();
    
    const toolbarOptions: IToolbarOption[] = [
        {
            id: 'dice',
            component: (
                <Draggable key="dice" onClose={() => setDisplayDiceRoller(false)} defaultPosition={{x: 300, y: 0, width: 320, height: 200}}>
                    <DiceRoller/>
                </Draggable>
            ),
            onClick: () => setDisplayDiceRoller(!displayDiceRoller),
            visible: displayDiceRoller,
            imageSource: displayDiceRoller ? diceRowActive : diceRow,
            hoverSource: displayDiceRoller ? diceRowActiveHover : diceRowHover,
        },
        {
            text: editingMap ? 'Map Editor' : 'Map Creator',
            id: 'map',
            component: (
                <MapEditor 
                    key="map"
                    map={editingMap}
                    onClose={() => setDisplayMapEditor(false)}
                    />
            ),
            onClick: () => setDisplayMapEditor(!displayMapEditor),
            visible: displayMapEditor,
        }
    ]; 

    const tabOptions: ITabOption[] = [
        {
            id: 'campaign',
            label: 'Campaign',
            content: <div>Campaign Content</div>,
        },
        {
            id: 'maps',
            label: 'Maps',
            content: <MapSelector/>,
        },
    ];

    return (
        <PageWrapper 
            leftElement={<Toolbar options={toolbarOptions} location="left"/>}
            rightElement={<Tabs options={tabOptions}/>}>
            <StyledContainer>
                {selectedMap ? (
                    <MapComponent 
                        imageSource={selectedMap.imageURL}
                        hasGrid={!!selectedMap.width || !!selectedMap.height} 
                        gridColumns={selectedMap.width}
                        gridRows={selectedMap.height}/>
                ) : (
                    <StyledNoMapWrapper>
                        <span>
                            Map not found
                        </span>
                        <Button onClick={() => setDisplayMapEditor(true)} disabled={displayMapEditor}>
                            Add Map
                        </Button>
                    </StyledNoMapWrapper>
                )}
            </StyledContainer>
        </PageWrapper>
    )
};

export default CampaignPage;