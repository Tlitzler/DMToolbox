import React, { useState } from 'react';
import Button from '../Atoms/Button';
import styled from '@emotion/styled';

export interface IToolbarOption {
    text?: string;
    id: string;
    component: React.ReactNode;
    onClick: () => void;
    visible: boolean;
    imageSource?: string;
    hoverSource?: string;
};

export interface IToolbarProps {
    options: IToolbarOption[];
    location: 'left' | 'right';
};

const StyledToolbarWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
});

interface ToolbarStyleProps {
    location: 'left' | 'right';
};

const StyledToolbar = styled.div(({ location }:ToolbarStyleProps) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
    padding: location === 'right' ? '10px 0 10px 10px' : '10px 10px 10px 0',
    backgroundColor: '#4a3b29',
    borderRadius: location === 'right' ? '5px 0 0 5px' : '0 5px 5px 0',
}));

const StyledWidgetWrapper = styled.div({
    position: 'absolute',
    zIndex: 100,
});

const Toolbar = ({ options, location }: IToolbarProps) => {

    return (
        <StyledToolbarWrapper>
            <StyledToolbar location={location}>
                {options.map((option) => (
                    <Button 
                        height="30px"
                        width="100%"
                        key={option.id} 
                        onClick={option.onClick} 
                        type={option.imageSource ? 'image' : 'primary'} 
                        imageSource={option.imageSource}
                        hoverSource={option.hoverSource}>
                        {option.text}
                    </Button>
                ))}
            </StyledToolbar>
                <div style={{height: 0}}>
                    <StyledWidgetWrapper>
                        {options.map((option) => (
                            option.visible && option.component
                        ))}
                    </StyledWidgetWrapper>
                </div>
        </StyledToolbarWrapper>
        
    )
};

export default Toolbar;