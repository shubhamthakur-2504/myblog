import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import service from '../service/config'
import { Container, PostForm } from '../components'
export default function EditPost() {
    const navigate = useNavigate()
    const slug = useParams()
    const [post, setPost] = useState({})
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then(post => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate("/")
        }
    },[])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ): null
}
