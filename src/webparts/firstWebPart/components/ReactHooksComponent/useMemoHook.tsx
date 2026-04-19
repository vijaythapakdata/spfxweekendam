import { TextField } from '@fluentui/react';
import * as React from 'react';
import { useState,useMemo } from 'react';

const UseMemoHook:React.FC<{}>=()=>{
    const [name,setName]=useState<string>("");
    const greeting=useMemo(()=>{
        return `Hello, ${name}! Welcome to React Hooks.`;
    },[])
    return(
        <>
        <p>{greeting}</p>
        <TextField
        label='Person Name'
        value={name}
        onChange={(_,e)=>setName(e||"")}
        />
        </>
    )
}
export default UseMemoHook;