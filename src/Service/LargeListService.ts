import {WebPartContext} from "@microsoft/sp-webpart-base";
import {sp} from "@pnp/sp/presets/all";
import { ListName } from "../Enum/ListName";

export class ServiceLargeListClass{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }

public async getLargeListUsingOdata(pageSize:number,pagedObject:any){
    let paged;
    if(pagedObject){
        ///load next batch
        paged=await pagedObject.getNext();
    }
    else{
        //load first batch
        paged=await sp.web.lists.getByTitle(ListName.SharePointListName).items.select("Id","Title")
        .top(pageSize).getPaged();
    }
    return{
        items:paged.results.map((i:any)=>({
            Id:i.Id,
            Title:i.Title
        })),
        pagedObject:paged.hasNext?paged:null
    }
        
    
}


}