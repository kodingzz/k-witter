
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import GithubButton from '../github-mark'
import GoogleButton from '../google-mark'
import { auth } from '../../routes/firebase'
import styled from 'styled-components'


const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 투명도 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Wrapper2 = styled.div`
  background-color: white;
  position: relative;
padding: 50px 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  z-index: 1001;

`
const CancelBtn =styled.div`
position: absolute;
top: 10px;
left:10px;
font-size:20px;
color:black;
font-weight: bold;
cursor: pointer;
`

 const Title = styled.h1`
font-size: 35px;
color:black;
`
const Form = styled.form`
position: relative;
margin-top: 50px;
display: flex;
flex-direction: column;
gap:20px;
width: 100%;

`
const Input = styled.input`
padding: 10px 20px;
border: 1px solid black;
border-radius: 20px;
font-size: 20px;
&[type="submit"]{
    cursor: pointer;
    &:hover{
        opacity: 0.7;
    }
    background-color: #1B90EC;

}


`
const Error = styled.span`
margin-top:40px;
color: tomato;
font-weight:600;
`
 const Switcher =styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
color:#1B90EC;
gap: 15px;
& a{
    color:#3675AE;
}
`

const errors:{[key:string]:string} ={
    'auth/invalid-login-credentials' : 'Email or password is incorrect',
}

export default function ResetPwModal({onClose}){

    const [email,setEmail]= useState('');
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError]= useState('');
    const navigate= useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(isLoading  || email==='') return;
        setError('');   

        try{
             setIsLoading(true);
            await sendPasswordResetEmail(auth,email);
            alert('Check your email!');
            navigate('/login');

        }
        catch(e){
            if(e instanceof FirebaseError){
                setError(e.code);
            }
        }
        finally{
            setEmail('');
            setIsLoading(false);
        }

    }
    
    function handleChangeInput(e:React.ChangeEvent<HTMLInputElement>){
        //  코드 이해 잘 안감? 타입 지정? 
        const  {target:{name,value}} = e;

         if(name==='email'){
            setEmail(value);
        }
    }
    return (
        <Wrapper>
            <Wrapper2>
                <CancelBtn onClick={()=>onClose()}>X</CancelBtn>
                <Title>이메일을 입력해주세요.</Title>
             <Form onSubmit={handleSubmit}>
                <Input name="email" placeholder='email' type='email' required value={email} onChange={handleChangeInput}/> 
                <Input name="button" type='submit' value={isLoading ? 'Loading...' : 'Send'}/>
            </Form>
            {error!=='' && <Error>{error}</Error> }
            <Switcher>
            <Link to="/login">Do you have an Account?</Link>
            <Link to='/signup'>Don't have an Account?</Link>
            </Switcher>
            </Wrapper2>
           
        </Wrapper>
    )
}