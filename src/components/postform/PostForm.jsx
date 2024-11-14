import React, {useCallback, useEffect} from 'react'
import{ RTE, Button, Input, Select} from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../service/config'



export default function PostForm(post) {
    const navigate = useNavigate()
    const {register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })
    const userData = useSelector(state=>state.auth.userData)
    const submit = async (data) => {
        try {
            if(post){
                const file = data.image[0] ? service.uploadFile(data.image[0]) : null
                if(file){
                    service.deleteFile(post.image)
                }
                const updatedPost = await service.updatePost(post.$id,{...data,image:file ? file.$id : post.image})
                if(updatedPost){
                    navigate(`/post/${updatedPost.$id}`)
                }
            }else{
                const file = await service.uploadFile(data.image[0])
                if(file){
                    const post = await service.createPost({...data,image:file.$id,UserId:userData.$id})
                }
                if(post){
                    navigate(`/post/${post.$id}`)
                }
            }
        } catch (error) {
            console.log("post form :: submit :: error",error)        
        }
    }
    const slug = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.replace(/\s/g, "-").toLowerCase()
        }
        return "";
    },[])
    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === "title") setValue("slug",slug(value.title,{shouldValidate: true}))
        })
        return ()=>subscription.unsubscribe()
    },[watch,slug,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slug(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={service.getFilePreview(post.Image)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}
