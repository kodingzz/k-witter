import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import {  signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { Title,Wrapper,Form, Input,Switcher,Error} from '../components/auth-styled-components'
import GithubButton from '../components/github-mark'
import GoogleButton from '../components/google-mark'



//  에러를 더 예쁘게 설명해주기 위함
const errors:{[key:string]:string} ={
    'auth/invalid-login-credentials' : 'Email or password is incorrect',
}

export default function Login(){

    const navigate= useNavigate();
    const [user,setUser]= useState({
        email : '',
        password : '',
        isLoading: false,
        error: '',
    })

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
            <Title>Login in to Kwitter</Title>
            <Form onSubmit={handleSubmit}>
                <Input name="email" placeholder='email' type='email' required value={user.email} onChange={handleChangeInput}/> 
                <Input name="password" placeholder="password" type='password' required value={user.password} onChange={handleChangeInput}/>
                <Input name="button" type='submit' value={user.isLoading ? 'Loading...' : 'Log In'}/>
            </Form>
            {user.error!=='' && <Error>{errors[user.error] }</Error> }
            <GithubButton></GithubButton>
            <GoogleButton></GoogleButton>

            <Switcher>
                <Link  to="/signup">Don't have an Account?</Link>
                <Link  to="/resetpassword">Forgot your password?</Link>
               
            </Switcher>
        </Wrapper>
    )
}