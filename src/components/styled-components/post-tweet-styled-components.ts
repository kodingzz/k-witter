import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
`
export const Wrapper =styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`
export const TextArea= styled.textarea`
    width: 100%;
    height: 200px;
    background-color: transparent;
    color: white;
    border: none;
    outline: none;
    font-size: 30px;
    border-bottom: 1px solid white;
    resize: none;

    &::placeholder{
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus{
        border-bottom: 1px solid #1B90EC;
    }
`
export const TextInputLabel =styled.label`
    cursor: pointer;
   
`
export const TextInput= styled.input``
export const SubmitBtn = styled.input`
    cursor: pointer;
    background-color: #1B90EC;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: 600;

    &:hover{
        opacity: 0.7;
    }
`
export const InputItem =styled.div`
   display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;

    svg{
        width: 25px;
        height: 25px;
        fill: white;
    }
    svg:hover{
        fill: #1B90EC;
    }
`
export const FileCondition =styled.div`
`