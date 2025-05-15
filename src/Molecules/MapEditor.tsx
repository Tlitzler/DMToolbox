import React, { useState } from 'react';

import styled from '@emotion/styled';
import MapComponent from '../Atoms/MapComponent';
import ImageInput from '../Atoms/ImageInput';
import Draggable from '../Atoms/Draggable';
import LabeledInput from '../Atoms/LabeledInput';
import Button from '../Atoms/Button';
import Checkbox from '../Atoms/Checkbox';
import { IMapObject } from '../Redux/Types/campaign';
import { useAppDispatch } from '../Redux/hooks';
import { addMapThunk } from '../Redux/CampaignSlice/thunks/addMapThunk';

export interface IMapEditorProps {
    map?: IMapObject;
    onClose: () => void;
    defaultWidth?: number;
    defaultHeight?: number;
};

const StyledMapEditorWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    height: '100%',
});

const StyledMapContentWrapper = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '20px',
    height: '100%',
});

const StyledContentColumn = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'KingthingsPetrock',
});

const StyledMapEditorTitle = styled.h1({
    fontFamily: 'KingthingsPetrock',
    fontSize: '24px',
    color: 'black',
});

interface IStyledMapPreviewWrapperProps {
    width: string;
    height: string;
};

const StyledMapPreviewWrapper = styled.div(({width, height}: IStyledMapPreviewWrapperProps) => ({
    width: width,
    height: height,
}));

const StyledNoMapPreview = styled.div(({width, height}: IStyledMapPreviewWrapperProps) => ({
    width: width,
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    fontFamily: 'KingthingsPetrock',
    fontSize: '20px',
}));

const MapEditor = ({
    map,
    onClose,
    defaultWidth,
    defaultHeight,
}: IMapEditorProps) => {
    const dispatch = useAppDispatch();

    const [mapImage, setMapImage] = useState(map?.imageURL || '');
    const [modalWidth, setModalWidth] = useState(defaultWidth || 700);
    const [modalHeight, setModalHeight] = useState(defaultHeight || 450);
    const [mapName, setMapName] = useState(map?.name || '');
    const [mapDescription, setMapDescription] = useState(map?.description || '');
    const [hexGrid, setHexGrid] = useState(!!(map?.scale && map?.hexes));
    const [squareGrid, setSquareGrid] = useState(!!(map?.scale && !map?.hexes));
    const [gridRows, setGridRows] = useState(5);
    const [gridColumns, setGridColumns] = useState(5);
    const [errors, setErrors] = useState({name: '', imageURL: ''});

    const handleResize = (width: number, height: number) => {
        setModalWidth(width);
        setModalHeight(height);
    }

    if (errors.name && mapName !== '') {
        setErrors({...errors, name: ''});
    }
    if (errors.imageURL && mapImage !== '') {
        setErrors({...errors, imageURL: ''});
    }

    const hasError = !!errors.name || !!errors.imageURL;

    const validateForm = () => {
        let errors = {name: '', imageURL: ''};
        let valid = true;
        if (!mapName) {
            errors.name = 'Name is required';
            valid = false;
        }
        if (!mapImage) {
            errors.imageURL = 'Map image is required';
            valid = false;
        }
        setErrors(errors);
        return valid;
    }

    const handleGridTypeSelect = (type: 'hex' | 'square', value: boolean) => {
        if (type === 'hex') {
            setHexGrid(value);
            setSquareGrid(false);
        } else {
            setSquareGrid(value);
            setHexGrid(false);
        }
    }

    const handleSubmit = () => {
        if (!validateForm()) return;
        const mapObject: IMapObject = {
            name: mapName,
            id: map?.id || -1,
            imageURL: mapImage,
            description: mapDescription,
            locationId: map?.locationId || -1,
            locationIds: map?.locationIds || [],
            hexes: hexGrid,
            width: gridColumns,
            height: gridRows,
            scale: map?.scale || 0,
        };
        dispatch(addMapThunk(mapObject));
        onClose();
    }

    const [mapWidth, mapHeight] = [`${modalWidth / 3}px`, `${modalHeight  / 3}px`];
    return (
        <Draggable key={'map'} onClose={onClose} defaultPosition={{
                x: 0.5 * modalWidth, 
                y: -0.5 * modalHeight, 
                width: modalWidth, 
                height: modalHeight
            }}
            onResize={handleResize}>
            <StyledMapEditorWrapper>
                <StyledMapEditorTitle>
                    Map Creator
                </StyledMapEditorTitle>

                <StyledMapPreviewWrapper width={mapWidth} height={mapHeight}>
                    {mapImage ? (
                        <MapComponent 
                            imageSource={mapImage} 
                            mapWidth={mapWidth} 
                            mapHeight={mapHeight}
                            hasGrid={hexGrid || squareGrid}
                            gridColumns={gridColumns}
                            gridRows={gridRows}/>
                    ) : (
                        <StyledNoMapPreview width={mapWidth} height={mapHeight}>
                            Upload image to see map preview
                        </StyledNoMapPreview>
                    )}
                </StyledMapPreviewWrapper>

                <StyledMapContentWrapper>
                    <StyledContentColumn style={{gap: '20px'}}>
                        <LabeledInput
                            label="Map Name"
                            type="text"
                            value={mapName}
                            onChange={(event) => setMapName(event.target.value)}
                            error={errors.name}
                            width="200px"
                            height="50px"/>
                        <LabeledInput
                            label="Map Description"
                            type="longtext"
                            value={mapDescription}
                            onChange={(event) => setMapDescription(event.target.value)}
                            width="200px"
                            height="50px"/>
                    </StyledContentColumn>
                    <StyledContentColumn>
                        <ImageInput 
                            label="Upload Map Image"
                            value={mapImage}
                            onChange={(url) => setMapImage(url)}
                            error={errors.imageURL}
                            width="200px"
                            height="50px"
                            hidePreview/>
                    </StyledContentColumn>
                    <StyledContentColumn style={{alignItems: 'flex-start'}}>
                        Grid Settings
                        <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                            <Checkbox 
                                label="Hex Grid"
                                value={hexGrid}
                                onChange={(val: boolean) => handleGridTypeSelect('hex', val)}
                                disabled={mapImage === ''}/>
                            <Checkbox
                                label="Square Grid"
                                value={squareGrid}
                                onChange={(val: boolean) => handleGridTypeSelect('square', val)}
                                disabled={mapImage === ''}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                            <LabeledInput
                                disabled={!hexGrid && !squareGrid}
                                width="40px"
                                height="25px"
                                value={gridRows}
                                min={5}
                                type="number"
                                onChange={(event) => setGridRows(Number(event.target.value))}/>
                            <span>
                                Rows
                            </span>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                            <LabeledInput
                                disabled={!hexGrid && !squareGrid}
                                width="40px"
                                height="25px"
                                value={gridColumns}
                                min={5}
                                type="number"
                                onChange={(event) => setGridColumns(Number(event.target.value))}/>
                            <span>
                                Columns
                            </span>
                        </div>
                    </StyledContentColumn>
                </StyledMapContentWrapper>
                <Button onClick={handleSubmit} disabled={hasError}>
                    Save Map
                </Button>
            </StyledMapEditorWrapper>
        </Draggable>
        
    );
};

export default MapEditor;