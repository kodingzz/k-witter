
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import GithubButton from '../github-mark'
import GoogleButton from '../google-mark'
import { auth } from '../../routes/firebase'
import styled from 'styled-components'
import ResetPwModal from './ResetPwModal'


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

const ResetPwBtn =styled.button`

`

const errors:{[key:string]:string} ={
    'auth/invalid-login-credentials' : 'Email or password is incorrect',
}

export default function LoginModal({onClose}){

    const navigate= useNavigate();
    const [user,setUser]= useState({
        email : '',
        password : '',
        isLoading: false,
        error: '',
    })
    const [isOpen,setIsOpen]= useState(false);

    function handleOpen(){
        setIsOpen(true);

    }

    function handleClose(){
        setIsOpen(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(user.isLoading  || user.email==='' || user.password==='') return;
        setUser(prev=>{
            return{
              ...prev,
              error:'',
            } 
          })
        try{
        setUser(prev=>{
            return{
              ...prev,
              isLoading:true,
            } 

          })
        await signInWithEmailAndPassword(auth,user.email,user.password);
        navigate('/');
        }
        catch(e){
            if(e instanceof FirebaseError){
                console.log(e.code,e.message);
                setUser(prev=>{
                    return{
                      ...prev,
                      error:e.code,
                    } 
                  })
            }
        }
        finally{
            setUser(prev=>{
              return{
                ...prev,
                email: '',
                password:'',
                isLoading : false,
              } 
            })
        }

    }
    
    function handleChangeInput(e:React.ChangeEvent<HTMLInputElement>){
        //  코드 이해 잘 안감? 타입 지정? 
        const  {target:{name,value}} = e;
        
         if(name==='email'){
            setUser(prev=>{
                return{
                  ...prev,
                  email:value,
                } 
              })
        }
        else if(name==='password'){
            setUser(prev=>{
                return{
                  ...prev,
                  password:value,
                } 
              })
        }
    }
    return (
        <Wrapper>
            <Wrapper2>
                <CancelBtn onClick={()=>onClose()}>X</CancelBtn>
                <Title>Kwitter 로그인하기</Title>
            <Form onSubmit={handleSubmit}>
                <Input name="email" placeholder='email' type='email' required value={user.email} onChange={handleChangeInput}/> 
                <Input name="password" placeholder="password" type='password' required value={user.password} onChange={handleChangeInput}/>
                <Input name="button" type='submit' value={user.isLoading ? 'Loading...' : 'Log In'}/>
            </Form>
            {user.error!=='' && <Error>{errors[user.error] }</Error> }
            <GithubButton></GithubButton>
            <GoogleButton></GoogleButton>

            <Switcher>
                <Link  to="/resetpassword">비밀번호를 잊으셨나요?</Link>
            </Switcher>
            </Wrapper2>
           
        </Wrapper>
    )
}