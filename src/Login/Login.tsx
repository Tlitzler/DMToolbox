import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../Common/Logo';
import styled from '@emotion/styled';
import LabeledInput from '../Common/LabeledInput';
import TextButton from '../Common/TextButton';
import { Link } from 'react-router-dom';
import { selectUser } from '../Redux/UserSlice/userSelectors';
import { authenticateThunk } from './thunks/authenticateThunk';
import { useAppDispatch } from '../Redux/hooks';
import { useNavigate } from 'react-router-dom';

const StyledLoginBackdrop = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#ecdbc1',
  height: '100vh',
});

const StyledLoginContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
  backgroundColor: '#fbf8f3',
  width: '75%',
  margin: 'auto',
  maxWidth: '400px',
  padding: '30px',
});

const StyledLogoWrapper = styled.div({
  margin: 'auto',
  marginTop: '10px'
});

const StyledForgotPassword = styled(Link)({
  margin: 'auto',
});

const StyledTitleText = styled.h1({
  fontSize: '30px',
  margin: 'auto',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  console.log('CUSTOM LOG testing', user);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>, field: 'email' | 'pass') => {
    const target = event.target as HTMLInputElement;

    switch(field){
      case 'email':
        setEmail(target.value);
        break;
      case 'pass':
        setPassword(target.value);
        break;
      default:
        console.log('No valid id for input field');
    }
  };

  const submitLogin = () => {
    const loginInfo = {
      email,
      password,
    };
    dispatch(authenticateThunk(loginInfo)).then((response: any) => {
      if (response.error) {
        console.log('There is an error');
        setError('Incorrect email/password');
        return;
      }
      navigate('/');
    });
  }

  return (
    <StyledLoginBackdrop>
      <StyledLoginContainer>
        <StyledLogoWrapper>
          <Logo width={100} height={100}/>
        </StyledLogoWrapper>

        <StyledTitleText>
          Log in
        </StyledTitleText>
        
        
        <LabeledInput
          height={60}
          label={'Email'}
          value={email}
          handleChange={(event) => handleInputChange(event, 'email')}/>
        <LabeledInput
          height={60}
          hideText
          label={'Password'}
          value={password}
          handleChange={(event) => handleInputChange(event, 'pass')}/>
        
        {!!error && (
              <div>
                {error}
              </div>
        )}

        <TextButton 
          width={400}
          text="Log in" 
          onClick={submitLogin} 
          margin="10px auto"
          />
        
        <Link to="/sign-up">
          <TextButton 
            width={400}
            text="Sign up" 
            margin="10px auto"/>
        </Link>

        <StyledForgotPassword to="/">
          Forgot your password?
        </StyledForgotPassword>
        
      </StyledLoginContainer>
      
    </StyledLoginBackdrop>
  )
};

export default Login;