import * as React from 'react';
export const handleAttachment=(event:React.ChangeEvent<HTMLInputElement>,setAttachment:React.Dispatch<React.SetStateAction<File[]>>)=>{
    const files=event.target.files;
    if(!files) return;
    //convert filelist-file

    const newfiles=Array.from(files);
    setAttachment(prev=>[...prev,...newfiles])
}