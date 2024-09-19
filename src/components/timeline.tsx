import { collection, limit, onSnapshot, orderBy, query, Unsubscribe } from "firebase/firestore";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { db } from "../routes/firebase";
import Tweet from "./tweet";

const Wrapper =styled.div`
display:flex;
flex-direction: column;
gap: 10px;
`

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
   
    
    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null;
        
            async function fetchTweets(){
                // 1. 가장 최근에 만든 게시물이 제일 위로 오게 정렬하여 db에서 tweets이름의 collection을 query한다.
                const tweetsQuery =query(collection(db ,'tweets'), orderBy('createdAt',"desc"),limit(25));
                // 2. 해당 collection의 document들을 가져온다.
            //     const snapshot=await getDocs(tweetsQuery); 
                
            //      //3.  document들을  ITweets 형태에 맞게 mapping한다.
            //     const tweets=snapshot.docs.map(doc=>{
            //     const {createdAt,photo,tweet,userId,userName} = doc.data();
            //     return {
            //         docId: doc.id,
            //         createdAt,
            //         photo,
            //         tweet,
            //         userId,
            //         userName,
            //     }
            //    })
            
            //  특정 문서나 컬렉션, 쿼리에서 변경사항이 일어날때 실시간으로 이벤트 콜백 함수를 실행해줄 수있다.
            // 해당 컴포넌트가 마운트될때 구독되고 언마운트 될때 구독 취소
            unsubscribe= await onSnapshot(tweetsQuery,(snapshot)=>{
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
                        });
                    // 4. 매핑되어 배열에 저장된 tweets을 setTweet
                setTweet(tweets);
                });
            }
            fetchTweets();
            // cleanup function : 해당 컴포넌트가 언마운트 됄때 호출
            return () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                unsubscribe && unsubscribe();
            };
        
    },[]); 

    
    return <Wrapper>
        {tweet.map(tweet=><Tweet key={tweet.docId} {...tweet}></Tweet>)}
        </Wrapper>
       

}