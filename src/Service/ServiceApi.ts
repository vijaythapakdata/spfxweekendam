import { Web } from "@pnp/sp/webs";
import { ListName } from "../Enum/ListName";
import { ISharePointList2Columns } from "../CommonMethods/ISharePointListCoulmns";

export class ServiceApiClass{
    private web;
    constructor(siteurl:string){
        this.web=Web(siteurl);
    }

public async createFormdata(formdata:ISharePointList2Columns):Promise<any>{
    try{
        const listname=this.web.lists.getByTitle(ListName.ListName2);
        const result =await listname.items.add({
            Title:formdata.Title,
            Description:formdata.Description,
            Created:formdata.Created
        });
        return result;

    }
    catch(err){
        console.error("Error creating form data:", err);
        throw err;
    }
}
}