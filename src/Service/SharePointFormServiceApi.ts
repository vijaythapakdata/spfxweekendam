import {Web} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { ISharePointListColumns } from "../CommonMethods/ISharePointListCoulmns";
import { ListName } from "../Enum/ListName";

export class SharePointFormServiceApi{
    private web;
    constructor(siteurl:string){
      this.web=Web(siteurl);
    }

public async AddItemsList(FormData:ISharePointListColumns):Promise<any>{
    try{
const list=this.web.lists.getByTitle(ListName.SharePointListName); // this will hold the list name
const result=await list.items.add({
 Title:FormData.Name,
 EmailAddress:FormData.Email,
 Age:parseInt(FormData.Age),
 Score:FormData.Experience,
 Address:FormData.FullAddress,
 Salary:FormData.Compensation ,
Permission:FormData.Permission ,
AdminId:FormData.AdminId,
ManagerId:{results:FormData.ManagerId} 
})
return result;
    }
    catch(err){
console.error("Error while adding item to the list",err);
    }
}

public async uploadFile(itemsId:number,Attachments:File[]):Promise<void>{
    if(!Attachments||Attachments.length===0)return;
    const list=this.web.lists.getByTitle(ListName.SharePointListName);
    for(const file of Attachments){
        await list.items.getById(itemsId).attachmentFiles.add(file.name,file);
    }
}
}