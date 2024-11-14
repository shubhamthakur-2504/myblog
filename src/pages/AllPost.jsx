import React,{useEffect, useState} from 'react'
import service from '../service/config'
import { Container, PostCard } from '../components'
export default function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        service.getAllPost([]).then(posts => {
            if(posts){
                setPosts(posts.documents)
            }
        }).catch(error => {
            console.log(error)
        })
    },[])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
            {posts.map(post=>(
                <div key={post.$id} className='p-2 w-1/4' >
                    <PostCard post={post}/>
                </div>
                
            ))}
        </div>
      </Container>
    </div>
  )
}
