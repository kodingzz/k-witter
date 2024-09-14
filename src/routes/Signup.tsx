import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth } from './firebase'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { Title,Wrapper,Form, Input,Switcher,Error } from '../components/auth-styled-components'
import GithubButton from '../components/github-mark'




export default function Signup(){
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError]= useState('');
    const navigate= useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(isLoading || name==='' || email==='' || password==='') return;
        setError('');   

        try{
        setIsLoading(true);
     //  1) create an account
        const credentials=await createUserWithEmailAndPassword(auth,email,password);
      //  2) set the name of the user.
        await updateProfile(credentials.user,{
            displayName: name
        })
      // 3)  redirect to the home page 
        navigate('/');
        }
        catch(e){
            console.log(e);
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }
        finally{
            setName('');
            setEmail('');
            setPassword('');
            setIsLoading(false);
        }

        //  각각의 name, email, password 정보를 firebase에게 넘겨줘야함

    }
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        //  코드 이해 잘 안감? 타입 지정? 
        const  {target:{name,value}} = e;
        
        if(name==='name'){
            setName(value);
        }
        else if(name==='email'){
            setEmail(value);
        }
        else if(name==='password'){
            setPassword(value);
        }
    }
    return (
        <Wrapper>
            <Title>Sign in to Kwitter</Title>
            <Form onSubmit={handleSubmit}>
                
                <Input name="name" placeholder='Name' type="text" required value={name} onChange={handleChange}/> 
                <Input name="email" placeholder='Email' type='email' required value={email} onChange={handleChange}/> 
                <Input name="password" placeholder="Password" type='password' required value={password} onChange={handleChange}/>
                <Input name="button" type='submit' value={isLoading ? 'Loading...' : 'Sign Up'}/>
            </Form>
            {error!=='' && <Error>{error}</Error> }
            <GithubButton></GithubButton>

            <Switcher>
                <Link to="/login">Do you have an Account?</Link>
            </Switcher>
        </Wrapper>
    )
}