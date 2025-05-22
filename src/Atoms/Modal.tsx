import React from 'react';
import styled from '@emotion/styled';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
};

const StyledModalOverlay = styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
});

const StyledModalContent = styled.div<{ width: string; height: string }>(({ width, height }) => ({
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: width,
    height: height,
}));

const Modal = ({
    isOpen,
    onClose,
    children,
    width = '400px',
    height = '300px',
}: IModalProps) => {
    if (!isOpen) return null;

    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledModalContent width={width} height={height} onClick={(e) => e.stopPropagation()}>
                {children}
            </StyledModalContent>
        </StyledModalOverlay>
    );
}

export default Modal;