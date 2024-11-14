import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({name,control,label,defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label  className='text-sm text-gray-600'>{label}</label>}
        <Controller 
        control={control} 
        name={name || "Content"} 
        defaultValue={defaultValue} 
        render={({ field: {onChange} }) =>(
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
                'undo redo | formatselect | blocks | ' +
                'bold italic underline forecolor backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onEditorChange={onChange}
        />
        )} 
        />
    </div>
  )
}
