import * as React from 'react';
import styles from './GetAllusers.module.scss';
import type { IGetAllusersProps } from './IGetAllusersProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState,useCallback } from 'react';
import { IUserInfo } from '../../../CommonMethods/ISharePointListCoulmns';
import { DetailsList, PrimaryButton, SearchBox, Spinner } from '@fluentui/react';

const GetAllusers:React.FC<IGetAllusersProps>=(props)=>{
  const [users,setUsers]=useState<IUserInfo[]>([]);
  const [search,setSearch]=useState<string>('');
  const [nextLink,setNextLink]=useState<string|null>(null);
  const [loading,setLoading]=useState<boolean>(false);

  const getUsers=useCallback(async(url?:string)=>{
setLoading(true)
const client=await props.graphClient.getClient("3");
const response=url? await client.api(url).get():await client.api("/users")
.version("v1.0").select("id,displayName,mail,department,jobTitle").top(5).get();

const list:IUserInfo[]=response.value.map((u:any)=>({
  id:u.id,
  displayName:u.displayName,
  mail:u.mail,
  department:u.department,
  jobTitle:u.jobTitle
}));
setUsers(list);

setNextLink(response['@odata.nextLink']||null);
setLoading(false)

  },[]);

  //next page
  const nextPage=()=>{
    if(nextLink) getUsers(nextLink);
  }

  const filteredItems=users.filter((item)=>item?.displayName?.toLowerCase().includes(search.toLowerCase())

|| item?.mail?.toLowerCase().includes(search.toLowerCase())||
item?.jobTitle?.toLowerCase().includes(search.toLowerCase())

|| item?.department?.toLowerCase().includes(search.toLowerCase())

)
  return(
    <>
    <PrimaryButton
    text='Get Users'
    onClick={()=>getUsers()}
    iconProps={{iconName:"user"}}
      style={{marginTop:20}}
    />
    <br/>
    <SearchBox
    placeholder='search here'
    value={search}
    onChange={(_,val)=>setSearch(val||"")}
    style={{width:300,marginTop:20}}
    />
    {loading&&<Spinner label='laoding users'></Spinner>}
    {/* Detailist */}
    <DetailsList
    items={filteredItems}
    />
    {/* next button */}
    {nextLink&&(
      <PrimaryButton
      text='Next Page'
      onClick={nextPage}
      style={{marginTop:20}}
      iconProps={{iconName:'next'}}
      />
    )}
    </>
  )
}
export default GetAllusers;