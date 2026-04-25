import * as React from 'react';
// import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { ISharePointListColumns } from '../../../CommonMethods/ISharePointListCoulmns';
import { SharePointFormServiceApi } from '../../../Service/SharePointFormServiceApi';
import { useState,useCallback } from 'react';
import { Dialog } from '@microsoft/sp-dialog';
import { Label, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { HandleMultiSelectedPeoplePicker, HandleSingleSelectedPeoplePicker } from '../../../CommonMethods/PeoplePickerHandler';
import { handleAttachment } from '../../../CommonMethods/AttachmentHandler';
const SharePointForm:React.FC<ISharePointFormProps>=(props)=>{
  const [formdata,setFormdata]=useState<ISharePointListColumns>({
    Name:"",
    Email:"",
    Age:"",
    Experience:0,
    FullAddress:"",
    Compensation:"",
    Permission:false,
    Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[]
  });
  const[att,setatt]=useState<File[]>([]);

const createitems=async()=>{
try{
const _service=new SharePointFormServiceApi(props.siteurl);
const result =await _service.AddItemsList(formdata);
const itemid=result.data.Id;
await _service.uploadFile(itemid,att);
Dialog.alert("Item added successfully");
console.log("Item added successfully",result);
setFormdata({
  Name:"",
    Email:"",
    Age:"",
    Experience:0,
    FullAddress:"",
    Compensation:"",
    Permission:false,
     Admin:"",
    AdminId:0,
    Manager:[],
    ManagerId:[]
});
setatt([])
}

catch(err){
Dialog.alert("Error while adding item to the list");
console.error("Error while adding item to the list",err);
}
}

const handleChange=useCallback((fieldValue:keyof ISharePointListColumns,value:string|number|boolean)=>{
setFormdata(prev=>({...prev,[fieldValue]:
  fieldValue==="Age"||fieldValue==="Compensation"?Number(value):value}));
},[])
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(_,val)=>handleChange("Name",val||"")}
    placeholder='write your name here...'
    iconProps={{iconName:"people"}}
    />
     <TextField
    label='Email Address'
    value={formdata.Email}
    onChange={(_,val)=>handleChange("Email",val||"")}
    placeholder='write your email here...'
    iconProps={{iconName:"mail"}}
    />
    <TextField
    label='Age'
    value={formdata.Age}
    onChange={(_,val)=>handleChange("Age",val||"")}
    />
     <TextField
    label='Compensation'
    value={formdata.Compensation}
    onChange={(_,val)=>handleChange("Compensation",val||"")}
    prefix='$'
    suffix='USD'
    />
<Slider
label='Experience'
value={formdata.Experience}
min={0}
max={25}
step={0.1}
onChange={(val)=>handleChange("Experience",val)}
/>
<Toggle
label="Permission"
checked={formdata.Permission}
onChange={(_,checked)=>handleChange("Permission",!!checked)}
/>
{/* Single Select */}
<PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
  ensureUser={true}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    webAbsoluteUrl={props.siteurl}
    onChange={(items)=>HandleSingleSelectedPeoplePicker(items,setFormdata)} 
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
    />
    {/* Multiselect */}
    <PeoplePicker
    context={props.context as any}
    titleText="Manager"
    personSelectionLimit={3}
    showtooltip={true}
  ensureUser={true}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    webAbsoluteUrl={props.siteurl}
    onChange={(items)=>HandleMultiSelectedPeoplePicker(items,setFormdata)} 
    defaultSelectedUsers={formdata.Manager}
    />
    <Label>Upload File</Label>
    <input
    type='file'
    title='upload file'
    multiple
    onChange={(e)=>handleAttachment(e,setatt)}
    />
<TextField
label='Full Address'
value={formdata.FullAddress}
placeholder='Write your complete address here...'
iconProps={{iconName:'home'}}
onChange={(_,add)=>handleChange("FullAddress",add||"")}
rows={5}
multiline
/>
<br/>
<PrimaryButton
text='Save'
onClick={createitems}
iconProps={{iconName:'save'}}
/>
    </>
  )
}
export default SharePointForm;
