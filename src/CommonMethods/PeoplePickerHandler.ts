import *as React from 'react';
import { ISharePointListColumns } from './ISharePointListCoulmns';

export const HandleSingleSelectedPeoplePicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<ISharePointListColumns>>)=>{

if(items.length>0){
    setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}));
}    
else{
    setFormData(prev=>({...prev,Admin:"",AdminId:0}));
}
}
export const HandleMultiSelectedPeoplePicker=(items:any[],setFormData:React.Dispatch<React.SetStateAction<ISharePointListColumns>>)=>{
setFormData(prev=>({...prev,Manager:items.map(i=>i.text),ManagerId:items.map(i=>i.id)}))



}