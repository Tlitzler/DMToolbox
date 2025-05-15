import React from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { setSelectedMap } from '../Redux/CampaignSlice/actions/setSelectedCampaign';
import { selectMaps, selectSelectedMap } from '../Redux/CampaignSlice/campaignSelectors';

interface IStyledMapOptionWrapperProps {
    active?: boolean;
};

const StyledMapOptionWrapper = styled.div(({ active }: IStyledMapOptionWrapperProps) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'KingthingsPetrock',
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
    borderBottom: active ? '2px solid #000000' : '1px solid #ccc',
}));

export interface IMapSelectorProps {

};

const MapSelector = () => {
    const maps = useAppSelector(selectMaps);
    const dispatch = useAppDispatch();
    const { id: selectedMapId } = useAppSelector(selectSelectedMap) || { id: '' };

    const handleMapSelection = (mapId: number) => {
        dispatch(setSelectedMap(mapId));
    }

    return (
        <div>
            Map Selector
            {maps.map((map) => (
                <StyledMapOptionWrapper key={map.id} active={map.id === selectedMapId} onClick={() => handleMapSelection(map.id)}>
                    <img src={map.imageURL} alt={map.name} style={{ width: '20px', height: '20px' }} />
                    <span>{map.name}</span>
                </StyledMapOptionWrapper>
            ))}
        </div>
    );
}

export default MapSelector;