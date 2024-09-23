import React, { useState } from 'react';
import styled from '@emotion/styled';
import mapTest from '../../Theme/Images/mapTest.jpg';
import PageWrapper from '../../Molecules/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import Button from '../../Atoms/Button';
import { Link } from 'react-router-dom';
import { emptyCampaign } from '../../Redux/CampaignSlice/CampaignReducer/campaignsReducer';
import LabeledInput from '../../Atoms/LabeledInput';
import { ICampaignObject } from '../../Redux/Types/campaign';
import { selectUserId } from '../../Redux/UserSlice/userSelectors';

const StyledContainer = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
  zIndex: 0,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'KingthingsPetrock',
  gap: '20px',
});

const StyledHeader = styled.h1({
    fontSize: '30px',
    fontFamily: 'KingthingsPetrock',
});

const StyledButtonContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
});

const CampaignCreatorPage = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUserId);
    const [campaign, setCampaign] = useState({...emptyCampaign, userId: userId});
    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });

    const handleChange = (key: keyof ICampaignObject, value: string) => {
        setCampaign(prevValue => ({
            ...prevValue,
            [key]: value,
        }));
    }

    const validateCampaign = () => {
        let hasError = false;
        if(campaign.name === ''){
            hasError = true;
            errors.name = 'Campaign must have a name';
        }
        setErrors(errors);
        return hasError;
    }

    const handleSubmit = () => {
        if (validateCampaign()) return;
        console.log('CUSTOM LOG submitting campaign', campaign);
    }

    return (
        <PageWrapper>
            <StyledContainer>
                <StyledHeader>
                    Create New Campaign 
                </StyledHeader>
                <LabeledInput
                    height="60px"
                    width="200px"
                    label="Campaign Title"
                    value={campaign.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    submitForm={handleSubmit}
                    />
                <LabeledInput
                    type="longtext"
                    height="200px"
                    width="400px"
                    label="Campaign Description"
                    value={campaign.description}
                    onChange={(event) => handleChange('description', event.target.value)}
                    submitForm={handleSubmit}
                    />
                <StyledButtonContainer>
                    <Link to="/campaigns">
                        <Button>
                            Cancel
                        </Button>
                    </Link>
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </StyledButtonContainer>
            </StyledContainer>
        </PageWrapper>
    )
};

export default CampaignCreatorPage;