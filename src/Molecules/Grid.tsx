import React, { useMemo } from 'react';
import GridCell from '../Atoms/GridCell';
import styled from '@emotion/styled';

interface IGridProps {
    width: string;
    height: string;
    rows: number;
    columns: number;
    components?: { component: () => JSX.Element; x?: number; y?: number }[];
    isVisible?: boolean;
    children?: React.ReactNode;
    imageSource?: string;
}

interface IGridWrapperProps {
    rows: number;
    columns: number;
    imageSource?: string;
}

const GridWrapper = styled.div(({ rows, columns, imageSource }: IGridWrapperProps) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 0fr)`,
    gridTemplateRows: `repeat(${rows}, 0fr)`,
    boxSizing: 'border-box',
    backgroundImage: `url(${imageSource})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}));

const unitToPixelCache: { [key: string]: number } = {};

const convertToPixels = (value: string): number => {
    if (unitToPixelCache[value]) {
        return unitToPixelCache[value];
    }

    const element = document.createElement('div');
    element.style.width = value;
    document.body.appendChild(element);
    const pixels = window.getComputedStyle(element).width;
    document.body.removeChild(element);
    const pixelValue = parseFloat(pixels);

    unitToPixelCache[value] = pixelValue;
    return pixelValue;
}

const Grid = ({ 
    width,
    height,
    rows, 
    columns, 
    components,
    isVisible = true,
    children,
    imageSource,
}: IGridProps) => {
    const pixelWidth = useMemo(() => convertToPixels(width), [width]);
    const pixelHeight = useMemo(() => convertToPixels(height), [height]);
    let cellSize: number;

    if (pixelWidth < pixelHeight) {
        cellSize = pixelWidth / columns;
    } else {
        cellSize = pixelHeight / rows;
    }
    // const cellSize = Math.min(pixelWidth, pixelHeight) / Math.min(rows, columns);

    return isVisible ? (
        <GridWrapper
            rows={rows}
            columns={columns}
            imageSource={imageSource}>
            {components?.map((component, index) => (
                <div key={index} style={{ gridColumn: component.x, gridRow: component.y }}>
                    {component.component()}
                </div>
            ))}
            {Array.from({ length: rows * columns }).map((_, index) => (
                <GridCell key={index} size={`${cellSize}px`}/>
            ))}
        </GridWrapper>
    ) : (
        <div style={{ width, height }}>{children}</div>
    );
};

export default Grid;