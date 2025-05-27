import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Draggable from '../Atoms/Draggable';
import LabeledInput from '../Atoms/LabeledInput';
import ImageInput from '../Atoms/ImageInput';
import Button from '../Atoms/Button';
import Checkbox from '../Atoms/Checkbox';
import Dropdown from '../Atoms/Dropdown';
import { IHazardObject } from '../Redux/Types/campaign';
import { useAppDispatch } from '../Redux/hooks';
import { addHazardThunk } from '../Redux/CampaignSlice/thunks/addHazardThunk';
import { updateHazardThunk } from '../Redux/CampaignSlice/thunks/updateHazardThunk';

export interface IHazardEditorProps {
    hazard?: IHazardObject;
    onClose: () => void;
    defaultWidth?: number;
    defaultHeight?: number;
};

const StyledHazardEditorWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    height: 'calc(100% - 50px)',
});

const StyledContentRowWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'bottom',
    justifyContent: 'center',
    width: '100%',
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

const hazardTypes = [
    'Visibility/Sensory',
    'Creature',
    'Environmental',
    'Other',
];

const HazardEditor = ({
    hazard,
    onClose,
    defaultWidth = 450,
    defaultHeight = 625,
}: IHazardEditorProps) => {
    const dispatch = useAppDispatch();

    const [hazardName, setHazardName] = useState(hazard?.name || '');
    const [hazardType, setHazardType] = useState(hazard?.type || '');
    const [hazardDescription, setHazardDescription] = useState(hazard?.description || '');
    const [hazardImage, setHazardImage] = useState(hazard?.imageURL || '');
    const [hazardMultiplier, setHazardMultiplier] = useState(!!hazard?.multiplier);
    const [hazardChallengeModifier, setHazardChallengeModifier] = useState(hazard?.challengeModifier || 1);

    const handleSubmit = useCallback(() => {
        // Handle the submission logic here, e.g., save the hazard to the store or API
        const newHazard: IHazardObject = {
            id: hazard?.id || -1,
            name: hazardName,
            type: hazardType,
            description: hazardDescription,
            imageURL: hazardImage,
            multiplier: hazardMultiplier,
            challengeModifier: hazardChallengeModifier,
        };
        dispatch(newHazard.id !== -1 ? updateHazardThunk(newHazard) : addHazardThunk(newHazard));
        onClose();

        console.log('Hazard submitted:', newHazard);
    }, [dispatch, hazard, hazardName, hazardDescription, hazardImage, hazardType, hazardMultiplier, hazardChallengeModifier, onClose]);

    return (
        <Draggable 
            onClose={onClose}
            defaultPosition={{ 
                x: 1.5 * defaultWidth, 
                y: -0.5 * defaultHeight,
                width: defaultWidth, 
                height: defaultHeight, 
            }}>
            <StyledHazardEditorWrapper>
                <LabeledInput
                    width="200px"
                    label="Name"
                    value={hazardName}
                    onChange={(e) => setHazardName(e.target.value)}
                />
                <Dropdown
                    options={hazardTypes.map(type => ({value: type, text: type}))}
                    onChange={(event) => setHazardType(event.target.value)}/>
                <LabeledInput
                    height="200px"
                    width="200px"
                    label="Description" 
                    type="longtext"
                    value={hazardDescription}
                    onChange={(e) => setHazardDescription(e.target.value)}
                />
                <ImageInput
                    height="175px"
                    width="350px"
                    label="Image URL"
                    value={hazardImage}
                    onChange={(url) => setHazardImage(url)}
                />
                <span>Challenge Multiplier</span>
                <StyledContentRowWrapper>
                    <LabeledInput
                        width="50px"
                        height="25px"
                        label=""
                        type="number"
                        value={hazardChallengeModifier}
                        onChange={(e) => setHazardChallengeModifier(Number(e.target.value))}
                        step={.05}
                    />
                    <Checkbox
                        label="Multiplier"
                        value={hazardMultiplier}
                        onChange={(val: boolean) => setHazardMultiplier(val)}
                    />
                </StyledContentRowWrapper>
                <StyledContentWrapper>
                    <Button width="100px" onClick={onClose}>Cancel</Button>
                    <Button width="100px" onClick={handleSubmit}>Save</Button>
                </StyledContentWrapper>
            </StyledHazardEditorWrapper>
        </Draggable>
    );
}

export default HazardEditor;