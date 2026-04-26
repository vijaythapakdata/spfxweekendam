export interface ISharePointList1Columns{
    Name:string;
    Email:string;
    Experince:number;
    Age:any;
    Skills:string[];
    IsTrue:boolean;
    City:{
        Title:string;
    } //lookup
}

export interface ISharePointList2Columns{
    Title:string;
    Description:string;
    Created:Date;
}

export interface ISharePointListColumns{
   Name:string;
   Email:string;
   Age:any; 
   Experience:number;
   FullAddress:string;
   Compensation:any;
   Permission:boolean;
   Admin:string;
   AdminId:any;
   Manager:any[];
   ManagerId:any[];
   Department:string;
   City:string;
   Gender:string;
   Skills:any;
   DOB:any;
}
    

