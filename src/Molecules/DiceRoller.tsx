import React from 'react';

import styled from '@emotion/styled';
import Dropdown from '../Atoms/Dropdown';
import Button from '../Atoms/Button';
import diceUp from '../Theme/Images/diceUp.png';
import diceDown from '../Theme/Images/diceDown.png';
import diceUpGreen from '../Theme/Images/advantage.png';
import diceDownRed from '../Theme/Images/disadvantage.png';
import LabeledInput from '../Atoms/LabeledInput';
import TextArea from '../Atoms/Textarea';

export interface IDiceRollerProps {
};

export const rollDie = (sides: number, advantage = false, disadvantage = false) => {
    if (advantage) {
        return Math.max(Math.floor(Math.random() * sides) + 1, Math.floor(Math.random() * sides) + 1);
    } else if (disadvantage) {
        return Math.min(Math.floor(Math.random() * sides) + 1, Math.floor(Math.random() * sides) + 1);
    }
    return Math.floor(Math.random() * sides) + 1;
};

const rollDice = (sides: number, numberOfDice: number, modifier = 0, advantage = false, disadvantage = false) => {
    let total = 0;
    let rolls: number[] = [];
    let formattedRolls: string[] = [];
    for (let i = 0; i < numberOfDice; i++) {
        const result = rollDie(sides, advantage, disadvantage) + modifier;
        total += result;
        rolls.push(result);
        formattedRolls.push(`${result} ${modifier !== 0 ? `${modifier > 0 && '+'}${modifier} (${result + modifier})` : ''}`);
    }
    return {rolls, total, formattedRolls};
}

const rollAgainstDC = (sides: number, numberOfDice: number, dc: number, modifier = 0, advantage = false, disadvantage = false) => {
    const rollInfo = rollDice(sides, numberOfDice, modifier, advantage, disadvantage);
    return {...rollInfo, successes: rollInfo.rolls.filter(roll => roll >= dc).length};
}

const StyledDiceRollerContentWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    height: '100%',
});

const StyledDiceRoller = styled.div({
    width: '300px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    padding: '5px',
});

const StyledIcon = styled.img({
    width: '20px',
    height: '20px',
    cursor: 'pointer',
});

const StyledModifierWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
});

const StyledRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '5px',
});

const StyledSpan = styled.span({
    fontFamily: 'KingthingsPetrock',
});

const DiceRoller = ({}: IDiceRollerProps) => {
    const [diceSize, setDiceSize] = React.useState(6);
    const [numberOfDice, setNumberOfDice] = React.useState(1);
    const [modifier, setModifier] = React.useState(0);
    const [dc, setDC] = React.useState(0);
    const [advantage, setAdvantage] = React.useState(false);
    const [disadvantage, setDisadvantage] = React.useState(false);
    // can maybe add redux state later if saving dice rolls between sessions is useful
    const [history, setHistory] = React.useState<React.ReactNode[]>([]);

    const diceSizes = [2, 4, 6, 8, 10, 12, 20, 100];

    const rollAndRecord = () => {
        let results = '';
        let total = '';
        let newEntry = '';
        if (dc > 0) {
            const rollObject = rollAgainstDC(diceSize, numberOfDice, dc, modifier, advantage, disadvantage);
            results = `(${rollObject.successes} successes against DC ${dc})`;
            total = rollObject.total.toString();
            newEntry = `${rollObject.formattedRolls.join(', ')} =`;
        } else {
            const rollObject = rollDice(diceSize, numberOfDice, modifier, advantage, disadvantage);
            total = rollObject.total.toString();
            newEntry = `${rollObject.formattedRolls.join(', ')} = `;
        }
        newEntry = ` Rolling ${numberOfDice}d${diceSize} ${modifier !== 0 ? `with ${modifier > 0 && '+'}${modifier} mod` : ''}: ${newEntry} `;
        setHistory([...history, (
            <span key={history.length}>
                <u>
                    {`${new Date().toLocaleTimeString()}:`}
                </u>
                <span style={{color: '#555555'}}>
                    {newEntry}
                </span>
                <b>
                    {`${total} ${results}`}
                </b>
                <br/>
            </span>
        )]);
    }

    return (
        <StyledDiceRollerContentWrapper>
            <StyledDiceRoller>
                <LabeledInput
                    width="40px"
                    height="25px"
                    min={1}
                    value={numberOfDice}
                    type="number"
                    onChange={(event) => setNumberOfDice(Math.abs(Number(event.target.value)))}/>
                <Dropdown 
                    options={diceSizes.map(size => ({value: size, text: `d${size.toString()}`}))}
                    onChange={(event) => setDiceSize(Number(event.target.value))}/>
                <StyledModifierWrapper>
                    <StyledRow>
                        <StyledIcon 
                            onClick={() => {
                                setAdvantage(!advantage);
                                setDisadvantage(false);
                            }}
                            src={advantage ? diceUpGreen : diceUp}/>
                        <StyledIcon
                            onClick={() => {
                                setDisadvantage(!disadvantage);
                                setAdvantage(false);
                            }}
                            src={disadvantage ? diceDownRed : diceDown}/>
                    </StyledRow>
                    
                    <StyledRow>
                        <StyledSpan>
                            ±
                        </StyledSpan>
                        <LabeledInput
                            width="40px"
                            height="25px"
                            value={modifier}
                            type="number"
                            onChange={(event) => setModifier(Number(event.target.value))}/>
                    </StyledRow>
                    <StyledRow>
                        <StyledSpan>
                            DC
                        </StyledSpan>
                        
                        <LabeledInput
                            width="40px"
                            height="25px"
                            value={dc}
                            type="number"
                            onChange={(event) => setDC(Number(event.target.value))}/>
                    </StyledRow>
                </StyledModifierWrapper>
                <Button onClick={rollAndRecord}>
                    Roll
                </Button>
            </StyledDiceRoller>
            <TextArea
                width="80%"
                height="100%">
                {history}
            </TextArea>
        </StyledDiceRollerContentWrapper>
        
    );
}

export default DiceRoller;