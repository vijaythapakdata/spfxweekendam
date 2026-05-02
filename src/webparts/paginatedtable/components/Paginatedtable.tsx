import * as React from 'react';
// import styles from './Paginatedtable.module.scss';
import type { IPaginatedtableProps } from './IPaginatedtableProps';
import PaginatedServiceServiceClass from '../../../Service/PaginatedServiceApi';
import { Dropdown, IDropdownOption, initializeIcons, PrimaryButton } from '@fluentui/react';
import { useState ,useEffect} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Input,Table } from 'antd';
initializeIcons();
const pagedItems:IDropdownOption[]=[
  {key:5,text:'5 items'},
  {key:10,text:'10 items'},
  {key:15,text:'15 items'},
  {key:20,text:'20 items'},
]

const Paginatedtable:React.FC<IPaginatedtableProps>=(props)=>{
  const [allItems,setAllitems]=useState<any[]>([]);
  const [searchText,setSearchText]=useState<string>('');
  const [loading,setLoading]=useState<boolean>(false);

  const [pageSize,setpageSize]=useState<number>(5);
  const [page,setPage]=useState<number>(1);

useEffect(()=>{
const loadList=async()=>{
  setLoading(true);
  const response=await PaginatedServiceServiceClass.getPaginationItems();
  setAllitems(response);
  setLoading(false);
}
loadList();
},[]);

const filteredItems=allItems.filter((item)=>item?.Title?.toLowerCase().includes(searchText.toLowerCase())

|| item?.EmailAddress?.toLowerCase().includes(searchText.toLowerCase())||
item?.Admin?.toLowerCase().includes(searchText.toLowerCase())

|| item?.City?.toLowerCase().includes(searchText.toLowerCase())
||
item?.Age?.toString().includes(searchText)
)

//pagination
const paginatedItems=filteredItems.slice((page-1) * pageSize,page * pageSize);
// page =2
//pagesize=10

//start index =(2-1) * 10, =10
//2*10=20
//filter(10,20)

const columns=[
  {
    title:"Name",
    dataIndex:"Title",
    key:"Title",
    sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||"")
  },
  {
    title:"Age",
    dataIndex:"Age",
    Key:"Age",
    sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0)

  },

  {
     title:"Email Address",
    dataIndex:"EmailAddress",
    key:"EmailAddress",
    sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||"")
  },
   {
    title:"Admin",
    dataIndex:"Admin",
    key:"Admin",
    sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||"")
  },
   {
    title:"City",
    dataIndex:"City",
    key:"City",
    sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||"")
  },
]
//search box
const handleSearch=(e:any)=>setSearchText(e.target.value);

//export to excel

const exporttoExcel=()=>{
  const worksheet=XLSX.utils.json_to_sheet(filteredItems);
  const workBook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook,worksheet,"SPListdata");
  XLSX.writeFile(workBook,"SPListdata.xlsx");
}

//export to pdf
const exporttoPdf=()=>{
  const doc=new jsPDF();
  doc.text("SharePoint List Data",10,10);
  const tableRows:any[]=[];
  filteredItems.forEach((item)=>{
    tableRows.push([item.Title,item.EmailAdddress,item.Age,item.Admin,item.City])
  });
  autoTable(doc,{
    head:[["Name","Age","Email Address","Admin","City"]],
    body:tableRows,
    startY:20
  });
  doc.save("Splistdata.pdf");
}
  return(
    <>
    {/* Search box */}
<Input
placeholder='Search here'
style={{marginBottom:20,width:"300px"}}
value={searchText}
onChange={handleSearch}
/>
{/* Page Size */}
<Dropdown
label='Select page size'
options={pagedItems}
onChange={(_,option)=>{
  setpageSize(option?.key as any);
  setPage(1);
}}
style={{marginBottom:20,width:"300px"}}

/>
{/* Export to excel */}
<div style={{marginBottom:20,display:'flex',gap:'10px'}}>
  <PrimaryButton
  text="Export to excel"
  iconProps={{iconName:"FileExcel"}}
  onClick={exporttoExcel}
  styles={{root:{backgroundColor:"green",border:"green"}}}
  />
  <PrimaryButton
  text="Export to PDF"
  onClick={exporttoPdf}
  iconProps={{iconName:"pdf"}}

  styles={{root:{backgroundColor:"red",border:"red"}}}
  />

</div>
{/* Table */}
<Table
columns={columns}
dataSource={paginatedItems}
loading={loading}
pagination={{
  current:page,
  pageSize:pageSize,
  total:filteredItems.length,
  onChange:(p)=>setPage(p)
}}
rowKey="key"
/>
    </>
  )
}
export default Paginatedtable;