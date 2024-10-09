import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Atoms/Button';
import styled from '@emotion/styled';
import { CampaignPreview } from './CampaignPreview';
import { useAppSelector } from '../Redux/hooks';
import { selectCampaignList } from '../Redux/CampaignSlice/campaignSelectors';
import { ICampaignObject } from '../Redux/Types/campaign';

export interface ICampaignListProps {
};

const StyledCampaignsWidgetWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
});

const StyledCampaignsHeader = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '24px',
    fontFamily: 'KingthingsPetrock',
});

const StyledCampaignsHeaderButtonWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
});

const StyledCampaignListWrapper = styled.div({
    display: 'flex',
    gap: '50px',
    flexWrap: 'wrap',
    maxHeight: '60vh',
    overflow: 'auto',
});

const StyledEmptyList = styled.div({
    fontSize: '24px',
    fontFamily: 'KingthingsPetrock',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
});

export const CampaignList: React.FC<ICampaignListProps> = () => {
    const campaignList: ICampaignObject[] = useAppSelector(selectCampaignList);

    return (
        <StyledCampaignsWidgetWrapper>
            <StyledCampaignsHeader>
                Your Campaigns
                <StyledCampaignsHeaderButtonWrapper>
                    <Link to="/create-campaign">
                        <Button>
                            Create a new campaign
                        </Button>
                    </Link>
                </StyledCampaignsHeaderButtonWrapper>
            </StyledCampaignsHeader>
            {
                campaignList.length === 0 ? (
                    <StyledEmptyList>
                        You have no campaigns
                        <Link to="/create-campaign">
                            <Button>
                                Create a new campaign
                            </Button>
                        </Link>
                    </StyledEmptyList>
                ) : (
                    <StyledCampaignListWrapper>
                        {campaignList.map((campaign) => (
                            <CampaignPreview 
                                key={campaign.id} 
                                name={campaign.name}
                                thumbnailURL={campaign.imageURL}
                                id={campaign.id}/>
                        ))}
                    </StyledCampaignListWrapper>
                )
            }
        </StyledCampaignsWidgetWrapper>
    );
};