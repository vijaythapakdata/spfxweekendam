import { TextField } from '@fluentui/react';
import * as React from 'react';
import {useState,useEffect} from 'react';

const UseEffectHook:React.FC<{}>=()=>{
    const [name,setname]=useState<string>("");

    useEffect(()=>{
        console.log("UseEfect is called");

        return()=>{
            console.log("UseEffect is unmounted");
        }
    },[name]);

    return(
        <>
        <p>Name:{name}</p>
        <TextField
        label='Name'
        value={name}
        onChange={(_,e)=>setname(e||"")}
        />
        </>
    )
}
export default UseEffectHook

