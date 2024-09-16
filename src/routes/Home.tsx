
import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form';
import TimeLine from '../components/timeline';

const Wrapper= styled.div`
    display: grid;
    grid-template-rows: 1fr 5fr;
    gap:50px;
`


export default function Home(){
   return <Wrapper>
        <PostTweetForm></PostTweetForm>
        <TimeLine></TimeLine>
    </Wrapper>
  
}
