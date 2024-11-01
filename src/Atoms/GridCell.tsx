import React from 'react';

interface GridCellProps {
    size: string;
}

const GridCell = ({ 
    size,
}: GridCellProps) => {
    return (
        <div style={{ width: size, height: size }}>
            <svg width="100%" height="100%">
                <rect
                    width="100%"
                    height="100%"
                    fill="transparent"
                    stroke="white"
                    strokeWidth={1}
                />
            </svg>
        </div>
    );
};

export default GridCell;