import React from 'react';

import styled from '@emotion/styled';
import { TransformWrapper, TransformComponent, MiniMap } from 'react-zoom-pan-pinch';

export interface IMapComponentProps {
    imageSource?: string;
    children?: React.ReactNode;
};

const StyledMapWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid black',
    width: 'fit-content',
    margin: 'auto',
});

interface IStyledMapImageProps {
    width?: string;
    height?: string;
    imageSource?: string;
};

const StyledMapImage = styled.div(({ imageSource, width, height }: IStyledMapImageProps) => ({
    width: width || '65vw',
    height: height || '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${imageSource})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }));

const MapComponent = ({
    imageSource,
    children,
}: IMapComponentProps) => {
    return (
        <StyledMapWrapper>
            <TransformWrapper>
                <TransformComponent>
                    <StyledMapImage imageSource={imageSource}>
                        {children}
                    </StyledMapImage>
                </TransformComponent>
            </TransformWrapper>
        </StyledMapWrapper>
    );
};

export default MapComponent;