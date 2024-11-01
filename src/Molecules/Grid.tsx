import React, { useMemo } from 'react';
import GridCell from '../Atoms/GridCell';
import styled from '@emotion/styled';

interface IGridProps {
    width: string;
    height: string;
    rows: number;
    columns: number;
    components?: { component: () => JSX.Element; x?: number; y?: number }[];
}

interface IGridWrapperProps {
    rows: number;
    columns: number;
}

const GridWrapper = styled.div(({ rows, columns }: IGridWrapperProps) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
    position: 'absolute',
    boxSizing: 'border-box',
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
    components 
}: IGridProps) => {
    const pixelWidth = useMemo(() => convertToPixels(width), [width]);
    const pixelHeight = useMemo(() => convertToPixels(height), [height]);
    const cellSize = Math.min(pixelWidth, pixelHeight) / Math.max(rows, columns);

    const calculatedRows = Math.floor(pixelHeight / cellSize);
    const calculatedColumns = Math.floor(pixelWidth / cellSize);

    console.log('CUSTOM LOG testing pixels', pixelWidth, pixelHeight, cellSize);

    return (
        <GridWrapper
            style={{ width, height }}
            rows={calculatedRows}
            columns={calculatedColumns}>
            {components?.map((component, index) => (
                <div key={index} style={{ gridColumn: component.x, gridRow: component.y }}>
                    {component.component()}
                </div>
            ))}
            {Array.from({ length: calculatedRows * calculatedColumns }).map((_, index) => (
                <GridCell key={index} size={`${cellSize}px`}/>
            ))}
        </GridWrapper>
    );
};

export default Grid;