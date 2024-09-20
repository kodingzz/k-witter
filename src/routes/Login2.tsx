import styled from "styled-components";
import GithubButton from "../components/github-mark";
import GoogleButton from "../components/google-mark";
import { useNavigate } from "react-router-dom";

const Wrapper =styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const Wrapper2 =styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`
const Wrapper3 =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Wrapper4 =styled.div`
    
`
const Logo=styled.img`
    width: 370px;
    height: 370px;
   padding: 20px;

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
    width: 100px;
    height: 10px;
    margin-bottom: 10px;
`
const Span =styled.span`
   
`
const H1 =styled.h1`
    font-size: 60px;
    margin-bottom: 60px;
    font-family: 700;
`
const H2= styled.h2`
        font-size: 40px;
      margin-bottom: 60px;
      font-family: 700;
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
    width: 250px;
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
    width: 250px;
    font-weight: 600;
    font-size: 18px;
    background-color:black;
    color:#1D9BF0;
    &:hover{
        opacity: 0.7;
    }
`
export default function Login2(){
    const navigate= useNavigate();
    function handleGoSignup(){
        navigate('/signup');
    }
    function handleGoLogin(){
        navigate('/login');
    }
    return <Wrapper>
       <Wrapper2>
             <Logo src='twitter.svg'/>
        </Wrapper2> 

        <Wrapper3>
            <H1>지금 일어나고 있는 일</H1>
            <H2>지금 가입하세요.</H2>
            <Wrapper4>
                <GoogleButton></GoogleButton>
                <GithubButton></GithubButton>
            </Wrapper4>
            <Or>
                <Line></Line>
                <Span>또는</Span>
                <Line></Line>

            </Or>
            <SignupBtn onClick={handleGoSignup}>계정 만들기</SignupBtn>
            <LoginBtn onClick={handleGoLogin}>로그인</LoginBtn>

        </Wrapper3>

    </Wrapper>
}