import React from 'react';
import styled from '@emotion/styled';
import ParchmentTexture from '../Theme/Images/ParchmentTexture.png';
import { uploadImage } from '../Redux/Common/api/uploadImageAPI';
import { useTheme, Theme } from '@emotion/react';
import noPreview from '../Theme/Images/noPreview.png';

export interface IImageInputProps {
    label?: string;
    value: string;
    onChange: (event: any) => void;
    width?: string;
    height?: string;
    submitForm?: () => void;
    error?: string;
    setLoading?: (loading: boolean) => void;
};

interface IWrapperProps {
    width?: string;
    height: string;
}

const StyledInputWrapper = styled.div(({width, height}: IWrapperProps) => ({
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
}));

const StyledUploadWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

interface IStyledInputLabelProps {
    theme: Theme;
};

const StyledInputLabel = styled.label(({theme}: IStyledInputLabelProps) => ({
    height: '20px',
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
    padding: '5px',
    backgroundColor: theme.colors.buttons.primary.background,
    color: theme.colors.buttons.primary.color,
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.colors.buttons.primary.hover,
    },
    '&:active': {
        backgroundColor: theme.colors.buttons.primary.active,
    },
}));

const StyledInput = styled.input({
    display: 'none',
});

const StyledPreview = styled.img({
    height: '150px',
    width: '150px',
    margin: 'auto',
    border: '1px solid black',
});

const StyledErrorText = styled.label({
    color: '#ff3632',
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

const ImageInput = ({
    label = "Upload Image",
    value,
    onChange,
    width,
    height = '50px',
    submitForm,
    error,
    setLoading,
}: IImageInputProps) => {
    const theme = useTheme();

    const handleImageUpload = async (e: any) => {
        setLoading && setLoading(true);
        const file = e.target.files[0];
        const url = await uploadImage(file);
        onChange(url);
        setLoading && setLoading(false);
    }

    return (
        <StyledInputWrapper 
            height={height}
            width={width}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && submitForm) {
                    submitForm();
                }
            }}>
                <StyledUploadWrapper>
                    <StyledInputLabel htmlFor="file-upload" theme={theme}>
                        {label}
                    </StyledInputLabel>
                    <StyledInput 
                        id="file-upload"
                        onChange={handleImageUpload}
                        type="file"/>
                </StyledUploadWrapper>
            {value.length > 0 ? (
                <StyledPreview src={String(value)} alt="preview"/>
            ) : (
                <StyledPreview src={noPreview} alt="no preview"/>
            )}
            {error && (
                <StyledErrorText>
                    {error}
                </StyledErrorText>
            )}
        </StyledInputWrapper>
    )
};

export default ImageInput;