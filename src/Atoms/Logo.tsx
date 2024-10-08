import React from 'react';
import styled from '@emotion/styled';
import logo from '../Theme/Images/logo.png';
import { Link } from 'react-router-dom';

interface StyleProps {
  width: number;
  height: number;
};

const StyledLogo = styled.img((props: StyleProps) => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  cursor: 'pointer',
}));

const StyledLogoWrapper = styled(Link)((props: StyleProps) => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

interface LogoProps {
  width?: number;
  height?: number;
};

const Logo = ({
  width = 50,
  height = 50,
}: LogoProps) => (
  <StyledLogoWrapper 
    to="/"
    width={width}
    height={height}>
    <StyledLogo 
      src={logo} 
      alt="logo" 
      width={width}
      height={height}/>
  </StyledLogoWrapper>
);

export default Logo;