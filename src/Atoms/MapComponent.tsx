import React from 'react';

import styled from '@emotion/styled';
import { TransformWrapper, TransformComponent, MiniMap } from 'react-zoom-pan-pinch';
import Grid from '../Molecules/Grid';

export interface IMapComponentProps {
    imageSource?: string;
    children?: React.ReactNode;
    mapWidth?: string;
    mapHeight?: string;
    hasGrid?: boolean;
    gridRows?: number;
    gridColumns?: number;
};

const StyledMapWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid black',
    margin: 'auto',
    width: '100%',
    height: '100%',
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
    mapWidth,
    mapHeight,
    hasGrid,
    gridRows,
    gridColumns,
}: IMapComponentProps) => {
    console.log('CUSTOM LOG testing stuff', hasGrid, gridRows, gridColumns, mapWidth, mapHeight);
    return (
        <StyledMapWrapper>
            <TransformWrapper>
                <TransformComponent>
                    <Grid
                        width={mapWidth || '65vw'}
                        height={mapHeight || '90vh'}
                        rows={gridRows ?? 0}
                        columns={gridColumns ?? 0}
                        isVisible={!!(hasGrid && gridRows && gridColumns)}
                        imageSource={imageSource}>
                        <StyledMapImage imageSource={imageSource} width={mapWidth} height={mapHeight}>
                            {children}
                        </StyledMapImage>
                    </Grid>
                </TransformComponent>
            </TransformWrapper>
        </StyledMapWrapper>
    );
};

export default MapComponent;