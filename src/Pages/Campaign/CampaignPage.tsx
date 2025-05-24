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
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectSelectedCampaign, selectSelectedMap } from '../../Redux/CampaignSlice/campaignSelectors';
import Button from '../../Atoms/Button';
import MapEditor from '../../Molecules/MapEditor';
import ItemEditor from '../../Molecules/ItemEditor';
import { IMapObject, IItemObject } from '../../Redux/Types/campaign';
import Tabs, { ITabOption } from '../../Molecules/Tabs';
import MapSelector from '../../Molecules/MapSelector';
import Selector from '../../Molecules/Selector';
import { deleteItemThunk } from '../../Redux/CampaignSlice/thunks/deleteItemThunk';
import { deleteMapThunk } from '../../Redux/CampaignSlice/thunks/deleteMapThunk';
import { setSelectedMap } from '../../Redux/CampaignSlice/actions/setSelectedCampaign';

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
    const dispatch = useAppDispatch();

    const campaign = useAppSelector(selectSelectedCampaign);
    const selectedMap = useAppSelector(selectSelectedMap);
    const [displayDiceRoller, setDisplayDiceRoller] = useState(false);
    const [displayMapEditor, setDisplayMapEditor] = useState(false);
    const [displayItemEditor, setDisplayItemEditor] = useState(false);
    const [editingMap, setEditingMap] = useState<IMapObject | undefined>();
    const [editingItem, setEditingItem] = useState<IItemObject | undefined>();
    
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
                    onClose={() => {
                        setDisplayMapEditor(false)
                        setEditingMap(undefined);
                    }}
                    />
            ),
            onClick: () => setDisplayMapEditor(!displayMapEditor),
            visible: displayMapEditor,
        },
        {
            text: 'Item Editor',
            id: 'item',
            component: (
                <ItemEditor 
                    key="item"
                    item={editingItem}
                    onClose={() => {
                        setDisplayItemEditor(false)
                        setEditingItem(undefined);
                    }}
                    defaultWidth={450}
                    defaultHeight={625}/>
            ),
            onClick: () => setDisplayItemEditor(!displayItemEditor),
            visible: displayItemEditor,
        }
    ]; 

    const handleEditMap = (mapId: number) => {
        setEditingMap(campaign.maps.find(map => map.id === mapId));
        setDisplayMapEditor(true);
    }

    const handleSelectMap = (mapId: number) => {
        dispatch(setSelectedMap(mapId));
    }

    const handleDeleteMap = (mapId: number) => {
        dispatch(deleteMapThunk(mapId));
        setEditingMap(undefined);
    }

    const handleEditItem = (itemId: number) => {
        setEditingItem(campaign.items.find(item => item.id === itemId));
        setDisplayItemEditor(true);
    }

    const handleDeleteItem = (itemId: number) => {
        dispatch(deleteItemThunk(itemId));
        setEditingItem(undefined);
    }

    const tabOptions: ITabOption[] = [
        {
            id: 'campaign',
            label: 'Campaign',
            content: <div>Campaign Content</div>,
        },
        {
            id: 'maps',
            label: 'Maps',
            content: <Selector
                        options={campaign.maps.map(map => ({
                            id: map.id,
                            name: map.name,
                            image: map.imageURL,
                        }))}
                        handleEdit={handleEditMap}
                        handleSelect={handleSelectMap}
                        selectedId={editingMap?.id ?? -1}
                        handleDelete={handleDeleteMap}/>,
        },
        {
            id: 'items',
            label: 'Items',
            content: <Selector
                        options={campaign.items.map(item => ({
                            id: item.id,
                            name: item.name,
                            image: item.imageURL,
                        }))}
                        handleEdit={handleEditItem}
                        handleSelect={handleEditItem}
                        selectedId={editingItem?.id ?? -1}
                        handleDelete={handleDeleteItem}/>,
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