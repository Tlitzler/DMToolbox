import React, { useState } from 'react';
import styled from '@emotion/styled';
import mapTest from '../../Theme/Images/mapTest.jpg';
import PageWrapper from '../../Molecules/PageWrapper';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import Button from '../../Atoms/Button';
import { Link, useNavigate } from 'react-router-dom';
import { emptyCampaign } from '../../Redux/CampaignSlice/CampaignReducer/campaignsReducer';
import LabeledInput from '../../Atoms/LabeledInput';
import { ICampaignObject } from '../../Redux/Types/campaign';
import { selectUserId } from '../../Redux/UserSlice/userSelectors';
import ImageInput from '../../Atoms/ImageInput';
import { addCampaignThunk } from '../../Redux/CampaignSlice/thunks/addCampaignThunk';

const StyledContainer = styled.div({
  width: '100%',
  height: '100%',
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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = useAppSelector(selectUserId);
    const [campaign, setCampaign] = useState({...emptyCampaign});
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        loading: '',
    });

    const handleChange = (key: keyof ICampaignObject, value: string) => {
        setCampaign(prevValue => ({
            ...prevValue,
            [key]: value,
        }));
    }

    const validateCampaign = () => {
        let hasError = false;
        if(campaign.name === '') {
            hasError = true;
            errors.name = 'Campaign must have a name';
        }
        if (loading) {
            hasError = true;
            errors.loading = 'Image is still uploading';
        }
        setErrors(errors);
        return hasError;
    }

    const handleSubmit = () => {
        if (validateCampaign() || userId === undefined) return;
        const campaignObject: ICampaignObject = {
            ...campaign,
            userId: userId,
            imageURL: image,
        }
        dispatch(addCampaignThunk(campaignObject));
        navigate('/campaign');
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
                    error={errors.name}
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
                <ImageInput
                    height="175px"
                    width="350px"
                    label="Upload Campaign Thumbnail"
                    value={image}
                    setLoading={setLoading}
                    onChange={(url) => setImage(url)}
                    submitForm={handleSubmit}
                    error={errors.loading}/>
                <StyledButtonContainer>
                    <Link to="/campaigns">
                        <Button>
                            Cancel
                        </Button>
                    </Link>
                    <Button onClick={handleSubmit} disabled={loading}>
                        Submit
                    </Button>        
                </StyledButtonContainer>
            </StyledContainer>
        </PageWrapper>
    )
};

export default CampaignCreatorPage;