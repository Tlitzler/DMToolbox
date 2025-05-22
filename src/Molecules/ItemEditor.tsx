import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Draggable from '../Atoms/Draggable';
import LabeledInput from '../Atoms/LabeledInput';
import ImageInput from '../Atoms/ImageInput';
import Button from '../Atoms/Button';
import { IItemObject } from '../Redux/Types/campaign';
import { useAppDispatch } from '../Redux/hooks';
import { addItemThunk } from '../Redux/CampaignSlice/thunks/addItemThunk';
import { updateItemThunk } from '../Redux/CampaignSlice/thunks/updateItemThunk';

export interface IItemEditorProps {
    item?: IItemObject;
    onClose: () => void;
    defaultWidth?: number;
    defaultHeight?: number;
}

const StyledItemEditorWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    height: 'calc(100% - 50px)',
});

const StyledContentWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    width: '425px',
    height: '200px',
});

const ItemEditor = ({ 
    item, 
    onClose, 
    defaultWidth = 450, 
    defaultHeight = 625, 
}: IItemEditorProps) => {
    const dispatch = useAppDispatch();

    const [itemName, setItemName] = useState(item?.name || '');
    const [itemDescription, setItemDescription] = useState(item?.description || '');
    const [itemImage, setItemImage] = useState(item?.imageURL || '');
    const [itemValue, setItemValue] = useState(item?.value || 0);

    const handleSubmit = useCallback(() => {
        // Handle the submission logic here, e.g., save the item to the store or API
        const newItem: IItemObject = {
            id: item?.id || -1,
            name: itemName,
            description: itemDescription,
            imageURL: itemImage,
            value: itemValue,
        };
        dispatch(newItem.id !== -1 ? updateItemThunk(newItem) : addItemThunk(newItem));
        // onClose();
    }, [itemName, itemDescription, itemImage, itemValue]);

    const handleCancel = useCallback(() => {
        onClose();
    }, []);

    return (
        <Draggable 
            onClose={onClose}
            defaultPosition={{ 
                x: 1.5 * defaultWidth, 
                y: -0.5 * defaultHeight,
                width: defaultWidth, 
                height: defaultHeight, 
            }}>
            <StyledItemEditorWrapper>
                <h1 style={{ fontFamily: 'KingthingsPetrock', fontSize: '24px', color: 'black' }}>Item Editor</h1>
                <LabeledInput 
                    width="200px"
                    label="Name" 
                    value={itemName} 
                    onChange={(event) => setItemName(event.target.value)} />
                <LabeledInput 
                    height="200px"
                    width="200px"
                    label="Description" 
                    type="longtext"
                    value={itemDescription} 
                    onChange={(event) => setItemDescription(event.target.value)} />
                <ImageInput 
                    height="175px"
                    width="350px"
                    label="Upload Item Image"
                    value={itemImage} 
                    onChange={(url) => setItemImage(url)} />
                <LabeledInput
                    width={`${(Math.trunc(Math.log10(itemValue || 1)) * 5) + 40}px`}
                    label="Value(gp)"
                    type="number"
                    value={itemValue}
                    onChange={(event) => setItemValue(Number(event.target.value))} />
                <StyledContentWrapper>
                    <Button width="100px" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button width="100px" onClick={handleSubmit}>
                        Save
                    </Button>
                </StyledContentWrapper>
            </StyledItemEditorWrapper>

        </Draggable>

    );
}

export default ItemEditor;