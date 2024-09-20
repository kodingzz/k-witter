import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
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



function userReducer(state: any,action: { type: string; value: any }){
    if(action.type==='ERROR'){
        return {
            ...state,
            error:action.value,
        }
    }
    else if(action.type==='NAME'){
        return {
            ...state,
            name:action.value,
        }
    }
    else if(action.type==='EMAIL'){
        return {
            ...state,
            email:action.value,
        }
    }
    else if(action.type==='PASSWORD'){
        return {
            ...state,
            password:action.value,
        }
    }
    else if(action.type==='LOADING'){
        return {
            ...state,
            isLoading:action.value,
        }
    }
    else if(action.type==='INIT'){
        return {
            ...state,
            name: '',
            email : '',
            password : '',
            isLoading: false,
        }
    }
}

export default function SignupModal({onClose}){
    const [user,userDispatch]= useReducer(userReducer,{
        name: '',
        email : '',
        password : '',
        isLoading: false,
        error: '',
    });
    

    const navigate= useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(user.isLoading || user.name==='' || user.email==='' || user.password==='') return;         
        userDispatch({type:'ERROR',value:''})

        try{
            userDispatch({type:'ERROR',value:true})
     //  1) create an account
        const credentials=await createUserWithEmailAndPassword(auth,user.email,user.password);
      //  2) set the name of the user.
        await updateProfile(credentials.user,{
            displayName: user.name
        })
      // 3)  redirect to the home page 
        navigate('/');
        }
        catch(e){
            if(e instanceof FirebaseError) userDispatch({type:'ERROR',value:e.message})
        }
        finally{
            userDispatch({type:'INIT', value: ''})
        }

    }
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        //  코드 이해 잘 안감? 타입 지정? 
        const  {target:{name,value}} = e;
        
        if(name==='name'){
            userDispatch({type:'NAME',value:value})
            
        }
        else if(name==='email'){
            userDispatch({type:'EMAIL',value:value})

        }
        else if(name==='password'){
            userDispatch({type:'PASSWORD',value:value})
        }
    }
    return (
        <Wrapper>
            <Wrapper2>
                <CancelBtn onClick={()=>onClose()}>X</CancelBtn>
                <Title>계정을 생성하세요</Title>
                <Form onSubmit={handleSubmit}>
                    <Input name="name" placeholder='Name' type="text" required value={user.name} onChange={handleChange}/> 
                    <Input name="email" placeholder='Email' type='email' required value={user.email} onChange={handleChange}/>            
                    <Input name="password" placeholder="Password" type='password' required value={user.password} onChange={handleChange}/>
                    <Input name="button" type='submit' value={user.isLoading ? 'Loading...' : 'Sign Up'}/>
                </Form>
                {user.error!=='' && <Error>{user.error}</Error> }
                {/* <GithubButton></GithubButton>
                <GoogleButton></GoogleButton> */}

                {/* <Switcher>
                    <Link to="/login">Do you have an Account?</Link>
                    <Link  to="/resetpassword">Forgot your password?</Link>
                </Switcher> */}

            </Wrapper2>
     
    </Wrapper>
    )
}