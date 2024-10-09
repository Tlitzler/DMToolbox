import React from 'react';
import styled from '@emotion/styled';
import noPreview from '../Theme/Images/noPreview.png';
import ornateBorder from '../Theme/Images/ornateBorder.png';
import { setSelectedCampaign } from '../Redux/CampaignSlice/actions/setSelectedCampaign';
import { useAppDispatch } from '../Redux/hooks';
import { useNavigate } from 'react-router-dom';

export interface ICampaignPreviewProps {
    name: string;
    thumbnailURL?: string;
    id: number;
};

const StyledCampaignPreviewWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    height: '250px',
    backgroundImage: `url(${ornateBorder})`,
    backgroundSize: '250px 250px',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
});

const StyledCampaignTitle = styled.a({
    width: 'max-content',
    fontSize: '25px',
    fontFamily: 'KingthingsPetrock',
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    ':hover': {
        textDecoration: 'underline',
    },
});

const StyledCampaignImage = styled.img({
    width: '150px',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    objectFit: 'contain',
    cursor: 'pointer',
});

export const CampaignPreview: React.FC<ICampaignPreviewProps> = ({
    name,
    id,
    thumbnailURL,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(setSelectedCampaign(id));
        navigate('/campaign');
    };

    return (
        <StyledCampaignPreviewWrapper>
            <StyledCampaignTitle onClick={handleClick}>{name}</StyledCampaignTitle>
            <StyledCampaignImage onClick={handleClick} src={thumbnailURL || noPreview}/>
        </StyledCampaignPreviewWrapper>
    );
}