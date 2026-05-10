import * as React from 'react';
// import styles from './LargeList.module.scss';
import type { ILargeListProps } from './ILargeListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ServiceLargeListClass } from '../../../Service/LargeListService';
import { useEffect,useState,useMemo } from 'react';
import { IDropdownOption ,Dropdown, PrimaryButton, DetailsList } from '@fluentui/react';


const pagedItems:IDropdownOption[]=[
  {key:5,text:'5 items'},
  {key:10,text:'10 items'},
  {key:15,text:'15 items'},
  {key:20,text:'20 items'},
]

const LargeList:React.FC<ILargeListProps>=(props)=>{
  const [pagedObject,setPageObject]=useState<any>(null);
  const [previousPageStack,setpreviousPageStack]=useState<any[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [pageSize,setPageSize]=useState<number>(10);
  const [allItems,setAllItems]=useState<any[]>([]);

  const service=useMemo(()=>{
    return new ServiceLargeListClass(props.context);
  },[]);

  useEffect(()=>{
loadPage();
    //real pagination
  
  },[pageSize]);

  const loadPage=async(paged?:any)=>{

    setLoading(true);
    const res=await service.getLargeListUsingOdata(pageSize,paged);
    setAllItems(res.items);
    setPageObject(res.pagedObject);
    setLoading(false);
  }

  //next page
  const nextPage=async()=>{
    if(!pagedObject) return;
    setpreviousPageStack(prev=>[...prev,pagedObject]);
    loadPage(pagedObject)
  }
  const previousPage=async()=>{
    if(!previousPageStack) return;
    const lastPageIndex=previousPageStack[previousPageStack.length-1];
    const updated=[...previousPageStack];
    updated.pop();
    setpreviousPageStack(updated);
    loadPage(lastPageIndex)
  }



  return(
    <>
    
    {/*Page Size  */}
    <Dropdown
    label='Select Page Size'
    options={pagedItems}
    onChange={(_,opt)=>{
      setPageSize(opt?.key as any)
    }}
    style={{width:200,marginBottom:20}}
    />
    <div style={{marginBottom:20,display:'flex',gap:'10px'}}>
<PrimaryButton
text='Previous Button'
onClick={previousPage}
iconProps={{iconName:'back'}}
  styles={{root:{backgroundColor:"green",border:"green"}}}
  disabled={previousPageStack.length===0}
/>
<PrimaryButton
text='Next'
onClick={nextPage}
iconProps={{iconName:'next'}}
 styles={{root:{backgroundColor:"red",border:"red"}}}
/>

    </div>
    <DetailsList
    items={allItems}
    compact
    />
    {loading&&<p>Loading ......</p>}
    </>
  )
}
export default LargeList;
