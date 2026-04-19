import { TextField } from '@fluentui/react';
import * as React from 'react';
import {useState,useEffect,useCallback} from 'react';

const UseCallBackHook:React.FC<{}>=()=>{
  
    const [formdata,setFormdata]=useState({
        name:"",
        email:"",
        address:"",
        phone:""
    });

    useEffect(()=>{
        console.log("UseEfect is called");

        return()=>{
            console.log("UseEffect is unmounted");
        }
    },[]);

    const handleChange=useCallback((field:string,value?:string)=>{
        setFormdata(prev=>({...prev,[field]:value}));
    },[]);

    return(
        <>
       
        <TextField
        label='Name'
        value={formdata.name}
        onChange={(e,v)=>handleChange('name',v)}
        />
        
        <TextField
        label='Email Address'
        value={formdata.email}
        onChange={(e,v)=>handleChange('email',v)}
        iconProps={{iconName:'mail'}}
        />
        
        <TextField
        label='Phone '
        value={formdata.phone}
        onChange={(e,v)=>handleChange('phone',v)}
            iconProps={{iconName:'phone'}}
        />
         <TextField
        label='Full Address'
        value={formdata.address}
        onChange={(e,v)=>handleChange('address',v)}
            iconProps={{iconName:'location'}}
            multiline
            rows={5}
        />
        
        </>
    )
}
export default UseCallBackHook

