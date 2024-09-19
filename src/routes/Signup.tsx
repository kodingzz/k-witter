import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useReducer } from 'react'
import { auth } from './firebase'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { Title,Wrapper,Form, Input,Switcher,Error } from '../components/styled-components/auth-styled-components'
import GithubButton from '../components/github-mark'
import GoogleButton from '../components/google-mark'
import VerificationModal from '../components/Verification-Modal'


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

export default function Signup(){
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
            <Title>Sign in to Kwitter</Title>
            <Form onSubmit={handleSubmit}>
                
                <Input name="name" placeholder='Name' type="text" required value={user.name} onChange={handleChange}/> 
                <Input name="email" placeholder='Email' type='email' required value={user.email} onChange={handleChange}/>            
                <Input name="password" placeholder="Password" type='password' required value={user.password} onChange={handleChange}/>
                <Input name="button" type='submit' value={user.isLoading ? 'Loading...' : 'Sign Up'}/>
            </Form>
            {user.error!=='' && <Error>{user.error}</Error> }
            <GithubButton></GithubButton>
            <GoogleButton></GoogleButton>

            <Switcher>
                <Link to="/login">Do you have an Account?</Link>
                <Link  to="/resetpassword">Forgot your password?</Link>
            </Switcher>
        </Wrapper>
    )
}