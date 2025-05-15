import React from 'react';
import styled from '@emotion/styled';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';

export interface ITabOption {
    id: string;
    label: string;
    icon?: string;
    content: React.ReactNode;
}

export interface ITabsProps {
    options: ITabOption[];
}

const StyledTabsWrapper = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});

const StyledTabList = styled.div({
    display: 'flex',
    borderBottom: '1px solid #ccc',
});

interface IStyledTabProps {
    isActive: boolean;
    width?: string;
}

const StyledTab = styled.div<IStyledTabProps>(({ isActive, width }) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    fontFamily: 'KingthingsPetrock, sans-serif',
    width: width || 'auto',
    backgroundColor: isActive ? '#f0f0f0' : '#fffef0',
    borderBottom: isActive ? '2px solid #000000' : 'none',
    backgroundImage: `url(${ParchmentTexture})`,
    boxShadow: '0 10px 10px -5px #8f5922 inset',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& img': {
        width: '16px',
        height: '16px',
    },
}));

const StyledTabContent = styled.div({
    padding: '20px',
    flexGrow: 1,
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    boxShadow: '2px 3px 20px black, 0 -10px 10px -5px #8f5922 inset', 
    borderTop: 'none',
});

const Tabs = ({
    options,
}: ITabsProps) => {
    const [activeTab, setActiveTab] = React.useState<string>(options[0].id);

    const tabWidth = `${Math.max(100 / options.length, 20)}%`;

    const overflow = options.length > 5;

    return (
        <StyledTabsWrapper>
            <StyledTabList>
                {options.map((option) => (
                    <StyledTab 
                        width={tabWidth}
                        key={option.id} 
                        isActive={activeTab === option.id}
                        onClick={() => setActiveTab(option.id)}>
                        {option.icon && <img src={option.icon} alt={option.label} />}
                        {option.label}
                    </StyledTab>
                ))}
            </StyledTabList>
            <StyledTabContent>
                {options.find(option => option.id === activeTab)?.content}
            </StyledTabContent>
        </StyledTabsWrapper>
    );
};

export default Tabs;