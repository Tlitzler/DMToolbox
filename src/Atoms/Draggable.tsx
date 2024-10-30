import React from 'react';
import styled from '@emotion/styled';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';
import { Rnd } from 'react-rnd';

export interface IDraggableProps {
    children?: React.ReactNode;
    onClose: () => void;
    defaultPosition?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    onResize?: (width: number, height: number) => void;
};

const StyledDraggableHandle = styled.strong({
    position: 'sticky',
    backgroundColor: '#4a3b29',
    height: '20px',
    cursor: 'move',
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'right',
    padding: '5px',
    borderRadius: '5px 5px 0 0',
});

const StyledRnd = styled(Rnd)({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    boxShadow: '2px 3px 20px black, 0 0 10px #8f5922 inset', 
    overflow: 'hidden',
});

const StyledCloseButton = styled.span({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    ':hover': {
        color: 'red',
    },
    width: '20px',
    height: '20px',
});

const StyledContentWrapper = styled.div({
    paddingBottom: '10px',
    height: '80%',
    width: '100%',
    overflow: 'auto',
    scrollbarColor: '#aaaaaa transparent',
    scrollbarWidth: 'thin',
});

const Draggable = ({
    children,
    onClose,
    defaultPosition = {
        x: 0,
        y: 0,
        width: 200,
        height: 200,
    },
    onResize,
}: IDraggableProps) => {
    return (
        <StyledRnd default={defaultPosition} dragHandleClassName="handle" onResize={(_: any, __: any, refToElement: any, ___: any) => onResize && onResize(refToElement.offsetWidth, refToElement.offsetHeight)}>
            <StyledDraggableHandle className="handle">
                <StyledCloseButton onClick={onClose}>
                    X
                </StyledCloseButton>
            </StyledDraggableHandle>
            <StyledContentWrapper>
                {children}
            </StyledContentWrapper>
        </StyledRnd>
    );
};

export default Draggable;