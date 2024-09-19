
import { addDoc, collection, updateDoc } from "firebase/firestore"; 
import { useState } from 'react';
import { auth,db, storage} from '../routes/firebase';
import { Form,TextArea,Wrapper,FileCondition,TextInputLabel,InputItem ,TextInput,SubmitBtn } from "./styled-components/post-tweet-styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



export  default function PostTweetForm(){
    const [post,setPost]= useState<{
    isLoading: boolean,
    tweet: string,
    file: File | null,
}>
({
        isLoading: false,
        tweet: '',
        file: null,
    })
    

    function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        setPost(prev=>{
            return{
                ...prev,
                tweet: e.target.value,
            }
        })
    }
    function handleFileChange(e:React.ChangeEvent<HTMLInputElement>){
        const {files} = e.target;
        if(files && files.length===1){
            setPost(prev=>{
                return {
                    ...prev,
                    file: files[0],
                }
            })
        }
    }
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const user= auth.currentUser;
        console.log(user);
        
        
        if(!user|| post.isLoading  || post.tweet.length>300  || post.tweet.trim()==='')return;
       
        try{
            setPost(prev=>{
                return{
                    ...prev,
                    isLoading:true,
                }
            })
            if(confirm('you really post?')){
                const doc= await addDoc(collection(db,"tweets"),{
                    tweet: post.tweet,
                    createdAt:  Date.now(),
                    userName :  user.displayName || 'Anonymous',
                    userId :user.uid,
                })

                
                if(post.file){
                    const locationRef= ref(storage,`tweets/${user.uid}/${doc.id}`);
                   const uploadResult= await uploadBytes(locationRef,post.file);
                  const url= await getDownloadURL(uploadResult.ref);
                  await updateDoc(doc,{photo:url});
                }
            }

        }catch(error){
            console.log(error);
        }
        finally{
            setPost(prev=>{
                return{
                    ...prev,
                    tweet:'',
                    file: null,
                    isLoading:false,
                }
            })
        }
    }
    
    return  <Form onSubmit={handleSubmit}>
                <TextArea placeholder='What is happening?' maxLength={300}  autoFocus onChange={handleChange} value={post.tweet} required/>

                <Wrapper>
                    <FileCondition>
                    {post.file ? "Photo added ✅" : ''}
                    </FileCondition>
                    <TextInputLabel htmlFor='file'>
                        <InputItem>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"  />
                            </svg>
                        </InputItem>
                    </TextInputLabel>
                    <TextInput hidden id='file' type='file' accept='image/*' onChange={handleFileChange}/>

                    <SubmitBtn type='submit' value={post.isLoading ?"Posting..." :"Post"}/>
                </Wrapper>
            
            </Form>
}