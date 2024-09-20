import styled from "styled-components";
import GithubButton from "../components/github-mark";
import GoogleButton from "../components/google-mark";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import SignupModal from '../components/modal/SignupModal';
import LoginModal from '../components/modal/LoginModal';
import { createPortal } from 'react-dom';

const Wrapper =styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr;
    @media (max-width:550px){
    flex-direction: column;
    align-items: start;
}

`
const Div =styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex: 1;

   @media (max-width:550px){
    align-items: start;
}
`
const Col =styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 20px;
    width: 100%;
   flex: 1;
   @media (max-width:550px){
    width: 70%;
}

`
const Wrapper2 =styled.div`
    width:300px;
   
`
const Logo=styled.img`
    width: 370px;
   padding: 20px;
   max-width: 100%; height: auto;
   @media (max-width:550px){
    width: 70px;
   }

`

const Or =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 20px 0;

`
const Line =styled.div`
    border-bottom: 1px solid white;
    width: 40%;
    height: 10px;
    margin-bottom: 10px;
`
const Span =styled.span`
   
`
const H1 =styled.div`
   font-size: 60px;
   margin-bottom: 50px;
   font-weight: bold;
   width: 100%;

   @media (max-width:1060px){
    font-size: 40px;
   }
   @media (max-width:860px){
    font-size: 30px;
   }
   @media (max-width:550px){
    font-size:25px;
}
`
const H2= styled.div`
        font-size: 40px;
      margin-bottom: 60px;
      font-weight: bold;
   width: 100%;

 
   @media (max-width:860px){
    font-size: 25px;
   }
   @media (max-width:550px){
    font-size:20px;
}

`
const SignupBtn= styled.button`
    cursor: pointer;
    margin-top:20px;
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
    background-color:#1D9BF0;
    color:#fff;
    &:hover{
        opacity: 0.7;
    }
`
const LoginBtn= styled.button`
      cursor: pointer;
    margin-top : 20px;
    border: 1px solid #fefefe;
    border-radius: 20px;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width:100%;

    font-weight: 600;
    font-size: 18px;
    background-color:black;
    color:#1D9BF0;
    &:hover{
        opacity: 0.7;
    }
`


export default function Begin(){
    const [isSignupModalOpen,setSignupModalOpen]= useState(false);
    const [isLoginModalOpen,setLoginModalOpen]= useState(false);


    const navigate= useNavigate();
    function handleOpenSignupModal(){
        setSignupModalOpen(true);
    }
    function handleCloseSignupModal(){
        setSignupModalOpen(false);
    }

    function handleOpenLoginModal(){
        setLoginModalOpen(true);
    }
    function handleCloseLoginModal(){
        setLoginModalOpen(false);
    }
    function handleGoLogin(){
        navigate('/login');
    }
    return <Wrapper>
       <Div>
             <Logo src='twitter.svg'/>
        </Div> 

        <Col>
            <H1><span>지금 일어나고 있는 일</span></H1>
            <H2><span>지금 가입하세요.</span></H2>

            <Wrapper2>
                <GoogleButton></GoogleButton>
                <GithubButton></GithubButton>
                <Or>
                    <Line></Line>
                    <Span>또는</Span>
                    <Line></Line>
                </Or>
                <SignupBtn onClick={handleOpenSignupModal}>계정 만들기</SignupBtn>
                {isSignupModalOpen &&createPortal(<SignupModal onClose={handleCloseSignupModal}></SignupModal>, document.getElementById('modal')) }
                <LoginBtn onClick={handleOpenLoginModal}>로그인</LoginBtn>
                {isLoginModalOpen &&createPortal(<LoginModal onClose={handleCloseLoginModal}></LoginModal>, document.getElementById('modal'))}
            </Wrapper2>
           

        </Col>

    </Wrapper>
}