import React,{useState,useEffect} from 'react'
import {PostForm,Container} from '../components/index'
import database_services from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom';

function EditPost() {
    const [post,SetPost]=useState([]);
    const navigate=useNavigate();
    const {slug}=useParams();

    useEffect(()=>{
        if(slug){
            database_services.getPost(slug).then(post=>{
                if(post){
                    SetPost(post)
                }
            })
        }
        else{
            navigate("/");
        }
    },[navigate,slug])
  return post ? (
    <div>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost