import styled from 'styled-components'

//  login, signup에서 중복되는 styled-components 코드 

export const Wrapper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
width: 500px;
padding: 50px 0px;
`
export const Title = styled.h1`
font-size: 42px;
`
export const Form = styled.form`
position: relative;
margin-top: 50px;
display: flex;
flex-direction: column;
gap:20px;
width: 100%;

`
export const Input = styled.input`
padding: 10px 20px;
border: none;
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
export const Error = styled.span`
margin-top:40px;
color: tomato;
font-weight:600;
`
export const Switcher =styled.div`
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


