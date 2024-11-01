import React from 'react';

import styled from '@emotion/styled';

export interface ICheckboxProps {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
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

interface IStyledCheckboxProps {
    disabled?: boolean;
};

const StyledCheckbox = styled.input(({disabled}: IStyledCheckboxProps) => ({
    height: '20px',
    width: '20px',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
}));

const Checkbox = ({ label, value, onChange, disabled }: ICheckboxProps) => {
    return (
        <StyledCheckboxWrapper>
            <StyledCheckbox type="checkbox" checked={value} onChange={() => onChange(!value)} disabled={disabled}/>
            <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
        </StyledCheckboxWrapper>
    );
}

export default Checkbox;