import React from 'react';

import styled from '@emotion/styled';

export interface ICheckboxProps {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

const StyledCheckboxWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
});

const StyledCheckboxLabel = styled.label({
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

const StyledCheckbox = styled.input({
    height: '20px',
    width: '20px',
    cursor: 'pointer',
});

const Checkbox = ({ label, value, onChange }: ICheckboxProps) => {
    return (
        <StyledCheckboxWrapper>
            <StyledCheckbox type="checkbox" checked={value} onChange={() => onChange(!value)}/>
            <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
        </StyledCheckboxWrapper>
    );
}

export default Checkbox;