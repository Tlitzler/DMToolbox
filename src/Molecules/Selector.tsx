import React, {useState, useCallback} from 'react';
import styled from '@emotion/styled';
import editIcon from '../Theme/Images/editIcon.png';
import trashIcon from '../Theme/Images/trash.png';
import noPreview from '../Theme/Images/noPreview.png';
import Modal from '../Atoms/Modal';
import Button from '../Atoms/Button';

const StyledOptionWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'KingthingsPetrock',
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
    width: '100%',
    borderBottom: '1px solid #ccc',
});

const StyledRowWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});

const StyledIconButton = styled.img({
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
    margin: '5px',
});

export interface ISelectorProps {
    options: { id: number; name: string; image?: string }[];
    handleEdit: (id: number) => void;
    handleSelect: (id: number) => void;
    selectedId?: number;
    handleDelete?: (id: number) => void;
}

const Selector = ({
    options,
    handleEdit,
    handleSelect,
    selectedId,
    handleDelete,
}: ISelectorProps) => {
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDeleteClick = useCallback((id: number) => {
        setDeleteId(id);
        setConfirmDeleteVisible(true);
    }, []);

    const confirmDelete = useCallback(() => {
        if (handleDelete && deleteId !== null) {
            handleDelete(deleteId);
        }
        setConfirmDeleteVisible(false);
        setDeleteId(null);
    }, [handleDelete, deleteId]);

    return (
        <>
            {options.map(option => (
                <StyledRowWrapper>
                    <StyledOptionWrapper
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        style={{ backgroundColor: selectedId === option.id ? '#e0e0e0' : 'transparent' }}
                    >
                        {option.image ? (
                            <img src={option.image} alt={option.name} style={{ width: '20px', height: '20px' }} />
                        ) : (
                            <img src={noPreview} alt="No preview" style={{ width: '20px', height: '20px' }} />
                        )}
                        <span>{option.name}</span>
                    </StyledOptionWrapper>
                    <StyledIconButton
                        src={editIcon}
                        alt="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(option.id);
                        }}
                    />
                    {handleDelete && (
                        <StyledIconButton
                            src={trashIcon}
                            alt="Delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(option.id);
                            }}
                        />
                    )}
                </StyledRowWrapper>
                
            ))}
            {confirmDeleteVisible && (
                <Modal
                    isOpen={confirmDeleteVisible}
                    onClose={() => setConfirmDeleteVisible(false)}
                >
                    <p>Are you sure you want to delete this item?</p>
                    <Button onClick={confirmDelete}>Yes</Button>
                    <Button onClick={() => setConfirmDeleteVisible(false)}>No</Button>
                </Modal>
            )}
        </>
    );
}
export default Selector;