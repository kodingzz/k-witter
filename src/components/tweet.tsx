
import { ITweets } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Wrapper, Column,Row,UserName,UploadedDate,Payload,Photo,Div,DeleteBtn,EditBtn,EditTextArea,EditTextLabel,EditTextInput,CancelBtn,UpdateBtn,InputItem,Wrapper2,DeleteImg} from "./styled-components/tweet-styled-components";
import { FileCondition } from "./styled-components/post-tweet-styled-components";
import styled from 'styled-components';

const Avatar =styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
overflow: hidden;

`
const AvatarImg =styled.img`
width: 100%;
height: 100%;
`

export default function Tweet({userName,tweet,photo,createdAt,userId,docId,profileImg}:ITweets){
    
    
    const updatedDate = new Date(createdAt).toLocaleDateString('en-US', {
            year:'numeric',
            month:'short',
            day: 'numeric',
            hour:'numeric',
        })
    const user= auth.currentUser;
    
    const [edit,setEdit]= useState<{
        isLoading: boolean,
        isEdit: boolean,
        tweet: string,
        file: File | null,
    }>
    ({
            isLoading: false,
            isEdit:false,
            tweet: tweet,
            file: null,
        })
       
        
        function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>){
            setEdit(prev=>{
                return{
                    ...prev,
                    tweet: e.target.value,
                }
            })
        }
        function handleFileEdit(e:React.ChangeEvent<HTMLInputElement>){
            const {files} = e.target;
            
            if(files && files.length===1){
                setEdit(prev=>{
                    return {
                        ...prev,
                        file: files[0],
                    }
                })
            }
        }
    
        async function handleDeleteBtn(){
            try{
                if(confirm('you really delete this tweet?')){
                    await deleteDoc(doc(db,"tweets",docId));
                    if(photo){
                        const photoRef =ref(storage,`tweets/${userId}/${docId}`);
                        await deleteObject(photoRef);
                    }
             }
            }
            catch(error){
                console.log(error); 
            }
        }
    
        async function handleEditBtn(){
            setEdit(prev=>{
                return{
                    ...prev,
                    isEdit:true,
                }
            })  
        }
        function handleCancel(){
            setEdit(prev=>{
                return{
                    ...prev,
                    isEdit:false,
                }
            })  
        }
        async function handleUpdate(){
           if(edit.isLoading || edit.tweet.trim()==='' || edit.tweet.length>300) return;

            try{
                if(confirm('you want update?')){
                    setEdit(prev=>{
                        return{
                            ...prev,
                            isLoading:true,
                        }
                    })  
                    await updateDoc(doc(db,"tweets",docId),{tweet: edit.tweet});

                    if(edit.file){
                        const locationRef= ref(storage,`tweets/${userId}/${docId}`);
                       const uploadResult= await uploadBytes(locationRef,edit.file);
                      const url= await getDownloadURL(uploadResult.ref);
                      await updateDoc(doc(db,"tweets",docId),{ photo:url});
                    }
                }
               
            }
            catch(error){
                console.log(error);
                
            }
            finally{
                setEdit(prev=>{
                    return{
                        ...prev,
                        isLoading:false,
                        isEdit:false,
                        file:null,
                    }
                })  
            }
        }
        async function handleDeleteImg(){
            if (user?.uid !== userId) return;
            try{
                if(photo){
                    const photoRef =ref(storage,`tweets/${userId}/${docId}`);
                    await deleteObject(photoRef);
                    await updateDoc(doc(db, 'tweets', docId), {
                        photo: deleteField(),
                      });
                }
            }
            catch(e){
                console.log(e);
            }
           
        }
        

        return    <Wrapper>
             <Column>
             <Row>
                <Div>
                <Avatar> 
                        {profileImg
                        ? <AvatarImg src={profileImg}/>
                        :(
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        ) 
                        }
                 </Avatar>
                <UserName>{userName}</UserName>
                <UploadedDate>{updatedDate}</UploadedDate>
                </Div>
              
              {user?.uid===userId ? (
                <Div>
                <EditBtn onClick={handleEditBtn} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                </EditBtn>
                <DeleteBtn onClick={handleDeleteBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                </DeleteBtn>  
                </Div>

              ) :  null}
            </Row>  
        </Column>

        {!edit.isEdit ?  ( 
            <>
             <Column>
             <Payload>{tweet}</Payload> 
            </Column>
            
             <Column>
                {photo ? <Photo src={photo}/> : null}
            </Column>
            </>
        ) : (
            <>
            <Column>
                <EditTextArea required value={edit.tweet} onChange={handleChange}></EditTextArea>
           </Column>
           
            <Column>
         
               {photo ? (
                <Wrapper2>
                    <Photo src={photo}/> 
                    <DeleteImg onClick={handleDeleteImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                    </DeleteImg>
                </Wrapper2>
                
                
            ): null}
           </Column>
           
           <Wrapper2>
                <FileCondition>
                    {edit.file ? "Photo added ✅" : ''}

                </FileCondition>
                <EditTextLabel htmlFor="editFile">
                <InputItem>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"  />
                            </svg>
                </InputItem>
                </EditTextLabel>
                <EditTextInput id="editFile" type="file" accept="image/*" hidden onChange={handleFileEdit} />
                <UpdateBtn onClick={handleUpdate}>{edit.isLoading ? 'Updating...' : 'Update'}</UpdateBtn>
                <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
           </Wrapper2>
           </>
        )}
       

        </Wrapper>
       
        
        


}