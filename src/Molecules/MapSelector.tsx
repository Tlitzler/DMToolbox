import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { setSelectedMap } from '../Redux/CampaignSlice/actions/setSelectedCampaign';
import { selectMaps, selectSelectedMap } from '../Redux/CampaignSlice/campaignSelectors';
import editIcon from '../Theme/Images/editIcon.png';
import trashIcon from '../Theme/Images/trash.png';
import noPreview from '../Theme/Images/noPreview.png';
import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';
import { deleteMapThunk } from '../Redux/CampaignSlice/thunks/deleteMapThunk';

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
    width: '100%',
    borderBottom: active ? '2px solid #000000' : '1px solid #ccc',
}));

const StyledRowWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

const StyledIconButton = styled.img({
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
});

export interface IMapSelectorProps {
    handleEditMap: (mapId: number) => void;
};

const MapSelector = ({
    handleEditMap,
}: IMapSelectorProps) => {
    const maps = useAppSelector(selectMaps);
    const dispatch = useAppDispatch();
    const { id: selectedMapId } = useAppSelector(selectSelectedMap) || { id: '' };

    const [deleteMapId, setDeleteMapId] = useState<number | null>(null);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const handleMapSelection = (mapId: number) => {
        dispatch(setSelectedMap(mapId));
    }

    const handleDeleteMap = useCallback((mapId: number) => {
        dispatch(deleteMapThunk(mapId));
        setDeleteMapId(null);
        setConfirmDeleteVisible(false);
    }, []);

    return (
        <div>
            Map Selector
            {maps.map((map) => (
                <StyledRowWrapper key={map.id}>
                    <StyledMapOptionWrapper key={map.id} active={map.id === selectedMapId} onClick={() => handleMapSelection(map.id)}>
                        <img src={map.imageURL || noPreview} alt={map.name} style={{ width: '20px', height: '20px' }} />
                        <span>{map.name}</span>
                    </StyledMapOptionWrapper>
                    <StyledIconButton src={editIcon} alt="edit" onClick={() => handleEditMap(map.id)}/>
                    <StyledIconButton src={trashIcon} alt="delete" onClick={() => {
                        setDeleteMapId(map.id);
                        setConfirmDeleteVisible(true);
                    }}/>
                </StyledRowWrapper>
            ))}
            <Modal 
                isOpen={confirmDeleteVisible}
                onClose={() => setConfirmDeleteVisible(false)}
                width="300px" 
                height="200px">
                <div>
                    <Button onClick={() => deleteMapId && handleDeleteMap(deleteMapId)}>Confirm Delete</Button>
                    <Button onClick={() => {
                        setConfirmDeleteVisible(false);
                        setDeleteMapId(null);
                    }}>Cancel</Button>
                </div>
            </Modal>
        </div>
    );
}

export default MapSelector;