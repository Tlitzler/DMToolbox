import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../Atoms/Logo';
import styled from '@emotion/styled';
import LabeledInput from '../../Atoms/LabeledInput';
import Button from '../../Atoms/Button';
import { Link } from 'react-router-dom';
import { selectUser } from '../../Redux/UserSlice/userSelectors';
import { authenticateThunk } from './thunks/authenticateThunk';
import { fetchCampaignsThunk } from '../../Redux/CampaignSlice/thunks/fetchCampaignsThunk';
import { useAppDispatch } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import PageWrapper from '../../Molecules/PageWrapper';

const StyledLoginContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
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
    fontFamily: 'KingthingsPetrock',
    fontSize: '16px',
});

const StyledTitleText = styled.h1({
    fontSize: '30px',
    margin: 'auto',
    fontFamily: 'KingthingsPetrock',
});    

const StyledErrorText = styled.div({
    margin: 'auto',
    fontFamily: 'KingthingsPetrock',
    fontSize: '20px',
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    
    const user = useSelector(selectUser);
    
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
            if (response.payload?.id) {
                dispatch(fetchCampaignsThunk(response.payload.id));
            }
                
            navigate('/');
        });
    }
    
    return (
        <PageWrapper>
            <StyledLoginContainer>
            <StyledLogoWrapper>
            <Logo width={100} height={100}/>
            </StyledLogoWrapper>
            
            <StyledTitleText>
            Log in
            </StyledTitleText>
            
            <LabeledInput
            height="60px"
            label={'Email'}
            value={email}
            onChange={(event) => handleInputChange(event, 'email')}
            submitForm={submitLogin}/>
            <LabeledInput
            height="60px"
            type="password"
            label={'Password'}
            value={password}
            onChange={(event) => handleInputChange(event, 'pass')}
            submitForm={submitLogin}/>
            
            {!!error && (
                <StyledErrorText>
                {error}
                </StyledErrorText>
                )}
                
                <Button
                width="400px"
                onClick={submitLogin}
                margin="10px auto">
                Log in
                </Button>
                
                <Link to="/sign-up">
                <Button 
                width="400px"
                margin="10px auto">
                Sign up
                </Button>
                </Link>
                
                <StyledForgotPassword to="/">
                Forgot your password?
                </StyledForgotPassword>
                
            </StyledLoginContainer>
            
        </PageWrapper>
    )
};
        
export default Login;