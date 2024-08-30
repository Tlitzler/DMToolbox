import React, { useState } from 'react';
import Logo from '../../Atoms/Logo';
import styled from '@emotion/styled';
import LabeledInput from '../../Atoms/LabeledInput';
import Button from '../../Atoms/Button';
import { Link } from 'react-router-dom';
import { addUser } from '../../Redux/UserSlice/api/addUser';
import { IUserObject } from '../../Redux/Types/user';
import PageWrapper from '../../Molecules/PageWrapper';

const StyledSignUpContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
  width: '75%',
  margin: 'auto',
  maxWidth: '400px',
  padding: '20px',
  fontFamily: 'KingthingsPetrock',
});

const StyledLogoWrapper = styled.div({
  margin: 'auto',
  marginTop: '10px'
});

const StyledTitleText = styled.h1({
  fontSize: '30px',
  margin: 'auto',
  fontFamily: 'KingthingsPetrock',
});

const StyledSubtitleText = styled.h3({
  fontSize: '15px',
  margin: 'auto 30px',
  textAlign: 'center',
  fontWeight: 600,
  fontFamily: 'KingthingsPetrock',
});

const StyledErrorText = styled.div({
  margin: 'auto',
  fontFamily: 'KingthingsPetrock',
  fontSize: '20px',
});

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [successfulAdd, setSuccessfulAdd] = useState(false);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>, field: 'firstname' | 'lastname' | 'email' | 'pass' | 'confirm') => {
    const target = event.target as HTMLInputElement;

    switch(field){
      case 'firstname':
        setFirstname(target.value);
        break;
      case 'lastname':
        setLastname(target.value);
        break;
      case 'email':
        setEmail(target.value);
        break;
      case 'pass':
        setPassword(target.value);
        break;
      case 'confirm':
        setPasswordConfirm(target.value);
        break;
      default:
        console.log('No valid id for input field');
    }
  };

  const submitSignup = () => {
    console.log('BIG TO DO !!!!!!! Need to hash this password before sending it to the BE :: ', password);
    console.log(password, passwordConfirm, password === passwordConfirm);
    if (firstname === '' || lastname === '' || email === '' || password === '' || passwordConfirm === '') {
      setError('Please fill out all fields.');
    } else if (password !== passwordConfirm) {
      setError('Password and password confirmation do not match.');
    } else if (password.length < 1) {
      setError('Password is too short.');
    } else {
      setError('');
      const signupInfo: IUserObject = {
        firstname,
        lastname,
        email,
        password,
      };
      addUser(signupInfo).then(() => {
        setSuccessfulAdd(true);
      }).catch(error => setError(error.response.data));
    }
  }

  return (
    <PageWrapper>
      {successfulAdd ? (
        <StyledSignUpContainer>
          <StyledTitleText>
            Sign up successful!
          </StyledTitleText>
          <StyledSubtitleText>
            Let's get mapping...
          </StyledSubtitleText>
          <Link to="/login">
            <Button
              width="400px"
              margin="10px auto">
                Log in
            </Button>
          </Link>
        </StyledSignUpContainer>
      ) : (
        <StyledSignUpContainer>
          <StyledLogoWrapper>
            <Logo width={100} height={100}/>
          </StyledLogoWrapper>
          <StyledTitleText>
            Create an Account
          </StyledTitleText>
          <StyledSubtitleText>
            Welcome to the DM Toolbox! Fill out the form below to create your free account.
          </StyledSubtitleText>
          <LabeledInput
            height="60px"
            label={'First Name'}
            value={firstname}
            onChange={(event) => handleInputChange(event, 'firstname')}
            submitForm={submitSignup}/>
          <LabeledInput
            height="60px"
            label={'Last Name'}
            value={lastname}
            onChange={(event) => handleInputChange(event, 'lastname')}
            submitForm={submitSignup}/>
          <LabeledInput
            height="60px"
            label={'Email'}
            value={email}
            onChange={(event) => handleInputChange(event, 'email')}
            submitForm={submitSignup}/>
          <LabeledInput
            height="60px"
            type="password"
            label={'Password'}
            value={password}
            onChange={(event) => handleInputChange(event, 'pass')}
            submitForm={submitSignup}/>
          <LabeledInput
            height="60px"
            type="password"
            label={'Confirm Password'}
            value={passwordConfirm}
            onChange={(event) => handleInputChange(event, 'confirm')}
            submitForm={submitSignup}/>
            <Button
              width="400px"
              margin="10px auto"
              onClick={submitSignup}>
              Sign up
            </Button>
            <Link to="/login">
              <Button
                width="400px"
                margin="10px auto">
                Log in
              </Button>
            </Link>
            {!!error && (
              <StyledErrorText>
                {error}
              </StyledErrorText>
            )}
        </StyledSignUpContainer>
      )}
    </PageWrapper>
  )
};

export default SignUp;