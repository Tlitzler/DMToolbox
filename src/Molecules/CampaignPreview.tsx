import React from 'react';
import { ICampaignObject } from '../Redux/Types/campaign';

export interface ICampaignPreviewProps {
    campaign: ICampaignObject;
};

export const CampaignPreview: React.FC<ICampaignPreviewProps> = ({
    campaign,
}) => {
    return (
        <div>
            <h1>Campaign Preview</h1>
            <p>This is a campaign preview</p>
        </div>
    );
}