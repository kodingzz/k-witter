import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { auth, db, storage } from "./firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import  { ITweets } from "../components/timeline";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Tweet from "../components/tweet";


const Wrapper =styled.div`  
display: flex;
flex-direction: column;
align-items:center;
gap: 20px;
`
const AvatarUpload =styled.label`
width: 80px;
height: 80px;
border-radius: 50%;
background-color: #1B90EC;
overflow: hidden;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
svg{
    width: 50px;
    
}
`
const AvatarImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;

`
const AvatarInput =styled.input`

`

const Name =styled.span`
font-size: 25px;
`
const Tweets= styled.div`
margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
`

const Row =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
const Form =styled.form`
    
`

const EditName =styled.div`
    background-color: black;
    border: none;
    color:white;
    cursor: pointer;
    width: 20px;
`
const NameInput = styled.input`
    background-color: black;
    color:white;
    border: none;
    border-bottom:  2px solid white;
    outline: none;
    padding: 5px;
    font-size: 18px;
    width: 100%;

    &:focus{
        border-bottom: 2px solid #1B90EC;
    }
`


export default function Profile(){ 
    const user= auth.currentUser;
    const [avatar,setAvatar] =useState(user?.photoURL); 
    const [tweet,setTweet]= useState<ITweets[]>([]);
    const [isEdit,setIsEdit]= useState(false);
    const [userName,setUserName]= useState(user?.displayName ?? "Anonymous");

    function handleEditName(){
        setIsEdit(true);
    }
    function  handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setUserName(e.target.value);
    }

    async function handleSaveName(e:React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if(!user ) return; 
        await updateProfile(user,{displayName :userName});
        setIsEdit(false);
    }
    function handleESC(e:React.KeyboardEvent){
        if(e.key==='Escape'){
            setIsEdit(false);
            return;
        }

    }


    async function handleAvatarChange(e:React.ChangeEvent<HTMLInputElement>){
        const {files}  =e.target;
        if(!user) return; 
        if(files && files.length===1){
            const file = files[0];
            const locationRef= ref(storage,`avatars/${user?.uid}`);
            const uploadResult= await uploadBytes(locationRef,file);
            const url = await getDownloadURL(uploadResult.ref);

            await updateProfile(user,{photoURL :url});
            setAvatar(url);
        }
    }
    async function fetchTweets() {
        //  쿼리해서 데이터를 가져올때 filtering 해야할 경우  firestore는 flexible 하기 때문에  firestore에게 index를 만들라고 요청해야함
        const tweetQuery =query(collection(db,'tweets'),where('userId','==',user?.uid), orderBy('createdAt',"desc"),limit(25));
        
        const snapshot = await  getDocs(tweetQuery);
        
        const tweets= snapshot.docs.map(doc=>{
            const {createdAt,photo, tweet,userId,userName} = doc.data();
            return {
                createdAt,
                photo,
                tweet,
                userId,
                userName,
                docId: doc.id,
            }
        })
        setTweet(tweets);
    }

    useEffect(()=>{fetchTweets()},[]);
    return <Wrapper>
        <AvatarUpload htmlFor="avatar"> 
            {avatar  
            ? <AvatarImg src={avatar}/>
            :(
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
            ) 
}
        </AvatarUpload>
        <AvatarInput id="avatar"  type="file" accept="image/*" hidden onChange={handleAvatarChange}/>
        <Row>
            {isEdit ? (
                <Form onSubmit={handleSaveName}>  
                    <NameInput value={userName} onChange={handleChange} onKeyDown={handleESC}/> 
                </Form>
            ) : (
                <>
                    <Name>{user?.displayName ?? 'Anonymous'}</Name>
                    <EditName onClick={handleEditName}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    </EditName>
                </>

            )}
           
        </Row>
        <Tweets>
            {tweet.map(item=><Tweet key={item.docId} {...item}></Tweet>)}
        </Tweets>
    </Wrapper>
}