import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { db } from "../routes/firebase";
import Tweet from "./tweet";

const Wrapper =styled.div``

// tweet의 type 설정을 위한 interface 
export interface ITweets {
    docId: string;
    createdAt: number;
    //  ? 를 넣으면 필수가 아님
    photo?:string;
    tweet:string;
    userId:string;
    userName:string;
}

export default function TimeLine(){
    // tweet의 타입은 ITweets interface 형태를 가진다
    const [tweet,setTweet] =useState<ITweets[]>([]);
    
    async function fetchTweets(){
         // 1. 가장 최근에 만든 게시물이 제일 위로 오게 정렬하여 db에서 tweets이름의 collection을 query한다.
        const tweetsQuery =query(collection(db ,'tweets'), orderBy('createdAt',"desc"));
         // 2. 해당 collection의 document들을 가져온다.
        const snapshot=await getDocs(tweetsQuery); 
         //3.  document들을  ITweets 형태에 맞게 mapping한다.
        const tweets=snapshot.docs.map(doc=>{
        const {createdAt,photo,tweet,userId,userName} = doc.data();
        return {
            docId: doc.id,
            createdAt,
            photo,
            tweet,
            userId,
            userName,
        }
       })
        // 4. 매핑되어 배열에 저장된 tweets을 setTweet해서 tweet의 상태를 변경해준다.
       setTweet(tweets);
    }

    
    useEffect(()=>{fetchTweets()},[]); 


    return <Wrapper>
        {tweet.map(tweet=><Tweet key={tweet.docId} {...tweet}></Tweet>)}
        </Wrapper>
       

}