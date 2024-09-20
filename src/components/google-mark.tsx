import {   GoogleAuthProvider,  signInWithPopup } from "firebase/auth"
import styled from "styled-components"
import { auth } from "../routes/firebase";
import { useNavigate } from "react-router-dom";

const Button =styled.button`
    cursor: pointer;
    margin-top: 15px;
    border: none;
    border-radius: 20px;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width:100%;

    font-weight: 600;
    font-size: 18px;
    &:hover{
        opacity: 0.7;
    }
`
const Logo = styled.img`
    width: 30px;
    height: 30px;
`

export default function GoogleButton(){
   const navigate= useNavigate();

   async function handleOnclick(){  
       
        try{
            const provider = new GoogleAuthProvider();
            //  await signInWithPopup(auth,provider);
            await signInWithPopup(auth,provider);
            navigate('/');
        }
        catch(error){
            console.log(error);
        }
    }
    return <Button onClick={handleOnclick}>
        <Logo src='/google-mark.svg'/>
        Continue With Google
    </Button>
}