
import styled from 'styled-components';
import PostTweetForm from '../components/post-tweet-form';
import TimeLine from '../components/timeline';

const Wrapper= styled.div`
    display: grid;
    grid-template-rows: 1fr 6fr;
    gap:30px;
`


export default function Home(){
   return <Wrapper>
        <PostTweetForm></PostTweetForm>
        <TimeLine></TimeLine>
    </Wrapper>
  
}
