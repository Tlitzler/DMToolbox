import React from 'react';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';
import styled from '@emotion/styled';

export interface IDropdownProps {
    options: {
        text: string;
        value: string | number;
    }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const StyledSelect = styled.select({
    height: '25px',
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

const StyledOption = styled.option({
    backgroundColor: '#fffef0',
    backgroundImage: `url(${ParchmentTexture})`,
    fontFamily: 'KingthingsPetrock',
    fontSize: '14px',
    fontWeight: 'bold',
});

const Dropdown = ({options, onChange}: IDropdownProps) => {
    return (
        <StyledSelect onChange={onChange}>
            {options.map((option) => (
                <StyledOption key={option.value} value={option.value}>
                    {option.text}
                </StyledOption>
            ))}
        </StyledSelect>
    );
}

export default Dropdown;