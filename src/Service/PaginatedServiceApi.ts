import {sp} from "@pnp/sp/presets/all";
import { IPaginatedTable } from "../CommonMethods/ISharePointListCoulmns";
import { ListName } from "../Enum/ListName";

export default class PaginatedServiceServiceClass{
public static async getPaginationItems():Promise<IPaginatedTable[]>{
    try{
let allItems:any[]=[];
let paged=await sp.web.lists.getByTitle(ListName.SharePointListName).items.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title")
.expand("Admin","City").top(4999).getPaged(); ///max batched 4999

//first batch 
allItems.push(...paged.results);
console.log(`Fetched first batch ${paged.results.length}`);

//continue fecthing next batches
while(paged.hasNext){
    paged=await paged.getNext(); // next page call

    allItems.push(...paged.results);
    console.log(`Fetched next batch ${paged.results.length}`);

}
console.log(`Fetched total lenght ${allItems.length}`);

//return same structure that what we are expecting
return allItems.map((e:any)=>({
    key:e.Id,
    Title:e.Title,
    EmailAddress:e.EmailAddress,
    Age:e.Age,
    Admin:e.Admin?.Title,
    City:e.City?.Title
}));


    }
    catch(err){
console.log(err);
return [];

    }

}


}