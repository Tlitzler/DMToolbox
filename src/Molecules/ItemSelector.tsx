import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { selectItems } from '../Redux/CampaignSlice/campaignSelectors';
import editIcon from '../Theme/Images/editIcon.png';
import trashIcon from '../Theme/Images/trash.png';
import noPreview from '../Theme/Images/noPreview.png';
import { deleteItemThunk } from '../Redux/CampaignSlice/thunks/deleteItemThunk';
import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';

const StyledItemOptionWrapper = styled.div({
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
    borderBottom: '1px solid #ccc',
});

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
    margin: '5px',
});

export interface IItemSelectorProps {
    handleEditItem: (itemId: number) => void;
    handleSelectItem: (itemId: number) => void;
};

const ItemSelector = ({
    handleEditItem,
    handleSelectItem,
}: IItemSelectorProps) => {
    const items = useAppSelector(selectItems);
    const dispatch = useAppDispatch();

    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

    const handleDeleteItem = useCallback((itemId: number) => {
        dispatch(deleteItemThunk(itemId));
        setDeleteItemId(null);
        setConfirmDeleteVisible(false);
    }, []);

    return (
        <div>
            Item Selector
            {items.map((item) => (
                <StyledRowWrapper key={item.id}>
                    <StyledItemOptionWrapper key={item.id} onClick={() => handleSelectItem(item.id)}>
                        <img src={item.imageURL || noPreview} alt={item.name} style={{ width: '20px', height: '20px' }} />
                        <span>{item.name}</span>
                    </StyledItemOptionWrapper>
                    <StyledIconButton src={editIcon} alt="edit" onClick={() => handleEditItem(item.id)}/>
                    <StyledIconButton src={trashIcon} alt="delete" onClick={() => {
                        setDeleteItemId(item.id);
                        setConfirmDeleteVisible(true);
                    }}/>
                </StyledRowWrapper>
            ))}
            <Modal isOpen = {confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} width="300px" height="200px">
                <div>
                    <Button onClick={() => deleteItemId && handleDeleteItem(deleteItemId)}>Confirm Delete</Button>
                    <Button onClick={() => {
                        setConfirmDeleteVisible(false);
                        setDeleteItemId(null);
                    }}>Cancel</Button>
                </div>
            </Modal>
        </div>
    );
}

export default ItemSelector;