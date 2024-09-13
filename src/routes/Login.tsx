import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'
import { Title,Wrapper,Form, Input,Switcher,Error } from '../components/auth-styled-components'


//  에러를 더 예쁘게 설명해주기 위함
const errors:{[key:string]:string} ={
    'auth/invalid-login-credentials' : 'Email or password is incorrect',
}


export default function Login(){
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError]= useState('');
    const navigate= useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(isLoading  || email==='' || password==='') return;
        setError('');   

        try{
        setIsLoading(true);
        await signInWithEmailAndPassword(auth,email,password);
        navigate('/');
        }
        catch(e){
            if(e instanceof FirebaseError){
                console.log(e.code,e.message);
                setError(e.code);
            }
        }
        finally{
            setEmail('');
            setPassword('');
            setIsLoading(false);
        }

    }
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        //  코드 이해 잘 안감? 타입 지정? 
        const  {target:{name,value}} = e;
        
         if(name==='email'){
            setEmail(value);
        }
        else if(name==='password'){
            setPassword(value);
        }
    }
    return (
        <Wrapper>
            <Title>Login in to Kwitter</Title>
            <Form onSubmit={handleSubmit}>
                <Input name="email" placeholder='email' type='email' required value={email} onChange={handleChange}/> 
                <Input name="password" placeholder="password" type='password' required value={password} onChange={handleChange}/>
                <Input name="button" type='submit' value={isLoading ? 'Loading...' : 'Log In'}/>
            </Form>
            {error!=='' && <Error>{errors[error] }</Error> }
            <Switcher>
                <Link  to="/signup">Don't have an Account?</Link>
            </Switcher>
        </Wrapper>
    )
}