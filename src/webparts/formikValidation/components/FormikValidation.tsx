import * as React from 'react';
import styles from './FormikValidation.module.scss';
import type { IFormikValidationProps } from './IFormikValidationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../Service/FormikServics';
 import { Formik, Form, Field, FormikProps  } from 'formik';
 import * as Yup from 'yup';
 import { useState,useEffect } from 'react';
 import {sp} from "@pnp/sp/presets/all"
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DateFormate, DatePickerString } from '../../../CommonMethods/IDatePickerFormat';
const stackTokens={childrenGap:15};
const FormikValidation:React.FC<IFormikValidationProps>=(props)=>{
  const [service,setservice]=useState<ReturnType<typeof FormikService>|null>(null);
  useEffect(()=>{
sp.setup({
  spfxContext:props.context as any
});
setservice(FormikService())
  },[props.context,props.siteurl]);
 const SignupSchema = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  details:Yup.string().min(15,"Minimum characters are required").required("Details are required"),
  startDate:Yup.date().required("Start date is required"),
  endDate:Yup.date().required("End date is required"),
  projectName:Yup.string().required("Project Name is required"),
  phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"Phone number must be 10 digits"),
  emailAddress:Yup.string().email("Invalid email format").required("Email Address is required")
  .test("Invalid =domain","Personal Email domains(hotmail.com,gmail.com,yahoo.com,onmicrosoft.com) are not allowed",

    (value)=>{
      if(!value) return false;
      const email =value.toLowerCase();
      //block all personal domains
      const blockeddomain=["hotmail.com","gmail.com","yahoo.com","onmicrosoft.com"];
      return !blockeddomain.some(domain=>email.endsWith(domain));
    }
  )
 });

 const getFieldProps=(formik:FormikProps<any>,field:string)=>({
  ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
 });

 //create item
 const addrecord=async(items:any)=>{
  try{
    if(!service) return ;
    const item=await service.createItems({
      Title:items.name,
      TaskDetails:items.details,
      StartDate:items.startDate,
      EndDate:items.endDate,
      ProjectName:items.projectName,
      EmailAddress:items.emailAddress,
      PhoneNumber:items.phoneNumber
    });
    Dialog.alert("saved successfult"),
    console.log(item);

  }
  catch(err){
    console.error(err);

  }
 }


return(
  <>
  <Formik
  
  initialValues={{
    name:"",
    details:"",
    startDate:"",
    endDate:"",
    projectName:"",
    phoneNumber:"",
    emailAddress:""
  }}
  validationSchema={SignupSchema}
  onSubmit={(values,helpers)=>{
    addrecord(values).then(()=>helpers.resetForm())
  }}
  >
{(formik:FormikProps<any>)=>(
  <form onSubmit={formik.handleSubmit}>

<Stack tokens={stackTokens}>
  <PeoplePicker
      context={props.context as any}
      titleText="User Name"
      personSelectionLimit={1}
      showtooltip={true}
      disabled={true}
    ensureUser={true}
      principalTypes={[PrincipalType.User]}
      resolveDelay={1000}
      webAbsoluteUrl={props.siteurl}
   
      defaultSelectedUsers={[props.context.pageContext.user.displayName]}
      />
      <TextField
      label='Name'iconProps={{iconName:'People'}}
      {...getFieldProps(formik,"name")}
      />
      <TextField
      label='Email Address'iconProps={{iconName:'mail'}}
      {...getFieldProps(formik,"emailAddress")}
      />
<TextField
      label='Phone Number'iconProps={{iconName:'telephone'}}
      {...getFieldProps(formik,"phoneNumber")}
      />
      <Dropdown
      label='Project Name'
      options={[
        {key:"Project 1",text:"Project 1"}
      ]}
      onChange={(_,e)=>formik.setFieldValue("projectName",e?.key as string)}
      errorMessage={formik.errors.projectName as string}
      />
      <DatePicker
      label='Start Date'
      value={formik.values.startDate}
      strings={DatePickerString}
      formatDate={DateFormate}
      textField={{...getFieldProps(formik,"startDate")}}
      onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
      />
       <DatePicker
      label='End Date'
      value={formik.values.endDate}
      strings={DatePickerString}
      formatDate={DateFormate}
      textField={{...getFieldProps(formik,"endDate")}}
      onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
      />
      <TextField
      label='Task Details'iconProps={{iconName:'book'}}
      {...getFieldProps(formik,"details")}
      multiline
      rows={3}
      />

</Stack>
<br/>
<PrimaryButton
text="Save"
type='submit'
iconProps={{iconName:'save'}}
/>
&nbsp;&nbsp;&nbsp;
<PrimaryButton
text="Reset"
iconProps={{iconName:'reset'}}
onClick={formik.handleReset as any}
/>

  </form>
)}

  </Formik>
  </>
)
}
export default FormikValidation;
