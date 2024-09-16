import styled from "styled-components";
import { ITweets } from "./timeline";

const Wrapper =styled.div`
   display: grid;
   grid-template-rows: 1fr 3fr;
   padding: 20px;
   border: 1px solid rgba(255,255,255,0.5);
   border-radius:5px;
`
const Column =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Row =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
const UserName =styled.span`
    font-family: 600;
    font-size: 20px;
`
const UploadedDate =styled.span`
    opacity: 0.5;
`
const Payload =styled.p`
    margin-top: 20px;
`

const Photo =styled.img`
width: 300px;
height: 300px;
border-radius: 10px;
margin-top: 10px;

`
export default function Tweet({userName,tweet,photo,createdAt}:ITweets){
    const currentDate = new Date(createdAt).toLocaleDateString('en-US', {
            year:'numeric',
            month:'short',
            day: 'numeric',
            hour:'numeric',
        })

    
    return <Wrapper>
        <Column>
            <Row>
                <UserName>{userName}</UserName>
                <UploadedDate>{currentDate}</UploadedDate>
            </Row>
            
            <Payload>{tweet}</Payload>
        </Column>
        {photo ? (
            <Column>
            <Photo src={photo}/>
            </Column>
        ) : (
            null
        ) 
        }
      

    </Wrapper>
}